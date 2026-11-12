/* A063 James Wilford 'Jay' Webb — source caption and negative-source safeguards.
 * A063 first reviewed the two-page 1946 memory original already in private
 * Library (james-sheldon-jay-webb-1946.pdf), and verified existing Atlas
 * repository assets/jay/jay-webb-1946.pdf + preview; DO NOT REACQUIRE.
 * 27 Sep evidence-sync mistakenly says "brother Sheldon" in its Sheldon
 * page evidence provenance. The Sheldon named by FamilySearch person tags
 * is Jay's SON James Sheldon Webb, b. 1943, not his brother.
 * Page1 photograph Jay with small child standing on logging truck;
 * page2 log-loaded trucks and unidentified figures (do not infer that
 * visible people/setting independently prove cousin Darcine).
 * Same ORIGINAL two-page photo memory can be cited on both Jay & Sheldon's
 * pages but counts as ONE source. Does NOT prove military service or
 * his exact Army unit; 1946 logging photograph is civilian context.
 * Earlier 1 Oct FS source review (not independently reopened 12 Nov):
 * "Jay" 1999 obituary row actually indexes Henry Ray Webb and Imza,
 * likely wrong attachment. Do not use as Jay's proof or detach tree.
 * 1950/1955 church-census rows appear twice; do not count duplicates as
 * independent witnesses before original/citation ID comparison.
 * No approved biography/narration/Story/photo bytes/parent edges changed.
 */
(() => {
 'use strict';
 if (typeof DATA==='undefined'||!Array.isArray(DATA.nodes))return;
 const jay=DATA.nodes.find(n=>n.id==='james_wilford');
 const sheldon=DATA.nodes.find(n=>n.id==='james_sheldon');
 if(!jay)return;
 const JAY_TITLE='Jay Webb — 1946';
 const findDoc=(n,path)=>Array.isArray(n?.evidence)?n.evidence.find(e=>e.title===JAY_TITLE && e.full===path):null;
 const jayDoc=findDoc(jay,'assets/jay/jay-webb-1946.pdf');
 if(jayDoc){
   jayDoc.sourceAuditA063=true;
   jayDoc.existingCompletePdfInAtlas=true;
   jayDoc.existingOriginalPdfPageCount=2;
   jayDoc.existingFullOriginalVerifiedRepoPath='assets/jay/jay-webb-1946.pdf';
   jayDoc.existingPreviewImagePath='assets/jay/jay-webb-1946-preview.jpg';
   jayDoc.reusedPrivateLibraryFilename='james-sheldon-jay-webb-1946.pdf';
   jayDoc.newOriginalDownloadNeeded=false;
   jayDoc.personInImageIdentities='Jay and small child in page1; FamilySearch memory tags James Sheldon Webb (son) and James Wilford Webb (father). Page2 shows log-loaded trucks; persons not independently identified by the photo.';
   jayDoc.sourceProofScope='Family photo evidence of April 1946 timber/logging life, NOT proof of Army unit, 1946 service chronology, specific cousin identity or vehicle ownership';
   jayDoc.uniqueDocumentCount=1;
 }
 const sheldonDoc=findDoc(sheldon,'assets/sheldon/james-sheldon-jay-webb-1946-preview.jpg');
 if(sheldonDoc){
   const original=sheldonDoc.provenance||'';
   if(original.includes('brother Sheldon')){
     sheldonDoc.a063PreviousIncorrectCaption=original;
     sheldonDoc.provenance=original.replace('with brother Sheldon','with son Sheldon');
   }
   sheldonDoc.a063RelationshipCorrection='Sheldon is Jay’s son, not brother; FamilySearch tagged photo, dated April 1946. No FamilySearch metadata edited.';
   sheldonDoc.a063DistinctOriginalCountIncrement=0;
   sheldonDoc.a063OriginalPDFAlreadyPresentOnJayPage=true;
   sheldonDoc.originalPdfForFullView='assets/jay/jay-webb-1946.pdf';
   sheldonDoc.originalPdfPages=2;
 }
 jay.historicalNotes=Array.isArray(jay.historicalNotes)?jay.historicalNotes:[];
 const title='JAY’S 1946 PHOTO ORIGINAL AND DISPUTED INDEX ATTACHMENTS — A063';
 if(!jay.historicalNotes.some(n=>n.title===title))jay.historicalNotes.push({
   title,paragraphs:[
     'The April 1946 family photograph memory was preserved in the original two-page PDF and is already packaged in the Atlas at assets/jay/jay-webb-1946.pdf. The first page depicts a man and small child atop a logging truck; FamilySearch tags identify Jay and his son James Sheldon Webb. The second page depicts timber-laden trucks, people and a raised building, but identities in that image are not independently established merely by the photograph. A previous Sheldon-page source description accidentally called Sheldon Jay’s brother; the source caption has been corrected to “son Sheldon.” Both person-page cards reference the same single two-page memory, not two independently captured original documents.',
     'A separate 1999 obituary source attached to Jay’s FamilySearch profile was found in the earlier live October review to index Henry Ray Webb and Imza, not James Wilford “Jay” Webb. This is a likely mistaken/collateral attachment; it must not be used as a primary identity, death, military or familial proof for Jay. That source detail has not been independently re-opened in A063, and no FamilySearch source was removed or modified.',
     'Likewise, the 1950 and 1955 church-census citations appeared twice in the earlier source list. The two entries in each year must not be counted as two separate witnesses before exact citation/original-image comparison. The independent 1924 birth index, 1941 marriage index and 1950 household original keep their prior levels of proof; the approved life biography, Story scenes, audio and family-tree edges remain unchanged.'
   ],
   links:[
     {label:'FamilySearch — Jay Webb memories',url:'https://www.familysearch.org/en/tree/person/memories/KWZD-XX7'},
     {label:'FamilySearch — Jay Webb source list (sign-in may be needed)',url:'https://www.familysearch.org/en/tree/person/sources/KWZD-XX7'}
   ]
 });
 jay.sourceAudit=Object.assign({},jay.sourceAudit||{},{
   a063:'Two-page original 1946 Jay/Sheldon logging memory already archived in Library and GitHub; source caption brother->son corrected on Sheldon derivative, uncertain 1999 unrelated obituary and apparent duplicated church-census rows kept unverified, not evidence.',
   knownTwoPage1946FamilyPdfAlreadyPacked:true,
   original1946PdfAtlasAsset:'assets/jay/jay-webb-1946.pdf',
   original1946PdfPageCount:2,
   newMediaFilesDownloaded:0,
   originalNewImagesCaptured:0,
   familyRelationshipIdCorrectedOnlyInSourceCaption:true,
   treeEdgesChanged:false,
   fsSourceTreeEdited:false,
   surname1999ObituaryIndexedNames:'Henry Ray Webb; Imza — prior October source-list observation, A063 original index not independently reopened',
   obituary1999UsableAsJayIdentityProof:false,
   churchCensus1950PossibleDuplicateRows:true,
   churchCensus1955PossibleDuplicateRows:true,
   churchCensusExactIndependentWitnessCountUnknown:true,
   militaryServiceProvenByLoggingPhoto:false,
   approvedBiographyChanged:false,
   narrationStoryChanged:false,
   userIphoneMediaVerified:false,
   personPageFullyCertified:false
 });
})();
