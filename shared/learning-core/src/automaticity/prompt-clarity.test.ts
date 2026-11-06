import { expect, test } from "bun:test";
import { persianTaskSteps } from "./persian-task-guide";
import { LEARNING_CYCLES } from "../learning-cycles";
import { cyclePromptGuide } from "./cycle-prompt-guide";
import { activePracticeTasks, type CurriculumPack } from "./curriculum";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

test("the reported introduction explains both sentences in Persian", () => {
  for (const language of ["de", "en"] as const) {
    const spec = LEARNING_CYCLES.find(
      (row) => row.constructionId === `${language}.c.001`,
    )!;
    const steps = persianTaskSteps(
      language,
      "produce",
      "writing",
      spec.produce,
    ).join(" ");
    expect(steps).toContain("دو جمله");
    expect(steps).toContain("نام یا نقش");
    expect(steps).toContain("امروز");
    expect(steps).toContain("پاسخ شخصی");
  }
});

test("describing an event does not ask for an explanation of grammar", () => {
  const steps = persianTaskSteps(
    "en",
    "produce",
    "writing",
    "Describe a small past decision of your own and an alternative result you now imagine. Make clear what actually happened and what did not.",
  ).join(" ");
  expect(steps).toContain("تصمیم");
  expect(steps).not.toContain("این ساختار چه معنی و کاربردی دارد");
});

test("word-only answers do not get full-sentence directions", () => {
  for (const [language, prompt] of [
    ["en", "Write only the missing word: She ___ ready."],
    ["de", "Schreibe nur das fehlende Wort: Sie ___ bereit."],
  ] as const) {
    const steps = persianTaskSteps(
      language,
      "retrieve",
      "writing",
      prompt,
    ).join(" ");
    expect(steps).toContain("فقط واژه");
    expect(steps).not.toContain("جملهٔ کامل را بساز");
  }
});

test("a sentence count never invents extra content requirements", () => {
  const steps = persianTaskSteps(
    "en",
    "produce",
    "writing",
    "Write four short sentences about your weekend.",
  ).join(" ");
  expect(steps).toContain("چهار جمله");
  expect(steps).not.toContain("یک سؤال");
});

test("translation tasks ask for translation and preserve the requested answer language", () => {
  const steps = persianTaskSteps(
    "de",
    "retrieve",
    "writing",
    "Übersetze ins Deutsche: امروز خسته‌ام.",
  ).join(" ");
  expect(steps).toContain("ترجمه");
  expect(steps).toContain("آلمانی");
});

test("correct in 'different correct answers' does not turn an open task into correction", () => {
  const steps = persianTaskSteps(
    "en",
    "produce",
    "writing",
    "Use Verb be to explain something from your own life. Keep the meaning clear. Different correct answers are possible.",
  ).join(" ");
  expect(steps).not.toContain("خطا را پیدا کن");
});

test("a question with a quoted sentence does not interpret its contents as instructions", () => {
  const steps = persianTaskSteps(
    "en",
    "notice",
    "writing",
    "Explain the difference: Choose your seat. I chose my seat.",
  ).join(" ");
  expect(steps).not.toContain("گزینهٔ مناسب");
});

test("structured facts before a colon do not swallow the later output instruction", () => {
  const steps = persianTaskSteps(
    "en",
    "retrieve",
    "writing",
    "Object: the report. Action: check. Time: yesterday. Write one complete sentence.",
  ).join(" ");
  expect(steps).toContain("یک جمله");
});

test("combining two source sentences requests one output sentence", () => {
  const steps = persianTaskSteps(
    "en",
    "vary",
    "writing",
    "Combine two sentences into one sentence: Ana works. She studies.",
  ).join(" ");
  expect(steps).toContain("یک جمله");
  expect(steps).not.toContain("دو جمله بنویس");
});

