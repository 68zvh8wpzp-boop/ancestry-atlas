import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {test} from 'node:test';

const read=p=>readFile(new URL('../'+p,import.meta.url));
const ids=['ida_mae','john_peter','mary_ann'];
const census='assets/ida-mae/ida-census-1880.jpg';
const birth='assets/john-peter/benjamin-birth-1870.jpg';
const master='assets/john-peter/peter-census-1901.jpg';
const rendition='assets/charles_albert_brunne_1901_census_full.jpg';
const modules=['ida-mae-mobile-biography.js','john-peter-mobile-biography.js','mary-ann-mobile-biography.js'];
const keepOriginal = (b) => createHash('sha1').update('blob '+b.length+String.fromCharCode(0)).update(b).digest('hex');

async function loadData(){
 const html=(await read('atlas-v3.9.63.html')).toString('utf8');
 const a=html.indexOf('const DATA = '),b=html.indexOf(';'+String.fromCharCode(10),a);
 assert(a>0 && b>a);
 const d=JSON.parse(html.slice(a+'const DATA = '.length,b));
 assert.equal(d.nodes.length,106);assert.equal(d.edges.length,108);
 return {html,d};
}
async function runLegacy({reconcile}){
 const {html,d}=await loadData();
 const ctx=vm.createContext({DATA:structuredClone(d),window:{},
   GUIDE_PROFILES:{},HISTORICAL_CONTEXT:{},
   TOUR_MEDIA:{ida_mae:{},john_peter:{},mary_ann:{}}});
 const src=(await read('atlas-a441-gooley-original-evidence-reconcile.js')).toString('utf8');
 if(reconcile)vm.runInContext(src,ctx,{filename:'atlas-a441-gooley-original-evidence-reconcile.js'});
 for(const path of modules)vm.runInContext((await read(path)).toString('utf8'),ctx,{filename:path});
 if(reconcile){
   assert.match(html,/atlas-a441-gooley-original-evidence-reconcile\\.js\\?v=20261123-a441/);
   const p1=html.indexOf('atlas-a441-gooley-original-evidence-reconcile.js');
   const p2=html.indexOf('ida-mae-mobile-biography.js',p1);
   const p3=html.indexOf('mary-ann-mobile-biography.js',p2);
   const p4=html.indexOf('AtlasA441ApplySourceReconciliation',p3);
   assert(p1>0&&p1<p2&&p2<p3&&p3<p4,'archive merger should surround approved biography modules');
   ctx.window.AtlasA441ApplySourceReconciliation();
 }
 return ctx.DATA;
}
const byId=(d,id)=>d.nodes.find(n=>n.id===id);
test('A441 original manuscript files are unchanged pre-existing Atlas assets',async()=>{
 for(const o of [
   {path:census,bytes:949665,blob:'9a3410442fdc76f6f0d2968d34293b3a0380c748'},
   {path:birth,bytes:552227,blob:'6e5c04117a8361fdc05742dbe6bd1398126aca90'}]){
   const bytes=await read(o.path);
   assert.equal(bytes.length,o.bytes);
   assert.equal(keepOriginal(bytes),o.blob);
 }
});
test('A441 live module simulation merges old and new source evidence without duplicated full images',async()=>{
 const {d}=await loadData();
 for(const [id,files] of [
  ['ida_mae',[census]],
  ['john_peter',[census,birth]],
  ['mary_ann',[census,birth]]]){
   for(const path of files){
     assert.equal(byId(d,id).evidence.filter(e=>e.full===path).length,1,
       'new canonical evidence exists for '+id+' '+path);
   }
 }
 const before=await runLegacy({reconcile:false});
 const after=await runLegacy({reconcile:true});
 assert.equal(after.nodes.length,106);assert.equal(after.edges.length,108);
 assert.deepEqual(JSON.parse(JSON.stringify(after.edges)),JSON.parse(JSON.stringify(before.edges)),
   'never alter any relationship edge');
 for(const id of ids){
   const old=byId(before,id),next=byId(after,id);
   assert.equal(next.biography,old.biography,'preserve approved biography '+id);
   assert.equal(next.BIOGRAPHY,old.BIOGRAPHY,'preserve historical full biography field');
   assert.equal(next.storyScenes.length,old.storyScenes.length,'preserve story sequence '+id);
   const unique=next.evidence.filter(e=>e.kind==='document'&&e.full).map(e=>e.full);
   assert.equal(unique.length,new Set(unique).size,'no duplicated documents on '+id);
   assert.equal(next.evidence.filter(e=>e.full===census).length,1,'1880 household once on '+id);
   assert.match(next.evidence.find(e=>e.full===census).transcription,/line|Page|Goolay/i,
     'retain older full household transcription');
 }
 assert.equal(byId(after,'john_peter').evidence.filter(e=>e.full===birth).length,1);
 assert.equal(byId(after,'mary_ann').evidence.filter(e=>e.full===birth).length,1);
 assert.equal(byId(after,'ida_mae').evidence.filter(e=>e.full===birth).length,0);
 for(const id of ids){
   const doc=byId(after,id).evidence.find(e=>e.full===census);
   assert.equal(doc.sourceLevel,'original');assert.equal(doc.originalAsset,census);
   assert.match(doc.sourceReference,/own father and mother birthplace boxes are blank|OWN parent-birthplace/);
 }
 const ida=byId(after,'ida_mae');
 assert.equal(ida.evidence.filter(e=>e.full===rendition).length,0,
   'do not show a second lower-resolution 1901 census source');
 assert.equal(ida.evidence.filter(e=>e.full===master).length,1,
   'Ida opens the complete high-resolution 1901 original');
 assert.equal(ida.evidence.filter(e=>e.full==='assets/john-peter/james-marriage-1898.jpg').length,1,
   'Ida can open qualified separate corroboration for maiden surname Dennis');
 assert.match(ida.evidence.find(e=>e.full===master).transcription,/FULLTEXT_ORIGINAL|Fifth|CENSUS|1901/i,
   'preserve richer existing 1901 transcription');
 for(const id of ['john_peter','mary_ann']){
   assert.match(byId(after,id).evidence.find(e=>e.full===birth).sourceReference,/Alpena County/);
 }
});
