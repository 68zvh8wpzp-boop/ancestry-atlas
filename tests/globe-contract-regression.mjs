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
assert.equal(data.directAncestorCount,73,'All 73 known direct ancestors must be included, not collateral people');
const allowedPeople=new Set(Object.keys(data.personMeta));
const mapped=new Set(data.places.flatMap(p=>p.events.map(e=>e.personId)));
assert.equal(mapped.size,73,'Missing ancestor from the globe');
for(const id of allowedPeople)assert(mapped.has(id),'Missing direct ancestor '+id);
for(const id of mapped)assert(allowedPeople.has(id),'Non-direct or collateral family leaked into globe: '+id);
assert.equal(data.unplacedAncestors.length,0,'Unlocated ancestors should use labeled representative regions');
assert.equal(data.places.length,62,'Expected province-level Quebec location added without an invented town');
assert.equal(triples.size,167,'Expected two strictly typed Quebec reported events');
const qc=data.places.find(p=>p.id==='region_quebec');
assert(qc?.representativePin&&qc.locationStatus==='provisional','Quebec must remain a blue, explicitly approximate provincial pin');
assert(qc.lat===45.5017&&qc.lng===-73.5673,'Quebec needs representative Montreal population-center coordinates');
assert.equal(qc.events.map(e=>e.personId+'/'+e.type).sort().join(','),'john_peter/born,mary_ann/lived');
assert(qc.events.every(e=>e.placeEvidenceStatus.includes('pending original')),'Quebec associations must not imply original record verification');
assert(qc.events.some(e=>e.personId==='mary_ann'&&e.qualifier.includes('Ontario')),'Mary Ann reported Ontario birth must be preserved');
assert(globeCode.includes("p.locationStatus==='provisional'"),'Quebec reported location must display blue despite supported lineage');
for(const id of ['peter_gooley','wilhelm_brunne','johanne_weller','elizabeth_douglas','gideon_webb','edith_bates','anna_bassett','john_webb_1615','john_webb_1640','susanna_cunliffe']){
 assert(mapped.has(id),'Missing provisional direct-line candidate '+id);
}
const regionalPins=data.places.filter(p=>p.representativePin);
assert.equal(regionalPins.length,7,'Representative regional pin set unexpectedly changed');
for(const p of regionalPins){
 assert(p.name&&!/(?:invented|fictional)/i.test(p.name));
 assert(p.precision.includes('approximate'));
 assert(p.regionNote.includes('not an ancestral street address'));
 assert(p.events.every(e=>['born','lived','died'].includes(e.type)));
}
assert(globeCode.includes('Provisional ancestral connection'),'Connection uncertainty absent from person cards');
assert(globeCode.includes('Representative regional pin'),'Regional pin not labeled as such');
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
assert(!globeCode.includes('new maplibregl.Marker'),'HTML markers leak behind the globe horizon on iPhone');
assert(globeCode.includes("map.addSource(PIN_SOURCE,{type:'geojson'"),'Missing geo-anchored city source');
assert(globeCode.includes("type:'symbol',source:PIN_SOURCE"),'Missing map-native anchored red pin layer');
assert(globeCode.includes("'icon-anchor':'bottom'"),'Pins must anchor tips to map coordinates');
assert(globeCode.includes("makePinImage('#d83b38')"),'Documented locations require red pins');
assert(globeCode.includes("makePinImage('#387bc0')"),'Provisional direct-only places require blue pins');
assert(globeCode.includes("makePinImage('#e6b331')"),'Separate speculative research leads require yellow pins');
assert(globeCode.includes("status:p.locationStatus==='provisional'"),'Mixed established/provisional location classification missing');
assert(globeCode.includes("type:'symbol',source:HYP_SOURCE"),'Research pins need native globe symbols');
assert(globeCode.includes("data:researchFeatures()"),'Research source not loaded independently');
assert(globeCode.includes("globeResearchToggle"),'Opt-in/out research-layer control missing');
assert(globeCode.includes("selectResearch(lead"),'Research pin click handler missing');
assert(globeCode.includes("Research lead · not a life-event pin"),'Research cards must not masquerade as life-event pins');
assert(html.includes('atlas-globe-status-colors.css'),'Missing research color legend stylesheet');
assert(html.includes('globeResearchToggle'),'Missing research-layer checkbox');
assert(html.includes('pin-legend'),'Missing map legend');
const leads=data.hypotheses||[];
assert.equal(leads.length,3,'Exactly 3 deliberately separated origin hypotheses expected');
assert.deepEqual([...leads.map(l=>l.id)].sort().join(','),'hypothesis_france_goulet,hypothesis_ireland_gooley,hypothesis_sweden_auren');
for(const h of leads){
 assert(Number.isFinite(h.lat)&&Math.abs(h.lat)<=90&&Number.isFinite(h.lng)&&Math.abs(h.lng)<=180);
 assert(h.confidence&&h.qualification&&h.summary,'Research lead must state uncertainty');
 assert(!Object.hasOwn(data.personMeta,h.id),'Research hypothesis must not be counted as a direct ancestor');
 assert(!data.places.some(p=>p.events.some(e=>e.personId===h.id)),'Origin hypothesis must not appear as born/lived/died event');
}
const sweden=leads.find(l=>l.id==='hypothesis_sweden_auren');
assert(sweden.name.includes('Karlstad, Värmland, Sweden'),'Sweden research lead must point to Karlstad');
assert(Math.abs(sweden.lat-59.3809)<0.001&&Math.abs(sweden.lng-13.5028)<0.001,'Karlstad marker coordinates incorrect');
assert(globeCode.includes("map.queryRenderedFeatures(e.point"),'Only rendered (front of globe) pins may be tapped');
assert(globeCode.includes("setData(pinFeatures())"),'Filters must update native GeoJSON symbols');
assert(!globeCode.includes("branchGradient"),'Pin color must not change by branch');
assert(globeCode.includes("encodeURIComponent(first.personId)"),'Person deep links missing');
assert(css.includes('@media(max-width:720px)'),'Mobile layout missing');
assert(!globeCode.includes('satellite'),'Political base map must not use satellite imagery');
console.log('PASS family globe: '+data.places.length+' places, '+triples.size+' born/lived/died links, '+persons.size+' people; UI assets and main-page integration present.');
