/* Ancestry Atlas v3.7.1 — isolated completed-biography film and native playback adapter. */
(()=>{
  'use strict';
  const $=id=>document.getElementById(id);
  const modal=$('tvFilmModal');
  const video=$('tvFilmVideo');
  const complete=$('tvFilmComplete');
  let lastFocus=null;

  function prepare(){
    lastFocus=document.activeElement;
    $('lineChooser')?.classList.remove('open');
    $('lineChooser')?.setAttribute('aria-hidden','true');
    $('landing')?.classList.add('hidden');
    modal?.classList.add('open');
    modal?.setAttribute('aria-hidden','false');
    complete?.classList.remove('open');
    video?.load();
  }

  function open({intent='menu'}={}){
    prepare();
    if(intent==='fullscreen'){fullscreen();return}
    if(intent==='television'){chooseTelevision();return}
    $('filmFullscreen')?.focus({preventScroll:true});
  }

  function close({showTree=false}={}){
    try{video?.pause()}catch(e){}
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden','true');
    complete?.classList.remove('open');
    if(showTree){
      try{selected='james_sheldon';cinematicFocus('james_sheldon','family');draw()}catch(e){}
      return;
    }
    const chooser=$('lineChooser');
    chooser?.classList.add('open');
    chooser?.setAttribute('aria-hidden','false');
    if($('tourBranchChoice'))$('tourBranchChoice').hidden=true;
    if($('tourViewingChoice'))$('tourViewingChoice').hidden=false;
    ($('tourWatchHere')||lastFocus)?.focus?.({preventScroll:true});
  }

  function play(){video?.play().catch(()=>{})}

  function chooseTelevision(){
    play();
    if(typeof video?.webkitShowPlaybackTargetPicker==='function'){
      video.webkitShowPlaybackTargetPicker();
      return;
    }
    $('filmConnectionHelp').textContent='AirPlay selection is not exposed by this browser. Use the AirPlay control in the video player, or Watch Full Screen for an HDMI-connected display.';
    $('filmChooseTV')?.focus({preventScroll:true});
  }

  async function fullscreen(){
    try{
      play();
      if(typeof video?.webkitEnterFullscreen==='function'){
        video.webkitEnterFullscreen();
        return;
      }
      if(video?.requestFullscreen){await video.requestFullscreen();play();return}
      if(modal?.requestFullscreen){await modal.requestFullscreen();play();return}
      $('filmConnectionHelp').textContent='This browser controls full-screen availability. Tap the full-screen symbol in the video player.';
      $('filmFullscreen')?.focus({preventScroll:true});
    }catch(e){
      play();
      $('filmConnectionHelp').textContent='Full screen was blocked by the browser. Tap Watch Full Screen once more or use the video player’s full-screen symbol.';
      $('filmFullscreen')?.focus({preventScroll:true});
    }
  }

  function replay(){complete?.classList.remove('open');video.currentTime=0;play()}
  $('filmChooseTV')?.addEventListener('click',chooseTelevision);
  $('filmFullscreen')?.addEventListener('click',fullscreen);
  $('filmClose')?.addEventListener('click',()=>close());
  document.querySelectorAll('[data-film-return-tree]').forEach(button=>button.addEventListener('click',()=>close({showTree:true})));
  $('filmReplay')?.addEventListener('click',replay);
  video?.addEventListener('ended',()=>{complete?.classList.add('open');$('filmReplay')?.focus()});
  modal?.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close()}});
  window.AncestryTVFilm={open,close};
})();
