import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const src=readFileSync(new URL('jay-webb-named-sawmill-crew-photo-a066.js',root),'utf8');
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
test('A066 institutional crew photo distinct from older Jay group; no personal-portrait overclaim',()=>{
 const DATA={nodes:[{id:'james_wilford',biography:'approved',note:'approved',evidence:[
  {title:'Vernon sawmill — Jay Webb',full:'assets/jay/jay-vernon-sawmill-1.jpg',summary:'previous photo'},
  {title:'Jay in Vernon',full:'assets/jay/jay-in-vernon.jpg',summary:'Portrait/context image placing Jay'}
 ],historicalNotes:[]}],edges:[{a:'james_wilford',b:'jonathan_henry'}]};
 const TOUR_MEDIA={james_wilford:{transcript:'frozen',scenes:[],audio:'frozen.mp3'}};
 const GUIDE_PROFILES={james_wilford:{life:'approved'}};
 const c=vm.createContext({DATA,TOUR_MEDIA,GUIDE_PROFILES});
 const g=JSON.stringify(DATA.edges),t=JSON.stringify(TOUR_MEDIA),p=JSON.stringify(GUIDE_PROFILES);
 vm.runInContext(src,c,{timeout:3500});
 const jay=DATA.nodes[0],crew=jay.evidence.find(e=>e.a066NamedCrewPhotoId==='navajo-county-414');
 assert.ok(crew);
 assert.equal(crew.kind,'photo');
 assert.equal(crew.institutionNamesFromCaption.length,9);
 assert.ok(crew.institutionNamesFromCaption.includes('Jay Webb'));
 assert.equal(crew.verifiedDistinctFromExistingLargerGroup,true);
 assert.equal(crew.localOriginalSaved,false);
 assert.equal(crew.licensedForRedistributionVerified,false);
 assert.equal(crew.iphoneRendered,false);
 assert.match(crew.sourcePage,/navajocountyhistory/);
 assert.match(crew.full,/webb-sawmill-crew\.jpg/);
 const prior=jay.evidence.find(e=>e.title==='Jay in Vernon');
 assert.equal(prior.photoShowsClearlyIdentifiableJay,false);
 assert.match(prior.summary,/no individual person is clearly identifiable/);
 assert.match(prior.a066PriorSummary,/Portrait/);
 const group=jay.evidence.find(e=>e.title==='Vernon sawmill — Jay Webb');
 assert.equal(group.a066DistinctFromInstitutionalNineWorkerPhoto,true);
 assert.equal(jay.sourceAudit.newOriginalImageFileBytes,0);
 assert.equal(jay.sourceAudit.duplicateImagesAdded,0);
 assert.equal(jay.historicalNotes.length,1);
 assert.equal(jay.biography,'approved');
 assert.equal(JSON.stringify(DATA.edges),g);
 assert.equal(JSON.stringify(TOUR_MEDIA),t);
 assert.equal(JSON.stringify(GUIDE_PROFILES),p);
 vm.runInContext(src,c,{timeout:3500});
 assert.equal(jay.historicalNotes.length,1);
 assert.equal(jay.evidence.filter(e=>e.a066NamedCrewPhotoId==='navajo-county-414').length,1);
});
test('A066 loaded one time after A065 in staged entrypoint',()=>{
 const b='jay-webb-named-sawmill-crew-photo-a066.js?v=20261112-a066';
 assert.equal(html.split(b).length-1,1);
 assert.ok(html.indexOf(b)>html.indexOf('inez-1954-lakeside-school-family-identification-a065.js?v=20261112-a065'));
 assert.doesNotMatch(src,/DATA\.edges\.push|TOUR_MEDIA\.james_wilford\s*=/);
});
