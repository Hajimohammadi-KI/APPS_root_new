import { isRecord } from "../../shared/learning-core/src/automaticity/contracts";
import {
  qualifyCandidate,
  type BenchmarkCase,
  type CandidatePrediction,
} from "../../shared/learning-core/src/automaticity/qualification";
import {
  transformerConfigurationSha256,
  type TransformerConfig,
} from "../../shared/learning-core/src/automaticity/transformer";
import {
  validateTransformerRelease,
  type TransformerRelease,
} from "../../shared/learning-core/src/automaticity/transformer-route";
import {
  digest,
  type BenchmarkDraft,
  type PredictionRun,
} from "./model-benchmark";
/** Call only after the immutable evaluation evidence chain has been checked. */
export async function buildReviewedTransformerRelease(
  input: {
    cases: BenchmarkCase[];
    predictions: CandidatePrediction[];
    candidate: { id: string; version: string };
  },
  inputText: string,
  run: PredictionRun,
  config: TransformerConfig,
  reviewText: string,
): Promise<TransformerRelease> {
  const configurationSha256 = await transformerConfigurationSha256(config);
  if (
    config.candidateId !== input.candidate.id ||
    config.version !== input.candidate.version ||
    run.configuration?.providerConfigurationSha256 !== configurationSha256
  )
    throw Error("Final benchmark did not pin this provider configuration");
  const result = qualifyCandidate(
    input.cases,
    input.predictions,
    input.candidate,
  );
  if (!result.eligibleForReleaseReview)
    throw Error("Candidate has no qualified final scopes");
  // Do not pool different task versions to meet a per-scope sample minimum.
  const final = input.cases.filter(
    (row) => row.partition === "final",
  ) as BenchmarkDraft[];
  const key = (row: BenchmarkDraft) =>
    JSON.stringify([
      row.language,
      row.constructionId,
      row.taskVersion,
      row.rubricVersion,
      row.modality,
    ]);
  for (const tuple of new Set(final.map(key))) {
    const cases = input.cases.filter(
      (row) =>
        row.partition !== "final" || key(row as BenchmarkDraft) === tuple,
    );
    const ids = new Set(cases.map((row) => row.id));
    if (
      !qualifyCandidate(
        cases,
        input.predictions.filter((row) => ids.has(row.caseId)),
        input.candidate,
      ).eligibleForReleaseReview
    )
      throw Error("Each task version needs its own qualified scope");
  }
  const review: unknown = JSON.parse(reviewText);
  if (
    !isRecord(review) ||
    review.schemaVersion !== 1 ||
    review.decision !== "approved" ||
    typeof review.reviewerId !== "string" ||
    !review.reviewerId.trim() ||
    /codex|chatgpt|synthetic|fixture/i.test(review.reviewerId) ||
    typeof review.role !== "string" ||
    !review.role.trim() ||
    typeof review.note !== "string" ||
    review.note.trim().length < 20 ||
    review.qualificationSha256 !== digest(inputText) ||
    review.configurationSha256 !== configurationSha256 ||
    typeof review.reviewedAt !== "string" ||
    !Number.isFinite(Date.parse(review.reviewedAt)) ||
    Date.parse(review.reviewedAt) > Date.now() ||
    Date.parse(review.reviewedAt) < Date.parse(run.finishedAt) ||
    input.cases.some(
      (row) => (row as BenchmarkDraft).authoredBy === review.reviewerId,
    )
  )
    throw Error(
      "An actual independent, dated release review bound to these results is required",
    );
  const rows = input.cases.filter(
    (row) => row.partition === "final",
  ) as BenchmarkDraft[];
  const approvals = ["en", "de"].flatMap((language) => {
    const selected = rows.filter((row) => row.language === language);
    if (!selected.length) return [];
    if (selected.some((row) => row.modality !== "writing"))
      throw Error("This text adapter cannot approve spoken assessment");
    const scopes = [
      ...new Map(
        selected.map((row) => {
          const scope = {
            constructionId: row.constructionId,
            taskVersion: row.taskVersion,
            rubricVersion: row.rubricVersion,
            modality: row.modality,
          };
          return [JSON.stringify(scope), scope];
        }),
      ).values(),
    ];
    return [
      {
        approved: true,
        evaluatorId: config.candidateId,
        evaluatorVersion: config.version,
        language: language as "en" | "de",
        constructionIds: [...new Set(scopes.map((row) => row.constructionId))],
        rubricVersions: [...new Set(scopes.map((row) => row.rubricVersion))],
        modalities: ["writing" as const],
        scopes,
        benchmarkSha256: digest(inputText),
        configurationSha256,
      },
    ];
  });
  const release: TransformerRelease = {
    schemaVersion: 1,
    kind: "qualified-local-transformer-release",
    config,
    configurationSha256,
    approvals,
    review: {
      reviewerId: review.reviewerId,
      reviewedAt: review.reviewedAt,
      evidenceSha256: digest(reviewText),
      qualificationSha256: digest(inputText),
    },
  };

  return validateTransformerRelease(release);
}
