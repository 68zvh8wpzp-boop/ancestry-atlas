/* A066 Jay Webb independent named sawmill crew photo + existing caption calibration.
 * Source photo: Navajo County Library District photo #414 "Webb Sawmill Crew",
 * 1940s nine named workers; caption includes James Wilford (Jay) Webb.
 * Inspected institutional web image from source photo on 12 Nov 2026.
 * Compared against PREEXISTING Atlas file assets/jay/jay-vernon-sawmill-1.jpg
 * (larger seated and standing group, distinct people/arrangement/frame),
 * and assets/jay/jay-in-vernon.jpg (a vehicle in wooded terrain, no clearly
 * identifiable individual). No duplicate media is being acquired.
 * Public small web JPG is linked externally, not locally rehosted;
 * original photographer, maximum resolution, reverse, license and
 * iPhone load unknown. Source title and named people from institutional
 * CAPTION, not facial inference.
 * Do not alter Jay's approved life story, narration, Story scenes,
 * audio, graph, FamilySearch profile or original JPEG pixels.
 */
(() => {
 'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const n=DATA.nodes.find(x=>x.id==='james_wilford');if(!n)return;
 const page='https://www.navajocountyhistory.org/albumlist/white-mountains-region/';
 const jpg='https://www.navajocountyhistory.org/wp-content/uploads/webb-sawmill-crew.jpg';
 const photoTitle='Webb Sawmill Crew, 1940s — Jay Webb (county library named photo)';
 n.evidence=Array.isArray(n.evidence)?n.evidence:[];
 if(!n.evidence.some(x=>x.a066NamedCrewPhotoId==='navajo-county-414'||x.title===photoTitle)){
  n.evidence.push({
   kind:'photo',
   title:photoTitle,
   date:'1940s',
   place:'Lakeside area, Navajo County, Arizona',
   thumb:jpg,full:jpg,documentUrl:jpg,sourcePage:page,
   sourceInstitution:'Navajo County Library District — Local History, White Mountains Region',
   institutionalCatalogPhotoId:'414',
   summary:'A historical photograph of the Webb sawmill crew, nine named workers including Jay Webb. The county library identifies, in caption order, Tom Frost, Karl Webb, Waldo Ray, Junius Webb, June Webb, Reece Webb, Fred McNeil, Jay Webb, and Ray Webb (kneeling). It is distinct from the larger, previously preserved FamilySearch Vernon-sawmill group portrait. The original web JPG is externally linked, not stored in this Atlas repository.',
   provenance:'Navajo County Library District, White Mountains Region, “Webb Sawmill Crew,” photo 414 (1940s), institutional JPG file webb-sawmill-crew.jpg. The named identities and period are attributed to the library caption. The displayed source is a small JPG; original negative, photographer, reproduction permission, reverse annotations and higher-resolution image not independently inspected. A066 compared visual subjects/arrangement against preexisting family photo assets/jay/jay-vernon-sawmill-1.jpg (distinct image) and assets/jay/jay-in-vernon.jpg (wooded truck scene). No new original pixels acquired.',
   institutionNamesFromCaption:['Tom Frost','Karl Webb','Waldo Ray','Junius Webb','June Webb','Reece Webb','Fred McNeil','Jay Webb','Ray Webb (kneeling)'],
   identityClaim:'James Wilford Jay Webb named in institutional caption; specific portrait position not independently facially verified',
   sourceCategory:'institutional captioned historical photograph',
   verifiedDistinctFromExistingLargerGroup:true,
   existingComparedImage:'assets/jay/jay-vernon-sawmill-1.jpg',
   externalHotlink:true,
   localOriginalSaved:false,
   highResolutionPrintVerified:false,
   licensedForRedistributionVerified:false,
   iphoneRendered:false,
   a066NamedCrewPhotoId:'navajo-county-414'
  });
 }
 const woods=n.evidence.find(x=>x.title==='Jay in Vernon'&&x.full==='assets/jay/jay-in-vernon.jpg');
 if(woods){
   if(!woods.a066PriorSummary)woods.a066PriorSummary=woods.summary||'';
   woods.summary='FamilySearch-tagged Vernon-area photograph of a vehicle on a wooded road; no individual person is clearly identifiable in the image. It can support setting and family-memory context, but does not independently depict or identify Jay or Jonathan Henry Webb.';
   woods.photoShowsClearlyIdentifiableJay=false;
   woods.sourceFaceIdentityNotVerified=true;
   woods.provenanceContextNote='Retain FamilySearch person tags/contributor metadata as an attribution, not direct visual proof that Jay or Jonathan is visible in the wooded-road image.';
   woods.a066CaptionSourceCalibrated=true;
 }
 const larger=n.evidence.find(x=>x.title==='Vernon sawmill — Jay Webb'&&x.full==='assets/jay/jay-vernon-sawmill-1.jpg');
 if(larger){
   larger.a066ComparedDistinctInstitutionalSawmillPhotoId='Navajo County Library District photo 414';
   larger.a066DistinctFromInstitutionalNineWorkerPhoto=true;
   larger.a066NoDuplicateImageRetained=true;
 }
 n.historicalNotes=Array.isArray(n.historicalNotes)?n.historicalNotes:[];
 const noteTitle='TWO DIFFERENT SAWMILL-CREW PHOTOGRAPHS — COUNTY-LIBRARY IMAGE OF JAY (A066)';
 if(!n.historicalNotes.some(x=>x.title===noteTitle))n.historicalNotes.push({
  title:noteTitle,
  paragraphs:[
   'Two genuine historical photographs preserve different views of the Webb family logging world. The original FamilySearch photograph already in Jay’s album, called “Vernon sawmill — Jay Webb,” contains a larger group of workers standing and seated against a wooden wall. The Navajo County Library District separately preserves a smaller nine-worker group photograph labeled “Webb Sawmill Crew,” from the 1940s, explicitly naming Jay Webb among the workers. Both pictures were visually checked and are different compositions. The original institution caption provides the names, not an independently verified face-by-face identification.',
   'The county library lists Tom Frost, Karl Webb, Waldo Ray, Junius Webb, June Webb, Reece Webb, Fred McNeil, Jay Webb and kneeling Ray Webb. Its description connects the J. H. Webb family and John L. Fish family to sawmilling around Lakeside. This is strong local historical context for the Webb family’s livelihood, but it is not a civil record establishing Jay’s employment contract, exact day, or military service.',
   'Another existing album entry titled “Jay in Vernon” is a wooded-road vehicle scene, not a clear photograph of Jay himself. The source card now distinguishes its FamilySearch contributor attribution from visual identification. The county photo is linked externally from its institutional JPG; it is not locally archived at full resolution and its reproduction rights are unverified. No approved person biography, Story image scene, audio or tree relationship is changed.'
  ],
  links:[
   {label:'Navajo County Library District — Webb Sawmill Crew photo 414',url:page},
   {label:'Navajo County Library District — direct public JPG',url:jpg}
  ]
 });
 n.sourceAudit=Object.assign({},n.sourceAudit||{},{
   a066:'County 1940s Webb sawmill crew image #414 visually compared to existing Jay group picture; distinct and named Jay, linked as external-source photo. Existing forest-road image caption corrected: no independently identifiable Jay portrait.',
   countyCrewPhotoInstitution:'Navajo County Library District — White Mountains Region',
   countyCrewPhotoId:414,
   countyCrewPhotoExternalURL:jpg,
   countyCrewPhotoIsDifferentFromExistingVernonGroup:true,
   originalVernonFamilyGroupPreserved:true,
   oldJayInVernonImageHasRecognizablePerson:false,
   newCountyImageOriginalLocallyArchived:false,
   copyrightPermissionConfirmed:false,
   sourceImageIphoneVerified:false,
   newOriginalImageFileBytes:0,
   duplicateImagesAdded:0,
   personGallerySourceCardStaged:true,
   approvedBioPreserved:true,
   narrationAndStoryFrozen:true,
   familyGraphUnchanged:true,
   fullPersonPageCertified:false
 });
})();
