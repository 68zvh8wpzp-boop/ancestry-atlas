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
let map=null;
let chosen=null;
function eventsOf(place){return place.events.filter(e=>branchEnabled.has(e.branch)&&eventEnabled.has(e.type));}
function visiblePlaces(){return data.places.filter(p=>eventsOf(p).length);}
function uniquePeople(list){return new Set(list.flatMap(p=>eventsOf(p).map(e=>e.personId))).size;}
function normalized(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
function color(branchId){return branches.get(branchId)?.color||'#dec5a1';}
function element(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function pinFeatures(){
 return {type:'FeatureCollection',features:visiblePlaces().map(p=>({type:'Feature',properties:{id:p.id,name:p.name},geometry:{type:'Point',coordinates:[p.lng,p.lat]}}))};
}
function makePinImage(){
 const canvas=document.createElement('canvas');canvas.width=44;canvas.height=64;
 const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas pin image could not be generated');
 ctx.scale(2,2);
 ctx.shadowColor='rgba(5,18,27,.65)';ctx.shadowBlur=2;ctx.shadowOffsetY=1;
 ctx.beginPath();
 ctx.moveTo(11,30);
 ctx.bezierCurveTo(8.7,25.2,2.5,18.8,2.5,11.5);
 ctx.bezierCurveTo(2.5,6.2,6.3,2,11,2);
 ctx.bezierCurveTo(15.7,2,19.5,6.2,19.5,11.5);
 ctx.bezierCurveTo(19.5,18.8,13.3,25.2,11,30);
 ctx.closePath();ctx.fillStyle='#d83b38';ctx.strokeStyle='#fff6e9';ctx.lineWidth=1.2;ctx.fill();ctx.stroke();
 ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
 ctx.beginPath();ctx.arc(11,11,3.35,0,Math.PI*2);ctx.fillStyle='#fff8ef';ctx.fill();
 return ctx.getImageData(0,0,canvas.width,canvas.height);
}
function closePanel(){chosen=null;panel.hidden=true;}
function announceCounts(){
const places=visiblePlaces();countNode.textContent=places.length+' places · '+uniquePeople(places)+' people';
emptyNode.hidden=places.length>0;
}
function renderPanel(){
if(!chosen)return;
const place=data.places.find(p=>p.id===chosen);
if(!place)return;
const list=eventsOf(place);
if(!list.length){panel.hidden=true;return;}
document.getElementById('placeTitle').textContent=place.name;
document.getElementById('placeTypeLabel').textContent='The family geography';
const users=new Set(list.map(e=>e.personId));
const types=new Set(list.map(e=>e.type));
document.getElementById('placeMeta').textContent=users.size+' '+(users.size===1?'person':'people')+' · '+[...types].map(t=>titles[t]).join(' / ')+(place.precision.includes('approximate')?' · Approximate position':'');
peopleNode.replaceChildren();
const groups=new Map();
for(const item of list){if(!groups.has(item.personId))groups.set(item.personId,[]);groups.get(item.personId).push(item);}
for(const items of groups.values()){
const first=items[0];
const link=element('a','person-place');
link.href='./atlas-v3.9.36.html?atlas-person='+encodeURIComponent(first.personId);
link.title='View '+first.name+' in the Ancestry Atlas tree';
const row=element('div','person-place-head');
const label=element('strong');const dot=element('span','person-branch');dot.style.background=color(first.branch);label.append(dot,document.createTextNode(first.name));
row.append(label,element('em','',branches.get(first.branch)?.name||'Family'));
link.append(row);
for(const item of items){
const detail=element('div','person-place-desc');
const name=element('span','event-name',titles[item.type]);detail.append(name,document.createTextNode(' · '+[item.when,item.qualifier].filter(Boolean).join(' · ')));
link.append(detail);
}
peopleNode.append(link);
}
panel.hidden=false;
}
function selectPlace(place,{fly=true}={}){
chosen=place.id;
renderPanel();
if(map&&fly){
const currentZoom=map.getZoom();
map.flyTo({center:[place.lng,place.lat],zoom:Math.max(3.2,currentZoom),essential:true,speed:1.1});
}
}
function updateMarkers(){
 if(map&&map.getSource(PIN_SOURCE))map.getSource(PIN_SOURCE).setData(pinFeatures());
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
if(!matching.length)matchesNode.append(element('div','search-item','No matching family places'));
}
search.addEventListener('input',searchNow);
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
 map.addImage(PIN_IMAGE,makePinImage(),{pixelRatio:2});
 map.addSource(PIN_SOURCE,{type:'geojson',data:pinFeatures()});
 // 15px invisible hit areas improve taps without visible oversized dots.
 map.addLayer({id:PIN_HIT_LAYER,type:'circle',source:PIN_SOURCE,paint:{'circle-radius':15,'circle-color':'#d83b38','circle-opacity':0}});
 map.addLayer({id:PIN_LAYER,type:'symbol',source:PIN_SOURCE,layout:{
  'icon-image':PIN_IMAGE,'icon-anchor':'bottom',
  'icon-size':['interpolate',['linear'],['zoom'],0,0.7,2,0.82,5,1],
  'icon-allow-overlap':true,'icon-ignore-placement':true
 }});
 updateMarkers();status.hidden=true;
 const id=new URLSearchParams(location.search).get('person');
 if(id){const p=data.places.find(p=>p.events.some(e=>e.personId===id));if(p)selectPlace(p);}
});
map.on('click',e=>{
 const hits=map.queryRenderedFeatures(e.point,{layers:[PIN_HIT_LAYER]});
 const id=hits[0]?.properties?.id;
 const p=id&&data.places.find(place=>place.id===id);
 if(p){selectPlace(p,{fly:false});return;}
 if(!panel.hidden)closePanel();
});
map.on('mouseenter',PIN_HIT_LAYER,()=>{map.getCanvas().style.cursor='pointer';});
map.on('mouseleave',PIN_HIT_LAYER,()=>{map.getCanvas().style.cursor='';});
map.on('error',e=>{if(status&&!status.hidden)status.textContent='Map tiles are loading slowly. Check your network if the globe remains blank.';console.warn('Atlas globe tile or renderer issue',e?.error||e);});

}catch(error){status.textContent='The 3D globe could not start on this device. '+String(error.message||error);console.error('Family geography globe initialization',error);}
}
announceCounts();
loadMap();
})();
