import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const src=readFileSync(new URL('inez-1954-lakeside-school-family-identification-a065.js',root),'utf8');
function fixture(){
 const previous='The 1954–1955 Lakeside schoolchildren photograph in the same county collection is captioned with an “Inez Prather” among seated pupils. That is a candidate historical record for Inez Karen Prather, handled in the separate Inez original-photo queue rather than merged into Jonathan’s personal portrait gallery. No identity promotion was made.';
 const DATA={nodes:[
 {id:'inez_karen',biography:'Inez approved memoir (FROZEN)',note:'approved Inez note',years:'1946–',evidence:[{kind:'photo',title:'Existing memoir photo',full:'assets/inez-life-story/image4.jpeg'},{kind:'photo',title:'Inez 1963 seniors',full:'assets/inez-life-story/image6.jpeg'}],historicalNotes:[]},
 {id:'jonathan_henry',historicalNotes:[{title:'WEBB SAWMILL PHOTOGRAPH AND FAMILY ORAL HISTORY — SOURCE BOUNDARIES',paragraphs:[previous]}],evidence:[{title:'existing Jonathan source'}]}
 ],edges:[{a:'inez_karen',b:'grace_hill',confidence:'strong'}]};
 const TOUR_MEDIA={inez_karen:{transcript:'Frozen Inez audio',scenes:[{src:'unchanged.jpg'}]},jonathan_henry:{transcript:'frozen'}};
 const GUIDE_PROFILES={inez_karen:{life:'Approved Inez memoir'}};
 return {DATA,TOUR_MEDIA,GUIDE_PROFILES,previous};
}
test('A065: family-identified institutional school class and 1963 comparison, no false original capture',()=>{
 const {DATA,TOUR_MEDIA,GUIDE_PROFILES,previous}=fixture();
 const originalEdges=JSON.stringify(DATA.edges),originalTour=JSON.stringify(TOUR_MEDIA),originalGuide=JSON.stringify(GUIDE_PROFILES);
 const c=vm.createContext({DATA,TOUR_MEDIA,GUIDE_PROFILES});
 const photoCountBefore=DATA.nodes[0].evidence.length;
 vm.runInContext(src,c,{timeout:3500});
 const n=DATA.nodes[0],p=n.evidence.find(x=>x.a065SchoolImageId==='navajo-county-341');
 assert.ok(p);
 assert.equal(p.kind,'photo');
 assert.equal(p.sourcePhotoId,'341');
 assert.match(p.personPosition,/third from viewer’s left/);
 assert.match(p.sourceInstitution,/Navajo County Library District/);
 assert.match(p.provenance,/family member/);
 assert.match(p.provenance,/Grace Jackson/);
 assert.equal(p.schoolYearbookRosterMatches1963.length,6);
 assert.equal(p.localOriginalArchivalAsset,false);
 assert.equal(p.rightsForRedistributionVerified,false);
 assert.equal(p.installedIphonePhotoLoaded,false);
 assert.match(p.full,/school-children-in-lakeside\.jpg/);
 assert.equal(n.sourceAudit.familyIdentificationConfirmed,true);
 assert.equal(n.sourceAudit.originalSchoolPhotoHighResolutionAcquired,false);
 assert.equal(n.sourceAudit.newOriginalFilesDownloaded,0);
 assert.equal(n.sourceAudit.narrationAndStoryFrozen,true);
 assert.equal(n.evidence.length,photoCountBefore+1);
 assert.equal(n.biography,'Inez approved memoir (FROZEN)');
 assert.equal(n.years,'1946–');
 assert.equal(DATA.nodes[1].historicalNotes[0].paragraphs[0].includes('candidate historical record'),false);
 assert.equal(JSON.stringify(DATA.edges),originalEdges);
 assert.equal(JSON.stringify(TOUR_MEDIA),originalTour);
 assert.equal(JSON.stringify(GUIDE_PROFILES),originalGuide);
 vm.runInContext(src,c,{timeout:3500});
 assert.equal(n.evidence.length,photoCountBefore+1);
 assert.equal(n.historicalNotes.length,1);
 assert.equal(DATA.nodes[1].historicalNotes[0].paragraphs.length,1);
});
test('A065 installs once after source-specific A064 and memoir module, no original local media added',()=>{
 const tag='inez-1954-lakeside-school-family-identification-a065.js?v=20261112-a065';
 assert.equal(html.split(tag).length-1,1);
 assert.ok(html.indexOf(tag)>html.indexOf('jonathan-webb-local-history-sawmill-a064.js?v=20261112-a064'));
 assert.ok(html.indexOf(tag)>html.indexOf('inez-mobile-memoir.js'));
 assert.doesNotMatch(src,/DATA\.edges\.push|TOUR_MEDIA\.inez_karen\s*=|\.mp3'/);
});
