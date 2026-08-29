"""Keep model and corpus decisions consistent with executable configuration."""

from __future__ import annotations

import json
import sys
import unittest
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT / "src"))

from cefr_pipeline.schema import CorpusApproval
from cefr_pipeline.train_transformer import TransformerConfig


class CatalogContractTests(unittest.TestCase):
    def test_every_transformer_config_resolves_to_catalog_model(self) -> None:
        catalog = json.loads((PROJECT_ROOT / "catalog" / "model-catalog.json").read_text(encoding="utf-8"))
        by_id = {model["catalog_id"]: model for model in catalog["models"]}
        for path in (PROJECT_ROOT / "configs").glob("*.json"):
            config = TransformerConfig.from_json(path)
            config.validate()
            self.assertIn(config.catalog_id, by_id)
            self.assertEqual(config.model_id, by_id[config.catalog_id]["model_id"])

    def test_only_generated_fixture_is_preapproved(self) -> None:
        inventory = json.loads((PROJECT_ROOT / "catalog" / "corpus-inventory.json").read_text(encoding="utf-8"))
        approved = [
            CorpusApproval.from_mapping(row)
            for row in inventory["corpora"]
            if CorpusApproval.from_mapping(row).permits_training()
        ]
        self.assertEqual([item.corpus_id for item in approved], ["synthetic-contract-fixture"])
        self.assertTrue(approved[0].is_fixture)


if __name__ == "__main__":
    unittest.main()

