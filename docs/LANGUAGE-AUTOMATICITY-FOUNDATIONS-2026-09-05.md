# Phases 1–3: assessment integrity and shared evidence

Completed on 5 September 2026 in `D:\APPS_root_new`. **B03, F01–F04 and E01–E04 are verified for their engineering acceptance criteria.** B01 and B02 retain their earlier verified status. The [HTML roadmap](LANGUAGE-AUTOMATICITY-ROADMAP.html) records these tasks in green, with dated changes and links to the evidence.

The existing installed fixes passed fresh verification. This increment adds two reproducible regression runners and completes the missing evidence records. It does not change application behavior, curriculum tasks or learner data. English remains **27.3.28** and DeutschFlow remains **20.8.34**.

## What each task now demonstrates

| Task | Verified behavior | Evidence |
| --- | --- | --- |
| B03 | Exact historical source reproduces malformed-provider success, uncertain language, erased capitalization, exposed-repair credit, unsupported delay/transfer flags and conflicting English writing stores. Valid controls and a revised non-reproduction are explicit. | [13 historical replay cases](../artifacts/language-foundation-history/2026-09-05T10-38-25-548Z/report.json), [installed legacy routes and reducer checks](../artifacts/language-foundation-browser/2026-09-05T10-40-58-020Z/report.json) |
| F01 | Valid empty results remain valid; malformed JSON/data, invalid edits, overlap and timeouts cannot become clean assessments. English repair and writing callers retain unassessed output without verified credit. | [API tests](../Apps/English/English-Automaticity/apps/api/test/assessment.service.test.ts), [client and lesson-caller tests](../Apps/English/English-Automaticity/apps/web/lib/assessment.test.ts), [eight installed integrity cases](../artifacts/language-integrity-browser/2026-09-05T10-34-26-160Z/report.json) |
| F02 | Known English/French/Spanish negatives and ambiguous short input do not default to German. Authored short alternatives remain usable. Capitalization, endings and meaningful punctuation survive comparison. | [domain tests](../Apps/Deutsch-Automaticity/packages/domain/src/evaluation.test.ts), [actual grammar-handler tests](../Apps/Deutsch-Automaticity/packages/domain/src/grammar-runtime-evaluation.test.ts), [installed integrity cases](../artifacts/language-integrity-browser/2026-09-05T10-34-26-160Z/report.json) |
| F03 | Independent practice conceals models until deliberate reveal and records exposure. Copied repairs, nonempty explanations and offline open work remain practice. Original legacy answers survive import without independent credit. | [shared practice UI](../artifacts/automaticity-practice/2026-09-05T10-43-18-994Z/report.json), [installed legacy Grammar checks](../artifacts/language-foundation-browser/2026-09-05T10-40-58-020Z/report.json), [installed offline route checks](../artifacts/installed-automaticity-browser/2026-09-05T10-42-03-491Z/report.json) |
| F04 | English writing uses the same assessment trust in application and evidence stores. Flags alone cannot prove delay or novelty. Repeated, conflicting, superseded and re-recorded evidence derives consistent progress. | [historical caller replay](../artifacts/language-foundation-history/2026-09-05T10-38-25-548Z/report.json), [installed caller checks](../artifacts/language-integrity-browser/2026-09-05T10-34-26-160Z/report.json), [shared evidence regressions](../shared/learning-core/src/automaticity/automaticity.test.ts), [legacy re-recording regressions](../shared/learning-core/src/index.test.ts) |
| E01 | Versioned contracts validate task/rubric identity, assessment identity, supersession, invalidation, original/edited transcript hashes, opportunities, exposure, assistance and timing provenance. Four verdicts preserve uncertainty. | [contracts](../shared/learning-core/src/automaticity/contracts.ts), [contract and provenance tests](../shared/learning-core/src/automaticity/automaticity.test.ts), [Phase 4 construction inventory](LANGUAGE-AUTOMATICITY-PHASE-4-2026-09-05.md) |
| E02 | Duplicate IDs cannot multiply evidence; conflicting IDs are quarantined. Eligible failures stay in the declared accuracy window. Superseded or invalidated judgments recompute progress and review inputs. Missing audio/timing stays unknown. | [reducer tests](../shared/learning-core/src/automaticity/automaticity.test.ts), [22 Node/browser comparisons with semantic assertions](../artifacts/language-foundation-browser/2026-09-05T10-40-58-020Z/report.json) |
| E03 | Original lesson associations, answers, dates, review data, partial/corrupt raw values and playable recordings remain available. Repeated import is idempotent. Failed/interrupted restore recovers its saved state, and cross-language/corrupt backups are rejected before import. | [preservation and recovery](../artifacts/automaticity-preservation/2026-09-05T10-36-39-638Z/report.json), [installed history recovery](../artifacts/installed-history-recovery/2026-09-05T10-36-44-634Z/report.json), [audio transaction and import checks](../artifacts/legacy-continuity/2026-09-05T10-40-29-770Z/report.json), [installed Settings backup/restore](../artifacts/installed-automaticity-browser/2026-09-05T10-42-03-491Z/report.json) |
| E04 | Canonical code matches both package mirrors and browser bundles. The sync gate rejects unlisted source, stale copies and missing copies. Installed bundles agree with actual Node execution on identical input. | [sync fault-injection receipt](../artifacts/learning-core-sync/2026-09-05T10-37-26-871Z/report.json), [Node/browser parity](../artifacts/language-foundation-browser/2026-09-05T10-40-58-020Z/report.json), [served asset hashes](../artifacts/installed-automaticity-browser/2026-09-05T10-42-03-491Z/report.json) |

