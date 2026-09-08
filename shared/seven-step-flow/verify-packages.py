"""Compare the delivered daily flow with source assets and check entry rewrites."""
from pathlib import Path
from zipfile import ZipFile
from io import BytesIO
import hashlib
import json

root = Path(__file__).resolve().parents[2]
report = []
for language, relative, product, page in [
    ("de", "Apps/Deutsch-Automaticity", "DeutschFlow", "heute"),
    ("en", "Apps/English/English-Automaticity", "EnglishGrammar", "daily"),
]:
    app = root / relative
    config = json.loads((app / "distribution/windows-modern/setup.config.json").read_text(encoding="utf-8-sig"))
    version = config["version"]
    payload = app / f"artifacts/windows-installer/{product}-Setup-v{version}.payload.zip"
    with ZipFile(payload) as archive:
        web_bytes = archive.read("resources/local-app/web.zip")
        expected_web_hash = archive.read("resources/local-app/web.sha256").decode("utf-8-sig").split()[0].lower()
    assert hashlib.sha256(web_bytes).hexdigest() == expected_web_hash
    assets = {}
    with ZipFile(BytesIO(web_bytes)) as archive:
        for name in [f"{page}.html", f"{page}-legacy.html", "seven-step-flow.js", "seven-step-flow.css", "grammar-worksheets.js", "grammar-worksheet-ink.js", "grammar-worksheets.css"]:
            suffix = f"public/replacements/{language}/{name}"
            matches = [path for path in archive.namelist() if path == suffix or path.endswith("/" + suffix)]
            assert len(matches) == 1, (language, suffix, matches)
            source_hash = hashlib.sha256((app / "apps/web" / suffix).read_bytes()).hexdigest()
            assert hashlib.sha256(archive.read(matches[0])).hexdigest() == source_hash, (language, name)
            assets[name] = source_hash
        manifests = [name for name in archive.namelist() if name.endswith("/.next/routes-manifest.json")]
        assert len(manifests) == 1, manifests
        routes = json.loads(archive.read(manifests[0]))
        rewrites = routes["rewrites"]["beforeFiles"]
        assert any(rule["source"] == "/" and rule["destination"].endswith(f"/{page}.html") and rule["missing"][0]["key"] == "screen" for rule in rewrites)
        assert any(rule["source"] == f"/{page}" and rule["destination"].endswith(f"/{page}.html") for rule in rewrites)
    report.append({"language": language, "version": version, "status": "PASS", "payload": str(payload), "webSha256": expected_web_hash, "assets": assets, "rootAndDailyRewrites": "PASS"})

output = root / "artifacts/seven-step-flow/package-verification.json"
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps([{**item, "assets": len(item["assets"])} for item in report], indent=2))
