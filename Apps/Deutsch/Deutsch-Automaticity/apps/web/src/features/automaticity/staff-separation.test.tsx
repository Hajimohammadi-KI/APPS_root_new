import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ApiConnectionStatus } from "@/components/api-connection-status";
import { QualityGateCard, MasteryCard } from "./automaticity-panels";
import { SpeechPracticePanel } from "@/app/studio/source/speech-practice-panel";
import { SessionEvidence } from "@/app/studio/source/studio-evidence";
import { conversationTopics } from "@/app/studio/source/conversation-data";
import { MeasurementParticipationControls } from "@/features/settings/measurement-participation-controls";

test("learner pages omit developer service diagnostics", () => {
  expect(renderToStaticMarkup(<ApiConnectionStatus />)).toBe("");
});

test("learner pages omit mission methodology", () => {
  expect(renderToStaticMarkup(<QualityGateCard />)).toBe("");
});

test("learner progress retains useful axes without a historical technical threshold", () => {
  const html = renderToStaticMarkup(
    <MasteryCard
      recognition={20}
      writing={30}
      speaking={0}
      previousThreshold={77}
    />,
  );
  expect(html).toContain("Eigenes Schreiben");
  expect(html).not.toContain("Frühere Übungsschwelle");
  expect(html).not.toContain("bestätigten Beherrschungswert");
});

test("read-aloud keeps target comparison controls and hides waveform and discourse measurements", () => {
  const html = renderToStaticMarkup(
    <SpeechPracticePanel
      transcript="Ich glaube, das ist wichtig, weil wir lernen."
      evidence={null}
      waveform={{
        durationSeconds: 10,
        activeSeconds: 8,
        quietIntervals: 2,
        clipped: false,
        fluencyScore: null,
      }}
      language="de"
      level="C1"
      onSpeak={() => {}}
    />,
  );
  expect(html).toContain("Zielsatz (optional)");
  expect(html).toContain("Zielsatz hören");
  expect(html).toContain("bewertet keine Aussprache");
  expect(html).not.toContain("Beschreibung der Wellenform");
  expect(html).not.toContain("Konnektoren / vorsichtige Haltung");
});

test("session feedback stays available without provider methodology", () => {
  const selected = conversationTopics[0];
  if (!selected) throw new Error("Missing German topic");
  const html = renderToStaticMarkup(
    <SessionEvidence
      seconds={10}
      wordsPerMinute={60}
      wordCount={10}
      transcript="Ich bin müde."
      evaluation={null}
      pronunciation="Noch nicht geprüft"
      attempts={1}
      selected={selected}
      showCorrections={true}
      onToggleCorrections={() => {}}
    />,
  );
  expect(html).toContain("Grammatik-Rückmeldung");
  expect(html).not.toContain("Evidence rule");
  expect(html).not.toContain("LanguageTool issue(s)");
});

test("existing participation can be withdrawn without exposing research setup", () => {
  const html = renderToStaticMarkup(
    <MeasurementParticipationControls
      active={true}
      onWithdraw={() => {}}
      onDelete={() => {}}
      status=""
    />,
  );
  expect(html).toContain("Zustimmung zurücknehmen");
  expect(html).toContain("Teilnahmedaten löschen");
  expect(html).toContain("Lernfortschritt bleibt erhalten");
  expect(html).not.toContain("Ausgangswert");
  expect(html).not.toContain("Messdaten herunterladen");
});
