import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CoachCard, StepPicker } from "./studio-cards";
import { conversationTopics } from "./conversation-data";

test("a German conversation question has visible Persian steps", () => {
  const topic = conversationTopics[0];
  if (!topic) throw new Error("German conversation catalog is empty");
  const html = renderToStaticMarkup(
    <CoachCard selected={topic} onSpeak={() => {}} supportLanguage="fa" />,
  );
  expect(html).toContain("این گفت‌وگو را چگونه انجام دهم؟");
  expect(html).toContain('dir="rtl"');
  expect(html).toContain(topic.task);
});

test("the seven studio steps have clear Persian action labels", () => {
  const html = renderToStaticMarkup(
    <StepPicker
      stepLabels={[
        "Hören",
        "Antwort",
        "Replay",
        "Prüfen",
        "Korrigieren",
        "Verbessern",
        "Speichern",
      ]}
      active={1}
      onSelect={() => {}}
      supportLanguage="fa"
    />,
  );
  expect(html).toContain("پاسخ بده");
  expect(html).toContain("ذخیره کن");
});
