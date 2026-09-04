**Implementation record — 4 September 2026**

Workspace: `D:\APPS_root_new`. This records the first assessment-integrity increment of the [roadmap](LANGUAGE-AUTOMATICITY-IMPLEMENTATION-ROADMAP.md). The [backlog](language-automaticity-implementation-backlog.json) remains the task-level source of status. Full grammar coverage and demonstrated learner automaticity remain future acceptance gates.

**Verified starting point**

The source catalogs contain 112 English units and 144 German units. These are migration inventories, not reviewed construction coverage. The reproducible capture is `bun scripts/capture-language-baseline.ts`; its first output is [baseline-2026-09-04T20-49-37-290Z.json](../artifacts/language-automaticity/baseline-2026-09-04T20-49-37-290Z.json). All ten route/health probes passed at capture time. Earlier connection failures were no longer current.

| Surface | English | German |
| --- | --- | --- |
| Source | `Apps/English/English-Automaticity` | `Apps/Deutsch-Automaticity` |
| Web | `http://127.0.0.1:3202` | `http://127.0.0.1:3210` |
| API health | `http://127.0.0.1:4201/api/health` | `http://127.0.0.1:4210/api/v1/health` |
| Active daily route | `/daily` → `public/replacements/en/daily.html` | `/heute` → `public/replacements/de/heute.html` |
| Active grammar route | `/grammar` → `public/replacements/en/grammar.html` | `/grammatik` → `public/replacements/de/grammatik.html` and `grammar-runtime.js` |
| React features | root app shell and `/studio` | root app shell and `/studio` |
| Main browser-state key | `grammar-automaticity:v27` | `GrammarAutomaticityV11_de` |
| Legacy English grammar key | `GrammarAutomaticityV11_en` | Not applicable |
| Desktop source version at baseline | `27.3.22` | `20.8.28` |
| Existing normal installation version | `27.3.22` | `20.8.26` |

Normal installation roots are `%LOCALAPPDATA%\Programs\English Grammar Automaticity Desktop` and `%LOCALAPPDATA%\Programs\DeutschFlow`. Their executables are `English Grammar Automaticity.exe` and `DeutschFlow.exe`. Runtime payloads live under `resources/local-app`. Normal profiles are `%APPDATA%\English Grammar Automaticity` and `%APPDATA%\DeutschFlow`. Profile contents were not inspected. Start-menu links existed, but their target resolution was inconclusive; no launcher-target verification is claimed.

The initial Git state contained only the three strategy/roadmap artifacts as untracked files. The live web-process command lines pointed to these workspace apps' `.next/standalone/apps/web/server.js` files. Source package versions (`27.1.0` and `10.8.2026`) are distinct from desktop release versions.

**Implemented behavior**

- English validates provider JSON, source spans, replacement values, edit overlap and response consistency before accepting online assessment. An empty `matches` array is valid. Missing or malformed data and timeouts produce unverified results. Submitted whitespace is preserved so correction offsets address the original text. Optional LanguageTool fields remain compatible.
- German preserves capitalization and grammatical punctuation in closed-answer comparisons. NFC, whitespace and an optional final full stop are normalized. Authored closed-answer alternatives can disambiguate short German responses. Inconclusive language becomes `language_uncertain`, with a null score and no verified success; it does not become an invented grammar error.
- Desktop profile overrides now isolate runtime extraction and staging caches in both apps. This makes installer verification independent of the normal learner profile and cache.
- The installer lifecycle script reads the expected release version from configuration, rejects occupied canonical ports before installation, supports a previous-version upgrade, and checks that repair restores damaged payload hashes as well as the version marker.

Independent review also reproduced and fixed an English writing evidence-provenance conflict, a German `weil` branch that bypassed language evaluation, and a German detector ambiguity involving the English word `hat`. All have explicit regressions. English writing now retains unavailable-assessment drafts without verified credit, and delayed reviews remain due. Its Present Perfect shortcut also passes through validated assessment. Speaking remains unverified by transcript checks alone.

**Validation and evidence**

Code, installer and scoped browser checks have completed. These qualify the behaviors listed below; the remaining roadmap gates stay open.

