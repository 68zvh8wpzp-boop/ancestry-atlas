import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// A431: a source-only addition. The single previously published historical
// manuscript must be reused on both spouses' galleries with source caveats.
const view = (file,id) => {
  const person={id};
  const data={nodes:[person]};
  vm.runInNewContext(fs.readFileSync(file,'utf8'),{
    DATA:data,GUIDE_PROFILES:{},TOUR_MEDIA:{}
  },{timeout:5000});
  return person;
};
const marian=view('marian-skinner-mobile-biography.js','marian_skinner');
const charles=view('charles-albert-mobile-biography.js','charles_albert');
const richard=view('richard-skinner-mobile-biography.js','richard_francis_skinner');
const source='assets/richard-skinner/marion-skinner-albert-brenay-1920-marriage-original.jpg';
const preview='assets/richard-skinner/marion-skinner-albert-brenay-1920-marriage-original-preview.jpg';
const original=richard.evidence.find(e=>e.full===source);
assert(original&&original.sourceLevel==='original','Richard must retain the already-published full-page 1920 manuscript');
for(const [name,p] of [['Marian',marian],['Charles Albert',charles]]){
  const records=p.evidence.filter(e=>e.full===source);
  assert.equal(records.length,1,name+' must show exactly one reused 1920 original');
  const e=records[0];
  assert.equal(e.kind,'document','No photographic count consumed');
  assert.equal(e.sourceLevel,'original');
  assert.equal(e.thumb,preview);
  assert.equal(e.originalAsset,source);
  assert.equal(e.sourcePage,'https://www.familysearch.org/ark:/61903/3:1:S3HY-D1G3-8SD');
  assert.equal(e.sourceReference,original.sourceReference,'Identical original source citation');
  assert.equal(e.original_text,original.original_text,'Never fabricate or silently alter original handwriting transcription');
  assert.equal(e.transcription,original.transcription,'Full manuscript field transcription reused');
  assert(e.summary.includes('Ida Goodman')&&e.summary.includes('Gooley'),'The recorded maternal surname conflict must stay visible');
  assert(e.summary.includes('not known')&&e.summary.includes('Jessie Aurin'),'The missing maternal name must not be silently filled');
  assert(e.provenance.includes('No newly obtained or duplicated historical image'),'Custody classification');
  assert(p.biography.includes('13 September 1920'),name+' approved biography preserved');
}
assert.equal(marian.evidence.filter(e=>e.full===source).length,1);
for(const file of [source,preview]){
  const bytes=fs.readFileSync(file);
  assert(bytes.length>30000&&bytes[0]===255&&bytes[1]===216,'Actual published JPEG must exist: '+file);
}
console.log('PASS A431: both spouses now cite existing 1920 original, unchanged handwritten transcription and no duplicated image bytes.');
