// Regressions for the laptop Album and family tree text-label clipping.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../atlas-v3.9.36.html',import.meta.url),'utf8');
const entry=await readFile(new URL('../index.html',import.meta.url),'utf8');
const between=(a,b)=>{
  const start=source.indexOf(a),end=source.indexOf(b,start+a.length);
  assert(start>=0&&end>start,'Source code anchor absent: '+a);
  return source.slice(start,end);
};
const album=between('function renderAlbum(){','function openPersonMedia(');
const open=between("function openAlbum(filter='all'){",'function closeAlbum()');
const label=between('const mobileAtlasLocalLabels=','// visible media cue on the relationship/tree view.');
assert.match(album,/if\(thumb\)\s*\{\s*thumb\.onerror/,'Link-only document must not crash album gallery with missing img');
assert.match(album,/albumState\.visible=list/,'Gallery must retain open-item list');
assert.match(open,/m\.classList\.add\('open'\)[\s\S]*?try\s*\{\s*buildAlbumItems\(\);populateAlbumBranches\(\);renderAlbum\(\)/,'Album should become visible before rendering');
assert.match(open,/catch\(error\)/,'Gallery rendering should provide user-visible recovery on error');
assert.match(source,/getElementById\('openAlbum'\)\.onclick=\(\)=>\{albumState\.branch='all';openAlbum\('all'\);\}/,'Album control should open all collections, not a prefiltered subset');
assert.match(source,/return !!url&&!unavailableAlbumAssets\.has\(url\)/,'Allow genuine remote HTTPS ancestor portraits rather than silently hiding them');
assert.match(label,/nameLineH=Math\.ceil\(nameSize\*1\.55\)/,'Font-relative height required for first line');
assert.match(label,/metaLineH=Math\.ceil\(metaSize\*1\.6\)/,'Font-relative height required for years and place');
assert.match(label,/const boxH=labelInset\*2\+nameLineH\+metaLineH\*2\+labelGap\*2/,'Background card must grow with text rows');
assert.match(label,/rect\(bx\+5,yearsY,textAvail,metaLineH\)/);
assert.match(label,/rect\(bx\+5,placeY,textAvail,metaLineH\)/);
assert.doesNotMatch(label,/rect\(bx\+5,by\+19,textAvail,11\)/,'Old hard-coded clipping row is not allowed');
for(const perspective of [0.65,1,1.5,1.7,2.4,4.5]){
  const name=Math.max(11,Math.min(18,11.4*perspective));
  const meta=Math.max(9,Math.min(14,9.4*perspective));
  const nameRow=Math.ceil(name*1.55),metaRow=Math.ceil(meta*1.6);
  const cardHeight=12+nameRow+metaRow*2+4;
  const placeEnd=6+nameRow+2+metaRow+2+metaRow;
  assert(nameRow>=name*1.4&&metaRow>=meta*1.4,'Text rows need font-height margin');
  assert(placeEnd<=cardHeight-6,'Last text row must fit inside card with padding');
}
assert.match(entry,/iphone-refresh=20261010-album-label-visibility-2/,'Cache-busting entrypoint required for laptops');
console.log('PASS: Family Album source-only safety + all-media opening; zoom-responsive name/date/location slots and entrypoint refresh');
