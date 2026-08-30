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
  function englandFlag(){
    return '<svg viewBox="0 0 96 60" role="img" aria-label="Flag of England"><rect width="96" height="60" fill="#f3f0e8"/><rect x="40" width="16" height="60" fill="#b52432"/><rect y="22" width="96" height="16" fill="#b52432"/></svg>';
  }
  function thirteenStarFlag(){
    const stars=[];for(let i=0;i<13;i++){const a=-Math.PI/2+i*Math.PI*2/13,x=24+Math.cos(a)*10,y=15+Math.sin(a)*10;stars.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.45" fill="#f3f0e8"/>`)}
    let stripes='';for(let i=0;i<13;i++)stripes+=`<rect y="${(i*60/13).toFixed(2)}" width="96" height="${(60/13+.15).toFixed(2)}" fill="${i%2===0?'#a92836':'#f3f0e8'}"/>`;
    return `<svg viewBox="0 0 96 60" role="img" aria-label="Thirteen-star United States flag adopted in 1777">${stripes}<rect width="48" height="32.31" fill="#213c68"/>${stars.join('')}</svg>`;
  }
  function unitedStatesFlag(starCount=48){
    let stripes='';for(let i=0;i<13;i++)stripes+=`<rect y="${(i*60/13).toFixed(2)}" width="96" height="${(60/13+.15).toFixed(2)}" fill="${i%2===0?'#a92836':'#f3f0e8'}"/>`;
    const rows=starCount===48?[8,8,8,8,8,8]:starCount===46?[8,7,8,7,8,8]:starCount===45?[8,7,8,7,8,7]:[starCount];
    const stars=[];const cantonW=40,cantonH=32.31;
    rows.forEach((count,row)=>{for(let col=0;col<count;col++){const x=(cantonW/(count+1))*(col+1),y=(cantonH/(rows.length+1))*(row+1);stars.push(`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.05" fill="#f3f0e8"/>`)}});
    return `<svg viewBox="0 0 96 60" role="img" aria-label="United States ${starCount}-star flag">${stripes}<rect width="${cantonW}" height="${cantonH}" fill="#213c68"/>${stars.join('')}</svg>`;
  }
  function canadaRedEnsign(){
    return '<svg viewBox="0 0 96 60" role="img" aria-label="Canadian Red Ensign"><rect width="96" height="60" fill="#a51f2d"/><g transform="scale(.5)"><rect width="96" height="60" fill="#173d70"/><path d="M0 0 96 60M96 0 0 60" stroke="#f3f0e8" stroke-width="13"/><path d="M0 0 96 60M96 0 0 60" stroke="#b32632" stroke-width="6"/><path d="M48 0v60M0 30h96" stroke="#f3f0e8" stroke-width="18"/><path d="M48 0v60M0 30h96" stroke="#b32632" stroke-width="10"/></g><path d="M65 19h18v23H65z" fill="#f1e6c9" stroke="#d8b65b"/><path d="M68 22h12v5H68zm0 8h12v4H68zm0 7h12v3H68z" fill="#b32632"/></svg>';
  }
  function flagFor(key){
    if(key==='arizona-1917')return {art:arizonaFlag(),caption:'Arizona state flag • adopted 1917'};
    if(key==='england-st-george')return {art:englandFlag(),caption:'Flag of England'};
    if(key==='united-states-13-star')return {art:thirteenStarFlag(),caption:'United States • thirteen-star flag adopted June 1777'};
    const usStars=Number(key?.match(/^united-states-(\d+)-star$/)?.[1]);
    if(usStars)return {art:unitedStatesFlag(usStars),caption:`United States flag • ${usStars} stars`};
    if(key==='michigan-1923')return {art:unitedStatesFlag(48),caption:'United States flag • 48 stars, 1912–1959'};
    if(key==='canada-red-ensign'||key==='province-canada')return {art:canadaRedEnsign(),caption:'Canadian Red Ensign • historical national flag'};
    return {art:'',caption:''};
  }
  function update(scene){
    currentScene=scene||{};const locator=currentScene.locator||'Family place';
    title.textContent=locator;locatorLabel.textContent=locator;context.textContent=currentScene.placeContext||'Location and period associated with this chapter.';
    const flag=flagFor(currentScene.flagKey);flagArt.innerHTML=flag.art;flagCaption.textContent=flag.caption;
    const marker=markers[currentScene.mapKey];mapFigure.hidden=!marker;source.textContent='';
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
