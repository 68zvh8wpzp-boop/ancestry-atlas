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
const docs=p.evidence.filter(e=>e.kind==='document');
const photos=p.evidence.filter(e=>e.kind==='photo');
assert.equal(photos.length,3,'Keep the three distinct installed family photos; do not duplicate the old group scene');
assert.equal(docs.length,5,'1879 birth index; 1880 census citation; 1899 marriage index; 1900 original; 1930 census source');
assert.equal(docs.filter(e=>!!e.full).length,1,'Only the genuine packaged 1900 manuscript scan is locally installed');
assert.equal(docs.filter(e=>!!e.sourcePage&&!e.full&&!e.thumb).length,4,'Four other records must be link-only until actual scans are available');
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
assert(birth1879?.sourcePage?.includes('F451-1XH')&&!birth1879.thumb,'1879 record must remain index-only');
assert(census1880?.sourceLevel==='collection'&&census1880.sourcePage?.includes('1417683'),'1880 source is a collection retrieval lead, not a person-specific image');
assert(marriage1899?.sourceLevel==='index'&&marriage1899.sourcePage?.includes('N3FS-5ZD'),'1899 marriage must be linked accurately');
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
assert(html.includes('jessie-aurin-mobile-biography.js?v=20261009-jessie-2'),'Load the revised Jessie evidence module');
assert(entry.includes('iphone-refresh=20261009-jessie-2'),'iPhone entry route cache refresh must change');
assert(manifest.includes('iphone-refresh=20261009-jessie-2'),'Installed PWA manifest start URL must change');
assert(richard.includes("moduleVersion:'20261009-skinner-7'"),'Previously approved Richard module must remain unchanged');
const register=fs.readFileSync('JESSIE_AURIN_EVIDENCE_REGISTER_2026-10-09.md','utf8');
for(const phrase of ['John Auene','Jonas Aurin','Karl Johan Aurén','Amelia Cotton','1930'])assert(register.includes(phrase),'Missing parent identity conflict or Mesa source: '+phrase);
for(const[i,script]of [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean).entries()) new vm.Script(script,{filename:'Atlas script '+i});
console.log('PASS: Jessie Aurin biography and 3 photos preserved; genuine 1900 original and 4 correctly linked citations; iPhone cache version; John/Jonas/Karl Johan conflict retained.');
