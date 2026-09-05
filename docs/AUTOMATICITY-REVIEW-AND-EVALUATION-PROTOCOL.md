# Review and evaluation protocol

Updated 5 September 2026. This implements the review gates in the [roadmap](LANGUAGE-AUTOMATICITY-IMPLEMENTATION-ROADMAP.md).

The current release provides practice across the existing English and German catalogs. It does not certify that the learner has mastered them. The construction map and the new spoken tasks are authored material awaiting independent language review.

## Content review

Use `shared/learning-core/content/construction-map.json` as the stable crosswalk. Never regenerate an existing identifier from a title. Review each construction's prerequisites, explanation, examples, accepted alternatives, and writing and speaking tasks at all seven stages. Correct mappings explicitly and keep old lesson aliases.

The executable matrix is `docs/automaticity-coverage.json`. Each cell has a corresponding task in `docs/automaticity-coverage-backlog.json`. “Authored” means there is a task. “Human reviewed” requires a real recorded review. A missing or unreviewed cell cannot be counted as completed coverage. Add constructions found missing during reference review; the original 112 and 144 units are a migration baseline.

For a task to support independent evidence, the reviewer must confirm that the prompt elicits the intended construction, valid alternatives are accepted, examples are not shown before the response, and the task has an approved assessment scope. Keep teaching, calibration and final evaluation item families separate. Do not relabel an exposed exercise as a novel test.

## Assessment qualification

### Recorded curriculum release reviews

`docs/automaticity-release-reviews.json` holds actual content-review records and evaluator approvals. Its initial review list is empty. The coverage checker now requires this evidence before accepting a reviewed or release-eligible cell. Changing flags alone cannot qualify content.

Generate a review packet with `bun scripts/prepare-automaticity-content-review.ts en.c.001` (or a German construction ID). It contains the complete construction and all writing/speaking tasks, with empty reviewer fields and a task approval checklist. Generation refuses to overwrite an existing packet. The packet is a draft for the reviewer; it is not approval.

Each recorded cell review pins the content version, mapping version and SHA-256 of the construction. That hash includes prompts, answers, variants, examples, sources, prerequisites and task identities. Only the unit/task review-status flags are excluded, so recording a review does not change the content it reviewed. Same-version content edits invalidate the earlier review.

The content review needs a real reviewer ID, role, date, approved decision and a workspace evidence file with a matching SHA-256. Each evaluator approval identifies its kind (`human`, `rule`, or `transformer`), version, covered task IDs and rubric versions, plus a dated approval record. Every task in a release-eligible cell needs an evaluator; approval for one closed exercise does not qualify its neighbouring open response. A human evaluator requires a documented manual assessment procedure. Automated evaluators also require hash-pinned benchmark input; the gate recomputes qualification and checks language, modality, construction, content version, rubric and candidate version. It does not trust a saved pass flag or activate the evaluator.

Use the `CellReview` interface in `scripts/lib/automaticity-release-reviews.ts` for the record format. Run `bun scripts/check-automaticity-coverage.ts --release` after adding actual reviewed records and corresponding source flags. Exit 2 means structural checks passed but reviewed release coverage is still incomplete. Malformed, stale, mismatched or unsupported claims fail validation. The local ledger checks recorded identity and evidence integrity; it does not authenticate the reviewer's identity or replace independent human review.

`scripts/qualify-automaticity-model.ts` compares saved predictions with reviewed labels. Input contains a pinned candidate identity, cases, and predictions. Each case records language, modality, construction ID, content version, rubric version, source ID and licence. Reports separate those scopes: writing results cannot qualify speech, and an earlier content version cannot qualify changed tasks. The validator rejects duplicate cases, item-family overlap across partitions, incomplete human review, missing predictions, and invalid timing or cost values.

The initial engineering gate requires 20 final cases in each category per released scope: correct alternatives, grammar errors, ambiguity, off-target answers, and ASR corruption. These counts are a starting qualification requirement, not a claim of statistical certainty. Two distinct review identifiers and adjudication are required. Final testing must report false corrections, missed errors, meaning changes, abstention, target judgments, latency and known cost. Missing cost remains unknown. A model that abstains on every supported case cannot qualify by avoiding mistakes.

