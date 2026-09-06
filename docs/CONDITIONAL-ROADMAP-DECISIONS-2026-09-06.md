All five conditional roadmap cards now have an explicit eligibility decision. A green **Deferral decision verified** badge means that the reasons for postponement were checked against the current files and executable safeguards. The task's implementation/activation status is preserved; the badge does not count as completed experimentation, human review or learning benefit.

| Task | Checked decision | Evidence needed to reopen |
| --- | --- | --- |
| M04 | Keep the implemented Transformer adapter unqualified for activation. | Independently reviewed M01–M03 results, selected model and correction review, then verification of the enabled release. |
| S03 | Keep the baseline scheduler active. The bounded pilot's rollback is tested. | A favourable independently assessed S02 comparison, R03 qualification and verification of the selected broader rollout. |
| X01 | No live bandit experiment is justified by the submitted inputs. | Consented delayed outcomes, eligible actions and logged probabilities, plus a justified prospective sample/uncertainty plan. |
| X02 | Retain the tested offline prototype; defer the learner experiment. | X01 readiness, R03 and actual participant opt-in, followed by the approved live implementation and frozen evaluation. |
| X03 | Defer sequential RL; added value remains unmeasured. | A completed X02 comparison and longitudinal evidence identifying a sequential decision problem and benefit beyond simpler policies. |

The present review ledger has no real approved curriculum cells. Both delivered scheduler-pilot declarations are empty. The readiness run explicitly uses `--empty`: it establishes that **no development export was submitted**, and does not claim to have inspected all private learner data or to have found that the learner has never practised.

This review also fixed the offline bandit's reward boundary. An imported `scopeApproved` flag is insufficient: the exact original response, current task definition and independent human evaluator procedure must match the validated review manifest. Model self-approval, missing/stale procedures and retired actions or probes cannot produce rewards. The explicit `probeCatalog` development import requires independently reviewed **calibration** tasks; final evaluation material cannot enter that import. The default study-probe loader still requires the evaluation partition.

Reproduce the code checks with `bun test ./scripts/practice-bandit.test.ts ./scripts/reviewed-curriculum.test.ts ./scripts/learning-study.test.ts ./scripts/conditional-roadmap.test.ts`. Run `bun scripts/replay-practice-bandit.ts --empty` to record readiness without a submitted learner export. A real consented export uses `--input=PATH`, containing decisions/events and, when needed, an independently reviewed private calibration `probeCatalog`; its review evidence must exist with matching hashes.

The [current decision record](roadmap-decisions/2026-09-06t06-24-43-873z-conditional-eligibility.json) pins source inputs and records the commands and log hashes. Source and record hashes use UTF-8 text with LF line endings so Windows and hosted Git checkouts agree; log hashes preserve exact bytes. The HTML generator refuses altered decision evidence or changed source inputs. A later qualification requires a fresh decision record and the actual enabled-release or experiment checks described on the cards. No new model, live RL policy or broad scheduler has been activated.

Validation on 6 September 2026:

- 29 reward, probe-import, study and conditional-decision tests passed; 11 scheduler/rollback tests passed. All six recorded eligibility checks passed.
- All 21 root engineering gates passed. The two human-acceptance gates returned the expected pending result; this is not human approval.
- Live and standalone roadmap browser checks passed, including all five decision badges, reopening criteria, exclusion from the fully verified filter and mobile layout. The isolated roadmap verifier passed 15 cases for updates, history, escaping, invalid inputs and navigation.
- SHA-256 comparison preserved all 805 captured app/shared source files. English 27.3.41 and DeutschFlow 20.8.45 remain the installed engineering releases; only root tools, tests and roadmap documentation changed.

Local verification reports: `artifacts/conditional-roadmap/2026-09-06T06-24-43-873Z/checks.json`, `artifacts/language-technical-checks/2026-09-06T06-25-17-928Z/report.json`, `artifacts/completion-roadmap/2026-09-06T06-25-19-204Z/report.json`, `artifacts/language-roadmap/2026-09-06T06-25-19-204Z/report.json` and `artifacts/conditional-roadmap/delivery/app-preservation.json`. They are engineering fixtures and logs, not learner outcomes.
