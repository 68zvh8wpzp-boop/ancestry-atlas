# Isaac Van Wagoner Carling — Tranche 15: Atlas v3.9.57 released to GitHub Pages

**Release date:** 18 October 2026.  
**Active ancestor:** Isaac Van Wagoner Carling (1831–1911), FamilySearch `KWJ8-5XJ`, Atlas `isaac_carling`.  
**Outcome:** **v3.9.57 deployed successfully to GitHub Pages, content-code checks passed, awaiting USER iPhone visual/content approval.** No new genealogical source research or unverified original-media assertions.

## 1. Exact release files and source provenance

- **Production person module** `isaac-carling-mobile-biography-20261018.js` created (commit `a18f9a157698eb3b243b3ccb4083d5b68c07c1d4`), based on Tranche14 tested staging patch and corrected Tranche10 museum biography. The file is no longer labeled an unpublished staging module; its `person.contentRelease` flags `published-awaiting-user-iphone-acceptance` rather than user-approved.
- **Versioned released HTML** `atlas-v3.9.57.html` created from the existing v3.9.56 source (commit `44c20df23e4495f43c73df368ceadfca9ab0a2a4`); existing features and prior Webb source material retained. The extra external module script **loads after all prior overlays and inline scripts**, immediately before closing `</body>`. Release title changed; old `atlas-v3.9.56.html` preserved for audit/rollback.
- **Main entry** `index.html` updated to redirect to `atlas-v3.9.57.html?iphone-refresh=20261018-isaac-carling-15-1` (commit `9481874db8ee442d2e1c3ffa73d5e6a6c7059260`). Existing query/hash handling and mobile navigation preserved.
- **Installed Home Screen PWA** `manifest.webmanifest` `start_url` updated to the SAME v3.9.57 and cache token (commit `f984601b8614674627fea21bd8135fb488a3213f`). This resolved the otherwise failing PWA manifest/root version parity test.
- **Official deployment endpoint:** https://68zvh8wpzp-boop.github.io/ancestry-atlas/ . URL directly reported by successful GitHub Pages Actions environment output on deployment commit `f984601b`.

## 2. Deployed person-page content

The release module finds `DATA.nodes[id==='isaac_carling']` and supplies:
1. **Full third-person museum biography** (3,717 characters): New York birth and family, the 1852 personally dated diary in published transcription, his actual **17 Nov 1854 Ogden marriage** to Asenath Elizabeth Browning officiated by Ezra T. Benson, his Fillmore and Orderville households, reported Miriam Hobson relationship preserving the disputed exact marriage date/venue/age, reported woodworking and family arts, the careful **mid-1870s** Orderville relocation chronology, death **24 May 1911 aged 79**.
2. **Two separate historical notes**: Orderville's United Order economy; 1852 intersecting Miller/Curtis company journeys without alleging a personal meeting with the Webb family.
3. **Six displayed source references** with external source URLs and museum citations: contemporaneous 1854 marriage announcement (viewed, original PDF bytes not locally retained), 1852 diary published transcription (not handwritten page), Sarah/Isaac–Asenath parentage biographical source, Church History dates, derivative Miriam source and later Carling family narrative.
4. **More precise person-place display**: Ulster County, New York → Fillmore → Orderville, Utah. The direct Sarah→Isaac/Asenath graph links unchanged.
5. **No invented person photograph, original PDF binary or picture-pedigree chart/gallery tile.** Every research-only source is rendered in the source-links section, not as a fake scanned document.

## 3. Checks performed and what has not been claimed

**Repository and runtime:**
- Verified live-release `atlas-v3.9.57.html` exists in GitHub default `main`, has exactly one release module script link after existing scripts, title updated, existing Webb release content and Isaac graph entry retained.
- Retrieved production JS from GitHub, confirmed valid syntax with JavaScript parser.
- Applied the production module **twice** to a representative `DATA.nodes`, `GUIDE_PROFILES`, `HISTORICAL_CONTEXT` environment: biography appeared, six source references and two historical notes remained nonduplicated, existing Sarah and other nodes untouched, no portrait and no attached media originals.
- Inspected the actual `openNode()` / `renderEvidence()` app implementation in original v3.9.56: `GUIDE_PROFILES[id].life` displays full Biography, `n.historicalNotes` display separately, and evidence with `sourcePage` but no `full/thumb` appears as source references, not image gallery cards.

**Deployment and regression gate:**
- Initial `Deploy Atlas to GitHub Pages` failed in its source-registry checks because existing registry records used noncanonical detailed statuses, duplicated canonical source identifiers, two unlocalizable `external:` originalRefs and six already CLOSED Edward Jr tasks inside the current queue.
- Fixed the **registry schema representation only** in commit `f22cd464699eb56393c2f384c1ffea2a9a1111df`: mapped nuanced statuses to allowed `blocked/partial/indexed/examined/published` while preserving the exact old labels in `researchDetailStatus`, archived six finished Edward tasks under governance without reopening them, deduplicated source ownership, moved external original locators to explicit `externalOriginalLocators` rather than falsely calling them saved local original files. Fixed BYU MSS 512 source-key year typo 1974→1874. All original-source evidence nuances remain intact.
- **Research source anti-duplication gate PASS**: Actions run `39156050569`.
- After the iPhone manifest mismatch was corrected, **Deploy Atlas to GitHub Pages PASS** (all registry, Richard Skinner, Jessie Aurin, upload and deploy steps): Actions run `39156145777`, deployment source commit `f984601b8614674627fea21bd8135fb488a3213f`.
- Earlier built-in GitHub `pages build and deployment` run `39155718807` was **SUCCESS** for the v3.9.57 index commit `9481874d`; a subsequent native build may run automatically for later documentation/checkpoint commits, but the separate custom release explicitly succeeded and recorded the canonical URL above.

**Limit of verification:** GitHub Actions reports successful deployment; the independent web fetch of the publicly served HTML through this chat could not access the site, and no actual iPhone graphical/browser scroll, source-link click or portrait absence was visually tested on the user's device. **Do NOT call this iPhone-approved**. Source-original access exceptions from prior Tranches 01–14 are retained and are not reasons to initiate broad repeat research before user review.

## 4. Acceptance step and freeze

**Tranche 15 is complete as a real source-controlled site publication.** Isaac is **published, pending the user's iPhone validation/approval**. Next on the user side: open https://68zvh8wpzp-boop.github.io/ancestry-atlas/ (installed Home Screen PWA should use the updated start URL), navigate to Isaac Van Wagoner Carling, verify Biography, both historical notes and six source references, and report **Approved** or one specific defect. All further implementation should fix only reported defects, not reopen 1850–1910 censuses, the 239 Memories inventory, or the rejected portrait composite.

**No email access, FamilySearch edits, paid services or fabricated media.**
