import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
const source=readFileSync(new URL('../atlas-evidence-sync-2026-10-03-fulltext-v9.js',import.meta.url),'utf8');
const t='const DATA = ';
const i=html.indexOf(t);
assert.ok(i>=0);
const j=i+t.length;
const data=JSON.parse(html.slice(j,html.indexOf(';\n',j)));
for(const id of ['thomas_prather','amelia_l_cotton','john_auene_1879']) if(!data.nodes.some(n=>n.id===id))data.nodes.push({id,name:id});
const byId=new Map(data.nodes.map(n=>[n.id,n]));
const parentMap=new Map(),childMap=new Map();
for(const e of data.edges){if(!parentMap.has(e.a))parentMap.set(e.a,[]);parentMap.get(e.a).push(e.b);if(!childMap.has(e.b))childMap.set(e.b,[]);childMap.get(e.b).push(e.a)}
const originals=new Map(['brenay_martha','brenay_ammon'].map(id=>[id,data.nodes.find(n=>n.id===id)]));
test('v9 maintains same canonical node reference for all four Brenay persons',()=>{
 const sandbox={DATA:data,window:{__ATLAS_NODE_BY_ID:byId},parentMap,childMap,GUIDE_PROFILES:{},document:{readyState:'loading',addEventListener(){}}};
 vm.runInNewContext(source,sandbox,{filename:'atlas-evidence-sync-v9.js',timeout:4000});
 assert.equal(data.nodes.length,114,'109 static +3 inline fixture +2 previously missing Esther/Joan');
 assert.equal(new Set(data.nodes.map(x=>x.id)).size,data.nodes.length);
 for(const id of ['brenay_esther','brenay_joan','brenay_martha','brenay_ammon']){
   const node=data.nodes.find(n=>n.id===id);
   assert.ok(node);
   assert.strictEqual(byId.get(id),node,'lookup is split from graph for '+id);
   assert.ok(Array.isArray(node.evidence)&&node.evidence.length>=1,'evidence unavailable on canonical '+id);
   for(const parent of ['charles_albert','marian_skinner']){
     assert.ok(data.edges.some(e=>e.a===id&&e.b===parent),'missing parent link '+id+'>'+parent);
     assert.ok(parentMap.get(id)?.includes(parent),'missing navigation parent '+id+'>'+parent);
   }
 }
 assert.strictEqual(originals.get('brenay_martha'),data.nodes.find(n=>n.id==='brenay_martha'));
 assert.strictEqual(originals.get('brenay_ammon'),data.nodes.find(n=>n.id==='brenay_ammon'));
 assert.equal(data.nodes.find(n=>n.id==='brenay_martha').name,'Martha Brenay Lemon');
 const initEdges=111;
 assert.equal(data.edges.length,initEdges+4,'Esther and Joan each receive 2 real parent links, Martha/Ammon do not duplicate');
});
