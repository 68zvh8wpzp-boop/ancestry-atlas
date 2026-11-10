import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, statSync} from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const moduleCode=readFileSync(new URL('jay-1950-census-source-crosslink-a051.js',root),'utf8');
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
function setup(){
 const record={kind:'document',title:'1950 United States census — Webb household, Apache County',
  full:'assets/sheldon/james-sheldon-1950-census-viewer.jpg',
  sourcePage:'https://www.familysearch.org/ark:/61903/3:1:3QHN-LQH7-TGLJ',
  provenance:'Original 1950 U.S. census viewer, Apache County AZ ED1-6.',
  summary:'James W Webb, Marion B Webb, James S Webb, Diane Webb'
 };
 const jay={id:'james_wilford',evidence:[{title:'Jay in Vernon',full:'assets/jay/jay-in-vernon.jpg'}],historicalNotes:[],portrait:{url:'assets/jay/james-wilford-webb-portrait.jpg'},note:'Approved'};
 const sheldon={id:'james_sheldon',evidence:[record]};
 const DATA={nodes:[jay,sheldon],edges:[{a:'james_sheldon',b:'james_wilford',confidence:'strong'}]};
 const TOUR_MEDIA={james_wilford:{audio:'approved-audio/fable/James_wilford_webb.mp3',transcript:'Approved narration',scenes:[{src:'approved-story-photo.jpg'}]}};
 return {DATA,TOUR_MEDIA,jay,sheldon};
}
test('A051 links a single existing 1950 source to Jay without duplicating it',()=>{
 const st=setup();const before=JSON.stringify(st.TOUR_MEDIA);
 vm.runInNewContext(moduleCode,{DATA:st.DATA,TOUR_MEDIA:st.TOUR_MEDIA},{timeout:3000});
 assert.equal(st.jay.evidence.length,2);
 assert.equal(st.jay.sourceAudit.newGalleryDocsAdded,1);
 assert.equal(st.jay.sourceAudit.newOriginalBytesCaptured,0);
 assert.match(st.jay.evidence[1].title,/1950/);
 assert.match(st.jay.historicalNotes[0].paragraphs[0],/Apache County/);
 assert.equal(st.jay.portrait.url,'assets/jay/james-wilford-webb-portrait.jpg');
 assert.equal(st.DATA.edges.length,1);
 assert.equal(JSON.stringify(st.TOUR_MEDIA),before);
 vm.runInNewContext(moduleCode,{DATA:st.DATA,TOUR_MEDIA:st.TOUR_MEDIA},{timeout:3000});
 assert.equal(st.jay.evidence.length,2);
 assert.equal(st.jay.historicalNotes.length,1);
});
test('A051 uses packaged source files and does not alter narrator assets',()=>{
 assert.equal(html.split('jay-1950-census-source-crosslink-a051.js?v=20261110-a051').length-1,1);
 assert.ok(statSync(new URL('assets/sheldon/james-sheldon-1950-census-viewer.jpg',root)).size>10000);
 assert.ok(statSync(new URL('assets/jay/james-wilford-webb-portrait.jpg',root)).size>10000);
});
