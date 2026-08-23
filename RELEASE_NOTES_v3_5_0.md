# Ancestry Atlas v3.5.0

Input package: `Ancestry_Atlas_v3_4_1_FLAT_GitHub_Package.zip` (retained untouched for rollback).

## Rebuilt television presentation surface

- Replaced viewport-unit-only Story sizing with measured Safari viewport dimensions supplied by the isolated TV module.
- Added an iOS landscape fallback for the reported half-width Story surface.
- Removed the proof notice, timeline, HUD, navigation badge, and research legend from the TV startup surface.
- Made the legend explicitly opt-in through `Show legend`.
- Reduced the TV controller from a large center overlay to a compact lower-right controller.
- During the cinematic entrance, only the story-starting state and exit remain visible.
- Story now owns the complete measured visible viewport with no transformed or constrained ancestor.
- Playback controls remain visible while narration is paused and can auto-hide only during active playback.
- Reduced the short-landscape overlays for the exact reported Safari Story height.
- Added prominent, accurate guidance that ordinary Safari chrome can only be avoided by launching the hosted Atlas from an iPhone/iPad Home Screen icon.

The approved Alfie MP3, exact narration text, approved visual sequence, genealogy dataset, and corrected camera implementation are unchanged.
