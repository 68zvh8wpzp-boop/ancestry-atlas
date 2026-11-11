/* A053 — James Sheldon Webb: documented media inventory and source boundaries.
 * User directive: finish person-page audit BEFORE any narration changes.
 * Source preflight 10 Nov: 16 distinct documents = 14 locally backed
 * document images/previews plus 2 source-only citation cards; 36 photos.
 * The Oct 1 iPhone audit reported 13 passed previews, 2 source-only failures,
 * and 1 unreconciled document. Static file presence does NOT resolve that last
 * client-side preview gate. No new media, graph edit, Story edit or audio edit.
 */
(() => {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
  const sheldon = DATA.nodes.find(n => n.id === 'james_sheldon');
  if (!sheldon) return;
  const profile = typeof GUIDE_PROFILES !== 'undefined' && GUIDE_PROFILES.james_sheldon;
  const items = Array.isArray(sheldon.evidence) ? sheldon.evidence : [];
  const documents = items.filter(e => e.kind === 'document' || e.kind === 'citation');
  const citations = documents.filter(e => e.kind === 'citation');
  const linked = documents.filter(e => e.kind === 'document' && !!e.full);
  const photos = items.filter(e => e.kind !== 'document' && e.kind !== 'citation');
  const birthPlaceholder = documents.filter(e =>
    /Arizona birth record — certificate no\. 793/i.test(e.title || ''));
  // Read-only source manifest from exact current person-card items.
  // No approval is transferred from a 1 Oct iPhone screenshot to this draft.
  const inventory = documents.map(e => ({
    title: e.title || '(untitled)',
    kind: e.kind || 'unclassified',
    media: e.full || '',
    sourcePage: e.sourcePage || '',
    archivalClass: e.kind === 'citation'
      ? 'linked index/citation; no original image captured'
      : 'existing local image/reading copy; original master and client readability not independently certified A053'
  }));
  sheldon.sourceAudit = Object.assign({}, sheldon.sourceAudit || {}, {
    a053: 'Source-title crosswalk of Sheldon document/gallery runtime after 1 Oct removal of citation-only birth placeholder; draft static inspection',
    historicalIphoneDate: '2026-10-01',
    historicalDocumentCount: 16,
    historicalPhotoCount: 36,
    historicalPassedPreviewCount: 13,
    historicalSourceOnlyPreviewFailures: 2,
    historicalUnreconciledPreviews: 1,
    currentDraftDocumentCount: documents.length,
    currentDraftLocalDocumentSlots: linked.length,
    currentDraftCitationOnlySlots: citations.length,
    currentDraftPhotoCount: photos.length,
    currentDraftBirthPlaceholderCount: birthPlaceholder.length,
    documentInventory: inventory,
    sourceOnlyCitationTitles: citations.map(e => e.title || ''),
    sourceOnlySourceImageRule: 'Marriage-record citation and VA BIRLS index link must never display as original-document scans',
    birthSourceCaveat: '1943 Arizona indexed birth citation exists, full original AZDHS record image not yet retrieved; Snowflake indexed vs earlier St. Johns description unresolved',
    marriageSourceCaveat: '15 Jan 1965 license date is not necessarily the 12 Jun 1965 family photo wedding date',
    militarySourceCaveat: 'BIRLS is an index, not a separation record or original unit history',
    sourceAvailability: 'Arizona genealogy 1943 public 75-year access; inspect original before promoting birthplace or publishing a birth-certificate gallery item',
    newOriginalDocumentBytes: 0,
    newHistoricalPhotoBytes: 0,
    approvedNarrationAndStoryUnchanged: true,
    existingApprovedLifeBiographyUnchanged: true,
    graphAndRelationshipsUnchanged: true,
    historicalIphoneCheckNotNewDraftQA: true,
    fullyCertified: false,
    iphoneValidated: false
  });
  // Fix shorthand that previously implied an actual AZ birth certificate had
  // been captured; this changes a source-label note only, not approved life.
  sheldon.note =
    'James Sheldon Webb is documented in the 1950 Arizona federal census with his parents, James Wilford “Jay” Webb and Marion Beulah Brenay, and his sister Diane. His 1943 birth is supported by an indexed Arizona citation, but the actual certificate image has not yet been retrieved; Snowflake and an earlier St. Johns birthplace description require reconciliation. The 1965 marriage license and the VA BIRLS record are currently source citations, not captured original images. Historical photographs and school, family and service memories add context with contributor-supplied identifications.';
  if (profile) {
    profile.birthPlace = 'Arizona (Snowflake in indexed source; St. Johns reported earlier — original image pending)';
    // DO NOT rewrite profile.life; final biography/narration reconciliation
    // is deferred until all person pages have been audited.
  }
  sheldon.historicalNotes = Array.isArray(sheldon.historicalNotes) ? sheldon.historicalNotes : [];
  if (!sheldon.historicalNotes.some(n => n.title === 'THE SOURCE STATUS OF THE BIRTH, MARRIAGE AND MILITARY RECORDS')) {
    sheldon.historicalNotes.push({
      title: 'THE SOURCE STATUS OF THE BIRTH, MARRIAGE AND MILITARY RECORDS',
      paragraphs: [
        'The Arizona birth record has been identified through a citation that gives a 1943 date and Snowflake, Navajo County. An earlier tree description places the birth at St. Johns, Apache County. The original birth-certificate image is not yet present in the Atlas. The former citation-only birth card was removed at the user’s direction in October 2026, and must not be reinstated without a verified readable scan.',
        'The Arizona marriage citation identifies Inez Karen Prather and a 15 January 1965 license date. A preserved family wedding photograph bears a separate 12 June 1965 caption. A license and a wedding are different record types and dates; without the original record image they are not interchangeable.',
        'The Department of Veterans Affairs BIRLS Death File is an index lead for Sheldon’s reported Air Force service, not a record of his precise unit, training orders or discharge reason. The Atlas also preserves his service-era photographs. The 1950 census and 14 existing local document images/previews are genuine person-page research items, but the 1 October iPhone check left one document preview unreconciled; no later iPhone pass has verified this draft.'
      ],
      links: [
        {label:'Arizona official historical birth-record search',url:'https://genealogyapp.azdhs.gov/Genealogy/home/index?page=genealogysearch'},
        {label:'Arizona State Archives — marriage records',url:'https://azsos.libguides.com/azgenealogy/marriagedivorce'},
        {label:'NARA — military personnel file access',url:'https://www.archives.gov/personnel-records-center/ompf-access'}
      ]
    });
  }
})();