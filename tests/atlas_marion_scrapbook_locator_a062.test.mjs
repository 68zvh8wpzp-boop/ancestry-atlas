import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('atlas-v3.9.62.html',root),'utf8');
const src=readFileSync(new URL('marion-1991-anniversary-scrapbook-locator-a062.js',root),'utf8');
test('A062 1991 original-page source remains explicitly UNINSPECTED, no false second witness',()=>{
 const DATA={nodes:[{id:'marion_brenay',biography:'APPROVED',historicalNotes:[],evidence:[
 {title:'1991 50th',kind:'document',full:'https://sg30p0.familysearch.org/service/records/storage/dascloud/patron/v2/TH-7714-165878-331848-94/dist.pdf?ctx=ArtCtxPublic'}]}],edges:[{a:'marion_brenay',b:'marian_skinner',confidence:'strong'}]};
 const TOUR_MEDIA={marion_brenay:{transcript:'frozen',scenes:[],audio:null}};
 const c=vm.createContext({DATA,TOUR_MEDIA});
 const edge=JSON.stringify(DATA.edges),media=JSON.stringify(TOUR_MEDIA);
 vm.runInContext(src,c,{timeout:2500});
 const p=DATA.nodes[0],e=p.evidence[0];
 assert.equal(e.secondRepositoryItemId,'251742');
 assert.match(e.secondRepositoryTitle,/Volume 14/);
 assert.match(e.secondRepositoryRecordClass,/not independent/);
 assert.equal(e.secondRepositoryPageImageRead,false);
 assert.equal(e.secondRepositoryOriginalPdfDownloaded,false);
 assert.equal(p.sourceAudit.newUniqueMediaQueueItemsA062,0);
 assert.equal(p.sourceAudit.installedIphoneQA,false);
 assert.match(p.historicalNotes[0].paragraphs[1],/UNKNOWN/);
 assert.equal(p.biography,'APPROVED');
 assert.equal(JSON.stringify(DATA.edges),edge);
 assert.equal(JSON.stringify(TOUR_MEDIA),media);
 vm.runInContext(src,c,{timeout:2500});
 assert.equal(p.historicalNotes.length,1);
});
test('A062 loader occurs once after A061',()=>{
 const a='marion-archived-memory-pdfs-a061.js?v=20261112-a061', b='marion-1991-anniversary-scrapbook-locator-a062.js?v=20261112-a062';
 assert.equal(html.split(b).length-1,1);
 assert.ok(html.indexOf(b)>html.indexOf(a));
});
