# Review draft recovery

Completed and installed on 5 September 2026: **English 27.3.27** and **DeutschFlow 20.8.33**.

The English and German review panels previously cleared unfinished feedback when closed and reopened. The same form also had no draft to restore after changing responses or reloading. This was reproduced in both languages before editing: [receipt](../artifacts/review-drafts/2026-09-05T08-19-13-602Z/report.json).

The shared panel now saves a separate review draft for each original response, restores all fields and the selected response, and includes these drafts in complete backups. A storage failure keeps the current text in the tab and offers a draft download; corrupt or externally changed saved bytes are retained. A second practice tab cannot edit reviews while the first owns the session.

If another review appears during editing, saving pauses until the latest feedback is compared. The original learner response remains immutable. Late audio loads are discarded when the selected response changes, while the original recording remains playable. Locally entered feedback still does not approve a mastery or automatic-assessment scope.

The source browser check passed 12 cases per language: [report](../artifacts/review-drafts/2026-09-05T08-22-56-652Z/report.json). Six draft-storage tests passed. Full English `bun run check` and German `bun run verify` passed after fixing the shared-source sync list. A new inventory check now rejects unlisted canonical TypeScript files before copying app mirrors: [receipt](../artifacts/learning-core-sync/2026-09-05T08-24-20-438Z/report.json).

## Verification

| Check | Result |
| --- | --- |
| English source | `bun run check` passed: 193 tests across its commands, plus type and lint checks. [Log](../Apps/English/English-Automaticity/artifacts/automaticity-check-27.3.27.log) |
| German source | `bun run verify` passed: 301 tests across its commands, formatting, lint, types and build. [Log](../Apps/Deutsch-Automaticity/artifacts/automaticity-verify-20.8.33.log) |
| Installed review recovery | All 12 cases passed in each language, including mobile layout, draft download, backup inclusion, conflicting feedback and late recording loads. [Report](../artifacts/review-drafts/2026-09-05T08-36-35-617Z/report.json) |
| Installed routes and recovery | Daily/Grammar entry links, source/served bundle hashes, offline draft recovery, corrupt-backup rejection and restore with playable audio passed. No browser page errors. [Report](../artifacts/installed-automaticity-browser/2026-09-05T08-36-36-356Z/report.json) |
| Installed recording | Real browser MediaRecorder with synthetic input, permission-denial recovery, keyboard submission and saved media hashes passed. [Report](../artifacts/automaticity-recording/2026-09-05T08-36-36-157Z/report.json) |
| Full source practice journey | Resume, repair, open response handling, review, backup, Back/Forward navigation, Persian guidance and mobile/tablet layout passed. [Report](../artifacts/automaticity-practice/2026-09-05T08-27-54-469Z/report.json) |
| English installer | Install, update from 27.3.26, HTTP startup, damaged-payload repair, uninstall and preservation of the synthetic data marker passed. [Report](../artifacts/installer-cycle/English-20260905-103219-87e0b9dd/report.json) |
| German installer | Install, update from 20.8.32 and the same lifecycle passed. [Report](../artifacts/installer-cycle/German-20260905-102721-3839cc3c/report.json) |

Test totals are per command; shared tests appear in both apps. No learner outcomes are inferred from these checks.

The first English cycle passed installation, upgrade, repair and preservation but its redirected startup failed to answer HTTP within 186.3 seconds. That [failure](../artifacts/installer-cycle/English-20260905-102743-61cad1ef/report.json) remains recorded. A new full cycle using `-DirectStartup` passed with the **same installer and payload hashes**, reaching all HTTP contracts in 69.5 seconds. German reached them in 11.2 seconds. The retry changes output capture, not the readiness criteria. It does not by itself isolate the cause of the earlier stall. Normal installed updates used direct startup and passed too.

The first source checks also found missing review-draft files in the sync manifest. Their logs are retained beside the passing logs with the `-first-failure` suffix. Both new files were added, and the inventory guard now prevents the same silent omission.

## Installed copies and preserved profiles

Both apps were updated from the tested installers and launched. Their `/practice` pages answered HTTP 200, and the subsequent browser checks verified the served code against the source.

| Product | Installation folder | Profile copied and verified before startup |
| --- | --- | --- |
| English 27.3.27 | `C:\Users\Elahe\AppData\Local\Programs\English Grammar Automaticity Desktop` | 584 files, 54,026,429 bytes |
| DeutschFlow 20.8.33 | `C:\Users\Elahe\AppData\Local\Programs\DeutschFlow` | 796 files, 51,367,141 bytes |

The [normal update receipt](../artifacts/installed-language-update/20260905-103442/report.json) records exact profile-copy hashes and pre-startup parity, installer/payload hashes, versions and launch results. Its English/German subfolders hold complete prior profiles, manifests and rollback installer/payload pairs. Profile caches may change normally after startup; this is not a claim that each learner record was manually reviewed.

| Package | Bytes | SHA-256 |
| --- | ---: | --- |
| [English 27.3.27](../releases/EnglishGrammarAutomaticityDesktop-27.3.27-Windows.zip) | 238,180,999 | `27E4AC763429AF6401CF8FEA47AEA3004E339F0ED505384BB5A6226CECAAA8DD` |
| [DeutschFlow 20.8.33](../releases/DeutschFlowDesktop-20.8.33-Windows.zip) | 190,633,252 | `793AB13FE1AAD76476FAE807F59CE5BA163E9D1E89E26B96AEFB8DA9ADB9E13E` |

These are local packages with matching install/update/repair payloads. The installers executed on this Windows machine and remain unsigned; no public upload or acceptance on other machines is claimed.

The [source manifest](../artifacts/language-release-source/20260905-en27-de33/manifest.json) records the Git revision, source hashes, tracked patch and copies of new files. The [HTML roadmap](LANGUAGE-AUTOMATICITY-ROADMAP.html) records verified engineering progress while leaving the full L04 and curriculum/learner-evidence acceptance gates open.

All browser responses, reviewers, recordings and quota failures used in verification are synthetic. Human curriculum review, qualified assessment, historical recording linkage and real learner outcomes remain open roadmap work.
