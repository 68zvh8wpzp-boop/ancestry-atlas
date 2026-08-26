/* Ancestry Atlas v3.5.2 — cinematic branch entrance + measured responsive A/V controller. */
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
  slideshowToggle:$('storySlideshowToggle'),
  locatorLabel:$('storyLocatorLabel'),
  locatorDot:$('storyLocatorDot'),
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


function ensureSceneStagePlacement(){
  if(els.shell && els.sceneStrip && els.sceneStrip.parentElement!==els.shell){
    const top=els.shell.querySelector('.story-top');
    if(top) top.insertAdjacentElement('afterend',els.sceneStrip);
  }
}
ensureSceneStagePlacement();

function enforceStorySurface(){
  const pin=(element)=>{
    if(!element)return;
    const rules={
      position:'fixed',left:'0px',top:'0px',right:'0px',bottom:'0px',
      width:'auto',height:'auto','min-width':'0px','min-height':'0px',
      'max-width':'none','max-height':'none',margin:'0px',transform:'none',
      overflow:'hidden'
    };
    for(const [property,value] of Object.entries(rules)) element.style.setProperty(property,value,'important');
  };
  pin(els.modal);
  pin(els.shell);
  pin(els.sceneStrip);
}

function syncStoryViewport(){
  const vv=window.visualViewport;
  const width=Math.max(320,Math.round(vv?.width||window.innerWidth||document.documentElement.clientWidth||0));
  const height=Math.max(180,Math.round(vv?.height||window.innerHeight||document.documentElement.clientHeight||0));
  document.documentElement.style.setProperty('--story-vw',`${width}px`);
  document.documentElement.style.setProperty('--story-vh',`${height}px`);
  document.documentElement.style.setProperty('--story-center-x',`${Math.round(width/2)}px`);
  if(document.body.classList.contains('tour-story-open')) enforceStorySurface();
}
syncStoryViewport();
window.addEventListener('resize',syncStoryViewport);
window.addEventListener('orientationchange',()=>setTimeout(syncStoryViewport,80));
window.visualViewport?.addEventListener('resize',syncStoryViewport);

const state={
  track:'canada',
  index:0,
  phase:'idle',
  muted:false,
  audio:null,
  audioReady:false,
  audioUnavailable:false,
  session:0,
  activeParagraph:-1,
  activeScene:-1,
  followNarration:true,
  followSuspendUntil:0,
  audioCandidateIndex:0,
  slideshowExpanded:true,
  audioLoadTimer:null,
  returnContext:null
};

const sceneImageCache=new Map();

function sceneImageUrl(scene){
  if(!scene?.src)return '';
  const url=new URL(scene.src,window.location.href);
  url.searchParams.set('atlas','3.8.12');
  return url.href;
}

function preloadScene(scene,{priority='auto'}={}){
  const url=sceneImageUrl(scene);
  if(!url)return null;
  if(sceneImageCache.has(url))return sceneImageCache.get(url);
  const image=new Image();
  image.decoding='async';
  image.fetchPriority=priority;
  const entry={url,image,status:'loading',promise:null};
  entry.promise=new Promise(resolve=>{
    image.onload=()=>{
      entry.status='ready';
      resolve(entry);
      try{image.decode().catch(()=>{})}catch(error){}
    };
    image.onerror=()=>{
      entry.status='error';
      resolve(entry);
    };
  });
  image.src=url;
  if(image.complete&&image.naturalWidth>0){
    entry.status='ready';
    entry.promise=Promise.resolve(entry);
  }
  sceneImageCache.set(url,entry);
  return entry;
}

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
    const icon=els.mute.querySelector('.transport-icon'),label=els.mute.querySelector('.transport-label');
    if(icon)icon.textContent=state.muted?'🔇':'🔊';
    if(label)label.textContent=state.muted?'Narration Off':'Narration On';
    els.mute.setAttribute('aria-label',state.muted?'Unmute narration':'Mute narration');
  }
  if(els.play){
    const playing=!!(state.audio && !state.audio.paused && !state.audio.ended);
    const icon=els.play.querySelector('.transport-icon'),label=els.play.querySelector('.transport-label');
    if(icon)icon.textContent=playing?'❚❚':'▶';
    if(label)label.textContent=playing?'Pause':'Play';
    els.play.setAttribute('aria-label',playing?'Pause narration':'Play narration');
    const hasAudio=!!TOUR_MEDIA[currentStep()?.id]?.audio;
    els.play.disabled=state.phase==='orienting' || !hasAudio || state.audioUnavailable;
  }
}

