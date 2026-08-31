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
  const NS='http://www.w3.org/2000/svg';
  const routeMaps={
    'great-lakes-to-southwest':{base:'us',route:[[133,24],[43,63],[48,72],[55,77]],labels:[[133,21,'Saginaw'],[55,85,'Mesa']]},
    'depression-western-moves':{base:'four',route:[[52,61],[38,62],[105,31],[81,17],[66,4],[52,61]],labels:[[52,68,'Mesa'],[66,9,'Salt Lake']]},
    'mesa-to-lakeside':{base:'az',route:[[73,68],[125,35]],labels:[[72,77,'Mesa'],[123,29,'Lakeside']]},
    'white-mountains':{base:'az',route:[[124,36],[139,29],[130,42],[116,33],[121,37]],labels:[[139,23,'St. Johns'],[116,29,'Vernon']]},
    'arizona-statewide':{base:'az',focus:[118,34],labels:[[118,27,'Arizona']]},
    'southwest-trinity':{base:'four',route:[[104,43],[139,45]],labels:[[103,39,'Arizona'],[139,40,'Trinity']]},
    'four-corners':{base:'four',route:[[52,60],[70,18],[103,43]],labels:[[52,68,'Arizona'],[70,13,'Utah']]},
    'southwest-regional':{base:'four',focus:[82,43],labels:[[82,38,'Southwest']]},
    'arizona-california':{base:'four',route:[[54,60],[13,55]],labels:[[54,68,'Arizona'],[13,51,'California']]},
    'united-states-context':{base:'us',focus:[91,45],labels:[[91,39,'United States']]},
    'arizona-flagstaff':{base:'az',focus:[87,28],labels:[[87,22,'Flagstaff']]},
    'great-lakes-arnstein':{base:'great',focus:[96,25],labels:[[96,20,'Arnstein'],[89,49,'Lake Huron']]},
    'arnstein-alpena':{base:'great',route:[[96,25],[77,53]],labels:[[97,20,'Arnstein'],[74,61,'Alpena']]},
    'alpena-local':{base:'great',focus:[77,53],labels:[[74,61,'Alpena']]},
    'alpena-saginaw':{base:'great',route:[[77,53],[72,73]],labels:[[78,49,'Alpena'],[72,82,'Saginaw']]},
    'charles-life-route':{base:'us',route:[[132,22],[129,39],[124,48],[53,73]],labels:[[132,18,'Ontario'],[53,82,'Arizona']]},
    'central-europe':{base:'europe',focus:[93,46],labels:[[93,39,'German Empire']]},
    'germany-ontario':{base:'atlantic',route:[[31,47],[149,43]],labels:[[31,40,'Germany'],[149,36,'Ontario']]},
    'godfrey-life-route':{base:'atlantic',route:[[31,47],[149,43],[143,57]],labels:[[31,40,'Germany'],[143,65,'Michigan']]},
    'great-lakes-alpena':{base:'great',focus:[77,53],labels:[[77,61,'Alpena'],[112,38,'Ontario']]},
    'origins-to-alpena':{base:'great',route:[[151,26],[112,38],[77,53]],labels:[[151,20,'Quebec'],[77,61,'Alpena']]},
    'ida-legacy-route':{base:'us',route:[[146,23],[129,40],[122,51],[53,74]],labels:[[146,18,'Quebec'],[53,83,'Arizona']]},
    'quebec-stlawrence':{base:'great',focus:[151,26],labels:[[151,20,'Quebec'],[128,31,'St. Lawrence']]},
    'great-lakes-transport':{base:'great',route:[[151,26],[121,39],[96,47],[77,53]],labels:[[151,20,'Quebec'],[77,61,'Great Lakes']]},
    'quebec-ontario':{base:'great',route:[[151,26],[112,38]],labels:[[151,20,'Quebec'],[112,32,'Ontario']]},
    'ontario-alpena':{base:'great',route:[[112,38],[77,53]],labels:[[112,32,'Ontario'],[77,61,'Alpena']]},
    'gooley-frontier':{base:'great',route:[[151,26],[133,31]],labels:[[151,20,'Quebec'],[132,38,'Parish?']]},
    'ontario-regional':{base:'great',focus:[112,38],labels:[[112,32,'Canada West']]},
    'dennis-frontier':{base:'great',route:[[112,38],[126,44]],labels:[[112,32,'Ontario'],[128,51,'Place?']]}
  };
  const markers={
    'arizona-mesa-regional':[29.5,61.8,'Mesa'],'mesa-to-st-johns':[45,49,'St. Johns'],
    'southwest-trinity':[62,68,'Trinity Site'],'four-corners':[48.4,8.8,'Four Corners'],
    'southwest-regional':[34,49,'Arizona'],'white-mountains':[45,49,'St. Johns'],
    'arizona-statewide':[34,49,'Arizona'],'arizona-california':[9,47,'California'],
    'arizona-flagstaff':[30.7,36.4,'Flagstaff'],'great-lakes-to-southwest':[29.5,61.8,'Mesa'],
    'depression-western-moves':[34,49,'Arizona'],'mesa-to-lakeside':[41.5,49.5,'Lakeside']
  };
  function svgElement(name,attrs={}){const node=document.createElementNS(NS,name);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));return node}
  function add(parent,name,attrs){const node=svgElement(name,attrs);parent.appendChild(node);return node}
  function routeBase(svg,base){
    if(base==='four'){
      add(svg,'rect',{class:'map-land',x:7,y:7,width:166,height:78,rx:2});
      add(svg,'path',{class:'map-border',d:'M52 7 V85 M100 7 V85 M7 46 H173'});
      add(svg,'path',{class:'map-water',d:'M25 7 C18 21 28 31 21 44 C16 56 25 67 18 85'});
      [['CA',25,61],['AZ',73,66],['NM',128,66],['UT',74,28],['CO',130,28]].forEach(([text,x,y])=>{const n=add(svg,'text',{x,y});n.textContent=text});return;
    }
    if(base==='az'){
      add(svg,'path',{class:'map-land',d:'M48 8 L133 8 137 22 143 78 64 83 47 66 Z'});
      add(svg,'path',{class:'map-water',d:'M50 9 C42 23 55 34 47 48 C41 60 53 67 50 75'});
      add(svg,'path',{class:'map-border',d:'M83 9 L78 79 M112 9 L117 80'});return;
    }
    if(base==='great'){
      add(svg,'rect',{class:'map-land',x:9,y:8,width:162,height:76});
      add(svg,'path',{class:'map-water',d:'M64 29 C71 21 84 22 88 31 C93 41 85 48 77 45 C69 43 61 37 64 29 Z M91 29 C99 21 113 22 119 31 C112 38 103 43 94 39 Z M91 47 C104 41 119 43 127 51 C117 59 101 59 91 53 Z M122 55 C135 51 146 55 152 62 C141 68 129 67 122 61 Z'});
      add(svg,'path',{class:'map-border',d:'M102 8 V23 M101 61 V84 M58 8 V84'});
      [['MI',69,69],['ON',112,18],['QC',151,13]].forEach(([text,x,y])=>{const n=add(svg,'text',{x,y});n.textContent=text});return;
    }
    if(base==='atlantic'){
      add(svg,'path',{class:'map-land',d:'M8 20 L39 14 53 29 46 66 17 72 7 51 Z'});add(svg,'path',{class:'map-land',d:'M128 15 L169 20 174 60 154 78 129 67 119 42 Z'});
      const ocean=add(svg,'text',{x:89,y:48,'text-anchor':'middle'});ocean.textContent='Atlantic';return;
    }
    if(base==='europe'){
      add(svg,'path',{class:'map-land',d:'M40 10 L70 14 82 8 104 18 127 16 142 31 133 48 143 63 121 78 98 73 79 83 61 70 44 66 33 48 Z'});
      add(svg,'path',{class:'map-border',d:'M72 18 L74 68 M102 16 L99 74 M48 46 L136 46'});return;
    }
    add(svg,'path',{class:'map-land',d:'M13 22 L30 13 53 14 68 8 89 13 105 10 121 16 143 18 165 31 158 43 163 54 147 59 137 72 116 75 101 68 84 70 70 78 53 73 43 62 29 58 22 45 10 39 Z'});
    add(svg,'path',{class:'map-border',d:'M31 18 L40 60 M57 15 L64 66 M78 13 L80 69 M103 12 L101 68 M126 18 L116 72'});
  }
  function renderRouteMap(scene){
    const spec=routeMaps[scene?.mapKey];if(!spec)return null;
    const svg=svgElement('svg',{class:'story-route-map',viewBox:'0 0 180 92',role:'img','aria-label':`${scene?.locator||'Family location'} regional route map`});routeBase(svg,spec.base);
    if(spec.route?.length){add(svg,'polyline',{class:`map-route${scene?.routeStatus==='unresolved'?' unresolved':''}`,points:spec.route.map(point=>point.join(',')).join(' ')});spec.route.forEach((point,index)=>add(svg,'circle',{class:index===spec.route.length-1?'map-focus':'map-stop',cx:point[0],cy:point[1],r:index===spec.route.length-1?3.6:2.6}))}
    else if(spec.focus)add(svg,'circle',{class:'map-focus',cx:spec.focus[0],cy:spec.focus[1],r:3.8});
    (spec.labels||[]).forEach(([x,y,text])=>{const node=add(svg,'text',{x,y,'text-anchor':'middle'});node.textContent=text});return svg;
  }
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
  window.AncestryStoryOverlays={version:'3.8.20',open,close,renderRouteMap,maps:Object.keys(routeMaps)};
})();
