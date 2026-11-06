import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { CoachCard, StepPicker } from "./studio-cards";
import { conversationTopics } from "./conversation-data";

test("an English conversation question has visible Persian steps", () => {
  const topic = conversationTopics[0];
  if (!topic) throw new Error("English conversation catalog is empty");
  const html = renderToStaticMarkup(
    <CoachCard
      language="en"
      selected={topic}
      matchedChunkTexts={new Set()}
      onSpeak={() => {}}
      supportLanguage="fa"
    />,
  );
  expect(html).toContain("این گفت‌وگو را چگونه انجام دهم؟");
  expect(html).toContain('dir="rtl"');
  expect(html).toContain(topic.task);
});

test("the seven English studio steps have clear Persian action labels", () => {
  const html = renderToStaticMarkup(
    <StepPicker
      stepLabels={[
        "Listen",
        "Answer",
        "Replay",
        "Check",
        "Correct",
        "Improve",
        "Save",
      ]}
      active={1}
      onSelect={() => {}}
      supportLanguage="fa"
    />,
  );
  expect(html).toContain("پاسخ بده");
  expect(html).toContain("ذخیره کن");
});
