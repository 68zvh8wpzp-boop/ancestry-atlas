import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync,statSync} from 'node:fs';

const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const overlay=readFileSync(new URL('atlas-evidence-sync-2026-09-27.js',root),'utf8');
const corrective=readFileSync(new URL('atlas-sheldon-presentation-2026-09-30.js',root),'utf8');
const audit=readFileSync(new URL('sheldon-document-boundaries-a053.js',root),'utf8');

function hydrate(){
 const anchor=html.indexOf('const DATA = ');
 assert.ok(anchor>0);
 const DATA=JSON.parse(html.slice(anchor+13,html.indexOf(';\n',anchor)));
 const GUIDE_PROFILES={james_sheldon:{life:'Approved and unchanged biography'}};
 const document={readyState:'loading',addEventListener(){}};
 const ctx=vm.createContext({DATA,GUIDE_PROFILES,document});
 vm.runInContext(overlay,ctx,{timeout:6000});
 vm.runInContext(corrective,ctx,{timeout:3000});
 return {ctx,DATA,GUIDE_PROFILES,sheldon:DATA.nodes.find(n=>n.id==='james_sheldon')};
}

test('A053 real source overlay reconciles exactly 16 document slots and 36 photos without birth placeholder',()=>{
 const {ctx,sheldon}=hydrate();
 assert.equal(sheldon.evidence.filter(x=>x.kind==='document').length,14);
 assert.equal(sheldon.evidence.filter(x=>x.kind==='citation').length,2);
 assert.equal(sheldon.evidence.filter(x=>x.kind!=='document'&&x.kind!=='citation').length,36);
 const beforeEvidence=JSON.stringify(sheldon.evidence);
 const beforeEdges=JSON.stringify(ctx.DATA.edges);
 const beforePortrait=JSON.stringify(sheldon.portrait);
 const beforeBio=ctx.GUIDE_PROFILES.james_sheldon.life;
 vm.runInContext(audit,ctx,{timeout:3000});
 assert.equal(sheldon.sourceAudit.currentDraftDocumentCount,16);
 assert.equal(sheldon.sourceAudit.currentDraftLocalDocumentSlots,14);
 assert.equal(sheldon.sourceAudit.currentDraftCitationOnlySlots,2);
 assert.equal(sheldon.sourceAudit.currentDraftPhotoCount,36);
 assert.equal(sheldon.sourceAudit.currentDraftBirthPlaceholderCount,0);
 assert.equal(sheldon.sourceAudit.historicalUnreconciledPreviews,1);
 assert.equal(sheldon.sourceAudit.iphoneValidated,false);
 assert.match(sheldon.note,/indexed Arizona citation/);
 assert.match(ctx.GUIDE_PROFILES.james_sheldon.birthPlace,/original image pending/);
 assert.equal(JSON.stringify(sheldon.evidence),beforeEvidence);
 assert.equal(JSON.stringify(ctx.DATA.edges),beforeEdges);
 assert.equal(JSON.stringify(sheldon.portrait),beforePortrait);
 assert.equal(ctx.GUIDE_PROFILES.james_sheldon.life,beforeBio);
 assert.equal(sheldon.historicalNotes.length,1);
 vm.runInContext(audit,ctx,{timeout:3000});
 assert.equal(sheldon.historicalNotes.length,1);
 assert.equal(sheldon.evidence.length,52);
});
test('A053 14 locally linked document preview files are actually packaged, two citations have no fake image',()=>{
 const {ctx,sheldon}=hydrate();
 vm.runInContext(audit,ctx,{timeout:3000});
 const docs=sheldon.evidence.filter(x=>x.kind==='document');
 for(const item of docs){
   assert.ok(item.full?.startsWith('assets/sheldon/'),item.title);
   const stat=statSync(new URL(item.full,root));
   assert.ok(stat.size>15000,item.title+' preview unexpectedly small');
 }
 const cites=sheldon.evidence.filter(x=>x.kind==='citation');
 assert.equal(cites.length,2);
 for(const item of cites){
   assert.ok(!item.full&&!item.thumb,item.title+' must not pretend to have a scan');
   assert.ok(item.sourcePage?.startsWith('https://'),item.title+' needs source navigation');
 }
 assert.equal(html.split('sheldon-document-boundaries-a053.js?v=20261110-a053').length-1,1);
});
