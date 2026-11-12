/* A062 — source-specific archive discovery, not another copy of original.
 * New, exact PUBLIC COLLECTION LOCATOR: Arizona Memory Project
 * Taylor Arizona Museum Scrapbooks 1991–1992 Volume 14, item 251742.
 * The search-indexed OCR contains the 1991 White Mountain Independent
 * James (Jay) and Marion Webb 50th-anniversary announcement.
 * This is a derivative clipping in an independently held scrapbook, NOT
 * a second independent account of the marriage or a viewed original page.
 * Page viewer returned 403 Forbidden in research browser 12 Nov 2026;
 * scan, image dimensions, clipping completeness and pagination UNVERIFIED.
 * A061: locally previewed article cuts off left edge. Existing FS full PDF
 * remains unverified. No archive download, no email/outreach/payment/bypass.
 */
(() => {
 'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const person=DATA.nodes.find(x=>x.id==='marion_brenay');if(!person)return;
 const catalog='https://azmemory.azlibrary.gov/nodes/view/251742';
 const title='1991 anniversary newspaper — Arizona Memory Project scrapbook catalog locator (NOT FULL IMAGE)';
 const doc=Array.isArray(person.evidence) ? person.evidence.find(x=>x.kind==='document'&&typeof x.full==='string'&&x.full.includes('TH-7714-165878-331848-94')):null;
 if(doc){
   doc.secondRepositoryCatalogUrl=catalog;
   doc.secondRepositoryItemId='251742';
   doc.secondRepositoryTitle='Taylor Arizona Museum Scrapbooks, 1991–1992, Volume 14';
   doc.secondRepositoryInstitution='Taylor/Shumway Heritage Foundation via Arizona Memory Project';
   doc.secondRepositoryRecordClass='compiled scrapbook clipping, likely duplicate of known newspaper announcement; not independent marriage witness';
   doc.secondRepositoryIndexedTextConfirmed=true;
   doc.secondRepositoryPageImageRead=false;
   doc.secondRepositoryFullArticleRead=false;
   doc.secondRepositoryOriginalPdfDownloaded=false;
   doc.secondRepositoryImageAccess='403 Forbidden via research web viewer, not negative evidence and not permission to bypass';
   doc.fullDocumentPreviewDefectStillOpen=true;
 }
 person.historicalNotes=Array.isArray(person.historicalNotes)?person.historicalNotes:[];
 if(!person.historicalNotes.some(n=>n.title===title))person.historicalNotes.push({
  title,
  paragraphs:[
   'A targeted public archive search located a second repository for the May 1991 anniversary announcement: the Arizona Memory Project catalog for Taylor Arizona Museum Scrapbooks, 1991–1992, Volume 14, compiled by Mrs. Ida Allen Webb and preserved through the Taylor/Shumway Heritage Foundation. Search-indexed text includes the announcement for James (Jay) and Marion Webb’s fiftieth wedding anniversary. This corroborates the exact item and points to an additional digitized scrapbook source, but the clipping remains the SAME published announcement, not an independent second witness.',
   'The actual Arizona Memory Project PDF/image page was not retrieved because its page viewer returned an access error. Whether the scrapbook copy includes the missing left margin and full article is UNKNOWN. The existing Atlas JPG of the 50th-anniversary announcement is visibly cropped on its left side. Do not transcribe missing words from search snippets, claim a high-resolution original scan, or present the newspaper article as fully verified until an actual complete page is read.',
   'This is an archive catalog-access advancement only. It does not change the original 1941 marriage evidence, approved biography, recorded narration, Story scenes, family tree or photo files.'
  ],
  links:[{label:'Arizona Memory Project — Taylor Museum Scrapbooks Volume 14 (1991–1992)',url:catalog}]
 });
 person.sourceAudit=Object.assign({},person.sourceAudit||{},{
  a062:'Exact alternate digital repository catalog for May 1991 Jay/Marion fiftieth-anniversary newspaper clipping located; no original page/image downloaded; separate historical copy, not independent marriage witness.',
  secondRepositoryCatalogId:'251742',
  secondRepositoryCatalogPresent:true,
  secondRepositoryItemType:'Digitized PDF scrapbook collection (catalog)',
  secondRepositoryIndexedOCRShowsFamilyAnnouncement:true,
  secondRepositoryOriginalImageInspected:false,
  secondRepositoryPageFullyReadable:false,
  prior50thPreviewLeftCropOpen:true,
  sourceOriginalPDFDownloadCountA062:0,
  newUniqueOriginalsA062:0,
  newUniqueMediaQueueItemsA062:0,
  biographyNarrationStoryChanged:false,
  parentageChanged:false,
  installedIphoneQA:false,
  completePersonPageCertification:false
 });
})();
