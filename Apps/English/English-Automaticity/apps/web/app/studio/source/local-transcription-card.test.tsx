import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { copy } from "./conversation-data";
import { RecordCard } from "./studio-cards";

function recordCard(
  draftPending: boolean,
  displayTranscript: string,
  transcript: string,
  transcriptReviewRequired = false,
) {
  return renderToStaticMarkup(
    <RecordCard
      text={copy.en}
      recordingState="idle"
      starting={false}
      audioUrl="blob:recording"
      seconds={9}
      maxSeconds={120}
      message={null}
      voiceRecoveryAvailable={false}
      transcript={transcript}
      displayTranscript={displayTranscript}
      draftPending={draftPending}
      transcriptReviewRequired={transcriptReviewRequired}
      transcriptionStatus="idle"
      interimTranscript=""
      evaluating={false}
      audioRef={{ current: null }}
      transcriptRef={{ current: null }}
      onContinueTyping={() => {}}
      onReplay={() => {}}
      onRecord={() => {}}
      onPauseOrResume={() => {}}
      onStop={() => {}}
      onEvaluate={() => {}}
      consentNeeded={false}
      onAllowOnline={() => {}}
      onTranscriptChange={() => {}}
      onConfirmTranscript={() => {}}
      onClearTranscriptForRecording={() => {}}
    />,
  );
}

test("unconfirmed local words appear as an editable draft and cannot be grammar checked", () => {
  const html = recordCard(true, "Hollow. Hollow.", "");
  expect(html).toContain("Hollow. Hollow.");
  expect(html).toContain("Confirm transcript");
  expect(html).toContain("can be wrong");
  expect(html).toMatch(
    /<button[^>]*disabled=""[^>]*>✣ Check transcript grammar<\/button>/,
  );
  expect(html).not.toContain("pronunciation grade: 100");
});

test("confirmed text enables grammar check without a second confirmation", () => {
  const html = recordCard(false, "Hello. Hello.", "Hello. Hello.");
  expect(html).toContain("Hello. Hello.");
  expect(html).not.toContain("Confirm transcript</button>");
  expect(html).not.toMatch(
    /<button[^>]*disabled=""[^>]*>✣ Check transcript grammar<\/button>/,
  );
  expect(html).toContain("Clear transcript for this recording");
});

test("a retained transcript must be reaffirmed for a new recording", () => {
  const html = recordCard(false, "Hello. Hello.", "Hello. Hello.", true);
  expect(html).toContain("Confirm transcript for this recording");
  expect(html).toContain("Previous transcript retained");
  expect(html).toMatch(
    /<button[^>]*disabled=""[^>]*>✣ Check transcript grammar<\/button>/,
  );
});

test("a completed suggestion is announced for screen readers", () => {
  const html = recordCard(true, "Hollow. Hollow.", "");
  expect(html).toContain("Transcript suggestion ready. Review and confirm.");
  expect(html).toContain('aria-live="polite"');
});
