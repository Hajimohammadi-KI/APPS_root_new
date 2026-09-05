# English 27.3.28 and DeutschFlow 20.8.34 installed

Both desktop apps are updated and running on this computer. Their exact final installers passed installation, upgrade, startup, update, damaged-payload repair, uninstall and synthetic data-preservation checks: [English lifecycle](../artifacts/installer-cycle/English-20260905-113743-f5baccae/report.json), [German lifecycle](../artifacts/installer-cycle/German-20260905-113738-35c28da4/report.json).

The user reported changing the Windows setting. A read-only preflight then observed Smart App Control state `0`; the agent did not change security settings. The setup and payload hashes matched the previously blocked builds, which were retried unchanged: [preflight](../artifacts/approval-resume/20260905-en28-de34/preflight.json). The executables remain unsigned. This verifies delivery on this computer, not trusted signing or installation on other computers. Earlier blocked receipts remain available in the [recall-isolation report](LANGUAGE-AUTOMATICITY-RECALL-ISOLATION-2026-09-05.md).

The normal updater required successful lifecycle receipts for the exact setup and payload before touching either installation. It copied each complete private learner profile, verified every file hash, retained the previous setup and repair payload, applied the update, and checked that the profile was unchanged before startup. This preservation boundary matters: ordinary browser caches can change once the app starts.

| Installed app | Previous version | Backed-up profile files | Profile bytes | Practice page |
| --- | --- | ---: | ---: | --- |
| English 27.3.28 | 27.3.27 | 567 | 51,553,292 | [Open English](http://127.0.0.1:3202/practice) |
| DeutschFlow 20.8.34 | 20.8.33 | 800 | 49,148,058 | [Open German](http://127.0.0.1:3210/practice) |

The [normal-update receipt](../artifacts/installed-language-update/20260905-114015/report.json) records exact install roots, hashes and backup locations. Private backups are under `artifacts/installed-language-update/20260905-114015/English/profile` and `German/profile`; these are local recovery files, not release assets.

Five browser suites passed against the installed apps, each using isolated synthetic profiles:

- [Familiar recall](../artifacts/prospective-recall/2026-09-05T09-42-36-275Z/report.json): 12 checks per language; exact item identities, exclusion of transfer and unapproved material, consent/rating validation, withdrawal and unchanged learner storage.
- [Legacy review completion](../artifacts/legacy-fsrs-retirement/2026-09-05T09-42-36-163Z/report.json): the old flag cannot create inferred FSRS ratings; original completion and historical bytes remain intact. English assessment is mocked in the test.
- [Installed routes, offline work and backup/restore](../artifacts/installed-automaticity-browser/2026-09-05T09-42-36-239Z/report.json): served assets match source, offline drafts survive, unassessed responses remain unassessed, corrupt backups are rejected and restored audio is playable with the expected hash.
- [Recording](../artifacts/automaticity-recording/2026-09-05T09-42-36-163Z/report.json): real browser MediaRecorder with a synthetic microphone, permission-denial recovery, keyboard submission and stored audio hash verification. No physical microphone or real learner speech was used.
- [Review drafts](../artifacts/review-drafts/2026-09-05T09-42-36-164Z/report.json): 12 checks per language, including reload recovery, conflicting feedback, multi-tab protection, storage failure, original audio and mobile layout.

The source checks and fixes are documented in the [recall-isolation report](LANGUAGE-AUTOMATICITY-RECALL-ISOLATION-2026-09-05.md): English 217 tests, German 325 tests, plus types/lint/build checks as recorded there. Shared tests occur in both totals. No app source or package changed during this delivery retry.

| Local release ZIP | Bytes | SHA-256 |
| --- | ---: | --- |
| [English 27.3.28](../releases/EnglishGrammarAutomaticityDesktop-27.3.28-Windows.zip) | 238,168,643 | `FD574A9ACA5A816094D726A10FEDCF4BA14C049E45F1DCE1D7D47C9CED1F3007` |
| [DeutschFlow 20.8.34](../releases/DeutschFlowDesktop-20.8.34-Windows.zip) | 190,625,390 | `CFCF08DA485C303C50D4761991E7FE0816B82C0B10A16E5145EF58DF14E24FE9` |

The [HTML roadmap](LANGUAGE-AUTOMATICITY-ROADMAP.html) marks this technical release green and keeps the dated history. S01 retains its verified engineering badge, while the real consented collection pilot remains open. R02 remains in progress because its full-scope curriculum, evaluator and learner-outcome dependencies are unfinished. All 3,584 structural coverage cells still await human review and evaluator approval; Transformer qualification and learning effectiveness have not been demonstrated, and reinforcement learning remains deferred.

The [evidence index](../artifacts/approval-resume/20260905-en28-de34/evidence.json), [source capture](../artifacts/language-release-source/20260905-en28-de34-approved/manifest.json) and [final verification](../artifacts/approval-resume/20260905-en28-de34/final-delivery.json) retain the exact delivery state. Technical test success does not establish automatic grammar production in a real learner.
