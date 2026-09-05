# Phase 7 review and model evaluation

Updated 5 September 2026. The engineering pipeline is implemented. **No grammar model is qualified, and the benchmark still needs independent human labels.**

The [review page](REVIEW.html) contains 20 original development examples across `en.c.113`, `en.c.119`, `de.c.146` and `de.c.150`. Each has a correct alternative, grammar error, ambiguity, off-target response and damaged-input example. Damaged text is a diagnostic for abstention; it is not a recording or an ASR accuracy measurement. All examples are development material. Calibration and untouched final examples have not been collected.

The page hides proposed labels, saves a local draft and exports completed labels. A reviewer enters their name and role, judges the response against its prompt, and explains the judgment or correction. An export does not approve a model or award learner credit. Two independent reviewers are required for each case; disagreements need a third adjudicator. Locally recorded identities and evidence hashes establish provenance within the workflow, not verified identity.

Place exported reviews in this workspace and import each into a new manifest:

```powershell
bun scripts/import-model-benchmark-review.ts docs/model-evaluation/development.json path/to/reviewer-export.json docs/model-evaluation/review-round-1.json
```

Original manifests and reviewer files are retained. Each label is bound to the exact task and response hash; changed content invalidates its review. Adjudication uses the same `ReviewRecord` format in `scripts/lib/model-benchmark.ts`, with a third reviewer and a later dated evidence file. Nothing is uploaded by the review page.

The diagnostic runner supports the production controlled-answer policy and the bounded representative construction checkers. The original 20-case manifest still runs the controlled-answer baseline by default:

```powershell
bun scripts/evaluate-model-candidates.ts
```

Its first run matched the four stored correct alternatives and abstained on the remaining 16 examples. This is expected conservative practice behavior, not evidence that it can grade open grammar. The report includes the small sample denominators, uncertainty, latency, abstention and target contradictions. A reported API cost of zero for local rules excludes device and energy cost.

The separate [representative development manifest](representative-development.json) binds 74 writing cases to the exact current production tasks in 12 English/German construction scopes. It deliberately reuses implementation regression examples. These are adapter diagnostics with model-authored expectations, not independent or unseen evaluation. Its `acceptedAnswers` field supplies one canonical example to the closed-answer comparator; it does not change the open production tasks. The `ambiguous` category includes wording outside the checker's supported patterns, which may be grammatical. The `asr_corruption` category here contains synthetic damaged text and provides no audio or ASR evidence.

```powershell
bun scripts/evaluate-model-candidates.ts --candidate=representative-construction --manifest=docs/model-evaluation/representative-development.json
bun scripts/verify-representative-model-candidate.ts
```

The adapter resolves and hashes the complete production task before assessment, pins source and curriculum hashes in its configuration, and rejects mismatched prompts, content/task/rubric versions, modality and task identities. Explicitly false target or relevance results stay distinct from unknown results. The [recorded comparison](representative-comparison.json) contains 24 passes, 24 repair judgments, two missing-target judgments and 24 abstentions for the bounded checker; the one-answer comparator passes its 12 canonical forms and abstains on 62 other cases. Those counts describe these known examples, not population accuracy. Neither run qualifies a scope or activates a model. The older LanguageTool/Qwen results remain on their original 20-case manifest and are not directly comparable with this new set.

To summarize another development manifest, pass both `--manifest` and a separate `--output` to `scripts/summarize-model-diagnostics.ts`, followed by its run directories. The original comparison is preserved. The support-matrix builder verifies the new run against the current source and curriculum before recording its bounded practice availability. Independent labels and separately collected calibration/final cases remain required.

Two additional adapters are implemented and require an explicitly configured, version-pinned loopback endpoint:

```powershell
bun scripts/evaluate-model-candidates.ts --candidate=languagetool --version=SERVER_VERSION --endpoint=http://127.0.0.1:8081/v2/check
bun scripts/evaluate-model-candidates.ts --candidate=pretrained-local --version=MODEL_VERSION --endpoint=http://127.0.0.1:8082/assess --provider-config-sha256=CONFIGURATION_SHA256
```

The pretrained adapter sends only the task, response, language, modality, construction and pinned model version. It expects a structured verdict, target/meaning judgments and the same version. Malformed responses, changed versions, timeout and connection failure produce `not_assessed`. No adapter changes learner history, mastery, scheduling or model settings.

LanguageTool annotations are recorded as proofreading suggestions. A lack of annotations cannot certify task relevance, meaning or target use. A portable LanguageTool 6.6 server and checksum-verified Eclipse Temurin 21 JRE were placed under `artifacts/model-evaluation-local`, without changing system Java or application settings. This is a pinned diagnostic candidate, not a claim about the latest LanguageTool release. All 20 draft requests succeeded. One English response received an agreement annotation. Four German responses received a spelling annotation on the proper name `Paco`; those annotations did not identify the intended grammar target. These observations still need human review. The adapter abstained from all 20 task-level judgments.

