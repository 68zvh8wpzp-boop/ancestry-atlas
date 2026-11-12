/* A065: Inez Karen Prather, family-identified school photo and exact cross-year class-roster proof.
 * Navajo County Library District White Mountains local-history photo #341:
 * "School Children in Lakeside", school year 1954–55, third/fourth grades.
 * Institution identifies "Inez Prather" as 3rd SEATED from LEFT.
 * Direct descendant explicitly confirmed THIS is Inez Karen Prather,
 * 12 Nov 2026; record source of identification as FAMILY, not inference
 * from facial recognition or hypothetical identity. Independent cohort
 * correlation: six names in library caption also are printed in the
 * actual already-packaged 1963 Lakeside HS senior composite,
 * assets/inez-life-story/image6.jpeg, which was visually inspected.
 * Names: Grace Jackson, Beverly Penrod, Tommy/Tom Rhoton, Ricky Johnson,
 * Lanny Johnson, David Gillespie. This supports source continuity,
 * not independent biometric identification.
 *
 * External web JPG is only small publicly displayed derivative.
 * No higher-resolution master, reverse, rights license, scan pixels
 * or locally stored JPG newly acquired. Staged EXTERNAL-GALLERY hotlink,
 * strict rights/high-res/iPhone gate; do not assert locally archived.
 * Leave approved memoir, 43 preserved photographs, 1 family document,
 * frozen narration, Story and parent edges untouched. No spending,
 * email, outreach or source-tree edits.
 */
