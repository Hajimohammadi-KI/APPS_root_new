# English and German automaticity: installed implementation

Historical handoff for 27.3.24/20.8.30. See the [current installed release and verification record](LANGUAGE-AUTOMATICITY-CONTINUATION-2026-09-05.md) for 27.3.26/20.8.32.

Updated 5 September 2026, Europe/Berlin. Scope: `D:\APPS_root_new`. The [roadmap](LANGUAGE-AUTOMATICITY-IMPLEMENTATION-ROADMAP.md) and [structured backlog](language-automaticity-implementation-backlog.json) remain the work record. This follows the [4 September integrity increment](LANGUAGE-AUTOMATICITY-IMPLEMENTATION-2026-09-04.md).

**The shared practice implementation is built, tested, packaged and installed. The full roadmap is not complete.** Current curriculum tasks are authored drafts awaiting language review. No Transformer, FSRS policy or reinforcement-learning policy was qualified or activated, and no learner improvement was fabricated from software tests.

## Installed result

| Product | Installed version | Executable | Verified local practice page |
| --- | --- | --- | --- |
| English | 27.3.24 | `C:\Users\Elahe\AppData\Local\Programs\English Grammar Automaticity Desktop\English Grammar Automaticity.exe` | http://127.0.0.1:3202/practice |
| DeutschFlow | 20.8.30 | `C:\Users\Elahe\AppData\Local\Programs\DeutschFlow\DeutschFlow.exe` | http://127.0.0.1:3210/practice |

Both normal installed executables were running at final verification. Their Start Menu shortcuts resolve to these executable paths. API health endpoints are `/api/health` on port 4201 and `/api/v1/health` on port 4210. These are local addresses, not public deployments. The Daily and Grammar pages link to the new practice flow. The thesis workspace was outside this work.

## Implemented behavior

- One canonical shared engine supplies English and German browser bundles and package mirrors. Typed, immutable records preserve the original response, task and rubric identities, exposure, assistance, timing source, recording identity and assessment history.
- The practice loop supports notice, recall, variation, original production, repair, transfer and later retrieval, separately for writing and speaking. Models and hints require deliberate reveal. Drafts survive refresh and task changes; a second practice tab cannot concurrently edit the session.
- The daily selector explains its choice, limits the immediate focus to two constructions, and prioritizes due practice and observed errors. The full topic selector remains available. Unknown skills are not labelled weak.
- Controlled answers receive conservative practice feedback. Open production and unsupported variants remain available for review without an invented correctness score. A valid upstream grammar result alone cannot certify independent mastery.
- A local review panel preserves the original answer and appends a separate review. Human feedback can supersede a prior judgment; a self-check cannot replace an authoritative judgment. A typed reviewer name is a provenance note, not authenticated teacher identity or model qualification.
- Audio is captured as a real recording and stored with its hash. Writing timing excludes background time; timing after interruption stays unavailable. Typed transcripts do not establish spoken accuracy, pronunciation or fluency.
- Progress separates practice checks, qualified independent accuracy, delayed outcomes and new-context outcomes. Answer exposure, copied repairs, repeated submissions and legacy completion totals cannot automatically become qualified evidence. Actual elapsed time and task/context history determine delay and novelty.
- Both Settings screens export complete language backups including original state, static-route state, drafts, evidence, audio and teacher-content databases. Restore verifies checksums before writing, keeps a recovery journal and rolls back failed or interrupted restores. Legacy state gets an immutable IndexedDB snapshot without consuming another full copy of the localStorage quota.
- The earlier English malformed-provider and German language/orthography fixes remain in the installed payload. Dashboard labels no longer turn recording duration or legacy completion totals into unsupported fluency claims.

Canonical implementation: `shared/learning-core/src/automaticity`. Reproducible distribution: `scripts/build-automaticity-assets.ts`, `scripts/build-automaticity-curriculum.ts`, and `shared/learning-core/sync-workspaces.mjs`.

## Curriculum and assessment boundaries

