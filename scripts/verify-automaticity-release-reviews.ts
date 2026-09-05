import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import {
  parseReviewLedger,
  sha256,
  unitDigest,
  validateReleaseReviews,
  type CellReview,
  type CoverageCell,
} from "./lib/automaticity-release-reviews";
import type { CurriculumPack } from "../shared/learning-core/src/automaticity/curriculum";
import type {
  BenchmarkCase,
  CandidatePrediction,
} from "../shared/learning-core/src/automaticity/qualification";
const root = resolve(import.meta.dir, ".."),
  output = resolve(
    root,
    `artifacts/coverage-review-gate/${new Date().toISOString().replace(/[:.]/g, "-")}`,
  );
await mkdir(output, { recursive: true });
const proof =
  "Synthetic reviewer evidence for automated negative and positive fixtures. Not human curriculum approval.\n";
await writeFile(resolve(output, "synthetic-review.txt"), proof);
const evidence = {
  path: relative(root, resolve(output, "synthetic-review.txt")),
  sha256: sha256(proof),
};
const rawPack = JSON.parse(
  await readFile(
    resolve(
      root,
      "Apps/English/English-Automaticity/apps/web/public/learning-core/curriculum-en.json",
    ),
    "utf8",
  ),
) as CurriculumPack;
const ledgerBefore = await readFile(
  resolve(root, "docs/automaticity-release-reviews.json"),
  "utf8",
);
const rawCoverage = JSON.parse(
  await readFile(resolve(root, "docs/automaticity-coverage.json"), "utf8"),
) as { cells: CoverageCell[] };
const selected = rawCoverage.cells.find(
  (cell) =>
    cell.language === "en" &&
    cell.stage === "retrieve" &&
    cell.modality === "writing",
)!;
function fixture() {
  const pack = structuredClone(rawPack),
    cell = structuredClone(selected),
    unit = pack.units.find((unit) => unit.id === cell.constructionId)!;
  unit.review = "human_reviewed";
  for (const task of unit.tasks) task.contentReview = "human_reviewed";
  cell.humanReview = "complete";
  cell.releaseEligible = true;
  const review: CellReview = {
    id: "synthetic-cell-review",
    language: cell.language,
    constructionId: cell.constructionId,
    stage: cell.stage,
    modality: cell.modality,
    contentVersion: pack.version,
    mappingVersion: pack.mappingVersion,
    unitSha256: unitDigest(unit),
    contentReview: {
      reviewerId: "synthetic-person-1",
      role: "Synthetic content reviewer",
      reviewedAt: "2026-09-04T09:00:00Z",
      decision: "approved",
      evidence,
    },
    evaluators: [
      {
        id: "synthetic-manual-review",
        version: "1",
        kind: "human",
        taskIds: [...cell.taskIds],
        rubricVersions: [
          ...new Set(unit.tasks.map((task) => task.rubricVersion)),
        ],
        review: {
          reviewerId: "synthetic-person-2",
          role: "Synthetic assessment reviewer",
          reviewedAt: "2026-09-04T10:00:00Z",
          decision: "approved",
          evidence,
        },
        benchmarkInput: null,
      },
    ],
  };
  return { pack, cell, unit, review };
}
type Fixture = ReturnType<typeof fixture>;
const report: {
  createdAt: string;
  status: string;
  scope: string;
  cases: { name: string; status: string }[];
  error?: string;
} = {
  createdAt: new Date().toISOString(),
  status: "running",
  scope:
    "Synthetic local fixtures only. No real content reviews, evaluator approvals, learning results or runtime settings changed.",
  cases: [],
};
const pass = (name: string) => {
  report.cases.push({ name, status: "passed" });
  console.log(`Passed: ${name}`);
};
const check = (f: Fixture) =>
  validateReleaseReviews(
    root,
    [f.cell],
    new Map([["en", f.pack]]),
    parseReviewLedger({ schemaVersion: 1, reviews: [f.review] }),
    "2026-09-05T00:00:00Z",
  );
