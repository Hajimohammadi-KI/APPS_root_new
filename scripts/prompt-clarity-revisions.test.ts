import { expect, test } from "bun:test";
import {
  activePracticeTasks,
  type CurriculumPack,
} from "../shared/learning-core/src/automaticity/curriculum";
import { revisePromptClarity } from "./lib/prompt-clarity-revisions";

for (const [language, app] of [
  ["en", "English/English-Automaticity"],
  ["de", "Deutsch/Deutsch-Automaticity"],
] as const) {
  const pack = (await Bun.file(
    `Apps/${app}/apps/web/public/learning-core/curriculum-${language}.json`,
  ).json()) as CurriculumPack;
  test(`${language}: clarity revisions are idempotent and keep every historical source definition`, async () => {
    expect(revisePromptClarity(pack)).toEqual(pack);
    const source = (await Bun.file(
      `shared/learning-core/content/curriculum-${language}.json`,
    ).json()) as CurriculumPack;
    const actual = new Map(
      pack.units.flatMap((unit) => unit.tasks).map((task) => [task.id, task]),
    );
    for (const task of source.units.flatMap((unit) => unit.tasks))
      expect(actual.get(task.id), task.id).toEqual(task);
  });
  test(`${language}: active transfer tasks ask for a response rather than an ability claim or a bare example`, () => {
    expect(
      pack.units
        .flatMap(activePracticeTasks)
        .filter((task) =>
          /\.transfer\.[01]\.(writing|speaking)$/u.test(task.id),
        ),
    ).toHaveLength(0);
  });
  test(`${language}: a bare model is not offered as an error to repair`, () => {
    expect(
      pack.units
        .flatMap(activePracticeTasks)
        .filter(
          (task) =>
            /\.repair\.99\.writing$/u.test(task.id) &&
            !/^(?:Korrigiere|Correct)\b/u.test(task.prompt),
        ),
    ).toHaveLength(0);
  });
  if (language === "de")
    test("German spoken compounds and negation have the same relevant model as writing", () => {
      const tasks = pack.units.flatMap(activePracticeTasks);
      for (const [construction, expected] of [
        ["de.c.153", "der Kindergarten"],
        ["de.c.155", "Nichts ist passiert."],
      ]) {
        const task = tasks.find(
          (task) =>
            task.constructionId === construction &&
            task.stage === "retrieve" &&
            task.modality === "speaking" &&
            task.id.includes("distinct-202611022"),
        )!;
        expect(task.solution).toBe(expected);
      }
    });
}
