/* Ancestry Atlas — Webb father-name evidence, 27 October 2026.
 * Evidence class: scholarly DERIVATIVE transcription; manuscript Book A p178 remains restricted.
 * Conservative identity treatment: neither c1733–1817 Chatham nor c1754–1823 Saybrook candidate is assigned.
 * Link-only source: no false 1841 manuscript image or published-2002 book preview.
 */
(()=>{
  'use strict';
  if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes)||!Array.isArray(DATA.edges)) return;
  if(globalThis.__ATLAS_WEBB_FATHER_2002?.applied) return;
  const jr=DATA.nodes.find(n=>n.id==='james_webb_jr');
  const father=DATA.nodes.find(n=>n.id==='james_webb_sr');
  if(!jr||!father)return;
  const bookUrl='https://www.familysearch.org/library/books/records/item/295396-annotated-record-of-baptisms-for-the-dead-1840-1845-nauvoo-hancock-county-illinois-v-06';
  const catalogUrl='https://www.familysearch.org/en/search/catalog/koha:228288';
  const quote='James Webb was the Son of James Webb.';
  const citation='Susan Easton Black and Harvey Bischoff Black, Annotated Record of Baptisms for the Dead, 1840–1845: Nauvoo, Hancock County, Illinois, vol. 6 (2002), printed p. 3743 (digital PDF p. 397), citing Nauvoo Baptismal Records of the Dead, Book A, p. 178, and FamilySearch Ancestral File.';
  const source={
    id:'webb-black-black-2002-v06-p3743-james-father',
    kind:'document',
    sourceLevel:'reference',
    title:'1841 James Webb baptism — father–son relationship in annotated transcription',
    date:'1841 baptism; scholarly compilation 2002',
    sourcePage:bookUrl,
    sourceReference:citation,
    provenance:citation,
    summary:'The editors identify James Webb, born 21 March 1777, as proxy for a deceased James Webb and explicitly call him the deceased man\'s son. The original 1841 Book A page 178 remains unexamined. The 1733 birth, Gideon/Edith parentage, and Nova Scotia marriage are NOT verified by this citation; the compilation also used Ancestral File.',
    confidence:'Strongly supported father NAME; 2002 derivative annotation; original/older-father identity unresolved',
    previewStatus:'Scholarly book citation only — no original 1841 manuscript image attached.'
  };
  const access={
    id:'webb-1841-book-a178-original-film183376',
    kind:'document',
    sourceLevel:'collection',
    title:'Original Nauvoo baptism Book A, page 178 — access restricted',
    date:'1841',
    sourcePage:catalogUrl,
    provenance:'FamilySearch catalog 228288; Volume A, 1840–1841; microfilm 183376; DGS 5270300; restricted-image icon verified 27 October 2026. Original p. 178 NOT read.',
    summary:'This is the precise original register locator cited by the 2002 editors. Its access restriction is documented; no claim is made that the manuscript itself has been inspected.',
    confidence:'Exact retrieval target, NOT independent relationship evidence',
    previewStatus:'Access limited; no original-page scan saved.'
  };
  for(const n of [jr,father]){
    if(!Array.isArray(n.evidence))n.evidence=[];
    for(const e of [source,access]){
      if(!n.evidence.some(existing=>existing.id===e.id))n.evidence.push({...e});
    }
  }
  jr.note='Born 21 March 1777 according to later genealogical sources; lived in Connecticut, western New York and Illinois. A 2002 scholarly compilation of Nauvoo baptisms explicitly calls him the son of a deceased James Webb for whom he was baptized in 1841 (Book A, page 178). This strongly supports that his father was named James. However, the original register is access-restricted, and its precise wording has not been examined. The reported mother Elizabeth Douglas and the conflicting c1733–1817 Chatham/East Haddam and c1754–1823 Saybrook older James identities remain unresolved. His father is not yet safely assigned an exact lifespan, birthplace, or parents.';
  father.name='James Webb (father of James Jr.; identity unresolved)';
  father.confidence='strong';
  father.note='James Webb is strongly supported as the father of James Webb Jr. (1777–1845). The 2002 annotated Nauvoo baptism compilation names the younger James as son of the deceased James, citing the 1841 original Book A, page 178, as well as the Ancestral File. The original handwriting is not yet inspected; the compilation\'s 1733 birth date, Nova Scotia marriage and Gideon Webb/Edith Bates grandparents cannot be independently assigned to this person. An older James associated with Chatham/East Haddam (about 1733–1817) and one associated with Saybrook (about 1754–1823) remain distinct candidates. Do not merge them.';
  father.hold={kind:'document',label:'Identify which older James Webb was the father: test independent dates, 1773 Chester marriage, Chatham 1814 deed and the restricted 1841 Book A p.178 original; no speculative merge.'};
  const factNote={
    title:'1841 Nauvoo baptism reference — father named James',
    paragraphs:[
      'The published 2002 annotated record names James Webb, born in 1777, as proxy for a deceased James Webb in 1841, and explicitly calls the younger man the deceased person’s son. It cites Nauvoo Book A, page 178. This provides strong support for a father named James, although the 1841 manuscript has not been available for direct inspection.',
      'The father’s individual identity remains contested. An older James associated with Chatham or East Haddam, circa 1733–1817, and another associated with Saybrook or Chester, circa 1754–1823, are not yet correlated to the son. The same 2002 source includes a 1755 Nova Scotia marriage, whereas a surviving Saybrook/Chester church transcript records a James Webb–Elizabeth Douglas marriage in 1773. Neither marriage can safely be assigned to this father without additional independent proof.',
      'The family-tree connection is therefore displayed as strongly supported at the level of the father’s NAME. No dates, birthplace, mother identity, or Gideon Webb–Edith Bates grandparent relationship are promoted by this finding.'
    ],
    links:[
      {label:'2002 annotated baptism volume, p. 3743',url:bookUrl},
      {label:'1841 original Book A catalog — access restricted',url:catalogUrl}
    ]
  };
  for(const n of [jr,father]){
    if(!Array.isArray(n.historicalNotes))n.historicalNotes=[];
    if(!n.historicalNotes.some(x=>x.title===factNote.title))n.historicalNotes.push({...factNote,paragraphs:[...factNote.paragraphs],links:[...factNote.links]});
  }
  const edge=DATA.edges.find(e=>e.a==='james_webb_jr'&&e.b==='james_webb_sr');
  if(edge)edge.confidence='strong'; // existing strong edge stays strong; no merge/new identity
  const notice=document.getElementById('proofNotice');
  if(notice)notice.textContent='Light is evidence: James Webb Jr. → father named James Webb is strongly supported by a 2002 scholarly baptism compilation. The father’s identity (Chatham c1733 vs Saybrook c1754), Elizabeth Douglas, and earlier ancestry remain the research frontier; the 1841 original is access-restricted.';
  if(typeof BRANCH_TOURS!=='undefined'&&BRANCH_TOURS.webb){
    const steps=BRANCH_TOURS.webb.steps||[];
    const younger=steps.find(x=>x.id==='james_webb_jr');
    if(younger)younger.copy='James Webb Jr., born in 1777, is explicitly called the son of a deceased James Webb in a 2002 annotated transcription of an 1841 Nauvoo baptism. The father’s name is strongly supported. His exact identity among older Connecticut men named James Webb remains unresolved.';
    const elder=steps.find(x=>x.id==='james_webb_sr');
    if(elder)elder.copy='A scholarly transcription preserves an 1841 father–son attribution: the elder man was named James Webb. Here the evidence grows uncertain about WHICH man he was. The 1733 Chatham/East Haddam and 1754 Saybrook candidates cannot safely be merged or assigned ancestors.';
  }
  const frontier=globalThis.RESEARCH_FRONTIERS?.frontiers?.find(x=>x.branchId==='webb');
  if(frontier){
    frontier.title='The identity of James Webb, father of James Jr.';
    frontier.brokenProofLink='James Webb (father-name established) → disputed older James identity and Gideon/Edith ancestry';
    frontier.summary='A 2002 scholarly annotation explicitly identifies James Webb Jr. (1777) as the son of a deceased James Webb and cites an 1841 Book A baptism entry. The father\'s NAME is strongly supported; whether he was the 1733–1817 Chatham man, the 1754–1823 Saybrook man, or another namesake is not proved. Elizabeth Douglas and the earlier chain remain provisional.';
    frontier.evidenceFor=[
      'The 2002 Black and Black annotated Nauvoo baptisms, volume 6 p. 3743, explicitly states the 1777 James Webb was son of deceased James Webb; it cites original Book A p. 178 plus Ancestral File.',
      'Book A, 1840–1841, has been precisely located as film 183376 / DGS 5270300; its original image is access-restricted and unexamined.',
      'The 1773 Saybrook/Chester church transcript records the marriage of a James Webb and Elizabeth Douglas, but not their children.',
      'An 1814 Chatham/East Hampton deed documents a James as Anna\'s father and associates sister Abigail, without identifying him as the 1777 James\'s father.'
    ];
    frontier.limitsAndConflicts=[
      'Father-name accepted as strongly supported by a derivative scholarly transcription; the 1841 original entry and its exact recorded kinship wording are unverified.',
      'The compilation mixes Book A data with FamilySearch Ancestral File; claims of a 1733 birth, Nova Scotia geography, 1755 marriage, and Gideon/Edith parentage cannot be attributed confidently to the 1841 manuscript.',
      'The circa 1733–1817 Chatham/East Haddam and circa 1754–1823 Saybrook/Chester candidates remain separate; the 1814 deed does not place its James in this direct line.',
      'The 1773 Connecticut marriage and purported 1755 Nova Scotia marriage may involve different couples or conflated genealogical identities.',
      'The identity and relationship of Elizabeth Douglas as James Jr.\'s mother are still not independently verified.',
      'The proposed Gideon Webb–Edith Bates and deeper New England/English links remain provisional.'
    ];
    if(frontier.candidatePaths?.[0]){
      frontier.candidatePaths[0].warning='Father name James strongly supported; which older James and which Elizabeth Douglas remain unresolved. This is NOT a verified match to either proposed lifespan.';
    }
    frontier.nextProof='Seek a genuinely new independent record distinguishing the competing older James Webb identities and the relevant Elizabeth Douglas; inspect Nauvoo Book A p. 178 if authorized access becomes available. Do not repeat completed Saybrook probate/deed catalog searches.';
    frontier.recordsNeeded=[
      'An independent contemporary kinship record or securely correlated Connecticut/New York household, original page with precise names and dates',
      'Nauvoo Baptism for the Dead, Book A, p. 178, microfilm 183376 / DGS 5270300, only if permitted access is obtained',
      'Distinct Chatham and Saybrook records identifying the respective namesakes without merging',
      'Only after identifying the father: original evidence for Gideon Webb and Edith Bates as his parents'
    ];
  }
  globalThis.__ATLAS_WEBB_FATHER_2002={applied:true,version:'2026-10-27-t80',relationship:'James Webb Jr → father named James Webb',source:'2002 derivative volume 6 printed p3743',original1841Examined:false,olderCandidateMerged:false};
})();
