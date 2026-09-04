import { expect, test } from "bun:test";
import {
  qualifyCandidate,
  parseBenchmarkInput,
  type BenchmarkCase,
  type CandidatePrediction,
} from "./qualification";
const candidate = { id: "synthetic-test-model", version: "1" };
const categories = [
  "correct_alternative",
  "grammar_error",
  "ambiguous",
  "off_target",
  "asr_corruption",
] as const;
const cases: BenchmarkCase[] = categories.flatMap((category, index) =>
  Array.from({ length: 20 }, (_, i) => ({
    id: `${index}-${i}`,
    language: "en",
    constructionId: "en.c.001",
    rubricVersion: "1",
    partition: "final",
    itemFamily: `${index}-${i}`,
    category,
    expected:
      category === "correct_alternative"
        ? "pass"
        : category === "grammar_error"
          ? "needs_repair"
          : "not_assessed",
    humanReviewIds: ["synthetic-review-A", "synthetic-review-B"],
    adjudicated: true,
  })),
);
const predictions: CandidatePrediction[] = cases.map((row) => ({
  caseId: row.id,
  verdict: row.expected,
  latencyMs: 20,
  meaningPreserved: true,
  targetObserved: true,
  cost: null,
}));
test("passing synthetic checks still require independent release approval", () => {
  const report = qualifyCandidate(cases, predictions, candidate);
  expect(report.eligibleForReleaseReview).toBe(true);
  expect(report.automaticallyApproved).toBe(false);
  expect(report.scopes[0]?.reportedCost).toBeNull();
});
test("unreviewed samples and leaked item families cannot qualify a model", () => {
  const report = qualifyCandidate(
    [
      ...cases.map((row) => ({ ...row, humanReviewIds: [] })),
      { ...cases[0]!, id: "development-duplicate", partition: "development" },
    ],
    predictions,
    candidate,
  );
  expect(report.eligibleForReleaseReview).toBe(false);
  expect(report.reasons.some((reason) => reason.includes("leakage"))).toBe(
    true,
  );
});
test("false corrections, missing predictions and indiscriminate abstention fail", () => {
  expect(
    qualifyCandidate(
      cases,
      [
        { ...predictions[0]!, verdict: "needs_repair" },
        ...predictions.slice(1),
      ],
      candidate,
    ).eligibleForReleaseReview,
  ).toBe(false);
  expect(
    qualifyCandidate(cases, predictions.slice(1), candidate)
      .eligibleForReleaseReview,
  ).toBe(false);
  expect(
    qualifyCandidate(
      cases,
      predictions.map((row) => ({ ...row, verdict: "not_assessed" })),
      candidate,
    ).eligibleForReleaseReview,
  ).toBe(false);
});
test("malformed external benchmark records are rejected", () => {
  expect(() =>
    parseBenchmarkInput({
      candidate,
      cases: [{ id: "broken" }],
      predictions: [],
    }),
  ).toThrow();
});
