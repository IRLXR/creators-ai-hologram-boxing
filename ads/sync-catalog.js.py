"""Sync launch catalog JSON -> all-ads-data.js"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
catalog_path = ROOT / "ads" / "ALL-ADS-CATALOG.json"
js_path = ROOT / "ads" / "all-ads-data.js"

catalog = json.loads(catalog_path.read_text(encoding="utf-8-sig"))
js_path.write_text(
    "window.ALL_ADS_CATALOG = " + json.dumps(catalog, indent=4) + ";\n",
    encoding="utf-8",
)
print(f"Synced {len(catalog['ads'])} ads -> {js_path.name}")