The [recorded comparison](development-comparison.json) includes exact run hashes, category denominators, suggestions, failures and latency. It can be regenerated with:

```powershell
bun scripts/summarize-model-diagnostics.ts artifacts/model-evaluation/2026-09-05T11-08-09-885Z-controlled-answer artifacts/model-evaluation/2026-09-05T11-41-29-126Z-languagetool artifacts/model-evaluation/2026-09-05T12-18-48-387Z-pretrained-local
```

A pinned Qwen3-8B Q4_K_M candidate was run locally through the shared structured adapter. Of 20 unreviewed development requests, 3 produced accepted pass proposals and 17 produced invalid or contradictory output and fell back to unassessed. These are development diagnostics, not accuracy measurements. The model is not qualified. Its optional diagnostic launcher, file hashes, prompt, runtime pin and release workflow are documented in [the M04 report](../LANGUAGE-AUTOMATICITY-TRANSFORMER-2026-09-05.md). The free public LanguageTool endpoint prohibits automated requests, so it was not used for batch evaluation. The local server offers the basic engine without the cloud AI rules. See the [public API rules](https://dev.languagetool.org/public-http-api.html) and [official local-server instructions](https://dev.languagetool.org/http-server.html). The portable server's startup path, source URL and download hashes are recorded in `artifacts/model-evaluation-local/server.json` and `download-hashes.json`; it is bound to localhost and is separate from the installed apps.

The temporary server was stopped after diagnostics to release memory; the review form does not need it. To run this same local candidate again, from the workspace root:

```powershell
$localEvaluation = (Resolve-Path 'artifacts/model-evaluation-local').Path
Start-Process -WindowStyle Hidden -FilePath (Join-Path $localEvaluation 'java/jdk-21.0.12.1+1-jre/bin/java.exe') -WorkingDirectory (Join-Path $localEvaluation 'lt/LanguageTool-6.6') -ArgumentList '-Xmx768m -cp languagetool-server.jar org.languagetool.server.HTTPServer --config server.properties --port 8081'
```

For a reviewed evaluation, collect separate calibration and final cases with disjoint source groups, template/item families, learner groups where applicable, and normalized content fingerprints. Do not move these development examples into a final partition. A speaking benchmark also needs original audio. Choose the candidate configuration using calibration evidence, then freeze it before any final requests:

```powershell
bun scripts/freeze-model-evaluation.ts reviewed-manifest.json calibration-run.json new-freeze.json
bun scripts/evaluate-model-candidates.ts --manifest=reviewed-manifest.json --partition=final --freeze=new-freeze.json
```

The candidate and endpoint options must match the calibration run. Pretrained runs also require the same `--provider-config-sha256`; the final release compiler checks it against the actual prompt, schema, sampling and pinned runtime configuration. The frozen record pins the whole manifest, candidate, configuration, policy, exact final-case IDs and calibration artifact. A final run records its start before sending requests. Post-test freezes, changed content, missing predictions and reused material fail the gate. The policy requires at least 20 final examples in each category per construction/content/rubric/mode scope, no consequential observed errors and at most 20% abstention on supported correct/error cases. This initial engineering threshold does not establish population accuracy. Independent release review must assess uncertainty and representative learner samples.

Automated curriculum approval additionally requires `evaluationEvidence` references to the reviewed manifest, final run and freeze. Each reference has a workspace path and SHA-256. The release checker recomputes the entire evidence chain; a saved passing score is insufficient. Runtime model approvals use exact construction, task-version, rubric and modality tuples. A new version or a neighbouring scope cannot inherit approval.

The [support matrix](support-matrix.json) accounts for all 3,906 required curriculum cells. Each has a manual-review workflow and conservative fallback. Zero automatic scopes and zero qualified human scopes are approved. The shared Transformer integration is implemented with activation disabled until a reviewed candidate passes; reinforcement learning remains a later, separately consented learning-outcome experiment.

Verification: `bun scripts/verify-model-evaluation.ts` checks the evidence chain with explicitly synthetic fixtures. `node scripts/verify-phase7-browser.mjs` checks the review UI and compiled practice flow; `--installed` checks installed app routes. Synthetic reviewer names, responses and timing never enter the real review ledger or learner profile.

The Transformer release compiler also requires independent review of each retained final model output. Final verdict scores alone cannot qualify explanations or corrections. Use `bun scripts/prepare-transformer-release-review.ts qualification-input.json NEW-review-packet.json` after a qualified, hash-bound final run exists; the packet includes original tasks and responses, exact outputs and blank review fields. Each output judgment covers verdict appropriateness, explanation accuracy, correction correctness and meaning preservation, style separation and a specific note. Missing, changed or unsuitable output reviews block compilation. No real release review has been supplied.
