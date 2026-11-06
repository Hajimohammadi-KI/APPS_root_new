import { expect, test } from "bun:test";
import {
  isPlausibleLocalTranscript,
  validateTranscriptionRequest,
} from "./local-transcription-protocol";

test("a short recording can genuinely repeat words but cannot contain a model loop", () => {
  expect(isPlausibleLocalTranscript("Hello hello hello hello", 4)).toBe(true);
  expect(
    isPlausibleLocalTranscript(Array(200).fill("hello").join(" "), 4),
  ).toBe(false);
  expect(
    isPlausibleLocalTranscript(Array(20).fill("hello,").join(" "), 4),
  ).toBe(false);
  expect(isPlausibleLocalTranscript("Thankful for so many of you", 5.28)).toBe(
    true,
  );
});

test("accepts only bounded 16 kHz audio and never needs intended words", () => {
  expect(
    validateTranscriptionRequest({
      type: "transcribe",
      requestId: "recording-1",
      sampleRate: 16000,
      samples: new Float32Array(16000).fill(0.1),
    }).samples.length,
  ).toBe(16000);
  expect(() =>
    validateTranscriptionRequest({
      type: "transcribe",
      requestId: "recording-1",
      sampleRate: 16000,
      samples: new Float32Array(16000 * 120 + 1),
    }),
  ).toThrow();
  expect(() =>
    validateTranscriptionRequest({
      type: "transcribe",
      requestId: "recording-1",
      sampleRate: 44100,
      samples: new Float32Array(16000),
    }),
  ).toThrow();
  expect(() =>
    validateTranscriptionRequest({
      type: "transcribe",
      requestId: "recording-1",
      sampleRate: 16000,
      samples: Float32Array.of(Number.NaN),
    }),
  ).toThrow();
  expect(() =>
    validateTranscriptionRequest({
      type: "transcribe",
      requestId: "recording-1",
      sampleRate: 16000,
      samples: new Float32Array(16000),
      target: "hello",
    }),
  ).toThrow();
  expect(() =>
    validateTranscriptionRequest({
      type: "transcribe",
      requestId: "recording-1",
      sampleRate: 16000,
      samples: new Float32Array(16000),
    }),
  ).toThrow(/quiet|silent/i);
});
