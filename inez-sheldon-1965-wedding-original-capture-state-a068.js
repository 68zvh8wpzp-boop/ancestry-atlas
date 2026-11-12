/* A068: source-level private original capture from family author's 118p manuscript.
 * This overlay deliberately adds NO photo gallery card because the 1965 JPG
 * bytes have not yet been packaged in the GitHub Atlas. Never create a blank
 * photo/document tile, fabricate a public Library URL, or use the 1965 Mesa
 * sealing portrait as a substitute for the 21 Jan Lakeside ceremony image.
 *
 * Original manuscript: My Life Story Chapter 1 - 13 final.doc
 * pp25-27: family eyewitness says 21 Jan 1965 Lakeside chapel ceremony
 * and photographer Joe Gardner accidentally discarded most images.
 * p26 includes the unique cake-cutting photo with caption
 * "Our Wedding Day – January 21, 1965 / Lakeside, AZ".
 * Exact original photo image7.jpeg (973x1106, 461092 bytes) extracted
 * unchanged; Git blob SHA 2cac77861f907fad79117a14ad8321abc438ac48,
 * SHA256 9a1983b362d6a2f302eefca44973c59205f870e910cdf1992a13438cd2dd0465.
 * Stored in PRIVATE Library 12 Nov; not in GitHub tree (1141 entries
 * searched, exact SHA absent); no other existing family wedding image
 * visually identical. May be an original period scan, not proof of a
 * civil recorded marriage or government license.
 *
 * Additional private family source-image preservation is tracked only in\n * the protected Library research ledger and is omitted from app source.\n *\n * No approved biography, narration, Story, graph or rendered HTML changes
 * beyond sourceAudit metadata for 1965 wedding image capture-state.
 */
(() => {
 'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const sha='9a1983b362d6a2f302eefca44973c59205f870e910cdf1992a13438cd2dd0465';
 for(const personId of ['inez_karen','james_sheldon']){
   const p=DATA.nodes.find(n=>n.id===personId);
   if(!p)continue;
   p.sourceAudit=Object.assign({},p.sourceAudit||{},{
     a068:'Original author-captioned 21 Jan 1965 Lakeside wedding-cake photograph extracted from family memoir pp25–27; exact image bytes preserved privately in Ancestry Library, distinct from existing Mesa sealing photo and group-reception portrait. Original image not packaged into GitHub gallery — do not display broken source card.',
     weddingActualCeremonyDate:'1965-01-21',
     weddingActualCeremonyLocation:'Lakeside, Arizona',
     weddingPhotoAuthorOriginal:'My Life Story Chapter 1 - 13 final.doc, printed page 26',
     weddingPhotoPhotographerFamilyAccount:'Joe Gardner, local photographer; Inez author testimony pp25–27',
     weddingPhotoOriginalFilename:'image7.jpeg',
     weddingPhotoOriginalSHA256:sha,
     weddingPhotoOriginalPixels:'973x1106',
     weddingPhotoExactBytesPreviouslyInGitHub:false,
     weddingPhotoOriginalPrivateLibrarySaved:true,
     weddingPhotoOriginalPrivateLibraryFileName:'ORIGINAL-INEZ-SHELDON-WEDDING-1965-01-21-MEMOIR-image7.jpeg',
     weddingPhotoPublicAtlasMediaPackaged:false,
     weddingPhotoGalleryCardAdded:false,
     separate15Jan1965IndexStillIndexNotCivilOriginal:true,
     separate12Jun1965MesaSealingStillDistinct:true,
     originalImagePageVisuallyInspected:true,
     manuscriptEntire118PageAuditCertified:false,
     actualIphoneGalleryVerified:false,
     noOriginalMediaDownloadedFromInternet:true,
     parentGraphUnchanged:true,
     biographyNarrationStoryFrozen:true,
     personPageFullyCertified:false
   });
 }
})();
