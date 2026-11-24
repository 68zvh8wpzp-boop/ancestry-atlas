import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {test} from 'node:test';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');
test('Frances Weldon original probate evidence survives legacy person module',async()=>{
 const graph=await read('atlas-canonical-family-data.js');
 const c=vm.createContext({window:{}});vm.runInContext(graph,c);
 const d=c.window.AtlasCanonicalGraph.read();const n=d.nodes.find(x=>x.id==='franny_weldon');
 assert.equal(n.parentage.father.confidence,'confirmed');assert.equal(n.parentage.mother.confidence,'strong');
 assert.match(n.parentage.mother.maidenName,/unverified/);assert.equal(n.evidence.filter(x=>x.id?.startsWith('weldon-a455-')).length,4);
 const ctx=vm.createContext({DATA:d,GUIDE_PROFILES:{}});vm.runInContext(await read('frances-weldon-mobile-biography.js'),ctx);
 const p=d.nodes.find(x=>x.id==='franny_weldon');assert.equal(p.evidence.filter(e=>e.id?.startsWith('weldon-a455-')).length,4);
 assert.equal(p.evidence.filter(e=>e.full?.startsWith('assets/william-dunbar/')).length,2);
 assert.match(p.biography,/1838 will explicitly identifies her/);assert.doesNotMatch(p.biography,/Fanny’s father, in 1842/);
 for(const e of p.evidence.filter(e=>e.id?.startsWith('weldon-a455-'))){assert.match(e.full,/^assets\/weldon\/.*\.jpg$/);assert.match(e.originalAsset,/^https:\/\/www\.sos\.mo\.gov\/Images\/Archives\/Judicial2\//);assert.ok((await readFile(new URL('../'+e.full,import.meta.url))).length>10000);assert.match(e.transcription,/Original:/);assert.match(e.transcription,/Translation:/);}
});
