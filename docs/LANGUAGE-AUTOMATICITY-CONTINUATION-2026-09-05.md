# English and German automaticity: continuation and installed release

Historical release record for 27.3.26/20.8.32. The [current installed release](LANGUAGE-AUTOMATICITY-REVIEW-RECOVERY-2026-09-05.md) is English 27.3.27 / DeutschFlow 20.8.33.

Updated 5 September 2026, Europe/Berlin. Workspace: `D:\APPS_root_new`.

**English 27.3.26 and DeutschFlow 20.8.32 are installed and technically verified. The full reviewed curriculum and learner-effectiveness roadmap remain open.** This report supersedes the earlier 27.3.24/20.8.30 handoff. Your normal app profiles were backed up and preserved before startup. No thesis files were changed.

Open either app and select independent practice from Daily or Grammar. The verified local pages are English `http://127.0.0.1:3202/practice` and German `http://127.0.0.1:3210/practice`. These are local installations.

## What changed

- Original dated answers from the older practice stores now appear in the shared history without invented independent-success credit. The import is repeatable and preserves original source data.
- Unsupported CEFR derivation and qualified profile scores from legacy completion were removed. Writing and speaking evidence remain separate.
- Failed storage writes show a recovery message. Settings exports include unsaved in-memory changes. Corrupt original history is retained, and audio saves wait for the IndexedDB transaction to commit.
- Per-task drafts survive Back/Forward, refresh and reopening. Task changes have stable URLs, optional timing and local Persian guidance. Mobile and tablet layouts were checked.
- Due reviews keep priority even after many attempts. Repaired errors leave the current repair queue. Selection and learner overrides have dated records.
- The construction registry supports many-to-many lesson mappings and rejects prerequisite cycles. The coverage gate checks content versions and refuses unsupported review claims.
- Model benchmarks now separate writing/speaking and content versions, record source/licence and report error denominators and uncertainty. FSRS candidate calculation accepts only explicit, consented, qualified prospective reviews and never changes learner dates.
- Offline navigation uses the cached practice page for uncached task URLs. Worker activation and cache-write lifetimes were corrected.

## Verification

| Check | Result and evidence |
| --- | --- |
| English source check | `bun run check` passed: 187 tests across its four test invocations, typechecks and lint. [Log](../Apps/English/English-Automaticity/artifacts/automaticity-check-27.3.26.log) |
| German required check | `bun run verify` passed: format, lint, typechecks, 295 tests across its test invocations, and build. [Log](../Apps/Deutsch-Automaticity/artifacts/automaticity-verify-20.8.32.log) |
| Installed practice and Settings | Both languages passed actual route links, canonical bundle/worker/catalog hashes, offline uncached task restart, complete export/restore and playable audio. [Report](../artifacts/installed-automaticity-browser/2026-09-05T05-19-35-224Z/report.json) |
| Installed history and save failure | Legacy import once across routes, no false CEFR, quota warning, unsaved-state export and corrupt-original retention passed. [Report](../artifacts/installed-history-recovery/2026-09-05T05-20-25-207Z/report.json) |
| Installed assessment regressions | Eight selected English/German integrity cases passed. [Report](../artifacts/language-integrity-browser/2026-09-05T05-19-36-805Z/report.json) |
| Installed recording | Synthetic microphone through the real MediaRecorder, simulated refusal, keyboard submission and stored audio hashes passed. [Report](../artifacts/automaticity-recording/2026-09-05T05-19-37-366Z/report.json) |
| Practice navigation and accessibility | Back/Forward, repair, review, untimed keyboard input, Persian RTL guidance and 390/768-pixel reflow passed. [Report](../artifacts/automaticity-practice/2026-09-05T04-51-18-356Z/report.json) |
| Source offline regression | Uncached task URLs and a second task selected entirely offline preserve drafts. [Report](../artifacts/practice-offline/2026-09-05T05-07-24-406Z/report.json) |
| Persistence | Partial/duplicate history, drafts, due reviews and playable audio survive restore, quota failure and interruption. [Report](../artifacts/automaticity-preservation/2026-09-05T04-58-20-875Z/report.json) |
| Audio transactions and history parity | Aborted audio writes reject; committed history remains; actual Bun and browser reductions match. [Report](../artifacts/legacy-continuity/2026-09-05T04-52-17-668Z/report.json) |
| Shared distribution and coverage | Deliberate stale/missing mirrors are rejected and restored exactly. Stale content and unsupported review claims fail. [Mirror report](../artifacts/learning-core-sync/2026-09-05T04-58-06-929Z/report.json); [Coverage report](../artifacts/automaticity-coverage-gates/2026-09-05T05-04-21-129Z/report.json) |
| English installer | 27.3.25 to 27.3.26 upgrade, fresh install/startup, update, damaged-payload repair and isolated uninstall passed. [Report](../artifacts/installer-cycle/English-20260905-071144-b6d1b273/report.json) |
| German installer | 20.8.31 to 20.8.32 and the same lifecycle passed. [Report](../artifacts/installer-cycle/German-20260905-071143-e8c69a32/report.json) |

