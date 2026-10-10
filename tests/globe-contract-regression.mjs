/* Atlas Family Globe regression contract. Run: node tests/globe-contract-regression.mjs */
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const text=async name=>readFile(new URL(name,root),'utf8');
const [dataCode,globeCode,launcherCode,loaderCode,html,css]=await Promise.all([
 text('atlas-globe-data.js'),text('atlas-globe.js'),text('atlas-globe-launcher.js'),
 text('atlas-content.js'),text('atlas-globe.html'),text('atlas-globe.css')]);
for(const [name,js] of [['data',dataCode],['globe',globeCode],['launcher',launcherCode],['loader',loaderCode]]){
 assert.doesNotThrow(()=>new vm.Script(js,{filename:name+'.js'}),'Invalid JS in '+name);
}
const sandbox={window:{}};vm.runInNewContext(dataCode,sandbox);
const data=sandbox.window.ANCESTRY_GLOBE_DATA;
assert(data&&Array.isArray(data.places)&&data.places.length>=40);
const legalEvents=new Set(['born','lived','died']);
const branches=new Set(data.branches.map(b=>b.id));
const placeIds=new Set(),triples=new Set(),persons=new Set();
for(const place of data.places){
 assert(!placeIds.has(place.id),'Duplicate place ID '+place.id);placeIds.add(place.id);
 assert(typeof place.name==='string'&&place.name.trim());
 assert(Number.isFinite(place.lat)&&Math.abs(place.lat)<=90);
 assert(Number.isFinite(place.lng)&&Math.abs(place.lng)<=180);
 assert(place.events.length>0,'No events in '+place.id);
 for(const e of place.events){
  assert(legalEvents.has(e.type),'Non-eligible pin event '+e.type);
  assert(branches.has(e.branch),'Missing branch '+e.branch);
  assert(e.personId&&e.name,'Missing person ID or label');
  assert(e.evidence&&e.evidence.trim(),'No provenance label for '+e.personId);
  const triple=place.id+'/'+e.personId+'/'+e.type;
  assert(!triples.has(triple),'Duplicate person/place/event '+triple);triples.add(triple);persons.add(e.personId);
 }
}
assert.equal(data.places.find(p=>p.id==='coloniadiaz')?.lat,31.14777);
assert(!data.places.some(p=>['tempe','thatcher'].includes(p.id)),'Childbirth-only inferred residence should not create a pin');
assert(html.includes('id="globeMap"'));
assert(html.includes('atlas-globe-data.js'));
assert(html.includes('atlas-globe.js'));
assert(html.includes('maplibre-gl'));
assert(loaderCode.includes('atlas-globe-launcher.js'),'Main Atlas does not load globe launcher');
assert(launcherCode.includes('startGlobe'),'Landing screen does not launch globe');
assert(launcherCode.includes('mobileTreeGlobe'),'Mobile menu does not launch globe');
assert(launcherCode.includes('atlas-person'),'Globe-to-tree person route missing');
assert(globeCode.includes("setProjection({type:'globe'})"),'3D globe projection not applied');
assert(globeCode.includes("new maplibregl.Marker"),'Missing globe pins');
assert(globeCode.includes("encodeURIComponent(first.personId)"),'Person deep links missing');
assert(css.includes('@media(max-width:720px)'),'Mobile layout missing');
assert(!globeCode.includes('satellite'),'Political base map must not use satellite imagery');
console.log('PASS family globe: '+data.places.length+' places, '+triples.size+' born/lived/died links, '+persons.size+' people; UI assets and main-page integration present.');
