/* A064 – Jonathan Henry Webb direct ancestor: institutional local history media.
 * Public institutional sources newly identified 12 Nov:
 * 1) Navajo County Library District local-history image "Webb Sawmill Crew"
 *    1940s, photo id 414; catalog says 9 named workers incl. sons Karl,
 *    Junius, June, Jay, Reece, and Ray, others Tom Frost/Waldo Ray/Fred
 *    McNeil. Actual web-rendered original image was INSPECTED, filename
 *    webb-sawmill-crew.jpg; original high resolution, photographic reverse
 *    and reproduction rights not established. Container original download
 *    failed; NO asset file bytes preserved or added in GitHub.
 * 2) 2010 oral history June and Cherie Webb (June Jonathan's son),
 *    Arizona Memory Project item 162667 (26m54s), catalog/abstract only,
 *    audio not listened because source page 403 and copyright in force.
 * 3) White Mountain Independent June22 1978 local newspaper reunion
 *    snippet includes Jonathan, Della, children, 1908 marriage, but viewer
 *    403; original article NOT read, do not count as newly proven original.
 * 4) School Children in Lakeside 1954–55 local-history photo ID341 names
 *    'Inez Prather', seated 3rd from left; candidate Inez Karen Prather;
 *    do NOT cross-edit her person or assert identity without correlation.
 * Older source: printed Morten Peder Mortensen Families memoir p185 names
 * Jonathan/Della's older son Henry Ray b1911, spouse Inza Holladay.
 * This supports prior Oct 1999 'Jay' obituary's Henry Ray/Inza finding
 * as likely a sibling name, NOT fresh obituary-original verification.
 *
 * Do not duplicate historical photos from 7 existing Story scenes; public
 * Library sources are separate from AI-created/contextual illustration.
 * No new binary assets, narration, Story scenes, approved biography, graph,
 * FamilySearch tree, external communication or deployment.
 */
