import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, statSync} from 'node:fs';
import vm from 'node:vm';
const root = new URL('../',import.meta.url);
const src = readFileSync(new URL('caroline-original-source-crosslinks-a050.js',root),'utf8');
const html = readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');

function prepare(){
 const original1850={
  kind:'document', title:'1850 census — Edward’s household', date:'17 October 1850',
  sourceLevel:'original', full:'assets/edward-webb-sr/edward-webb-1850-census-household477.jpg',
  thumb:'assets/edward-webb-sr/edward-webb-1850-census-household477.jpg',
  originalAsset:'assets/edward-webb-sr/edward-webb-1850-census-household477.jpg',
  provenance:'NARA M432 roll396',
  sourcePage:'https://archive.org/details/populationschedu0396unix/page/n375/mode/1up',
  transcription:'FULLTEXT_ORIGINAL: C A Webb ...'
 };
 const original1860={
  kind:'document', title:'1860 census — Edward in Caroline’s household',
  sourceLevel:'original',full:'assets/edward-webb-jr/edward-jr-1860-mcrae-reader.jpg',
  thumb:'assets/edward-webb-jr/edward-jr-1860-mcrae-reader.jpg',
  originalAsset:'https://archive.org/download/populationschedu1314unix/page/n185.jpg',
  sourcePage:'https://archive.org/details/populationschedu1314unix/page/n185/mode/1up',
  provenance:'NARA M653 roll1314',
  transcription:'Original: 12 | Caroline A McRae | 39 | f | Ohio'
 };
 const entry={
  kind:'document', title:'Nauvoo Relief Society — Caroline listed as Amelia C. Webb',
  sourceLevel:'original',sourcePage:'https://www.josephsmithpapers.org/paper-summary/minutes-12-may-1842/3'
 };
 const caroline={id:'caroline_owens',note:'previous approved context',evidence:[entry],historicalNotes:[],portrait:{url:'remote-canonical'}};
 const sr={id:'edward_milo_sr',evidence:[original1850]};
 const jr={id:'edward_milo_jr',evidence:[original1860]};
 const DATA={nodes:[caroline,sr,jr],edges:[{a:'edward_milo_jr',b:'edward_milo_sr',confidence:'strong'}]};
 const GUIDE_PROFILES={caroline_owens:{life:'approved 2026 museum biography'}};
 const TOUR_MEDIA={caroline_owens:{audio:'approved-audio.mp3',scenes:[{src:'approved-original-scene.jpg'}]}};
 return {DATA,caroline,GUIDE_PROFILES,TOUR_MEDIA};
}

test('A050 crosslinks exactly two already-packaged census sources and does not duplicate on rerun',()=>{
 const state=prepare();
 const count=state.caroline.evidence.length;
 vm.runInNewContext(src,state,{timeout:3000});
 assert.equal(state.caroline.evidence.length,count+2);
 assert.equal(state.caroline.sourceAudit.galleryLinksActuallyAdded,2);
 assert.equal(state.caroline.sourceAudit.additionalOriginalMediaBytes,0);
 assert.equal(state.caroline.evidence.filter(x=>x.sourceLevel==='original').length,3);
 assert.match(state.caroline.evidence.find(x=>x.full?.includes('household477')).transcription,/C A Webb/);
 assert.match(state.caroline.evidence.find(x=>x.full?.includes('mcrae-reader')).transcription,/Caroline A McRae/);
 assert.match(state.caroline.evidence.find(x=>x.title?.includes('Nauvoo Relief Society')).summary,/NOT handwritten/);
 assert.equal(state.caroline.historicalNotes.length,1);
 vm.runInNewContext(src,state,{timeout:3000});
 assert.equal(state.caroline.evidence.length,count+2,'No duplicate source in second run');
 assert.equal(state.caroline.historicalNotes.length,1);
});
test('A050 leaves approved Caroline story, portrait, labels and parent edges unchanged',()=>{
 const state=prepare();
 const before=JSON.stringify({
   bio:state.GUIDE_PROFILES.caroline_owens.life,media:state.TOUR_MEDIA.caroline_owens,
   edges:state.DATA.edges,portrait:state.caroline.portrait,note:state.caroline.note
 });
 vm.runInNewContext(src,state,{timeout:3000});
 const after=JSON.stringify({
   bio:state.GUIDE_PROFILES.caroline_owens.life,media:state.TOUR_MEDIA.caroline_owens,
   edges:state.DATA.edges,portrait:state.caroline.portrait,note:state.caroline.note
 });
 assert.equal(after,before);
 assert.equal(state.caroline.sourceAudit.iphoneValidated,false);
 assert.equal(state.caroline.sourceAudit.fullyCertified,false);
});
test('A050 is loaded once in staged entrypoint and reuses existing media bytes',()=>{
 assert.equal(html.split('caroline-original-source-crosslinks-a050.js?v=20261110-a050').length-1,1);
 for(const p of [
 'assets/edward-webb-sr/edward-webb-1850-census-household477.jpg',
 'assets/edward-webb-sr/edward-webb-1850-census-reader.jpg',
 'assets/edward-webb-jr/edward-jr-1860-mcrae-reader.jpg']){
   assert.ok(statSync(new URL(p,root)).size>10000,'Missing source '+p);
 }
});
