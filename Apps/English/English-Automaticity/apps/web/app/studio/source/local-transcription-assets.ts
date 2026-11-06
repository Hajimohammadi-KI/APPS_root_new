/** Exact bytes shipped with this version of the local English speech model. */
export const LOCAL_TRANSCRIPTION_ASSETS = [
  {
    path: "models/onnx-community/whisper-base.en/config.json",
    bytes: 2197,
    sha256: "c8a0de5ed8a083565a4319db29d0c210fda35b4d6076c2d711cae53ae00f3cb1",
  },
  {
    path: "models/onnx-community/whisper-base.en/generation_config.json",
    bytes: 1556,
    sha256: "3479b1f44a07e41db799e22599222fee5816738036def94a39841cb9cdbb4120",
  },
  {
    path: "models/onnx-community/whisper-base.en/preprocessor_config.json",
    bytes: 339,
    sha256: "a6a76d28c93edb273669eb9e0b0636a2bddbb1272c3261e47b7ca6dfdbac1b8d",
  },
  {
    path: "models/onnx-community/whisper-base.en/tokenizer_config.json",
    bytes: 282662,
    sha256: "93879c3dccdd4b976f709acd85b44778873f30c275e67026f30ca1e4c975230c",
  },
  {
    path: "models/onnx-community/whisper-base.en/tokenizer.json",
    bytes: 2405679,
    sha256: "5eb60cec1e77aeeb6869a2bb5a8e01a84c3fe5d072d75369343021fe6f5310d0",
  },
  {
    path: "models/onnx-community/whisper-base.en/onnx/encoder_model_quantized.onnx",
    bytes: 23201320,
    sha256: "6e8001198c490bbae018c0044f630c2915efb826bad957006ce36152d0ab2a10",
  },
  {
    path: "models/onnx-community/whisper-base.en/onnx/decoder_model_merged_quantized.onnx",
    bytes: 53692803,
    sha256: "dd4761a3f7add26afda3512abff4706920404c2517e85a9f2ff090b0c0987909",
  },
  {
    path: "wasm/ort-wasm-simd-threaded.asyncify.mjs",
    bytes: 53057,
    sha256: "0966b6105cd936744498aa60df7a22cbd47af3374dbc64a9ab561c08a71e3611",
  },
  {
    path: "wasm/ort-wasm-simd-threaded.asyncify.wasm",
    bytes: 26861777,
    sha256: "49871f5a4409519797e127440868a6d1923339d9185907f301a5b2a1d90af082",
  },
] as const;

export type LocalTranscriptionAsset =
  (typeof LOCAL_TRANSCRIPTION_ASSETS)[number];

export const LOCAL_TRANSCRIPTION_ASSET_CACHE =
  "english-local-transcription-pinned-v2";
