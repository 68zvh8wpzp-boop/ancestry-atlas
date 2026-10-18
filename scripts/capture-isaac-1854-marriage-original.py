#!/usr/bin/env python3
"""Capture exactly one already-identified 1854 newspaper original for Ancestry Atlas.

Historical scan must be retained byte-for-byte; PDF page JPG and magnified
clipping are *derivative viewing copies*. Do not create fake originals.
Runs in a GitHub Actions runner where outbound HTTPS is available.
"""
import hashlib
import io
import json
import pathlib
import urllib.request

URL = "https://newspapers.lib.utah.edu/udn_files/e7/54/e754867dc2a2b533fd0e62e58209eecd3876ed28.pdf"
OUT = pathlib.Path("assets/isaac-carling")
PDF = "1854-deseret-news-p3-marriage-original.pdf"
PREVIEW = "1854-deseret-news-p3-fullpage-view.jpg"
DETAIL = "1854-isaac-asenath-marriage-notice-view.png"
META = "1854-marriage-asset-manifest.json"

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(
        URL,
        headers={"User-Agent": "Mozilla/5.0 (compatible; AncestryAtlasDocumentPreservation/1.0)"},
    )
    with urllib.request.urlopen(req, timeout=40) as response:
        raw = response.read(20_000_000)
        content_type = response.headers.get("content-type", "")
        final_url = response.url
    if not raw.startswith(b"%PDF") or not 1500 <= len(raw) < 20_000_000:
        raise RuntimeError(f"Archive did not return expected PDF: {len(raw)} bytes, {content_type}, {raw[:32]!r}")
    # Pillow and PyMuPDF are installed by this one-shot workflow.
    import fitz
    from PIL import Image, ImageOps
    doc = fitz.open(stream=raw, filetype="pdf")
    if len(doc) != 1:
        raise RuntimeError(f"Expected original single newspaper page, got {len(doc)} pages")
    page = doc[0]
    words = page.get_text("text")
    if "CARLING" not in words.upper() and "ISAAC" not in words.upper():
        raise RuntimeError("PDF appears not to contain original Isaac Carling marriage notice; original held for manual check")
    (OUT / PDF).write_bytes(raw)  # untouched bytes of original PDF
    # Full-page view is only a JPG rendition, not the original source.
    full_pix = page.get_pixmap(matrix=fitz.Matrix(1.9, 1.9), alpha=False)
    full_img = Image.frombytes("RGB", (full_pix.width, full_pix.height), full_pix.samples)
    full_img.save(OUT / PREVIEW, quality=87, optimize=True, subsampling=0)
    # Archive scan page 3, notice near two-thirds across and one-quarter down.
    # Source inspected in Archive Viewer (issue 2581309, image position 2).
    r = page.rect
    clip = fitz.Rect(
        r.x0 + r.width * 0.623,
        r.y0 + r.height * 0.225,
        r.x0 + r.width * 0.806,
        r.y0 + r.height * 0.294,
    )
    detail_pix = page.get_pixmap(matrix=fitz.Matrix(5.0, 5.0), clip=clip, alpha=False)
    detail_img = Image.frombytes("RGB", (detail_pix.width, detail_pix.height), detail_pix.samples)
    detail_img = ImageOps.autocontrast(detail_img, cutoff=0.35)
    detail_img.save(OUT / DETAIL, optimize=True)
    manifest = {
        "subject": "Isaac Van Wagoner Carling and Asenath Elizabeth Browning marriage notice",
        "publication": "Deseret News",
        "issue_date": "1854-11-23",
        "volume": "4",
        "issue": "37",
        "page": "3",
        "event_date": "1854-11-17",
        "event_place": "Ogden City, Utah Territory",
        "officiant": "Ezra T. Benson",
        "original_pdf": PDF,
        "original_url": URL,
        "original_sha256": hashlib.sha256(raw).hexdigest(),
        "original_bytes": len(raw),
        "source_page": "https://archiveviewer.org/viewer/utah-digital-newspapers/2581309",
        "fullpage_rendition": PREVIEW,
        "magnified_notice_excerpt": DETAIL,
        "excerpt_crop_type": "derivative-view-crop; automatic tonal contrast, not source-original",
        "verification_note": "PDF identified by original issue/page plus text-layer presence of Carling/Isaac; screenshot previously inspected. Post-capture human visual QA needed to verify crop contains legible entire notice.",
    }
    (OUT / META).write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    for x in [PDF, PREVIEW, DETAIL, META]:
        print(f"Captured {OUT/x}: {(OUT/x).stat().st_size} bytes")
    print("ORIGINAL_SHA256=" + manifest["original_sha256"])
    print("NOTICE_TEXT_LAYER=" + repr(words[words.upper().find("MARRIED"):words.upper().find("MARRIED")+260]))

if __name__ == "__main__":
    main()
