import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync,statSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const wilhelmCode=readFileSync(new URL('wilhelm-brunne-mobile-biography.js',root),'utf8');
const johannaCode=readFileSync(new URL('johanna-weller-mobile-biography.js',root),'utf8');
const qaCode=readFileSync(new URL('brunne-weller-original-source-boundaries-a055.js',root),'utf8');
const scripts=[
 'wilhelm-brunne-mobile-biography.js?v=20261111-a055-person-only',
 'johanna-weller-mobile-biography.js?v=20261111-a055-person-only',
 'brunne-weller-original-source-boundaries-a055.js?v=20261111-a055'
];
function setup() {
 const k='const DATA = ',i=html.indexOf(k);
 assert.ok(i>=0);
 const DATA=JSON.parse(html.slice(i+k.length,html.indexOf(';\n',i)));
 const GUIDE_PROFILES={wilhelm_brunne:{life:'existing profile'},johanne_weller:{life:'existing profile'}};
 const TOUR_MEDIA={
  wilhelm_brunne:{audio:'approved-frozen-W',transcript:'old',scenes:[{src:'approvedW.jpg'}]},
  johanne_weller:{audio:'approved-frozen-J',transcript:'old',scenes:[{src:'approvedJ.jpg'}]},
  unrelated:{scenes:[{src:'untouched.jpg'}]}
 };
 const context=vm.createContext({DATA,GUIDE_PROFILES,TOUR_MEDIA});
 return {DATA,GUIDE_PROFILES,TOUR_MEDIA,context};
}
test('A055 activates 2 ancestral biographies and 15 previous-gallery slots without changing any approved Story or narration',()=>{
 const state=setup();
 const beforeAudio=JSON.stringify(state.TOUR_MEDIA);
 const beforeGraph=JSON.stringify(state.DATA.edges);
 const beforeUnions=JSON.stringify(state.DATA.unions);
 const targets=['wilhelm_brunne','johanne_weller'].map(k=>state.DATA.nodes.find(n=>n.id===k));
 const beforeScenes=targets.map(n=>JSON.stringify(n.storyScenes));
 vm.runInContext(wilhelmCode,state.context,{timeout:5000});
 vm.runInContext(johannaCode,state.context,{timeout:5000});
 vm.runInContext(qaCode,state.context,{timeout:5000});
 assert.equal(JSON.stringify(state.TOUR_MEDIA),beforeAudio,'Story and narration objects changed');
 assert.equal(JSON.stringify(state.DATA.edges),beforeGraph);
 assert.equal(JSON.stringify(state.DATA.unions),beforeUnions);
 assert.deepEqual(targets.map(n=>JSON.stringify(n.storyScenes)),beforeScenes);
 const w=targets[0],j=targets[1];
 assert.equal(w.evidence.filter(x=>x.kind==='photo').length,2);
 assert.equal(w.evidence.filter(x=>x.kind==='document').length,6);
 assert.equal(j.evidence.filter(x=>x.kind==='photo').length,2);
 assert.equal(j.evidence.filter(x=>x.kind==='document').length,5);
 assert.ok(state.GUIDE_PROFILES.wilhelm_brunne.life.split(/\s+/).length>=700);
 assert.ok(state.GUIDE_PROFILES.johanne_weller.life.split(/\s+/).length>=1000);
 assert.equal(w.sourceAudit.fullyCertified,false);
 assert.equal(j.sourceAudit.iphoneValidated,false);
 assert.equal(w.sourceAudit.approvedNarrationAndStoryUnchanged,true);
 assert.equal(j.sourceAudit.approvedNarrationAndStoryUnchanged,true);
 assert.equal(w.historicalNotes.length,1);
 assert.equal(j.historicalNotes.length,1);
 assert.match(w.historicalNotes[0].paragraphs[2],/1913/);
 assert.match(w.historicalNotes[0].paragraphs[2],/1914/);
 assert.match(j.historicalNotes[0].paragraphs[1],/1848/);
 assert.match(j.historicalNotes[0].paragraphs[1],/1850/);
 assert.match(j.historicalNotes[0].paragraphs[1],/29 September/);
 assert.match(j.historicalNotes[0].paragraphs[1],/30 September/);
 // The source-note stage is idempotent by title, originals remain already-captured.
 vm.runInContext(qaCode,state.context,{timeout:4000});
 assert.equal(w.historicalNotes.length,1);
 assert.equal(j.historicalNotes.length,1);
});
test('A055 all 15 person gallery references point to existing already-packaged files',()=>{
 const state=setup();
 vm.runInContext(wilhelmCode,state.context,{timeout:5000});
 vm.runInContext(johannaCode,state.context,{timeout:5000});
 const persons=['wilhelm_brunne','johanne_weller'].map(k=>state.DATA.nodes.find(n=>n.id===k));
 const files=persons.flatMap(n=>n.evidence);
 assert.equal(files.length,15);
 const uniq=new Set(files.map(x=>x.full));
 assert.ok(uniq.size>=10);
 for(const e of files){
  assert.ok(e.full?.startsWith('assets/'),'Unknown source path for '+e.title);
  assert.ok(statSync(new URL(e.full,root)).size>3000,'Missing/empty existing gallery image for '+e.title);
  assert.ok(e.sourcePage?.startsWith('https://'),'Missing source citation on '+e.title);
 }
 for(const src of scripts)assert.equal(html.split(src).length-1,1,src);
 assert.ok(html.indexOf(scripts[0])<html.indexOf(scripts[1]));
 assert.ok(html.indexOf(scripts[1])<html.indexOf(scripts[2]));
});
