# Ancestry Atlas v3.4.1

Input package: `Ancestry_Atlas_v3_4_0_FLAT_GitHub_Package.zip` (retained untouched for rollback).

## Safari television correction

- Removed the transformed nested 16:9 Story shell that caused Safari to shift the image, title, and transport off-screen.
- Anchored the cinematic Story surface directly to the browser's actual visible viewport.
- Anchored narration controls to `50vw` with explicit viewport-safe widths and bottom insets.
- Kept images aspect-correct with `object-fit: contain`; a true 16:9 television viewport still fills completely.
- Restored the controls whenever the eight-second family-line entrance changes into Story.
- Hid the Explore legend by default; `Show legend` now opens it explicitly and changes to `Hide legend` while open.
- Preserved the approved Alfie recording, exact narration, all approved visuals, genealogy data, and corrected camera behavior.

Reported-failure regression viewport: 2048×757 CSS-pixel equivalent. The transport is centered and remains wholly visible.
