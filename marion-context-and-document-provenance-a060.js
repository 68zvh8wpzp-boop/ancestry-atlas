/* A060 Marion Beulah Brenay Webb source provenance audit — 12 November 2026.
 * Target: actual runtime album (marion-atlas-update-2026-09-29.js loaded by
 * atlas-content.js document.write compatibility loader).
 * Bounded exact media evidence review, NOT fresh FS memory enumeration.
 * Four images are contextual; three are attributed to Russell Lee/LOC
 * FSA/OWI 1935–44, not photos of a Brenay family event in 1925.
 * Eight existing document cards use LOCAL JPG thumbnail but remote
 * FamilySearch per-memory full PDF URLs. No local complete PDFs confirmed
 * in this module; original external links are not locally packaged binaries.
 * NO approved biography/narration/Story/family graph/photo bytes changed.
 */
(() => {
  'use strict';
  if (typeof DATA==='undefined'||!Array.isArray(DATA.nodes)) return;
  const n=DATA.nodes.find(p=>p.id==='marion_brenay');
  if(!n)return;
  const contexts=[
    ['Marion’s birthplace context','biographies/marion/assets/marion_birth_house_candidate_conservative.jpg',
     'Contextual historic-house image. The house has not been independently identified as Marion’s actual 1923 Saginaw birthplace or residence; it cannot be used as address/building proof.'],
    ['Westward in 1925','biographies/marion/assets/marion_1925_journey_candidate.jpg',
     'Illustrative documentary photograph credited to the Russell Lee/FSA-OWI milieu (1935–44). NOT a photo of the Brenays’ 1925 truck migration, people or route. Exact LOC negative/item ID and capture date still require source-level verification.'],
    ['Childhood across the Southwest','biographies/marion/assets/marion_arizona_childhood_candidate.jpg',
     'Later-era contextual documentary photo of children, not identified as Marion, Brenay family members or her own Arizona childhood. Russell Lee/FSA-OWI collection attribution requires exact item-ID verification.'],
    ['Work and school','biographies/marion/assets/marion_school_independence_candidate.jpg',
     'Later-era documentary photo of bus boarding, not identified as Marion or her actual school, classmates or school transport. Russell Lee/FSA-OWI attribution and date require exact LOC-item verification.']
  ];
  n.evidence=Array.isArray(n.evidence)?n.evidence:[];
  let revised=0;
  for(const [title,path,caution] of contexts){
    const x=n.evidence.find(e=>e.title===title && (e.full===path||e.thumb===path));
    if(!x)continue;
    x.mediaAuditType='historic-context-illustration-not-personal-evidence';
    x.provenanceBoundary=caution;
    x.photoOfMarionOrHerFamilyVerified=false;
    x.exactHistoricPhotoCatalogIdentityVerified=false;
    x.originalCaptureDateProven=false;
    // Explicit visible gallery caption, not merely hidden audit metadata.
    x.summary='HISTORICAL CONTEXT ONLY — '+caution;
    x.confidence='Contextual illustration; no identified Marion/Brenay persons or personal event';
    if(title==='Work and school'){
      x.exactHistoricPhotoCatalogIdentityVerified=true;
      x.verifiedRepositoryItem='https://www.loc.gov/item/2017743309/';
      x.verifiedNegative='LC-DIG-fsa-8a29603';
      x.verifiedDate='September 1940';
      x.verifiedCaption='Schoolchildren of Concho, Arizona boarding the bus to go to the high school at St. Johns';
    } else if(title==='Childhood across the Southwest') {
      x.unverifiedCatalogIdFromStoryModule='LC-DIG-fsa-8a30947';
    }
    x.sourceAuditA060=true;
    revised++;
  }
  const fullPdf=n.evidence.filter(e=>e.kind==='document' &&
    typeof e.full==='string' &&
    e.full.includes('sg30p0.familysearch.org/service/records/storage/dascloud/patron/v2/') &&
    /\.pdf\?/.test(e.full) &&
    typeof e.thumb==='string' &&
    e.thumb.startsWith('assets/marion-docs-preview/'));
  for(const x of fullPdf){
    x.mediaAuditType='local-preview-external-pdf-original-not-packaged-in-this-module';
    x.previewLocallyStored=true;
    x.completePdfGitHubPackaged=false;
    x.completePdfLibraryStatus='not reconciled for this exact per-memory PDF';
    x.externalPdfRequiresDeviceCheck=true;
    x.originalDocumentPixelsIndependentlyReviewedA060=false;
    x.sourceAuditA060=true;
  }
  n.historicalNotes=Array.isArray(n.historicalNotes)?n.historicalNotes:[];
  const title='PHOTOGRAPHIC CONTEXT AND DOCUMENT-PREVIEW PROVENANCE — A060';
  if(!n.historicalNotes.some(h=>h.title===title))n.historicalNotes.push({
    title,
    paragraphs:[
      'This page deliberately combines original-era Webb/Brenay family photographs with historical context pictures. The image titled “Westward in 1925” is from a later documentary photography collection associated with Russell Lee and the Farm Security Administration/Office of War Information (1935–1944), not a photograph of Charles, Marian or their children on the 1925 trip. The image of children does not identify Marion or her family. The bus image is independently identified by the Library of Congress as Russell Lee’s September 1940 photograph of children in Concho, Arizona, boarding a bus to high school in St. Johns (LC-DIG-fsa-8a29603); it does not identify Marion or her classmates. The contextual house picture is not proved to be her actual Saginaw birthplace or home. Their original files remain unchanged; these are visual illustrations, not identity or personal-event evidence.',
      'Eight FamilySearch Memory-document entries currently have working local JPG preview paths in the Atlas repository. Their full-view PDF field instead points to FamilySearch’s external service; those URLs have not been shown to work in the installed iPhone client, and these eight PDFs have not been shown to be bundled as complete local Atlas documents. Local previews cannot certify every page of a multipage PDF. Original document item-ID, full-page capture, and installed-phone open/download checks remain separately open.',
      'The 1942 Sandpoint family portrait is different: a preexisting captioned Webb/Brenay-era photograph already preserved in the Charles Albert album. The user is awaiting Marion Beulah Brenay’s 1923 Michigan birth certificate in the separate citizenship-proof work; no new certificate has been inspected in this audit. The approved biography, parents and children, personal family photographs, and audio/narration have not been rewritten.'
    ],
    links:[
      {label:'Library of Congress — 1940 Concho–St. Johns school bus photo',url:'https://www.loc.gov/item/2017743309/'},
      {label:'Library of Congress — FSA/OWI black-and-white negatives (1935–1944)',url:'https://www.loc.gov/pictures/collection/fsa/'},
      {label:'Marion FamilySearch memories (source listing)',url:'https://www.familysearch.org/en/tree/person/memories/KWZD-XXW'}
    ]
  });
  n.sourceAudit=Object.assign({},n.sourceAudit||{},{
    a060:'Provenance audit of runtime-loaded Marion media: 4 contextual images (NOT Marion event portraits), eight locally previewed PDF hotlinks (complete pages/device gate open).',
    runtimeSource:'marion-atlas-update-2026-09-29.js nested via atlas-content.js',
    contextTargets:contexts.length,
    matchingContextEntries:revised,
    contextCapturedImagesIndependentlyVisuallyReviewed:4,
    contextExactLocIdentifiersVerified:1,
    contextualImagesNowMarkedNotProof:true,
    matchingRemotePdfWithLocalJpgPreview:fullPdf.length,
    remotePdfCurrentAccessTestedOnIphone:false,
    completePerMemoryPdfLocalPackaged:false,
    original1923BirthCertificateSeen:false,
    originalNewImagesDownloaded:0,
    mediaFilesChanged:0,
    parentEdgesChanged:0,
    approvedBiographyChanged:false,
    narrationStoryChanged:false,
    personPageFullyCertified:false
  });
})();
