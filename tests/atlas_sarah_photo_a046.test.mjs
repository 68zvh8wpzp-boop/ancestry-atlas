import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const src=readFileSync(new URL('sarah-carling-source-museum-a046.js',root),'utf8');
const key='const DATA = ',begin=html.indexOf(key)+key.length;
const data=JSON.parse(html.slice(begin,html.indexOf(';\n',begin)));
const photoPath='biographies/webb-branch/people/edward_milo_jr/assets/edward_jr_sarah_children_1891_family_use.png';

test('Sarah historically attributed 1891 FAMILY GROUP is local, not external or misidentified as solo',()=>{
  const p=data.nodes.find(n=>n.id==='sarah_carling');
  assert.ok(p);
  assert.equal(p.portrait.url,photoPath);
  assert.equal(p.portrait.familyGroup,true);
  assert.match(p.portrait.title,/family group/i);
  assert.match(p.portrait.provenance,/Flora Clark/);
  assert.match(p.portrait.provenance,/A. Miller/);
  assert.ok(statSync(new URL(photoPath,root)).size>50000);
  assert.ok(html.includes("cap.textContent=p.familyGroup?'Historical family photograph — group'"));
  assert.ok(html.includes("n.portrait.familyGroup?'Historical group photograph"));
  assert.ok(!p.portrait.title.toLowerCase().includes('solo'));
});
test('Sarah museum narrative and source cautions without graph mutation',()=>{
  const p={id:'sarah_carling',name:'Sarah Elizabeth Carling',evidence:[]};
  const other={id:'edward_milo_jr',evidence:[{id:'existing'}]};
  const DATA={nodes:[p,other],edges:[{a:'jonathan_henry',b:'sarah_carling',confidence:'strong'}]};
  const GUIDE_PROFILES={};
  vm.runInNewContext(src,{DATA,GUIDE_PROFILES},{filename:'sarah-carling-source-museum-a046.js',timeout:3000});
  const bio=GUIDE_PROFILES.sarah_carling.life;
  assert.ok(bio.split(/\s+/).length>950);
  assert.match(bio,/1922/);
  assert.match(bio,/Ellen Ashman/);
  assert.match(bio,/Charlotte/);
  assert.match(bio,/1949/);
  assert.match(bio,/1891/);
  assert.equal(p.sourceAudit.fullyCertified,false);
  assert.equal(p.sourceAudit.newHistoricalMasterBytes,0);
  assert.equal(DATA.edges.length,1);
  assert.equal(other.evidence.length,1);
  assert.equal(p.evidence.length,0,'family photo already resides on portrait field; avoid duplicate evidence card');
});
test('Live manifest/entrypoint unchanged; staging only',()=>{
  assert.equal((html.match(/sarah-carling-source-museum-a046\.js\?v=20261110-a046/g)||[]).length,1);
  assert.equal(data.nodes.length,109);
  assert.equal(data.edges.length,111);
  assert.equal(data.unions.length,4);
});
