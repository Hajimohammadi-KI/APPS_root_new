# Familiar recall and grammar transfer

**Delivery update:** The initial Windows startup block recorded below was subsequently resolved on this computer after the user changed the Windows setting. The unchanged English 27.3.28 and DeutschFlow 20.8.34 installers passed complete lifecycle retries, and both normal installations were updated with verified profile backups. See the [current delivery report](LANGUAGE-AUTOMATICITY-DELIVERY-2026-09-05.md). The blocked-stage evidence below is retained as history.

The shared English/German FSRS eligibility adapter previously merged different exercises under one grammar topic and could admit delayed transfer tasks. The new regression suite reproduced 21 failures before the fix: [original log](../Apps/English/English-Automaticity/artifacts/prospective-before-fix.log).

Recall history now follows the exact task, version, context, item family, rubric and modality. Only familiar retrieval/retention tasks in the practice partition qualify. First encounters, new versions, varied or free production, transfer tasks and calibration/evaluation material remain outside this calculation. Existing grammar evidence remains in its own ledger.

Malformed consent and rating values are rejected without exceptions. Reused or conflicting rating identities are excluded; equivalent ratings deduplicate regardless of JSON property order. A recorded withdrawal stops shadow calculation. These are consent-contract protections; a learner-facing collection pilot remains open.

The English delayed-transfer screen and German legacy review callback also converted scores/confidence into FSRS ratings when an old feature flag was enabled. Those collection calls were removed. Existing review completion and saved historical shadow bytes are preserved. Both full app checks were rerun after this caller fix; packages produced before it are superseded by the final rebuild.

Prior consent, explicit ratings and a current qualified delayed assessment are still required. Earlier familiarization never becomes an invented rating. FSRS candidates remain read-only and never change learner due dates or establish spontaneous grammar ability.

All 24 new regression tests pass, alongside the existing evidence tests. The compiled browser API passes 12 checks in each language, including unchanged learner storage: [source browser receipt](../artifacts/prospective-recall/2026-09-05T09-15-34-130Z/report.json).

Full English `bun run check` passed (217 tests across its commands, types and lint): [log](../Apps/English/English-Automaticity/artifacts/automaticity-check-27.3.28.log). German `bun run verify` passed (325 tests across its commands, formatting, lint, types and build): [log](../Apps/Deutsch-Automaticity/artifacts/automaticity-verify-20.8.34.log). Shared tests appear in both totals. Structural curriculum and source-mirror checks also passed; all 3,584 coverage cells still await human review and evaluator approval.

The final compiled production web builds pass the [recall browser checks](../artifacts/prospective-recall/2026-09-05T09-28-19-179Z/report.json), [legacy review completion checks](../artifacts/legacy-fsrs-retirement/2026-09-05T09-28-17-524Z/report.json), and [route/offline/backup/audio checks](../artifacts/installed-automaticity-browser/2026-09-05T09-26-58-158Z/report.json). These used separate web test ports, not the new desktop executables. The first English legacy test omitted the shared profile's online-feedback preference and correctly received an unassessed response; the corrected synthetic fixture supplies that preference and mocks the API. No real assessment service or learner consent was used.

English **27.3.28** and DeutschFlow **20.8.34** are built. Their isolated install, upgrade, update, damaged-payload repair, uninstall and synthetic data-preservation checks passed. **Desktop startup is blocked for both** by Windows Application Control's signing requirements: [English receipt](../artifacts/installer-cycle/English-20260905-112359-44a11f7f/report.json), [German receipt](../artifacts/installer-cycle/German-20260905-112230-b32880b1/report.json).

Windows Code Integrity events 3033/3077 confirmed the signing-level failures. No usable code-signing certificate was found in the current-user or local-machine personal certificate stores: [read-only signing evidence](../artifacts/prospective-recall/signing-block.json). The agent did not change security settings. At this stage delivery required trusted signing or a user-managed policy change followed by a new complete lifecycle test; Smart App Control offers no per-app approval exception. The subsequent user change and successful retry are recorded in the delivery update above.

The normal installations remain **English 27.3.27** and **DeutschFlow 20.8.33**. Their original executables were restarted; no new setup was run against either normal profile. The normal updater now requires matching successful lifecycle receipts for the exact setup and payload before touching an installation or profile. Nine guard checks pass, including changed hashes, missing repair/startup/upgrade and incomplete receipts: [guard report](../artifacts/language-update-guard/20260905-112843/report.json).

| Local package awaiting desktop approval | Bytes | SHA-256 |
| --- | ---: | --- |
| [English 27.3.28](../releases/EnglishGrammarAutomaticityDesktop-27.3.28-Windows.zip) | 238,168,643 | `FD574A9ACA5A816094D726A10FEDCF4BA14C049E45F1DCE1D7D47C9CED1F3007` |
| [DeutschFlow 20.8.34](../releases/DeutschFlowDesktop-20.8.34-Windows.zip) | 190,625,390 | `CFCF08DA485C303C50D4761991E7FE0816B82C0B10A16E5145EF58DF14E24FE9` |

Source changes and final runtime checks are recorded in the [source manifest](../artifacts/language-release-source/20260905-en28-de34/manifest.json) and [delivery receipt](../artifacts/prospective-recall/final-delivery.json). The HTML roadmap shows the verified engineering work in green and the desktop release as blocked. Human curriculum review, the explicit-consent collection pilot and real delayed learner outcomes remain open.

Test responses, consent, approvals and ratings are synthetic. No real learner history, human review or learning benefit is claimed.
