import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const biography=readFileSync(new URL('jessie-aurin-mobile-biography.js',root),'utf8');
const sourceGate=readFileSync(new URL('jessie-source-integrity-a056.js',root),'utf8');
const scripts=['jessie-aurin-mobile-biography.js?v=20261111-a056-person-only','jessie-source-integrity-a056.js?v=20261111-a056'];
function setup() {
 const at=html.indexOf('const DATA = ');
 assert.ok(at>=0);
 const DATA=JSON.parse(html.slice(at+13,html.indexOf(';\n',at)));
 const GUIDE_PROFILES={jessie_irene_aurin:{life:'old approved'}};
 const TOUR_MEDIA={jessie_irene_aurin:{audio:'approved prior track',scenes:[{src:'prior-approved.jpg'}],transcript:'do not edit'},someOther:{audio:'another track'}};
 const context=vm.createContext({DATA,GUIDE_PROFILES,TOUR_MEDIA});
 return {DATA,GUIDE_PROFILES,TOUR_MEDIA,context};
}
test('A056 real Jessie approved page retains John/​Jonas original proof warning and freezes audio/Story/graph',()=>{
 const r=setup();
 const before=JSON.stringify(r.TOUR_MEDIA),edges=JSON.stringify(r.DATA.edges),unions=JSON.stringify(r.DATA.unions);
 const j=r.DATA.nodes.find(x=>x.id==='jessie_irene_aurin');
 assert.ok(j.hold,'original proof warning must exist');
 const hold=JSON.stringify(j.hold),priorScenes=JSON.stringify(j.storyScenes);
 vm.runInContext(biography,r.context,{timeout:5000});
 vm.runInContext(sourceGate,r.context,{timeout:5000});
 assert.equal(JSON.stringify(j.hold),hold,'father identity warning erased');
 assert.equal(JSON.stringify(j.storyScenes),priorScenes,'approved scenes changed');
 assert.equal(JSON.stringify(r.TOUR_MEDIA),before,'approved audio or Story transcript changed');
 assert.equal(JSON.stringify(r.DATA.edges),edges);
 assert.equal(JSON.stringify(r.DATA.unions),unions);
 assert.ok(r.GUIDE_PROFILES.jessie_irene_aurin.life.split(/\s+/).length>500);
 assert.match(j.historicalNotes[0].paragraphs[0],/John Auene/);
 assert.match(j.historicalNotes[0].paragraphs[1],/Jonas Aurin/);
 assert.match(j.historicalNotes[0].paragraphs[1],/UNPROVEN|DO NOT|do NOT|does NOT|not establish/);
 assert.match(j.historicalNotes[0].paragraphs[2],/1897/);
 assert.equal(j.sourceAudit.originalParentageHoldRetained,true);
 assert.equal(j.sourceAudit.fatherGrandparentProofPromoted,false);
 assert.equal(j.sourceAudit.locallyStoredOriginalBirthImage,false);
 assert.equal(j.sourceAudit.locallyStoredOriginal1880Image,false);
 assert.equal(j.sourceAudit.iphoneValidated,false);
 assert.equal(j.historicalNotes.length,1);
 vm.runInContext(sourceGate,r.context,{timeout:5000});
 assert.equal(j.historicalNotes.length,1,'source audit should be idempotent');
});
test('A056 Jessie source-only items have no fake image; 7 true locally packaged gallery previews exist',()=>{
 const r=setup();
 vm.runInContext(biography,r.context,{timeout:5000});
 vm.runInContext(sourceGate,r.context,{timeout:5000});
 const j=r.DATA.nodes.find(x=>x.id==='jessie_irene_aurin'),ev=j.evidence;
 assert.equal(ev.length,20);
 assert.equal(ev.filter(x=>x.kind==='photo').length,4);
 assert.equal(ev.filter(x=>x.kind==='document').length,3);
 assert.equal(ev.filter(x=>x.kind==='citation').length,13);
 assert.equal(j.sourceAudit.currentDraftPhotoSlots,4);
 assert.equal(j.sourceAudit.currentDraftLocallyStoredDocumentSlots,3);
 assert.equal(j.sourceAudit.currentDraftSourceOnlyCitationSlots,13);
 const foot=ev.find(x=>/photographed grave marker/.test(x.title||''));
 assert.equal(foot.kind,'photo');
 assert.match(foot.summary,/MUST NOT replace/);
 for(const e of ev.filter(x=>x.kind==='citation')){
   assert.ok(!e.full,'Citation cannot claim packaged original image: '+e.title);
   assert.ok(e.sourcePage?.startsWith('https://'),'Citation needs source link: '+e.title);
 }
 for(const e of ev.filter(x=>x.kind==='photo'||x.kind==='document')){
   assert.ok(e.full?.startsWith('assets/'),e.title);
   assert.ok(statSync(new URL(e.full,root)).size>10000,e.title);
 }
 assert.equal(html.split(scripts[0]).length-1,1);
 assert.equal(html.split(scripts[1]).length-1,1);
 assert.ok(html.indexOf(scripts[0])<html.indexOf(scripts[1]));
});
