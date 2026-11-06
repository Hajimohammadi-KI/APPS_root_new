export const LOCAL_TRANSCRIPTION_WORKER_URL = "/local-transcription/worker.js";
export const LOCAL_TRANSCRIPTION_SAMPLE_RATE = 16_000;
export const LOCAL_TRANSCRIPTION_MAX_SECONDS = 120;

export type LocalTranscriptionRequest = {
  type: "transcribe";
  requestId: string;
  sampleRate: 16000;
  samples: Float32Array;
};

export type LocalTranscriptionResponse =
  | {
      type: "progress";
      requestId: string;
      stage: "loading" | "transcribing";
    }
  | {
      type: "result";
      requestId: string;
      result: {
        text: string;
        source: "local_whisper";
        verified: false;
      };
    }
  | { type: "error"; requestId: string; error: string };

export function isPlausibleLocalTranscript(
  text: string,
  durationSeconds: number,
): boolean {
  const trimmed = text.trim();
  if (!trimmed || !Number.isFinite(durationSeconds) || durationSeconds <= 0)
    return false;
  const words = trimmed.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
  if (
    words.length === 0 ||
    words.length > Math.max(12, Math.ceil(durationSeconds * 6)) ||
    trimmed.length > Math.max(100, Math.ceil(durationSeconds * 80))
  )
    return false;
  let repeated = 0;
  let previous = "";
  for (const word of words) {
    const normalized = word.toLocaleLowerCase("en");
    repeated = normalized === previous ? repeated + 1 : 1;
    if (repeated > Math.max(8, Math.ceil(durationSeconds * 2))) return false;
    previous = normalized;
  }
  return true;
}

export function validateTranscriptionRequest(
  value: unknown,
): LocalTranscriptionRequest {
  if (!value || typeof value !== "object")
    throw new Error("Invalid transcription request.");
  const keys = Object.keys(value);
  if (
    keys.length !== 4 ||
    keys.some(
      (key) =>
        key !== "type" &&
        key !== "requestId" &&
        key !== "sampleRate" &&
        key !== "samples",
    )
  )
    throw new Error("The transcription request may contain only audio.");
  const request = value as Partial<LocalTranscriptionRequest>;
  if (
    request.type !== "transcribe" ||
    typeof request.requestId !== "string" ||
    !request.requestId ||
    request.requestId.length > 128 ||
    request.sampleRate !== LOCAL_TRANSCRIPTION_SAMPLE_RATE ||
    !(request.samples instanceof Float32Array) ||
    request.samples.length < 1600 ||
    request.samples.length >
      LOCAL_TRANSCRIPTION_SAMPLE_RATE * LOCAL_TRANSCRIPTION_MAX_SECONDS
  )
    throw new Error("Use a recording between 0.1 and 120 seconds at 16 kHz.");
  let energy = 0;
  for (const sample of request.samples) {
    if (!Number.isFinite(sample))
      throw new Error("The recording contains invalid audio samples.");
    energy += sample * sample;
  }
  if (Math.sqrt(energy / request.samples.length) < 0.0001)
    throw new Error("The recording is silent or too quiet to transcribe.");
  return request as LocalTranscriptionRequest;
}
