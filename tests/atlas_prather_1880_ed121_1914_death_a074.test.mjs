import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const thomas=readFileSync(new URL('../thomas-prather-1885-clay-household-candidate-a056.js',import.meta.url),'utf8');
const geo=readFileSync(new URL('../prather-missouri-two-towns-census-geography-a073.js',import.meta.url),'utf8');

test('A074 candidate John S. 1914 death route retains exact evidence boundaries',()=>{
 const DATA={nodes:[
   {id:'inez_karen',biography:'approved Inez',historicalNotes:[]},
   {id:'thomas_prather',biography:'approved Thomas',historicalNotes:[],evidence:[]}
  ],edges:[{a:'inez_karen',b:'thomas_prather'}]};
 const edges=JSON.stringify(DATA.edges);
 const c=vm.createContext({DATA});
 for(let i=0;i<2;i++){vm.runInContext(thomas,c,{timeout:3000});vm.runInContext(geo,c,{timeout:3000});}
 const person=DATA.nodes[1],a=person.sourceAudit.a074_candidateJohnSDeath,b=person.sourceAudit.a073TwoPratherTowns;
 assert.equal(a.candidateDied.includes('1914'),true);
 assert.equal(a.originalDeathRecordInspected,false);
 assert.equal(a.certificateNumberLocated,false);
 assert.equal(a.identityToInezFatherProven,false);
 assert.equal(a.noParentNodeOrGraphPromotion,true);
 assert.equal(a.originalMediaBytesCaptured,0);
 assert.equal(b.exampleED120IsPratherHousehold,false);
 assert.equal(b.exampleED121IsPratherHousehold,false);
 assert.equal(b.gallatinEnumerationCoverageExhaustivelyChecked,false);
 assert.equal(b.prather1880PersonImageFound,false);
 assert.match(b.additionalED121Locator,/Unrelated Evans family/);
 assert.equal(JSON.stringify(DATA.edges),edges);
 assert.equal(person.biography,'approved Thomas');
 assert.equal(DATA.nodes[0].biography,'approved Inez');
 assert.equal(person.evidence.filter(e=>e.title.includes('1885 Clay County history')).length,1);
 assert.equal(person.evidence.filter(e=>e.title.includes('1920 Clay County history')).length,1);
 assert.equal(person.historicalNotes.filter(n=>n.title.includes('TWO DIFFERENT MISSOURI PRATHER TOWNS')).length,1);
});
test('A074 no audio/media/story mutation and no implied original',()=>{
 assert.doesNotMatch(thomas+geo,/DATA\.edges\.push|TOUR_MEDIA\.|\.portrait\s*=|\.biography\s*=/);
 assert.match(thomas,/The 1920 history remains a retrospective published account/);
 assert.match(thomas,/no person-specific civil death image/);
});
