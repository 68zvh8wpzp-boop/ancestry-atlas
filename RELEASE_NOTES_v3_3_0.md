# Ancestry Atlas v3.3.0

Input package: `Ancestry_Atlas_v3_2_0_FLAT_GitHub_Package.zip`.

## Added

- Modular AirPlay-optimized TV Presentation Mode (`tv-mode.js`, `tv-mode.css`).
- Accurate connection instructions for iPhone, iPad, Mac, and HDMI displays.
- 16:9 television-safe Explore and Story layouts for 1080p, 4K, and other landscape viewports.
- Fullscreen feature detection with a safe non-fullscreen fallback.
- Auto-fading presentation controls, keyboard support, collapsible legend, story completion controls, and local-only instruction acknowledgement.
- Package asset manifest and verification utility.

## Preserved

- Complete genealogy dataset, notes, evidence states, provisional findings, and research frontiers.
- Lateral-only rotation around the visible point of interest; no return to the “Me” pivot.
- Pan, zoom, person selection, branch surfing, mobile family-neighborhood behavior, and biography return context.
- James Sheldon Webb transcript, scene sequence, captions, overlays, and approved local visual assets.
- `James_sheldon_webb.mp3` as the authoritative Alfie narration reference. No narration text or approved visual asset was regenerated.

## Input-package integrity finding

The referenced `James_sheldon_webb.mp3` file is not present in the v3.2.0 input ZIP and was not available in the supplied project files. v3.3.0 does not fabricate a substitute: the tour fails gracefully and reports narration unavailable until the approved MP3 is placed beside `index.html` under its exact locked filename.
