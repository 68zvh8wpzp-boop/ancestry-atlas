# Isaac Van Wagoner Carling — Media Batch 03: 1911 death-certificate coverage gap; 1924 daughter's genuine state certificate captured

**Completed:** 18 October 2026 | **One active person:** Isaac Van Wagoner Carling (1831–1911), FamilySearch `KWJ8-5XJ`, Atlas `isaac_carling`.

## A. Crucial official archival finding: 1911 Kane death certificates only inventoried JAN–FEB

Utah State Archives, *Office of Vital Records and Statistics, Death certificates*, Series **81448**, official [folder inventory](https://archives.utah.gov/research/inventories/series/81448/) lists:

> **Box 20 | Series container 11 | Folder 21 | “1911; Kane, Jan- Feb”.**

The next listed 1911 folder is **Millard Jan–Dec**, *not* Kane later months. Isaac's death is reported **24 May 1911, Orderville, Kane County**, therefore **the published Kane folder scope does not cover his reported death date**. This is a **collection-coverage problem**, not merely a failure to try FamilySearch again.

**Evidence boundary:** Not proof that Isaac never had a state certificate. Original might have been filed late, in a different county, misplaced, absent due to poor registration, or in a distinct collection. No item-level 1911 Isaac death certificate image, county/state file number or image identifier was located. **Zero** Isaac-1911 certificates saved. Do not claim cause of death from a state death certificate. The later Isaac family history quotes the *Kane County News* as saying “kidney trouble” on 24 May 1911, but that quote is a family-history reproduction, not an examined primary newspaper original. Searches of Utah Digital Newspapers showed *Kane County Independent* starts 1912; no contemporaneous 1911 clipping for the quoted *Kane County News* was captured this batch.

The official public Series81448 record may be reproduced and shared with citation (per Utah Archives research guide), but the state archives still must identify a matching item before archive-image capture can be claimed.

## B. Successful single alternate: daughter Asenath Emeline Carling Spencer's ORIGINAL CIVIL RECORD IMAGE

**Image located and visually inspected:** Isaac Carling Spencer family archive, [Howard Orson Spencer Family Public Records](https://icspencerfamily.weebly.com/howard-orson-spencer-family-public-records.html), original record thumbnail / family-publication source at `https://icspencerfamily.weebly.com/uploads/7/4/5/4/7454195/6182216.jpg`.

**Whose record?** **Asenath Emeline Carling Spencer (born about 1857, died 15 May 1924 in Orderville, Kane County)**. This is **not Isaac's death certificate**; instead it is a state-issued contemporary document naming him as **father**. The record identifies Asenath's mother as **Asenath E. Browning**, and lists Isaac's birth as New York. It corroborates one child-parent link, but the informant is from the next generation and we must not treat it as the child's birth certificate. We did **not** check any original archival paper or master scan.

**Preservation completed by successful one-shot GitHub Actions capture, not link-only:**
- Stored published civil-certificate JPEG unchanged as `assets/isaac-carling/1924-asenath-emeline-carling-spencer-death-certificate-source.jpg`.
- Actual file: **196,665 bytes**, **576×518** pixels; SHA-256 **88a70e481e7b3bf94205815d2a2b3bf053589efee615514d5fd479d640499fc0**.
- Provenance: `assets/isaac-carling/1924-asenath-emeline-carling-spencer-death-certificate-manifest.json`; includes exact URL, cert identity, family-site custody, file hash, image size, and original-paper limitation.
- GitHub capture workflow `.github/workflows/capture-carling-daughter-1924-death-certificate.yml` successful, run https://github.com/68zvh8wpzp-boop/ancestry-atlas/actions/runs/39162618718 . Source script `scripts/capture-carling-daughter-1924-death-certificate.py`.
- **Asset is low-resolution**. This was an unchanged image downloaded from the family website, **not the original Utah State Archives high-res scan or state-held paper**. No invented 1200-dpi enlargement and no unsupported reproduction rights claim.

**Selected near-diplomatic field reading from the actual image (not exhaustive):**
- “STATE OF UTAH — DEATH CERTIFICATE” / Asenath Emeline Carling Spencer.
- Place of death: Kane County, Orderville.
- Death: May 15, 1924.
- Father: Isaac Vanwagoner Carling; birthplace New York.
- Mother: Asenath E. Browning; birthplace appears abbreviated (Illinois), needs larger scan for certainty.
- Other low-resolution handwritten fields (cause, informant particulars) **not confidently fully transcribed**. Transcription/translation flags explicitly say selected English fields only.
- Contemporary original record content supports death and kinship, but daughter's actual birth and parental events are not firsthand witnessed on her death document.

## C. Publication

`isaac-carling-daughter-1924-death-certificate-media-20261018.js` adds one **kind:document** entry, ID `isaac-1924-daughter-asenath-carling-spencer-death-certificate`, on ISAAC's page with her full name and explicit “This is NOT Isaac's own 1911 death certificate.” Saved source image is the actual thumbnail and modal image; originalAsset links to the same unchanged family-hosted scan. Mother/father field transcription is qualified and clearly marked incomplete. It does not make any speculative graph edges.

**App QA before publication:** applying the four modules (Isaac biography, 1854 wedding original+views, 1900 Orderville historic place photo and new 1924 daughter civil record) with the new module twice produces **three document viewing tiles** (**two views of ONE 1854 period newspaper PDF, plus ONE separate 1924 civil-certificate source-image**), **one historical town photograph**, **five other source-only citation records**, **two historical notes**, **zero portraits of Isaac**, no duplicate daughter certificate, no other person mutations. JS syntax passed.

Release `atlas-v3.9.60.html`; root `index.html` and `manifest.webmanifest` route to v3.9.60 with `20261018-isaac-doc-b3` cache-busting token. **GitHub Pages deployment and actual user iPhone gallery rendering are separate verification steps**; see latest Actions logs; do not invent successful on-device visual verification.

## D. Source/identity governance and next exact tranche

**Counts:** Isaac own death certificate still **0**; daughter Asenath's 1924 death certificate one independently saved web-resolution original-document **reproduction**; 1854 newspaper original one PDF; 1900 Orderville historical place photograph one genuine web JPEG. **Isaac authentic individual photographs remain 0**.

**No retreading** 1911 Kane Jan-Feb folder expecting Isaac's May death. Any future 1911 pursuit must first have a *new exact file number, different county, alternate state ledger series, or primary newspaper holdings*.

**Exactly next (if user asks): Media Batch04 — Isaac's 1852 diary autograph manuscript:** identify whether an original autograph exists and which repository holds it; compare to the already-read Church History / Mortenson 1966 published transcript; save only a genuine archival image with custody. If none identifiable, record once as unproven, without re-reading the 1852 transcript or searching 239 Memories. If specific family portrait is later surfaced, inspect original and identity before using portrait field.

**No email access, FamilySearch writes, fees, invented archival scans or identified-portrait claims.**
