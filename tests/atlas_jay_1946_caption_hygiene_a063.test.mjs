import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const overlay=readFileSync(new URL('jay-1946-caption-source-hygiene-a063.js',root),'utf8');
function fixture(){
 const twoPage='Jay Webb — 1946';
 const bad="FamilySearch memory “Jay Webb - 1946,” a two-page PDF describing standing on a truck with brother Sheldon and with cousin Darcine.";
 const DATA={nodes:[
  {id:'james_wilford',biography:'JAY APPROVED',note:'JAY APPROVED',historicalNotes:[],evidence:[
   {kind:'document',title:twoPage,full:'assets/jay/jay-webb-1946.pdf',thumb:'assets/jay/jay-webb-1946-preview.jpg'}]},
  {id:'james_sheldon',biography:'SHELDON APPROVED',historicalNotes:[],evidence:[
   {kind:'document',title:twoPage,full:'assets/sheldon/james-sheldon-jay-webb-1946-preview.jpg',provenance:bad}]}
 ],edges:[{a:'james_sheldon',b:'james_wilford',confidence:'confirmed'}]};
 const TOUR_MEDIA={james_wilford:{transcript:'FROZEN JAY',audio:'jay.mp3',scenes:[]},james_sheldon:{transcript:'FROZEN SHELDON',audio:'she.mp3',scenes:[]}};
 const GUIDE_PROFILES={james_wilford:{life:'APPROVED'},james_sheldon:{life:'APPROVED'}};
 return {DATA,TOUR_MEDIA,GUIDE_PROFILES};
}
test('A063 corrects only derivative Sheldon source caption and never changes parenthood graph or original assets',()=>{
 const {DATA,TOUR_MEDIA,GUIDE_PROFILES}=fixture();
 const graph=JSON.stringify(DATA.edges),tour=JSON.stringify(TOUR_MEDIA),guide=JSON.stringify(GUIDE_PROFILES);
 const jay=DATA.nodes[0],sheldon=DATA.nodes[1],bad=sheldon.evidence[0].provenance;
 const c=vm.createContext({DATA,TOUR_MEDIA,GUIDE_PROFILES});
 vm.runInContext(overlay,c,{timeout:3000});
 const j=jay.evidence[0],s=sheldon.evidence[0];
 assert.equal(j.existingCompletePdfInAtlas,true);
 assert.equal(j.existingOriginalPdfPageCount,2);
 assert.equal(j.uniqueDocumentCount,1);
 assert.equal(j.newOriginalDownloadNeeded,false);
 assert.match(s.provenance,/with son Sheldon/);
 assert.doesNotMatch(s.provenance,/brother Sheldon/);
 assert.equal(s.a063PreviousIncorrectCaption,bad);
 assert.equal(s.a063DistinctOriginalCountIncrement,0);
 assert.equal(s.originalPdfForFullView,'assets/jay/jay-webb-1946.pdf');
 assert.equal(jay.historicalNotes.length,1);
 assert.equal(jay.sourceAudit.obituary1999UsableAsJayIdentityProof,false);
 assert.equal(jay.sourceAudit.churchCensusExactIndependentWitnessCountUnknown,true);
 assert.equal(jay.sourceAudit.personPageFullyCertified,false);
 assert.equal(jay.biography,'JAY APPROVED');
 assert.equal(sheldon.biography,'SHELDON APPROVED');
 assert.equal(JSON.stringify(DATA.edges),graph);
 assert.equal(JSON.stringify(TOUR_MEDIA),tour);
 assert.equal(JSON.stringify(GUIDE_PROFILES),guide);
 vm.runInContext(overlay,c,{timeout:3000});
 assert.equal(jay.historicalNotes.length,1);
 assert.equal(s.a063PreviousIncorrectCaption,bad);
});
test('A063 loader single installation after A062, before closing HTML',()=>{
 const now='jay-1946-caption-source-hygiene-a063.js?v=20261112-a063';
 const previous='marion-1991-anniversary-scrapbook-locator-a062.js?v=20261112-a062';
 assert.equal(html.split(now).length-1,1);
 assert.ok(html.indexOf(now)>html.indexOf(previous));
 assert.ok(html.indexOf(now)<html.indexOf('</body>'));
});
