/* Ancestry Atlas Family Geography launch and return integration; no approved tree content changes. */
(()=>{
'use strict';
function addLauncher(){
const landing=document.querySelector('#landing .landing-actions');
if(!landing)return;
if(!document.getElementById('startGlobe')){
 const b=document.createElement('button');b.type='button';b.id='startGlobe';b.className='story-action';
 b.innerHTML='<span aria-hidden="true">◎</span> Explore the Family Globe';
 b.title='Interactive world globe of places where relatives were born, lived, or died';
 b.addEventListener('click',()=>launchGlobe());
 const explore=document.getElementById('startExplore');if(explore)explore.insertAdjacentElement('afterend',b);else landing.append(b);
}
const toolbar=document.querySelector('.family-toolbar');
if(toolbar&&!document.getElementById('openGlobeBtn')){
 const b=document.createElement('button');b.type='button';b.id='openGlobeBtn';b.textContent='◎ Family globe';
 b.addEventListener('click',()=>launchGlobe());const story=document.getElementById('openStoryBtn');
 if(story)story.insertAdjacentElement('beforebegin',b);else toolbar.append(b);
}
const menu=document.getElementById('mobileTreeMenuSheet');
if(menu&&!document.getElementById('mobileTreeGlobe')){
 const b=document.createElement('button');b.type='button';b.id='mobileTreeGlobe';b.textContent='◎ Spin the Family Globe';
 b.addEventListener('click',()=>launchGlobe());
 const places=document.getElementById('mobileTreePlaces');if(places)places.insertAdjacentElement('beforebegin',b);else menu.append(b);
}
const style=document.createElement('style');
style.textContent='#startGlobe{background:linear-gradient(140deg,#183e55,#174859)!important;border:1px solid #a9c9d6!important;color:#f6f8f5!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.15)}#startGlobe:hover{filter:brightness(1.2)}#openGlobeBtn,#mobileTreeGlobe{border-color:#80a9b5!important;color:#e9f9f7!important}';
document.head.append(style);
const params=new URLSearchParams(window.location.search);
const person=params.get('atlas-person');
if(person&&/^[a-z0-9_]+$/.test(person)){
 // Tree functions are supplied by the canonical inline atlas script.
 if(typeof openNode==='function'){
 document.getElementById('landing')?.classList.add('hidden');
 try{openNode(person,true,true)}catch(e){console.warn('Unable to open person from family globe',e)}
 }
}
}
function launchGlobe(){
let id='';
try{if(typeof selected==='string'&&/^[a-z0-9_]+$/.test(selected))id=selected}catch(_){}
window.location.href='./atlas-globe.html'+(id?'?person='+encodeURIComponent(id):'');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addLauncher,{once:true});
else addLauncher();
})();