Test totals are per command and include shared tests in both apps. All browser learner responses and microphone inputs were synthetic and used isolated profiles. A test clock checked failure → repair → transfer → next-day/next-week logic in both languages; it does not prove real retention. Physical microphones, assistive screen readers and actual ASR quality remain unverified.

The installed 27.3.25/20.8.31 offline run failed before this fix. Its [failure receipt](../artifacts/installed-automaticity-browser/2026-09-05T05-05-24-279Z/report.json) is retained. The later release is verified separately; the failed run was not relabelled as passing.

A parallel final-run check also timed out while waiting for control of the already-loaded German document. A standalone diagnostic and full rerun passed without changing app code. The test now verifies worker control after the actual offline navigation, while retaining the pre-navigation registration state. This follows the distinction between an [active registration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready) and [control of a document](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim). The earlier [timeout receipt](../artifacts/installed-automaticity-browser/2026-09-05T05-16-34-239Z/report.json) remains available; it is not evidence that an offline navigation itself failed.

The history harness initially suppressed service workers through Playwright. One repeat then raised an undefined-registration error in the app's update notice. The final history run permits normal service-worker registration and still verifies quota failure, corrupt originals and unsaved-state export in isolated profiles. The [earlier harness failure](../artifacts/installed-history-recovery/2026-09-05T05-19-36-132Z/report.json) is retained.

## Preserved profiles and packages

- English: 27.3.25 → **27.3.26**; **584 files, 53,978,799 bytes** copied and hash-verified before installation, then matched exactly before startup. Executable folder: `C:\Users\Elahe\AppData\Local\Programs\English Grammar Automaticity Desktop`.
- German: 20.8.31 → **20.8.32**; **795 files, 51,328,446 bytes** copied and hash-verified before installation, then matched exactly before startup. Executable folder: `C:\Users\Elahe\AppData\Local\Programs\DeutschFlow`.

[Normal update and preservation receipt](../artifacts/installed-language-update/20260905-071445/report.json). Each product's backup folder includes the complete prior profile, a file manifest and the previous installer/payload pair. Caches and app state can legitimately change after startup; pre-startup parity is not a claim that every real learner record was manually assessed.

| Local package | Bytes | SHA-256 |
| --- | ---: | --- |
| [English 27.3.26](../releases/EnglishGrammarAutomaticityDesktop-27.3.26-Windows.zip) | 238,179,752 | `6B61D67421A5EA402F6AA6652036CF6D210941E5BD3ED62B3A9237BD794E9E79` |
| [German 20.8.32](../releases/DeutschFlowDesktop-20.8.32-Windows.zip) | 190,631,153 | `F2128FBD8EFDF9D437FF45B4DE15A1C0211521F23863922F230A282F67952AB8` |

Each ZIP contains the installer and companion offline payload. Installation executed on this Windows machine; no public upload or cross-device compatibility claim is made.

Source revision: `d7417d53ab3e4a2d35299ce326c957aa6c6b5e48` plus the recorded working changes. [Source manifest](../artifacts/language-release-source/20260905-en26-de32/manifest.json), adjacent tracked patch and exact new-file copies make the changed implementation reviewable. [Runtime baseline](../artifacts/language-automaticity/installed-runtime-en26-de32-2026-09-05.json).

## Remaining gates

The subsequent [HTML-roadmap and release-gate update](LANGUAGE-AUTOMATICITY-ROADMAP-UPDATE-2026-09-05.md) adds automatic green progress tracking, recorded content-review validation and task-level evaluator approval checks. It changes workspace tooling and preserves this installed release.

The current catalog contains 112 English and 144 German construction drafts, 2,128 and 2,592 typed tasks, and 3,584 construction × modality × stage cells spanning all 21 strategy families. **Zero cells are independently human-reviewed or release-qualified.** This is the starting catalog, not proof of exhaustive grammar coverage. Reference review must identify omissions and verify task semantics, alternatives and prerequisites.

Open answers have a local review path and remain unassessed when a suitable judgment is unavailable. No Transformer has passed the required benchmark. Historical recordings stay available in their original audio libraries; missing historical audio links, timing, help use or assessment provenance are not reconstructed as v2 proof.

A qualified pilot needs reviewed tasks and judgments, real unaided learner writing/recordings and actual later observations. Real 24-hour, 7-day and later retention are unmeasured. FSRS collection/comparison and any bandit or reinforcement-learning experiment remain disabled pending consented, trustworthy outcomes. Synthetic tests are not learner progress.

The [roadmap](LANGUAGE-AUTOMATICITY-IMPLEMENTATION-ROADMAP.md), [backlog](language-automaticity-implementation-backlog.json) and [review protocol](AUTOMATICITY-REVIEW-AND-EVALUATION-PROTOCOL.md) retain those dependencies. Engineering verification is recorded separately from full ticket completion; required content-review and learner-evidence tasks were not silently closed.
