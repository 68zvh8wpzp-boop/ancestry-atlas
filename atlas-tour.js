/* Ancestry Atlas v2.0.0 — one guided-tour controller, one audio controller. No speech-synthesis fallback. */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const els={
 modal:$('storyModal'), shell:document.querySelector('#storyModal .story-shell'), title:$('storyTitle'), person:$('storyPerson'), years:$('storyYears'), place:$('storyPlace'), narrator:$('storyNarrator'), copy:$('storyCopy'), local:$('storyLocal'), macro:$('storyMacro'), event:$('storyEvent'), confidence:$('storyConfidence'), progress:$('storyProgress'),
 prev:$('storyPrevAudio'), play:$('storyPlayPause'), mute:$('storyMute'), next:$('storyNextAudio'), exit:$('storyExitTransport'), status:$('audioStatus'), meter:$('audioMeterFill'), chooser:$('lineChooser'), landing:$('landing')
};
let hud=$('tourOrientationHud');
if(!hud){hud=document.createElement('div');hud.id='tourOrientationHud';hud.setAttribute('aria-live','polite');document.body.appendChild(hud)}
const state={track:'webb',index:0,phase:'idle',muted:false,audio:null,audioReady:false,session:0};

function setStatus(text,stateName=''){if(!els.status)return;els.status.textContent=text||'';els.status.dataset.state=stateName}
function setMeter(v=0){if(els.meter)els.meter.style.width=`${Math.max(0,Math.min(100,v))}%`}
function updateButtons(){
 const tour=BRANCH_TOURS[state.track], n=tour?.steps?.length||0;
 if(els.prev)els.prev.disabled=state.index<=0||state.phase==='orienting';
 if(els.next)els.next.disabled=state.index>=n-1||state.phase==='orienting';
 if(els.mute){els.mute.textContent=state.muted?'🔇':'🔊';els.mute.setAttribute('aria-label',state.muted?'Unmute narration':'Mute narration')}
 if(els.play){const playing=state.audio&&!state.audio.paused&&!state.audio.ended;els.play.textContent=playing?'❚❚':'▶';els.play.setAttribute('aria-label',playing?'Pause narration':'Play narration');els.play.disabled=state.phase==='orienting'||(!state.audioReady && !TOUR_MEDIA[currentStep()?.id]?.audio)}
}
function currentStep(){return BRANCH_TOURS[state.track]?.steps?.[state.index]||null}
function currentNode(){const s=currentStep();return s?nodeById.get(s.id):null}

function stopAudio(){
 if(state.audio){try{state.audio.pause()}catch(e){};state.audio.src='';state.audio.load();state.audio=null}
 state.audioReady=false;setMeter(0);updateButtons();
}
function prepareAudio(step){
 stopAudio();const media=TOUR_MEDIA[step?.id];
 if(!media?.audio){setStatus('No recorded narration for this stop yet','');updateButtons();return}
 const a=new Audio(new URL(media.audio,window.location.href).href);a.preload='metadata';a.muted=state.muted;state.audio=a;
 setStatus('Recorded narration: '+(media.narrator||'approved voice')+' • paused','');
 a.addEventListener('loadedmetadata',()=>{state.audioReady=true;setStatus('Recorded narration: '+(media.narrator||'approved voice')+' • paused','ready');updateButtons()});
 a.addEventListener('canplay',()=>{state.audioReady=true;updateButtons()},{once:true});
 a.addEventListener('timeupdate',()=>{if(a.duration)setMeter((a.currentTime/a.duration)*100)});
 a.addEventListener('play',()=>{setStatus('Playing recorded narration','playing');updateButtons()});
 a.addEventListener('pause',()=>{if(!a.ended)setStatus('Recorded narration paused','ready');updateButtons()});
 a.addEventListener('ended',()=>{setStatus('Recorded narration complete','ready');setMeter(100);updateButtons()});
 a.addEventListener('error',()=>{state.audioReady=false;setStatus('Narration file not found: '+media.audio,'error');updateButtons()});
 a.load();updateButtons();
}

function renderStep(){
 const step=currentStep(), n=currentNode();if(!step||!n)return;
 const tour=BRANCH_TOURS[state.track];els.title.textContent=tour.title;els.person.textContent=n.name;els.years.textContent=n.years||'';els.place.textContent=n.place||'';
 const media=TOUR_MEDIA[n.id];els.narrator.textContent=media?.audio?`Recorded narration: ${media.narrator}`:'Written story • recorded narration not yet produced';
 els.copy.textContent=media?.transcript||step.copy||'';
 const profile=(typeof GUIDE_PROFILES!=='undefined')?GUIDE_PROFILES[n.id]:null;const hist=(typeof historicalContextFor==='function')?historicalContextFor(n):null;
 if(els.local)els.local.textContent=profile?.townContext||hist?.local||'';if(els.macro)els.macro.textContent=profile?.macroContext||hist?.macro||'';
 if(els.event){els.event.textContent=step.event||'';els.event.style.display=step.event?'block':'none'}
 if(els.confidence)els.confidence.textContent=`Evidence status: ${n.confidence||'not recorded'}`;
 if(els.progress)els.progress.textContent=`${state.index+1} of ${tour.steps.length}`;
 prepareAudio(step);updateButtons();
}

