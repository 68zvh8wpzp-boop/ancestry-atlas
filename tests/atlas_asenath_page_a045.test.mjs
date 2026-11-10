import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const src=readFileSync(new URL('asenath-browning-original-marriage-page-a045.js',root),'utf8');
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');

function execute(){
  const person={id:'asenath_browning',name:'Asenath Elizabeth Browning',years:'1835–1899',evidence:[]};
  const other={id:'isaac_carling',name:'Isaac Van Wagoner Carling',evidence:[{id:'isaac-existing'}]};
  const DATA={nodes:[person,other],edges:[{a:'sarah_carling',b:'asenath_browning',confidence:'strong'}]};
  const GUIDE_PROFILES={};
  vm.runInNewContext(src,{DATA,GUIDE_PROFILES},{filename:'asenath-browning-original-marriage-page-a045.js',timeout:3000});
  return {person,other,DATA,GUIDE_PROFILES};
}
test('Asenath profile gains biography with source cautions and leaves parent graph intact',()=>{
  const {person,other,DATA,GUIDE_PROFILES}=execute();
  assert.match(GUIDE_PROFILES.asenath_browning.life,/23 November 1854 announced/);
  assert.match(GUIDE_PROFILES.asenath_browning.life,/17 November by Ezra T\. Benson/);
  assert.match(GUIDE_PROFILES.asenath_browning.life,/Miriam Elizabeth Hobson/);
  assert.match(GUIDE_PROFILES.asenath_browning.life,/precise birthplace remains a question/);
  assert.ok(GUIDE_PROFILES.asenath_browning.life.length>2500);
  assert.equal(person.sourceAudit.full_certification,false);
  assert.equal(DATA.edges.length,1);
  assert.equal(other.evidence.length,1);
  assert.equal(person.years,'1835–1899');
});
test('Reuse one physically saved original, not create a new photo or document',()=>{
  const {person}=execute();
  const doc=person.evidence.find(e=>e.id==='asenath-1854-marriage-original-reused');
  assert.equal(doc.kind,'document');
  assert.equal(doc.sourceLevel,'original');
  assert.ok(statSync(new URL(doc.originalAsset,root)).size>100000);
  assert.ok(statSync(new URL(doc.full,root)).size>50000);
  assert.match(doc.provenance,/1854/);
  assert.ok(!person.evidence.some(e=>e.kind==='photo'));
});
test('supplement is late-loaded only once and does not modify the installation manifest',()=>{
  assert.equal(html.split('asenath-browning-original-marriage-page-a045.js?v=20261110-a045').length-1,1);
  assert.ok(html.includes('isaac-carling-1854-marriage-original-media-20261018.js'));
});
