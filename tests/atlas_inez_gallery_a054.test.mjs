import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync,statSync} from 'node:fs';

const root = new URL('../',import.meta.url);
const memoir = readFileSync(new URL('inez-mobile-memoir.js',root),'utf8');
const restored = readFileSync(new URL('inez-family-gallery-reuse-a054.js',root),'utf8');
const html = readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const preserved = [
 'assets/sheldon/james-sheldon-wedding-announcement.jpg',
 'assets/sheldon/james-sheldon-wedding-original.jpg',
 'assets/sheldon/james-sheldon-wedding-reception.jpg',
 'assets/sheldon/james-sheldon-inez-shared.jpg',
 'assets/sheldon/james-sheldon-newborn-visit.jpg'
];
function hydrate(){
 const person={id:'inez_karen',note:'previous name'};
 const other={id:'james_sheldon',portrait:'unchanged'};
 const DATA={nodes:[person,other],edges:[{a:'inez_karen',b:'james_sheldon',confidence:'strong'}]};
 const GUIDE_PROFILES={};
 const TOUR_MEDIA={inez_karen:{audio:'approved-mp3',scenes:[{src:'approved.png'}]}};
 const context=vm.createContext({DATA,GUIDE_PROFILES,TOUR_MEDIA});
 vm.runInContext(memoir,context,{timeout:3000});
 return {person,DATA,GUIDE_PROFILES,TOUR_MEDIA,context};
}
test('A054 restores the missing four photos and one family document without reacquiring any files',()=>{
 const h=hydrate(), i=h.person;
 const old = i.evidence;
 assert.equal(old.filter(x=>x.kind==='photo').length,39);
 assert.equal(old.filter(x=>x.kind==='document').length,0);
 const life = h.GUIDE_PROFILES.inez_karen.life;
 const portrait = JSON.stringify(i.portrait);
 const edges=JSON.stringify(h.DATA.edges);
 const story=JSON.stringify(h.TOUR_MEDIA);
 vm.runInContext(restored,h.context,{timeout:3000});
 assert.equal(i.evidence.filter(x=>x.kind==='photo').length,43);
 assert.equal(i.evidence.filter(x=>x.kind==='document').length,1);
 assert.equal(i.sourceAudit.currentDraftPhotoCount,43);
 assert.equal(i.sourceAudit.currentDraftDocumentCount,1);
 assert.equal(i.sourceAudit.addedMediaBytes,0);
 assert.equal(i.sourceAudit.iphoneValidated,false);
 assert.equal(i.sourceAudit.fullyCertified,false);
 assert.equal(h.GUIDE_PROFILES.inez_karen.life,life);
 assert.equal(JSON.stringify(i.portrait),portrait);
 assert.equal(JSON.stringify(h.DATA.edges),edges);
 assert.equal(JSON.stringify(h.TOUR_MEDIA),story);
 assert.equal(i.historicalNotes.length,1);
 vm.runInContext(restored,h.context,{timeout:3000});
 assert.equal(i.evidence.length,44);
 assert.equal(i.historicalNotes.length,1);
 for(const p of preserved)assert.equal(i.evidence.filter(x=>x.full===p).length,1,p);
});
test('A054 reuses existing five packaged photograph/document files and preserves source distinction',()=>{
 const h=hydrate();
 vm.runInContext(restored,h.context,{timeout:3000});
 for(const p of preserved)assert.ok(statSync(new URL(p,root)).size>20000,p);
 const wedding=h.person.evidence.find(x=>x.kind==='document');
 assert.match(wedding.summary,/not the original Navajo County marriage license/);
 assert.match(h.person.historicalNotes[0].paragraphs[0],/15 January 1965/);
 assert.match(h.person.historicalNotes[0].paragraphs[0],/21 January 1965/);
 assert.match(h.person.historicalNotes[0].paragraphs[0],/12 June 1965/);
 assert.equal(html.split('inez-family-gallery-reuse-a054.js?v=20261111-a054').length-1,1);
});


test('A054 records family-held Sheldon certificate without reading image or changing approved biography',()=>{
 const src = readFileSync(new URL('sheldon-owned-birth-certificate-ack-a054.js',root),'utf8');
 const oldText='James Sheldon Webb is documented in the 1950 Arizona federal census. His 1943 birth is supported by an indexed Arizona citation, but the actual certificate image has not yet been retrieved; Snowflake and an earlier St. Johns birthplace description require reconciliation.';
 const original={id:'james_sheldon',note:oldText,sourceAudit:{originalCensus1950:'existing'},
  historicalNotes:[{title:'THE SOURCE STATUS OF THE BIRTH, MARRIAGE AND MILITARY RECORDS',
    paragraphs:['The original birth-certificate image is not yet present in the Atlas. Remaining evidence uncertain.']}]};
 const DATA={nodes:[original],edges:[]};
 const GUIDE_PROFILES={james_sheldon:{life:'unchanged approved life biography'}};
 const ctx=vm.createContext({DATA,GUIDE_PROFILES});
 vm.runInContext(src,ctx,{timeout:3000});
 assert.match(original.note,/family reports possessing his birth certificate/);
 assert.equal(original.sourceAudit.certificateContentsInspected,false);
 assert.equal(original.sourceAudit.externalRecordAcquisitionNeeded,false);
 assert.equal(original.sourceAudit.birthPlaceConflictResolved,false);
 assert.equal(original.sourceAudit.deferredUntilOwnerSupplies,true);
 assert.match(original.historicalNotes[0].paragraphs[0],/family reports having the original birth certificate/);
 assert.equal(GUIDE_PROFILES.james_sheldon.life,'unchanged approved life biography');
 assert.equal(DATA.edges.length,0);
 const note=original.note;
 vm.runInContext(src,ctx,{timeout:3000});
 assert.equal(original.note,note);
 assert.equal(html.split('sheldon-owned-birth-certificate-ack-a054.js?v=20261111-a054').length-1,1);
});
