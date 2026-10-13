import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const html=fs.readFileSync('atlas-v3.9.36.html','utf8');
const source=fs.readFileSync('jessie-aurin-mobile-biography.js','utf8');
const entry=fs.readFileSync('index.html','utf8');
const manifest=fs.readFileSync('manifest.webmanifest','utf8');
const richard=fs.readFileSync('richard-skinner-mobile-biography.js','utf8');
const data={nodes:[{id:'jessie_irene_aurin',hold:{kind:'document'}}]};
const guide={};const media={};
vm.runInNewContext(source,{DATA:data,GUIDE_PROFILES:guide,TOUR_MEDIA:media},{timeout:3000});
const p=data.nodes[0];
const featuredTitles=[
 'Jessie Skinner — 1956 Alpena News obituary',
 'The Alpena News — obituary issue-date and page verification',
 'Jessie Skinner — photographed grave marker (1897–1956)'
];
for(let n=0;n<featuredTitles.length;n++){
 assert.equal(p.evidence[n].title,featuredTitles[n],'Three authentic 1956 source images should appear before older link-only records');
 assert(p.evidence[n].full?.startsWith('assets/jessie-aurin/1956-'),'Featured source must display the archived image');
}
assert(html.includes('galleryRank(a)-galleryRank(b)'),'Show genuine 1956 media first in the Documents carousel');
assert(html.includes('Swipe sideways for more'),'Swipe affordance required on phone');
const docs=p.evidence.filter(e=>e.kind==='document');
const photos=p.evidence.filter(e=>e.kind==='photo');
assert.equal(photos.length,3,'Keep the three distinct installed family photos; do not duplicate the old group scene');
assert(docs.length>=17,'Preserve original Michigan family records and the three newly published 1956 source images');
assert(docs.filter(e=>!!e.full&&!!e.thumb).length>=4,'The 1900 census and three 1956 document images must have authentic packaged files and previews');
assert(docs.filter(e=>!!e.sourcePage&&!e.full&&!e.thumb).length>=10,'Continue linking original images retained in the private research Library without inventing public previews');
const census1900=docs.find(e=>e.title.includes('1900 census'));
const census1930=docs.find(e=>e.title.includes('1930 census'));
const birth1879=docs.find(e=>e.title.includes('1879'));
const census1880=docs.find(e=>e.title.includes('1880'));
const marriage1899=docs.find(e=>e.title.includes('1899'));
assert(census1900?.full&&census1900?.thumb,'Real 1900 manuscript and preview required');
for(const key of ['full','thumb']){
 const f=path.join(process.cwd(),census1900[key]);
 assert(fs.existsSync(f),'Missing original or preview: '+f);
 const bytes=fs.readFileSync(f);
 assert(bytes.length>20000,'Image unexpectedly small');
 assert(bytes[0]===255&&bytes[1]===216,'Scanned document must be a genuine JPEG');
}
assert(census1900.full=== 'assets/richard-skinner/richard-skinner-census-1900-original.jpg','Reuse Richard original without recapturing or duplicating bytes');
assert(census1930?.sourcePage?.includes('33SQ-GR4R-H5J')&&!census1930.full,'1930 original-image link not misrepresented as installed scan');
assert(census1930?.transcription?.includes('Amanda Skinner')&&census1930.transcription?.includes('FULLTEXT_TRANSLATION:'),'1930 verified household extract and translation status required');
assert(birth1879?.sourcePage?.includes('F451-1XH')&&birth1879.sourceLevel==='original'&&!birth1879.thumb,'1879 original inspected and stored privately, with no fabricated public preview');
assert(census1880?.sourceLevel==='original'&&census1880.sourcePage?.includes('33SQ-GYBF-S9GN'),'The original 1880 Aurin census is now verified at a specific image');
assert(marriage1899?.sourceLevel==='index'&&marriage1899.sourcePage?.includes('N3FS-5ZD'),'1899 marriage must be linked accurately');
const newlyPublished1956=[
  ['1956 Alpena News obituary','assets/jessie-aurin/1956-jessie-alpena-news-obituary-page-2.jpg'],
  ['photographed grave marker','assets/jessie-aurin/1956-jessie-spratt-cemetery-headstone.jpg'],
  ['issue-date and page verification','assets/jessie-aurin/1956-jessie-alpena-news-date-page-proof.jpg']
];
for(const [title,expectedPath] of newlyPublished1956){
 const item=docs.find(e=>e.title.includes(title));
 assert(item,'Missing new 1956 evidence entry: '+title);
 assert.equal(item.full,expectedPath,'The source record must display the correct actual image');
 assert.equal(item.thumb,expectedPath,'Its thumbnail must display the correct actual image');
 assert(item.transcription?.includes('FULLTEXT_ORIGINAL:')&&item.transcription.includes('FULLTEXT_TRANSLATION:'),'Document transcription and translation status required');
 const bytes=fs.readFileSync(expectedPath);
 assert(bytes.length>25000&&bytes[0]===255&&bytes[1]===216,'Published 1956 image must be a nonempty actual JPEG');
}
assert(docs.find(e=>e.title.includes('grave marker'))?.summary.includes('1879'),'The genuine 1897 marker must retain its explicit 1879 conflict note');
assert(p.biography.includes('By April 1930, Jessie was living in Mesa, Arizona'),'Preserve the existing published Mesa narrative');
assert(p.biography.includes('Jessie died on 5 March 1956'),'Preserve the existing biography ending');
assert(p.CONTEXT.length<230,'Keep context short and distinct from the biography');
assert(media.jessie_irene_aurin?.scenes?.length===3,'Preserve the three gallery/story photographs');
assert(!p.hold,'Do not resurrect an obsolete visible hold');
for(const e of photos){
 assert(fs.existsSync(e.thumb)&&fs.existsSync(e.full),'Existing Jessie family photograph missing');
}
assert(html.includes("n.id==='jessie_irene_aurin'"),'Jessie document links must appear in her Documents section');
assert(html.includes("sourceLinkedRichards.includes(e)"),'Existing Richard linked-source layout must not regress');
assert(html.includes('jessie-aurin-mobile-biography.js?v=20261013-jessie-1956-mobile-gallery-3'),'Load the revised Jessie evidence module');
const release=entry.match(/iphone-refresh=([A-Za-z0-9-]+)/)?.[1];
assert(release,'iPhone entry must carry a release token');
assert(manifest.includes('iphone-refresh='+release),'Installed PWA and root entry must match');
assert(richard.includes("moduleVersion:'20261011-skinner-8'"),'Previously approved Richard module must remain available');
const register=fs.readFileSync('JESSIE_AURIN_EVIDENCE_REGISTER_2026-10-09.md','utf8');
for(const phrase of ['John Auene','Jonas Aurin','Karl Johan Aurén','Amelia Cotton','1930'])assert(register.includes(phrase),'Missing parent identity conflict or Mesa source: '+phrase);
for(const[i,script]of [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean).entries()) new vm.Script(script,{filename:'Atlas script '+i});
console.log('PASS: Jessie Aurin accepted biography, 3 family photos, 17+ documents, three authentic 1956 image assets, iPhone release consistency, parentage conflict retained.');
