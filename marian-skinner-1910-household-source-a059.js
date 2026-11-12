/* A059: existing 1910 original census previously CAPTURED in private Library (13 Oct).
 * This source was mislabeled as unlocated in A041..A058 outstanding queues.
 * Original unchanged file: skinner-household-1910-beaver-original.jpg
 * Exact original: FS 33S7-9RJ6-PDK, United States Census 1910,
 * Michigan/Newaygo/Beaver ED 102, sheet 7A, household 126, lines 13-20.
 * Only a source-link card is added; no JPG binary has been newly packaged.
 * Preserve approved 1095-word Marian biography and all audio/Story/graph.
 */
(() => {
  'use strict';
  if(typeof DATA==='undefined'||!Array.isArray(DATA.nodes)) return;
  const marian=DATA.nodes.find(n=>n.id==='marian_skinner');
  if(!marian) return;
  const title='1910 Beaver Township census — Richard, Jessie and Marian [Marrion] Skinner (ORIGINAL REVIEWED)';
  const page='https://www.familysearch.org/ark:/61903/3:1:33S7-9RJ6-PDK';
  marian.evidence=Array.isArray(marian.evidence)?marian.evidence:[];
  if(!marian.evidence.some(e=>e.title===title)) marian.evidence.push({
    kind:'record', title, date:'1910', place:'Beaver Township, Newaygo County, Michigan',
    sourceLevel:'original 1910 federal census schedule — exact manuscript image reviewed and privately archived',
    sourcePage:page, documentUrl:page,
    summary:'Original census ED 102, sheet 7A, household 126, lines 13–20. Head Richard, 48, wife Jessie, 30, and daughter Marrion, 7, live with Marcie, Clifford, Ellen, John and Carl McConnell (listed as step-brother). Jessie reports four children born and four living. Index surname is Skemis; original handwriting correlates strongly with Skinner. This is original household evidence of Marian as Richard’s daughter and of Jessie as the wife and apparent mother of four younger children; no 1903 birth-register certificate is claimed.',
    provenance:'Thirteenth Census of the United States (1910), Michigan, Newaygo County, Beaver Township, ED 102, sheet 7A, dwelling/family 126, lines 13–20; digitized FamilySearch original image 33S7-9RJ6-PDK, image 13 of 14. Unchanged master already preserved as skinner-household-1910-beaver-original.jpg in private Ancestry Library before A059. First-hand original reviewed 13 Oct and again 12 Nov 2026. Indexed as Skemis, person indexes MLRF-WS4 (Richard), MLRF-WSH (Jessie), MLRF-WS8 (Marrion). Original not newly acquired and NO image file uploaded to Atlas in A059.',
    transcription:'SCOPED ORIGINAL: line 13 Richard, head, male 48, married 10 years, Michigan born; line 14 Jessie, wife, female 30, married 10 years, four children born / four living, Michigan born, father Sweden and mother New York; line 15 Marcie, son 16; line 16 Clifford, son 9; line 17 Marrion [handwriting], daughter 7; line 18 Ellen, daughter 6; line 19 John, son 2; line 20 Carl McConnell [reading], step-brother 17. This is a household excerpt only, not a complete all-columns/all-sheet transcription. Original name field is indexed “Skemis”; some handwriting/birthplace corrections are uncertain. TRANSLATION: Not applicable (English original).',
    previewStatus:'ORIGINAL ALREADY SAVED IN PRIVATE LIBRARY; NO ATLAS JPG PREVIEW PACKAGED — source link only',
    evidenceConfidence:'Strong original household correlation, not a direct 1903 birth registration',
    a059AlreadyCaptured:true, a059OriginalImagePackagedInAtlas:false,
    duplicateSourceDownload:false
  });
  marian.historicalNotes=Array.isArray(marian.historicalNotes)?marian.historicalNotes:[];
  const noteTitle='ORIGINAL 1910 HOUSEHOLD RECOVERED — BIRTH REGISTER STILL OPEN';
  if(!marian.historicalNotes.some(n=>n.title===noteTitle)) marian.historicalNotes.push({
    title:noteTitle,
    paragraphs:[
      'The original 1910 census for Beaver Township, Newaygo County, Michigan, was already located, downloaded and transcribed in October 2026. Its later audit queue entry incorrectly treated the 1910 source as missing. The household is on sheet 7A, enumeration district 102, dwelling and family 126, lines 13–20. The online index reads the surname as “Skemis.” In the handwritten original, Richard is the head, Jessie is his wife and seven-year-old “Marrion” is explicitly a daughter. Marcie, Clifford, Ellen and John are also enumerated. The household’s ages and birthplaces match the independently documented Skinner family.',
      'Jessie reports four children born, four living. The four younger children present are Clifford, Marrion, Ellen and John; older Marcie came from Richard’s earlier marriage. This creates a strong original census-based link to the Richard/Jessie household, without inventing a new birth certificate or treating every indexed spelling and reported age as certain. A separate June 1910 infant death certificate, also archived previously, names Richard and Jessie as parents but does not mention Marian.',
      'The 1903 Michigan birth register remains unexamined. The 1996 obituary and funeral program support Colfax, Michigan and 3 March 1903 retrospectively; they do not identify Richard and Jessie as parents. The 1903 register is expected to be an annual birth entry rather than a 1906-style filed certificate. A free Library of Michigan birth-index inquiry was sent with user authorization in October; do not access email to check for a reply. No FamilySearch tree edits, graph reclassification or biography changes have been made.'
    ],
    links:[
      {label:'Original 1910 census page — FamilySearch (may require free sign-in)',url:page},
      {label:'Library of Michigan 1867–1915 birth-index holdings',url:'https://www.michigan.gov/libraryofmichigan/public/family-history/family-history-resources/vital-records-research-at-the-library-of-michigan'}
    ]
  });
  marian.sourceAudit=Object.assign({},marian.sourceAudit||{},{
    a059:'Existing 1910 Beaver Township original census rediscovered in private archival records; 1910 original proof frontier closed, Atlas link-only evidence card staged; 1903 birth original still unexamined.',
    original1910FoundBeforeCurrentTranche:true,
    original1910FirstExamined:'2026-10-13',
    original1910Reconciled:'2026-11-12',
    original1910Ark:'33S7-9RJ6-PDK',
    original1910ImageLibraryName:'skinner-household-1910-beaver-original.jpg',
    original1910Family:'Beaver/Newaygo ED102, sheet7A, lines13–20, dwelling126/family126',
    indexedSurname:'Skemis',
    originalNameOfChild:'Marrion (handwriting reading); 7y daughter',
    parentageEvidenceLevel:'Strongly supported 1910 original household / indexed name-correlation; NO 1903 original birth return',
    birthRegister1903OriginalRead:false,
    atlasOriginal1910JpgPackaged:false,
    newOriginalImageBytes:0,
    downloadsDuplicated:0,
    parentEdgesMutated:0,
    biographyNarrationStoryMutated:false,
    iphoneCurrentRevisionVerified:false,
    fullyCertified:false
  });
})();
