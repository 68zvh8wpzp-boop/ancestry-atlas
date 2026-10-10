#!/usr/bin/env python3
"""Install the preserved Richard Skinner source scans; never generate substitutes."""
from __future__ import annotations
import hashlib
import zipfile
from pathlib import Path

PACKAGE = Path("assets/richard-skinner/richard-skinner-media.zip")
EXPECTED_SHA256 = "f0245885fb6b149513190d03eece08c9ac5c99f2f7f0855587efbbb07a9954ec"
ALLOWED = {
    "marcie-skinner-birth-1894-child-original-preview.jpg",
    "marcie-skinner-birth-1894-child-original.jpg",
    "marcie-skinner-birth-1894-parents-original-preview.jpg",
    "marcie-skinner-birth-1894-parents-original.jpg",
    "richard-ellen-marriage-1882-original-preview.jpg",
    "richard-ellen-marriage-1882-original.jpg",
    "richard-marcie-logging-memory-218727497-preview.jpg",
    "richard-marcie-logging-memory-218727497.jpg",
    "richard-skinner-census-1900-original-preview.jpg",
    "richard-skinner-census-1900-original.jpg",
    "richard-william-carlton-memory-31066388-display.jpg",
    "richard-william-carlton-memory-31066388-preview.jpg",
    "richard-william-carlton-memory-31066388.jpg",
}
PREFIX = "assets/richard-skinner/"

def main() -> None:
    if not PACKAGE.is_file():
        print("No archived media ZIP uploaded yet. Source-linked page remains unchanged.")
        return
    actual = hashlib.sha256(PACKAGE.read_bytes()).hexdigest()
    if actual != EXPECTED_SHA256:
        raise SystemExit(f"Media archive SHA-256 mismatch: {actual}")
    with zipfile.ZipFile(PACKAGE) as archive:
        found = {info.filename for info in archive.infolist()}
        required = {PREFIX + name for name in ALLOWED}
        if found != required:
            raise SystemExit(f"Media archive content mismatch; missing={required-found}; extra={found-required}")
        for info in archive.infolist():
            if info.is_dir() or info.file_size <= 0 or info.file_size > 8000000:
                raise SystemExit(f"Invalid source-asset entry: {info.filename}")
        for name in sorted(ALLOWED):
            data = archive.read(PREFIX + name)
            if not data.startswith(bytes.fromhex("ffd8ff")) and not data.startswith(b"\xff\xd8\xff"):
                raise SystemExit(f"Asset is not JPEG: {name}")
            path = Path(PREFIX) / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data)
            if path.stat().st_size != len(data):
                raise SystemExit(f"Truncated source-image file: {name}")
    print(f"Installed {len(ALLOWED)} unchanged source scans, display derivatives and previews.")

if __name__ == "__main__":
    main()
