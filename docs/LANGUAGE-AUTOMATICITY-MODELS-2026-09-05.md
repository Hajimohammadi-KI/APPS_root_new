# Phase 7 implementation and curriculum extension

Updated 5 September 2026. This work is in `D:\APPS_root_new`.

The model-evaluation pipeline now has versioned draft cases, a blind review form, hash-bound review import, partition checks, calibration/configuration freezing, candidate adapters and a deployment support matrix. **Independent benchmark review and real candidate qualification remain incomplete. No Transformer or reinforcement-learning policy has been activated.**

The [benchmark review page](model-evaluation/REVIEW.html) contains 20 original development drafts. Its live local address is http://127.0.0.1:3320. It saves partial reviewer drafts and exports completed labels. The [workflow instructions](model-evaluation/README.md) explain review, adjudication, calibration and final evaluation. Two independent human labels and evidence files are required; changing a review flag cannot substitute for them.

The production controlled-answer policy was run on all 20 drafts. Four stored alternatives matched; the other 16 responses remained unassessed. These are small development diagnostics using model-authored expectations, not validated model performance. Portable LanguageTool 6.6 then completed the same 20 requests locally without provider failures. It annotated one English agreement issue and the name `Paco` in four German responses. The task-level adapter abstained on all 20 because proofreading suggestions cannot establish target use or meaning. The [comparison](model-evaluation/development-comparison.json) retains exact run hashes, small sample denominators, annotations and latency. No pretrained candidate endpoint is configured. All 3,906 required cells have an explicit review workflow and fallback in the [support matrix](model-evaluation/support-matrix.json); zero automatic or qualified human scopes are approved.

The shared model contract now pins exact construction, task-version, rubric and mode tuples. The benchmark gate rejects passing predictions with an absent target, reused partition sources/templates/learners/content, incomplete or stale labels, changed settings and post-test freezes. Automated content approval recomputes reviewed labels and frozen final-run evidence instead of trusting a saved score.

The curriculum now includes the 24 additional grammar targets found in Phase 4: 12 English and 12 German. There are 322 new stage/mode tasks, bringing the packs to 124 English units with 2,289 tasks and 156 German units with 2,753 tasks. All 256 original units and their complete task identities remain unchanged. There are no missing authored cells in the declared 280-target inventory. Human content review remains pending for all 3,906 required cells. Spelling-only targets keep their 14 justified speaking exclusions.

Daily, Grammar, Studio, Errors, Reviews, teacher and progress surfaces share a saved-evidence summary and links to the original response needing repair. Repairs remain linked practice and cannot become fresh independent success. Browser verification of installed routes is recorded after the installer cycle below.

Engineering evidence collected so far:

- `artifacts/model-evaluation-gates/2026-09-05T11-35-14-858Z/report.json`: 24 evidence-chain checks passed, using explicitly synthetic review fixtures.
- `artifacts/model-adapter-gates/2026-09-05T11-18-54-131Z/report.json`: five local mock-server scenarios passed, including malformed output, unavailable provider and changed version.
- `artifacts/model-evaluation/2026-09-05T11-08-09-885Z-controlled-answer/report.json`: actual baseline diagnostics on 20 draft cases.
- `artifacts/model-evaluation/2026-09-05T11-41-29-126Z-languagetool/report.json`: actual local LanguageTool 6.6 diagnostics on all 20 drafts. This pinned version is not presented as the latest release. Portable Java's downloaded checksum was verified; sources and archive hashes are retained under `artifacts/model-evaluation-local`.
- `artifacts/phase7-browser/2026-09-05T11-14-28-152Z/report.json`: review-form draft/export/keyboard/mobile checks and both compiled practice flows passed.
- `artifacts/supplementary-curriculum/2026-09-05T11-10-51-974Z/report.json`: 28 checks passed, including preservation of every original unit and task.
- `artifacts/grammar-scope/2026-09-05T11-08-17-219Z/report.json`: 54 mapping, partition and coverage checks passed.
- `artifacts/grammar-scope-browser/2026-09-05T11-16-03-751Z/report.json`: 11 viewer checks passed.
- `artifacts/grammar-scope-cli/2026-09-05T11-17-31-256Z/report.json`: six CLI checks passed, including expected rejection of unqualified release coverage.
- `artifacts/coverage-review-gate/2026-09-05T11-08-18-939Z/report.json`: 29 review/release checks passed.
- English `artifacts/phase7-check.log` and `artifacts/phase7-build.log`, German `artifacts/phase7-verify.log`: full required checks and production builds passed. Shared tests are executed in both apps and are not counted as distinct twice.

English 27.3.31 and DeutschFlow 20.8.35 are installed and running. Their exact-hash installers passed install, upgrade, startup, update, damaged-payload repair and uninstall. Complete normal profiles were backed up and verified unchanged before startup. All six English and seven German evidence routes passed; so did linked repair, service-worker refusal recovery, offline practice and playable audio backup/restore. The English Progress screen now displays the common summary, and its update notice tolerates unavailable service-worker registration.

The first lifecycle runs exposed a stale test assumption of 112/144 units with at least 14 tasks each; HTTP startup itself responded, but the old curriculum assertion rejected the intentional additions and writing-only tasks. The verifier now compares the exact source curriculum hash. Those earlier failed receipts remain preserved.

Final delivery evidence:

- English 27.3.31: 579 profile files (51,780,258 bytes) preserved before startup. Lifecycle: `artifacts/installer-cycle/English-20260905-135010-e953ce91/report.json`. Profile update: `artifacts/installed-language-update/20260905-135209/report.json`. Setup SHA-256: `09444c06f88b54d3f56c3d92ed610a497df2f9ceb9ded970ed6279762499504b`.
- German 20.8.35: 800 profile files (51,434,303 bytes) preserved before startup. Lifecycle: `artifacts/installer-cycle/German-20260905-132213-a9011b39/report.json`. Profile update: `artifacts/installed-language-update/20260905-132730/report.json`. Setup SHA-256: `e70938cd6d30e0fae97effb3984b81f2a8e9f137cdfa928314c7726758a16a9f`.
- Installed route journeys: `artifacts/phase7-browser/2026-09-05T11-53-51-306Z/report.json`.
- Installed offline/audio export and restore: `artifacts/installed-automaticity-browser/2026-09-05T11-53-52-221Z/report.json`.
- Source/runtime hashes and final status: `artifacts/phase7-delivery/final-verification.json`. Source capture: `artifacts/language-release-source/20260905-phase7-en31-de35/manifest.json`.
- Final English required checks and packaging: `Apps/English/English-Automaticity/artifacts/phase7-sw-check.log` and `phase7-sw-package.log`; German full verification and package receipts remain recorded above.

These are local unsigned packages. No public download URL or full Phase 7 qualification is claimed. Two independent human reviews, separate calibration/final cases and a real pinned pretrained candidate remain outstanding.