(() => {
 'use strict';
 if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const n=DATA.nodes.find(p=>p.id==='jonathan_henry'); if(!n)return;
 const title='1940s Webb Sawmill Crew — Navajo County Library District photograph';
 const sourcePage='https://www.navajocountyhistory.org/albumlist/white-mountains-region/';
 const directPhoto='https://www.navajocountyhistory.org/wp-content/uploads/webb-sawmill-crew.jpg';
 n.evidence=Array.isArray(n.evidence)?n.evidence:[];
 if(!n.evidence.some(e=>e.title===title))n.evidence.push({
   kind:'record', title,date:'1940s',place:'Lakeside, Navajo County, Arizona',
   sourcePage,documentUrl:directPhoto,
   summary:'The local-history institution captions a photographed Webb sawmill crew, naming Jay Webb, Karl Webb, June Webb, Junius Webb, Reece Webb, Waldo Ray, Ray Webb (kneeling), Tom Frost and Fred McNeil. This is a historical photograph of a family timber crew, not a photograph independently identifying Jonathan Henry Webb himself as one of the people pictured.',
   provenance:'Navajo County Library District, White Mountains Region local-history collection, section “Webb Sawmill Crew,” site photo ID 414, public photo filename webb-sawmill-crew.jpg. Image displayed in institutional source page; names follow institution caption, not independent facial or original-negative proof. Full-resolution master, back inscription, licensing and physical original not examined; no Atlas image bytes packaged in A064.',
   sourceClass:'institutional historic photograph with later named-caption attribution',
   originalAssetStatus:'institutional web photograph visually inspected; local archival download failed; no full-resolution master or in-Atlas gallery image claimed',
   photoOfJonathanHimselfProven:false,
   a064NewHistoricalSource:true
 });
 n.historicalNotes=Array.isArray(n.historicalNotes)?n.historicalNotes:[];
 const noteTitle='WEBB SAWMILL PHOTOGRAPH AND FAMILY ORAL HISTORY — SOURCE BOUNDARIES';
 if(!n.historicalNotes.some(x=>x.title===noteTitle))n.historicalNotes.push({
   title:noteTitle,
   paragraphs:[
     'The Navajo County Library District preserves a photograph of the Webb sawmill crew from the 1940s. Its caption names Jay, Karl, Junius, June and Reece Webb alongside Waldo Ray, Ray Webb, Tom Frost and Fred McNeil. The photograph documents the family’s work in the timber industry around Lakeside more directly than generic illustrations of logging; however the library caption does not name Jonathan Henry Webb as one of the photographed workers. The identified people are attributed to the institutional caption, not independently proven through faces or original negative inscriptions.',
     'The Arizona Memory Project also catalogs a 2010 oral-history interview with Jonathan and Della’s son Velmer June Webb and his wife Cherie. The institution’s abstract places June’s childhood in the family sawmill world and describes the family’s return from Mexico to northeastern Arizona. The interview audio has not been listened to and no verbatim quotations can yet be credited to June or Cherie. The collection is marked in copyright; the item and its underlying audio must not be republished as if freely licensed.',
     'A June 1978 newspaper article indexed through the Arizona Memory Project recounts a gathering of Jonathan Henry Webb descendants and references his marriage to Della Ray and their ten children. The full newspaper scan was not accessible in this source pass; these are catalog-extracted leads, not independently inspected original-page facts. The 1908 Morelos marriage original remains unlocated, and must not be replaced by the separate 1913 Utah temple record.',
     'The 1954–1955 Lakeside schoolchildren photograph in the same county collection is captioned with an “Inez Prather” among seated pupils. That is a candidate historical record for Inez Karen Prather, handled in the separate Inez original-photo queue rather than merged into Jonathan’s personal portrait gallery. No identity promotion was made.'
   ],
   links:[
     {label:'Navajo County Library — Webb Sawmill Crew and 1954 school photo',url:sourcePage},
     {label:'Arizona Memory Project — Webb Family Oral History, June and Cherie, 2010',url:'https://azmemory.azlibrary.gov/nodes/view/162667'},
     {label:'Arizona Memory Project — White Mountain Independent, 22 June 1978',url:'https://azmemory.azlibrary.gov/nodes/view/292861'}
   ]
 });
 n.sourceAudit=Object.assign({},n.sourceAudit||{},{
   a064:'New institutional catalog sources: 1940s Webb sawmill crew historic photo visually viewed (caption names family workforce), 2010 June/Cherie oral-history metadata, 1978 local reunion newspaper indexed page, separate Inez candidate 1954–55 school group photo. No source binaries acquired.',
   sawmillPhotoOriginalRepository:'Navajo County Library District — White Mountains Region photo 414',
   sawmillPhotoWebUrl:directPhoto,
   sawmillPhotoViewedInWeb:true,
   sawmillPhotoOriginalMasterDownloaded:false,
   sawmillPhotoCopyrightPermissionVerified:false,
   sawmillPhotoCaptionProvidesJayFamilyNames:true,
   sawmillPhotoPersonallyDepictsJonathanVerified:false,
   oralHistory2010SourceUrl:'https://azmemory.azlibrary.gov/nodes/view/162667',
   oralHistory2010Interviewees:'Velmer June Webb and Cherie Webb; Arizona Memory Project source abstract',
   oralHistoryAudioListened:false,
   oralHistoryCatalogRead:true,
   newspaper1978IndexedSourceUrl:'https://azmemory.azlibrary.gov/nodes/view/292861',
   newspaper1978OriginalPageOpened:false,
   schoolPhotoInezCandidateReferredToSeparateQueue:true,
   original1908MorelosMarriageProven:false,
   ancestorBiographyChanged:false,
   narrationStoryChanged:false,
   graphParentsChanged:false,
   newImageBytesDownloaded:0,
   newAudioBytesDownloaded:0,
   userIphoneReviewOfThisDraft:false,
   fullyCertified:false
 });
})();
