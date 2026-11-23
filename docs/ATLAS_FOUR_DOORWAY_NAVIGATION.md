# Ancestry Atlas — four-door entry contract

Date: 2026-11-23. Visual direction based on the installed iPhone screenshot showing an overcrowded Family Explorer.

## Home
The Atlas opens to **exactly four icon destinations**, in one top row with brief explanatory copy below:
1. **Tree** — a connected 2D ancestor map, showing a known photo beside the name when there is one and a generic silhouette otherwise.
2. **People** (outline bust) — a simple person search leading to the complete original biography, photo and archival-evidence view.
3. **Globe** — the existing interactive geographic globe, preserving approximate-place and evidentiary-status distinctions.
4. **Stories** (film reel) — the existing guided audio-visual family tours.

No persistent bottom bar, secondary navigation tabs, floating Explorer shortcut, Fan/3D choices, or separate Album destination is presented.

## Where existing capabilities live
- Tree → `atlas-2d-journey-preview.html`; person cards preserve direct-ancestor links and their existing family and Life & Records details. Home goes back to the four icons.
- People → `atlas-four-doors-20261123.js` search. Selecting a result opens the **existing** full Atlas person page in a same-origin reader. When closed, the search result state is preserved.
- Globe → the previously implemented `AtlasGeoGlobe` view, with clickable people and source-qualified locations. Closing a biography returns to the same globe.
- Stories → the existing `atlas-tour-3.6.0.js` chooser/player, which retains its four branches and narration. Closing returns to Home.

## Portrait provenance
`atlas-2d-portrait-index-20261123.js` currently registers **24 captioned or family-attributed people**, including the seven originally linked standalone portraits and seventeen additional sourced photographic views. Six of the new views isolate named individuals from captioned family or couple photographs, including Sarah Carling as the seated central adult in the 1891 family image. Eleven new views are face crops from person-labeled individual portraits. The original image remains unchanged; the Tree renders each crop from normalized coordinates. Other faces in a group picture are not assigned names unless the source supports their positions. The younger Isaiah Hill pictured with Lydia Ross is not the older Isaiah Hill ancestor and remains excluded. Missing/failed portraits use a generic silhouette. These photographic attributions are **not genealogical proof**; original source notes remain on the person pages.

## Scope safeguards
The `DATA.nodes` and `DATA.edges` constants in the original Atlas are unchanged. Existing research and confidence labels remain authoritative. Legacy 3D/Fan components still exist for compatibility and historical narratives but are no longer destinations in the navigation. No paid mapping service or data-sharing provider is added.

## Device QA
Still requires physical iPhone verification of:
- Home initially showing only four icons and four explanations.
- Tree Home / You / All and seven preidentified portraits (when network/local assets are available).
- People search spelling variants and full source-page reader.
- Globe drag, pins, event labels, and biography return.
- Stories chooser, tour playback, and return after Exit.
- Installed Home Screen app updating to the latest start URL.

The deployed site and actual iPhone state cannot be inferred from repository merges alone.
