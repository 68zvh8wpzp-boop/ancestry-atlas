# Ancestry Atlas v3.5.2

Input and rollback package: `Ancestry_Atlas_v3_5_1_FLAT_GitHub_Package.zip`.

This corrective release removes the remaining legacy mobile story-sheet geometry from the guided tour. In ordinary phone Story Mode and TV Story Mode, the story shell and slideshow are now pinned directly to all four edges of the browser's visible fixed viewport. The slideshow no longer inherits a measured pixel width or the older half-screen/prelude sheet.

The transport is centered with viewport-relative percentage geometry, the 3D application remains fully hidden during story playback, and the approved narration, exact transcript, scene sequence, captions, timing data, genealogy, evidence states, camera restoration logic, and approved visual assets are unchanged.

The tour and TV runtime files use v3.5.2-specific filenames so a flat GitHub upload cannot accidentally combine the new `index.html` with an older cached tour stylesheet or script.
