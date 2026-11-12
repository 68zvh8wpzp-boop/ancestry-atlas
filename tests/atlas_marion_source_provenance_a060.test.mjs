import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const loader=readFileSync(new URL('atlas-content.js',root),'utf8');
const src=readFileSync(new URL('marion-context-and-document-provenance-a060.js',root),'utf8');
const contextPaths=[
 ['Marion’s birthplace context','marion_birth_house_candidate_conservative.jpg'],
 ['Westward in 1925','marion_1925_journey_candidate.jpg'],
 ['Childhood across the Southwest','marion_arizona_childhood_candidate.jpg'],
 ['Work and school','marion_school_independence_candidate.jpg']
];
test('A060 audit is installed after dynamic Marion loader and before page close',()=>{
 assert.match(loader,/marion-atlas-update-2026-09-29.js/);
 assert.equal(html.split('marion-context-and-document-provenance-a060.js?v=20261112-a060').length-1,1);
 assert.ok(html.indexOf('marion-context-and-document-provenance-a060.js')>html.indexOf('atlas-content.js?v=20261010-globe-1'));
});
test('A060 annotates four context photos and eight PDF links, preserves approved content',()=>{
 const evidence=[
  ...contextPaths.map(([title,file])=>({title,kind:'photo',full:'biographies/marion/assets/'+file,thumb:'biographies/marion/assets/'+file})),
  ...Array.from({length:8},(_,i)=>({kind:'document',title:'Memories PDF '+i,
    thumb:'assets/marion-docs-preview/'+i+'.jpg',
    full:'https://sg30p0.familysearch.org/service/records/storage/dascloud/patron/v2/TH-'+i+'/dist.pdf?ctx=ArtCtxPublic'})),
  {kind:'photo',title:'1942 Brenay siblings and father at Sandpoint',full:'assets/charles-albert/charles-family-1942.jpg'}
 ];
 const DATA={nodes:[{id:'marion_brenay',biography:'historically approved',note:'approved',evidence,historicalNotes:[]}],
  edges:[{a:'marion_brenay',b:'charles_albert'}]};
 const TOUR_MEDIA={marion_brenay:{transcript:'approved; freeze',audio:'unchanged.mp3'}};
 const GUIDE_PROFILES={marion_brenay:{life:'historically approved'}};
 const context=vm.createContext({DATA,TOUR_MEDIA,GUIDE_PROFILES});
 const graph=JSON.stringify(DATA.edges),bio=DATA.nodes[0].biography,oldTour=JSON.stringify(TOUR_MEDIA),oldGuide=JSON.stringify(GUIDE_PROFILES);
 vm.runInContext(src,context,{timeout:4000});
 const p=DATA.nodes[0];
 assert.equal(p.sourceAudit.matchingContextEntries,4);
 assert.equal(p.sourceAudit.matchingRemotePdfWithLocalJpgPreview,8);
 assert.equal(p.sourceAudit.originalNewImagesDownloaded,0);
 assert.equal(p.sourceAudit.personPageFullyCertified,false);
 for(const x of evidence.slice(0,4)){
  assert.equal(x.photoOfMarionOrHerFamilyVerified,false);
  assert.match(x.mediaAuditType,/context-illustration/);
 }
 for(const x of evidence.slice(4,12)){
  assert.equal(x.previewLocallyStored,true);
  assert.equal(x.completePdfGitHubPackaged,false);
 }
 assert.equal(evidence[12].mediaAuditType,undefined);
 assert.equal(p.historicalNotes.length,1);
 assert.equal(p.biography,bio);
 assert.equal(JSON.stringify(DATA.edges),graph);
 assert.equal(JSON.stringify(TOUR_MEDIA),oldTour);
 assert.equal(JSON.stringify(GUIDE_PROFILES),oldGuide);
 vm.runInContext(src,context,{timeout:4000});
 assert.equal(p.historicalNotes.length,1);
});
