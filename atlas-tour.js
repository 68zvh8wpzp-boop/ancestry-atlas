/* Ancestry Atlas v2.2.0 — cinematic branch entrance + one responsive A/V tour controller. */
(()=>{
'use strict';

const $=id=>document.getElementById(id);
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const easeOutQuint=t=>1-Math.pow(1-t,5);

const els={
  modal:$('storyModal'),
  shell:document.querySelector('#storyModal .story-shell'),
  title:$('storyTitle'),
  person:$('storyPerson'),
  years:$('storyYears'),
  place:$('storyPlace'),
  narrator:$('storyNarrator'),
  copy:$('storyCopy'),
  local:$('storyLocal'),
  macro:$('storyMacro'),
  event:$('storyEvent'),
  confidence:$('storyConfidence'),
  progress:$('storyProgress'),
  prev:$('storyPrevAudio'),
  play:$('storyPlayPause'),
  mute:$('storyMute'),
  next:$('storyNextAudio'),
  exit:$('storyExitTransport'),
  topExit:$('storyClose'),
  status:$('audioStatus'),
  meter:$('audioMeterFill'),
  chooser:$('lineChooser'),
  landing:$('landing'),
  sceneStrip:$('storySceneStrip'),
  scenePhoto:$('storyScenePhoto'),
  sceneArt:$('storySceneArt'),
  sceneTitle:$('storySceneTitle'),
  sceneCaption:$('storySceneCaption'),
  sceneSource:$('storySceneSource'),
  sceneCount:$('storySceneCount'),
  treeDock:$('mobileTreeDock'),
  treeSheet:$('mobileTreeMenuSheet')
};

let hud=$('tourOrientationHud');
if(!hud){
  hud=document.createElement('div');
  hud.id='tourOrientationHud';
  hud.setAttribute('aria-live','polite');
  document.body.appendChild(hud);
}

const state={
  track:'canada',
  index:0,
  phase:'idle',
  muted:false,
  audio:null,
  audioReady:false,
  session:0
};

function currentTour(){ return BRANCH_TOURS[state.track]; }
function currentStep(){ return currentTour()?.steps?.[state.index] || null; }
function currentNode(){ const step=currentStep(); return step ? nodeById.get(step.id) : null; }

function setStatus(text,stateName=''){
  if(!els.status) return;
  els.status.textContent=text||'';
  els.status.dataset.state=stateName;
}
function setMeter(v=0){
  if(els.meter) els.meter.style.width=`${clamp(v,0,100)}%`;
}
function setTransport(){
  const tour=currentTour();
  const count=tour?.steps?.length||0;
  if(els.prev) els.prev.disabled=state.index<=0 || state.phase==='orienting';
  if(els.next) els.next.disabled=state.index>=count-1 || state.phase==='orienting';
  if(els.mute){
    els.mute.textContent=state.muted?'🔇':'🔊';
    els.mute.setAttribute('aria-label',state.muted?'Unmute narration':'Mute narration');
  }
  if(els.play){
    const playing=!!(state.audio && !state.audio.paused && !state.audio.ended);
    els.play.textContent=playing?'❚❚':'▶';
    els.play.setAttribute('aria-label',playing?'Pause narration':'Play narration');
    const hasAudio=!!TOUR_MEDIA[currentStep()?.id]?.audio;
    els.play.disabled=state.phase==='orienting' || !hasAudio;
  }
}

function clearCoreOverlays(){
  try{ sceneContext?.classList.remove('show'); }catch(e){}
  try{ card.style.display='none'; }catch(e){}
  try{ document.getElementById('docModal')?.classList.remove('open'); }catch(e){}
  try{ document.getElementById('albumModal')?.classList.remove('open'); }catch(e){}
}

function stopAudio(){
  if(state.audio){
    try{state.audio.pause()}catch(e){}
    state.audio.removeAttribute('src');
    try{state.audio.load()}catch(e){}
    state.audio=null;
  }
  state.audioReady=false;
  setMeter(0);
  setTransport();
}

function prepareAudio(step){
  stopAudio();
  const media=TOUR_MEDIA[step?.id];
  if(!media?.audio){
    setStatus('Recorded narration has not been produced for this stop.','');
    setTransport();
    return;
  }

  const url=new URL(media.audio,window.location.href).href;
  const audio=new Audio(url);
  audio.preload='metadata';
  audio.muted=state.muted;
  state.audio=audio;

  setStatus(`Recorded narration: ${media.narrator||'approved voice'} • paused`,'loading');

  audio.addEventListener('loadedmetadata',()=>{
    state.audioReady=true;
    setStatus(`Recorded narration: ${media.narrator||'approved voice'} • paused`,'ready');
    setTransport();
  });
  audio.addEventListener('canplay',()=>{state.audioReady=true;setTransport()},{once:true});
  audio.addEventListener('timeupdate',()=>{
    if(audio.duration) setMeter((audio.currentTime/audio.duration)*100);
  });
  audio.addEventListener('play',()=>{
    setStatus(`Playing ${media.narrator||'recorded narration'}`,'playing');
    setTransport();
  });
  audio.addEventListener('pause',()=>{
    if(!audio.ended) setStatus('Recorded narration paused','ready');
    setTransport();
  });
  audio.addEventListener('ended',()=>{
    setStatus('Recorded narration complete','ready');
    setMeter(100);
    setTransport();
  });
  audio.addEventListener('error',()=>{
    state.audioReady=false;
    setStatus(`Narration unavailable — ${media.audio}`,'error');
    setTransport();
  });
  audio.load();
  setTransport();
}

function setBranchOnly(track){
  const ids=(BRANCH_TOURS[track]?.steps||[]).map(s=>s.id).filter(id=>nodeById.has(id));
  window.__tourVisibleNodeIds=new Set(ids);
  return ids;
}
function clearBranchOnly(){
  window.__tourVisibleNodeIds=null;
  window.__tourSuppressLabels=false;
  try{draw()}catch(e){}
}

function cameraTargetForBranch(ids){
  const mid=ids[Math.floor((ids.length-1)/2)] || ids[0] || 'you';

  // Establish a stable branch-centered camera at scale 1 so projected spread can be measured.
  scale=1;
  selected=ids[0]||mid;
  nodeViewLevel='atlas';
  nodeFocusMode=false;
  navigationNeighborhood=new Set();
  try{centerOnNode(mid)}catch(e){
    originNodeId=mid;
    panX=0;
    panY=0;
  }

  const pts=ids.map(id=>nodeById.get(id)).filter(Boolean).map(n=>project(n));
  if(!pts.length) return 56;

  const xs=pts.map(p=>p.x), ys=pts.map(p=>p.y);
  const spanX=Math.max(1,Math.max(...xs)-Math.min(...xs));
  const spanY=Math.max(1,Math.max(...ys)-Math.min(...ys));
  const w=Math.max(320,stage.clientWidth);
  const h=Math.max(420,stage.clientHeight);

  // Fill most of the screen without pushing the oldest or newest generation off-canvas.
  const fit=Math.min((w*.76)/spanX,(h*.64)/spanY);
  const portrait=window.matchMedia('(orientation: portrait)').matches;
  const mobile=window.matchMedia('(max-width:760px)').matches;
  const min=mobile ? (portrait?46:40) : 42;
  const max=mobile ? (portrait?78:68) : 76;
  return clamp(fit,min,max);
}

async function cinematicBranchEntrance(track,focusId,mySession){
  const ids=setBranchOnly(track);
  if(!ids.length) return;

  state.phase='orienting';
  document.body.classList.add('tour-active','tour-orienting','tour-distant');
  document.body.classList.remove('tour-story-open');
  clearCoreOverlays();

  // Story sheet stays completely closed while the family line approaches.
  els.modal?.classList.remove('open');
  els.modal?.setAttribute('aria-hidden','true');

  window.__tourSuppressLabels=true;
  const targetScale=cameraTargetForBranch(ids);
  const startScale=Math.max(.55,targetScale*.018);
  const endScale=targetScale;
  scale=startScale;
  selected=focusId||ids[0];
  try{draw()}catch(e){}

  const start=performance.now();
  const duration=8000;

  hud.textContent=currentTour()?.title||'Family line';
  hud.classList.add('show');

  await new Promise(resolve=>{
    const tick=now=>{
      if(mySession!==state.session){resolve();return;}
      const t=clamp((now-start)/duration,0,1);
      const e=easeOutQuint(t);

      // Most of the physical travel happens early; the final third visibly settles.
      scale=startScale+(endScale-startScale)*e;

      // Labels materialize only once the constellation is becoming a readable family tree.
      if(t>.60 && window.__tourSuppressLabels){
        window.__tourSuppressLabels=false;
        document.body.classList.remove('tour-distant');
      }

      try{draw()}catch(err){}
      if(t<1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  if(mySession!==state.session) return;

  // Let the final family-line composition breathe before the story takes over.
  window.__tourSuppressLabels=false;
  document.body.classList.remove('tour-distant');
  selected=focusId||ids[0];
  try{draw()}catch(e){}
  await wait(900);

  if(mySession!==state.session) return;
  hud.classList.remove('show');
}


function renderStoryMedia(step){
  const media=TOUR_MEDIA[step?.id];
  const scenes=Array.isArray(media?.scenes)?media.scenes:[];
  if(!els.sceneStrip) return;
  if(!scenes.length){
    els.sceneStrip.classList.remove('show');
    els.sceneStrip.setAttribute('aria-hidden','true');
    if(els.scenePhoto) els.scenePhoto.removeAttribute('src');
    return;
  }
  const scene=scenes[0];
  // Move the media stage inside the story sheet exactly once.
  const shell=els.shell;
  const top=shell?.querySelector('.story-top');
  if(shell && top && els.sceneStrip.parentElement!==shell){
    top.insertAdjacentElement('afterend',els.sceneStrip);
  }
  els.sceneStrip.classList.add('show');
  els.sceneStrip.setAttribute('aria-hidden','false');
  if(els.scenePhoto){
    els.scenePhoto.src=scene.src||'';
    els.scenePhoto.alt=scene.alt||scene.title||'Historical photograph';
    els.scenePhoto.style.display=scene.src?'block':'none';
  }
  if(els.sceneArt) els.sceneArt.style.display='none';
  if(els.sceneTitle) els.sceneTitle.textContent=scene.title||'';
  if(els.sceneCaption) els.sceneCaption.textContent=scene.caption||'';
  if(els.sceneSource) els.sceneSource.textContent=scene.source?` • ${scene.source}`:'';
  if(els.sceneCount) els.sceneCount.textContent=scenes.length>1?`1 / ${scenes.length}`:'';
}

function renderStep(){
  const step=currentStep();
  const node=currentNode();
  if(!step||!node) return;

  const tour=currentTour();
  if(els.title) els.title.textContent=tour.title;
  if(els.person) els.person.textContent=node.name;
  if(els.years) els.years.textContent=node.years||'';
  if(els.place) els.place.textContent=node.place||'';

  const media=TOUR_MEDIA[node.id];
  renderStoryMedia(step);
  if(els.narrator){
    els.narrator.textContent=media?.audio
      ? `Recorded narration: ${media.narrator}`
      : 'Recorded narration not yet produced';
  }
  if(els.copy) els.copy.textContent=media?.transcript||step.copy||'';

  const profile=(typeof GUIDE_PROFILES!=='undefined')?GUIDE_PROFILES[node.id]:null;
  const hist=(typeof historicalContextFor==='function')?historicalContextFor(node):null;
  if(els.local) els.local.textContent=profile?.townContext||hist?.local||'';
  if(els.macro) els.macro.textContent=profile?.macroContext||hist?.macro||'';
  if(els.event){
    els.event.textContent=step.event||'';
    els.event.style.display=step.event?'block':'none';
  }
  if(els.confidence) els.confidence.textContent=`Evidence status: ${node.confidence||'not recorded'}`;
  if(els.progress) els.progress.textContent=`${state.index+1} of ${tour.steps.length}`;

  prepareAudio(step);
  setTransport();
}

async function openStoryAfterEntrance(){
  if(state.session<1) return;
  clearCoreOverlays();
  renderStep();
  state.phase='paused';

  // Everything behind the A/V story dissolves to black.
  document.body.classList.remove('tour-orienting');
  document.body.classList.add('tour-story-open');
  els.modal?.classList.add('open');
  els.modal?.setAttribute('aria-hidden','false');

  setTransport();
}

async function orientAndOpenCurrent({fullEntrance=false}={}){
  const my=++state.session;
  const step=currentStep();
  if(!step) return;

  stopAudio();
  clearCoreOverlays();

  if(fullEntrance){
    await cinematicBranchEntrance(state.track,step.id,my);
  }else{
    state.phase='orienting';
    document.body.classList.add('tour-active','tour-orienting');
    document.body.classList.remove('tour-story-open');
    els.modal?.classList.remove('open');
    els.modal?.setAttribute('aria-hidden','true');

    // Between stops, use a shorter but still deliberate camera move.
    setBranchOnly(state.track);
    window.__tourSuppressLabels=false;
    try{cinematicFocus(step.id,'family')}catch(e){}
    await wait(2400);
  }

  if(my!==state.session) return;
  await openStoryAfterEntrance();
}

function openChooser(){
  els.chooser?.classList.add('open');
  els.chooser?.setAttribute('aria-hidden','false');
}
function closeChooser(){
  els.chooser?.classList.remove('open');
  els.chooser?.setAttribute('aria-hidden','true');
}

function begin(track='canada',index=0){
  stopAudio();
  state.track=track;
  state.index=index;
  closeChooser();
  els.landing?.classList.add('hidden');
  document.querySelectorAll('[data-story-track]').forEach(
    b=>b.classList.toggle('active',b.dataset.storyTrack===track)
  );
  orientAndOpenCurrent({fullEntrance:true});
}

function exitTour(){
  const returnId=currentStep()?.id || selected || 'you';
  ++state.session;
  stopAudio();
  state.phase='idle';
  hud.classList.remove('show');
  document.body.classList.remove('tour-active','tour-orienting','tour-distant','tour-story-open');
  els.modal?.classList.remove('open');
  els.modal?.setAttribute('aria-hidden','true');
  els.sceneStrip?.classList.remove('show');
  clearCoreOverlays();
  clearBranchOnly();
  setStatus('');
  setMeter(0);

  if(window.matchMedia('(max-width:800px)').matches){
    try{
      window.AncestryMobileTreeInternal?.focusIds(returnId,10);
      selected=returnId;
      cinematicFocus(returnId,'family');
      setTimeout(()=>{try{card.style.display='none';sceneContext?.classList.remove('show');draw();}catch(e){}},80);
    }catch(e){}
  }
  setTransport();
}

function togglePlay(){
  const media=TOUR_MEDIA[currentStep()?.id];
  if(!media?.audio){
    setStatus('Recorded narration has not been produced for this stop.','');
    return;
  }
  if(!state.audio){
    prepareAudio(currentStep());
    setStatus('Audio loading — tap Play again when ready','loading');
    return;
  }
  state.audio.muted=state.muted;
  if(!state.audio.paused){
    state.audio.pause();
    return;
  }
  const p=state.audio.play();
  if(p?.catch) p.catch(()=>setStatus('Tap Play again after the recording finishes loading','error'));
}
function toggleMute(){
  state.muted=!state.muted;
  if(state.audio) state.audio.muted=state.muted;
  setTransport();
}
async function move(delta){
  if(state.phase==='orienting') return;
  const count=currentTour()?.steps?.length||1;
  const next=clamp(state.index+delta,0,count-1);
  if(next===state.index) return;
  state.index=next;
  await orientAndOpenCurrent({fullEntrance:false});
}

els.play?.addEventListener('click',togglePlay);
els.mute?.addEventListener('click',toggleMute);
els.prev?.addEventListener('click',()=>move(-1));
els.next?.addEventListener('click',()=>move(1));
els.exit?.addEventListener('click',exitTour);
els.topExit?.addEventListener('click',exitTour);

$('storyFocus')?.addEventListener('click',()=>{
  const step=currentStep();
  if(!step) return;
  const id=step.id;
  exitTour();
  try{openNode(id,true,true)}catch(e){}
});

$('lineChooserClose')?.addEventListener('click',closeChooser);
$('startStory')?.addEventListener('click',openChooser);
$('openStoryBtn')?.addEventListener('click',openChooser);
$('startExplore')?.addEventListener('click',()=>els.landing?.classList.add('hidden'));
$('homeLanding')?.addEventListener('click',()=>els.landing?.classList.remove('hidden'));

document.querySelectorAll('#lineChooser [data-launch-track]').forEach(
  b=>b.addEventListener('click',()=>begin(b.dataset.launchTrack,0))
);
document.querySelectorAll('[data-story-track]').forEach(
  b=>b.addEventListener('click',()=>begin(b.dataset.storyTrack,0))
);

$('startAlbum')?.addEventListener('click',()=>{
  els.landing?.classList.add('hidden');
  $('albumModal')?.classList.add('open');
  $('albumModal')?.setAttribute('aria-hidden','false');
  if(typeof renderAlbum==='function') renderAlbum();
});
$('openAlbumBtn')?.addEventListener('click',()=>{
  $('albumModal')?.classList.add('open');
  $('albumModal')?.setAttribute('aria-hidden','false');
  if(typeof renderAlbum==='function') renderAlbum();
});
$('printAtlasBtn')?.addEventListener('click',()=>window.print());

document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && document.body.classList.contains('tour-active')) exitTour();
});

window.addEventListener('orientationchange',()=>{
  if(state.phase==='orienting') return;
  // Re-fit the currently visible family line after portrait/landscape rotation.
  if(document.body.classList.contains('tour-active')){
    try{
      const ids=[...(window.__tourVisibleNodeIds||[])];
      if(ids.length){
        const target=cameraTargetForBranch(ids);
        scale=target;
        draw();
      }
    }catch(e){}
  }
});


/* Mobile tree navigation: intentionally local, never the full genealogy by default. */
const mobileTree={
  history:[],
  mode:'family'
};
function mobileFocus(id='you',pushHistory=true){
  if(!window.matchMedia('(max-width:800px)').matches) return;
  const target=nodeById.has(id)?id:'you';
  if(pushHistory && selected && selected!==target) mobileTree.history.push(selected);
  window.AncestryMobileTreeInternal?.focusIds(target,10);
  selected=target;
  try{card.style.display='none';sceneContext?.classList.remove('show');}catch(e){}
  cinematicFocus(target,'family');
  mobileTree.mode='family';
}
function mobileBack(){
  const id=mobileTree.history.pop();
  if(id) mobileFocus(id,false);
}
function mobileExpand(){
  if(mobileTree.mode==='family'){
    window.__mobileTreeVisibleNodeIds=buildNavigationNeighborhood(selected||'you','branch');
    nodeViewLevel='branch';nodeFocusMode=true;navigationNeighborhood=new Set(window.__mobileTreeVisibleNodeIds);
    setViewButtons('branch');
    cinematicFocus(selected||'you','branch');
    mobileTree.mode='branch';
  }else{
    window.__mobileTreeVisibleNodeIds=null;
    setNodeView('atlas');
    mobileTree.mode='atlas';
  }
}
function openTreeSheet(){
  els.treeSheet?.classList.add('open');
  els.treeSheet?.setAttribute('aria-hidden','false');
}
function closeTreeSheet(){
  els.treeSheet?.classList.remove('open');
  els.treeSheet?.setAttribute('aria-hidden','true');
}
$('mobileTreeHome')?.addEventListener('click',()=>mobileFocus('you'));
$('mobileTreeBack')?.addEventListener('click',mobileBack);
$('mobileTreeFocus')?.addEventListener('click',()=>mobileFocus(selected||'you',false));
$('mobileTreeExpand')?.addEventListener('click',mobileExpand);
$('mobileTreeMenu')?.addEventListener('click',openTreeSheet);
$('mobileTreeMenuClose')?.addEventListener('click',closeTreeSheet);
$('mobileTreeStory')?.addEventListener('click',()=>{closeTreeSheet();openChooser();});
$('mobileTreeAlbum')?.addEventListener('click',()=>{
  closeTreeSheet();
  $('albumModal')?.classList.add('open');
  $('albumModal')?.setAttribute('aria-hidden','false');
  if(typeof renderAlbum==='function') renderAlbum();
});
$('mobileTreeWholeAtlas')?.addEventListener('click',()=>{
  closeTreeSheet();
  window.__mobileTreeVisibleNodeIds=null;
  setNodeView('atlas');
  mobileTree.mode='atlas';
});
$('mobileTreeStart')?.addEventListener('click',()=>{
  closeTreeSheet();
  els.landing?.classList.remove('hidden');
});

window.AncestryTour={begin,exit:exitTour,state};
setTransport();
})();
