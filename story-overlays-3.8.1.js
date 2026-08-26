/* Ancestry Atlas v3.8.8 — dedicated archival Places view. */
(()=>{
  'use strict';
  const modal=document.getElementById('storyPlaceModal');
  const openButton=document.getElementById('storyPlaceOpen');
  const closeButton=document.getElementById('storyPlaceClose');
  const title=document.getElementById('storyPlaceTitle');
  const context=document.getElementById('storyPlaceContext');
  const flagArt=document.getElementById('storyFlagArt');
  const flagCaption=document.getElementById('storyFlagCaption');
  const mapFigure=document.querySelector('#storyContextRibbon .story-locator-card');
  const mapImage=document.querySelector('.story-archival-map img');
  const mapDot=document.getElementById('storyLocatorDot');
  const mapLabel=document.getElementById('storyLocatorMapLabel');
  const locatorLabel=document.getElementById('storyLocatorLabel');
  const source=document.getElementById('storyLocatorSource');
  const previewPrev=document.getElementById('storyPreviewImagePrev');
  const previewNext=document.getElementById('storyPreviewImageNext');
  const previewNav=document.getElementById('storyPreviewImageNav');
  let currentScene={};
  const markers={
    'arizona-mesa-regional':[29.5,61.8,'Mesa'],'mesa-to-st-johns':[45,49,'St. Johns'],
    'southwest-trinity':[62,68,'Trinity Site'],'four-corners':[48.4,8.8,'Four Corners'],
    'southwest-regional':[34,49,'Arizona'],'white-mountains':[45,49,'St. Johns'],
    'arizona-statewide':[34,49,'Arizona'],'arizona-california':[9,47,'California'],
    'arizona-flagstaff':[30.7,36.4,'Flagstaff'],'great-lakes-to-southwest':[29.5,61.8,'Mesa'],
    'depression-western-moves':[34,49,'Arizona'],'mesa-to-lakeside':[41.5,49.5,'Lakeside']
  };
  function arizonaFlag(){
    const boundary=d=>d<=30?[0,30-d]:d<=126?[d-30,0]:[96,d-126];let rays='';
    for(let i=0;i<13;i++){const a=boundary(i*12),b=boundary((i+1)*12);rays+=`<polygon points="48,30 ${a[0]},${a[1]} ${b[0]},${b[1]}" fill="${i%2===0?'#b32632':'#f0b33f'}"/>`}
    const star=[];for(let i=0;i<10;i++){const angle=-Math.PI/2+i*Math.PI/5,r=i%2===0?11:4.7;star.push(`${48+Math.cos(angle)*r},${30+Math.sin(angle)*r}`)}
    return `<svg viewBox="0 0 96 60" role="img" aria-label="Arizona state flag adopted in 1917"><rect width="96" height="60" fill="#183f70"/>${rays}<polygon points="${star.join(' ')}" fill="#b87333"/></svg>`;
  }
  function flagFor(key){
    if(key==='arizona-1917')return {art:arizonaFlag(),caption:'Arizona state flag • adopted 1917'};
    if(key==='michigan-1923')return {art:'<div class="story-flag-wordmark">MICHIGAN</div>',caption:'Michigan • state context'};
    if(key?.startsWith('united-states'))return {art:'<div class="story-flag-wordmark">UNITED STATES</div>',caption:'United States • period flag context'};
    if(key==='canada-red-ensign'||key==='province-canada')return {art:'<div class="story-flag-wordmark">CANADA</div>',caption:'Canada • historical flag context'};
    return {art:'<div class="story-flag-wordmark">PLACE</div>',caption:'Historical place context'};
  }
  function update(scene){
    currentScene=scene||{};const locator=currentScene.locator||'Family place';
    title.textContent=locator;locatorLabel.textContent=locator;context.textContent=currentScene.placeContext||currentScene.caption||'';
    const flag=flagFor(currentScene.flagKey);flagArt.innerHTML=flag.art;flagCaption.textContent=flag.caption;
    const marker=markers[currentScene.mapKey];mapFigure.hidden=!marker;
    if(marker){
      mapImage.src='assets/arizona_new_mexico_1919_locator.jpg';mapImage.alt='Arizona–New Mexico road map published in 1919';
      mapDot.style.left=`${marker[0]}%`;mapDot.style.top=`${marker[1]}%`;
      mapLabel.style.left=`${marker[0]}%`;mapLabel.style.top=`${marker[1]}%`;mapLabel.textContent=marker[2];
      source.textContent='American Automobile Association, Arizona–New Mexico road map, 1919 • Library of Congress';
    }
  }
  function open(){update(currentScene);modal.classList.add('open');modal.setAttribute('aria-hidden','false');closeButton.focus()}
  function close(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');openButton.focus()}
  openButton?.addEventListener('click',open);closeButton?.addEventListener('click',close);
  modal?.addEventListener('click',event=>{if(event.target===modal)close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('open'))close()});
  document.addEventListener('ancestryatlas:scenechange',event=>{
    const detail=event.detail||{};update(detail.scene||{});const count=Array.isArray(detail.media?.scenes)?detail.media.scenes.length:0;const preview=!detail.media?.audio&&count>1;
    if(previewNav)previewNav.hidden=!preview;if(previewPrev)previewPrev.disabled=(detail.index||0)<=0;if(previewNext)previewNext.disabled=(detail.index||0)>=count-1;
  });
  previewPrev?.addEventListener('click',()=>window.AncestryTour?.previewScene?.(-1));previewNext?.addEventListener('click',()=>window.AncestryTour?.previewScene?.(1));
  window.AncestryStoryOverlays={version:'3.8.12',open,close};
})();
