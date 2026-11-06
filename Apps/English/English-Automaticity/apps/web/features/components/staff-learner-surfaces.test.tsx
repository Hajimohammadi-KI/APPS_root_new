import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { ApiConnectionStatus } from "./api-connection-status";
import { SessionEvidence } from "@/app/studio/source/studio-evidence";
import { conversationTopics } from "@/app/studio/source/conversation-data";
import { MeasurementPrivacyControls } from "@/features/settings/measurement-privacy-controls";
import { SpeechPracticePanel } from "@/app/studio/source/speech-practice-panel";
import { SavePanel } from "@/app/studio/source/studio-flow-panels";
import {
  MasteryCard,
  QualityGateCard,
} from "@/features/screens/automaticity/automaticity-panels";

test("service URLs and connection diagnostics are absent for learners", () => {
  const html = renderToStaticMarkup(
    <ApiConnectionStatus baseUrl="http://127.0.0.1:4201" />,
  );
  expect(html).toBe("");
});

test("learner feedback keeps the recording and check status without provider methodology", () => {
  const selected = conversationTopics[0];
  if (!selected) throw new Error("Conversation catalog is empty");
  const html = renderToStaticMarkup(
    <SessionEvidence
      language="en"
      seconds={20}
      wordsPerMinute={30}
      wordCount={10}
      transcript="I am ready."
      evaluation={null}
      pronunciation="Listen to your recording."
      matchedChunks={0}
      totalChunks={4}
      attempts={1}
      selected={selected}
      showCorrections
      onToggleCorrections={() => {}}
    />,
  );
  expect(html).toContain("Not checked");
  expect(html).toContain("Recording time");
  expect(html).not.toContain("Evidence rule");
  expect(html).not.toContain("Transcript WPM");
});

test("research setup and reviewer card are behind the professional gate", () => {
  const source = readFileSync(
    new URL("../screens/settings-screen.tsx", import.meta.url),
    "utf8",
  );
  expect(source).toMatch(
    /<StaffOnly>[\s\S]*?Optional effectiveness measurement[\s\S]*?<\/StaffOnly>/u,
  );
  expect(source).toMatch(
    /<StaffOnly>\s*<ContentReviewLinkCard\s*\/>\s*<\/StaffOnly>/u,
  );
  expect(source).toContain("<MeasurementPrivacyControls");
});

test("learners can withdraw participation and delete existing research data without staff tools", () => {
  const html = renderToStaticMarkup(
    <MeasurementPrivacyControls
      hasData
      consented
      status=""
      onWithdraw={() => {}}
      onDelete={() => {}}
    />,
  );
  expect(html).toContain("Stop participating");
  expect(html).toContain("Delete optional research data");
  expect(html).not.toContain("Download privacy-safe measurement");
});

test("read-aloud practice keeps a target without exposing waveform or discourse counters", () => {
  const html = renderToStaticMarkup(
    <SpeechPracticePanel
      transcript="I am ready because I have practised."
      evidence={null}
      waveform={{
        durationSeconds: 20,
        activeSeconds: 12,
        quietIntervals: 2,
        clipped: false,
        fluencyScore: null,
      }}
      language="en"
      level="C1"
      onSpeak={() => {}}
    />,
  );
  expect(html).toContain("Target sentence");
  expect(html).not.toContain("Waveform description");
  expect(html).not.toContain("Connectors / cautious stance cues");
});

test("practice progress remains visible without teacher-verification methodology", () => {
  expect(renderToStaticMarkup(<QualityGateCard />)).toBe("");
  const html = renderToStaticMarkup(
    <MasteryCard
      recognition={50}
      writing={20}
      speaking={0}
      verifiedAutomaticity={0}
    />,
  );
  expect(html).toContain("Your practice progress");
  expect(html).toContain("Writing practice");
  expect(html).not.toContain("Teacher-verified mastery");
  expect(html).not.toContain("Verified mastery");
});

test("saving guidance explains device storage without exposing the database implementation", () => {
  const html = renderToStaticMarkup(
    <SavePanel
      language="en"
      stepLabel="Save"
      savedId={null}
      savedText="Saved"
      wordCount={10}
      seconds={20}
      evaluation={null}
      canSave={false}
      onBack={() => {}}
      onSave={() => {}}
    />,
  );
  expect(html).toContain("saved on this device");
  expect(html).toContain("Audio is kept only with your consent");
  expect(html).not.toContain("IndexedDB");
});
