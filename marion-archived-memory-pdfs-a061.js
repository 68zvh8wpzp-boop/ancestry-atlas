/* A061 — 12 November 2026. Marion Beulah Brenay Webb document preflight.
 * Full FamilySearch-uploaded scan copies were recovered from EXISTING
 * private Library files. No network download / source-byte acquisition:
 *   Home: james-sheldon-home.pdf 3 pages, photographed family home
 *   Neat as a Pin: james-sheldon-neat-as-a-pin.pdf 2 pages
 *   Letters from Grandma Brenay: Grandma-Brenay.pdf 4 handwritten pages.
 *      marian-brenay-handwritten-letters-original.pdf is a duplicate page
 *      image set (all 4 page pixel hashes and embedded image hashes match).
 *   8th-grade graduation: 5 original memory pages previously visually read
 *      28 Sep 2026; 3 distinct saved Library image extractions, NOT a local
 *      complete 5-page PDF. Keep complete-PDF gate open.
 * Ration Books: six pages previously visually examined Sep 2026; no
 * complete Library PDF verified in A061. Four unresolved full-PDF matches
 * remain (50th, 40th, Young Marion, Ration books), plus Graduation PDF.
 * Never turn a locally archived scanned PDF into a false claim it is
 * packaged into the web app: full still references external FamilySearch.
 * Do not infer who personally authored signed 'Mom' 1985 correspondence
 * without named original evidence; contributor title is not a signature.
 * No family graph, narration, Story, approved biography, media bytes altered.
 */