- Final English full check: **113 tests passed** (70 content/web, 29 API, 14 installer-source), plus typechecks, 112-unit catalog parity and warning-free lint across 130 files. [Log](../artifacts/language-automaticity/en-check-final-2026-09-04.log).
- Final German non-build gates: **235 tests passed** (218 package tests, 13 installer-source, four schema). The 52 focused regressions are included in those package tests, not additional tests. All package typechecks passed, with an explicit cached TypeScript 5.9.2 fallback for learning-core after the standard `bunx` command encountered a temporary-directory permission error. [Log](../artifacts/language-automaticity/de-check-2026-09-04.log).
- German's full format check still reports 24 untouched baseline files. Changed release JSON files were formatted. This is a pre-existing whole-repository gate failure; the aggregate `verify` command is not reported as green.
- Both web production builds and source API builds passed. Desktop packaging initially encountered the same temporary-directory permission restriction; a reviewed elevated build was allowed. Final desktop versions are English **27.3.23** and German **20.8.29**. [English build log](../artifacts/language-automaticity/en-package-27.3.23-final.log), [German build log](../artifacts/language-automaticity/de-package-20.8.29-final.log). These supersede intermediate packages built before the cross-review fixes.
- [Browser regression runner](../scripts/browser-language-integrity-check.mjs) uses fresh nonpersistent contexts and synthetic data, blocks nonlocal calls, and checks the served German runtime hash against source.
- [Installer lifecycle runner](../scripts/verify-language-installer-cycle.ps1) uses a unique install/data root and disables shortcuts and update checking. Its preservation claim covers a synthetic file marker. Real browser/IndexedDB export, restore and playable-audio preservation remain B02 work.

**Final installer lifecycle**

| Check | English 27.3.23 | German 20.8.29 |
| --- | --- | --- |
| Previous-version upgrade | 27.3.22 → 27.3.23, verified | 20.8.28 → 20.8.29, verified |
| Fresh install and same-version update | Verified | Verified |
| Installed desktop process and HTTP readiness | Verified, 66.891 seconds | Verified, 8.958 seconds |
| Repair of API payload, web hash and version marker | Original hashes restored | Original hashes restored |
| Uninstall | Isolated install removed | Isolated install removed |
| Synthetic data-file hash | Preserved | Preserved |
| Full real learner-data restore | Not tested in this increment | Not tested in this increment |

Exact reports: [English](../artifacts/installer-cycle/English-20260904-230404-158b4cf6/report.json), [German](../artifacts/installer-cycle/German-20260904-230350-5824a8d4/report.json). Runtime extraction was present beneath the isolated `data/EGA` and `data/DFG` directories. The first restricted German run failed in Electron's GPU subprocess; the same artifact passed with reviewed process access. No application security setting was disabled to resolve that failure.

Both source apps were restored after installer checks. The [post-build capture](../artifacts/language-automaticity/baseline-2026-09-04T21-06-31-192Z.json) confirms all ten route/health probes passed. Existing normal installations were not upgraded by these isolated checks.

**Scoped browser verification**

Eight cases passed: malformed and valid English repair responses; malformed and valid English Mission writing saves across app state, shared evidence, retained drafts and daily completion; German capitalization with a valid-answer control; French uncertainty; ambiguous English `hat`; and the actual German `weil` writing path. Malformed or uncertain input created no verified credit in the tested paths. Valid controls remained usable. These are synthetic regression cases, not an all-grammar assessment benchmark.

Final [browser report](../artifacts/language-integrity-browser/2026-09-04T21-08-40-076Z/report.json), [English unassessed-writing screenshot](../artifacts/language-integrity-browser/2026-09-04T21-08-40-076Z/english-writing-malformed-unverified-ledger.png), and [German language-guard screenshot](../artifacts/language-integrity-browser/2026-09-04T21-08-40-076Z/german-weil-writing-language-guard.png). This run includes both local API origins in the network allowlist and supersedes earlier harness runs.

The browser's initial restricted run stalled during navigation. The same checks completed in fresh contexts with reviewed process access and normal Edge sandboxing. Product behavior was not changed to accommodate that environment issue.

Local distribution packages contain each installer and its companion payload:

- [EnglishGrammarAutomaticityDesktop-27.3.23-Windows.zip](../releases/EnglishGrammarAutomaticityDesktop-27.3.23-Windows.zip)
- [DeutschFlowDesktop-20.8.29-Windows.zip](../releases/DeutschFlowDesktop-20.8.29-Windows.zip)

Their manifests are local release artifacts; no public deployment is claimed. Exact installer and payload SHA-256 values are recorded in the lifecycle reports.

**Remaining work**

This increment does not introduce the shared construction/task schema, event reducer, exposure-aware mastery, curriculum crosswalk, model qualification, FSRS activation or RL. The next dependency batch is B02/B03/C01, followed by E01/C02/C03 and E02. F03 and the remaining F04 work depend on those contracts. No lesson, user proficiency level or long-term learning outcome has been marked mastered by this implementation record.
