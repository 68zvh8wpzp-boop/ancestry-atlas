/* Ancestry Atlas v3.8.0 — viewport classification and navigation fit only. */
(()=>{
  'use strict';
  const body=document.body;
  const root=document.documentElement;
  const stage=document.getElementById('stage');
  const evidenceButton=document.getElementById('mobileTreeEvidence');
  const landing=document.getElementById('landing');
  const chooser=document.getElementById('lineChooser');
  const story=document.getElementById('storyModal');
  const film=document.getElementById('tvFilmModal');
  const album=document.getElementById('albumModal');
  const documentViewer=document.getElementById('docModal');
  const placeViewer=document.getElementById('storyPlaceModal');
  let lastClass='';
  let lastWidth=0;
  let lastHeight=0;
  let resizeFrame=0;

  function viewport(){
    const vv=window.visualViewport;
    return {
      width:Math.max(320,Math.round(vv?.width||window.innerWidth||root.clientWidth||320)),
      height:Math.max(180,Math.round(vv?.height||window.innerHeight||root.clientHeight||180))
    };
  }

  function classify({width,height}){
    const short=Math.min(width,height);
    const long=Math.max(width,height);
    const coarse=window.matchMedia('(pointer:coarse)').matches;
    if(coarse&&short<=540)return 'phone';
    if(coarse&&short<=1024)return 'tablet';
    if(long>=1600)return 'large-display';
    return 'desktop';
  }

  function apply({recenter=false}={}){
    const size=viewport();
    const kind=classify(size);
    const orientation=size.width>=size.height?'landscape':'portrait';
    const signature=`${kind}-${orientation}`;
    const dimensionsChanged=size.width!==lastWidth||size.height!==lastHeight;
    for(const name of ['phone','tablet','desktop','large-display','portrait','landscape'])body.classList.remove(`aa-${name}`);
    body.classList.add(`aa-${kind}`,`aa-${orientation}`);
    body.classList.toggle('aa-standalone',window.matchMedia('(display-mode:standalone)').matches||navigator.standalone===true);
    root.style.setProperty('--aa-visible-width',`${size.width}px`);
    root.style.setProperty('--aa-visible-height',`${size.height}px`);
    lastWidth=size.width;
    lastHeight=size.height;

    if(signature!==lastClass){
      recenter=true;
      lastClass=signature;
    }

    try{
      if((dimensionsChanged||recenter)&&typeof resize==='function')resize();
      if(recenter&&typeof selected!=='undefined'&&selected&&typeof centerOnNode==='function'&&!body.classList.contains('tour-active')){
        centerOnNode(selected);
      }else if((dimensionsChanged||recenter)&&typeof draw==='function')draw();
    }catch(error){console.error('Responsive experience refresh failed.',error)}
  }

  /* Replace only the projection fit helpers. Rotation, pivot, pan, scale,
     selected person, origin node, and navigation history remain owned by the
     existing 3-D engine. */
  try{
    if(typeof portraitTreeYScale==='function'){
      portraitTreeYScale=()=>{
        const size=viewport();
        return body.classList.contains('aa-phone')&&size.height>size.width*1.18?2.35:1;
      };
    }
    if(typeof targetYForCenter==='function'){
      targetYForCenter=()=>{
        const size=viewport();
        if(body.classList.contains('aa-phone'))return size.height*(size.height>size.width?0.58:0.52);
        if(body.classList.contains('aa-tablet'))return size.height*.61;
        return size.height*.56;
      };
    }
  }catch(error){console.error('Responsive tree projection could not be installed.',error)}

  function schedule(){
    cancelAnimationFrame(resizeFrame);
    resizeFrame=requestAnimationFrame(()=>apply());
  }

  function syncSurfaceState(){
    const open=!landing?.classList.contains('hidden')||chooser?.classList.contains('open')||story?.classList.contains('open')||film?.classList.contains('open')||album?.classList.contains('open')||documentViewer?.classList.contains('open')||placeViewer?.classList.contains('open');
    body.classList.toggle('aa-overlay-open',!!open);
  }

  function syncMobileDock(){
    const back=document.getElementById('mobileTreeBack');
    const expand=document.getElementById('mobileTreeExpand');
    const names=document.getElementById('mobileTreeLabels');
    const mobileTree=window.AncestryTour?.mobileTree;
    if(back&&mobileTree)back.disabled=!mobileTree.history.length;
    if(expand&&mobileTree){
      const labels={family:['＋','Wider Tree'],branch:['＋','Whole Tree'],atlas:['◎','Local Tree']};
      const [symbol,label]=labels[mobileTree.mode]||labels.family;
      const symbolNode=expand.querySelector('span'),labelNode=expand.querySelector('small');
      if(symbolNode)symbolNode.textContent=symbol;
      if(labelNode)labelNode.textContent=label;
      expand.setAttribute('aria-label',`${label} view`);
    }
    if(names&&mobileTree){
      const branch=mobileTree.labelMode==='branch';
      names.setAttribute('aria-pressed',String(branch));
      names.setAttribute('aria-label',branch?'Show local family names':'Show names for this branch');
      names.classList.toggle('active',branch);
      const labelNode=names.querySelector('small');
      if(labelNode)labelNode.textContent=branch?'Local Names':'Branch Names';
    }
  }

  function focusables(container){
    return [...container.querySelectorAll('button:not([hidden]):not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')]
      .filter(element=>element.offsetParent!==null);
  }

  chooser?.addEventListener('keydown',event=>{
    if(!chooser.classList.contains('open')||event.key!=='Tab')return;
    const items=focusables(chooser);if(!items.length)return;
    const first=items[0],last=items[items.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  });

  /* Make direct node taps participate in the same phone history as dock
     navigation. The original openNode continues to own selection and camera. */
  try{
    if(typeof openNode==='function'){
      const openNodeV375=openNode;
      openNode=function(id,recenter=false,appendTrail=false){
        const mobileTree=window.AncestryTour?.mobileTree;
        if(body.classList.contains('aa-phone')&&mobileTree&&typeof selected!=='undefined'&&selected&&selected!==id){
          const last=mobileTree.history[mobileTree.history.length-1];
          if(last!==selected)mobileTree.history.push(selected);
        }
        const result=openNodeV375(id,recenter,appendTrail);
        syncMobileDock();
        return result;
      };
    }
  }catch(error){console.error('Mobile navigation history adapter could not be installed.',error)}

  ['mobileTreeHome','mobileTreeBack','mobileTreeFocus','mobileTreeLabels','mobileTreeExpand','mobileTreeReturnStory'].forEach(id=>{
    document.getElementById(id)?.addEventListener('click',()=>requestAnimationFrame(syncMobileDock));
  });
  document.addEventListener('ancestryatlas:mobiletreestate',syncMobileDock);
  document.addEventListener('ancestryatlas:focusreleased',syncMobileDock);

  evidenceButton?.addEventListener('click',()=>{
    const open=body.classList.toggle('mobile-evidence-open');
    evidenceButton.setAttribute('aria-expanded',String(open));
    evidenceButton.textContent=open?'Hide evidence key':'Evidence key';
    document.getElementById('mobileTreeMenuSheet')?.classList.remove('open');
    document.getElementById('mobileTreeMenuSheet')?.setAttribute('aria-hidden','true');
  });
  document.getElementById('proofNotice')?.addEventListener('click',()=>{
    body.classList.remove('mobile-evidence-open');
    evidenceButton?.setAttribute('aria-expanded','false');
    if(evidenceButton)evidenceButton.textContent='Evidence key';
  });

  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(()=>apply({recenter:true}),120),{passive:true});
  window.visualViewport?.addEventListener('resize',schedule,{passive:true});
  if(typeof ResizeObserver==='function')new ResizeObserver(schedule).observe(stage||root);
  const surfaceObserver=new MutationObserver(syncSurfaceState);
  [landing,chooser,story,film,album,documentViewer,placeViewer].filter(Boolean).forEach(element=>surfaceObserver.observe(element,{attributes:true,attributeFilter:['class','aria-hidden']}));

  document.addEventListener('ancestryatlas:scenechange',()=>{
    body.classList.remove('mobile-evidence-open');
    evidenceButton?.setAttribute('aria-expanded','false');
  });

  syncSurfaceState();
  syncMobileDock();
  apply({recenter:true});
  window.AncestryExperience={version:'3.8.8',refresh:apply,viewport};
})();
