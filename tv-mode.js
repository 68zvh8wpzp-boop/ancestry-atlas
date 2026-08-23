/* Ancestry Atlas v3.3.0 — AirPlay-optimized presentation module. No AirPlay discovery. */
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
  const state={active:false,lastFocus:null,hideTimer:null,audio:null,audioBound:new WeakSet(),selectedAtEntry:null,cameraAtEntry:null};

  function cameraSnapshot(){
    try{return {selected,originNodeId,pivotWorld:{...pivotWorld},pivotCamera:{...pivotCamera},rotX,rotY,scale,panX,panY,nodeViewLevel};}catch(e){return null;}
  }
  function currentSelection(){try{return selected||null}catch(e){return null}}
  function selectedHasStory(){try{return currentSelection()==='james_sheldon' && !!TOUR_MEDIA?.james_sheldon?.scenes?.length}catch(e){return false}}
  function updateStateLabel(){
    const story=body.classList.contains('tour-story-open');
    if($('tvStateLabel')) $('tvStateLabel').textContent=story?'Story':'Explore';
    if($('tvReturnTree')) $('tvReturnTree').hidden=!story;
    if($('tvPlayStory')) $('tvPlayStory').hidden=story||!selectedHasStory();
  }
  function showStart(){startPanel.hidden=false;instructions.hidden=true}
  function showInstructions(){startPanel.hidden=true;instructions.hidden=false;try{localStorage.setItem('ancestryAtlas.tvInstructionsSeen','1')}catch(e){};$('tvInstructionsStart')?.focus()}
  function openDialog(){
    state.lastFocus=document.activeElement;
    showStart();dialog.classList.add('open');dialog.setAttribute('aria-hidden','false');
    requestAnimationFrame(()=>dialogCard?.focus());
  }
  function closeDialog(){dialog.classList.remove('open');dialog.setAttribute('aria-hidden','true');state.lastFocus?.focus?.()}
  function focusables(root){return [...root.querySelectorAll('button:not([hidden]):not([disabled]),[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.closest('[hidden]'))}
  dialog?.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();closeDialog();return}
    if(event.key!=='Tab')return;const list=focusables(dialog);if(!list.length)return;const first=list[0],last=list[list.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  });

  async function requestFullscreen(){
    const el=document.documentElement;const fn=el.requestFullscreen||el.webkitRequestFullscreen;
    if(!fn)return false;try{await fn.call(el);return true}catch(error){console.info('TV Mode fullscreen was unavailable; continuing in television layout.',error);return false}
  }
  function revealControls(){
    if(!state.active)return;body.classList.remove('tv-controls-hidden');clearTimeout(state.hideTimer);
    state.hideTimer=setTimeout(()=>{if(!document.querySelector(':focus:is(#controls *,#card *,.tv-presentation-bar *)'))body.classList.add('tv-controls-hidden')},4200);
  }
  function enter(){
    state.selectedAtEntry=currentSelection();state.cameraAtEntry=cameraSnapshot();state.active=true;closeDialog();
    body.classList.add('tv-mode');body.classList.remove('tv-controls-hidden');
    try{localStorage.setItem('ancestryAtlas.tvModeUsed','1')}catch(e){}
    requestFullscreen();revealControls();updateStateLabel();try{resize();draw()}catch(e){console.error('TV Mode resize failed.',e)}
    $('tvExitMode')?.focus({preventScroll:true});
  }
  async function leave({keepFullscreen=false}={}){
    if(!state.active)return;state.active=false;clearTimeout(state.hideTimer);body.classList.remove('tv-mode','tv-controls-hidden','tv-legend-open');complete.classList.remove('open');complete.setAttribute('aria-hidden','true');
    if(!keepFullscreen&&(document.fullscreenElement||document.webkitFullscreenElement)){try{await (document.exitFullscreen?.()||document.webkitExitFullscreen?.())}catch(e){}}
    try{resize();draw()}catch(e){console.error('TV Mode exit resize failed.',e)}
    $('presentTvBtn')?.focus({preventScroll:true});
  }
  function returnToTree(){complete.classList.remove('open');complete.setAttribute('aria-hidden','true');window.AncestryTour?.exit?.();setTimeout(()=>{updateStateLabel();try{draw()}catch(e){}},80)}
  function replay(){complete.classList.remove('open');complete.setAttribute('aria-hidden','true');const audio=window.AncestryTour?.state?.audio;if(audio){audio.currentTime=0;audio.play().catch(error=>console.info('Replay requires another user action.',error))}}
  function showCompletion(){if(!state.active)return;complete.classList.add('open');complete.setAttribute('aria-hidden','false');$('tvCompleteReturn')?.focus()}
  function bindAudio(){
    if(!state.active)return;const audio=window.AncestryTour?.state?.audio;if(!audio||state.audioBound.has(audio))return;state.audioBound.add(audio);state.audio=audio;audio.addEventListener('ended',showCompletion);audio.addEventListener('play',()=>{complete.classList.remove('open');complete.setAttribute('aria-hidden','true');revealControls()});audio.addEventListener('pause',revealControls)
  }
  setInterval(()=>{if(!state.active)return;updateStateLabel();bindAudio()},800);

  $('presentTvBtn')?.addEventListener('click',openDialog);$('mobileTreeTV')?.addEventListener('click',()=>{$('mobileTreeMenuSheet')?.classList.remove('open');openDialog()});
  $('tvDialogClose')?.addEventListener('click',closeDialog);$('tvCancel')?.addEventListener('click',closeDialog);$('tvShowInstructions')?.addEventListener('click',showInstructions);$('tvInstructionsBack')?.addEventListener('click',showStart);$('tvStartMode')?.addEventListener('click',enter);$('tvInstructionsStart')?.addEventListener('click',enter);
  dialog?.addEventListener('pointerdown',event=>{if(event.target===dialog)closeDialog()});
  $('tvExitMode')?.addEventListener('click',()=>leave());$('tvToggleLegend')?.addEventListener('click',event=>{const open=body.classList.toggle('tv-legend-open');$('controls')?.classList.toggle('collapsed',!open);event.currentTarget.setAttribute('aria-expanded',String(open));revealControls()});
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
  window.addEventListener('resize',()=>{if(state.active){try{resize();draw()}catch(e){}revealControls()}});
  window.AncestryTVMode={open:openDialog,enter,exit:leave,state};
})();
