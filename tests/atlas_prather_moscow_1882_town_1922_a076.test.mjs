import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const js=readFileSync(new URL('../prather-1882-1922-town-name-collision-a076.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../atlas-v3.9.62.html',import.meta.url),'utf8');

test('A076 contemporary church-site report is never mistaken for a direct parentage link',()=>{
 const DATA={nodes:[{id:'inez_karen',biography:'approved Inez',historicalNotes:[]},{id:'thomas_prather',biography:'approved Thomas',historicalNotes:[]}],edges:[{a:'inez_karen',b:'thomas_prather'}]};
 const edges=JSON.stringify(DATA.edges),ctx=vm.createContext({DATA});
 vm.runInContext(js,ctx,{timeout:3000});vm.runInContext(js,ctx,{timeout:3000});
 assert.equal(JSON.stringify(DATA.edges),edges);
 for(const node of DATA.nodes) {
  assert.equal(node.historicalNotes.length,1);
  const a=node.sourceAudit.a076;
  assert.equal(a.source1922.spelling,'Pratherville');
  assert.equal(a.source1882.claimedInitials,'J. H. Prather');
  assert.equal(a.source1922.originalPageImageVerified,false);
  assert.equal(a.source1882.originalPageImageVerified,false);
  assert.equal(a.theseNamesIdentityMatched,false);
  assert.equal(a.InezTownSelected,false);
  assert.equal(a.ThomasEstilParentsProven,false);
  assert.equal(a.graphEdgesAdded,0);
  assert.equal(a.originalMediaBytesAdded,0);
  assert.equal(a.published,false);
 }
 assert.equal(DATA.nodes[0].biography,'approved Inez');
 assert.equal(DATA.nodes[1].biography,'approved Thomas');
});
test('A076 is loaded after A073; no original image or narration claims',()=>{
 const s='prather-1882-1922-town-name-collision-a076.js?v=20261113-a076';
 assert.equal(html.split(s).length-1,1);
 assert.ok(html.indexOf(s)>html.indexOf('prather-missouri-two-towns-census-geography-a073.js'));
 assert.doesNotMatch(js,/DATA\.edges\.push|TOUR_MEDIA|\.evidence\.push|\.portrait\s*=/);
});