| Inventory | English | German |
| --- | ---: | ---: |
| Existing units mapped to stable construction IDs | 112 | 144 |
| Typed practice tasks | 2,128 | 2,592 |
| Grammar families represented | 21 | 21 |
| Human-reviewed new coverage cells | 0 | 0 |

The matrix contains **3,584 construction × modality × stage cells**. Every current cell has authored tasks; all remain unqualified for a full assessed-curriculum release. `bun scripts/check-automaticity-coverage.ts` passes structural coverage. `--release` correctly exits with code 2. Task counts include generated stage/modality variants, not 4,720 independently reviewed exercises or proof that every linguistic construction has been covered.

The construction map preserves existing lesson aliases. Independent reference review must still check meanings, contrasts, prerequisites, alternatives and omissions. More constructions can be added; 112/144 are the starting catalog, not an upper bound. Cell-level work is recorded in [automaticity-coverage-backlog.json](automaticity-coverage-backlog.json).

`qualification.ts` and `scripts/qualify-automaticity-model.ts` implement a pinned-model evaluation gate with reviewed labels, partition separation, false-correction/missed-error checks, target judgments, latency and cost reporting. The gate never approves its own candidate. No reviewed benchmark or real model comparison was completed here. The [review and evaluation protocol](AUTOMATICITY-REVIEW-AND-EVALUATION-PROTOCOL.md) specifies the next evidence requirements. No learning data was used to train a model.

## Verification receipts

| Check | Result and evidence |
| --- | --- |
| English required source checks | `bun run check`: 177 tests passed, zero failed; types, content checks and lint passed. [Log](../Apps/English/English-Automaticity/artifacts/automaticity-check-2026-09-05.log) |
| German required source checks | `bun run verify`: 284 tests passed, zero failed; formatting, lint, types, schemas and production build passed. [Log](../Apps/Deutsch-Automaticity/artifacts/automaticity-verify-2026-09-05.log) |
| Generator and mirror parity | Curriculum `--check` and shared mirror `--check` passed. Structural coverage passed; full-release coverage gate stayed closed. |
| Shared practice browser behavior | Both languages passed draft, repair, open-answer, evidence, review, backup and mobile checks. [Report](../artifacts/automaticity-practice/2026-09-04T22-44-58-305Z/report.json) |
| Recovery and audio preservation | Both languages passed exact raw-state/audio round trips, duplicate/partial history preservation, wrong-language/corrupt import rejection, quota rollback and interrupted-restore recovery. [Report](../artifacts/automaticity-preservation/2026-09-04T22-38-00-980Z/report.json) |
| Installed routes, offline and Settings | Both languages passed real installed-route navigation, offline draft recovery and unassessed open-answer save, mobile reflow, corrupt import rejection and confirmed complete restore with playable audio. No page exceptions. [Report](../artifacts/installed-automaticity-browser/2026-09-04T22-57-06-389Z/report.json) |
| Installed assessment integrity | Eight focused regressions passed with both malformed and valid controls. [Report](../artifacts/language-integrity-browser/2026-09-04T22-58-02-122Z/report.json) |
| Recording and permission recovery | Both installed apps used real MediaRecorder with a synthetic microphone, persisted nonempty Opus recordings with verified hashes, preserved drafts on simulated permission denial, and accepted keyboard submission. Typed transcripts remained unassessed. [Report](../artifacts/automaticity-recording/2026-09-04T23-01-35-845Z/report.json) |
| Installed route/API health | All ten probes passed. [Capture](../artifacts/language-automaticity/installed-runtime-2026-09-05.json) |
| English installer lifecycle | 27.3.23 → 27.3.24 upgrade, fresh install, startup, update, damaged-payload repair and isolated uninstall passed; synthetic data marker preserved. Cold startup: 43.028 seconds. [Report](../artifacts/installer-cycle/English-20260905-005157-b640f6d5/report.json) |
| German installer lifecycle | 20.8.29 → 20.8.30 upgrade and the same lifecycle passed; synthetic data marker preserved. Cold startup: 10.595 seconds. [Report](../artifacts/installer-cycle/German-20260905-005210-16908e3b/report.json) |

