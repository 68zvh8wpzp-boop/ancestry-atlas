/* A054 — Inez Karen Prather Webb: recover omitted, already-preserved family media.
 * Preflight: 2026-10-04 historical closeout says 43 photos + 1 document.
 * Running CURRENT staged 20261004 inez-mobile-memoir.js produces only 39 photos.
 * Four Sept-27 original family-memory image *files* and the wedding announcement
 * are already in assets/sheldon/; do NOT clone or call them original negatives.
 * Narration and approved biography are frozen pending full person-page audit.
 */
(() => {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
  const inez = DATA.nodes.find(n => n.id === 'inez_karen');
  if (!inez) return;
  inez.evidence = Array.isArray(inez.evidence) ? inez.evidence : [];
  const memoryListing = 'https://www.familysearch.org/en/tree/person/memories/LFG9-JMZ';
  // Do not imply each FamilySearch item has a verified direct image locator:
  // the URL is the attached-person memories *collection* landing page.
  const stored = [
    {
      kind: 'document',
      title: '1965 family wedding announcement — image from preserved memories',
      date: '1965',
      place: 'Arizona',
      file: 'james-sheldon-wedding-announcement.jpg',
      summary: 'Family-held wedding announcement preserved as an image. The announcement is a family document, not the original Navajo County marriage license or a certified marriage certificate.',
      confidence: 'Existing contributor-captioned family document; original paper and issuer not separately audited'
    },
    {
      kind: 'photo',
      title: 'Inez and Sheldon — Mesa family wedding photograph',
      date: '12 June 1965 (contributor caption; separate from January marriage)',
      place: 'Mesa, Arizona',
      file: 'james-sheldon-wedding-original.jpg',
      summary: 'Contributor-captioned June 1965 Mesa photograph, associated with the later family religious sealing. The family states a separate January 1965 marriage; the image does not establish the date or contents of the civil license.',
      confidence: 'Contributor-captioned historical family photograph; unaltered original negative not yet inspected'
    },
    {
      kind: 'photo',
      title: 'Inez and Sheldon — 1965 reception photograph',
      date: '1965',
      place: 'Arizona',
      file: 'james-sheldon-wedding-reception.jpg',
      summary: 'Preserved family gathering photograph associated with the marriage. Specific reception day and location have not been independently established from this image.',
      confidence: 'Contributor-captioned family photo; precise event date not independently verified'
    },
    {
      kind: 'photo',
      title: 'Inez with Sheldon and their first child',
      date: 'about 1968',
      place: 'Arizona (reported)',
      file: 'james-sheldon-inez-shared.jpg',
      summary: 'Contributor-identified family portrait from the couple’s early parenthood. The approximate date and location are retained as family descriptions, not a dated studio-register finding.',
      confidence: 'Contributor-described family photograph; approximate caption'
    },
    {
      kind: 'photo',
      title: 'Later Webb family visit following a birth',
      date: 'about 1978–1979 (family caption)',
      place: 'Arizona (reported)',
      file: 'james-sheldon-newborn-visit.jpg',
      summary: 'Preserved family visit picture from a later generation. The particular date, location, and identities in the image have not been independently verified in this tranche.',
      confidence: 'Contributor-described family visit photograph; details require individual caption check'
    }
  ];
  const added = [];
  for (const item of stored) {
    const fileUrl = 'assets/sheldon/' + item.file;
    if (inez.evidence.some(e => e.full === fileUrl)) continue;
    inez.evidence.push({
      kind: item.kind, title: item.title, date: item.date, place: item.place,
      full: fileUrl, thumb: fileUrl, summary: item.summary,
      sourcePage: memoryListing,
      provenance: 'Existing family-memory image originally attached to the Sheldon Webb page; reused exact archived file at ' + fileUrl + ' (Sept 27 evidence crosswalk). Source page points to the person’s memories collection, not an individually certified original.',
      confidence: item.confidence,
      previewStatus: 'Existing image file in repo; no new iPhone render inspection',
      sourceLevel: item.kind === 'document'
        ? 'archived family announcement image — not civil original'
        : 'archived family-memory photographic reproduction — not authenticated negative',
      transcription: 'FULLTEXT_ORIGINAL: [Image-only source; no complete original textual transcription verified in A054]\nFULLTEXT_TRANSLATION: Not applicable; do not treat this placeholder as inspected original text.',
      a054ReusedLocalAsset: true
    });
    added.push(fileUrl);
  }
  inez.historicalNotes = Array.isArray(inez.historicalNotes) ? inez.historicalNotes : [];
  if (!inez.historicalNotes.some(n => n.title === 'THE THREE DISTINCT 1965 MARRIAGE DATES')) {
    inez.historicalNotes.push({
      title: 'THE THREE DISTINCT 1965 MARRIAGE DATES',
      paragraphs: [
        'Inez’s life-story manuscript describes the couple’s Lakeside wedding on 21 January 1965. A county marriage-affidavit citation displayed under Sheldon Webb refers to a 15 January 1965 license. A distinct preserved photograph bears a 12 June 1965 Mesa date, described in the family narrative as the later religious sealing. These are not interchangeable events or original certificates; the county record image has not been examined in this audit.',
        'The 1965 wedding announcement, two 1965 family images, and two later family pictures were already archived with Sheldon’s source material. This audit reconnects their exact files to Inez’s own gallery without redownloading them. Captions, exact dates, participant identifications, and reproduction rights still require direct source-item confirmation. Her complete, approved memoir-derived life biography and its existing 39 photo captions were deliberately left unchanged.'
      ],
      links: [
        {label:'FamilySearch attached-person memories collection (not direct original)',url:memoryListing},
        {label:'Arizona State Archives marriage-record guidance',url:'https://azsos.libguides.com/azgenealogy/marriagedivorce'}
      ]
    });
  }
  const docs = inez.evidence.filter(e => e.kind === 'document');
  const photos = inez.evidence.filter(e => e.kind === 'photo');
  inez.sourceAudit = Object.assign({}, inez.sourceAudit || {}, {
    a054: 'Restored 5 pre-existing September 2026 family-memory entries absent from the 4 October release code; 4 photos + 1 family announcement document; no media bytes acquired',
    historicalCloseout: '2026-10-04 noted 43 photos/1 document; current inez-mobile-memoir.js alone yields 39 photos, 0 documents',
    currentDraftPhotoCount: photos.length,
    currentDraftDocumentCount: docs.length,
    reusedExistingMediaFiles: added,
    addedMediaBytes: 0,
    civilMarriageStatus: '15 Jan 1965 licensed-index citation only; 21 Jan 1965 memoir wedding; 12 Jun 1965 contributor-captioned Mesa photo/religious sealing',
    originalCivilMarriageRecordSeen: false,
    approvedBiographyUnchanged: true,
    narrationAndStoryUnchanged: true,
    nodeEdgesAndPortraitUnchanged: true,
    fullyCertified: false,
    iphoneValidated: false,
    pending: [
      '1950 civil/family original context only if source available free',
      '1965 original Navajo County marriage paper',
      'Individual provenance, person IDs, full readable captions and rights for five restored files',
      'iPhone gallery decode, pinch and fullscreen after future user-approved release'
    ]
  });
})();