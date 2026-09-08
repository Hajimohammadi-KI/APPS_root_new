# Distinct daily exercises — 8 September 2026

The seven cards on the existing daily homepage now open the exercise named on each card. The homepage layout and indigo/beige worksheet design are preserved. This fixes the shared worksheet view ignoring the activity number and the speaking view falling back to its first conversation topic.

| Activity | Exercise |
| --- | --- |
| 1 — Activate and use accurately | Guided answers and transformations, each with a WHY field |
| 2 — Automate aloud | Listen to authored sentences, read, cover, and recall aloud |
| 3 — Speak freely and transfer | Produce a personal spoken response using the selected grammar target |
| 4 — Lesson and controlled practice | Contrast examples, decision chain, comparison, and reconstruction from memory |
| 5 — Daily writing | Personal written answers and reasons, with typing or pen input |
| 6 — Five-stage shadowing | Listen, repeat in chunks, shadow, retell, and compare with the model |
| 7 — Review and save evidence | Error correction, optional error log, and review checkboxes |

Each activity carries an exact authored worksheet ID and the selected CEFR level. Written drafts have separate activity keys. Recorded responses have separate activity/topic IDs. Completion affects the daily checklist only; it does not award assessed mastery. Missing daily content shows an error instead of an unrelated task. Ordinary Grammar Lab visits still show the full three-page worksheet.

- [x] English `bun run check` and production build passed.
- [x] DeutschFlow `bun run verify` passed, including production build.
- [x] 22 focused tests passed, covering all 112 English and 144 German worksheet sets, recording models, and content boundaries.
- [x] Browser checks passed for all seven cards in both apps and topic selection from A2 through C2: 24 activity/topic cases.
- [x] The same browser checks passed against the packaged runtimes and the actual LAN addresses.
- [x] Typed drafts and simulated pen strokes survived reloads. Phone (390 px) and tablet (768 px) layouts had no horizontal overflow.
- [x] A synthetic recording completed only its own activity, using the packaged app on localhost.
- [x] Both installers passed fresh installation, startup, update, repair, uninstall, and synthetic data preservation.
- [x] Primary Windows installations were updated. All 882 German and 594 English existing profile files retained their SHA-256 hashes.
- [x] The three requested LAN links and both API health endpoints returned HTTP 200.

The installers are unsigned (`NotSigned`); both executed successfully on this computer. Physical microphone/stylus hardware and another physical mobile device were not tested. LAN HTTP is not a secure microphone origin; microphone checks used localhost. Device speech playback is labelled and has adjustable speed. No learner improvement or automatic grading of handwriting is claimed.

The active versions are English **27.3.46** and DeutschFlow **20.8.51**. Previous release runtime directories remain available; the prior gateway configuration is saved in the verification folder.

Artifacts in this checkout:

- `releases/EnglishGrammarAutomaticityDesktop-27.3.46-Windows.zip`
- `releases/DeutschFlowDesktop-20.8.51-Windows.zip`
- `Apps/English/English-Automaticity/EnglishGrammar-Setup.exe` — SHA-256 `c110c42ab997006faa544532ffa92c9c3a4f921fc53a771f9ad4f616d5298f47`
- `Apps/Deutsch-Automaticity/DeutschFlow-Setup.exe` — SHA-256 `0d089300760375d253f4f60f2a58e49452f4f32a18a411313148e38f7551dbf7`
- `artifacts/distinct-daily-verification/lan/results.json`
- `artifacts/distinct-daily-verification/packaged/results.json`
- `artifacts/distinct-daily-verification/profile-preservation.json`
- `artifacts/installer-cycle/English-20260908-173330-28a83e14/report.json`
- `artifacts/installer-cycle/German-20260908-173330-c536b1ab/report.json`

Source changes were made in the isolated `codex/distinct-daily-exercises-20260908` worktree at `D:\APPS_root_new\.fix`, because the main working tree contained unrelated deletions. Those main-tree changes were preserved.
