# Ancestry Atlas v3.8.17 mobile museum-label contract

This amendment supplements the v3.8.16 family-source and scale contract.

## Viewer-facing captions

1. A caption is a museum label: identify the subject, event, place and date in
   concise public language.
2. Never discuss image selection, scarcity, generation, restoration, approval,
   evidentiary safety or what the image does not depict in a public caption.
3. Representative-image limits remain in provenance and evidence records. If a
   distinction is essential to historical meaning, state the supported fact
   positively instead of narrating the production decision.
4. Phone captions use content-driven height. They may scroll within a bounded
   area but may never be clipped by a fixed-height container.

## Place surface

1. Place is a separate location-and-period exhibit, not a duplicate photo
   caption.
2. Period flags use recognizable flag art with a specific public label. Generic
   wordmarks and phrases such as “period flag context” are prohibited.
3. Phone layouts stack flag, map, provenance and context without overlap.

## Lineage names

1. `All Lineage Names` includes the complete calculated lineage within the
   graph’s supported depth and fits that full set to the viewport.
2. The fit is centered on the lineage bounds rather than the currently selected
   person, so the earliest and latest visible generations remain on-screen.
3. The reverse action is labeled `Nearby Only`; button copy must describe the
   action that will occur.

## Research-frontier flags

1. Marion’s Canadian line ends at its supported Canadian ancestor.
2. Canadian imagery appears above the proof boundary at normal strength.
3. A possible French connection appears below the boundary in a faded treatment
   labeled `Possible French connection — unproved`.
4. Flag imagery is contextual and may not promote the Goulet hypothesis into an
   established pedigree.

## Release gates

- Audit viewer-facing captions in every registered biography.
- Reject production-language patterns including `does not depict`, `not
  pictured`, `without inventing`, `evidence-safe`, and `period flag context`.
- Exercise caption, Place, lineage-name and Canadian-frontier surfaces at iPhone
  portrait width before release.
