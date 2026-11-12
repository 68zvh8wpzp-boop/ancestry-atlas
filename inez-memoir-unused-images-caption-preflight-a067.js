/* A067 — Inez Karen Prather Webb memoir-image no-repeat audit.
 * Original authoritative caption source recovered, no filename guessing:
 * "My Life Story Chapter 1 - 13 final.doc", 118 pages,
 * author Inez Karen Prather Webb, page 2 and page 115.
 * Page 2: "Grace Mildred Hill (Age 23) 1932, ExCelsior Springs, MO"
 *    existing assets/inez-life-story/image2.jpeg, ALREADY in
 *    grace-mobile-memoir.js -> grace_hill photo gallery.
 * Page 2: "Thomas Estil Prather, (Approx. 66) 1944, Lakeside, AZ"
 *    existing assets/inez-life-story/image1.jpeg, ALREADY in
 *    thomas-mobile-memoir.js -> thomas_prather photo gallery.
 * Page 115: "Passport Picture, May, 2023 / 77 years young"
 *    existing assets/inez-life-story/image44.jpeg, NOT on current
 *    Inez page, previously removed from Grace page.
 * All 3 image bytes stored in GitHub at known paths before A067.
 * Reuse ONLY image44 as Inez's personal photograph; it is a passport
 * photo printed INSIDE memoir, not an official government identity record.
 * No false image discovery or download claim, parent photo duplication,
 * rights assumption, narrator/Story/family-tree change or email use.
 */
(() => {
 'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const inez=DATA.nodes.find(n=>n.id==='inez_karen');
 if(!inez)return;
 const photoPath='assets/inez-life-story/image44.jpeg';
 const title='Inez Karen Prather — May 2023 portrait (memoir caption)';
 inez.evidence=Array.isArray(inez.evidence)?inez.evidence:[];
 if(!inez.evidence.some(e=>e.full===photoPath))inez.evidence.push({
   kind:'photo',
   title,
   date:'May 2023',
   place:'Location not stated in source',
   thumb:photoPath,
   full:photoPath,
   summary:'Portrait of Inez Karen Prather from the concluding chapter of her own illustrated memoir. The source caption reads “Passport Picture, May, 2023 / 77 years young.” This is an embedded photograph, not an official passport scan or independently issued identity certificate.',
   provenance:'Original family memoir “My Life Story Chapter 1 - 13 final.doc,” by Inez Karen Prather Webb, page 115 of 118, author-captioned beside the embedded portrait: “Passport Picture, May, 2023 / 77 years young.” Original family-document page visually inspected on 12 November 2026. Previously preserved image extract assets/inez-life-story/image44.jpeg reused unchanged; personal memoir caption supports identity, month, and age; neither photographer, original camera negative, photo date beyond caption, nor redistribution license independently documented.',
   transcription:'Full original adjacent caption: “Passport Picture, May, 2023” / “77 years young.”\nTranslation: Not applicable (English).',
   sourceClass:'Original family autobiography image and adjacent author-caption, not government passport record',
   imageProvenance:'Embedded photo extracted from author memoir; low-resolution original supplied in existing archive',
   individualIdentificationBasis:'Author herself and original adjacent caption; no facial recognition',
   archivalImageAlreadyPresent:true,
   archivedOriginalRepoPath:photoPath,
   cameraNegativeOrHighResMasterVerified:false,
   officialPassportOriginalInspected:false,
   presentImageRightsIndependentlyVerified:false,
   iPhoneFullScreenVerified:false,
   a067RecoveredFromUnreferencedExistingImage:true
 });
 inez.historicalNotes=Array.isArray(inez.historicalNotes)?inez.historicalNotes:[];
 const noteTitle='THREE UNREFERENCED MEMOIR PHOTOGRAPHS — IDENTITIES RECOVERED WITHOUT DUPLICATION';
 if(!inez.historicalNotes.some(x=>x.title===noteTitle))inez.historicalNotes.push({
   title:noteTitle,
   paragraphs:[
     'The Atlas repository contained 42 image files in the original “Inez life story” archive folder, while her 39-image author-memoir gallery module referenced only 39. The three unreferenced files were image1.jpeg, image2.jpeg and image44.jpeg. The original 118-page illustrated memoir was re-opened and both identifying photo pages were visually inspected, establishing the identities from the author’s captions rather than appearance alone.',
     'The page 2 caption identifies image2.jpeg as Inez’s mother Grace Mildred Hill, age 23 in Excelsior Springs, Missouri (1932), and image1.jpeg as her father Thomas Estil Prather, approximately age 66, Lakeside, Arizona (1944). The two originals had ALREADY been linked to Grace’s and Thomas’s respective Atlas person-page galleries. They are not missing, and do not need duplicate files or extra Inez-only photo cards.',
     'At page 115, the memoir labels the previously preserved image44.jpeg “Passport Picture, May, 2023 / 77 years young.” It is a self-captioned family portrait of Inez, not a reproduction of the government passport or a new biographical birth record. The one previously unused, locally stored portrait is now linked to Inez’s source gallery. The approved memoir narrative, other gallery items, Story and audio remain unchanged.'
   ],
   links:[]
 });
 inez.sourceAudit=Object.assign({},inez.sourceAudit||{},{
   a067:'42 preserved original memoir-folder image paths checked vs 39 memoir photo cards: 3 unused. Original 118-page manuscript captions show image1 Thomas (already on his page), image2 Grace (already on hers), image44 Inez author-captioned May 2023 (new Inez source photo card referencing existing exact asset).',
   originalSourceManuscript:'My Life Story Chapter 1 - 13 final.doc',
   originalSourcePageCount:118,
   visuallyCheckedCaptionPages:[2,115],
   folderFiles:42,
   memoirModulePhotoCards:39,
   previouslyUnreferencedPaths:['image1.jpeg','image2.jpeg','image44.jpeg'],
   parentAlreadyHasOriginalImage1:true,
   parentAlreadyHasOriginalImage2:true,
   addedExistingOriginalImage44ToInez:true,
   photo44OriginalCaption:'Passport Picture, May, 2023; 77 years young',
   all118MemoirPagesSourceImageAudited:false,
   2023PhotoGovernmentPassportRecord:false,
   previousMemoirImagesInAtlas:39,
   priorA054HistoricPhotoReuses:4,
   priorA065SchoolPhotoExternallyLinked:1,
   newA067PreviouslyUnusedPortraitCard:1,
   projectedPhotosAfterA067:45,
   projectedDocumentsAfterA067:1,
   newImagesDownloaded:0,
   newAssetBytes:0,
   existingParentPortraitAssetsModified:false,
   biographyAndNarrationFrozen:true,
   userIphoneReviewOfThisDraft:false,
   galleryFullyCertified:false
 });
})();
