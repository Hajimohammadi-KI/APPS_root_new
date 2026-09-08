# Phase 4: grammar scope mapped and checked

Phase 4's inventory, lesson crosswalk, task policies and executable coverage gate are implemented and verified. The [searchable grammar scope](LANGUAGE-GRAMMAR-SCOPE.html) contains 280 specifications: all 112 English and 144 German existing units, plus 24 explicit additional targets. Each has form, meaning, use, contrasts, limits on alternatives, source mappings and dated author provenance.

This completion records the mapping and authoring infrastructure described by C01–C04. The specifications are model-authored. Independent human content approval remains pending, and the full curriculum release gate still rejects the current unqualified content. No CEFR level, real learner outcome or evaluator qualification was awarded.

| Task | Acceptance evidence | Result for the Phase 4 deliverable |
| --- | --- | --- |
| C01: construction inventory | [English specifications](grammar-scope/english-specifications.psv), [German specifications](grammar-scope/german-specifications.psv), [additional targets](grammar-scope/additions.psv), typed [inventory rules](../scripts/lib/grammar-scope.ts). All 280 records have the requested linguistic fields. Old teaching-order links are explicitly suggestions; mandatory dependencies require reasons and cannot cycle. Author role/date and model provenance are recorded. | Verified |
| C02: lesson mapping and omissions | [Baseline](grammar-scope/baseline-lessons.json), [many-to-many relationships](grammar-scope/relationships.json), [42 language/family audits](grammar-scope/family-audit.psv), [generated crosswalk](grammar-scope/inventory.json). Every existing lesson and original title alias is retained. Partial links to broad lessons do not satisfy a new target's task coverage. | Verified |
| C03: task types and exposure separation | [Seven task-type policies](grammar-scope/task-policy.json), [four authored transformation illustrations](grammar-scope/transformation-examples.json), [protected-material registry](grammar-scope/protected-material.json). The real curriculum generator preflights both languages before writing and rejects overlaps with protected families. | Verified for policy, examples and executable authoring safeguards |
| C04: coverage gate and actionable gaps | [Coverage and provenance](grammar-scope/inventory.json), [missing-work backlog](grammar-scope/missing-work.json), [combined gate](../scripts/check-automaticity-coverage.ts). New required cells are included in release blocking; baseline count assertions remain migration minimums, not exercise quotas. | Verified |

The reference audit uses Cambridge's [English grammar categories](https://dictionary.cambridge.org/us/grammar/british-grammar/words-sentences-and-clauses) and IDS [Systematische Grammatik](https://grammis.ids-mannheim.de/systematische-grammatik), with dedicated spelling, verb-complex and complement sources. The [reference register](grammar-scope/references.json) records 20 URLs and how they were accessed. Some Cambridge pages returned 403 to direct requests; the available search-index text was used and labelled accordingly. These are topic-level source checks and original model-authored specifications, not independent human review of every linguistic claim.

The scope stays extensible. Existing C1/C2 integration lessons are retained as bundles rather than treated as proof that all their subpatterns exist. New explicit targets include English generic conditionals, demonstratives, reciprocal and possessive pronouns, agreement with complex subjects, subject/object questions and mandative clauses; German additions include Futur II, Ersatzinfinitiv, adjective valency, demonstratives, lexical gender and genitive relatives. The source level labels remain unvalidated placement suggestions. The Council of Europe describes the CEFR as a [resource for curriculum design rather than a prescribed syllabus](https://rm.coe.int/168049447a).

| Coverage measure | Recorded value |
| --- | ---: |
| Existing lesson minimum retained | 256 |
| Additional explicit targets with partial lesson links | 24 |
| Language/family audits | 42 |
| Construction × stage × mode cells | 3,920 |
| Required cells | 3,906 |
| Missing-task cells | 322 |
| Existing authored but unqualified cells | 3,584 |
| Spoken N/A cells for purely graphic spelling targets | 14 |
| Independently human-reviewed construction specifications | 0 |
| Qualified release cells | 0 |

The 14 N/A cells belong only to the two new graphic spelling targets. Each has a linguistic reason and a reference. Their written tasks remain required. Missing evaluators, unavailable speech assessment and missing implementations cannot be relabelled N/A. The backlog also names contingent dialogue authoring as missing; a recorded monologue does not establish interaction.

Protected template and scenario IDs link variants transitively, including declared translations. Normalised content hashes catch literal duplicates even when IDs change. Learning material cannot share a connected family with calibration or evaluation, and calibration cannot share one with final evaluation. Exposed held-out items are quarantined. The registry currently contains no real benchmark material; unregistered semantic paraphrases still need independent review. The four transformation illustrations preserve their stated participants, time, polarity and modality, but their semantic annotations are authoring metadata and never function as an automatic assessment.

Verification passed:

- [54 inventory, prerequisite, coverage, partition and transformation-contract checks](../artifacts/grammar-scope/2026-09-05T10-23-53-220Z/report.json).
- [Six CLI and preservation checks](../artifacts/grammar-scope-cli/2026-09-05T10-23-53-301Z/report.json), including a real generator run against a synthetic protected duplicate. It rejected the overlap before replacing generated output.
- [11 browser checks](../artifacts/grammar-scope-browser/2026-09-05T10-21-57-912Z/report.json) for offline access, filtering, original aliases, keyboard use, mobile layout and local links. Desktop and mobile screenshots were inspected.
- [Four existing coverage-gate checks](../artifacts/automaticity-coverage-gates/2026-09-05T10-23-53-923Z/report.json) and [29 existing human-review/evaluator-gate checks](../artifacts/coverage-review-gate/2026-09-05T10-18-52-372Z/report.json).
- Strict TypeScript checks and the existing curriculum generation freshness check. English retains 2,128 typed tasks and German 2,592; those task counts do not establish adequate coverage.

Reproduce with `bun scripts/build-grammar-scope.ts --check`, `bun scripts/verify-grammar-scope.ts`, `node scripts/verify-grammar-scope-cli.mjs` and `node scripts/verify-grammar-scope-browser.mjs`. After an intentional specification or catalog change, regenerate with `bun scripts/build-grammar-scope.ts`. The normal curriculum builder accepts `--protected-material=<path>` for isolated fixtures; normal work uses the canonical protected-material registry. `bun scripts/check-automaticity-coverage.ts --release` returns exit code 2 while required content is missing or unqualified.

This change affects authoring tools, documentation and the coverage gate. The [runtime-preservation receipt](../artifacts/phase4-scope/runtime-preservation.json) confirms that all 100 recorded app/shared-runtime source hashes and both release ZIP hashes match the previous delivery. English 27.3.28 and DeutschFlow 20.8.34 remain installed and healthy. No learner-profile operation or new installer was needed because the generated runtime payloads are unchanged.

The next implementation work is concrete: author the 322 missing required task cells and contingent dialogue tasks, then obtain independent content reviews and qualify the relevant evaluators. The [source snapshot](../artifacts/language-release-source/20260905-phase4/manifest.json) and [final roadmap verification](../artifacts/phase4-scope/final-verification.json) retain this completion state.
