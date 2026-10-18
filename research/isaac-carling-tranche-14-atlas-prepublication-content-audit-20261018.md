# Isaac Van Wagoner Carling — Tranche 14: Live Atlas prepublication content audit and tested staging patch

**Date:** 18 October 2026  
**Active person:** Isaac Van Wagoner Carling (1831–1911), FamilySearch KWJ8-5XJ, Atlas `isaac_carling`.  
**Outcome:** **ONE working, syntactically tested, source-aware person-page staging module created and committed**, with a concrete app-path audit and acceptance checklist. **NOT YET LOADED BY THE LIVE APP. No user iPhone acceptance claimed.** This is substantive page implementation readiness, not another 83-source/239-Memories inventory. No email or FamilySearch writes.

## 1. Actual live code paths and findings

The user-facing entry `index.html` redirects to `atlas-v3.9.56.html`, with a specific iPhone cache-refresh query. The live HTML includes a single DATA node in its inline JSON-like record:

```json
{"id":"isaac_carling","name":"Isaac Van Wagoner Carling","years":"1831–1911","place":"U.S.","branch":"Webb / Carling","confidence":"strong","note":"Father of Sarah Elizabeth Carling. Polygamy classification: very likely; direct spouse and chronology proof remains incomplete."}
```

(The literal live record includes x/y/z coordinates not copied above.) A separate live graph edge maps `sarah_carling → isaac_carling`, and another maps `sarah_carling → asenath_browning`. **Do not infer from this simplified direct-ancestor graph that the other reported children or second wife are disproved**; adding unverified graph edges is not this person's content tranche.

**Live deficiencies confirmed:**
- Isaac's `DATA.nodes` object has **no substantive Biography field, no `portrait`, no verified `evidence` gallery list or `historicalNotes`** in the node literal. The current `GUIDE_PROFILES` has **no `isaac_carling` life entry** either.
- The generic “U.S.” place hides his Ulster County origin and Fillmore/Orderville locations.
- The short note implies the entire first marriage remains uncertain when the **17 Nov 1854 Isaac–Asenath wedding is strongly supported by the original 23 Nov 1854 *Deseret News***. The Miriam Hobson chronology/age remains disputed.
- The app's `openNode()` renders `GUIDE_PROFILES[id].life` under a **BIOGRAPHY** heading, independently renders `n.historicalNotes`, then `renderEvidence(n)`. The evidence renderer specifically separates **source links without media** from gallery tiles; no `full/thumb/originalAsset` should be assigned without a saved image binary.
- `renderPortrait(n)` would display “Verified historical portrait” for any `n.portrait`, so a photo-composite FamilySearch person tag is **not** safe as Isaac's portrait. No placeholder/illustration injected.

## 2. Actual working staged page patch

