/* Jamar Webb FamilySearch capture overlay — 2026-09-27.
   Source: FamilySearch person page KJJH-XGL, Sources, Memories, and the
   attached Arizona death-record viewer. Preserve the source conflict between
   the indexed event and the family's caption instead of smoothing it away. */
(() => {
  'use strict';

  if (typeof DATA === 'undefined') return;

  const sourcePage = 'https://www.familysearch.org/en/tree/person/memories/KJJH-XGL';
  const recordPage = 'https://www.familysearch.org/ark:/61903/1:1:FLJW-K4S?lang=en';
  const originalRecord = 'https://www.familysearch.org/ark:/61903/3:1:S3HY-DZ73-PDV?view=index&personArk=%2Fark%3A%2F61903%2F1%3A1%3AFLJW-K4S&action=view&cc=1534450&lang=en';
  const burialPermitImage = 'https://sg30p0.familysearch.org/service/records/storage/dascloud/patron/v2/TH-7743-156256-3574-8/thumbMobile.jpg?ctx=ArtCtxPublic';
  const graveMarkerImage = 'https://sg30p0.familysearch.org/service/records/storage/dascloud/patron/v2/TH-904-58874-1436-73/thumbMobile.jpg?ctx=ArtCtxPublic';

  let jamar = DATA.nodes.find(n => n.id === 'jamar_webb');
  if (!jamar) {
    jamar = {
      id: 'jamar_webb',
      name: 'Jamar Webb',
      years: '1946–1946',
      place: 'Springerville, Apache County, Arizona → Vernon Cemetery, Arizona',
      branch: 'Webb',
      confidence: 'strong',
      note: 'Jamar Webb was born and died on 9 November 1946. The FamilySearch death entry names James Webb and Marian Brenay as his parents and places the event in Springerville, Apache County, Arizona; the attached burial memory identifies Vernon as the place of burial. The family caption says he lived only a few hours and passed away in St. Johns, while the Tree and burial permit preserve a different place/event reading. The discrepancy remains explicit.',
      x: -1.35,
      y: 1.32,
      z: 0.35
    };
    DATA.nodes.push(jamar);
    if (typeof nodeById !== 'undefined' && nodeById?.set) nodeById.set(jamar.id, jamar);
  }

  const addEdge = (a, b, confidence) => {
    if (!DATA.edges.some(e => e.a === a && e.b === b)) DATA.edges.push({a, b, confidence});
  };
  addEdge('jamar_webb', 'james_wilford', 'strong');
  addEdge('jamar_webb', 'marion_brenay', 'strong');

  const evidence = [
    {
      title: 'Arizona burial or removal permit — Jamar Webb',
      date: '9 November 1946',
      place: 'Springerville, Apache County, Arizona → Vernon, Arizona',
      thumb: burialPermitImage,
      full: burialPermitImage,
      sourcePage: originalRecord,
      provenance: 'FamilySearch memory “Burial Permit for Jamar Webb,” contributed by DeEdra Breckenridge on 13 November 2025; upload filename 0079_a-Repaired.jpg. The original image is the Arizona State Department of Health, Division of Vital Statistics burial-or-removal permit. The companion indexed death source is “Arizona Deaths, 1870–1963,” record FLJW-K4S, with microfilm 2114733 and indexing batch I00237-1.',
      summary: 'The handwritten permit names Jamar Webb, records 9 November 1946, and authorizes removal/burial at Vernon. The FamilySearch Tree classifies the event as stillborn; the family caption instead says he lived only a few hours. The permit is preserved as the primary image while the uncertain handwriting and conflict remain visible.',
      confidence: 'original FamilySearch document image captured; handwriting and event description require cautious reading'
    },
    {
      title: 'Jamar Webb grave marker — “Our Little Angel”',
      date: '9 November 1946',
      place: 'Vernon Cemetery, Vernon, Apache County, Arizona',
      thumb: graveMarkerImage,
      full: graveMarkerImage,
      sourcePage,
      provenance: 'FamilySearch Memory with no title, upload filename jamar.jpg, contributed by ScottDaphne1 on 20 October 2015. The photograph is tagged to Jamar Webb. The marker text reads: “OUR LITTLE ANGEL / JAMAR / SON OF / JAMES & MARION WEBB / 9 NOV 1946 — 9 NOV 1946.”',
      summary: 'Photograph of Jamar’s grave marker at Vernon Cemetery. It independently preserves his parents’ names in the family memorial and confirms the one-day date range shown in the FamilySearch profile.',
      confidence: 'original FamilySearch photograph captured; marker transcription directly visible'
    },
    {
      title: 'Arizona Deaths, 1870–1963 — Jamar Webb indexed entry',
      date: '1946',
      place: 'Springerville, Apache County, Arizona',
      sourcePage: recordPage,
      provenance: 'FamilySearch source attached to KJJH-XGL: “Arizona Deaths, 1870–1963,” entry for Jamar Webb and James Webb, 1946. The source page identifies Jamar as male, gives event place Springerville, Apache, Arizona, and links the original image viewer at the Arizona death-record film.',
      summary: 'Indexed evidence naming Jamar Webb and associating him with James Webb (father) and Marian Brenay (mother). It anchors the identity and parentage, while the original image and family caption are retained separately so the Atlas does not collapse indexed data into an unqualified narrative.',
      confidence: 'attached indexed record with original image viewer verified'
    }
  ];

  jamar.evidence = evidence;
  jamar.note = 'FamilySearch person-page capture completed for KJJH-XGL: 3 sources listed (one attached, two detached suggestions) and 2 Memories reviewed. No portrait of Jamar was present. Captured the burial permit, grave-marker photograph, indexed death record, parent names, burial location, contributor/date metadata, and the family-caption conflict over Springerville/St. Johns and stillborn/lived-a-few-hours wording.';

  if (typeof GUIDE_PROFILES !== 'undefined') {
    GUIDE_PROFILES.jamar_webb = {
      birthPlace: 'Springerville, Apache County, Arizona (FamilySearch indexed event)',
      townContext: 'Jamar’s surviving record is a small but unusually intimate Arizona family record: a state burial permit, an indexed death entry, and a grave marker at Vernon Cemetery.',
      macroContext: 'Jamar was born in the final months of the Second World War, when Arizona families were still living within a wartime medical, transportation, and military landscape.',
      life: `Jamar Webb was born on 9 November 1946 and died the same day. His FamilySearch person page identifies him as the son of James Wilford Webb and Marion Beulah Brenay Webb. The attached Arizona death index places the event in Springerville, Apache County, Arizona, and the Family Tree records burial at Vernon Cemetery in Vernon, Arizona.

The evidence is unusually concentrated because Jamar’s life was so short. The page has one attached source—“Arizona Deaths, 1870–1963”—and two Memories. The first is an Arizona State Department of Health burial-or-removal permit, preserved as a worn handwritten document. The second is a photograph of his grave marker, which reads “Our Little Angel / Jamar / Son of James & Marion Webb / 9 Nov 1946 — 9 Nov 1946.” There is no surviving portrait or ordinary life photograph in the audited Memories.

The family’s caption for the burial permit says that Jamar lived only a few hours, passed away in St. Johns, and was laid to rest in Vernon. That account does not perfectly match the indexed event and the permit’s apparent Springerville reading, nor the Tree’s stillborn classification. The Atlas therefore preserves both layers: the indexed and handwritten record as documentary evidence, and the family caption as testimony. It does not choose between them without a clearer original reading or an additional civil record.` ,
      events: [
        {title:'A brief Webb life', group:'arizona', summary:'Jamar’s surviving records describe a life measured in a single day, preserved through a state permit, a death index, and a family memorial.'},
        {title:'A family memorial', group:'arizona', summary:'The Vernon Cemetery marker names Jamar as the son of James and Marion Webb and calls him “Our Little Angel.”'}
      ]
    };
  }

  if (typeof draw === 'function') draw();
})();
