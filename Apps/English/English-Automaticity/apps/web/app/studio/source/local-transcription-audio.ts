const SAMPLE_RATE = 16_000;
const MAX_SECONDS = 120;
const MAX_RECORDING_BYTES = 40_000_000;

export function validateTranscriptionAudio(audio: {
  readonly numberOfChannels: number;
  readonly sampleRate: number;
  readonly length: number;
}): void {
  if (
    !Number.isSafeInteger(audio.numberOfChannels) ||
    audio.numberOfChannels < 1 ||
    audio.numberOfChannels > 2 ||
    !Number.isFinite(audio.sampleRate) ||
    audio.sampleRate < 8_000 ||
    audio.sampleRate > 192_000 ||
    !Number.isSafeInteger(audio.length) ||
    audio.length <= 0
  ) {
    throw new Error("The recording has no usable audio samples.");
  }
  if (audio.length / audio.sampleRate > MAX_SECONDS) {
    throw new Error(
      "Offline transcription supports recordings up to 120 seconds. Your original recording is still available.",
    );
  }
}

export function mayApplyTranscriptionDraft({
  requestRevision,
  currentRevision,
  confirmedTranscript,
}: {
  requestRevision: number;
  currentRevision: number;
  confirmedTranscript: string;
}): boolean {
  return requestRevision === currentRevision && !confirmedTranscript.trim();
}

/** Decode the full Studio recording and render a mono 16 kHz copy for the local worker. */
export async function prepareLocalTranscriptionSamples(
  blob: Blob,
): Promise<Float32Array<ArrayBuffer>> {
  if (!blob.size || blob.size > MAX_RECORDING_BYTES) {
    throw new Error(
      "This recording is empty or too large for offline transcription. You can type the transcript yourself.",
    );
  }
  if (
    typeof AudioContext === "undefined" ||
    typeof OfflineAudioContext === "undefined"
  ) {
    throw new Error(
      "Offline audio conversion is unavailable in this browser. You can type the transcript yourself.",
    );
  }

  const context = new AudioContext();
  try {
    let decoded: AudioBuffer;
    try {
      decoded = await context.decodeAudioData(await blob.arrayBuffer());
    } catch {
      throw new Error(
        "This browser could not decode the recording. You can replay it and type the transcript yourself.",
      );
    }
    validateTranscriptionAudio(decoded);
    const renderer = new OfflineAudioContext(
      1,
      Math.max(
        1,
        Math.round((decoded.length / decoded.sampleRate) * SAMPLE_RATE),
      ),
      SAMPLE_RATE,
    );
    const source = renderer.createBufferSource();
    source.buffer = decoded;
    source.connect(renderer.destination);
    source.start();
    const rendered = await renderer.startRendering();
    const samples = rendered.getChannelData(0);
    validateTranscriptionAudio({
      numberOfChannels: 1,
      sampleRate: SAMPLE_RATE,
      length: samples.length,
    });
    let sumOfSquares = 0;
    let peak = 1;
    for (const sample of samples) {
      if (!Number.isFinite(sample)) {
        throw new Error("The recording contains invalid audio samples.");
      }
      sumOfSquares += sample * sample;
      peak = Math.max(peak, Math.abs(sample));
    }
    if (Math.sqrt(sumOfSquares / samples.length) < 0.0001) {
      throw new Error(
        "The recording is silent or too quiet to transcribe. You can type the words yourself.",
      );
    }
    return Float32Array.from(samples, (sample) => sample / peak);
  } finally {
    await context.close();
  }
}
