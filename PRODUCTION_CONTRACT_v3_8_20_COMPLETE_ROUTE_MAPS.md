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

## Cross-device presentation hierarchy

- Mobile is the primary product surface and the acceptance baseline. It must remain complete, intuitive, readable, responsive, and museum-appropriate because it will be the most commonly used experience.
- Desktop must materially exceed the approved iPhone presentation. Its additional space must produce stronger composition, larger and more legible photographs and maps, clearer tree exploration, better contextual relationships, and a more commercially persuasive experience—not merely a stretched mobile layout.
- TV Mode must deliver the strongest cinematic presentation while retaining clear origin-device control. It must use the display effectively, minimize browser chrome where the platform permits, and preserve photograph scale, narration timing, captions, maps, flags, and exit controls.
- Desktop and TV Mode must preserve every successful element of the mobile experience: complete photographs, readable uncropped captions, prominent gold dates, visible maps and period flags, consistent labels, usable story controls, and the intended narration-to-image timing.
- A layout does not pass merely because its controls function. Empty space, avoidable browser chrome, obscured faces, undersized imagery, missing overlays, clipped copy, or materially weaker composition than the approved iPhone view are release-blocking defects.
- Portrait and landscape are separate acceptance surfaces. Rotating the device must not collapse the story composition or cut off captions.
- Every production checkpoint requires an iPhone, desktop, and TV Mode presentation sweep before it is considered complete. The acceptance question is not simple parity: mobile must be excellent, desktop must be richer and stronger, and TV Mode must be genuinely cinematic.
