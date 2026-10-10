import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';

const html=fs.readFileSync('atlas-v3.9.36.html','utf8');
const module=fs.readFileSync('richard-skinner-mobile-biography.js','utf8');
const entry=fs.readFileSync('index.html','utf8');
const manifest=fs.readFileSync('manifest.webmanifest','utf8');
const data={nodes:[{id:'richard_francis_skinner',hold:{kind:'document'}}]};
const tour={};
const guide={};
vm.runInNewContext(module,{DATA:data,GUIDE_PROFILES:guide,TOUR_MEDIA:tour},{timeout:3000});
const person=data.nodes[0];
const evidence=person.evidence;
const documents=evidence.filter(e=>e.kind==='document');
const originals=documents.filter(e=>e.sourceLevel==='original');
const indexed=documents.filter(e=>e.sourceLevel==='index');
const photos=evidence.filter(e=>e.kind==='photo');
assert.equal(documents.length,5,'Four original scan pages plus the 1899 indexed marriage citation');
assert.equal(originals.length,4,'Original 1882 marriage, both adjoining 1894 birth pages and 1900 census must be packaged');
assert.equal(indexed.length,1,'The 1899 marriage stays a labelled indexed-source link, not a fabricated scan');
assert.equal(photos.length,4,'Richard portrait, c.1906 family, snowy logging group and studio');
assert.equal(photos.filter(e=>e.full&&e.thumb).length,4,'All four photograph gallery entries require packaged full-resolution media and previews');
assert.equal(evidence.filter(e=>e.sourceLevel==='photo-link').length,0,'No formerly link-only family photo remains in this release');
assert(indexed.every(e=>!e.full&&!e.thumb),'The missing 1899 marriage image must remain link-only');

for(const e of [...originals,...photos]){
  assert(e.full?.startsWith('assets/'),'Full-size media must use a real packaged local source');
  assert(e.thumb?.startsWith('assets/'),'Thumbnail must be an authentic packaged asset');
  assert(e.sourcePage?.startsWith('https://www.familysearch.org/'),'Retain original source provenance URL');
  for(const p of [e.full,e.thumb]){
    assert(fs.existsSync(p),`Packaged file missing: ${p}`);
    const data=fs.readFileSync(p);
    assert(data.length>20000,`Empty or unusably tiny source image: ${p}`);
    assert.equal(data[0],0xff,'JPEG source has wrong file signature');
    assert.equal(data[1],0xd8,'JPEG source has wrong file signature');
  }
}
for(const e of originals) assert(e.sourcePage.includes('/ark:/61903/3:1:'),'Original source must have a record-specific image ARK');
for(const e of originals) assert(e.transcription?.startsWith('FULLTEXT_ORIGINAL:')&&e.transcription.includes('FULLTEXT_TRANSLATION:'),'Original and translation-status block must accompany original scans');
assert(evidence.find(e=>e.title.includes('Birth return')).additionalSourcePage.includes('S3HT-64JS-J9Y'),'Keep second page source link');
assert(originals.some(e=>e.transcription.includes('Jan. 1893'))&&originals.some(e=>e.transcription.includes('1894')),'Preserve the conflicting census and birth-register year readings');

const exactOriginalHashes={
  'richard-ellen-marriage-1882-original.jpg':'c3dcf02224784cc7a2c76e128a150035f511fabf3f55635f68dc1915fb064319',
  'marcie-skinner-birth-1894-child-original.jpg':'0bdfe48a375407f9ed63b527e6527187251351825eb35c78efd2c5cf93aec278',
  'marcie-skinner-birth-1894-parents-original.jpg':'8f6642ee577a797beed7ccefd5a883c77dc38dc434643fb89f0ef3e9d2358793',
  'richard-skinner-census-1900-original.jpg':'c68566829b22bc93759f1a7e8c17134bb6cb5f2fbe139d3da64f9eef80a8579f',
  'richard-marcie-logging-memory-218727497.jpg':'a4b8020b19068285e1603428d9f5b2b37db6c36711abd69fd994c14ee89aba11',
  'richard-william-carlton-memory-31066388.jpg':'16ea1f6af1d480c1ad4ddaa39b56fbe53681222c679289ce25632bceadeef833',
};
for(const[name,sha]of Object.entries(exactOriginalHashes)){
 const f=path.join('assets/richard-skinner',name);
 assert(fs.existsSync(f),`Archive original missing: ${f}`);
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'),sha,`Source original changed: ${f}`);
}
const studio=photos.find(e=>e.title.includes('studio portrait'));
assert(studio?.originalAsset,'Untouched studio original must remain separately accessible from the upright display derivative');
assert(fs.existsSync(studio.originalAsset),'Original studio photo missing');
assert(!person.hold,'Resolved research hold must not be resurrected');
assert(person.biography.length>2000,'Richard published biography must remain present');
assert(person.CONTEXT.length<250,'Brief context must remain distinct from full biography');
assert(tour.richard_francis_skinner.scenes.length>=4,'Four narrative photo scenes must remain present');
assert(html.includes("sourceLinkedRichards.includes(e)"),'Documents must display in the Documents gallery');
assert(html.includes("PHOTO SOURCE LINKS ("),'Fallback photo source links supported on other unfinished pages');
assert(html.includes("viewer.classList.toggle('source-only'"),'Link-only viewer must not have an empty image panel');
assert(html.includes("viewer.classList.toggle('source-preview'"),'Small linked previews must be marked honestly');
assert(html.includes('class="doc-source-action"'),'Original source links must remain prominently clickable');
assert(html.includes('Open untouched original photograph'),'Upright studio viewing derivative must preserve original-file access');
assert(html.includes('photoGroup=kind==='),'Gallery must retain accurate photo-link wording');
assert(html.includes('richard-skinner-mobile-biography.js?v=20261009-skinner-7'),'HTML must load the current Richard module');
const currentMobileRelease=entry.match(/iphone-refresh=([A-Za-z0-9-]+)/)?.[1];
assert(currentMobileRelease,'Root entry must carry a mobile-release cache-busting token');
assert(manifest.includes('iphone-refresh='+currentMobileRelease),'Installed PWA and root entry must agree on the current release');
for(const [i,script] of [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean).entries()){
 new vm.Script(script,{filename:'atlas inline '+i});
}
console.log('PASS: Richard Skinner 4 original source scans, 1 indexed link, 4 family photos; SHA-256 original preservation; preview and iPhone entry contracts.');
