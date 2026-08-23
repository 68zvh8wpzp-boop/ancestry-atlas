ANCESTRY ATLAS v2.1.0 — GitHub deployment

Upload these files together to the repository root:
  index.html
  atlas-content.js
  atlas-tour.js
  atlas-tour.css
  James_sheldon_webb.mp3   (your existing Alfie recording)

What changed in v2.1.0
- Landing button and story heading: Guided Audio-Visual Family Tour.
- A selected tour shows ONLY that family-line path during its cinematic entrance.
- Entrance begins as a tiny distant constellation and zooms for 8 seconds.
- Zoom uses strong ease-out deceleration: fast at first, visibly slowing as the tree fills the screen.
- Labels stay hidden during the distant-star portion, then appear as the family line becomes readable.
- Story UI opens only AFTER the 8-second tree entrance.
- Story background fades to black so the biography is the focal point.
- Mobile biography header is compact; the giant empty visual placeholder is removed.
- Previous / Play-Pause / Sound / Next / Exit transport is fixed and fully visible.
- Portrait and landscape mobile layouts are separate responsive compositions.
- iPhone/iPad Safari and modern Android Chromium browsers are supported.
- No browser/computer speech fallback. If an approved MP3 is missing, narration stops.
- James Sheldon Webb display text remains locked to the approved Alfie transcript in atlas-content.js.
- The exact audio filename expected is: James_sheldon_webb.mp3

Important
Do not rename the MP3 unless atlas-content.js is updated to the identical case-sensitive filename.
