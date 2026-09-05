import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { deepStrictEqual } from "node:assert";
import { assessControlledTask } from "../shared/learning-core/src/automaticity/assessment";
import {
  REPRESENTATIVE_SCOPES,
  representativeTasks,
  resolveRepresentativeTask,
} from "../shared/learning-core/src/automaticity/representative-tasks";
import { REPRESENTATIVE_FIXTURES } from "../shared/learning-core/src/automaticity/representative-fixtures";
import { parseConstruction } from "../shared/learning-core/src/automaticity/construction-rules";
import type {
  AttemptEvent,
  Language,
} from "../shared/learning-core/src/automaticity/contracts";
import type { CurriculumPack } from "../shared/learning-core/src/automaticity/curriculum";
import { createContentReviewPacket } from "./lib/curriculum-review-packets";
const root = resolve(import.meta.dir, ".."),
  target = resolve(root, "artifacts/l01-assessment");
const sha = (s: string | Buffer) =>
  createHash("sha256").update(s).digest("hex");
await mkdir(target, { recursive: true });
const prepare = Bun.argv.includes("--prepare-review");
if (prepare) await mkdir(resolve(target, "review")); // exclusive: do not overwrite review work
const results: unknown[] = [],
  packs: CurriculumPack[] = [];
let preservedTasks = 0,
  newTasks = 0;
for (const language of ["en", "de"] as const) {
  const app =
    language === "en"
      ? "Apps/English/English-Automaticity"
      : "Apps/Deutsch-Automaticity";
  const file = `${app}/apps/web/public/learning-core/curriculum-${language}.json`;
  const bytes = await readFile(resolve(root, file)),
    pack = JSON.parse(bytes.toString("utf8")) as CurriculumPack;
  const before = JSON.parse(
    await readFile(resolve(target, `baseline/${language}.json`), "utf8"),
  ) as CurriculumPack;
  packs.push(pack);
  deepStrictEqual(
    pack.units.map((u) => u.id),
    before.units.map((u) => u.id),
  );
  for (const original of before.units) {
    const unit = pack.units.find((u) => u.id === original.id)!;
    for (const task of original.tasks) {
      deepStrictEqual(
        unit.tasks.find((t) => t.id === task.id),
        task,
      );
      preservedTasks++;
    }
    deepStrictEqual(unit.retiredTasks, original.retiredTasks);
  }
  for (const scope of REPRESENTATIVE_SCOPES.filter((row) =>
    row.rule.startsWith(language + "."),
  )) {
    const unit = pack.units.find((u) => u.id === scope.constructionId)!;
    const tasks = unit.tasks.filter((t) => t.constructionAssessment);
    deepStrictEqual(tasks, representativeTasks(scope));
    const fixture = REPRESENTATIVE_FIXTURES.find(
      (row) => row.rule === scope.rule,
    )!;
    const cases: unknown[] = [];
    for (const task of tasks) {
      if (!resolveRepresentativeTask(task))
        throw Error(`Invalid binding ${task.id}`);
      newTasks++;
      const scene = scope.scenarios[task.constructionAssessment!.scenario];
      for (const response of [
        scene.example,
        ...fixture.alternatives[task.constructionAssessment!.scenario],
        scene.error,
        fixture.wrongRole,
        fixture.unsupported,
      ]) {
        const at = new Date().toISOString();
        const attempt: AttemptEvent = {
          version: 2,
          type: "attempt",
          id: "engineering-fixture",
          language,
          at,
          task,
          response: {
            text: response,
            sha256: sha(response),
            originalTranscriptSha256: null,
            transcriptEdited: false,
          },
          timing: {
            startedAt: at,
            activeMs: null,
            firstInputMs: null,
            source: "unavailable",
          },
          assistance: {
            hintCount: 0,
            solutionRevealed: false,
            exampleSeen: false,
            selfReportedAssistance: false,
          },
          audio: null,
          previousAttemptId: null,
        };
        cases.push({
          taskId: task.id,
          response,
          assessment: assessControlledTask(
            attempt,
            task,
            at,
            "engineering-judgment",
          ),
        });
      }
    }
    // Project ONLY the representative task subset. Its review does not approve older tasks.
    const subset = { ...unit, tasks, retiredTasks: [] };
    if (prepare) {
      const packet = createContentReviewPacket(pack, subset);
      await writeFile(
        resolve(target, `review/${unit.id}.json`),
        JSON.stringify(
          {
            ...packet,
            scopeNote:
              "L01 representative subset only. Original tasks and the full curriculum are outside this review.",
            ruleScope: scope,
            engineeringCases: cases,
            manualProcedure: [
              "Read the complete prompt and original response. For speech, listen to the saved original audio; abstain when audio is missing or unintelligible.",
              "Judge form, intended construction and task relevance separately. Check the actor, object, time and relationship between propositions. Accept other correct formulations after examining them, not by copying the suggested answer.",
              "Record pass only when all dimensions are supported; target_not_observed for an otherwise valid answer missing the requested target; needs_repair for an identifiable error; not_assessed when meaning or evidence is unclear.",
              "Enter specific feedback through the app's teacher-review route. Preserve the original response, assistance and recording provenance. Content approval alone does not create learner success or enable a rule evaluator.",
            ],
            benchmarkNote:
              "These cases are implementation-authored regression examples, not independent qualification labels. A rule approval also requires the existing separately reviewed final benchmark gate. A documented human procedure can be approved for the task subset independently.",
          },
          null,
          2,
        ) + "\n",
        { flag: "wx" },
      );
    }
    results.push({
      language,
      constructionId: unit.id,
      rule: scope.rule,
      taskIds: tasks.map((t) => t.id),
      boundedWritingTasks: tasks.filter(
        (t) => t.constructionAssessment!.route === "bounded_rule",
      ).length,
      reviewTasks: tasks.filter(
        (t) => t.constructionAssessment!.route === "human_review",
      ).length,
      sourcePackSha256: sha(bytes),
      cases,
    });
  }
}
if (newTasks !== 168) throw Error("Incomplete representative task set");
const receipt = {
  schemaVersion: 1,
  at: new Date().toISOString(),
  status: "engineering_verified",
  independentLanguageReview: "pending",
  qualifiedAutomaticEvaluator: false,
  preservedTasks,
  newTasks,
  scopes: results,
};
await writeFile(
  resolve(target, "assessment-verification.json"),
  JSON.stringify(receipt, null, 2) + "\n",
);
if (prepare)
  await writeFile(
    resolve(target, "review/README.md"),
    `# L01 representative review\n\n12 bilingual construction scopes; 168 tasks. These packets require an actual independent language review. All reviewer names, dates, decisions and judgments remain blank.\n\nEach JSON packet includes the 14 scoped tasks, sources, sample assessment results, manual review procedure and structured content/evaluator review drafts. Check each judgment; test results do not establish that the language labels are correct.\n\nSave completed evidence as new files. Record the exact references in docs/automaticity-representative-reviews.json. This separate ledger cannot approve the full curriculum or activate any runtime evaluator. Run bun scripts/check-representative-review.ts after importing genuine review records.\n\nPackets: ${REPRESENTATIVE_SCOPES.map((s) => s.constructionId + ".json").join(", ")}\n`,
    { flag: "wx" },
  );
console.log(
  JSON.stringify({
    status: receipt.status,
    preservedTasks,
    newTasks,
    scopes: results.length,
    independentLanguageReview: "pending",
  }),
);
