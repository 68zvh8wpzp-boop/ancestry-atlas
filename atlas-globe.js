/* Family Geography 1.0 — native MapLibre globe. Strict birth/residence/death pin contract. */
(()=>{
'use strict';
const data=window.ANCESTRY_GLOBE_DATA;
const mapNode=document.getElementById('globeMap');
const status=document.getElementById('mapStatus');
const panel=document.getElementById('globePlacePanel');
const peopleNode=document.getElementById('placePeople');
const search=document.getElementById('globeSearch');
const matchesNode=document.getElementById('globeSearchResults');
const countNode=document.getElementById('placeCount');
const emptyNode=document.getElementById('globeEmpty');
if(!data||!mapNode||!Array.isArray(data.places)) { if(status)status.textContent='Family location records are unavailable.';return; }
const branches=new Map(data.branches.map(b=>[b.id,b]));
const branchEnabled=new Set(branches.keys());
const eventEnabled=new Set(['born','lived','died']);
const titles={born:'Born',lived:'Lived',died:'Died'};
// Native globe symbols clip at the horizon. Do not use overlay markers.
const PIN_SOURCE='atlas-family-places',PIN_LAYER='atlas-red-place-pins',PIN_HIT_LAYER='atlas-red-pin-targets',PIN_IMAGE='atlas-red-pin';
const PIN_BLUE='atlas-blue-provisional-pin',PIN_YELLOW='atlas-yellow-research-pin';
const JOURNEY_SOURCE='atlas-journey-lines',JOURNEY_LAYER='atlas-dotted-journeys',JOURNEY_FOCUS='atlas-highlighted-journeys';
const JOURNEY_HALO='atlas-navy-journey-halo',JOURNEY_FOCUS_HALO='atlas-selected-journey-halo';
const HYP_SOURCE='atlas-research-leads',HYP_LAYER='atlas-yellow-research-layer',HYP_HIT_LAYER='atlas-yellow-research-targets';
let showResearch=true;
let showJourneys=true;
let journeyMode='full';
let map=null;
let chosen=null;
// The globe toolbar is a compact header on phones, expandable on demand.
const toolbar=document.querySelector('.globe-toolbar');
const toolbarContent=document.getElementById('globeControlsContent');
const toolbarToggle=document.getElementById('toggleGlobeToolbar');
const globeMain=document.getElementById('globeMain');
function setToolbarCollapsed(collapsed){
 if(!toolbar||!toolbarContent||!toolbarToggle)return;
 toolbar.classList.toggle('is-collapsed',collapsed);
 globeMain?.classList.toggle('toolbar-minimized',collapsed);
 toolbarContent.hidden=collapsed;
 toolbarToggle.setAttribute('aria-expanded',String(!collapsed));
 toolbarToggle.innerHTML=collapsed?'Show controls <span aria-hidden="true">⌄</span>':'Hide <span aria-hidden="true">⌃</span>';
 toolbarToggle.setAttribute('aria-label',collapsed?'Expand map controls':'Collapse map controls');
 if(collapsed)toolbar.scrollTop=0;
}
if(toolbar&&toolbarToggle&&toolbarContent){
 toolbarToggle.addEventListener('click',()=>setToolbarCollapsed(!toolbar.classList.contains('is-collapsed')));
 setToolbarCollapsed(!!(window.matchMedia&&window.matchMedia('(max-width:720px)').matches));
}
function eventsOf(place){return place.events.filter(e=>branchEnabled.has(e.branch)&&eventEnabled.has(e.type));}
function visiblePlaces(){return data.places.filter(p=>eventsOf(p).length);}
function uniquePeople(list){return new Set(list.flatMap(p=>eventsOf(p).map(e=>e.personId))).size;}
function normalized(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function color(branchId){return branches.get(branchId)?.color||'#dec5a1';}
function element(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function pinFeatures(){
 return {type:'FeatureCollection',features:visiblePlaces().map(p=>({
  type:'Feature',
  properties:{id:p.id,name:p.name,kind:'ancestor',
   status:p.locationStatus==='provisional'?'provisional':(eventsOf(p).some(e=>data.personMeta?.[e.personId]?.lineageStatus!=='provisional')?'established':'provisional')},
  geometry:{type:'Point',coordinates:[p.lng,p.lat]}
 }))};
}
function visibleResearch(){
 return showResearch?(data.hypotheses||[]).filter(h=>branchEnabled.has(h.branch)):[];
}
function researchFeatures(){
 return {type:'FeatureCollection',features:visibleResearch().map(h=>({
  type:'Feature',properties:{id:h.id,name:h.name,kind:'research'},
  geometry:{type:'Point',coordinates:[h.lng,h.lat]}
 }))};
}
function makePinImage(fill){
 const canvas=document.createElement('canvas');canvas.width=40;canvas.height=40;
 const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas pinhead image unavailable');
 ctx.scale(2,2);
 const x=10,y=10,r=6.5;
 ctx.shadowColor='rgba(0,0,0,.7)';ctx.shadowBlur=2.4;ctx.shadowOffsetY=1.5;
 ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);
 const sphere=ctx.createRadialGradient(x-2.4,y-2.6,.25,x+.7,y+.9,8);
 sphere.addColorStop(0,'#fffefa');sphere.addColorStop(.13,'#fff3e8');sphere.addColorStop(.26,fill);
 sphere.addColorStop(.76,fill);sphere.addColorStop(1,'#172531');
 ctx.fillStyle=sphere;ctx.fill();ctx.shadowColor='transparent';
 ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=.75;ctx.stroke();
 ctx.beginPath();ctx.ellipse(x-2.5,y-2.7,1.75,.95,-.5,0,Math.PI*2);
 ctx.fillStyle='rgba(255,255,255,.75)';ctx.fill();
 return ctx.getImageData(0,0,canvas.width,canvas.height);
}
// Dense spherical interpolation makes every journey follow the globe, not a flat map.
function geodesic(from,to){
 const d=Math.PI/180,r=180/Math.PI;
 const vector=p=>{const a=p.lat*d,b=p.lng*d;return [Math.cos(a)*Math.cos(b),Math.cos(a)*Math.sin(b),Math.sin(a)];};
 const a=vector(from),b=vector(to);
 const theta=Math.acos(Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2])));
 if(theta<.00001)return null;
 const n=Math.max(24,Math.ceil(theta/(1.25*d))),sin=Math.sin(theta);
 const segments=[[]];let prev=null;
 for(let i=0;i<=n;i++){
  const t=i/n,u=Math.sin((1-t)*theta)/sin,v=Math.sin(t*theta)/sin;
  const x=u*a[0]+v*b[0],y=u*a[1]+v*b[1],z=u*a[2]+v*b[2];
  const p=[Math.atan2(y,x)*r,Math.atan2(z,Math.hypot(x,y))*r];
  if(prev&&Math.abs(prev[0]-p[0])>180){
   const edge=prev[0]>=0?180:-180,adjusted=p[0]+(edge>0?360:-360);
   const fraction=(edge-prev[0])/(adjusted-prev[0]);
   const lat=prev[1]+fraction*(p[1]-prev[1]);
   segments[segments.length-1].push([edge,lat]);
   segments.push([[-edge,lat]]);
  }
  segments[segments.length-1].push(p);prev=p;
 }
 return {type:'MultiLineString',coordinates:segments.filter(x=>x.length>1)};
}
function administrativeRegion(place){
 const parts=place.name.split(',').map(s=>s.trim().replace(/\s*\(.*?\)\s*/g,''));
 const country=parts[parts.length-1].toLowerCase();
 if(['usa','united states','canada','mexico'].includes(country))
  return country+':'+(parts.length>1?parts[parts.length-2].toLowerCase():'unknown');
 return country;
}
// The Atlas provides a range of date precisions. Keep broad ranges approximate;
// do not silently turn "20th century" or "childhood" into an exact year.
function approximateYear(value,birthYear){
 const valueText=String(value||'').trim().toLowerCase();
 const years=[...valueText.matchAll(/\b(?:1[5-9]\d{2}|20\d{2})(?=s\b|\b)/g)].map(x=>Number(x[0]));
 if(years.length){
  let year=years[0];
  if(new RegExp('\\b'+year+'s\\b').test(valueText)){
   year+=valueText.includes('late')?8:valueText.includes('early')?2:5;
  }
  return year;
 }
 const century=valueText.match(/\b(1[5-9]|20)(?:st|nd|rd|th)[- ]*(?:century|c\.)/);
 if(century){
  const base=(Number(century[1])-1)*100;
  return base+(valueText.includes('early')?20:valueText.includes('late')?80:50);
 }
 if(valueText.includes('childhood')&&Number.isFinite(birthYear))return birthYear+8;
 return null;
}
function angularDistance(a,b){
 const r=Math.PI/180,lat1=a.lat*r,lat2=b.lat*r,delta=(a.lng-b.lng)*r;
 return Math.acos(Math.max(-1,Math.min(1,Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(delta))));
}
function journeyFeatures(){
 if(!showJourneys)return {type:'FeatureCollection',features:[]};
 const people=new Map();
 for(const place of visiblePlaces())for(const event of eventsOf(place)){
  let person=people.get(event.personId);
  if(!person){person={name:event.name,branch:event.branch,places:new Map()};people.set(event.personId,person);}
  if(!person.places.has(place.id))person.places.set(place.id,{place,events:[]});
  person.places.get(place.id).events.push(event);
 }
 const features=[];
 function addLeg(id,person,from,to,chronologyKnown,kind){
  if(!from||!to||from.place.id===to.place.id)return;
  const geom=geodesic(from.place,to.place);
  if(!geom)return;
  features.push({type:'Feature',properties:{
   personId:id,name:person.name,branch:person.branch,from:from.place.name,to:to.place.name,
   kind,chronologyKnown,approximate:!!(from.place.representativePin||to.place.representativePin),
   fromType:from.type,toType:to.type
  },geometry:geom});
 }
 for(const [id,person] of people){
  const locations=[...person.places.values()];
  const birth=locations.find(stop=>stop.events.some(e=>e.type==='born'));
  const birthYear=birth?approximateYear(birth.events.find(e=>e.type==='born').when):null;
  const stops=locations.map(item=>{
   const kinds=new Set(item.events.map(e=>e.type));
   const type=kinds.has('born')?'born':kinds.has('died')?'died':'lived';
   const times=item.events.map(e=>approximateYear(e.when,birthYear)).filter(Number.isFinite);
   const typedEvent=item.events.find(e=>e.type===type);
   const typedYear=typedEvent?approximateYear(typedEvent.when,birthYear):null;
   return {place:item.place,events:item.events,type,
    year:Number.isFinite(typedYear)?typedYear:(times.length?Math.min(...times):null)};
  });
  if(journeyMode==='endpoints'){
   const a=stops.find(stop=>stop.type==='born');
   const b=stops.find(stop=>stop.type==='died');
   if(a&&b&&administrativeRegion(a.place)!==administrativeRegion(b.place))addLeg(id,person,a,b,true,'birth-death');
   continue;
  }
  const dated=stops.filter(s=>Number.isFinite(s.year));
  const undated=stops.filter(s=>!Number.isFinite(s.year));
  // Dated moves are ordered by evidence, not the iteration order of source places.
  dated.sort((a,b)=>{
   if(a.type==='born'&&b.type!=='born')return -1;
   if(b.type==='born'&&a.type!=='born')return 1;
   if(a.type==='died'&&b.type!=='died')return 1;
   if(b.type==='died'&&a.type!=='died')return -1;
   return a.year-b.year||(a.place.id<b.place.id?-1:1);
  });
  for(let i=1;i<dated.length;i++)addLeg(id,person,dated[i-1],dated[i],true,'full-life');
  // Where no calendar order is established, include residence links without
  // inventing a migration sequence: join each undated stop to the nearest
  // already plotted stop, marking the link as non-chronological.
  const connected=dated.slice();
  if(!connected.length&&undated.length)connected.push(undated.shift());
  while(undated.length&&connected.length){
   let chosen=null,best=Infinity;
   for(let i=0;i<undated.length;i++)for(const target of connected){
    const distance=angularDistance(undated[i].place,target.place);
    if(distance<best){best=distance;chosen={i,target};}
   }
   if(!chosen)break;
   const candidate=undated.splice(chosen.i,1)[0];
   addLeg(id,person,chosen.target,candidate,false,'full-life');
   connected.push(candidate);
  }
 }
 return {type:'FeatureCollection',features};
}
function updateRouteFocus(){
 if(!map||!map.getLayer(JOURNEY_FOCUS))return;
 const place=data.places.find(p=>p.id===chosen);
 const people=place?[...new Set(eventsOf(place).map(e=>e.personId))]:[];
 const filter=['in',['get','personId'],['literal',people]];
 map.setFilter(JOURNEY_FOCUS,filter);
 if(map.getLayer(JOURNEY_FOCUS_HALO))map.setFilter(JOURNEY_FOCUS_HALO,filter);
}
function closePanel(){chosen=null;panel.hidden=true;updateRouteFocus();}
function announceCounts(){
 const places=visiblePlaces(),research=visibleResearch();
 const journeyCount=journeyFeatures().features.length;
 countNode.textContent=places.length+' places · '+uniquePeople(places)+' people'+(journeyCount?' · '+journeyCount+' route legs':'')+(research.length?' · '+research.length+' leads':'');
 const rc=document.getElementById('researchCount');if(rc)rc.textContent='('+(data.hypotheses||[]).length+')';
 emptyNode.hidden=places.length>0||research.length>0;
}
function renderPanel(){
if(!chosen)return;
const research=(data.hypotheses||[]).find(h=>h.id===chosen);
if(research){
 if(!visibleResearch().some(h=>h.id===research.id)){panel.hidden=true;return;}
 document.getElementById('placeTitle').textContent=research.name;
 document.getElementById('placeTypeLabel').textContent='Research lead · not a life-event pin';
 document.getElementById('placeMeta').textContent=research.lead+' · Unproven origin';
 peopleNode.replaceChildren();
 const heading=element('div','research-lead-title',research.confidence);
 const explanation=element('p','person-place-desc',research.summary);
 const caution=element('p','person-place-region',research.qualification);
 peopleNode.append(heading,explanation,caution);updateRouteFocus();
 if(research.relatedPersonId){
  const link=element('a','person-place','View connected Atlas ancestor: '+research.relatedPersonLabel+' →');
  link.href='./atlas-v3.9.37.html?atlas-person='+encodeURIComponent(research.relatedPersonId);
  peopleNode.append(link);
 }
 if(research.sourceUrl){
  const link=element('a','research-source','Research record: '+research.sourceLabel+' ↗');
  link.href=research.sourceUrl;link.target='_blank';link.rel='noopener noreferrer';
  peopleNode.append(link);
 }
 panel.hidden=false;return;
}
const place=data.places.find(p=>p.id===chosen);
if(!place)return;
const list=eventsOf(place);
if(!list.length){panel.hidden=true;return;}
document.getElementById('placeTitle').textContent=place.name;

const users=new Set(list.map(e=>e.personId));
const types=new Set(list.map(e=>e.type));
document.getElementById('placeTypeLabel').textContent=place.representativePin?'Approximate country / region':'Family place';
document.getElementById('placeMeta').textContent=users.size+' '+(users.size===1?'person':'people')+' · '+[...types].map(t=>titles[t]).join(' / ')+(place.representativePin?' · Representative regional pin — not a town':place.precision.includes('approximate')?' · Approximate position':'');
peopleNode.replaceChildren();
const groups=new Map();
for(const item of list){if(!groups.has(item.personId))groups.set(item.personId,[]);groups.get(item.personId).push(item);}
for(const items of groups.values()){
const first=items[0];
const link=element('a','person-place');
link.href='./atlas-v3.9.37.html?atlas-person='+encodeURIComponent(first.personId);
link.title='View '+first.name+' in the Ancestry Atlas tree';
const row=element('div','person-place-head');
const label=element('strong');const dot=element('span','person-branch');dot.style.background=color(first.branch);label.append(dot,document.createTextNode(first.name));
row.append(label,element('em','',branches.get(first.branch)?.name||'Family'));
link.append(row);
const personMeta=data.personMeta?.[first.personId];
if(personMeta?.lineageStatus==='provisional'){
 link.append(element('div','person-place-uncertain','Provisional ancestral connection'));
}
if(place.representativePin){
 link.append(element('div','person-place-region','Regional position only · exact locality not identified'));
}
for(const item of items){
const detail=element('div','person-place-desc');
const name=element('span','event-name',titles[item.type]);detail.append(name,document.createTextNode(' · '+[item.when,item.qualifier].filter(Boolean).join(' · ')));
link.append(detail);
}
peopleNode.append(link);
}
panel.hidden=false;updateRouteFocus();
}
function selectPlace(place,{fly=true}={}){
chosen=place.id;
renderPanel();
if(map&&fly){
const currentZoom=map.getZoom();
map.flyTo({center:[place.lng,place.lat],zoom:Math.max(3.2,currentZoom),essential:true,speed:1.1});
}
}
function selectResearch(lead,{fly=true}={}){
 chosen=lead.id;renderPanel();
 if(map&&fly)map.flyTo({center:[lead.lng,lead.lat],zoom:Math.max(3.4,map.getZoom()),essential:true,speed:1.1});
}
function updateMarkers(){
 if(map&&map.getSource(PIN_SOURCE))map.getSource(PIN_SOURCE).setData(pinFeatures());
 if(map&&map.getSource(HYP_SOURCE))map.getSource(HYP_SOURCE).setData(researchFeatures());
 if(map&&map.getSource(JOURNEY_SOURCE))map.getSource(JOURNEY_SOURCE).setData(journeyFeatures());
 announceCounts();renderPanel();
}
const filterRoot=document.getElementById('globeBranchFilters');
for(const branch of data.branches){
const button=element('button','filter-pill');
button.type='button';button.style.setProperty('--swatch',branch.color);
button.setAttribute('aria-pressed','true');
const dot=element('span','swatch');dot.setAttribute('aria-hidden','true');
button.append(dot,document.createTextNode(branch.name));
button.addEventListener('click',()=>{
if(branchEnabled.has(branch.id)){branchEnabled.delete(branch.id);button.setAttribute('aria-pressed','false');}
else{branchEnabled.add(branch.id);button.setAttribute('aria-pressed','true');}
updateMarkers();searchNow();
});
filterRoot.append(button);
}
const eventRoot=document.getElementById('globeEventFilters');
for(const eventType of ['born','lived','died']){
const button=element('button','event-filter',titles[eventType]);button.type='button';button.setAttribute('aria-pressed','true');
button.addEventListener('click',()=>{
if(eventEnabled.has(eventType)){eventEnabled.delete(eventType);button.setAttribute('aria-pressed','false');}
else{eventEnabled.add(eventType);button.setAttribute('aria-pressed','true');}
updateMarkers();searchNow();
});
eventRoot.append(button);
}
function searchNow(){
 matchesNode.replaceChildren();
 const query=normalized(search.value).trim();
 if(query.length<2)return;
 const matching=visiblePlaces().filter(p=>normalized(p.name).includes(query)||eventsOf(p).some(e=>normalized(e.name).includes(query))).slice(0,8);
 for(const p of matching){
  const button=element('button','search-item',p.name);button.type='button';
  const names=[...new Set(eventsOf(p).filter(e=>normalized(e.name).includes(query)).map(e=>e.name))].slice(0,2);
  if(names.length)button.append(element('small','',names.join(' · ')));
  button.addEventListener('click',()=>{selectPlace(p);search.value='';matchesNode.replaceChildren();search.blur();});
  matchesNode.append(button);
 }
 const room=Math.max(0,8-matching.length);
 const possible=visibleResearch().filter(h=>normalized(h.name).includes(query)||normalized(h.lead).includes(query)||normalized(h.relatedPersonLabel).includes(query)).slice(0,room);
 for(const h of possible){
  const button=element('button','search-item',h.name);
  button.type='button';button.append(element('small','','Research lead · '+h.lead));
  button.addEventListener('click',()=>{selectResearch(h);search.value='';matchesNode.replaceChildren();search.blur();});
  matchesNode.append(button);
 }
 if(!matching.length&&!possible.length)matchesNode.append(element('div','search-item','No matching family places or research leads'));
}
search.addEventListener('input',searchNow);
const journeyModeControl=document.getElementById('globeJourneyMode');
if(journeyModeControl){journeyMode=journeyModeControl.value||'full';journeyModeControl.addEventListener('change',()=>{journeyMode=journeyModeControl.value||'full';updateMarkers();});}
const journeysToggle=document.getElementById('globeJourneysToggle');
if(journeysToggle){showJourneys=journeysToggle.checked;journeysToggle.addEventListener('change',()=>{showJourneys=journeysToggle.checked;updateMarkers();});}
const researchToggle=document.getElementById('globeResearchToggle');
if(researchToggle){showResearch=researchToggle.checked;researchToggle.addEventListener('change',()=>{
 showResearch=researchToggle.checked;updateMarkers();searchNow();
});}
document.getElementById('closePlacePanel').addEventListener('click',closePanel);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)document.getElementById('closePlacePanel').click();});
const home=()=>{if(map)map.flyTo({center:[-42,40],zoom:1.05,pitch:0,bearing:0,essential:true,duration:1400});};
document.getElementById('resetGlobe').addEventListener('click',home);
function loadMap(){
if(!window.maplibregl){status.textContent='The map engine could not load. Check your connection and reload this experience.';return;}
if(typeof maplibregl.supported==='function'&&!maplibregl.supported()){status.textContent='This device cannot display the 3D globe; try the Atlas in a WebGL-enabled browser.';return;}
try{
map=new maplibregl.Map({
container:mapNode,
style:{
version:8,
sources:{'political':{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,minzoom:0,maxzoom:19,attribution:'© OpenStreetMap contributors'}},
layers:[{id:'political-basemap',type:'raster',source:'political'}]
},
center:[-42,40],zoom:1.05,minZoom:0.5,maxZoom:15,pitch:0,maxPitch:45,antialias:true
});
map.on('style.load',()=>{map.setProjection({type:'globe'});});
map.addControl(new maplibregl.NavigationControl({showCompass:true,showZoom:true}),'top-right');
map.on('load',()=>{
 map.addImage(PIN_IMAGE,makePinImage('#d83b38'),{pixelRatio:2});
 map.addImage(PIN_BLUE,makePinImage('#387bc0'),{pixelRatio:2});
 map.addImage(PIN_YELLOW,makePinImage('#e6b331'),{pixelRatio:2});
 map.addSource(PIN_SOURCE,{type:'geojson',data:pinFeatures()});
 map.addSource(HYP_SOURCE,{type:'geojson',data:researchFeatures()});
 map.addSource(JOURNEY_SOURCE,{type:'geojson',data:journeyFeatures()});
 // Draw beneath pinheads; MapLibre globe projection clips the far-side curves.
 // Bright dotted outline keeps dark navy routes legible against land AND ocean.
 map.addLayer({id:JOURNEY_HALO,type:'line',source:JOURNEY_SOURCE,
  layout:{'line-cap':'round','line-join':'round'},
  paint:{'line-color':'#e5f2ff','line-width':['interpolate',['linear'],['zoom'],0,3.6,3,4.7,8,5.3],
   'line-dasharray':[1.2,1.65],'line-opacity':.9}});
 map.addLayer({id:JOURNEY_LAYER,type:'line',source:JOURNEY_SOURCE,
  layout:{'line-cap':'round','line-join':'round'},
  paint:{'line-color':'#123c7b','line-width':['interpolate',['linear'],['zoom'],0,2.35,3,3.0,8,3.6],
   'line-dasharray':[1.2,1.65],'line-opacity':.98}});
 const selectedFilter=['in',['get','personId'],['literal',[]]];
 map.addLayer({id:JOURNEY_FOCUS_HALO,type:'line',source:JOURNEY_SOURCE,filter:selectedFilter,
  layout:{'line-cap':'round','line-join':'round'},
  paint:{'line-color':'#edf8ff','line-width':['interpolate',['linear'],['zoom'],0,5.2,3,6.0,8,7],
   'line-dasharray':[1.2,1.65],'line-opacity':.99}});
 map.addLayer({id:JOURNEY_FOCUS,type:'line',source:JOURNEY_SOURCE,filter:selectedFilter,
  layout:{'line-cap':'round','line-join':'round'},
  paint:{'line-color':'#0b3274','line-width':['interpolate',['linear'],['zoom'],0,3.45,3,4.15,8,5],
   'line-dasharray':[1.2,1.65],'line-opacity':1}});
 // Map-native hit targets remain invisible on the globe and aid iPhone taps.
 map.addLayer({id:PIN_HIT_LAYER,type:'circle',source:PIN_SOURCE,paint:{'circle-radius':15,'circle-color':'#d83b38','circle-opacity':0}});
 map.addLayer({id:HYP_HIT_LAYER,type:'circle',source:HYP_SOURCE,paint:{'circle-radius':15,'circle-color':'#e6b331','circle-opacity':0}});
 map.addLayer({id:PIN_LAYER,type:'symbol',source:PIN_SOURCE,layout:{
  'icon-image':['match',['get','status'],'provisional',PIN_BLUE,PIN_IMAGE],
  'icon-anchor':'center',
  'icon-size':['interpolate',['linear'],['zoom'],0,0.7,2,0.85,5,1],
  'icon-allow-overlap':true,'icon-ignore-placement':true
 }});
 map.addLayer({id:HYP_LAYER,type:'symbol',source:HYP_SOURCE,layout:{
  'icon-image':PIN_YELLOW,'icon-anchor':'center',
  'icon-size':['interpolate',['linear'],['zoom'],0,0.7,2,0.85,5,1],
  'icon-allow-overlap':true,'icon-ignore-placement':true
 }});
 updateMarkers();status.hidden=true;
 const id=new URLSearchParams(location.search).get('person');
 if(id){const p=data.places.find(p=>p.events.some(e=>e.personId===id));if(p)selectPlace(p);}
});
map.on('click',e=>{
 const hits=map.queryRenderedFeatures(e.point,{layers:[HYP_HIT_LAYER,PIN_HIT_LAYER]});
 const id=hits[0]?.properties?.id,kind=hits[0]?.properties?.kind;
 if(kind==='research'){
  const lead=(data.hypotheses||[]).find(h=>h.id===id);
  if(lead){selectResearch(lead,{fly:false});return;}
 }
 const p=id&&data.places.find(place=>place.id===id);
 if(p){selectPlace(p,{fly:false});return;}
 if(!panel.hidden)closePanel();
});
map.on('mouseenter',PIN_HIT_LAYER,()=>{map.getCanvas().style.cursor='pointer';});
map.on('mouseleave',PIN_HIT_LAYER,()=>{map.getCanvas().style.cursor='';});
map.on('mouseenter',HYP_HIT_LAYER,()=>{map.getCanvas().style.cursor='pointer';});
map.on('mouseleave',HYP_HIT_LAYER,()=>{map.getCanvas().style.cursor='';});
map.on('error',e=>{if(status&&!status.hidden)status.textContent='Map tiles are loading slowly. Check your network if the globe remains blank.';console.warn('Atlas globe tile or renderer issue',e?.error||e);});

}catch(error){status.textContent='The 3D globe could not start on this device. '+String(error.message||error);console.error('Family geography globe initialization',error);}
}
announceCounts();
loadMap();
})();