test("spoken English variations explain both requested versions", () => {
  const steps = persianTaskSteps(
    "en",
    "vary",
    "speaking",
    "Practise “Verb be: am/is/are” by changing this example:\nI am a student.\nSay and record two new versions. In the first, change one detail, such as a person, action, object, place or time. In the second, change a different detail. Keep the target grammar pattern and adjust any words that must agree. Give the complete sentences themselves.",
  ).join(" ");
  expect(steps).toContain("دو نسخه");
  expect(steps).toContain("جزئیات دیگری");
  expect(steps).toContain("ضبط");
});

test("German personal production preserves the separate Persian intent step", () => {
  const steps = persianTaskSteps(
    "de",
    "produce",
    "writing",
    "Schreibe genau einen vollständigen Satz auf Deutsch über deinen Alltag. Formuliere zuerst deine beabsichtigte Bedeutung auf Persisch. Das Beispiel wird erst nach deinem ersten Versuch gezeigt.",
  ).join(" ");
  expect(steps).toContain("ابتدا");
  expect(steps).toContain("کادر فارسی");
  expect(steps).not.toContain("از حافظه پیدا کن");
});

test("choosing your own details is not multiple choice", () => {
  const steps = persianTaskSteps(
    "en",
    "retrieve",
    "writing",
    "Choose quantities and reference forms for a real situation. Write one or two connected sentences. Choose your own details.",
  ).join(" ");
  expect(steps).not.toContain("از میان شکل‌های داده‌شده");
});

test("rule explanation does not invent contrasting examples", () => {
  const steps = persianTaskSteps(
    "en",
    "retrieve",
    "writing",
    "Explain the rule: Plural nouns",
  ).join(" ");
  expect(steps).toContain("قاعده");
  expect(steps).not.toContain("مثال‌ها را بخوان");
});

test("requests for only a verb form do not demand a full sentence", () => {
  const steps = persianTaskSteps(
    "en",
    "retrieve",
    "writing",
    "Write only the third-person singular present form of study.",
  ).join(" ");
  expect(steps).toContain("فقط");
  expect(steps).not.toContain("جملهٔ کامل بساز");
});

test("every authored main-path open question has a specific explanation of its meaning", () => {
  for (const spec of LEARNING_CYCLES)
    for (const stage of ["notice", "produce", "transfer"] as const) {
      const guide = cyclePromptGuide(spec.language, stage, spec[stage]);
      expect(guide, `${spec.constructionId} ${stage}`).not.toBeNull();
      expect(guide!.length).toBeGreaterThanOrEqual(2);
    }
});

function rootDirectory() {
  let directory = import.meta.dir;
  while (!existsSync(join(directory, "docs/language-apps-roadmap.json"))) {
    const parent = dirname(directory);
    if (parent === directory) throw new Error("Workspace root not found");
    directory = parent;
  }
  return directory;
}

for (const [language, app] of [
  ["en", "English/English-Automaticity"],
  ["de", "Deutsch/Deutsch-Automaticity"],
] as const)
  test(`${language}: every active shipped question gets readable steps without changing its definition`, () => {
    const pack = JSON.parse(
      readFileSync(
        join(
          rootDirectory(),
          "Apps",
          app,
          "apps/web/public/learning-core",
          `curriculum-${language}.json`,
        ),
        "utf8",
      ),
    ) as CurriculumPack;
    let checked = 0;
    for (const unit of pack.units)
      for (const task of activePracticeTasks(unit)) {
        const before = JSON.stringify(task);
        const guide = persianTaskSteps(
          language,
          task.stage,
          task.modality,
          task.prompt,
        );
        expect(guide.length, task.id).toBeGreaterThanOrEqual(3);
        expect(
          guide.every(
            (step) =>
              /\p{Script=Arabic}/u.test(step) &&
              !/undefined|null|<[^>]+>/u.test(step),
          ),
          task.id,
        ).toBe(true);
        expect(guide.at(-1), task.id).toContain(
          language === "de" ? "آلمانی" : "انگلیسی",
        );
        expect(JSON.stringify(task)).toBe(before);
        checked++;
      }
    expect(checked).toBeGreaterThan(2000);
    console.log(
      `${language}: instruction/layout audit over ${checked} active questions in ${pack.units.length} units`,
    );
  });