**File created and GitHub committed:** [`isaac-carling-mobile-biography-staged.js`](https://github.com/68zvh8wpzp-boop/ancestry-atlas/blob/main/isaac-carling-mobile-biography-staged.js). This JavaScript module is **NOT linked** in `index.html` or `atlas-v3.9.56.html` at this checkpoint.

What it changes **only when loaded by the app**:
- Finds exactly `DATA.nodes.find(n => n.id==='isaac_carling')`; leaves all other nodes and graph edges unchanged.
- Supplies a polished 3,717-character biography from the corrected [Tranche 10 review draft](https://github.com/68zvh8wpzp-boop/ancestry-atlas/blob/main/research/isaac-carling-tranche-10-museum-biography-review-20261018.md), including **mid-1870s** relocation rather than a disputed exact date, 1852 journey, 17 Nov 1854 Ogden wedding/officiant, reported separate family with Miriam, skilled woodworking/music/gardening, and death aged **79**.
- Replaces vague `place:'U.S.'` with `Ulster County, New York → Fillmore → Orderville, Utah` and a source-calibrated short note; retains confidence `strong`. Does not assert a fixed birth hamlet or original-verified Miriam wedding.
- Adds **two separately rendered historical notes**: the United Order's communal setting, and the **1 August 1852 Curtis-company intersection** without alleging Isaac met Webb Jr.'s family.
- Adds exactly **six curated source references** (1854 *Deseret News* original announcement, official *published diary transcription*, BYU Sarah historical biography, institutional 1911 dates, institutional Miriam derivative, and later Carling family account). Each has title, category, citation/provenance, readable summary and external sourcePage. **No document/media tile falsely created**: all six lack `thumb/full/originalAsset`.
- Sets `GUIDE_PROFILES.isaac_carling.life` to the same biography so it appears in the actual live `openNode()` biography card, and adds `HISTORICAL_CONTEXT.isaac_carling` for birthplace/world setting.
- Does **not** inject a portrait, original PDF, painted sketch, United Order co-op picture, extra family edges, a sealing act, a verified cooperative job title or new historical image.
- Merges references and historical notes **idempotently** by ID/title, retaining any future existing records rather than overwriting them.

### Simulated app-runtime QA performed after GitHub commit

The staged JavaScript was fetched from GitHub and parsed with a JavaScript parser (`new Function` syntax check) and **PASS**. It was then executed twice against an emulated live DATA node + GUIDE_PROFILES + HISTORICAL_CONTEXT objects using the same field contracts as the released app:
- Biography field populated; short note changed; `GUIDE_PROFILES.isaac_carling.life === person.BIOGRAPHY` **PASS**
- Historical notes = **2**, no duplicates on second execution **PASS**
- Source references = **6**, no duplicates on second execution **PASS**
- Photo count **0**, attached media binaries **0**, portrait **absent** **PASS**
- Other person nodes and their graph relationships unchanged **PASS**
- Live HTML still **does NOT include** `src="isaac-carling-mobile-biography-staged.js"` **PASS**, meaning this is an honest staging patch, not a claimed release.

**Test limitation:** This is data-contract/syntax and emulated runtime QA, **not** a graphical end-to-end mobile or Cloud Browser test. An actual release must check browser rendering, scroll, link opening, source-card behavior, and user iPhone experience. Do not infer that the page is live from the staging commit.

## 3. Publication acceptance boundaries — make remaining work concrete

**Ready in the staging module:** source-weighted biography; main 1854 original citation; life dates with age 79; direct Sarah–parents connection not altered; separate Orderville and 1852 notes; six honest source references; correct no-image status.

**Known, named documentary/media exceptions** (already researched, **do not re-loop**):
- 1911 Utah state death certificate **series 81448** source original has not been captured; cause/informant unverified.
- The 1852 diary was read as a Church History institutional **published transcription**, not an autograph journal scan.
- *Deseret News* marriage page was read as period original in Tranche05 but original PDF bytes were not saved locally.
- Miriam's marriage reported 1857 versus family recollection of 1859; place and age disputed; don't say original-certified married at thirteen.
- BYU MSS512 officer/carpetry original records inaccessible at named folio; no first vice president or appointed counselor title made definitive.
- The USU 1875 Orderville sketch associated with Isaac remains catalog-only author attribution; no viewed print/letters or reuse permission.
- The picture-pedigree composite FamilySearch Memory164147651 **is not approved as Isaac portrait**; crowd photo Memory166185359 not identified to his face.
- Orderville move circa **1875 vs 1876** unresolved; public text intentionally “mid-1870s.”
- The broader family roster of **12 reported Asenath children + 4 reported Miriam children** is captured in Tranche10 research; **individual non-direct graph edges have not been verified or changed**. Do not conflate a direct-line map with a full family register.

## 4. Precisely ONE next implementation tranche

**Tranche 15 — one controlled Atlas publication and browser/mobile release QA.** Starting from v3.9.56, create a new release version (e.g. `atlas-v3.9.57.html`), link the already-tested `isaac-carling-mobile-biography-staged.js` **after DATA/GUIDE_PROFILES definitions and other overlays**, update `index.html` redirect/cache stamp, and confirm the new release contains Isaac's BIOGRAPHY, two special notes, exactly six linked sources and **no invented photo tile**. Run available static/smoke checks and check actual browser display if a working browser is available. User iPhone validation is a **separate acceptance action after actual publication**, not a reason to restart research. This does not authorize editing FamilySearch or reading email.

**Status at end Tranche14:** person content **technically staged** and research-ready, but **live app unchanged**. Do not describe Isaac as published or user-approved.
