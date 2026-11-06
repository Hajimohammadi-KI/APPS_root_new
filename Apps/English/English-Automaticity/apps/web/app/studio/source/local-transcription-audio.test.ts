import { expect, test } from "bun:test";
import {
  validateTranscriptionAudio,
  mayApplyTranscriptionDraft,
} from "./local-transcription-audio";

test("offline transcription accepts the Studio's full 120 seconds but rejects longer clips", () => {
  expect(() =>
    validateTranscriptionAudio({
      numberOfChannels: 1,
      sampleRate: 16_000,
      length: 120 * 16_000,
    }),
  ).not.toThrow();
  expect(() =>
    validateTranscriptionAudio({
      numberOfChannels: 1,
      sampleRate: 16_000,
      length: 121 * 16_000,
    }),
  ).toThrow();
});

test("late offline text cannot replace a manually edited or already confirmed transcript", () => {
  expect(
    mayApplyTranscriptionDraft({
      requestRevision: 2,
      currentRevision: 2,
      confirmedTranscript: "",
    }),
  ).toBe(true);
  expect(
    mayApplyTranscriptionDraft({
      requestRevision: 2,
      currentRevision: 3,
      confirmedTranscript: "",
    }),
  ).toBe(false);
  expect(
    mayApplyTranscriptionDraft({
      requestRevision: 2,
      currentRevision: 2,
      confirmedTranscript: "My own words",
    }),
  ).toBe(false);
});
