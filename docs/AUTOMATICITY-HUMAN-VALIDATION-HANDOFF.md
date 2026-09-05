# Human validation handoff

The remaining decisions require independent language review, learner-authored work or elapsed time. Engineering results do not supply those judgments. The roadmap shows these separately from verified code and delivery checks.

## Review the content and assessment procedure

The current catalog contains 280 constructions, 4,924 active tasks and 3,906 required stage/modality cells. There are also 506 archived task definitions. The representative L01 subset contains 168 cells. The existing packet set is `artifacts/content-review-packets/all-20260905-feedback38-42`; its task bytes remain current for English 27.3.40 and DeutschFlow 20.8.44. Its review fields are intentionally blank.

A qualified reviewer completes the packet's content evidence and, separately, its manual evaluator evidence. Each judgment must refer to the actual task and state specific findings. A signature field alone does not approve a task. Do not copy the synthetic engineering fixtures into the real ledger.

Combine completed documents into one local JSON file:

```json
{
  "schemaVersion": 1,
  "contentReviews": [],
  "evaluatorReviews": []
}
```

The empty example is a format guide; importing it will fail. Add the completed documents to the arrays, then run from the repository root:

```powershell
bun scripts/import-curriculum-review.ts path/to/completed-reviews.json
```

This stages validated catalogs, coverage and a review ledger without changing the app. For a completed bundle that should be applied to source:

```powershell
bun scripts/import-curriculum-review.ts path/to/completed-reviews.json --apply
bun scripts/build-automaticity-curriculum.ts --check
bun scripts/build-grammar-scope.ts
bun scripts/check-automaticity-coverage.ts --release
```

Application checks source hashes, saves original files in the import directory and refuses stale or overlapping reviews. A failed replacement rolls back bytes it wrote if they have not since changed. Interrupted operations retain originals for recovery. Replacing a prior review requires explicit conflict resolution; it is not silently overwritten. The curriculum generator now derives review flags from validated evidence, so rebuilding cannot erase a legitimate review. Source promotion still requires the normal app build and installer verification before it is an installed release.

The generator also compiles `review-approvals-en.json` and `review-approvals-de.json`. These bind the named reviewer and documented procedure to the exact curriculum and task hashes. They are currently empty. After a real review is compiled and installed, the matching reviewer can record qualified feedback through the ordinary response-review form. New responses appear even when that form is already open. A different reviewer, changed task, missing manifest or retrospective scope remains unqualified feedback. Speaking additionally requires loading the original recording, playing it and confirming that it was reviewed. Names are local recorded identities, not authenticated accounts. Checking the human-review option alone does not approve a scope.

Exit code 2 from either release-coverage gate means human qualification remains incomplete. Structural errors are separate failures. Reviews do not enable a Transformer automatically. Automated evaluator approval still uses the frozen benchmark and release compiler.

## Collect personal learning evidence

The learner chooses whether to participate and produces the original writing or recordings. A reviewer prepares comparable unseen probes and records their review before use. Keep them private, separate from practice and model training. The analysis tool accepts an optional `probeCatalog` containing reviewed `packs` and their `reviews`; it validates the evidence files through the same release-review gate. Reused practice IDs/item families, exposed solutions and unreviewed probes are rejected. The tool does not publish these probes to the practice catalog.

Create a prospective study export using the types in `scripts/lib/learning-study.ts`: `study`, `events` and `audio`, plus `probeCatalog` when using private probes. Each recording entry contains its SHA-256 and original base64 bytes. Declare the baseline and follow-up windows before collecting responses, using delays of 24, 168 or 720 hours. The first response in each planned window is used; a successful retry cannot replace it. Two preplanned unseen baseline observations are allowed, while recorded target practice or assistance is flagged. Unknown practice outside the app remains a limitation that the reviewer must record.

```powershell
bun scripts/evaluate-learning-study.ts path/to/consented-study-export.json
```

The report separates English/German, writing/speaking, baseline, retention and transfer. It shows assessed successes and failures, exclusions, missing follow-ups, pending windows, opportunity counts, writing latency and uncertainty. Its accuracy is the proportion of assessed probe responses that passed, not a fabricated count of correct grammar opportunities. Original audio bytes and a qualified human audio review are required for the speech endpoint. Missing follow-ups do not count as errors or successes. The result is descriptive; it does not establish causal benefit, a CEFR level or automatic mastery.

For accuracy per target opportunity, add `opportunityScores` with `assessmentId`, `responseSha256`, `definitionSha256`, `reviewedAt`, `checked` and `correct` for each independently checked response. The tool binds these counts to the exact assessment and rejects duplicates or inconsistent counts. For example, one correct use among two checked opportunities contributes 1/2 to this metric even when the overall response needs repair. Missing breakdowns remain unscored; they are never reconstructed from the overall verdict. The report exposes both denominators. The study evaluator also verifies the assessment's actual approved procedure; a `scopeApproved` flag alone is insufficient.

## Evaluate scheduling and feedback

```powershell
bun scripts/evaluate-fsrs-shadow.ts path/to/consented-fsrs-export.json
bun scripts/replay-practice-bandit.ts --input=path/to/consented-development-log.json
```

The FSRS export contains `language`, `consent`, `events` and explicit `ratings`. It accepts only qualified familiar-item outcomes with an exact task-definition hash. Predictions are calculated before observing each later rating. The first review has no scored prediction. Empty data yields no Brier score, log loss or benefit claim. Candidate due counts are not observed workload, and the tool never changes learner due dates.

The contextual-bandit prototype remains offline. Its test results establish software behavior only. A real comparison needs consent, eligible reviewed probes, decision probabilities, delayed outcomes and a reviewer-approved design. Sequential reinforcement learning remains conditional on evidence that a simpler selector is insufficient. It is not necessary for ordinary practice.

The deployed assessment feedback guard already remembers a documented disagreement for the same task definition, response and evaluator. It preserves the original judgment and sends the disputed case for review; it does not teach itself a global grammar rule from its own prediction.

## Repeat the engineering checks

```powershell
bun scripts/verify-language-technical-completion.ts
node scripts/verify-curriculum-routes.mjs
```

The first command records all engineering gate results and verifies that missing human evidence cannot qualify a release. The second checks all 3,906 stage/modality cells through the installed app controls, using isolated browser profiles. Neither substitutes for language review or learner participation. Review-packet validation in the engineering runner is explicitly file-only.
