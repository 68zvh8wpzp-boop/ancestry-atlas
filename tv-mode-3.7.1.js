/* Ancestry Atlas v3.7.1 — tour routing and optional mirrored Explore presentation. */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const body=document.body;
  const dialog=$('tvModeDialog');
  const dialogCard=dialog?.querySelector('.tv-dialog-card');
  const startPanel=$('tvStartPanel');
  const instructions=$('tvInstructionsPanel');
  const presentationBar=$('tvPresentationBar');
  const complete=$('tvStoryComplete');
  const rotateNotice=$('tvRotateNotice');
  const branchChoice=$('tourBranchChoice');
  const viewingChoice=$('tourViewingChoice');
  const trackNames={canada:'Canada / Brenay',webb:'Webb',dunbar:'Dunbar',denmark:'Denmark'};
  const state={active:false,awaitingLandscape:false,pendingTrack:null,lastFocus:null,hideTimer:null,audio:null,audioBound:new WeakSet(),selectedAtEntry:null,cameraAtEntry:null,storyOpen:false};

  function cameraSnapshot(){
    try{return {selected,originNodeId,pivotWorld:{...pivotWorld},pivotCamera:{...pivotCamera},rotX,rotY,scale,panX,panY,nodeViewLevel};}catch(e){return null;}
  }
  function currentSelection(){try{return selected||null}catch(e){return null}}
  function selectedHasStory(){try{return currentSelection()==='james_sheldon' && !!TOUR_MEDIA?.james_sheldon?.scenes?.length}catch(e){return false}}
  function updateStateLabel(){
    syncViewportMetrics();
    const story=body.classList.contains('tour-story-open');
    const orienting=body.classList.contains('tour-orienting');
    if(story&&!state.storyOpen) revealControls();
    state.storyOpen=story;
    if($('tvStateLabel')) $('tvStateLabel').textContent=story?'Story':orienting?'Story starting':'Explore';
    if($('tvReturnTree')) $('tvReturnTree').hidden=!story;
    if($('tvPlayStory')) $('tvPlayStory').hidden=story||orienting||!selectedHasStory();
    if($('tvToggleLegend')) $('tvToggleLegend').hidden=story||orienting;
  }
  function showStart(){startPanel.hidden=false;instructions.hidden=true}
  function showInstructions(){startPanel.hidden=true;instructions.hidden=false;try{localStorage.setItem('ancestryAtlas.tvInstructionsSeen','1')}catch(e){};$('tvInstructionsStart')?.focus()}
  function openDialog(){
    state.lastFocus=document.activeElement;
    showStart();dialog.classList.add('open');dialog.setAttribute('aria-hidden','false');
    requestAnimationFrame(()=>dialogCard?.focus());
  }
  function closeDialog(){dialog.classList.remove('open');dialog.setAttribute('aria-hidden','true');state.lastFocus?.focus?.()}
  function resetTourChoice(){branchChoice.hidden=false;viewingChoice.hidden=true}
  function showViewingChoice(track){
    state.pendingTrack=track;
    branchChoice.hidden=true;viewingChoice.hidden=false;
    $('tourSelectedLine').textContent=trackNames[track]||track;
    const completedFilm=track==='webb'&&!!window.AncestryTVFilm;
    if($('tourViewingHelp')) $('tourViewingHelp').firstChild.textContent=completedFilm?'Choose how you want to watch ':'Choose where you want to explore ';
    if($('tourWatchHere')) $('tourWatchHere').textContent=completedFilm?'Watch Full Screen':'Watch on this device';
    if($('tourWatchTV')) $('tourWatchTV').hidden=!completedFilm;
    if($('tourWatchInteractive')) $('tourWatchInteractive').hidden=!completedFilm;
    $('tourWatchHere')?.focus();
  }
  function isPhonePortrait(){return window.innerHeight>window.innerWidth&&window.innerWidth<=1024}
  function beginPendingTour(){
    if(!state.pendingTrack)return;
    const track=state.pendingTrack;state.pendingTrack=null;state.awaitingLandscape=false;
    rotateNotice.hidden=true;resetTourChoice();
    window.AncestryTour?.begin?.(track,0);
  }
  function focusables(root){return [...root.querySelectorAll('button:not([hidden]):not([disabled]),[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.closest('[hidden]'))}
  dialog?.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();closeDialog();return}
    if(event.key!=='Tab')return;const list=focusables(dialog);if(!list.length)return;const first=list[0],last=list[list.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  });

  async function requestFullscreen(){
    const el=document.documentElement;const fn=el.requestFullscreen||el.webkitRequestFullscreen;
    if(!fn)return false;try{await fn.call(el);return true}catch(error){console.info('TV Mode fullscreen was unavailable; continuing in television layout.',error);return false}
  }
  function syncViewportMetrics(){
    if(!state.active)return;
    const vv=window.visualViewport;
    let width=Math.max(window.innerWidth||0,document.documentElement.clientWidth||0,vv?.width||0);
    const height=Math.max(window.innerHeight||0,document.documentElement.clientHeight||0,vv?.height||0);
    const landscape=width>height||window.matchMedia('(orientation:landscape)').matches;
    const screenLong=Math.max(window.screen?.width||0,window.screen?.height||0);
    if(landscape&&height>0&&width/height<1.6&&screenLong>width*1.5) width=screenLong;
    width=Math.max(320,Math.round(width));
    const measuredHeight=Math.max(180,Math.round(height));
    body.style.setProperty('--tv-vw',`${width}px`);
    body.style.setProperty('--tv-vh',`${measuredHeight}px`);
    body.style.setProperty('--tv-center-x',`${Math.round(width/2)}px`);
  }
  function revealControls(){
    if(!state.active)return;body.classList.remove('tv-controls-hidden');clearTimeout(state.hideTimer);
    state.hideTimer=setTimeout(()=>{
      const focused=document.activeElement;
      const protectedFocus=focused?.closest?.('#controls,#card,.tv-presentation-bar,.story-controls,.story-slideshow-toggle,.tv-dialog,.tv-story-complete');
      const storyPaused=body.classList.contains('tour-story-open')&&(!window.AncestryTour?.state?.audio||window.AncestryTour.state.audio.paused);
      if(!protectedFocus&&!storyPaused) body.classList.add('tv-controls-hidden');
    },4200);
  }
  function enter(){
    state.selectedAtEntry=currentSelection();state.cameraAtEntry=cameraSnapshot();state.active=true;closeDialog();
    body.classList.add('tv-mode');body.classList.remove('tv-controls-hidden','tv-legend-open');
    syncViewportMetrics();
    $('controls')?.classList.add('collapsed');
    $('tvToggleLegend')?.setAttribute('aria-expanded','false');
    if($('tvToggleLegend')) $('tvToggleLegend').textContent='Show legend';
    try{localStorage.setItem('ancestryAtlas.tvModeUsed','1')}catch(e){}
    requestFullscreen();revealControls();updateStateLabel();try{resize();draw()}catch(e){console.error('TV Mode resize failed.',e)}
    if(state.pendingTrack&&isPhonePortrait()){
      state.awaitingLandscape=true;rotateNotice.hidden=false;$('tvRotateCancel')?.focus({preventScroll:true});
    }else{
      beginPendingTour();$('tvExitMode')?.focus({preventScroll:true});
    }
  }
  async function leave({keepFullscreen=false}={}){
    if(!state.active)return;state.active=false;state.storyOpen=false;state.awaitingLandscape=false;state.pendingTrack=null;rotateNotice.hidden=true;resetTourChoice();clearTimeout(state.hideTimer);body.classList.remove('tv-mode','tv-controls-hidden','tv-legend-open');complete.classList.remove('open');complete.setAttribute('aria-hidden','true');
    try{window.AncestryTour?.state?.audio?.pause?.()}catch(e){}
    if(!keepFullscreen&&(document.fullscreenElement||document.webkitFullscreenElement)){try{await (document.exitFullscreen?.()||document.webkitExitFullscreen?.())}catch(e){}}
    try{resize();draw()}catch(e){console.error('TV Mode exit resize failed.',e)}
    $('openStoryBtn')?.focus({preventScroll:true});
  }
  function returnToTree(){complete.classList.remove('open');complete.setAttribute('aria-hidden','true');window.AncestryTour?.exit?.();setTimeout(()=>{updateStateLabel();try{draw()}catch(e){}},80)}
  function replay(){complete.classList.remove('open');complete.setAttribute('aria-hidden','true');const audio=window.AncestryTour?.state?.audio;if(audio){audio.currentTime=0;audio.play().catch(error=>console.info('Replay requires another user action.',error))}}
  function showCompletion(){if(!state.active)return;complete.classList.add('open');complete.setAttribute('aria-hidden','false');$('tvCompleteReturn')?.focus()}
  function bindAudio(){
    if(!state.active)return;const audio=window.AncestryTour?.state?.audio;if(!audio||state.audioBound.has(audio))return;state.audioBound.add(audio);state.audio=audio;audio.addEventListener('ended',showCompletion);audio.addEventListener('play',()=>{complete.classList.remove('open');complete.setAttribute('aria-hidden','true');revealControls()});audio.addEventListener('pause',revealControls)
  }
  setInterval(()=>{if(!state.active)return;updateStateLabel();bindAudio()},800);

  $('lineChooser')?.addEventListener('click',event=>{
    const button=event.target.closest('[data-launch-track]');if(!button)return;
    event.preventDefault();event.stopImmediatePropagation();showViewingChoice(button.dataset.launchTrack);
  },true);
  $('tourWatchHere')?.addEventListener('click',()=>{const track=state.pendingTrack;if(track==='webb'&&window.AncestryTVFilm?.open){window.AncestryTVFilm.open({intent:'fullscreen'});return}state.pendingTrack=null;resetTourChoice();if(track)window.AncestryTour?.begin?.(track,0)});
  $('tourWatchTV')?.addEventListener('click',()=>{if(state.pendingTrack==='webb'&&window.AncestryTVFilm?.open)window.AncestryTVFilm.open({intent:'television'});else openDialog()});
  $('tourWatchInteractive')?.addEventListener('click',()=>{const track=state.pendingTrack;state.pendingTrack=null;resetTourChoice();if(track)window.AncestryTour?.begin?.(track,0)});
  $('tourChoiceBack')?.addEventListener('click',()=>{state.pendingTrack=null;resetTourChoice();document.querySelector('#lineChooser [data-launch-track]')?.focus()});
  $('lineChooserClose')?.addEventListener('click',()=>{state.pendingTrack=null;resetTourChoice()});
  $('tvDialogClose')?.addEventListener('click',closeDialog);$('tvCancel')?.addEventListener('click',closeDialog);$('tvShowInstructions')?.addEventListener('click',showInstructions);$('tvInstructionsBack')?.addEventListener('click',showStart);$('tvStartMode')?.addEventListener('click',enter);$('tvInstructionsStart')?.addEventListener('click',enter);
  $('tvRotateCancel')?.addEventListener('click',()=>leave());
  dialog?.addEventListener('pointerdown',event=>{if(event.target===dialog)closeDialog()});
  $('tvExitMode')?.addEventListener('click',()=>leave());$('tvToggleLegend')?.addEventListener('click',event=>{const open=body.classList.toggle('tv-legend-open');$('controls')?.classList.toggle('collapsed',!open);event.currentTarget.setAttribute('aria-expanded',String(open));event.currentTarget.textContent=open?'Hide legend':'Show legend';revealControls()});
  $('tvPlayStory')?.addEventListener('click',()=>{if(selectedHasStory())window.AncestryTour?.begin?.('webb',0)});$('tvReturnTree')?.addEventListener('click',returnToTree);$('tvCompleteReturn')?.addEventListener('click',returnToTree);$('tvReplay')?.addEventListener('click',replay);
  ['pointermove','pointerdown','touchstart','keydown','focusin'].forEach(type=>document.addEventListener(type,revealControls,{passive:type!=='keydown'}));
  document.addEventListener('keydown',event=>{
    if(!state.active)return;
    if(event.key==='Escape'){
      if(document.fullscreenElement||document.webkitFullscreenElement){event.preventDefault();event.stopImmediatePropagation();(document.exitFullscreen?.()||document.webkitExitFullscreen?.());revealControls();return}
      event.preventDefault();event.stopImmediatePropagation();leave({keepFullscreen:true});return;
    }
    if(event.code==='Space'&&!/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(document.activeElement?.tagName||'')&&body.classList.contains('tour-story-open')){event.preventDefault();$('storyPlayPause')?.click()}
  },true);
  function presentationResize(){if(state.active){syncViewportMetrics();if(state.awaitingLandscape&&!isPhonePortrait())beginPendingTour();try{resize();draw()}catch(e){}revealControls()}}
  window.addEventListener('resize',presentationResize);
  window.visualViewport?.addEventListener('resize',presentationResize);
  window.AncestryTVMode={open:openDialog,enter,exit:leave,state};
})();
