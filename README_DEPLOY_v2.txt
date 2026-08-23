# Ancestry Atlas v2.0.0 — GitHub Pages deployment

Upload these four files to the repository root (the same level as the MP3):

- `index.html`
- `atlas-content.js`
- `atlas-tour.js`
- `atlas-tour.css`

Keep the existing narration file in that same root directory with the exact case-sensitive name:

- `James_sheldon_webb.mp3`

## Architecture

`index.html` contains the core genealogy atlas and map renderer. The accumulated v1.9.x tour patches have been removed.

`atlas-content.js` owns guided-story text, approved narration mappings, and the visual contract. When an audio file exists, its transcript is locked here so the displayed text and recording stay synchronized.

`atlas-tour.js` is the single tour/audio state machine. It never uses browser text-to-speech. It starts paused, performs the visible atlas → branch → family → person orientation before opening a story, and handles Previous / Play-Pause / Sound / Next / Exit.

`atlas-tour.css` owns desktop and iPhone presentation. On iPhone the tree is unobstructed during orientation, the story becomes immersive afterward, and transport controls remain pinned above the safe area.

## Audio rule

No computer voice fallback is allowed. If an approved MP3 is missing, the story remains readable and reports the missing filename.