The installed practice JavaScript matched canonical SHA-256 `058ae403406049c45d2276106f9b1dfdd3e0a463ada3f19473d0939040f145ff`. Synthetic restored WAV audio had SHA-256 `b766f24e30ca493982830ffd908dd155a116a8620b3a188b478510a67a929b9e` and one-second playable duration in both languages. Synthetic browser fixtures never entered the normal learner profiles.

One initial installed-browser run timed out during the English offline sequence; the instrumented rerun passed without changing app code. That first failure is retained in `artifacts/installed-automaticity-browser/2026-09-04T22-56-18-416Z`. The legacy writing control was updated to assert the deliberately stricter rule that grammar verification without independent-attempt provenance is not mastery. Physical tablet, assistive screen-reader and live speech/ASR evaluation remain untested.

## Normal profile preservation and rollback

Before installation, the updater copied and hash-checked the complete existing profile trees and retained the old installer/payload pairs. After installation and before startup, every profile file still matched:

- English: **547 files, 49,499,263 bytes**, initially 27.3.22 → 27.3.24.
- German: **762 files, 48,605,559 bytes**, 20.8.26 → 20.8.30.

Final [update receipt](../artifacts/installed-language-update/20260905-005438/report.json). English's original 27.3.22 rollback installer and initial untouched profile copy are in `artifacts/installed-language-update/20260905-005352/English`. The following run retains another identical pre-startup English profile copy and the German 20.8.26 rollback pair under `artifacts/installed-language-update/20260905-005438`.

The first normal English launch exited 134 because PowerShell retained an empty `ELECTRON_RUN_AS_NODE` provider entry. The updater now removes that entry before launching Electron. The corrected launch passed. Profile preservation was verified before either successful startup; normal caches and app state may legitimately change after startup. This is not a claim that every existing learner record was manually reviewed or restored into the real profile. Backups remain private local artifacts.

## Local release packages

| Package | Bytes | ZIP SHA-256 |
| --- | ---: | --- |
| [English 27.3.24](../releases/EnglishGrammarAutomaticityDesktop-27.3.24-Windows.zip) | 238,175,332 | `B88093E0B85598A49E8609221C5328F109B6E52B0EFFB7759EDD42334A967902` |
| [DeutschFlow 20.8.30](../releases/DeutschFlowDesktop-20.8.30-Windows.zip) | 190,630,927 | `7A5269FC4B4A4753B795430EDFE0B13D6D23DE4F530C2045EBFFB5BF157D262C` |

Each ZIP contains the installer and companion payload needed for offline installation. Final installer/payload hashes are in the lifecycle receipts. Installers are unsigned; execution passed on this machine, which does not establish signing or compatibility on every Windows device. No public upload occurred.

Source checkpoint: `033a3d9d180d63dafb3e743585abf8e66b711fcd` plus the recorded working changes. `artifacts/automaticity-continuation/starting-tracked.patch`, `final-tracked.patch` and `final-status.txt` preserve the observed changes; a final source manifest lists implementation file hashes. No reset, branch replacement or thesis edit was performed.

## Remaining roadmap work

The new shared practice route works across the starting catalog. Some older Studio, Reviews and static completion workflows still use their original stores; the new progress summary and review links do not mean every legacy workflow has been replaced. Finish those adapters and broader accessibility/interaction cases before closing all integration tickets.

The next content work is independent review of construction mappings and valid alternatives, followed by reviewed pilot assessment cases. That enables supported judgments for original production. Full assessed coverage remains blocked until required cells meet that gate. A manually entered review is useful feedback and does not itself qualify the evaluator or content pack.

The learner must supply a real baseline and later unaided responses/recordings. Actual 24-hour, 7-day and later retention cannot be established tonight. FSRS remains shadow-only; candidate scheduling comparisons and any bandit/RL experiment require those trustworthy prospective outcomes. The deterministic daily policy remains available meanwhile.

The backlog preserves these open conditions. Engineering test results, reviewed curriculum coverage and learner improvement are reported separately.