async function orientToCurrent(){
 const my=++state.session, step=currentStep();if(!step)return;state.phase='orienting';document.body.classList.add('tour-active','tour-orienting');els.modal.classList.add('open');els.modal.setAttribute('aria-hidden','false');
 if(typeof stopNarration==='function'){try{stopNarration()}catch(e){}} // harmless if a legacy global somehow survives
 try{if(sceneContext)sceneContext.classList.remove('show')}catch(e){};try{card.style.display='none'}catch(e){}
 const sequence=[['Full atlas','atlas',1450],['Follow the branch','branch',1550],['Family around '+(nodeById.get(step.id)?.name||'this person'),'family',1650],['Focus on '+(nodeById.get(step.id)?.name||'this person'),'person',1900]];
 // Select node without showing detail cards; tour CSS suppresses any core panels if openNode/cinematicFocus triggers them.
 try{openNode(step.id,false,true)}catch(e){}
 for(const [label,mode,hold] of sequence){if(my!==state.session)return;hud.textContent=label;try{cinematicFocus(step.id,mode)}catch(e){};await wait(hold)}
 if(my!==state.session)return;hud.textContent='Opening the story…';await wait(700);document.body.classList.remove('tour-orienting');state.phase='paused';renderStep();
 // Keep a useful tree framing behind the desktop sheet; mobile becomes intentionally immersive.
 try{if(window.innerWidth>760)cinematicFocus(step.id,'family')}catch(e){}
 updateButtons();
}

function openChooser(){els.chooser?.classList.add('open');els.chooser?.setAttribute('aria-hidden','false')}
function closeChooser(){els.chooser?.classList.remove('open');els.chooser?.setAttribute('aria-hidden','true')}
function begin(track='webb',index=0){stopAudio();state.track=track;state.index=index;document.querySelectorAll('[data-story-track]').forEach(b=>b.classList.toggle('active',b.dataset.storyTrack===track));closeChooser();els.landing?.classList.add('hidden');orientToCurrent()}
function exitTour(){++state.session;stopAudio();state.phase='idle';document.body.classList.remove('tour-active','tour-orienting');els.modal?.classList.remove('open');els.modal?.setAttribute('aria-hidden','true');setStatus('');setMeter(0);try{if(sceneContext)sceneContext.classList.remove('show')}catch(e){};updateButtons()}

function togglePlay(){
 const a=state.audio, media=TOUR_MEDIA[currentStep()?.id];if(!media?.audio){setStatus('No recorded narration for this stop yet','');return}
 if(!a){renderStep();return}
 a.muted=state.muted;
 if(!a.paused){a.pause();return}
 // This call occurs directly in the user's tap handler, which is required by iOS audio policies.
 const p=a.play();if(p?.catch)p.catch(()=>setStatus('Tap Play again after the audio finishes loading','error'));
}
function toggleMute(){state.muted=!state.muted;if(state.audio)state.audio.muted=state.muted;updateButtons()}
async function move(delta){if(state.phase==='orienting')return;stopAudio();state.index=Math.max(0,Math.min((BRANCH_TOURS[state.track]?.steps?.length||1)-1,state.index+delta));await orientToCurrent()}

els.play?.addEventListener('click',togglePlay);els.mute?.addEventListener('click',toggleMute);els.prev?.addEventListener('click',()=>move(-1));els.next?.addEventListener('click',()=>move(1));els.exit?.addEventListener('click',exitTour);
$('storyFocus')?.addEventListener('click',()=>{const s=currentStep();if(s){exitTour();openNode(s.id,true,true)}});
$('sceneContextClose')?.addEventListener('click',()=>sceneContext?.classList.remove('show'));
$('lineChooserClose')?.addEventListener('click',closeChooser);$('startStory')?.addEventListener('click',openChooser);$('openStoryBtn')?.addEventListener('click',openChooser);
$('startExplore')?.addEventListener('click',()=>els.landing?.classList.add('hidden'));$('homeLanding')?.addEventListener('click',()=>els.landing?.classList.remove('hidden'));
document.querySelectorAll('#lineChooser [data-launch-track]').forEach(b=>b.addEventListener('click',()=>begin(b.dataset.launchTrack,0)));
document.querySelectorAll('[data-story-track]').forEach(b=>b.addEventListener('click',()=>begin(b.dataset.storyTrack,0)));
$('startAlbum')?.addEventListener('click',()=>{els.landing?.classList.add('hidden');$('albumModal')?.classList.add('open');$('albumModal')?.setAttribute('aria-hidden','false');if(typeof renderAlbum==='function')renderAlbum()});
$('openAlbumBtn')?.addEventListener('click',()=>{$('albumModal')?.classList.add('open');$('albumModal')?.setAttribute('aria-hidden','false');if(typeof renderAlbum==='function')renderAlbum()});
$('printAtlasBtn')?.addEventListener('click',()=>window.print());
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('tour-active'))exitTour()});
window.AncestryTour={begin,exit:exitTour,state};
updateButtons();
})();
