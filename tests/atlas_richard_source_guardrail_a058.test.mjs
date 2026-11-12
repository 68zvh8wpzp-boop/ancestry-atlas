import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const src=readFileSync(new URL('richard-skinner-original-source-guardrail-a058.js',root),'utf8');

function context(){
  const DATA={nodes:[
    {id:'richard_francis_skinner',biography:'Approved life, unchanged',
      evidence:[{title:'Richard Francis Skinner — death certificate',date:'17 November 1933'}],
      historicalNotes:[],note:'Approved note'},
    {id:'jessie_irene_aurin',note:'Approved'}
  ], edges:[{a:'richard_francis_skinner',b:'john_skinner',confidence:'strong'}]};
  const TOUR_MEDIA={richard_francis_skinner:{transcript:'frozen narration',audio:'frozen-original.mp3',storyScenes:[{src:'existing'}]}};
  const GUIDE_PROFILES={richard_francis_skinner:{life:'approved'}};
  const c=vm.createContext({DATA,TOUR_MEDIA,GUIDE_PROFILES});
  return {c,DATA,TOUR_MEDIA,GUIDE_PROFILES};
}
test('A058 original 1933 mother-field error cannot become a parentage claim',()=>{
  const {c,DATA,TOUR_MEDIA,GUIDE_PROFILES}=context();
  const oldGraph=JSON.stringify(DATA.edges);
  const oldNarration=JSON.stringify(TOUR_MEDIA);
  const oldGuide=JSON.stringify(GUIDE_PROFILES);
  vm.runInContext(src,c,{timeout:3000});
  const r=DATA.nodes[0];
  assert.equal(r.historicalNotes.length,1);
  assert.match(r.historicalNotes[0].paragraphs[0],/error in the recorded certificate itself/);
  assert.match(r.historicalNotes[0].paragraphs[2],/NOT INDEPENDENTLY PROVEN/);
  assert.equal(r.sourceAudit.originalDeathCertificateAlreadyPackaged,true);
  assert.equal(r.sourceAudit.parentagePromoted,false);
  assert.equal(r.sourceAudit.sourceImageBytesAcquired,0);
  assert.equal(r.sourceAudit.currentApprovedBiographyChanged,false);
  assert.equal(r.sourceAudit.narrationAndStoryFrozen,true);
  assert.equal(r.biography,'Approved life, unchanged');
  assert.equal(r.note,'Approved note');
  assert.equal(JSON.stringify(DATA.edges),oldGraph);
  assert.equal(JSON.stringify(TOUR_MEDIA),oldNarration);
  assert.equal(JSON.stringify(GUIDE_PROFILES),oldGuide);
  vm.runInContext(src,c,{timeout:3000});
  assert.equal(r.historicalNotes.length,1);
});
test('A058 is loaded exactly once after the already-packaged Richard biography',()=>{
  const tag='richard-skinner-original-source-guardrail-a058.js?v=20261112-a058';
  assert.equal(html.split(tag).length-1,1);
  assert.ok(html.indexOf(tag)>html.indexOf('richard-skinner-mobile-biography.js?v=20261011-skinner-8'));
  assert.ok(!src.includes('DATA.edges.push'));
  assert.ok(!src.includes('.mp3'));
});
