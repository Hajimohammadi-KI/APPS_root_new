import {
  env,
  pipeline,
  type AutomaticSpeechRecognitionPipeline,
} from "@huggingface/transformers";
import {
  isPlausibleLocalTranscript,
  type LocalTranscriptionResponse,
  validateTranscriptionRequest,
} from "./local-transcription-protocol";
import { VerifiedLocalTranscriptionAssets } from "./local-transcription-asset-loader";

const MODEL = "onnx-community/whisper-base.en";
const MODEL_PATH = "/local-transcription/models/";
const WASM_MJS =
  "/local-transcription/wasm/ort-wasm-simd-threaded.asyncify.mjs";
const WASM_BINARY =
  "/local-transcription/wasm/ort-wasm-simd-threaded.asyncify.wasm";

// Every inference file is served from this app. Browser speech recognition and
// its provider-dependent network path are intentionally absent here.
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = MODEL_PATH;
const wasm = env.backends.onnx.wasm;
if (!wasm) throw new Error("Local inference backend is unavailable.");
const checkedWasm: NonNullable<typeof wasm> = wasm;
checkedWasm.wasmPaths = {
  mjs: new URL(WASM_MJS, self.location.origin).href,
  wasm: new URL(WASM_BINARY, self.location.origin).href,
};
checkedWasm.numThreads = 1;
checkedWasm.proxy = false;
env.useBrowserCache = false;
env.useFSCache = false;
env.useCustomCache = false;
env.useWasmCache = false;

const localFetch = globalThis.fetch.bind(globalThis);
const assets = new VerifiedLocalTranscriptionAssets(
  self.location.origin,
  localFetch,
);
env.fetch = async (input) => {
  const url = new URL(String(input), self.location.href);
  if (!url.pathname.startsWith(MODEL_PATH))
    throw new Error("Local transcription blocked a non-model request.");
  const bytes = await assets.get(url);
  return new Response(bytes, {
    status: 200,
    headers: { "content-length": String(bytes.byteLength) },
  });
};

let transcriberPromise: Promise<AutomaticSpeechRecognitionPipeline> | undefined;
let busy = false;

function getTranscriber(): Promise<AutomaticSpeechRecognitionPipeline> {
  transcriberPromise ??= (async () => {
    // Pin the runtime module and provide ONNX with already verified WASM bytes.
    // This prevents an unverified CacheStorage entry from becoming executable.
    const moduleBytes = await assets.get(WASM_MJS);
    checkedWasm.wasmPaths = {
      mjs: URL.createObjectURL(
        new Blob([moduleBytes], { type: "text/javascript" }),
      ),
      wasm: new URL(WASM_BINARY, self.location.origin).href,
    };
    checkedWasm.wasmBinary = await assets.get(WASM_BINARY);
    return pipeline("automatic-speech-recognition", MODEL, {
      dtype: "q8",
      device: "wasm",
      local_files_only: true,
    });
  })();
  return transcriberPromise;
}

function send(response: LocalTranscriptionResponse): void {
  self.postMessage(response);
}

self.addEventListener("message", async (event: MessageEvent<unknown>) => {
  const requestId =
    typeof event.data === "object" &&
    event.data !== null &&
    "requestId" in event.data &&
    typeof event.data.requestId === "string"
      ? event.data.requestId
      : "";
  let ownsJob = false;
  try {
    const request = validateTranscriptionRequest(event.data);
    if (busy) throw new Error("A recording is already being transcribed.");
    busy = true;
    ownsJob = true;
    send({ type: "progress", requestId, stage: "loading" });
    const transcriber = await getTranscriber();
    send({ type: "progress", requestId, stage: "transcribing" });
    const generationOptions = {
      chunk_length_s: 30,
      stride_length_s: 5,
      max_new_tokens: Math.min(
        192,
        Math.max(40, Math.ceil((request.samples.length / 16_000) * 7)),
      ),
    };
    let output = await transcriber(request.samples, generationOptions);
    let text = Array.isArray(output) ? "" : output.text;
    const durationSeconds = request.samples.length / 16_000;
    if (
      typeof text !== "string" ||
      !isPlausibleLocalTranscript(text, durationSeconds)
    ) {
      output = await transcriber(request.samples, {
        ...generationOptions,
        no_repeat_ngram_size: 6,
      });
      text = Array.isArray(output) ? "" : output.text;
    }
    if (
      typeof text !== "string" ||
      !isPlausibleLocalTranscript(text, durationSeconds)
    )
      throw new Error(
        "The local model could not produce a reliable transcript. Replay the recording and enter the words manually.",
      );
    send({
      type: "result",
      requestId,
      result: {
        text: text.trim(),
        source: "local_whisper",
        verified: false,
      },
    });
  } catch (error) {
    if (ownsJob) transcriberPromise = undefined;
    send({
      type: "error",
      requestId,
      error:
        error instanceof Error
          ? error.message
          : "Local transcription is unavailable for this recording.",
    });
  } finally {
    if (ownsJob) busy = false;
  }
});
