/* A056: Thomas Estil Prather and the 1885 Clay County John S. Prather candidate.
 * This is an evidence lead, NOT verified parentage.
 * New source: National Historical Company, History of Clay and Platte Counties
 * Missouri (1885), printed page 411, JOHN S. PRATHER biography.
 * Published text independently discoverable from Google Books and the IA copy;
 * current available web transcriptions are derived from the SAME 1885 book.
 * Do not invent independent witnesses, original page-image inspection, or
 * direct parent-child proof. Preserve all approved biography/audio and graph.
 */
(() => {
  'use strict';
  if(typeof DATA==='undefined' || !Array.isArray(DATA.nodes)) return;
  const thomas=DATA.nodes.find(n=>n.id==='thomas_prather');
  if(!thomas) return;
  const originalBook='https://books.google.com/books?id=9tEyAQAAMAAJ';
  const originalIA='https://commons.wikimedia.org/wiki/File:History_of_Clay_and_Platte_Counties,_Missouri;_(IA_historyofclaypla00nati).pdf';
  const transcript='https://ldsgenealogy.com/MO/books/History-of-Clay-and-Platte-Counties-Missouri-written-and-compiled-from-the-most-authentic-official-and-private-sources-including-a-history-of-their-townships-towns-and-villages-part-43.htm';
  const title='1885 Clay County history — John S. Prather household (CANDIDATE)';
  thomas.evidence=Array.isArray(thomas.evidence)?thomas.evidence:[];
  if(!thomas.evidence.some(x=>x.title===title))thomas.evidence.push({
    kind:'record',title,date:'1885',place:'Clay County, Missouri',
    sourcePage:originalBook,documentUrl:transcript,
    summary:'The 1885 published John S. Prather sketch lists wife Louella Roberts and six children: Clay, Reba, Benjamin, Thomas, John and Roy. It describes John S. merchandising at Moscow, Missouri, from 1879 and relocating to Excelsior Springs in 1881. This overlaps names and locations in Thomas Estil Prather’s family memoir; a child listed merely as “Thomas” has not been independently matched to the man born in 1878. Do not promote John S. and Louella as proven parents.',
    provenance:'National Historical Company, History of Clay and Platte Counties, Missouri (1885), printed p. 411, John S. Prather biography; contemporary published biographical compilation. Google Books and archive book copy attest the volume; the online HTML transcription is OCR/AI-derived and does not constitute an independent primary witness. Exact page scan not inspected/captured A056.',
    confidence:'CANDIDATE household link — contemporaneous published family sketch, no independent direct Thomas Estil-to-parents document',
    sourceLevel:'1885 contemporary compiled biography; modern digital transcription derivative',
    previewStatus:'No book page image packaged in Atlas; source link only',
    a056CandidateNotCertified:true
  });
  thomas.historicalNotes=Array.isArray(thomas.historicalNotes)?thomas.historicalNotes:[];
  if(!thomas.historicalNotes.some(x=>x.title==='THE 1885 PRATHER FAMILY LEAD — NOT YET PROVEN')) {
    thomas.historicalNotes.push({
      title:'THE 1885 PRATHER FAMILY LEAD — NOT YET PROVEN',
      paragraphs:[
        'An 1885 county history devotes a biographical sketch to John S. Prather, a merchant who had worked in Moscow, Missouri, before moving to Excelsior Springs. The published sketch names his wife as Louella Roberts, married in 1872, and lists six children—Clay, Reba, Benjamin, Thomas, John, and Roy. It also identifies John S.’s father as John M. Prather, reportedly a former sheriff of Estill County, Kentucky. These are claims made by the historical sketch, not additional original vital records.',
        'This household is a meaningful candidate for the family of Thomas Estil Prather. Inez’s later memoir says her father was born around Moscow in 1878 and had a brother John who became a physician; his 1898 Missouri military candidate also enlisted at Excelsior Springs. The same common name and towns are not enough to connect Thomas Estil to John S. or Louella. At present, the actual 1880 or 1900 census, Thomas’s birth or marriage record, and an original record identifying a parent have NOT been correlated with the 1885 child named Thomas.',
        'The 1885 book survives in a full digitized copy. Modern transcription sites reproduce that one publication and may misread print; they are not separate corroborating witnesses. The exact original printed page image has not been inspected or packaged in the Atlas. No new parents, grandparents, sibling nodes, or relationship lines have been added.'
      ],
      links:[
        {label:'1885 historical volume (Google Books)',url:originalBook},
        {label:'1885 historical volume (Internet Archive scan on Wikimedia Commons)',url:originalIA},
        {label:'Printed page 411 digital transcription (verify against image)',url:transcript}
      ]
    });
  }
  thomas.sourceAudit=Object.assign({},thomas.sourceAudit||{},{
    a056:'One new contemporaneous published 1885 Clay County candidate household added as UNCERTIFIED source note; no parentage promoted',
    originalPublishedSource:'History of Clay and Platte Counties, Missouri (National Historical Co., 1885), printed p. 411',
    namedCandidateParents:['John S. Prather','Louella Roberts'],
    namedCandidateChildren:['Clay','Reba','Benjamin','Thomas','John','Roy'],
    namedCandidateGrandparent:'John M. Prather — claimed in compiled county biography, not independently verified',
    bookPageOriginalScanInspected:false,
    corroboratingCensusLocated:false,
    thomasEstilSameAs1885ThomasProven:false,
    candidateMilitaryIdentityProven:false,
    newGraphEdges:0,
    originalMediaBytesCaptured:0,
    approvedBiographyAndNarrationUnchanged:true,
    relationPromotionAllowed:false,
    fullyCertified:false,
    iphoneValidated:false,
    nextProof:'1880 or 1900 original Clay County census explicitly places a Thomas of compatible age with John S. and Louella; further independent linkage to Thomas Estil Prather of Lakeside'
  });

  /* A057: distinct 1920 retrospective volume, not another 1885 transcription.
   * Woodson, History of Clay County, Missouri (1920), printed p.371,
   * Charles H. Coppinger biography. Source text inspected, but original
   * facsimile page and 1880 original census NOT inspected. The passage
   * establishes a published claim about Reba, NOT the identity of Thomas.
   */
  const rebaTitle='1920 Clay County history — Reba Prather Coppinger (CORROBORATION ONLY)';
  const rebaOriginal='https://www.loc.gov/item/21015581/';
  const rebaText='https://ldsgenealogy.com/MO/books/History-of-Clay-County-Missouri-part-26.htm';
  if(!thomas.evidence.some(x=>x.title===rebaTitle)) thomas.evidence.push({
    kind:'record', title:rebaTitle, date:'1920', place:'Clay County, Missouri',
    sourcePage:rebaOriginal, documentUrl:rebaText,
    summary:'W. H. Woodson’s 1920 county history identifies Reba J. Prather, wife of Charles H. Coppinger (married 21 April 1891), as a daughter of John S. and Lulu (Roberts) Prather, born at Moscow, Missouri. This supports the Reba/Roberts household named in the 1885 sketch. It does NOT identify the Thomas named in 1885 as Thomas Estil Prather.',
    provenance:'W. H. Woodson, History of Clay County, Missouri (Topeka: Historical Publishing Company, 1920), printed pp. 370–371, Charles H. Coppinger biography. Separate retrospective printed volume; LOC digital book verified, HTML transcription from book secondary and unproofread. Original p.371 facsimile not inspected or captured A057.',
    confidence:'CORROBORATION of reported Reba parentage ONLY; no independent Thomas Estil parentage record',
    sourceLevel:'1920 retrospective county biography — independent publication from 1885, not contemporary vital/census original',
    previewStatus:'1920 original book page image not packaged; no new image bytes',
    a057RebaNotThomas:true
  });
  if(!thomas.historicalNotes.some(x=>x.title==='THE 1920 REBA CORROBORATION — THOMAS LINK STILL OPEN')) {
    thomas.historicalNotes.push({
      title:'THE 1920 REBA CORROBORATION — THOMAS LINK STILL OPEN',
      paragraphs:[
        'A later Clay County history published in 1920 tells the life of attorney Charles H. Coppinger. It identifies his wife Reba J. Prather, born at Moscow and married in 1891, as a daughter of John S. and Lulu (Roberts) Prather. This is a second published account for the Reba/John S./Roberts connection, distinct from the 1885 volume, but it does not make the 1885 list of children into six individually proven vital-record identities.',
        'The two books call Reba’s mother Louella (1885) and Lulu (1920). These may be forms of the same name, but we have not independently verified her original name. Most importantly, neither book states that our Thomas Estil Prather is the Thomas in the 1885 list. A separate named census or vital record is required before adding any parent-child relationship to the Atlas.',
        'An internal discrepancy in this very same 1920 volume is still unresolved: the John Claude Coppinger biography (about p. 358) calls John S. and Luella (Roberts) Prather both natives of Kentucky, while the Charles H. Coppinger biography (pp. 370–371) identifies the former as native to Kentucky and the latter as native to Clay County, Missouri. These statements are currently known only from two unverified digital transcriptions of the same printed volume, NOT two independent records. Do not silently pick Louella’s birthplace, or use this editorial conflict to infer Thomas Estil’s parentage.',
        'A second Coppinger biography in this same 1920 volume (John Claude Coppinger, printed about p. 358) reports that John S. Prather died in 1914, his wife Luella died in 1894, and both were buried at Crown Hill Cemetery in Excelsior Springs. This is a concrete lead to search the free Missouri State Archives 1914 original death-certificate database for the father of the 1885 candidate household. The 1920 history remains a retrospective published account; no person-specific civil death image, certificate number, or link to Thomas Estil has yet been viewed.',
        'The 1920 printed text has been located and checked through a secondary digital transcription; its original facsimile page and a matching original census image remain to be captured. No portrait, graph relation, approved life biography, narration, or Story scene was changed.'
      ],
      links:[
        {label:'1920 Clay County history — Library of Congress original volume',url:rebaOriginal},
        {label:'1920 biography paragraph transcription (verify against page image)',url:rebaText}
      ]
    });
  }
  thomas.sourceAudit.a057='Separate 1920 Woodson publication explicitly names Reba Prather Coppinger as daughter of John S. and Lulu Roberts; does not identify Thomas Estil.';
  thomas.sourceAudit.a057_1885_1920_same_underlying_record=false;
  thomas.sourceAudit.a057_original_1920_page_image_inspected=false;
  thomas.sourceAudit.a057_original_1880_census_inspected=false;
  thomas.sourceAudit.a057_thomas_parentage_proven=false;
  thomas.sourceAudit.a057_new_media_bytes=0;
  thomas.sourceAudit.a057_narration_story_biography_unchanged=true;
  // A071: two contradictory Louella/Lulu birthplace claims INSIDE one 1920 book.
  thomas.sourceAudit.a074_candidateJohnSDeath={
    candidatePerson:'John S. Prather of the 1885 Moscow/Excelsior Springs household; NOT proven father of Thomas Estil',
    retrospectiveClaimSource:'W. H. Woodson, History of Clay County, Missouri (1920), John Claude Coppinger biography around printed p.358',
    candidateDied:'1914 according to the 1920 family biography, NOT civil-certified',
    candidateWife:'Luella/Louella Roberts — reported death 1894 in same passage, NOT civil-certified',
    burial:'Crown Hill Cemetery, Excelsior Springs — 1920 historical claim, no gravestone original inspected',
    originalRecordRoute:'https://s1.sos.mo.gov/records/Archives/ArchivesMvc/DeathCertificates/',
    officialCoverage:'Missouri State Archives online searchable 1910–1975 death-certificate images; free to search',
    originalDeathRecordInspected:false,
    certificateNumberLocated:false,
    identityToInezFatherProven:false,
    firstMayorClaim:'same 1920 compiled biography, unverified original council/minutes',
    noParentNodeOrGraphPromotion:true,
    originalMediaBytesCaptured:0,
    parentage:'UNPROVEN'
  };
  thomas.sourceAudit.a071_1920_internal_conflict={
    source:'W. H. Woodson, History of Clay County, Missouri (1920), two Coppinger biographies, printed around pp.358 and 370–371',
    reading_basis:'two searchable transcriptions; neither facsimile inspected',
    passage1:'Reba parent sketch: John S. and Luella (Roberts) Prather both called natives of Kentucky',
    passage2:'Charles Coppinger sketch: John S. Kentucky, wife Lulu (Roberts) native Clay County Missouri',
    independence:'one 1920 volume, not two independent sources',
    birthplace_status:'CONFLICTED — do not promote',
    ThomasEstilParentage:'UNPROVEN; no graph, family, or vital-record changes',
    imagesObtained:0,
    iphoneChecked:false
  };
})();