(() => {
 'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const n=DATA.nodes.find(p=>p.id==='inez_karen');
 if(!n)return;
 const original='https://www.navajocountyhistory.org/wp-content/uploads/school-children-in-lakeside.jpg';
 const page='https://www.navajocountyhistory.org/albumlist/white-mountains-region/';
 const title='Inez Prather with Lakeside schoolchildren — 1954–1955 (family identified)';
 n.evidence=Array.isArray(n.evidence)?n.evidence:[];
 if(!n.evidence.some(e=>e.a065SchoolImageId==='navajo-county-341'||e.title===title))n.evidence.push({
   kind:'photo',
   title,
   date:'1954–1955 school year',
   place:'Lakeside, Navajo County, Arizona',
   thumb:original,
   full:original,
   documentUrl:original,
   sourcePage:page,
   sourceClass:'Local-history institutional photograph with attributed student names; individual identity additionally family-confirmed',
   sourceInstitution:'Navajo County Library District — Local History, White Mountains Region',
   sourcePhotoId:'341',
   personPosition:'Seated pupils, third from viewer’s left; library-caption order: Dosea Webb, Iden Webb, Inez Prather, Bertha Clarkson',
   summary:'Inez Karen Prather is the third seated child from the left in the 1954–1955 Lakeside third/fourth-grade group. The public library caption identifies her as Inez Prather; family confirmation on 12 November 2026 establishes the intended person identity. The same school cohort reappears in her actual 1963 Lakeside High School senior composite, with six other matching names. The full image is externally linked rather than stored in the Atlas.',
   provenance:'Navajo County Library District, White Mountains Region local-history gallery, “School Children in Lakeside,” photo #341, 1954–1955, JPG web file school-children-in-lakeside.jpg. Library caption names Inez Prather seated third from left. User, a direct family member, confirmed “Of course it’s her” on 12 November 2026. Cross-check against the separate actual 1963 Lakeside High School seniors composite already preserved in Atlas at assets/inez-life-story/image6.jpeg: Grace Jackson, Beverly Penrod, Tom Rhoton, Ricky Johnson, Lanny Johnson, David Gillespie present in both captions. Attribution follows text captions/family testimony; not automated facial identification. Master physical print, photographer, rights and higher resolution not yet verified.',
   evidenceConfidence:'Strong family identification corroborated by two named school captions, rather than an independent birth/vital record',
   originalImagePixelSource:'small institutional public JPG; highest-resolution master not acquired',
   localOriginalArchivalAsset:false,
   externalImageHotlink:true,
   originalPrintOrNegativeVerified:false,
   rightsForRedistributionVerified:false,
   installedIphonePhotoLoaded:false,
   schoolYearbookRosterMatches1963:['Grace Jackson','Beverly Penrod','Tom Rhoton (Tommy 1954)','Ricky Johnson','Lanny Johnson','David Gillespie'],
   sourceIdentificationBasis:['Navajo County Library District’s attributed caption','Direct family-member confirmation 2026-11-12','1963 Lakeside HS senior names independently present on preserved original composite'],
   a065SchoolImageId:'navajo-county-341'
 });
 n.historicalNotes=Array.isArray(n.historicalNotes)?n.historicalNotes:[];
 const noteTitle='LAKESIDE SCHOOL CLASS, 1954–1955 — INEZ IDENTIFIED BY FAMILY AND SCHOOL CAPTIONS';
 if(!n.historicalNotes.some(x=>x.title===noteTitle))n.historicalNotes.push({
   title:noteTitle,
   paragraphs:[
     'A school photograph preserved by the Navajo County Library District shows third- and fourth-grade pupils outside the Lakeside school in 1954–1955. Its caption identifies Inez Prather as the third seated pupil from the left, after Dosea Webb and Iden Webb and before Bertha Clarkson. A direct descendant has personally confirmed this is Inez Karen Prather. The photograph therefore belongs in Inez’s childhood evidence, with its original public-institution caption and family identification both recorded.',
     'The identification has unusually useful context. A second family image already preserved in this Atlas is the 1963 Lakeside High School seniors composite. The 1954–1955 and 1963 captions share six classmates: Grace Jackson, Beverly Penrod, Tommy/Tom Rhoton, Ricky Johnson, Lanny Johnson and David Gillespie. The continuity is consistent with a small school cohort over nine years. The shared names independently reinforce the school, place and generation, but the persons pictured are named from captions, not independently verified facially.',
     'The school photograph is linked to the Navajo County Library District’s publicly displayed JPEG and has not been locally archived as an unchanged high-resolution source. Reproduction permission, reverse-side annotation and actual iPhone opening remain unverified. The 1963 composite is already preserved and is not downloaded again. The memoir and audio remain unchanged, as do family relationships.'
   ],
   links:[
     {label:'Navajo County Library District — 1954–1955 Lakeside school class',url:page},
     {label:'Navajo County Library District — source JPG image',url:original}
   ]
 });
 const parent=DATA.nodes.find(p=>p.id==='jonathan_henry');
 if(parent&&Array.isArray(parent.historicalNotes)){
   const h=parent.historicalNotes.find(x=>x.title==='WEBB SAWMILL PHOTOGRAPH AND FAMILY ORAL HISTORY — SOURCE BOUNDARIES');
   const old='That is a candidate historical record for Inez Karen Prather, handled in the separate Inez original-photo queue rather than merged into Jonathan’s personal portrait gallery. No identity promotion was made.';
   if(h&&Array.isArray(h.paragraphs)){
     h.paragraphs=h.paragraphs.map(p=>p.includes(old)?p.replace(old,
       'The library-captioned Inez Prather has now been identified as Inez Karen Prather by a direct family member, with corroborating shared student names in her 1963 Lakeside seniors composite. The image belongs on Inez’s page, not in Jonathan’s portrait gallery; it is not proof Jonathan himself was photographed.'):p);
   }
   parent.sourceAudit=Object.assign({},parent.sourceAudit||{},{a065SchoolIdentityUpdatedAfterUserConfirmation:true});
 }
 n.sourceAudit=Object.assign({},n.sourceAudit||{},{
   a065:'1954–55 Navajo County Library photo #341 identity upgraded from candidate to family-confirmed Inez Karen Prather; six 1963 senior class names cross-correlate; source JPG hotlink staged; no local binary, rights or iPhone QA claimed.',
   schoolPhotoExactInstitutionId:'341',
   institutionalSchoolCaptionPerson:'Inez Prather, third seated from left',
   familyIdentificationConfirmed:true,
   familyIdentificationConfirmedDate:'2026-11-12',
   corroborating1963SeniorOriginalRepoPath:'assets/inez-life-story/image6.jpeg',
   sharedClassmateNameCount:6,
   originalSchoolPhotoBytesArchivedLocally:false,
   originalSchoolPhotoHighResolutionAcquired:false,
   schoolPhotoExternalDirectJpgUrl:original,
   schoolPhotoRedistributionPermissionConfirmed:false,
   schoolPhotoIphoneRenderedVerified:false,
   newOriginalFilesDownloaded:0,
   newOriginalMediaBytes:0,
   personGallerySourceCardStaged:true,
   approvedBiographyChanged:false,
   narrationAndStoryFrozen:true,
   parentGraphUnchanged:true,
   otherInezGalleryAssetsUnchanged:true,
   entirePersonPageFullyCertified:false
 });
})();
