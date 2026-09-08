# Learning from assessment errors

The apps now have a local feedback memory for the writing checker. A reviewer can disagree with an automatic judgment in the existing review panel. When exactly the same answer, task definition and checker version recur, the app saves the original proposal but withholds the disputed judgment and requests review. It does not turn the review into a general grammar rule or a mastery credit.

This is a working feedback loop, not neural-model training. English and German share the implementation. It is delivered locally in **English 27.3.38** and **DeutschFlow 20.8.42**. Both versions passed installation, exact previous-version upgrade, startup, update, repair, uninstall and full learner-profile preservation. Installed browser checks cover the feedback flow, all 12 representative scopes, Daily, practice, review drafts and audio backup/restore. Delivery hashes and evidence are in `artifacts/assessment-feedback-delivery/verification.json`.

## What the learner sees

1. Submit a written response in Practice.
2. Open the review panel and save a separate reviewer judgment with a reason. A self-check does not teach the checker.
3. If the reviewer disputes the automatic result, a repeat of that exact answer receives an explicit review message instead of the same disputed score.
4. If a later review withdraws the disagreement, the old review remains in history and the restriction is removed. Conflicting reviews keep the answer unassessed.
5. Use **Download checker feedback** or **Rückmeldungen zum Prüfer herunterladen** to save a local JSON report containing the selected answers and feedback. There is no automatic upload.

The report identifies local review history. It does not authenticate an independent reviewer. Speaking still requires review of the original recording and is excluded from this writing feedback memory.

## Evidence and preservation

New attempts record a SHA-256 digest of the full task definition. Feedback is reusable only when task identity, definition, response, evaluator ID and evaluator version match. Changed prompts, stale content, missing legacy hashes, future timestamps, uncertain or invalidated reviews and conflicting event IDs cannot silently teach the checker. Old records remain readable and preserved.

Feedback is derived from the existing immutable event ledger, so it uses the existing backup and restore path. The superseding abstention is persisted before the disputed machine proposal. If storage fails between those writes, a disputed pass cannot become the current judgment.

Ten focused feedback tests pass, including interruption during persistence. Isolated browser tests reproduce the old behavior in installed English 27.3.37 and DeutschFlow 20.8.41, then exercise both languages through disagreement, repeat, reload, download and retraction on the changed source. Test reviews are explicitly synthetic and never enter the actual language-review ledger.

## Turn saved mistakes into evaluation work

Run `bun scripts/import-assessment-feedback.ts PATH-TO-DOWNLOADED-JSON` with an explicitly chosen export. The importer reconstructs each case from its immutable history, verifies current task and response hashes, rejects altered or duplicate records and groups repeated identical examples. Contradictory reviews remain ambiguous pending adjudication.

The output is a private **development** manifest compatible with the existing benchmark runner. Expectations are proposals, independent reviews remain empty, and release approval is false. Sixteen checks verify the import boundary for English and German. These examples must not be reused as unseen final tests, delayed learning rewards or permission to publish learner text.

The remaining qualification sequence is:

1. Collect actual mistaken or uncertain judgments through the app.
2. Obtain independent language judgments, resolve disagreements and record their provenance against the exact tasks.
3. Fix rules or compare a candidate model on development examples; preserve each error as a regression case.
4. Choose thresholds on separate calibration data, then freeze model, prompts, rules and evaluation inputs.
5. Evaluate unseen final cases, including valid alternatives, role/meaning errors, irrelevant text and abstention. Approve only the supported language/construction/modality scopes.
6. Deliver a new version with current runtime, installer, preservation and browser evidence. Keep unsupported scopes on explicit review.

The refreshed 74-case construction comparison is an implementation regression diagnostic. Its expected labels were authored during implementation; it is not an independent accuracy result. L01 and M01–M04 retain their language-review and model-qualification requirements.

## Reinforcement-learning prototype

`scripts/lib/practice-bandit.ts` implements an offline contextual-bandit prototype for choosing among retrieval, variation and production. The context is language, construction and writing mode. A contextual bandit observes the reward for the chosen action, as described in the [official Vowpal Wabbit tutorial](https://vowpalwabbit.org/docs/vowpal_wabbit/python/latest/tutorials/python_Contextual_bandits_and_Vowpal_Wabbit.html). Keeping this initial experiment bounded to practice selection is a project design choice.

The prototype requires explicit development decision logs with eligible options, chosen action, action probabilities, policy version, consent record and a linked later probe. It accepts only reviewed writing tasks and an independent, qualified, novel-context retention or transfer judgment at least 24 hours later. Copies, hints, final-test cases, self-grading, uncertain results, stale tasks, intervening practice and duplicated outcomes cannot reward a decision. A confirmed error or missing target earns zero; a missing follow-up is excluded rather than counted as failure.

Action values use a Beta(1,1) estimate. The shadow suggestion uses bounded epsilon exploration across strategies, then divides probability among tasks, so extra copies of one strategy do not increase its share. Descriptive inverse-propensity arithmetic checks logged probabilities and refuses unsupported alternatives with no overlap. It is not a doubly robust estimator, a causal finding or evidence of learner benefit; it must not be used to select and certify a policy on the same records.

Eight synthetic policy tests pass. `bun scripts/replay-practice-bandit.ts --empty` records the current readiness without reading learner data. `--input=PATH` replays an explicitly exported development log. Outputs contain source and input hashes and **active: false**.

The policy is **not connected to Daily**, no real reward dataset has been supplied and no Transformer has been trained. Activation still requires a reviewed prospective design, adequate observations and uncertainty analysis, separate final evaluation, and evidence of benefit without an unacceptable decline in other outcomes. The current Daily rule-based selector remains active. X01–X03 are therefore not reported as completed experiments.

## Current evidence

- Source browser: `artifacts/assessment-feedback-browser/2026-09-05T19-23-15-310Z/report.json`
- Old installed behavior: `artifacts/assessment-feedback-browser/2026-09-05T19-28-29-310Z/report.json`
- Installed feedback flow: `artifacts/assessment-feedback-browser/2026-09-05T19-42-55-822Z/report.json`
- Installed export/import checks: `artifacts/feedback-import-check/2026-09-05T19-45-43-973Z/report.json`
- Representative adapter checks: `artifacts/representative-model-evaluation/2026-09-05T19-35-18-514Z/report.json`
- Offline readiness: `artifacts/practice-bandit/2026-09-05T19-35-19-018Z/report.json`
- Full review-packet file checks: `artifacts/content-review-packet-check/2026-09-05T19-35-50-193Z/report.json`

All 280 refreshed packets account for 3,906 required cells and 4,924 current tasks, with 506 archived definitions preserved. Packet files and hashes were checked; their browser index was not opened in this run. The actual independent review forms remain blank.