(() => {
 'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const person=DATA.nodes.find(n=>n.id==='marion_brenay');if(!person)return;
 const evidence=Array.isArray(person.evidence)?person.evidence:[];
 const verified=[
  {id:'TH-7783-165848-634989-78',title:'Home',file:'james-sheldon-home.pdf',pages:3,
    summary:'Complete three-page FamilySearch-uploaded scan already preserved under the James Sheldon Webb Library file. Three home/garden photographs; not a civil proof of home ownership or exact address.'},
  {id:'TH-7783-165848-601180-82',title:'Neat as a Pin',file:'james-sheldon-neat-as-a-pin.pdf',pages:2,
    summary:'Complete two-page FamilySearch-uploaded scan already preserved under the James Sheldon Webb Library file. Both original upload pages reviewed; photograph page 1 is much smaller than page 2.'},
  {id:'TH-7797-159647-37599-10',title:'Letters from Grandma Brenay',file:'Grandma-Brenay.pdf',pages:4,
    summary:'Complete four-page handwriting scan already preserved in private Library. A second Library file marian-brenay-handwritten-letters-original.pdf differs in PDF wrapper bytes but its four rendered page images and extracted embedded-image hashes match exactly; DO NOT count as a second original. First correspondence is dated 17 January 1985; another letter follows with date/year not independently certified. Written signature is Mom; treat “Grandma Brenay” as contributor title and do not assign Marion as handwritten author.'}
 ];
 let seen=0;
 for(const v of verified){
   const d=evidence.find(x=>x.kind==='document'&&typeof x.full==='string'&&x.full.includes(v.id));
   if(!d)continue;
   d.archivalOriginalCopyStatus='COMPLETE EXISTING PRIVATE LIBRARY PDF — NOT GITHUB PACKAGE';
   d.originalUploadPdfPreservedInPrivateLibrary=true;
   d.privatePreservedScanFilename=v.file;
   d.existingPdfPageCount=v.pages;
   d.fullPdfPackagedInGitHub=false;
   d.externalPdfLinkStillRequiresIphoneOpenTest=true;
   d.originalContentReviewA061=v.summary;
   d.additionalDownloadRequired=false;
   d.a061PreservationReconciled=true;
   seen++;
 }
 const graduate=evidence.find(x=>x.kind==='document'&&typeof x.full==='string'&&x.full.includes('TH-7783-165848-15052-5'));
 if(graduate){
   graduate.archivalOriginalCopyStatus='FIVE MEMORY PAGES VIEWED 2026-09-28; THREE DISTINCT LIBRARY IMAGE PAGES SAVED; COMPLETE FIVE-PAGE PDF NOT VERIFIED';
   graduate.originalFivePagesVisuallyReviewedBeforeA061=true;
   graduate.uniquePagesSavedAsLibraryImages=3;
   graduate.originalCompleteFivePagePdfLocalPackageVerified=false;
   graduate.a061PreservationReconciled=true;
 }
 const ration=evidence.find(x=>x.kind==='document'&&typeof x.full==='string'&&x.full.includes('TH-7714-165878-61870-37'));
 if(ration){
   ration.originalSixMemoryPagesVisuallyReviewedBeforeA061=true;
   ration.originalCompleteSixPagePdfLocalPackageVerified=false;
   ration.a061PreservationReconciled=true;
 }
 const anniversary50=evidence.find(x=>x.kind==='document'&&typeof x.full==='string'&&x.full.includes('TH-7714-165878-331848-94'));
 if(anniversary50){
   anniversary50.thumbnailVisualQA20261112='IMAGE DECODES BUT LEFT SIDE OF NEWS CLIPPING IS CROPPED, WORDS CUT OFF; not full original view';
   anniversary50.previewFullDocumentReadable=false;
   anniversary50.previewCropDefect='LEFT-EDGE CROP — requires complete article PDF or uncropped source page before archival display certified';
   anniversary50.a061ThumbnailInspected=true;
 }
 for(const x of evidence){
   if(x.kind==='document'&&typeof x.full==='string'&&x.full.includes('sg30p0.familysearch.org/service/records/storage/dascloud/patron/v2/')){
     x.thumbnailPixelVisualQACompletedA061=true; // Eight local GitHub JPG previews visually rendered at source resolution.
     x.thumbnailPixelVisualQAIsNotInstalledIphoneApproval=true;
   }
 }
 person.historicalNotes=Array.isArray(person.historicalNotes)?person.historicalNotes:[];
 const title='FAMILY MEMORY DOCUMENTS — RECOVERED COMPLETE COPIES AND OPEN FULL-PAGE GATES (A061)';
 if(!person.historicalNotes.some(x=>x.title===title))person.historicalNotes.push({
  title,
  paragraphs:[
   'An original-file crosscheck recovered three complete FamilySearch-uploaded document scans already kept in the private ancestry Library: Home (three pages), Neat as a Pin (two pages), and Letters from Grandma Brenay (four handwritten pages). Their locally stored PDF files were examined page by page. The two saved Grandma Brenay PDFs are copies of the same four scanned page images, not two independent collections. None of these copies required a new download.',
   'The first Grandma Brenay letter is dated 17 January 1985 and is signed “Mom.” This is family correspondence labeled by the contributor, not a self-signed full legal name identifying Marion Beulah Brenay Webb as author. The earlier family research associates Grandma Brenay with Marion’s mother Marian Beulah Skinner Brenay; do not misattribute these words to Marion without source corroboration.',
   'The 50th-anniversary newspaper-preview JPG is cut off on the left, truncating printed words, so it cannot substitute for a full newspaper clipping. All eight local JPG previews were opened and inspected in this source review, but iPhone display remains unverified. Five pages of Marion’s 1938 eighth-grade graduation memory were visually read during the prior September audit, and three distinct pages were preserved as images. The full five-page PDF has not been verified as locally preserved. Six pages of family wartime ration books were also reviewed earlier, but a complete local PDF has not been verified. The 50th anniversary, 40th anniversary, and Young Marion documents likewise still require full-original preservation checks. All eight gallery full-view URLs currently remain external FamilySearch PDF links, so installed iPhone opening and complete Atlas local packaging are NOT certified.'
  ],
  links:[{label:'FamilySearch — Marion Beulah Brenay Webb memories',url:'https://www.familysearch.org/en/tree/person/memories/KWZD-XXW'}]
 });
 person.sourceAudit=Object.assign({},person.sourceAudit||{},{
  a061:'Whole-Library preflight verified 3 existing complete uploaded PDF copies (9 unique pages) for 3 of 8 remote original links; graduation five-page viewer read, 3 selected local page images, complete PDF open; duplicate four-page handwritten PDFs identified; no downloads.',
  exactExistingCompleteMemoryPdfMatches:seen,
  completeUniqueImagePagesFromThosePdfs:9,
  grandmotherLettersDuplicatePdfWrappers:2,
  grandmotherLettersDuplicateUnderlyingPages:4,
  originalMemoryPdfAllEightLocallyPackaged:false,
  originalCompletePDFsVerifiedNotInWebsite:true,
  originalGraduationFivePagesPreviouslyRead:true,
  savedGraduationDistinctPageImages:3,
  rationBookSixPagesPreviouslyRead:true,
  remainingCompletePdfOriginalsNotLocallyVerified:5,
  sourcePreviewImagesVisuallyDecodedA061:8,
  newspaper50thPreviewLeftCropDiscovered:true,
  sourcePreviewIphoneImagesCertified:false,
  sourcesStillExternalOnIphone:true,
  userPhoneQA:false,
  newOriginalBytesDownloaded:0,
  originalLibraryPdfFilesModified:0,
  approvedBiographyChanged:false,
  narrationStoryChanged:false,
  graphMutations:0,
  fullyCertified:false
 });
})();
