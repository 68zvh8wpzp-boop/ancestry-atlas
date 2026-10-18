#!/usr/bin/env python3
"""Capture ONE institution-published historic Orderville photographic image.
Not a portrait of Isaac; preserve exactly delivered bytes, source + checksums.
"""
import hashlib, io, json, pathlib, urllib.request
from PIL import Image
URL="https://extension.usu.edu/rra/images/plate-548x-a.jpg"
OUT=pathlib.Path("assets/isaac-carling")
NAME="orderville-townscape-circa-1900-usu-plate548x-original-web.jpg"
META="orderville-townscape-circa-1900-usu-plate548x-manifest.json"
def main():
    req=urllib.request.Request(URL,headers={"User-Agent":"Mozilla/5.0 (compatible; AncestryAtlasHistoricalPhotoResearch/1.0)"})
    with urllib.request.urlopen(req,timeout=40) as response:
        image=response.read(15_000_000)
        final_url=response.url
        ct=response.headers.get("content-type","")
    if len(image)<10000 or len(image)>15_000_000 or not image.startswith(b"\xff\xd8\xff"):
        raise RuntimeError(f"Expected original institutional JPEG; got {len(image)} bytes {ct} start {image[:16]!r}")
    im=Image.open(io.BytesIO(image))
    im.verify()
    im=Image.open(io.BytesIO(image))
    width,height=im.size
    if min(width,height)<300:raise RuntimeError(f"Photo resolution too small to be useful: {width}x{height}")
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/NAME).write_bytes(image)
    manifest={
      "subject":"Orderville, Utah, ca. 1900 — historic photograph of town, not an Isaac Carling portrait",
      "person_id":"KWJ8-5XJ",
      "atlas_person_id":"isaac_carling",
      "kind":"historic-townscape-context",
      "photographer":"not provided",
      "date":"circa 1900",
      "institution":"Utah State University Extension, Rural Rangeland Archive (RRA)",
      "plate":"548X",
      "institution_reference":"P-1093-12",
      "original_print_custody":"The Church of Jesus Christ of Latter-day Saints Church Archives, Salt Lake City, Utah (per USU RRA)",
      "photo_no":"5363-3 refers to 2004 retake, NOT this 1900 photograph",
      "source_page":"https://extension.usu.edu/rra/photos/orderville-utah-2",
      "direct_institutional_image":URL,
      "resolved_url":final_url,
      "stored_web_image":NAME,
      "original_web_file_sha256":hashlib.sha256(image).hexdigest(),
      "original_web_file_bytes":len(image),
      "dimensions_px":[width,height],
      "unaltered_web_file":True,
      "uncertainty":"Exact camera date, photographer, and whether Isaac appears are unknown; image only illustrates the town where he lived. Do NOT call an original negative, do NOT use as personal portrait, and do NOT equate an online JPEG with archive master.",
      "rights_note":"Historic photograph dates ca. 1900; attribution and reuse terms are not expressly stated on the institutional item page. The image's original may be public domain due to age, but check local publication/reuse requirements before third-party redistribution."
    }
    (OUT/META).write_text(json.dumps(manifest,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({k:manifest[k] for k in ["stored_web_image","original_web_file_bytes","dimensions_px","original_web_file_sha256"]},indent=2))
if __name__=="__main__":main()
