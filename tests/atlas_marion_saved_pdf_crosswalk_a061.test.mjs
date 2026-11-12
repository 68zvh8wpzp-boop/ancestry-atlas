import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const overlay=readFileSync(new URL('marion-archived-memory-pdfs-a061.js',root),'utf8');
const docs=[
 ['TH-7783-165848-634989-78','Home'],
 ['TH-7783-165848-601180-82','Neat as a Pin'],
 ['TH-7797-159647-37599-10','Letters from Grandma Brenay'],
 ['TH-7783-165848-15052-5','Graduation'],
 ['TH-7714-165878-61870-37','WWII Ration Books'],
 ['TH-7714-165878-331848-94','50th anniversary'],
 ['TH-7731-165895-2977-78','40th anniversary'],
 ['TH-7714-165878-110958-27','Young Marion']
];
test('A061 is loaded once, after its A060 predecessor',()=>{
 const previous='marion-context-and-document-provenance-a060.js?v=20261112-a060';
 const now='marion-archived-memory-pdfs-a061.js?v=20261112-a061';
 assert.equal(html.split(now).length-1,1);
 assert.ok(html.indexOf(now)>html.indexOf(previous));
});
test('A061 3 full Library scans, one partial 1938 graduation, one six-page ration review, five complete PDF gates',()=>{
 const evidence=docs.map(([id,title],i)=>({title,kind:'document',thumb:'assets/marion-docs-preview/doc'+i+'.jpg',full:'https://sg30p0.familysearch.org/service/records/storage/dascloud/patron/v2/'+id+'/dist.pdf?ctx=ArtCtxPublic'}));
 const DATA={nodes:[{id:'marion_brenay',evidence,historicalNotes:[],biography:'APPROVED',note:'APPROVED'}],edges:[{a:'marion_brenay',b:'marian_skinner'}]};
 const TOUR_MEDIA={marion_brenay:{transcript:'approved audio text',scenes:[],audio:'file.mp3'}};
 const GUIDE_PROFILES={marion_brenay:{life:'APPROVED'}};
 const c=vm.createContext({DATA,TOUR_MEDIA,GUIDE_PROFILES});
 const oldEdges=JSON.stringify(DATA.edges),oldTour=JSON.stringify(TOUR_MEDIA),oldGuide=JSON.stringify(GUIDE_PROFILES);
 vm.runInContext(overlay,c,{timeout:4000});
 const person=DATA.nodes[0];
 assert.equal(person.sourceAudit.exactExistingCompleteMemoryPdfMatches,3);
 assert.equal(person.sourceAudit.completeUniqueImagePagesFromThosePdfs,9);
 assert.equal(person.sourceAudit.remainingCompletePdfOriginalsNotLocallyVerified,5);
 assert.equal(person.sourceAudit.newOriginalBytesDownloaded,0);
 assert.equal(person.sourceAudit.originalMemoryPdfAllEightLocallyPackaged,false);
 assert.equal(person.sourceAudit.userPhoneQA,false);
 for(const i of [0,1,2]){
  assert.equal(evidence[i].originalUploadPdfPreservedInPrivateLibrary,true);
  assert.equal(evidence[i].fullPdfPackagedInGitHub,false);
 }
 assert.equal(evidence[0].existingPdfPageCount,3);
 assert.equal(evidence[1].existingPdfPageCount,2);
 assert.equal(evidence[2].existingPdfPageCount,4);
 assert.match(evidence[2].originalContentReviewA061,/DO NOT count as a second original/);
 assert.equal(evidence[3].originalFivePagesVisuallyReviewedBeforeA061,true);
 assert.equal(evidence[3].uniquePagesSavedAsLibraryImages,3);
 assert.equal(evidence[3].originalCompleteFivePagePdfLocalPackageVerified,false);
 assert.equal(evidence[4].originalSixMemoryPagesVisuallyReviewedBeforeA061,true);
 for(const i of [5,6,7])assert.equal(evidence[i].archivalOriginalCopyStatus,undefined);
 assert.equal(person.biography,'APPROVED');
 assert.equal(JSON.stringify(DATA.edges),oldEdges);
 assert.equal(JSON.stringify(TOUR_MEDIA),oldTour);
 assert.equal(JSON.stringify(GUIDE_PROFILES),oldGuide);
 assert.equal(person.historicalNotes.length,1);
 vm.runInContext(overlay,c,{timeout:4000});
 assert.equal(person.historicalNotes.length,1);
 assert.equal(person.sourceAudit.exactExistingCompleteMemoryPdfMatches,3);
});