async function rejected(
  name: string,
  change: (f: Fixture) => void,
  pattern: RegExp,
) {
  const f = fixture();
  change(f);
  await assert.rejects(() => check(f), pattern);
  pass(name);
}
try {
  const f = fixture();
  assert.deepEqual(await check(f), {
    reviewedCells: 1,
    evaluatorApprovedCells: 1,
  });
  pass("complete-manual-evaluator-scope-with-pinned-evidence");
  await assert.rejects(
    () => validateReleaseReviews(root, [f.cell], new Map([["en", f.pack]]), []),
    /Missing recorded human review/,
  );
  pass("review-flags-alone-cannot-qualify");
  await rejected(
    "invented-evaluator-mapping",
    (f) => (f.cell.evaluator = "invented-approved-evaluator"),
    /invented evaluator/,
  );
  await rejected(
    "release-with-pending-review",
    (f) => (f.cell.humanReview = "pending"),
    /without completed content review/,
  );
  await rejected(
    "source-is-still-authored",
    (f) => (f.unit.review = "authored"),
    /Review absent from content pack/,
  );
  await rejected(
    "same-version-prompt-edit",
    (f) => (f.unit.tasks[0]!.prompt += " changed"),
    /Stale reviewed content/,
  );
  await rejected(
    "same-version-answer-edit",
    (f) =>
      f.unit.tasks
        .find((t) => t.acceptedAnswers.length)!
        .acceptedAnswers.push("different answer"),
    /Stale reviewed content/,
  );
  await rejected(
    "same-version-prerequisite-edit",
    (f) => f.unit.prerequisites.push("changed"),
    /Stale reviewed content/,
  );
  await rejected(
    "stale-review-version",
    (f) => (f.review.contentVersion = "previous"),
    /Stale reviewed content/,
  );
  await rejected(
    "future-dated-review",
    (f) => (f.review.contentReview.reviewedAt = "2099-01-01T00:00:00Z"),
    /dated, approved human review/,
  );
  await rejected(
    "missing-reviewer",
    (f) => (f.review.contentReview.reviewerId = ""),
    /dated, approved human review/,
  );
  await rejected(
    "tampered-evidence-file",
    (f) =>
      (f.review.contentReview.evidence = {
        ...evidence,
        sha256: "0".repeat(64),
      }),
    /hash mismatch/,
  );
  await rejected(
    "approval-predates-content-review",
    (f) => (f.review.evaluators[0]!.review.reviewedAt = "2026-09-03T00:00:00Z"),
    /predates content review/,
  );
  await rejected(
    "missing-task-approval",
    (f) => f.review.evaluators[0]!.taskIds.pop(),
    /Invalid evaluator approval|missing for tasks/,
  );
  await rejected(
    "missing-rubric-approval",
    (f) => (f.review.evaluators[0]!.rubricVersions = []),
    /rubric not approved/,
  );
  await rejected(
    "duplicate-task-approval",
    (f) => f.review.evaluators.push(structuredClone(f.review.evaluators[0]!)),
    /duplicate evaluator task/,
  );
  await rejected(
    "unrelated-task-approval",
    (f) => f.review.evaluators[0]!.taskIds.push("unknown-task"),
    /Orphan or duplicate evaluator task/,
  );
  await rejected(
    "automated-evaluator-without-benchmark",
    (f) => (f.review.evaluators[0]!.kind = "transformer"),
    /lacks benchmark evidence/,
  );
  await rejected(
    "self-approved-model",
    (f) => {
      f.review.evaluators[0]!.kind = "rule";
      f.review.evaluators[0]!.review.reviewerId = f.review.evaluators[0]!.id;
    },
    /cannot approve itself/,
  );
  assert.throws(
    () =>
      parseReviewLedger({ schemaVersion: 1, reviews: [f.review, f.review] }),
    /Duplicate curriculum review/,
  );
  pass("duplicate-review-ledger-entry");
  const categories: BenchmarkCase["category"][] = [
    "correct_alternative",
    "grammar_error",
    "ambiguous",
    "off_target",
    "asr_corruption",
  ];
  const cases: BenchmarkCase[] = categories.flatMap((category) =>
    Array.from({ length: 20 }, (_, index) => ({
      id: `${category}-${index}`,
      language: "en" as const,
      modality: "writing" as const,
      contentVersion: f.pack.version,
      sourceId: "synthetic-test",
      license: "synthetic-test-only",
      constructionId: f.unit.id,
      rubricVersion: f.unit.tasks[0]!.rubricVersion,
      partition: "final" as const,
      itemFamily: `${category}-${index}`,
      category,
      expected:
        category === "correct_alternative"
          ? ("pass" as const)
          : category === "grammar_error"
            ? ("needs_repair" as const)
            : ("not_assessed" as const),
      humanReviewIds: ["synthetic-1", "synthetic-2"],
      sourceGroup: `synthetic-final-${category}-${index}`,
      templateFamily: `synthetic-final-${category}-${index}`,
      learnerGroup: null,
      contentFingerprint: sha256(`synthetic-final-${category}-${index}`),
      adjudicated: true,
    })),
  );
  const predictions: CandidatePrediction[] = cases.map((row) => ({
    caseId: row.id,
    verdict: row.expected,
    latencyMs: 30,
    meaningPreserved: true,
    targetObserved: true,
    cost: 0,
  }));
  const input = {
    candidate: { id: "synthetic-model", version: "1" },
    cases,
    predictions,
  };
  const benchmarkPath = resolve(output, "synthetic-benchmark.json");
  await writeFile(benchmarkPath, JSON.stringify(input));
  const model = fixture(),
    approval = model.review.evaluators[0]!;
  approval.kind = "transformer";
  approval.id = input.candidate.id;
  approval.benchmarkInput = {
    path: relative(root, benchmarkPath),
    sha256: sha256(JSON.stringify(input)),
  };
  await assert.rejects(() => check(model), /frozen evaluation evidence/);
  pass("bare-score-file-cannot-bypass-human-labels-and-frozen-evaluation");
  approval.version = "2";
  await assert.rejects(() => check(model), /not qualified for this version/);
  pass("model-version-mismatch");
  approval.version = "1";
  input.cases.forEach((row) => (row.modality = "speaking"));
  await writeFile(benchmarkPath, JSON.stringify(input));
  approval.benchmarkInput.sha256 = sha256(JSON.stringify(input));
  await assert.rejects(() => check(model), /scope does not cover task/);
  pass("speaking-benchmark-cannot-qualify-writing");
  input.cases.forEach((row) => (row.modality = "writing"));
  input.predictions[0]!.verdict = "needs_repair";
  await writeFile(benchmarkPath, JSON.stringify(input));
  approval.benchmarkInput.sha256 = sha256(JSON.stringify(input));
  await assert.rejects(() => check(model), /not qualified for this version/);
  pass("forged-pass-cannot-bypass-recomputed-benchmark");
  const originalText = await readFile(
    resolve(root, "docs/automaticity-release-reviews.json"),
    "utf8",
  );
  assert.equal(originalText, ledgerBefore);
  pass("real-review-ledger-remains-unchanged");
  for (const id of ["en.c.001", "de.c.001"]) {
    const target = resolve(output, `${id}-review-packet.json`);
    const generate = () =>
      Bun.spawn(
        ["bun", "scripts/prepare-automaticity-content-review.ts", id, target],
        { cwd: root, stdout: "ignore", stderr: "ignore" },
      ).exited;
    assert.equal(await generate(), 0);
    const before = await readFile(target, "utf8"),
      packet = JSON.parse(before);
    assert.equal(packet.content.id, id);
    assert.equal(packet.reviewDrafts.length, 14);
    assert(
      packet.reviewDrafts.every(
        (row: {
          contentReview: { reviewerId: string | null };
          evaluators: unknown[];
        }) =>
          row.contentReview.reviewerId === null && row.evaluators.length === 0,
      ),
    );
    pass(`${id}-review-packet-has-all-stages-and-no-invented-approval`);
    assert.notEqual(await generate(), 0);
    assert.equal(await readFile(target, "utf8"), before);
    pass(`${id}-existing-review-packet-is-preserved`);
  }
  report.status = "passed";
} catch (error) {
  report.status = "failed";
  report.error = String(error);
  throw error;
} finally {
  await writeFile(
    resolve(output, "report.json"),
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify({
      status: report.status,
      cases: report.cases.length,
      output,
    }),
  );
}
