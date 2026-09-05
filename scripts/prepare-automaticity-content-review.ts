import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { unitDigest } from "./lib/automaticity-release-reviews";
import type { CurriculumPack } from "../shared/learning-core/src/automaticity/curriculum";
const root = resolve(import.meta.dir, ".."),
  id = Bun.argv[2];
if (!id || !/^(en|de)\.c\.\d+$/.test(id))
  throw new Error(
    "Usage: bun scripts/prepare-automaticity-content-review.ts en.c.001 [output.json]",
  );
const language = id.slice(0, 2),
  app =
    language === "en"
      ? "Apps/English/English-Automaticity"
      : "Apps/Deutsch-Automaticity";
const pack = JSON.parse(
  await readFile(
    resolve(
      root,
      app,
      `apps/web/public/learning-core/curriculum-${language}.json`,
    ),
    "utf8",
  ),
) as CurriculumPack;
const unit = pack.units.find((unit) => unit.id === id);
if (!unit) throw new Error(`Unknown construction ${id}`);
const target = resolve(
  root,
  Bun.argv[3] ?? `artifacts/content-review-packets/${id}-${pack.version}.json`,
);
const cells = [
  ...new Set(unit.tasks.map((task) => `${task.stage}:${task.modality}`)),
];
const packet = {
  schemaVersion: 1,
  createdAt: new Date().toISOString(),
  status: "awaiting_actual_human_review",
  instructions: [
    "Review the included content, source references, accepted alternatives, prerequisites and every task. Record specific findings in a separate workspace file.",
    "Fill reviewer identity, role, date, decision and the evidence file path/SHA-256 after actual review. Empty fields are intentional and cannot pass the release gate.",
    "Approve an evaluator for every task, including its exact rubric. Human evaluation remains manual. Rules and Transformers additionally need pinned benchmark input that passes the qualification gate.",
    "If content changes, generate a fresh packet and review the changed unit. Copy only actual approved review entries into docs/automaticity-release-reviews.json; update source review flags through the normal reviewed-content change.",
    "Run the coverage gate. This packet itself is not review evidence, curriculum approval or model activation.",
  ],
  content: unit,
  reviewDrafts: cells.map((key) => {
    const [stage, modality] = key.split(":");
    const tasks = unit.tasks.filter(
      (task) => task.stage === stage && task.modality === modality,
    );
    return {
      id: `review-${id}-${stage}-${modality}`,
      language,
      constructionId: id,
      stage,
      modality,
      contentVersion: pack.version,
      mappingVersion: pack.mappingVersion,
      unitSha256: unitDigest(unit),
      contentReview: {
        reviewerId: null,
        role: null,
        reviewedAt: null,
        decision: null,
        evidence: { path: null, sha256: null },
      },
      tasksNeedingEvaluatorApproval: tasks.map((task) => ({
        id: task.id,
        rubricVersion: task.rubricVersion,
        answerPolicy: task.answerPolicy,
      })),
      evaluators: [],
    };
  }),
};
await mkdir(dirname(target), { recursive: true });
// Exclusive creation protects completed reviewer work from accidental regeneration.
await writeFile(target, JSON.stringify(packet, null, 2) + "\n", { flag: "wx" });
console.log(target);
