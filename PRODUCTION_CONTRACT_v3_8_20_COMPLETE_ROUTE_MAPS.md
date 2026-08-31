# Ancestry Atlas v3.8.20 complete-route-map contract

## Required behavior

- Every biography scene marked `visualType: 'map-only'` must render a visible, full-stage route map without depending on the Place panel or an earlier scene.
- Every supported `mapKey` must resolve to land context, geographic boundaries, readable place labels, and either a route or a focus marker.
- Unresolved route segments remain visibly dotted; supported segments remain solid.
- Route maps must remain entirely local and network-free.
- The dedicated Place surface remains independent and may use a sourced archival map where an appropriate calibrated map is available.
- A missing Place archival map must never make the main story stage black.

## Regression gate

`tests/experience-contract-regression.mjs` must confirm that the tour calls the shared route renderer directly and that the Charles Albert and Charles Godfrey life-route keys remain supported.

## Forward production rule

No biography may ship a `map-only` scene until its `mapKey` is represented in the shared route-map registry and exercised by the experience contract test.
