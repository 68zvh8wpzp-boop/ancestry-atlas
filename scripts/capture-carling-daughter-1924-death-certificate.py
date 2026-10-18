#!/usr/bin/env python3
"""Preserve one 1924 Utah death certificate scan from a specifically verified family site.

This is ASENATH EMELINE CARLING SPENCER's certificate, NOT Isaac's own.
Keep returned bytes unchanged; verify a readable raster and checksum. 
No invented scan, data or “original archive master” claim.
"""
import hashlib, io, json, pathlib, urllib.request
from PIL import Image

URL="https://icspencerfamily.weebly.com/uploads/7/4/5/4/7454195/6182216.jpg"
PAGE="https://icspencerfamily.weebly.com/howard-orson-spencer-family-public-records.html"
OUT=pathlib.Path("assets/isaac-carling")
NAME="1924-asenath-emeline-carling-spencer-death-certificate-source.jpg"
MANIFEST="1924-asenath-emeline-carling-spencer-death-certificate-manifest.json"

def main():
    req=urllib.request.Request(URL,headers={"User-Agent":"Mozilla/5.0 (compatible; AncestryAtlasDocumentPreservation/1.0)"})
    with urllib.request.urlopen(req, timeout=35) as rsp:
        raw=rsp.read(12_000_000)
        url=rsp.url; typ=rsp.headers.get("content-type","")
    if not raw.startswith(b"\xff\xd8\xff") or len(raw)<12000 or len(raw)>12_000_000:
        raise RuntimeError(f"Expected jpeg source scan, got {typ} {len(raw)} {raw[:20]!r}")
    im=Image.open(io.BytesIO(raw));im.verify()
    im=Image.open(io.BytesIO(raw))
    width,height=im.size
    if width<450 or height<370 or width>9000 or height>9000:
        raise RuntimeError(f"Document resolution unexpected {width}x{height}")
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/NAME).write_bytes(raw)
    data={
        "document_subject":"Asenath Emeline Carling Spencer (1857–1924) — her own Utah death certificate",
        "NOT_subject":"Isaac Van Wagoner Carling (1831–1911) death certificate",
        "relevance_to_Isaac":"Names Isaac Van Wagoner Carling (born New York) as decedent's father and Asenath E. Browning as mother",
        "record_type":"Utah death certificate image",
        "death_date_reported":"1924-05-15",
        "record_county":"Kane County, Utah",
        "source_host":"Isaac Carling Spencer family archive (public family genealogy site)",
        "family_page":PAGE,
        "image_url_requested":URL,
        "image_url_resolved":url,
        "file_name":NAME,
        "byte_length":len(raw),
        "sha256":hashlib.sha256(raw).hexdigest(),
        "pixels":[width,height],
        "source_asset_unchanged":True,
        "source_level":"contemporary civil death record, digitized image redistributed by family site; original state-issued paper/official high-resolution scan not independently collected",
        "rights_and_attribution":"Underlying Utah State Archives death certificates older than 50 years are public government records; cite state death certificate Series 81448, the family archive's scan and this stored source URL",
        "caution":"Read image before transcribing. Certificate concerns daughter Asenath Emeline, not Isaac; some handwriting faint. Do not call this Isaac's own death certificate."
    }
    (OUT/MANIFEST).write_text(json.dumps(data,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({"bytes":len(raw),"dimensions":[width,height],"sha256":data["sha256"],"resolved_url":url},indent=2))
if __name__=="__main__": main()