Passing this gate makes a candidate eligible for a separate release review. It never activates the model. Promotion also needs a review of uncertainty, confidence intervals, representative learner samples, deployment privacy, and the exact model version. `validateModelAssessment` accepts only a pinned, approved scope with its benchmark hash. A provider cannot approve itself by returning `scopeApproved: true`.

No Transformer has been qualified by this work. No model was trained on learner responses. Open production is saved for review and does not receive an invented correctness score. A controlled-answer match is useful practice feedback; it does not qualify the entire grammar family.

## Personal baseline and follow-up

1. Record the learner's selected level as a preference. Do not infer speaking ability from the earlier written examples or certify a CEFR level.
2. Collect original writing and actual recordings across several constructions before changing the learning policy. Record help, exposure, modality, and interruptions. Do not reconstruct an earlier baseline from current results.
3. Start with one or two daily focuses and at most five active repair priorities. Use short retrieval, variation, original production, repair and transfer tasks. Add complexity after reliable short production.
4. Use a new task and context to assess transfer. Target-named prompts, elicited target use and free transfer are different conditions and must remain identifiable.
5. Return on later days. The reducer checks elapsed time since the latest attempt or teaching exposure. A fresh unaided return to a familiar item after at least 24 hours can support retention; it never becomes novel transfer. Hints or model exposure within that interval and linked repair attempts remain assisted practice. The 24-hour interval is an initial engineering rule to evaluate, not a universal learning threshold. A due date, a “return later” button, and repeated copying do not prove retention.
6. Compare supported accuracy, repair recurrence, independent response timing, new-context performance, and delayed outcomes separately for writing and speaking. Include failed assessed attempts in the denominator. Unassessed responses remain unknown.
7. Review recordings independently of transcripts. A manually typed transcript is not pronunciation or fluency evidence. Timing after an interrupted session is unavailable; background-tab time is excluded from active writing time.

The learner must produce these samples. The application cannot generate them as evidence of the learner's ability. Real delayed retention therefore remains unmeasured until later practice and review happen.

## Scheduler and reinforcement learning

The deployed policy is an explainable baseline. It gives priority to due practice and observed repair needs, then under-practised constructions. Unobserved skills are not classified as weaknesses. A revisit may be scheduled even when an answer is awaiting assessment; that scheduling decision never adds mastery credit.

The FSRS module stays in shadow mode. `qualifyProspectiveReviews` requires consent recorded before the original delayed attempt and an explicit rating linked to its current qualified assessment. It rejects missing, conflicting, premature and invalidated ratings. Legacy aggregates never supply missing history. `buildQualifiedFsrsCandidates` calculates candidate dates without writing learner due dates or enabling rollout. These functions have synthetic tests; no qualified prospective learner history or candidate-schedule experiment has been collected. Keep the baseline available for rollback.

The qualification report includes false-correction and missed-error denominators and a Wilson 95% upper bound for false corrections. Zero observed errors in a small sample does not establish a zero population error rate. The independent release review must assess this uncertainty as well as the engineering gate.

A contextual-bandit or reinforcement-learning experiment requires reviewed outcomes, a pre-intervention baseline, explicit participation consent, adequate observations, logged action probabilities, and a held-out evaluation. Its reward must reflect later independent retention and transfer, not clicks, time spent, streaks, or immediate model agreement. No adaptive policy is activated merely because its code runs. These conditions cannot be satisfied with synthetic test fixtures.

## Recovery and release

Complete backups preserve language-owned local state and the app's audio/content databases. Restores validate the envelope and media hashes before changing data, save a recovery journal, and roll back on failure. Older backups can restore their text/evidence while keeping existing recordings, but cannot recover recordings they never contained. Close other app tabs before restoring.

Run the focused evidence tests, curriculum generation check, shared mirror check, complete app checks, real browser practice and preservation tests, and isolated installer lifecycle. A passing build verifies software behavior, not learning effectiveness. Preserve the original data and distinguish synthetic preservation fixtures from verification of a real learner profile.
