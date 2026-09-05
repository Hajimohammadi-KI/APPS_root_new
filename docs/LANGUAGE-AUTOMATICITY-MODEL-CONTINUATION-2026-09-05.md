The model diagnostic runner now exercises the 12 representative construction checkers through their exact production tasks. Previously, its rule candidate only compared text with a stored accepted answer. The new adapter checks the complete task binding and current source/curriculum hashes before calling the shared assessment function.

The 74 development cases deliberately reuse implementation regression examples, with model-authored expected outcomes. They do not constitute independent language review or untouched evaluation. Both candidate runs used the same prompts and responses; the closed-answer comparator received one canonical reference per task.

| Recorded judgment | Closed-answer comparator | Representative checker |
| --- | ---: | ---: |
| Pass | 12 | 24 |
| Needs repair | 0 | 24 |
| Requested target absent | 0 | 2 |
| Not assessed | 62 | 24 |

The 24 repair judgments include 12 intended grammar errors and 12 grammatical responses with changed participants or meaning. Unsupported wording and damaged text abstain. False relevance/target values are preserved instead of being collapsed into unknown. These diagnostic outcomes do not measure language accuracy on unseen learner work. The original 20-case LanguageTool/Qwen comparison is preserved and was not rerun on this set.

Verification passed: 18 adapter checks, all 74 expected development outcomes, 24 existing evidence-chain checks, five existing provider-transport checks, and the language-tools TypeScript check. The adapter rejects changed prompts, task identities, content/task/rubric versions, modalities, normalization settings and falsely pinned candidate versions. The 74-case benchmark cannot pass the independent-review gate.

Evidence: [adapter verification](../artifacts/representative-model-evaluation/2026-09-05T18-52-38-481Z/report.json), [evidence-chain verification](../artifacts/model-evaluation-gates/2026-09-05T18-51-15-417Z/report.json), [provider checks](../artifacts/model-adapter-gates/2026-09-05T18-51-15-583Z/report.json), [comparison](model-evaluation/representative-comparison.json), [current support matrix](model-evaluation/support-matrix.json).

The support matrix now includes all 168 representative tasks across the current 3,906 required cells. It records bounded practice feedback and keeps every automatic approval false. Independent reviews, separate calibration/final data, and learner outcomes remain outstanding. M01/M03 stay in progress; the reviewed comparison required by M02 stays blocked. Missing review does not block further curriculum authoring, validator work or engineering tests.

This increment changes development tools, diagnostic data and roadmap documentation. All 771 captured application/shared files still match the delivered English 27.3.37 / DeutschFlow 20.8.41 source snapshot. No app binary, installer, learner profile or activation setting was changed, so this increment does not require an installer rebuild. The earlier release snapshot is preserved; it is not relabelled as a snapshot of these later tool/document changes.
