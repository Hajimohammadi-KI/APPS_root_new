# Phase 5 verification

Updated 5 September 2026. **L02, L03, L04 and L05 meet their recorded engineering acceptance criteria** on installed English 27.3.35 and DeutschFlow 20.8.39. L01 remains in progress because its deliverable includes reviewed bilingual construction packs.

| Task | Status | Verified scope |
| --- | --- | --- |
| L01: construction validators and tasks | In progress | The current packs and targeted corrections are authored. Controlled checks abstain on unsupported alternatives, and open responses use the review path. Independent linguistic review and qualified representative evaluators remain missing. |
| L02: audio and timing | Verified | Browser MediaRecorder stores playable, hash-checked audio. Permission refusal preserves the draft. Typed transcripts and absent, empty, unpersisted or edited speech evidence cannot establish spoken success. Untimed responses retain qualified accuracy without a response-time claim. |
| L03: Daily and Grammar | Verified | Both installed language routes use the shared evidence. Actual UI checks cover saved drafts, hints/model exposure, linked repair, reload, back/forward navigation, exact assets and offline restore. |
| L04: remaining learning routes and review | Verified | Six English and seven German routes agree on the same original response and next repair. Separate review drafts preserve original responses and recordings. Synthetic reviewed verdicts recompute progress; unsupported local reviews cannot approve their own scope. Prospective review checks enforce elapsed time, task identity and exposure. |
| L05: representative full cycle | Verified architecture | Four installed-browser cases cover both languages and both productive modes through production, feedback, repair, new-context transfer and simulated next-day/next-week review. Repair adds no independent success; the original failure remains in the denominator. A superseding review recomputes the result without changing original events. |

The full-cycle clock, judgments and response/audio metadata are synthetic fixtures in isolated browser contexts. Separate installed UI and recording tests exercise actual browser behavior. These checks do not prove learner improvement, actual ASR quality, physical microphone compatibility or screen-reader accessibility. Those limitations remain in the accessibility and pilot work; they are not hidden by these four green architecture cards.

## Evidence

- [practice](../artifacts/automaticity-practice/2026-09-05T16-53-48-304Z/report.json): SHA-256 `11133270e8966e9fe752831f465f0b15ea771a18a3bc6aaf88c79fcc5b4660ff`.
- [recording](../artifacts/automaticity-recording/2026-09-05T16-57-05-708Z/report.json): SHA-256 `46a0416e64839a9d340cf9fa68e89e53d634f470921f9c40e4dc66da3635955a`.
- [reviews](../artifacts/review-drafts/2026-09-05T16-57-05-960Z/report.json): SHA-256 `5e720d018c277133ecda4a5732765f4b35fce8eaea1691bc36735c3aa7eec7fb`.
- [recall](../artifacts/prospective-recall/2026-09-05T16-53-48-662Z/report.json): SHA-256 `ac0e8d9cfef990989b23b331e139c4fe2105cd7238af9d3b2f064d42d166b002`.
- [cycle](../artifacts/phase5-cycle-browser/2026-09-05T16-52-24-585Z/report.json): SHA-256 `638206d36e765cca2d3f6a3added6abf95c7a394d40821a676c167718dde768f`.
- [routes](../artifacts/phase7-browser/2026-09-05T16-52-24-436Z/report.json): SHA-256 `0c43ec058ca2637ff2f0d51481d4e68f372e3e416db1ee0154fe0201ff3f58b2`.
- [archive](../artifacts/curriculum-revision-browser/2026-09-05T16-51-09-547Z/report.json): SHA-256 `35cf67452beaaffbedf8a83966f478db752dfad4a6636be080dcb9f8679c216e`.
- [restore](../artifacts/installed-automaticity-browser/2026-09-05T16-51-09-934Z/report.json): SHA-256 `8df868297022113d0184a06ca87704145198330216f0ab4c676b91518e57c4bf`.
- [Exact versions, installers and profile preservation](../artifacts/curriculum-revision-delivery/final-verification.json).
- [Phase 5 acceptance record](../artifacts/phase5-delivery/verification.json).

## Remaining L01 review

The [current review packets](../artifacts/content-review-packets/all-20260905-task-revision2/index.html) provide prompts, accepted answers, alternatives, prerequisites and explicit review forms. The ledger contains no completed independent reviews. A model-authored correction or a passing software test cannot be relabelled as human linguistic review. The complete curriculum, model qualification, delayed learner outcomes and scheduler/RL experiments remain separate open gates.

## Navigation observation

The recording and review verifiers retain their 15-second interaction checks and now allow 30 seconds for navigation, matching the other installed-browser suites. Fresh Edge navigation was measured at approximately 15.3-15.6 seconds while direct HTTP completed in 26-31 ms. Earlier timed-out runs are retained. These functional checks do not establish a navigation-performance target or resolve the cause of that browser delay; see the [recorded observations](../artifacts/installed-navigation/2026-09-05T16-57-45-378Z/report.json).
