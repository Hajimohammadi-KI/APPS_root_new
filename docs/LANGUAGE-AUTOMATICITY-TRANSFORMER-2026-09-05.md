# M04 — shared Transformer integration

The optional text-assessment adapter is implemented in both apps. **No model is qualified or enabled for learner assessment.** The tested Qwen candidate returned contradictory judgments on development examples. Rejecting those outputs preserves the saved response and the existing unassessed result.

The integration uses the same versioned attempt and assessment contracts as the local exercises. It saves the original response before requesting any model feedback. Model code cannot directly change mastery or scheduling. Speech, notice tasks, unsupported task versions and missing approvals cannot trigger an assessment request.

## What is implemented

- A server-only, loopback HTTP adapter for a pinned model and runtime, with bounded input, response size and timeouts.
- Structured grammar, target and meaning judgments; exact quotations are aligned to the original response by application code. Invalid, missing or ambiguous evidence is rejected.
- Minimal correction is separate from optional stylistic rewriting. Style proposals never become correctness evidence.
- A same-origin API in each app, with request limits, no response caching and a disabled default.
- A shared browser client that discovers approved scopes without sending learner text. Provider failure retains the saved local result.
- An exclusive-write release compiler. It checks reviewed benchmark evidence, a configuration frozen before the final test, exact provider configuration, per-task-version sample coverage and a dated independent release decision. It does not activate settings.
- A local diagnostic launcher that checks the model file and every extracted runtime file against the pinned release archive. Its stop operation verifies process identity.

## Real development run

Candidate: `qwen3-8b-q4km-d98cdcbd03e1-p2-b10809`, using Qwen3-8B Q4_K_M and llama.cpp b10809. The official model repository provides the quantized model and its license; those facts do not establish suitability for grammar assessment. [Qwen model repository](https://huggingface.co/Qwen/Qwen3-8B-GGUF), [llama.cpp server documentation](https://github.com/ggml-org/llama.cpp/tree/master/tools/server).

| Development drafts | English | German |
|---|---:|---:|
| Cases | 10 | 10 |
| Accepted pass proposals | 2 | 1 |
| Rejected outputs, saved as unassessed | 8 | 9 |
| Median end-to-end latency | 3.03 s | 3.64 s |
| 95th-percentile latency | 3.59 s | 4.99 s |

These 20 examples are model-authored, unreviewed development drafts. The counts are **not accuracy estimates, human approvals or evidence of learning gains**. A rejected example combined `needs_repair` with `grammar: pass` and gave an incorrect explanation of a conditional sentence. The adapter refused it. The earlier p1 run is retained; p2 changed quotation alignment during development. Neither run used a reviewed final test set.

Evidence:

- `artifacts/model-evaluation/2026-09-05T12-18-48-387Z-pretrained-local/`
- `artifacts/transformer-local/development-debug-response.json`
- `artifacts/transformer-local/verified-downloads.json`
- `docs/model-evaluation/development-comparison.json`
- `artifacts/transformer-release-gates/2026-09-05T12-25-14-910Z/report.json` — 12 release safeguards passed.
- `artifacts/model-evaluation-gates/2026-09-05T12-23-48-862Z/report.json` — 24 evidence-chain safeguards passed.
- `artifacts/model-adapter-gates/2026-09-05T12-25-15-231Z/report.json` — five isolated transport scenarios passed.

## Reproduce diagnostic inference

From the workspace, run `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/start-local-transformer.ps1`. It uses the already downloaded model and runtime under `artifacts/transformer-local`; those large optional files are not bundled into the learning-app installers. Read `/health` at port 8082 for the exact version and configuration hash. Pass those values to `scripts/evaluate-model-candidates.ts` with `--candidate=pretrained-local`, `--endpoint=http://127.0.0.1:8082/assess`, `--version=...` and `--provider-config-sha256=...`.

Stop the diagnostic services with `powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/start-local-transformer.ps1 -Stop`. The launcher does not enable the model in either app.

## What remains before activation

M01–M03 still require independent labels, reviewed calibration and final benchmark data, sufficient supported scope coverage, and an actual release decision. The current candidate needs better development results before that evaluation. The compiler consumes the resulting qualification input and independent review JSON; it writes a new release file only if all gates pass.

Deployment then pins both `AUTOMATICITY_TRANSFORMER_RELEASE` and `AUTOMATICITY_TRANSFORMER_RELEASE_SHA256` in the app server's environment. The review JSON must record schema version 1, `decision`, `reviewerId`, `role`, `note`, `reviewedAt`, `qualificationSha256` and `configurationSha256`. No completed approval file has been created. Reviewer identities are recorded locally; the system does not authenticate professional qualifications.

The app update can be installed and used with model assessment disabled. Content review and learner evidence remain separate requirements for full-curriculum completion.

## Delivery verification

English 27.3.34 and DeutschFlow 20.8.38 are being packaged. Full English checks and full DeutschFlow verification passed. Installer lifecycle, normal-profile preservation and installed browser verification will be recorded here after execution.
