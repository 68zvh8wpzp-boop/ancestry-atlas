# Ancestry Atlas v3.8.0 — Cross-platform acceptance matrix

This matrix governs the responsive presentation layer. It does not authorize
changes to genealogy, evidence states, biography text, approved imagery,
narration, timing, or 3-D navigation semantics.

## Shared requirements

- The visible browser viewport is measured with `visualViewport` when present.
- Resize and orientation changes do not reload the Atlas or reset genealogy.
- Selection and the current branch remain intact.
- Rotation remains lateral and pivots around the visible screen center.
- Panning followed by rotation never snaps to `Me`.
- The research legend is available but never covers the tree at startup.
- Story imagery retains aspect ratio and is never stretched.
- Missing media produces a quiet presentation-safe state, never invented media.

## Phone portrait — tree

- The local 8–10-person family neighborhood uses the available vertical height.
- Century markers and the permanent instructional HUD are hidden.
- The evidence key is closed by default and available from Menu.
- The five primary navigation actions remain reachable with one thumb.
- The person card is a bounded bottom sheet and does not displace the canvas.

## Phone portrait — story

- The image receives the full measured viewport behind compact overlays.
- Name and year remain at upper left.
- Caption occupies no more than two compact lines above the utility band.
- Transport controls occupy the lower left; flag and map occupy the lower right.
- Safari chrome is treated as unavailable space, not covered or mismeasured.

## Phone landscape / AirPlay mirroring

- The story fits the remaining visible height even when Safari chrome is shown.
- The direct-video Full Screen / AirPlay route remains available for a clean TV image.
- The page never claims it can hide Safari chrome or detect mirroring.
- Ordinary mirrored interaction remains usable when fullscreen is unavailable.

## Tablet

- Research controls and person details remain available.
- Panels remain inside safe areas and never exceed the visible viewport.
- Touch targets remain usable without inflating the story overlays.

## Desktop

- Existing research density and branch controls remain available.
- Mouse pan, lateral rotate, wheel zoom, node selection, and biography return work.
- The side panel does not change the 3-D rotation pivot.

## Television / large display

- Explore and Story states scale to 1080p and 4K without fixed-resolution layout.
- The legend begins collapsed.
- Text and controls scale for across-room viewing.
- Presentation controls fade and return without interrupting the render loop.
- Exiting preserves the selected person and camera context where possible.
