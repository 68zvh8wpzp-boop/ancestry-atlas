/* A056 — Jessie Irene Aurin: source-class boundaries, original image access.
 * Her 1879 birth register + 1880 census ORIGINALS were inspected on 11 Oct and
 * preserved at the user's private Library. They are not in public Atlas assets.
 * Citation-only cards MUST NOT masquerade as locally packaged images.
 * John Auene vs Jonas Aurin vs Karl Johan Aurén is NOT fully proven.
 * Narration, Story and family graph are frozen until the person roster audit.
 */
(() => {
 'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const jessie=DATA.nodes.find(n=>n.id==='jessie_irene_aurin');
 if(!jessie||!Array.isArray(jessie.evidence))return;
 let sourceOnly=0;
 for(const item of jessie.evidence){
  if(item.kind==='document' && !item.full){
   item.kind='citation';
   item.previewStatus='External original/source link; no original image packaged for iPhone gallery';
   item.sourceAuditNote='Original record may have been inspected and archived privately, but no public/local gallery image bytes exist here. Do not call this an uploaded source scan.';
   sourceOnly++;
  }
  if(/photographed grave marker/i.test(item.title||'')){
   item.kind='photo';
   item.sourceLevel='photograph of memorial marker (derivative inscription, not civil birth or death record)';
   item.summary=(item.summary||'')+' The marker inscription gives 1897; an actual 1879 Michigan birth return and 1880 infant census contradict this. The marker MUST NOT replace the established birth year.';
   item.previewStatus='Local archived marker photo exists; source-specific attribution and iPhone image view still to check';
  }
  if(item.kind==='photo' && /Jessie Aurin Skinner — portrait/i.test(item.title||'')){
   item.sourceLevel='family-attributed photographic crop; date unconfirmed, not the original negative';
  }
  if(item.kind==='photo' && !item.sourceLevel){
   item.sourceLevel='family-attributed historical photograph; original negative and caption unverified';
  }
 }
 jessie.historicalNotes=Array.isArray(jessie.historicalNotes)?jessie.historicalNotes:[];
 if(!jessie.historicalNotes.some(n=>n.title==='THE TWO ORIGINALS THAT DEFINE JESSIE’S PARENTAGE FRONTIER')){
  jessie.historicalNotes.push({
   title:'THE TWO ORIGINALS THAT DEFINE JESSIE’S PARENTAGE FRONTIER',
   paragraphs:[
    'The original Oceana County, Michigan, 1879 birth return lists Jessie Auene (surname spelling uncertain) born on 25 October 1879 in Crystal Township, daughter of the Swedish-born farmer John Auene and Amelia Auene, who was born in New York. The original page 276, entry 16 was visually inspected on 11 October 2026 and preserved in the family’s private research Library. No full original scan of this register is currently packaged on this public-facing Atlas person page; its visible link leads to the index.',
    'The 19 June 1880 federal census of neighboring Elbridge Township lists an infant Jessie, aged seven months, born in October, with a Swedish-born father written Jonas Aurin, 36, and mother Amelia L. Aurin, 26. Birth month, mother’s name and birthplace, geographical proximity and Swedish father form a strong family correlation, but the handwritten given names John versus Jonas remain different. These two records do NOT establish that the Swedish immigrant Karl Johan Aurén in a separately proposed tree is this specific father. No unsupported father-to-grandparent edge was added.',
    'Jessie’s 1956 Alpena obituary and issue-date image are locally archived. The photographed Spratt Cemetery marker displays an 1897 birth year; that conflicts with the 1879 original birth return, contemporaneous 1880 infant census and adult records. The marker is evidence of the inscription, not primary evidence of the birth event. The genuine 1899 Jessie/Richard marriage image and unaltered originals for several other source-only citations remain outside the Atlas web gallery.'
   ],
   links:[
    {label:'1879 Jessie Auene Michigan birth index / original-return locator',url:'https://www.familysearch.org/ark:/61903/1:1:F451-1XH'},
    {label:'1880 Elbridge Township original census, page 16',url:'https://www.familysearch.org/ark:/61903/3:1:33SQ-GYBF-S9GN?view=index'},
    {label:'1899 Jessie Aurin/Richard Skinner marriage index',url:'https://www.familysearch.org/ark:/61903/1:1:N3FS-5ZD'}
   ]
  });
 }
 const galleryPhotos=jessie.evidence.filter(e=>e.kind==='photo'),documents=jessie.evidence.filter(e=>e.kind==='document'),citations=jessie.evidence.filter(e=>e.kind==='citation');
 jessie.sourceAudit=Object.assign({},jessie.sourceAudit||{},{
  a056:'Preserved original 1879 and 1880 record links and existing gallery images in user-approved Jessie person-page biography; restored three-category source access classification, no media reacquired',
  original1879:'Oceana Michigan births 1879 p276 no16; manuscript visually examined 11 Oct; user supplied page screenshot stored privately; image not packaged in GitHub Atlas',
  original1880:'Elbridge Oceana ED216 19 June 1880 p16 lines42-46; full original image + PDF in private Library; image not packaged in Github Atlas',
  johnJonasFatherIdentity:'STRONGLY CORRELATED household link, original John Auene vs Jonas Aurin first-name discrepancy still unresolved; Karl Johan Aurén equivalence UNPROVEN',
  headstoneBirthYear:'1897 marker inscription is contradicted by original 1879 birth return + 1880 infant census; record inscription, not substitute birth date',
  currentDraftPhotoSlots:galleryPhotos.length,
  currentDraftLocallyStoredDocumentSlots:documents.length,
  currentDraftSourceOnlyCitationSlots:citations.length,
  currentDraftSourceOnlyConverted:sourceOnly,
  locallyStoredOriginalBirthImage:false,
  locallyStoredOriginal1880Image:false,
  originalLibraryCaptureAlreadyExists:true,
  newOriginalMediaBytes:0,
  previouslyApprovedMuseumBiographyUnchanged:true,
  originalParentageHoldRetained:!!jessie.hold,
  fatherGrandparentProofPromoted:false,
  audioStoryAndGraphUnchanged:true,
  iphoneValidated:false,
  fullyCertified:false,
  nextSourceGates:[
   'Never reacquire the already-preserved 1879 birth and 1880 census images; when authorized, inspect original files for future verified Atlas import',
   'Independent original Swedish identity for John/Jonas Auene/Aurin, and separate Karl Johan Aurén claim',
   'Verify exact original 1899 marriage image and preserve mother’s maiden name without collapsing to another Amelia',
   'Full individual FamilySearch Source/Memory captions and rights; date and image decoder QA on iPhone'
  ]
 });
})();