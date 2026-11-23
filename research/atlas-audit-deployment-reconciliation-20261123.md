# Ancestry Atlas — strict audit and deployment reconciliation (23 November 2026)

## Scope and source precedence
Content-only audit reconciliation. The current published entry is `atlas-v3.9.63.html`; **do not alter four-door navigation, PWA routing, portrait assets, stories, or display layout** in this checkpoint. This note does not certify a person page or a new source image.

Primary predecessor: persistent Research Library register `ancestry-atlas-person-page-register_A416_2026-11-22.json` (A416). The 23 November GitHub commits changed biological relationship classifications in the main Atlas and matching 2D pedigree snapshot. Subsequent commits changed three **test** files only.

## Verified 23 November publication/deployment facts
- Genealogy edits: `5edbc436ea3230edfe9299e25358de5ffc1ea572` and 2D snapshot sync `0583ccbc9c9c87cdcd71096e0672431e7f8a5d27`.
- CI repair commits: `92203a21df0ad1237799ec7e448fc8db9a6b627c`, `80d2f713ecfdc99b0763e08e36bd08f20d81b6b0`, `4e630f72c7f3aedf202f6ec81a4321e997f0d276`.
- GitHub compare `0583ccbc..4e630f72` lists exactly `tests/mobile-hybrid-navigation.test.mjs`, `tests/iphone-explorer-preview.test.mjs`, and `tests/atlas-2d-journey.test.mjs`. **No navigation, portrait, person, relationship or evidence asset file was changed by these CI repairs.**
- Both `Deploy Atlas to GitHub Pages` (run 45231780450) and `pages build and deployment` (run 45231780284) finished SUCCESS on commit `4e630f72`.
- This is **repository-and-deployment CI verification**, not a direct mobile-Safari or installed-home-screen-app acceptance test. The live browser visit could not be performed through current no-cost tools; iPhone version/cache remains **UNVERIFIED**.

## Distinct counting units — do not conflate
- A416 historical audit register: **128 mixed person-page roster rows**, **183 distinct evidence/document targets**. Neither count is a certified-person denominator.
- A352 working direct-path review: **82 profiles** in that separate proof/image coverage scope. It is not a certified-pages count and may not match the current static navigation subset.
- Static Atlas snapshot: **106 searchable people**. The updated 2D lineage regression reports **74 connected people and 32 disconnected/search-only people**. Both groups may include provisional or collateral records; none is a proven-ancestor census.
- A416's historical static connected count of 83 was **superseded** by the latest biological-edge correction; this is why the updated regression expects 74.
- **New fully certified person pages from this reconciliation: 0.** No claim of a `0/122` global fraction: the 122-person denominator needs reconciliation against the authoritative roster and nonperson/frontier filters.

## Source-capture continuation / no-repeat classification
The A416 queue already contains `davia-ann-dunbar-hill-duffy-1923-missouri-death-certificate-original`. This is **NOT** a new target.
- Reported identity: Davia Ann (Dunbar) Hill Duffy, death reported 3 March 1923, Ray County, Missouri; date and variant spellings require checking against the certificate.
- The **Missouri State Archives** officially provides digitized original death certificates 1910–1975, with images linked from its searchable index: https://s1.sos.mo.gov/records/Archives/ArchivesMvc/DeathCertificates/
- Indexed searches via public web search did not expose Davia's exact certificate or certificate number. The state archive search form requires an interactive database query that was not completed in this checkpoint. **No image was viewed, downloaded, transcribed, hashed, added to the Atlas or counted as proof.**
- Next novel attempt must use the free official index with careful name variants (`Davia`, `David Ann`, `Annie`, `Duffy`, `Hill`) and 1923/Ray County. If it yields the item, preserve the **whole original image**, state certificate number, exact source URL, transcribe every relevant identity field, compare the other known records, and only then consider a content-only Atlas evidence addition. Do not claim image retrieval from an index hint.
- Separate preexisting A413 original target: Dorthea Jensen Mortensen's 1916 Arizona death certificate. This, too, was unviewed at A416; no duplicate entry or claim made here.

## Full certification gate, unchanged
One actual direct-ancestor person page is complete only after: source-and-identity conflict review; first-hand original source image **bytes** (not merely an external link), full citation and transcription; appropriate historical images with provenance; coherent third-person biography; graph/person-page consistency; publisher/bundle availability; desktop or live web check; installed iPhone check; and user approval where required by existing contract. Historic partial approvals are retained, not silently carried over to a newly deployed version.

No new original image bytes, proven parent links, 1923 certificate images, public person-page changes, email access, or money spent at this checkpoint. Do not perform repeated blocked searches merely to increase an audit count.
