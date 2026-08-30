# Ancestry Atlas v3.8.18 — Safari Landscape Corrective

- Corrected every runtime cache key; v3.8.17 had retained v3.8.16 asset URLs,
  allowing Safari to display superseded captions and Place behavior.
- Expanded landscape captions across the available width with content-driven
  height and scrolling only when the visible Safari viewport requires it.
- Kept all story surfaces inside `visualViewport` during orientation changes.
- Preserved fullscreen Home Screen presentation through explicit fullscreen and
  standalone manifest modes.
- Added a regression gate requiring every CSS and JavaScript cache key to match
  the visible release version.
