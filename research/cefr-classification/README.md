# CEFR learner-text classification

This workspace implements the Phase 5 strategy in the APPS_root Product Quality Roadmap. It trains **text-difficulty classifiers** for English and German learner writing; it does not infer a learner's complete proficiency from one text.

## Current evidence state

- Data contract, conservative cleaning, corpus approval gate, group-aware splitting, leakage audit, feature baseline, Transformer trainer, ordinal/calibration metrics, run artifacts, and dashboard generator are implemented.
- The checked-in dashboard is intentionally `partial`: no real corpus has been approved or trained.
- `tests/fixtures/synthetic-learner-texts.csv` is generated test scaffolding. Its scores are labelled `fixture` and excluded from the dashboard.
- No paid API is required. The feature baseline runs on CPU. Transformer experiments use local open-source checkpoints and can be run on owned hardware or a free GPU session when available.

Read [the implementation guide](docs/IMPLEMENTATION-GUIDE.md) before approving or downloading a corpus.

## Quick start

```powershell
cd D:\APPS_root_new\research\cefr-classification
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e ".[baseline]"

# This source is fixture-only and proves software behavior, not model quality.
.\.venv\Scripts\cefr-pipeline.exe prepare `
  --input tests\fixtures\synthetic-learner-texts.csv `
  --inventory catalog\corpus-inventory.json `
  --output data\processed\fixture-v1 `
  --seed 42

.\.venv\Scripts\cefr-pipeline.exe train-feature `
  --splits data\processed\fixture-v1 `
  --output runs\fixture-feature-v1 `
  --repo-root D:\APPS_root_new `
  --run-id fixture-feature-v1
```

Transformer dependencies are deliberately separate:

```powershell
# Install the official PyTorch build appropriate for CPU or CUDA first.
.\.venv\Scripts\python.exe -m pip install -e ".[transformer]"

.\.venv\Scripts\cefr-pipeline.exe train-transformer `
  --config configs\english-modernbert.json `
  --splits data\processed\approved-english-v1 `
  --output runs\english-modernbert-seed42 `
  --repo-root D:\APPS_root_new `
  --run-id english-modernbert-seed42
```

## Repository contract

- `catalog/corpus-inventory.json`: approval and licence gate. Unknown means blocked.
- `catalog/model-catalog.json`: official facts, derived parameter estimates, and clearly labelled hardware estimates.
- `configs/`: identical fine-tuning recipes for the encoder comparison.
- `src/cefr_pipeline/`: preprocessing, splitting, training, evaluation, run, and dashboard code.
- `runs/**/run.json`: one traceable non-fixture experiment record. Model weights and predictions remain local and ignored by Git.
- `dashboard/artifact.json`: canonical source-backed snapshot. It shows `N/A` until measured runs exist.

