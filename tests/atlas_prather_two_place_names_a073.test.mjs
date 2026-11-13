import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const script=readFileSync(new URL('../prather-missouri-two-towns-census-geography-a073.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');
test('A073 two distinct places, credible source attribution, and no invented ancestry',()=>{
 const DATA={nodes:[{id:'inez_karen',biography:'museum Inez',historicalNotes:[]},{id:'thomas_prather',biography:'museum Thomas',historicalNotes:[]}],edges:[{a:'inez_karen',b:'thomas_prather'}]};
 const originalEdges=JSON.stringify(DATA.edges);
 const originalBios=DATA.nodes.map(p=>p.biography);
 const c=vm.createContext({DATA});
 vm.runInContext(script,c,{timeout:3000});
 vm.runInContext(script,c,{timeout:3000});
 assert.equal(JSON.stringify(DATA.edges),originalEdges);
 assert.deepEqual(DATA.nodes.map(p=>p.biography),originalBios);
 for(const p of DATA.nodes){
   const notes=p.historicalNotes.filter(n=>n.title==='TWO DIFFERENT MISSOURI PRATHER TOWNS — THE FAMILY LINK IS STILL UNPROVEN');
   assert.equal(notes.length,1,'idempotent original source note');
   const audit=p.sourceAudit.a073TwoPratherTowns;
   assert.ok(audit.clayPlace.includes('J. A. Prather'));
   assert.ok(audit.boonePlace.includes('William Prather'));
   assert.ok(audit.target1880.includes('Gallatin'));
   assert.equal(audit.ThomasEstilSameAs1885ChildProven,false);
   assert.equal(audit.WilliamOrJAProvenDirectAncestor,false);
   assert.equal(audit.originalMapBytesPreserved,false);
   assert.equal(audit.graphEdgesAdded,0);
   assert.equal(audit.mapPinsAdded,0);
   assert.equal(audit.iphoneValidated,false);
 }
});
test('A073 loader is after original memoir source modules and only loaded once',()=>{
 const scriptName='prather-missouri-two-towns-census-geography-a073.js?v=20261112-a073';
 assert.equal(html.split(scriptName).length-1,1);
 assert.ok(html.indexOf(scriptName)>html.indexOf('thomas-prather-1885-clay-household-candidate-a056.js'));
 assert.ok(html.indexOf(scriptName)>html.indexOf('inez-mobile-memoir.js'));
 assert.doesNotMatch(script,/TOUR_MEDIA|DATA\.edges\.push|\.portrait\s*=|\.biography\s*=/);
});