## B03: honest before-and-after evidence

The historical runner reads the exact Git revision immediately preceding `ee98a08`, saves unchanged source bytes and their SHA-256 hashes, then runs the same synthetic inputs against historical and current source. The receipt records the full revision, execution date, inputs, expected behavior and observed results. External dependencies come from the existing local installation; this is a source replay, not a recreated historical desktop installation.

These replays were recorded **today**. They replace missing historical receipts with explicitly dated, reproducible evidence; they are not backdated tests. The English writing case executes the exact `saveWriting` function extracted with the TypeScript parser. Its assessment input and UI/storage sinks are synthetic. Separate installed-browser cases verify the complete current caller.

| Case | Historical observation | Current observation |
| --- | --- | --- |
| Missing, null or object-shaped provider `matches` | Accepted as a clean empty result | Rejected |
| A real empty provider result | Accepted | Accepted |
| Missing `matches` at the client boundary | Crashed while processing the malformed response | Returned unassessed practice feedback |
| French, Spanish and ambiguous `Hotel` | Assumed German | Abstained |
| Lowercase German noun | Accepted after case erasure | Difference preserved |
| Authored short answer `Hotel` | Accepted | Accepted |
| Due/transfer flags without history | Created delay and novelty evidence | Neither claim created |
| Exposed copied repair | Granted output eligibility | Practice only |
| Unassessed English writing | Application unverified, evidence verified; writing marked done | Both unverified; writing saved as unassessed |

The direct client false-success hypothesis was **not reproduced**: it crashed instead. The ledger was revised to that observed defect. The upstream service's false-success defect was independently reproduced. Failed harness runs are retained under `artifacts/language-foundation-history`; only the passing final receipt is used for closure.

## Verification and delivery

- English `bun run check`: **217 tests passed**, plus content parity, typechecks and lint. [Log](../Apps/English/English-Automaticity/artifacts/foundation-check-2026-09-05.log).
- German `bun run verify`: **325 tests passed**, plus formatting, lint, typechecks, schema checks and production build. [Log](../Apps/Deutsch-Automaticity/artifacts/foundation-verify-process-access-2026-09-05.log). Shared tests appear in both product totals; they are not 542 distinct test definitions.
- The new installed foundation runner passes four browser journeys: eleven semantic Node/browser comparisons per language, plus the actual English and German legacy Grammar workflows. English saved five original responses, including a copied repair and free explanation; German saved an offline open response. Every imported attempt remained ineligible for independent credit.
- Existing installed integrity, shared practice, backup/restore, legacy import, history recovery and sync checks all passed again. The installed practice and evidence bundle hashes matched canonical source.
- Curriculum generation and grammar-scope freshness checks passed. Required coverage remains **3,906 cells**, including **322 missing task cells**. No content-review or full-curriculum gate was opened.

The initial restricted browser run timed out during navigation, and the initial restricted German API integration test exceeded its five-second timeout. Both passed with normal local process access and unchanged application code. Initial failures and corrected harness expectations remain on disk; only final passing runs support this report. No Windows security setting was changed.

No runtime or installer payload source changed in this increment. [Runtime preservation verification](../artifacts/language-foundations/runtime-preservation.json) checks the previously delivered source hashes, release ZIP hashes, installed versions and live endpoints. Installer rebuild/install/update/repair is **N/A for this verification-only increment**; the existing exact-hash lifecycle and profile-preservation evidence is in the [delivery record](LANGUAGE-AUTOMATICITY-DELIVERY-2026-09-05.md). Synthetic fixtures used separate browser contexts and never entered the normal learner profiles.

Reproduce the new checks with:

```powershell
bun scripts/verify-language-foundation-history.mjs
node scripts/verify-language-foundation-browser.mjs
```

Other curriculum, integration and learning-evaluation phases remain open. Independent human content review, genuine learner outcomes, qualified Transformer assessment and prospective scheduling evidence are separate requirements. Completing these foundation tasks establishes tested software behavior, not demonstrated language automaticity.
