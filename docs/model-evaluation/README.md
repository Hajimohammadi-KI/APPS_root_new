# Phase 7 review and model evaluation

Updated 5 September 2026. The engineering pipeline is implemented. **No grammar model is qualified, and the benchmark still needs independent human labels.**

The [review page](REVIEW.html) contains 20 original development examples across `en.c.113`, `en.c.119`, `de.c.146` and `de.c.150`. Each has a correct alternative, grammar error, ambiguity, off-target response and damaged-input example. Damaged text is a diagnostic for abstention; it is not a recording or an ASR accuracy measurement. All examples are development material. Calibration and untouched final examples have not been collected.

The page hides proposed labels, saves a local draft and exports completed labels. A reviewer enters their name and role, judges the response against its prompt, and explains the judgment or correction. An export does not approve a model or award learner credit. Two independent reviewers are required for each case; disagreements need a third adjudicator. Locally recorded identities and evidence hashes establish provenance within the workflow, not verified identity.

Place exported reviews in this workspace and import each into a new manifest:

```powershell
bun scripts/import-model-benchmark-review.ts docs/model-evaluation/development.json path/to/reviewer-export.json docs/model-evaluation/review-round-1.json
```

Original manifests and reviewer files are retained. Each label is bound to the exact task and response hash; changed content invalidates its review. Adjudication uses the same `ReviewRecord` format in `scripts/lib/model-benchmark.ts`, with a third reviewer and a later dated evidence file. Nothing is uploaded by the review page.

The diagnostic runner currently compares the production controlled-answer policy against draft hypotheses:

```powershell
bun scripts/evaluate-model-candidates.ts
```

Its first run matched the four stored correct alternatives and abstained on the remaining 16 examples. This is expected conservative practice behavior, not evidence that it can grade open grammar. The report includes the small sample denominators, uncertainty, latency, abstention and target contradictions. A reported API cost of zero for local rules excludes device and energy cost.

Two additional adapters are implemented and require an explicitly configured, version-pinned loopback endpoint:

```powershell
bun scripts/evaluate-model-candidates.ts --candidate=languagetool --version=SERVER_VERSION --endpoint=http://127.0.0.1:8081/v2/check
bun scripts/evaluate-model-candidates.ts --candidate=pretrained-local --version=MODEL_VERSION --endpoint=http://127.0.0.1:8082/assess
```

The pretrained adapter sends only the task, response, language, modality, construction and pinned model version. It expects a structured verdict, target/meaning judgments and the same version. Malformed responses, changed versions, timeout and connection failure produce `not_assessed`. No adapter changes learner history, mastery, scheduling or model settings.

LanguageTool annotations are recorded as proofreading suggestions. A lack of annotations cannot certify task relevance, meaning or target use. A portable LanguageTool 6.6 server and checksum-verified Eclipse Temurin 21 JRE were placed under `artifacts/model-evaluation-local`, without changing system Java or application settings. This is a pinned diagnostic candidate, not a claim about the latest LanguageTool release. All 20 draft requests succeeded. One English response received an agreement annotation. Four German responses received a spelling annotation on the proper name `Paco`; those annotations did not identify the intended grammar target. These observations still need human review. The adapter abstained from all 20 task-level judgments.

The [recorded comparison](development-comparison.json) includes exact run hashes, category denominators, suggestions, failures and latency. It can be regenerated with:

```powershell
bun scripts/summarize-model-diagnostics.ts artifacts/model-evaluation/2026-09-05T11-08-09-885Z-controlled-answer artifacts/model-evaluation/2026-09-05T11-41-29-126Z-languagetool
```

No pretrained grammar endpoint is configured. The free public LanguageTool endpoint prohibits automated requests, so it was not used for batch evaluation. The local server offers the basic engine without the cloud AI rules. See the [public API rules](https://dev.languagetool.org/public-http-api.html) and [official local-server instructions](https://dev.languagetool.org/http-server.html). The portable server's startup path, source URL and download hashes are recorded in `artifacts/model-evaluation-local/server.json` and `download-hashes.json`; it is bound to localhost and is separate from the installed apps.

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

The candidate and endpoint options must match the calibration run. The frozen record pins the whole manifest, candidate, configuration, policy, exact final-case IDs and calibration artifact. A final run records its start before sending requests. Post-test freezes, changed content, missing predictions and reused material fail the gate. The policy requires at least 20 final examples in each category per construction/content/rubric/mode scope, no consequential observed errors and at most 20% abstention on supported correct/error cases. This initial engineering threshold does not establish population accuracy. Independent release review must assess uncertainty and representative learner samples.

Automated curriculum approval additionally requires `evaluationEvidence` references to the reviewed manifest, final run and freeze. Each reference has a workspace path and SHA-256. The release checker recomputes the entire evidence chain; a saved passing score is insufficient. Runtime model approvals use exact construction, task-version, rubric and modality tuples. A new version or a neighbouring scope cannot inherit approval.

The [support matrix](support-matrix.json) accounts for all 3,906 required curriculum cells. Each has a manual-review workflow and conservative fallback. Zero automatic scopes and zero qualified human scopes are approved. Transformer deployment stays deferred until a reviewed candidate passes; reinforcement learning remains a later, separately consented learning-outcome experiment.

Verification: `bun scripts/verify-model-evaluation.ts` checks the evidence chain with explicitly synthetic fixtures. `node scripts/verify-phase7-browser.mjs` checks the review UI and compiled practice flow; `--installed` checks installed app routes. Synthetic reviewer names, responses and timing never enter the real review ledger or learner profile.
