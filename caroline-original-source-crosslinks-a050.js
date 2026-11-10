/* A050: Caroline Amelia Owens Webb McRae original-source crosslinks.
 * Reuses established 1850/1860 archival assets already held by Webb Sr/Jr.
 * Does NOT rewrite the user-approved Caroline biography, approved Story, narration
 * artifacts, graph edges, or public/live deployment. No new media binaries.
 */
(() => {
  'use strict';
  if (typeof DATA === 'undefined' || !Array.isArray(DATA.nodes)) return;
  const caroline = DATA.nodes.find(n => n.id === 'caroline_owens');
  const edwardSr = DATA.nodes.find(n => n.id === 'edward_milo_sr');
  const edwardJr = DATA.nodes.find(n => n.id === 'edward_milo_jr');
  if (!caroline || !edwardSr || !edwardJr) return;

  caroline.evidence = Array.isArray(caroline.evidence) ? caroline.evidence : [];

  function findSource(node, matcher) {
    return (node.evidence || []).find(matcher);
  }
  function reuseVerifiedRecord(source, overrides) {
    if (!source || !source.full || source.sourceLevel !== 'original') return false;
    const target = Object.assign({}, source, overrides, {
      sourceLevel: 'original',
      a050ReusedFrom: 'Existing Webb branch media asset; NO new original or new binary'
    });
    if (caroline.evidence.some(e => (e.full && e.full === target.full) ||
          (e.sourcePage && e.sourcePage === target.sourcePage && e.kind === target.kind))) return false;
    caroline.evidence.push(target);
    return true;
  }

  const original1850 = findSource(edwardSr, e =>
    /edward-webb-1850-census-household477\.jpg/.test(e.originalAsset || e.full || '') ||
    /1850 census.*Edward.s household/i.test(e.title || ''));
  // The unmodified page file (5.3MB) already exists under this path.
  // The reader crop is a derived convenience, NEVER called the original.
  const added1850 = reuseVerifiedRecord(original1850, {
    kind: 'document',
    title: '1850 Missouri census — Caroline A. Webb household (original page)',
    date: '17 October 1850',
    place: 'Clinton County, Missouri',
    thumb: 'assets/edward-webb-sr/edward-webb-1850-census-reader.jpg',
    full: 'assets/edward-webb-sr/edward-webb-1850-census-household477.jpg',
    originalAsset: 'assets/edward-webb-sr/edward-webb-1850-census-household477.jpg',
    summary: 'The actual 1850 census lists E. M. Webb, 35, and C. A. Webb, 29, with four children and two Owens-named household members in Clinton County, Missouri. The schedule has no relationship column; familial relationships are correlated with other sources, not asserted by this page alone.',
    provenance: (original1850?.provenance || '') +
      ' A050 crosslink to Caroline; full unmodified scan reused without reacquisition; thumbnail is the existing mobile reading copy.'
  });

  const original1860 = findSource(edwardJr, e =>
    /1860 census — Edward in Caroline.s household/i.test(e.title || '') &&
    /edward-jr-1860-mcrae-reader\.jpg/.test(e.full || ''));
  const added1860 = reuseVerifiedRecord(original1860, {
    kind: 'document',
    title: '1860 Utah census — Caroline A. McRae in Fillmore (reading copy)',
    date: '16 July 1860',
    place: 'Fillmore City, Millard County, Utah Territory',
    thumb: 'assets/edward-webb-jr/edward-jr-1860-mcrae-reader.jpg',
    full: 'assets/edward-webb-jr/edward-jr-1860-mcrae-reader.jpg',
    originalAsset: original1860?.originalAsset ||
      'https://archive.org/download/populationschedu1314unix/page/n185.jpg',
    summary: 'The 1860 census places Caroline A. McRae, 39, born Ohio, in Fillmore. Edward M., 13, born Missouri, appears in the same household, and separately appears in an Owens household four days earlier. These census schedules do not explain the duplicate listing or directly state Caroline’s relationships to those named.',
    provenance: (original1860?.provenance || '') +
      ' A050 crosslink to Caroline; locally packaged reading copy is derived from the already inspected archive page. Original page accessible by attached source link.'
  });

  // The minute-book image was visually examined during A009. The crucial
  // distinction is literal ink versus scholarly annotation: the manuscript
  // has "Amelia C. Webb"; "[Caroline Amelia]" is NOT written in the ink.
  const minute = caroline.evidence.find(e => /Nauvoo Relief Society/.test(e.title || '') &&
    /Amelia C\. Webb/.test(e.title || ''));
  if (minute) {
    minute.date = '12 May 1842 (editorial date; heading reads May 13th)';
    minute.summary = 'The manuscript membership list on page [45] names Amelia C. Webb. The receiving language appears on page [43]. Historians identify her as Caroline Amelia Webb; the expanded name is NOT handwritten. The heading is dated May 13th in the original, corrected editorially to May 12th. The entry documents being received into the society, not that she attended that particular meeting.';
    minute.previewStatus = 'Manuscript inspected earlier (A009); original image NOT packaged in this Atlas build';
    minute.transcription = 'FULLTEXT_ORIGINAL:\n[Manuscript p. 45, subject entry only]\nAmelia C. Webb\n\nFULLTEXT_TRANSLATION\nNot applicable — original in English. Caroline Amelia is the editor’s identification, not the manuscript text.';
    minute.sourceLevel = 'original';
  }

  caroline.sourceAudit = Object.assign({}, caroline.sourceAudit || {}, {
    a050: 'Cross-referenced two already-preserved original census sources; 1842 minute-book editorial/literal distinction corrected without changing approved biography',
    sourceClass1850: 'contemporary original census; all relationships inferred from multiple records, not written on 1850 census',
    sourceClass1860: 'contemporary original census; local reading copy from already preserved page',
    sourceClass1842: 'original manuscript visually read A009; image unavailable in packaged app, editorial identification and date bracketed',
    original1842: 'Female Relief Society of Nauvoo Minute Book, 12 May [handwritten heading: 13] 1842, ms p. [45], entry Amelia C. Webb; editorial identification Caroline Amelia Webb',
    scholarlyCriticalEdition: 'https://www.churchhistorianspress.org/the-first-fifty-years-of-relief-society/part-1/1-2/1-2-8',
    authorialLetter1889: '2 June 1889 transcript attributed to Caroline; original autograph still unlocated',
    birthDateConflict: '9 July 1821, Church History Biographical Database versus 6 July 1821, derivative Rootsmagic family page',
    externalPortrait: 'CHD remote portrait, original historical image master not preserved locally; do not claim verified on iPhone',
    additionalOriginalMediaBytes: 0,
    reusedExistingOriginalPageFiles: [ 'assets/edward-webb-sr/edward-webb-1850-census-household477.jpg',
      'assets/edward-webb-jr/edward-jr-1860-mcrae-reader.jpg' ],
    galleryLinksActuallyAdded: Number(added1850) + Number(added1860),
    approvedBiographyUnchanged: true,
    approvedStoryAndNarrationUnchanged: true,
    parentEdgesUnchanged: true,
    fullyCertified: false,
    iphoneValidated: false,
    pending: ['1842 high-resolution minute-book image license and permitted archive access',
      '1889 autograph letter', 'Caroline original or responsibly licensed portrait',
      'Complete inventory of 35 sources and 53 Memories', 'iPhone image-decoder validation']
  });

  caroline.historicalNotes = Array.isArray(caroline.historicalNotes) ? caroline.historicalNotes : [];
  if (!caroline.historicalNotes.some(h => h.title === 'WHAT THE ORIGINAL RECORDS DO — AND DO NOT — SAY')) {
    caroline.historicalNotes.push({
      title: 'WHAT THE ORIGINAL RECORDS DO — AND DO NOT — SAY',
      paragraphs: [
        'A May 1842 membership list places “Amelia C. Webb” among women received into the Nauvoo Relief Society. The identification as Caroline Amelia Webb is supplied by modern scholarly editors. The meeting heading was written May 13; scholars correct it to May 12 using contemporary evidence. Admission to the organization does not, by itself, prove her physical attendance at that particular meeting.',
        'The 17 October 1850 Missouri census lists C. A. Webb, 29, with Edward M. Webb and the household. A second original 1860 census places Caroline A. McRae, 39, in Fillmore, Utah Territory, with an Edward M., 13, present. The boy may also have been recorded in a separate Owens household four days earlier. Neither census itself specifies every individual relationship; named identities must be correlated with the broader family record.',
        'The 1889 family letter survives here as a descendant transcription rather than an inspected autograph. A family genealogy gives a competing 6 July 1821 birth date against the Church History Biographical Database’s 9 July. Her earliest birth register, original funeral or burial record, and authenticated high-resolution portrait remain open. The dated 1850 scan is an unmodified page; the 1860 file in this gallery is an existing mobile reading copy.'
      ],
      links: [
        {label: 'Scholarly edition of the 1842 minute book',url:'https://www.churchhistorianspress.org/the-first-fifty-years-of-relief-society/part-1/1-2/1-2-8'},
        {label: 'Official Caroline person and 1852 traveling-group listing',url:'https://history.churchofjesuschrist.org/chd/individual/caroline-amelia-owens-1821?lang=eng'},
        {label: 'Original 1850 census in the national archive scan',url:'https://archive.org/details/populationschedu0396unix/page/n375/mode/1up'},
        {label: 'Original 1860 Fillmore census in the national archive scan',url:'https://archive.org/details/populationschedu1314unix/page/n185/mode/1up'}
      ]
    });
  }
})();