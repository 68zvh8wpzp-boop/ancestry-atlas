import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import vm from 'node:vm';
const read=p=>readFile(new URL('../'+p,import.meta.url));
const rich='assets/john-peter/peter-census-1901.jpg';
const low='assets/charles_albert_brunne_1901_census_full.jpg';
const wedding='assets/charles-godfrey/charles-ida-marriage-1893.jpg';
const death='assets/charles-godfrey/charles-g-brenay-death-1942.jpg';
const ids=['charles_albert','charles_godfrey'];
const modules=['charles-albert-mobile-biography.js','charles-godfrey-mobile-biography.js'];
const byId=(d,id)=>d.nodes.find(n=>n.id===id);
async function loadData(){
 const html=(await read('atlas-v3.9.63.html')).toString('utf8');
 const i=html.indexOf('const DATA = '),e=html.indexOf(';\n',i);
 assert.ok(i>0&&e>i);
 return {html,data:JSON.parse(html.slice(i+'const DATA = '.length,e))};
}
async function simulate({reconcile}){
 const {html,data}=await loadData();
 const context=vm.createContext({DATA:structuredClone(data),window:{},GUIDE_PROFILES:{},TOUR_MEDIA:{}});
 if(reconcile){
  assert.ok(html.includes('atlas-a443-brenay-original-evidence-reconcile.js?v=20261123-a443'));
  const p1=html.indexOf('atlas-a443-brenay-original-evidence-reconcile.js');
  const p2=html.indexOf(modules[0],p1);
  const p3=html.indexOf(modules[1],p2);
  const p4=html.indexOf('AtlasA443ReconcileBrenayOriginals',p3);
  assert.ok(p1<p2&&p2<p3&&p3<p4);
  vm.runInContext((await read('atlas-a443-brenay-original-evidence-reconcile.js')).toString('utf8'),context);
 }
 for(const name of modules)
  vm.runInContext((await read(name)).toString('utf8'),context,{filename:name});
 if(reconcile){
   assert.equal(typeof context.window.AtlasA443ReconcileBrenayOriginals,'function');
   context.window.AtlasA443ReconcileBrenayOriginals();
   // Repeated application must not create duplicates.
   context.window.AtlasA443ReconcileBrenayOriginals();
 }
 return context.DATA;
}
test('A443 legacy Brenay biography replacement hides canonical sources without reconciliation',async()=>{
 const {data}=await loadData();
 assert.equal(data.nodes.length,106);assert.equal(data.edges.length,108);
 const john=byId(data,'charles_albert');
 assert.equal(john.evidence.filter(e=>e.full===rich).length,1);
 const father=byId(data,'charles_godfrey');
 for(const asset of [rich,wedding,death])
   assert.equal(father.evidence.filter(e=>e.full===asset).length,1,'A437-A440 canonical '+asset);
 const legacy=await simulate({reconcile:false});
 assert.equal(byId(legacy,'charles_albert').evidence.filter(e=>e.full===rich).length,0);
 assert.ok(byId(legacy,'charles_godfrey').evidence.some(e=>e.kind==='photo'));
});
test('A443 restores verified original galleries without changing approved narratives, photos, lineage, or ordering',async()=>{
 const original=await simulate({reconcile:false});
 const restored=await simulate({reconcile:true});
 assert.equal(restored.nodes.length,106);assert.equal(restored.edges.length,108);
 assert.deepEqual(JSON.parse(JSON.stringify(restored.edges)),JSON.parse(JSON.stringify(original.edges)));
 for(const id of ids){
  const old=byId(original,id),cur=byId(restored,id);
  for(const prop of ['note','biography','BIOGRAPHY','CONTEXT','storyScenes']){
   assert.deepEqual(JSON.parse(JSON.stringify(cur[prop]??null)),JSON.parse(JSON.stringify(old[prop]??null)),id+' '+prop+' unchanged');
  }
  const photos=p=>p.evidence.filter(e=>e.kind==='photo');
  assert.deepEqual(JSON.parse(JSON.stringify(photos(cur))),JSON.parse(JSON.stringify(photos(old))),id+' approved photos unchanged');
  const docs=cur.evidence.filter(e=>e.kind==='document'&&e.full);
  assert.equal(docs.length,new Set(docs.map(e=>e.full)).size,id+' no duplicates');
  assert.equal(cur.evidence.filter(e=>e.full===rich).length,1,id+' full-res census accessible');
  assert.equal(cur.evidence.filter(e=>e.full===low).length,0,id+' low-res census no longer full image');
  const census=cur.evidence.find(e=>e.full===rich);
  assert.equal(census.thumb,low);
  assert.equal(census.originalAsset,rich);
 }
 const godfrey=byId(restored,'charles_godfrey');
 for(const asset of [wedding,death])assert.equal(godfrey.evidence.filter(e=>e.full===asset).length,1,asset+' once');
 assert.match(godfrey.evidence.find(e=>e.full===death).transcription,/Unknown/i);
 assert.ok(godfrey.evidence.some(e=>e.kind==='photo'), 'photo album retained');
 const charles=byId(restored,'charles_albert');
 assert.ok(charles.evidence.some(e=>e.full==='assets/richard-skinner/marion-skinner-albert-brenay-1920-marriage-original.jpg'),
 '1920 qualified marriage original from older module is preserved');
});
