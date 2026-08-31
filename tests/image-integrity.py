#!/usr/bin/env python3
"""Fail the release when any packaged raster image cannot be fully decoded."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
RASTER_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
EXCLUDED_PARTS = {".git", "recovered-library", "tmp", "review-output"}


def raster_files() -> list[Path]:
    return sorted(
        path
        for path in ROOT.rglob("*")
        if path.is_file()
        and path.suffix.lower() in RASTER_EXTENSIONS
        and not EXCLUDED_PARTS.intersection(path.parts)
    )


failures: list[dict[str, str]] = []
files = raster_files()
for path in files:
    try:
        with Image.open(path) as image:
            image.verify()
        with Image.open(path) as image:
            image.load()
    except Exception as error:  # Pillow supplies the useful decoder detail.
        failures.append(
            {"file": path.relative_to(ROOT).as_posix(), "error": str(error)}
        )

print(json.dumps({"checked": len(files), "failures": failures}, indent=2))
sys.exit(1 if failures else 0)