function clearCoreOverlays(){
  try{ sceneContext?.classList.remove('show'); }catch(e){}
  try{ card.style.display='none'; }catch(e){}
  try{ document.getElementById('docModal')?.classList.remove('open'); }catch(e){}
  try{ document.getElementById('albumModal')?.classList.remove('open'); }catch(e){}
  try{ document.getElementById('storyPlaceModal')?.classList.remove('open'); }catch(e){}
}

function stopAudio(){
  if(state.audioLoadTimer){
    clearTimeout(state.audioLoadTimer);
    state.audioLoadTimer=null;
  }
  if(state.audio){
    try{state.audio.pause()}catch(e){}
    state.audio.removeAttribute('src');
    try{state.audio.load()}catch(e){}
    state.audio=null;
  }
  state.audioReady=false;
  state.audioUnavailable=false;
  setMeter(0);
  setTransport();
}

function candidateAudioUrls(media){
  const names=[...(media?.audioCandidates||[]),media?.audio].filter(Boolean);
  return [...new Set(names)].map(name=>new URL(name,window.location.href).href + (name.includes('?')?'&':'?') + 'atlas=2.3.0');
}

function narratorLabel(media){
  return String(media?.narrator||'Recorded narrator').trim();
}

function attachAudioEvents(audio,media,candidates,index){
  audio.preload='auto';
  audio.muted=state.muted;
  state.audio=audio;
  state.audioCandidateIndex=index;

  audio.addEventListener('loadedmetadata',()=>{
    if(state.audioLoadTimer){clearTimeout(state.audioLoadTimer);state.audioLoadTimer=null;}
    state.audioReady=true;
    setStatus(`${narratorLabel(media)} ready • ${Math.round(audio.duration||0)} sec • paused`,'ready');
    setTransport();
  });
  audio.addEventListener('canplay',()=>{
    if(state.audioLoadTimer){clearTimeout(state.audioLoadTimer);state.audioLoadTimer=null;}
    state.audioReady=true;
    setStatus(`${narratorLabel(media)} ready • paused`,'ready');
    setTransport();
  });
  audio.addEventListener('timeupdate',()=>syncNarrationProgress(audio));
  audio.addEventListener('play',()=>{
    setStatus(`${narratorLabel(media)} playing`,'playing');
    setTransport();
  });
  audio.addEventListener('pause',()=>{
    if(!audio.ended) setStatus(`${narratorLabel(media)} paused`,'ready');
    setTransport();
  });
  audio.addEventListener('ended',()=>{
    setStatus(`${narratorLabel(media)} narration complete`,'ready');
    setMeter(100);
    setTransport();
  });
  audio.addEventListener('error',()=>{
    if(state.audioLoadTimer){clearTimeout(state.audioLoadTimer);state.audioLoadTimer=null;}
    const next=index+1;
    if(next<candidates.length){
      const replacement=new Audio(candidates[next]);
      attachAudioEvents(replacement,media,candidates,next);
      replacement.load();
    }else{
      state.audioReady=false;
      state.audioUnavailable=true;
      state.audio=null;
      setStatus(`${narratorLabel(media)} recording not found in the published site`,'error');
      setTransport();
    }
  },{once:true});
}

function prepareAudio(step){
  stopAudio();
  const media=TOUR_MEDIA[step?.id];
  if(!media?.audio){
    setStatus('Recorded narration has not been produced for this stop.','');
    setTransport();
    return;
  }

  const candidates=candidateAudioUrls(media);
  setStatus(`Loading ${narratorLabel(media)} recording…`,'loading');
  const audio=new Audio(candidates[0]);
  attachAudioEvents(audio,media,candidates,0);
  audio.load();
  state.audioLoadTimer=setTimeout(()=>{
    if(state.audio===audio && !state.audioReady){
      try{audio.pause();audio.removeAttribute('src');audio.load();}catch(e){}
      state.audioUnavailable=true;
      state.audio=null;
      setStatus(`The approved ${narratorLabel(media)} recording is unavailable. You can return to the tree or exit TV Mode.`,'error');
      setTransport();
    }
  },8000);
  setTransport();
}

