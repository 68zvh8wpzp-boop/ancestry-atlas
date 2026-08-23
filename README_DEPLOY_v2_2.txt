ANCESTRY ATLAS v2.2.0 — GitHub deployment

Repository root files:
  index.html
  atlas-content.js
  atlas-tour.js
  atlas-tour.css
  James_sheldon_webb.mp3   <-- keep your existing Alfie file exactly as named

Mobile tree behavior
- The normal phone tree shows a focused neighborhood of about 10 people, not the whole atlas.
- Tapping/recentering on a person rebuilds that local neighborhood around them.
- Exiting the A/V tour returns to a calm family view centered on the person just viewed.
- Mobile dock: Home / Back / Focus / Expand / Menu.
- Expand first shows a broader branch; Whole Atlas is a deliberate menu choice.
- Desktop retains the broad atlas controls and whole-tree experience.
- Portrait and landscape remain responsive.

A/V story behavior
- 8-second distant-star family-line entrance is retained.
- Story opens only after the approach.
- Approved MP3 is authoritative; no synthetic/browser voice fallback.
- Display transcript for James Sheldon Webb remains audio-locked.
- Optional photo scenes are now supported through TOUR_MEDIA.scenes. When no verified photo
  is attached, no empty photo placeholder is shown.

Updating GitHub
You do NOT need to delete old tracked files one by one when using Git/GitHub Desktop.
The preferred workflow is to keep the same filenames, replace them locally, then commit and push.
GitHub's web upload is convenient for new files but is clumsy for repeatedly replacing a package.
See the ChatGPT guidance for the recommended GitHub Desktop workflow.
