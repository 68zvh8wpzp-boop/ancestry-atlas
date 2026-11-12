import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const src=readFileSync(new URL('inez-sheldon-1965-wedding-original-capture-state-a068.js',root),'utf8');
test('A068 private wedding image capture state never fabricates a broken gallery item or modifies approved sources',()=>{
 const DATA={nodes:[
  {id:'inez_karen',biography:'approved Inez biography',evidence:[{kind:'photo',full:'assets/inez-life-story/image44.jpeg'}]},
  {id:'james_sheldon',biography:'approved Sheldon biography',evidence:[{kind:'photo',full:'assets/sheldon/james-sheldon-wedding-original.jpg'}]}],
  edges:[{a:'inez_karen',b:'grace_hill'},{a:'you',b:'inez_karen'}]};
 const TOUR_MEDIA={inez_karen:{transcript:'frozen',audio:'original.mp3'},james_sheldon:{transcript:'frozen',audio:'old.mp3'}};
 const GUIDE_PROFILES={inez_karen:{life:'approved'},james_sheldon:{life:'approved'}};
 const c=vm.createContext({DATA,TOUR_MEDIA,GUIDE_PROFILES});
 const g=JSON.stringify(DATA.edges),t=JSON.stringify(TOUR_MEDIA),p=JSON.stringify(GUIDE_PROFILES),media=JSON.stringify(DATA.nodes.map(n=>n.evidence));
 vm.runInContext(src,c,{timeout:3000});
 for(const node of DATA.nodes){
  assert.equal(node.sourceAudit.weddingActualCeremonyDate,'1965-01-21');
  assert.equal(node.sourceAudit.weddingPhotoOriginalPrivateLibrarySaved,true);
  assert.equal(node.sourceAudit.weddingPhotoPublicAtlasMediaPackaged,false);
  assert.equal(node.sourceAudit.weddingPhotoGalleryCardAdded,false);
  assert.equal(node.sourceAudit.separate12Jun1965MesaSealingStillDistinct,true);
  assert.equal(node.sourceAudit.originalImagePageVisuallyInspected,true);
  assert.equal(node.sourceAudit.manuscriptEntire118PageAuditCertified,false);
  assert.equal(node.sourceAudit.personPageFullyCertified,false);
  assert.match(node.sourceAudit.weddingPhotoOriginalSHA256,/^[0-9a-f]{64}$/);
 }
 assert.equal(JSON.stringify(DATA.edges),g);
 assert.equal(JSON.stringify(TOUR_MEDIA),t);
 assert.equal(JSON.stringify(GUIDE_PROFILES),p);
 assert.equal(JSON.stringify(DATA.nodes.map(n=>n.evidence)),media);
 vm.runInContext(src,c,{timeout:3000});
 assert.equal(JSON.stringify(DATA.nodes.map(n=>n.evidence)),media);
});
test('A068 late source metadata loaded once and no private hospital photo text exposed in client asset',()=>{
 const tag='inez-sheldon-1965-wedding-original-capture-state-a068.js?v=20261112-a068';
 assert.equal(html.split(tag).length-1,1);
 assert.ok(html.indexOf(tag)>html.indexOf('inez-memoir-unused-images-caption-preflight-a067.js?v=20261112-a067'));
 assert.ok(!/hospital|glioblastoma|medical|image41|image42/i.test(src));
 assert.doesNotMatch(src,/DATA\.edges\.push|TOUR_MEDIA\.|\.evidence\.push/);
});