function preloadApprovedScenes(media){
  return (media?.scenes||[]).map(preloadScene).filter(Boolean);
}

async function waitForOpeningScene(media){
  const first=preloadScene(media?.scenes?.[0],{priority:'high'});
  if(!first||first.status!=='loading')return first;
  return Promise.race([first.promise,wait(12000).then(()=>first)]);
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

function fitMobileBranch(ids,focusId){
  selected=focusId||ids[0];
  originNodeId=selected;
  pivotWorld={x:0,y:0,z:0};pivotCamera={x:0,y:0,z:0};
  rotX=0;rotY=0;scale=1;panX=0;panY=0;
  let pts=ids.map(id=>nodeById.get(id)).filter(Boolean).map(n=>project(n));
  if(!pts.length)return 54;
  const spanX=Math.max(1,Math.max(...pts.map(p=>p.x))-Math.min(...pts.map(p=>p.x)));
  const spanY=Math.max(1,Math.max(...pts.map(p=>p.y))-Math.min(...pts.map(p=>p.y)));
  const w=stage.clientWidth,h=stage.clientHeight;
  const fitted=clamp(Math.min((w-176)/spanX,(h-150)/spanY),38,74);
  scale=fitted;
  pts=ids.map(id=>nodeById.get(id)).filter(Boolean).map(n=>project(n));
  const centerX=(Math.min(...pts.map(p=>p.x))+Math.max(...pts.map(p=>p.x)))/2;
  const centerY=(Math.min(...pts.map(p=>p.y))+Math.max(...pts.map(p=>p.y)))/2;
  panX+=w/2-centerX;
  panY+=centerY-h*.50;
  return fitted;
}

async function cinematicBranchEntrance(track,focusId,mySession){
  let ids=setBranchOnly(track);
  if(!ids.length) return;

  state.phase='orienting';
  document.body.classList.add('tour-active','tour-orienting','tour-distant');
  document.body.classList.remove('tour-story-open');
  clearCoreOverlays();

  // Story sheet stays completely closed while the family line approaches.
  els.modal?.classList.remove('open');
  els.modal?.setAttribute('aria-hidden','true');

  // The opening is an orientation sequence, so names are information—not a
  // late decorative reveal. Start readable and preserve the family grammar.
  window.__tourSuppressLabels=false;
  rotX=0;
  rotY=0;
  const mobile=window.matchMedia('(max-width:800px)').matches;
  const targetScale=mobile?fitMobileBranch(ids,focusId):cameraTargetForBranch(ids);
  const endPanX=panX,endPanY=panY;
  const endRotX=0,endRotY=0;
  const startScale=Math.max(.16,targetScale*.0025);
  const endScale=targetScale;

  // Solve the final label arrangement once, then keep each card on that side
  // of its node throughout the approach. Re-running the collision solver while
  // scale changed was the source of the rapid phone label shudder.
  scale=endScale;rotX=endRotX;rotY=endRotY;panX=endPanX;panY=endPanY;
  window.__tourApproachProgress=1;
  window.__tourCapturedLabelOffsets={};
  window.__tourCaptureLabelOffsets=true;
  try{draw()}catch(e){}
  window.__tourCaptureLabelOffsets=false;
  window.__tourLockedLabelOffsets=window.__tourCapturedLabelOffsets;

  scale=startScale;
  rotX=0;
  rotY=-.72;
  const orbit=Math.min(stage.clientWidth,stage.clientHeight)*.10;
  panX=endPanX+orbit;
  panY=endPanY;
  window.__tourApproachProgress=0;
  selected=focusId||ids[0];
  try{draw()}catch(e){}

  const start=performance.now();
  const duration=12800;

  hud.textContent=currentTour()?.title||'Family line';
  hud.classList.add('show');

  await new Promise(resolve=>{
    const tick=now=>{
      if(mySession!==state.session){resolve();return;}
      const t=clamp((now-start)/duration,0,1);
      const e=t*t*t*(t*(t*6-15)+10);

      // Logarithmic scale reads as travel across a great distance; the decaying
      // orbit supplies a gentle spiral without inducing motion sickness.
      scale=startScale*Math.pow(endScale/startScale,e);
      const radius=orbit*Math.pow(1-e,1.35);
      const angle=-Math.PI*2.2+e*Math.PI*2.2;
      panX=endPanX+Math.cos(angle)*radius;
      panY=endPanY+Math.sin(angle)*radius*.58;
      rotX=0;
      rotY=-.72*(1-e);
      window.__tourApproachProgress=e;

      document.body.classList.toggle('tour-distant',t<.30);

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
  scale=endScale;panX=endPanX;panY=endPanY;rotX=endRotX;rotY=endRotY;
  window.__tourApproachProgress=1;
  selected=focusId||ids[0];
  try{draw()}catch(e){}
  await wait(mobile?1700:500);

  if(mySession!==state.session) return;
  hud.classList.remove('show');
}



function renderTranscript(media,step){
  if(!els.copy) return;
  const text=media?.transcript||step?.copy||'';
  const paragraphs=text.split(/\n\s*\n/).filter(Boolean);
  els.copy.innerHTML='';
  paragraphs.forEach((p,i)=>{
    const el=document.createElement('p');
    el.className='story-transcript-paragraph';
    el.dataset.paragraphIndex=String(i);
    el.textContent=p;
    els.copy.appendChild(el);
  });
  state.activeParagraph=-1;
  state.activeScene=-1;
}

function sceneForParagraph(media,pIndex,fraction=0){
  const scenes=Array.isArray(media?.scenes)?media.scenes:[];
  let result=-1;
  scenes.forEach((scene,i)=>{
    const paragraph=scene.triggerParagraph??0;
    const threshold=scene.triggerFraction??0;
    if(paragraph<pIndex || (paragraph===pIndex && fraction>=threshold)) result=i;
  });
  return result<0 && scenes.length?0:result;
}

function updateSlideshowToggle(){
  if(!els.slideshowToggle) return;
  els.slideshowToggle.setAttribute('aria-expanded',state.slideshowExpanded?'true':'false');
  els.slideshowToggle.querySelector('.story-slideshow-chevron').textContent=state.slideshowExpanded?'▾':'▴';
  els.slideshowToggle.querySelector('.story-slideshow-label').textContent=state.slideshowExpanded?'Hide slideshow':'Show slideshow';
  document.body.classList.toggle('story-slideshow-hidden',!state.slideshowExpanded);
  document.body.classList.toggle('story-slideshow-expanded',state.slideshowExpanded);
}

function updateLocator(scene){
  if(els.locatorLabel) els.locatorLabel.textContent=scene?.locator||'Arizona • family story';
  if(els.locatorDot){
    const label=(scene?.locator||'').toLowerCase();
    let x=80,y=19; // St. Johns / NE Arizona default
    if(label.includes('california')){x=40;y=34;}
    else if(label.includes('new mexico')){x=92;y=30;}
    else if(label.includes('vernon')){x=78;y=22;}
    else if(label.includes('utah')){x=62;y=8;}
    els.locatorDot.setAttribute('cx',String(x));
    els.locatorDot.setAttribute('cy',String(y));
  }
}

function showStoryScene(media,index){
  ensureSceneStagePlacement();
  const scenes=Array.isArray(media?.scenes)?media.scenes:[];
  if(!els.sceneStrip) return;
  if(!scenes.length){
    els.sceneStrip.classList.remove('show','context-only');
    els.sceneStrip.setAttribute('aria-hidden','true');
    return;
  }

  index=clamp(index,0,scenes.length-1);
  const scene=scenes[index];
  state.activeScene=index;
  updateLocator(scene);
  if(els.sceneTitle) els.sceneTitle.textContent=scene.title||'';
  if(els.sceneCaption) els.sceneCaption.textContent=scene.caption||'';
  if(els.sceneSource) els.sceneSource.textContent=scene.source?` • ${scene.source}`:'';
  if(els.sceneCount) els.sceneCount.textContent=scenes.length>1?`${index+1} / ${scenes.length}`:'';
  // Optional overlays must never be allowed to interrupt the core photograph.
  try{document.dispatchEvent(new CustomEvent('ancestryatlas:scenechange',{detail:{scene,index,media,personId:currentStep()?.id||null}}));}
  catch(error){console.error('Story geography overlay could not update.',error)}

  const img=els.scenePhoto;
  const contextOnly=!scene.src;
  els.sceneStrip.classList.toggle('context-only',contextOnly);

  if(contextOnly){
    if(img){
      img.removeAttribute('src');
      img.style.display='none';
    }
    els.sceneStrip.classList.add('show');
    els.sceneStrip.setAttribute('aria-hidden','false');
    return;
  }

  if(!img) return;
  const sceneImage=preloadScene(scene);
  const frame=img.parentElement;
  frame.dataset.sceneUrl=sceneImage.url;
  frame?.classList.add('scene-loading');
  frame?.setAttribute('aria-busy','true');
  els.sceneStrip.classList.add('show');
  els.sceneStrip.setAttribute('aria-hidden','false');

  sceneImage.promise.then(entry=>{
    if(frame.dataset.sceneUrl!==entry.url)return;
    frame?.classList.remove('scene-loading');
    frame?.setAttribute('aria-busy','false');
    if(entry.status!=='ready'){
      if(!img.currentSrc&&!img.src)els.sceneStrip.classList.add('context-only');
      return;
    }
    img.alt=scene.title||scene.caption||'Family story photograph';
    img.style.display='block';
    img.src=entry.url;
    img.style.opacity='1';
  });
}

function previewScene(delta){
  const media=TOUR_MEDIA[currentStep()?.id];
  const scenes=Array.isArray(media?.scenes)?media.scenes:[];
  if(media?.audio||scenes.length<2)return;
  showStoryScene(media,clamp((state.activeScene<0?0:state.activeScene)+delta,0,scenes.length-1));
}

function syncNarrationProgress(audio){
  if(audio.duration) setMeter((audio.currentTime/audio.duration)*100);
  const paras=[...els.copy?.querySelectorAll('.story-transcript-paragraph')||[]];
  if(!paras.length || !audio.duration) return;

  const weights=paras.map(p=>Math.max(1,p.textContent.length));
  const total=weights.reduce((a,b)=>a+b,0);
  const target=(audio.currentTime/audio.duration)*total;
  let running=0,idx=0;
  let before=0;
  for(let i=0;i<weights.length;i++){
    before=running;
    running+=weights[i];
    if(target<=running){idx=i;break;}
    idx=i;
  }
  const media=TOUR_MEDIA[currentStep()?.id];
  const fraction=clamp((target-before)/weights[idx],0,1);
  const sceneIndex=sceneForParagraph(media,idx,fraction);
  if(sceneIndex>=0 && sceneIndex!==state.activeScene) showStoryScene(media,sceneIndex);

  if(idx===state.activeParagraph) return;

  paras.forEach((p,i)=>p.classList.toggle('active',i===idx));
  state.activeParagraph=idx;

  if(!state.slideshowExpanded && state.followNarration && Date.now()>state.followSuspendUntil){
    paras[idx]?.scrollIntoView({behavior:'smooth',block:'center'});
  }
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
  state.activeScene=-1;
  preloadScene(media?.scenes?.[0],{priority:'high'});
  state.slideshowExpanded=true;
  updateSlideshowToggle();
  showStoryScene(media,0);
  if(els.narrator){
    els.narrator.textContent=media?.audio
      ? `Recorded narration: ${media.narrator}`
      : 'Recorded narration not yet produced';
  }
  renderTranscript(media,step);

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

async function openStoryAfterEntrance(mySession){
  if(state.session<1||mySession!==state.session) return;
  syncStoryViewport();
  clearCoreOverlays();
  const media=TOUR_MEDIA[currentStep()?.id];
  preloadScene(media?.scenes?.[0],{priority:'high'});
  await waitForOpeningScene(media);
  if(mySession!==state.session)return;
  renderStep();
  state.phase='paused';

  // Everything behind the A/V story dissolves to black.
  document.body.classList.remove('tour-orienting');
  document.body.classList.add('tour-story-open');
  enforceStorySurface();
  els.modal?.classList.add('open');
  els.modal?.setAttribute('aria-hidden','false');
  if(els.shell) els.shell.scrollTop=0;

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
  await openStoryAfterEntrance(my);
}

function openChooser(){
  els.chooser?.classList.add('open');
  els.chooser?.setAttribute('aria-hidden','false');
  document.body.classList.add('tour-chooser-open');
  requestAnimationFrame(()=>document.getElementById('lineChooserClose')?.focus());
}
function closeChooser(){
  els.chooser?.classList.remove('open');
  els.chooser?.setAttribute('aria-hidden','true');
  document.body.classList.remove('tour-chooser-open');
}

function begin(track='canada',index=0){
  stopAudio();
  syncStoryViewport();
  state.returnContext={
    selected,
    originNodeId,
    pivotWorld:{...pivotWorld},
    pivotCamera:{...pivotCamera},
    rotX,rotY,scale,panX,panY,nodeViewLevel,nodeFocusMode
  };
  state.track=track;
  state.index=index;
  preloadScene(TOUR_MEDIA[currentStep()?.id]?.scenes?.[0],{priority:'high'});
  closeChooser();
  els.landing?.classList.add('hidden');
  document.querySelectorAll('[data-story-track]').forEach(
    b=>b.classList.toggle('active',b.dataset.storyTrack===track)
  );
  orientAndOpenCurrent({fullEntrance:true});
}

function returnToStory(){
  if(currentStep()){
    els.landing?.classList.add('hidden');
    closeChooser();
    orientAndOpenCurrent({fullEntrance:false});
  }else openChooser();
}

function exitTour(){
  const saved=state.returnContext;
  const returnId=currentStep()?.id || saved?.selected || selected || 'you';
  ++state.session;
  stopAudio();
  state.phase='idle';
  hud.classList.remove('show');
  document.body.classList.remove('tour-active','tour-orienting','tour-distant','tour-story-open');
  window.__tourSuppressLabels=false;
  delete window.__tourApproachProgress;
  delete window.__tourLockedLabelOffsets;
  delete window.__tourCapturedLabelOffsets;
  delete window.__tourCaptureLabelOffsets;
  els.modal?.classList.remove('open');
  els.modal?.setAttribute('aria-hidden','true');
  els.sceneStrip?.classList.remove('show');
  clearCoreOverlays();
  clearBranchOnly();
  setStatus('');
  setMeter(0);

  if(window.matchMedia('(max-width:800px)').matches){
    try{
      window.AncestryMobileTreeInternal?.focusBiography?.(returnId,10);
      selected=returnId;
      if(window.AncestryTour?.mobileTree){
        window.AncestryTour.mobileTree.mode='family';
        window.AncestryTour.mobileTree.labelMode='focus';
        window.AncestryTour.mobileTree.anchor=returnId;
      }
      cinematicFocus(returnId,'family');
      setTimeout(()=>{try{card.style.display='none';sceneContext?.classList.remove('show');draw();}catch(e){}},80);
    }catch(e){console.error('Could not focus the biography family view.',e);}
  }else if(saved){
    try{
      selected=saved.selected;
      originNodeId=saved.originNodeId;
      pivotWorld={...saved.pivotWorld};
      pivotCamera={...saved.pivotCamera};
      rotX=saved.rotX; rotY=saved.rotY; scale=saved.scale;
      panX=saved.panX; panY=saved.panY;
      nodeViewLevel=saved.nodeViewLevel;
      nodeFocusMode=saved.nodeFocusMode;
      draw();
    }catch(e){console.error('Could not restore the pre-tour camera context.',e);}
  }
  state.returnContext=null;
  setTransport();
}

function togglePlay(){
  state.followNarration=true;
  state.followSuspendUntil=0;
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
  state.activeScene=-1;
  await orientAndOpenCurrent({fullEntrance:false});
}

els.shell?.addEventListener('touchstart',()=>{state.followSuspendUntil=Date.now()+7000},{passive:true});
els.shell?.addEventListener('wheel',()=>{state.followSuspendUntil=Date.now()+7000},{passive:true});
els.shell?.addEventListener('scroll',()=>{
  if(state.audio && !state.audio.paused) state.followSuspendUntil=Math.max(state.followSuspendUntil,Date.now()+2500);
},{passive:true});


els.slideshowToggle?.addEventListener('click',()=>{
  state.slideshowExpanded=!state.slideshowExpanded;
  updateSlideshowToggle();
  if(state.slideshowExpanded){
    if(els.shell) els.shell.scrollTo({top:0,behavior:'smooth'});
  }else{
    const active=els.copy?.querySelector('.story-transcript-paragraph.active')
      || els.copy?.querySelector('.story-transcript-paragraph');
    if(active) setTimeout(()=>active.scrollIntoView({behavior:'smooth',block:'center'}),80);
  }
});

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
  if(typeof openAlbum==='function')openAlbum('family');
});
$('openAlbumBtn')?.addEventListener('click',()=>{
  if(typeof openAlbum==='function')openAlbum('family');
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
  mode:'family',
  labelMode:'focus',
  anchor:'you'
};
function mobileFocus(id='you',pushHistory=true){
  if(!window.matchMedia('(max-width:800px)').matches) return;
  const target=nodeById.has(id)?id:'you';
  if(pushHistory && selected && selected!==target) mobileTree.history.push(selected);
  window.AncestryMobileTreeInternal?.focusIds(target,10);
  selected=target;
  mobileTree.anchor=target;
  mobileTree.labelMode='focus';
  try{card.style.display='none';sceneContext?.classList.remove('show');}catch(e){}
  cinematicFocus(target,'family');
  mobileTree.mode='family';
}
function mobileBack(){
  const id=mobileTree.history.pop();
  if(id) mobileFocus(id,false);
}
function mobileExpand(){
  const anchor=selected||mobileTree.anchor||'you';
  if(mobileTree.mode==='family'){
    window.__mobileTreeVisibleNodeIds=buildNavigationNeighborhood(anchor,'branch');
    nodeViewLevel='branch';nodeFocusMode=true;navigationNeighborhood=new Set(window.__mobileTreeVisibleNodeIds);
    setViewButtons('branch');
    cinematicFocus(anchor,'branch');
    mobileTree.mode='branch';
  }else{
    window.__mobileTreeVisibleNodeIds=null;
    setNodeView('atlas');
    mobileTree.mode='atlas';
  }
}
function mobileToggleBranchNames(){
  const anchor=selected||mobileTree.anchor||'you';
  if(mobileTree.labelMode==='focus'){
    const ids=window.AncestryMobileTreeInternal?.branch?.(anchor,22)||buildNavigationNeighborhood(anchor,'branch');
    window.__mobileTreeVisibleNodeIds=new Set(ids);
    navigationNeighborhood=new Set(ids);
    nodeViewLevel='branch';nodeFocusMode=true;
    selected=anchor;mobileTree.anchor=anchor;mobileTree.mode='branch';mobileTree.labelMode='branch';
    setViewButtons('branch');
    fitMobileBranch([...ids],anchor);
    try{card.style.display='none';sceneContext?.classList.remove('show');draw();}catch(e){}
  }else{
    window.AncestryMobileTreeInternal?.focusIds(anchor,10);
    selected=anchor;mobileTree.mode='family';mobileTree.labelMode='focus';
    cinematicFocus(anchor,'family');
  }
  document.dispatchEvent(new CustomEvent('ancestryatlas:mobiletreestate'));
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
$('mobileTreeReturnStory')?.addEventListener('click',returnToStory);
$('mobileTreeFocus')?.addEventListener('click',()=>mobileFocus(selected||mobileTree.anchor||'you',false));
$('mobileTreeLabels')?.addEventListener('click',mobileToggleBranchNames);
$('mobileTreeExpand')?.addEventListener('click',mobileExpand);
$('mobileTreeMenu')?.addEventListener('click',openTreeSheet);
$('mobileTreeMenuClose')?.addEventListener('click',closeTreeSheet);
$('mobileTreeStory')?.addEventListener('click',()=>{closeTreeSheet();openChooser();});
$('mobileTreeAlbum')?.addEventListener('click',()=>{
  closeTreeSheet();
  if(typeof openAlbum==='function')openAlbum('family');
});
$('mobileTreeDocuments')?.addEventListener('click',()=>{closeTreeSheet();if(typeof openAlbum==='function')openAlbum('document')});
$('mobileTreePlaces')?.addEventListener('click',()=>{closeTreeSheet();if(typeof openAlbum==='function')openAlbum('place')});
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

window.AncestryTour={begin,returnToStory,exit:exitTour,state,mobileTree,mobileFocus,mobileBack,mobileExpand,mobileToggleBranchNames,previewScene};
setTransport();
})();
