import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('atlas-v3.9.62.html', root), 'utf8');
const src = readFileSync(new URL('marian-skinner-1910-household-source-a059.js', root), 'utf8');
function fixture(){
  const DATA={nodes:[{id:'marian_skinner',biography:'APPROVED 1095-WORD BIO',note:'APPROVED',
    evidence:[{title:'Existing family photograph',full:'photo.jpg'}],historicalNotes:[]},
    {id:'richard_francis_skinner'},{id:'jessie_irene_aurin'}],
    edges:[{a:'marian_skinner',b:'richard_francis_skinner',confidence:'provisional'},
      {a:'marian_skinner',b:'jessie_irene_aurin',confidence:'provisional'}]};
  const TOUR_MEDIA={marian_skinner:{transcript:'FROZEN BIO',scenes:[{src:'one.jpg'}],audio:null}};
  const GUIDE_PROFILES={marian_skinner:{life:'FROZEN BIO'}};
  const context=vm.createContext({DATA,TOUR_MEDIA,GUIDE_PROFILES});
  return {context,DATA,TOUR_MEDIA,GUIDE_PROFILES};
}
test('A059 restores 1910 evidence without falsely claiming 1903 birth record',()=>{
  const {context,DATA,TOUR_MEDIA,GUIDE_PROFILES}=fixture();
  const graph=JSON.stringify(DATA.edges),tour=JSON.stringify(TOUR_MEDIA),guide=JSON.stringify(GUIDE_PROFILES);
  const m=DATA.nodes[0],bio=m.biography,note=m.note;
  vm.runInContext(src,context,{timeout:3000});
  const item=m.evidence.find(e=>e.a059AlreadyCaptured);
  assert.ok(item);
  assert.match(item.sourcePage,/33S7-9RJ6-PDK/);
  assert.match(item.provenance,/Skemis/);
  assert.match(item.summary,/Marrion, 7/);
  assert.equal(item.a059OriginalImagePackagedInAtlas,false);
  assert.equal(m.sourceAudit.original1910FoundBeforeCurrentTranche,true);
  assert.equal(m.sourceAudit.birthRegister1903OriginalRead,false);
  assert.equal(m.sourceAudit.newOriginalImageBytes,0);
  assert.equal(m.sourceAudit.fullyCertified,false);
  assert.equal(m.historicalNotes.length,1);
  assert.match(m.historicalNotes[0].paragraphs[2],/1903 Michigan birth register remains unexamined/);
  assert.equal(JSON.stringify(DATA.edges),graph);
  assert.equal(JSON.stringify(TOUR_MEDIA),tour);
  assert.equal(JSON.stringify(GUIDE_PROFILES),guide);
  assert.equal(m.biography,bio);
  assert.equal(m.note,note);
  vm.runInContext(src,context,{timeout:3000});
  assert.equal(m.historicalNotes.length,1);
  assert.equal(m.evidence.length,2);
});
test('A059 script loads once and never touches Story/narration/graph',()=>{
  const tag='marian-skinner-1910-household-source-a059.js?v=20261112-a059';
  assert.equal(html.split(tag).length-1,1);
  assert.ok(html.indexOf(tag)>html.indexOf('marian-skinner-mobile-biography.js?v=20261014-marian-3'));
  for(const bad of ['DATA.edges.push','TOUR_MEDIA.marian_skinner=', '.mp3', 'person.biography =']){
    assert.equal(src.includes(bad),false);
  }
});
