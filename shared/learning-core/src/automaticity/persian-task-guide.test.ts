import { expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  persianCycleGoals,
  persianStageLabel,
  persianTaskSteps,
} from "./persian-task-guide";

function workspaceRoot() {
  let current = import.meta.dir;
  for (let index = 0; index < 10; index++) {
    if (existsSync(join(current, "docs", "language-apps-roadmap.json")))
      return current;
    current = dirname(current);
  }
  throw new Error("Language app workspace root was not found");
}

test("a German gap exercise has concrete Persian steps while the German sentence remains the answer target", () => {
  const steps = persianTaskSteps(
    "de",
    "retrieve",
    "writing",
    "Setze die fehlende Form ein und schreibe die vollständige Antwort auf Deutsch: Ich ___ Studentin.",
  );
  expect(steps.join(" ")).toContain("جای خالی");
  expect(steps.join(" ")).toContain("جملهٔ کامل");
  expect(steps.join(" ")).toContain("آلمانی");
  expect(steps.join(" ")).not.toContain("Studentin");
});

test("English correction and speaking directions are explained without supplying a solution", () => {
  const steps = persianTaskSteps(
    "en",
    "repair",
    "speaking",
    "Say your answer aloud and record it. Correct the sentence: She are ready.",
  );
  expect(steps.join(" ")).toContain("خطا");
  expect(steps.join(" ")).toContain("ضبط");
  expect(steps.join(" ")).not.toContain("She is ready");
});

test("German model-copy and Perfekt tasks give the requested action instead of an unrelated free sentence", () => {
  const model = persianTaskSteps(
    "de",
    "retrieve",
    "writing",
    "Schreibe den Modellsatz: Ich bin Studentin.",
  ).join(" ");
  expect(model).toContain("جملهٔ نمونه");
  expect(model).not.toContain("جملهٔ خودت");
  const perfect = persianTaskSteps(
    "de",
    "retrieve",
    "writing",
    "Bilde das Perfekt: Ich gehe nach Hause.",
  ).join(" ");
  expect(perfect).toContain("گذشتهٔ کامل");
});

test("the first conversation prompts explain their actual speaking requirements in Persian", () => {
  const german = persianTaskSteps(
    "de",
    "produce",
    "speaking",
    "Sprich über das Thema „Sich vorstellen“. Nenne drei persönliche Informationen und stelle am Ende eine einfache Frage.",
  ).join(" ");
  expect(german).toContain("سه اطلاعات شخصی");
  expect(german).toContain("سؤال ساده");
  const english = persianTaskSteps(
    "en",
    "produce",
    "speaking",
    "Talk about Introducing yourself. Give four short sentences: one fact, one personal detail, one example, and one question.",
  ).join(" ");
  expect(english).toContain("چهار جملهٔ کوتاه");
  expect(english).toContain("یک سؤال");
});

test("all learning stages have plain Persian labels and open tasks get a usable fallback", () => {
  for (const stage of [
    "notice",
    "retrieve",
    "vary",
    "produce",
    "repair",
    "transfer",
    "retain",
  ] as const) {
    expect(persianStageLabel(stage).length).toBeGreaterThan(3);
    expect(
      persianTaskSteps("de", stage, "writing", "Unbekannte Aufgabe.").length,
    ).toBeGreaterThanOrEqual(3);
  }
});

test("every published learning-cycle topic has specific Persian form, meaning and use goals", async () => {
  for (const language of ["en", "de"] as const) {
    const app =
      language === "en"
        ? "English/English-Automaticity"
        : "Deutsch/Deutsch-Automaticity";
    const pack = await Bun.file(
      join(
        workspaceRoot(),
        "Apps",
        app,
        "apps",
        "web",
        "public",
        "learning-core",
        `curriculum-${language}.json`,
      ),
    ).json();
    for (const unit of pack.units) {
      if (!unit.learningCycle) continue;
      const goals = persianCycleGoals(unit.id);
      expect(goals?.form.length).toBeGreaterThan(15);
      expect(goals?.meaning.length).toBeGreaterThan(15);
      expect(goals?.use.length).toBeGreaterThan(15);
    }
  }
});
