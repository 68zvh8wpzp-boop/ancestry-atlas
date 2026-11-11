/* A055: Thomas Estil Prather and the 1885 Clay County John S. Prather candidate.
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
    provenance:'National Historical Company, History of Clay and Platte Counties, Missouri (1885), printed p. 411, John S. Prather biography; contemporary published biographical compilation. Google Books and archive book copy attest the volume; the online HTML transcription is OCR/AI-derived and does not constitute an independent primary witness. Exact page scan not inspected/captured A055.',
    confidence:'CANDIDATE household link — contemporaneous published family sketch, no independent direct Thomas Estil-to-parents document',
    sourceLevel:'1885 contemporary compiled biography; modern digital transcription derivative',
    previewStatus:'No book page image packaged in Atlas; source link only',
    a055CandidateNotCertified:true
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
    a055:'One new contemporaneous published 1885 Clay County candidate household added as UNCERTIFIED source note; no parentage promoted',
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
})();