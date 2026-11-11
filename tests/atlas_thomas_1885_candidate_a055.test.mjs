import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const memoir=readFileSync(new URL('thomas-mobile-memoir.js',root),'utf8');
const src=readFileSync(new URL('thomas-prather-1885-clay-household-candidate-a055.js',root),'utf8');
function prepare(){
 const DATA={nodes:[{id:'thomas_prather',evidence:[],historicalNotes:[],note:'Preserved'},{id:'grace_hill'}],
  edges:[{a:'inez_karen',b:'thomas_prather',confidence:'strong'}]};
 const GUIDE_PROFILES={};
 const context=vm.createContext({DATA,GUIDE_PROFILES,
  document:{querySelectorAll:()=>[]},
  familyFacingEvidenceSummary:e=>e?.summary||'',
  renderEvidence:()=>{},
  buildAlbumItems:()=>[]});
 vm.runInContext(memoir,context,{timeout:3000});
 return {context,DATA,GUIDE_PROFILES,n:DATA.nodes[0]};
}
test('A055 contemporary 1885 biography is a CANDIDATE clue, not proof of parentage',()=>{
 const x=prepare();
 const prior={bio:x.n.biography,life:x.GUIDE_PROFILES.thomas_prather.life,
   edges:JSON.stringify(x.DATA.edges),records:x.n.evidence.length};
 vm.runInContext(src,x.context,{timeout:3000});
 assert.equal(x.n.evidence.length,prior.records+1);
 const source=x.n.evidence.find(e=>e.a055CandidateNotCertified===true);
 assert.ok(source);
 assert.match(source.title,/CANDIDATE/);
 assert.match(source.summary,/Louella Roberts/);
 assert.match(source.summary,/Clay, Reba, Benjamin, Thomas, John and Roy/);
 assert.match(source.provenance,/Exact page scan not inspected/);
 assert.equal(x.n.sourceAudit.thomasEstilSameAs1885ThomasProven,false);
 assert.equal(x.n.sourceAudit.bookPageOriginalScanInspected,false);
 assert.equal(x.n.sourceAudit.relationPromotionAllowed,false);
 assert.equal(x.n.sourceAudit.originalMediaBytesCaptured,0);
 assert.equal(x.GUIDE_PROFILES.thomas_prather.life,prior.life);
 assert.equal(x.n.biography,prior.bio);
 assert.equal(JSON.stringify(x.DATA.edges),prior.edges);
 assert.equal(x.n.historicalNotes.length,1);
 assert.match(x.n.historicalNotes[0].paragraphs[2],/not separate corroborating witnesses/);
 vm.runInContext(src,x.context,{timeout:3000});
 assert.equal(x.n.evidence.length,prior.records+1);
 assert.equal(x.n.historicalNotes.length,1);
});
test('A055 remains staged-only and adds no audio, portrait, PWA or source binary',()=>{
 assert.equal(html.split('thomas-prather-1885-clay-household-candidate-a055.js?v=20261111-a055').length-1,1);
 assert.ok(!src.includes('.mp3'));
 assert.ok(!src.includes('portrait ='));
 assert.ok(!src.includes('DATA.edges.push'));
 assert.ok(!src.includes('parents.push'));
});
