/* Ancestry Atlas v3.8.0 — local, network-free story overlay renderer. */
(()=>{
  'use strict';
  const NS='http://www.w3.org/2000/svg';
  const flag=document.querySelector('.story-az-flag');
  const mapCard=document.querySelector('.story-locator-card');
  const label=document.getElementById('storyLocatorLabel');
  const previewNav=document.getElementById('storyPreviewImageNav');
  const previewPrev=document.getElementById('storyPreviewImagePrev');
  const previewNext=document.getElementById('storyPreviewImageNext');
  if(!flag||!mapCard)return;

  const maps={
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

  function el(name,attrs={}){
    const node=document.createElementNS(NS,name);
    for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));
    return node;
  }

  function add(parent,name,attrs){const node=el(name,attrs);parent.appendChild(node);return node}

  function usBase(svg){
    add(svg,'path',{class:'map-land',d:'M13 22 L30 13 53 14 68 8 89 13 105 10 121 16 143 18 165 31 158 43 163 54 147 59 137 72 116 75 101 68 84 70 70 78 53 73 43 62 29 58 22 45 10 39 Z'});
    add(svg,'path',{class:'map-water',d:'M118 14 C124 18 128 24 124 29 M130 18 C137 22 138 28 133 33 M143 21 C148 26 149 32 144 36'});
    add(svg,'path',{class:'map-terrain',d:'M42 20 C49 29 45 42 55 55 M51 18 C58 29 54 42 63 60 M92 18 C88 30 91 44 87 62'});
    add(svg,'path',{class:'map-border',d:'M31 18 L40 60 M57 15 L64 66 M78 13 L80 69 M103 12 L101 68 M126 18 L116 72'});
  }

  function fourBase(svg){
    add(svg,'rect',{class:'map-land',x:7,y:7,width:166,height:78,rx:2});
    add(svg,'path',{class:'map-border',d:'M52 7 V85 M100 7 V85 M7 46 H173'});
    add(svg,'path',{class:'map-water',d:'M25 7 C18 21 28 31 21 44 C16 56 25 67 18 85'});
    add(svg,'path',{class:'map-terrain',d:'M43 12 C55 22 40 31 57 40 M115 12 C106 24 121 31 110 43 M125 52 C114 63 130 70 119 82'});
    [['CA',25,61],['AZ',73,66],['NM',128,66],['UT',74,28],['CO',130,28]].forEach(([t,x,y])=>{const n=add(svg,'text',{x,y});n.textContent=t});
  }

  function arizonaBase(svg){
    add(svg,'path',{class:'map-land',d:'M48 8 L133 8 137 22 143 78 64 83 47 66 Z'});
    add(svg,'path',{class:'map-water',d:'M50 9 C42 23 55 34 47 48 C41 60 53 67 50 75'});
    add(svg,'path',{class:'map-terrain',d:'M70 19 C86 14 100 23 119 18 M72 31 C91 26 105 37 126 30 M83 48 C100 43 116 53 133 47'});
    add(svg,'path',{class:'map-border',d:'M83 9 L78 79 M112 9 L117 80'});
  }

  function greatBase(svg){
    add(svg,'path',{class:'map-land',d:'M9 8 H171 V84 H9 Z'});
    add(svg,'path',{class:'map-water',d:'M64 29 C71 21 84 22 88 31 C93 41 85 48 77 45 C69 43 61 37 64 29 Z M91 29 C99 21 113 22 119 31 C112 38 103 43 94 39 Z M91 47 C104 41 119 43 127 51 C117 59 101 59 91 53 Z M122 55 C135 51 146 55 152 62 C141 68 129 67 122 61 Z'});
    add(svg,'path',{class:'map-water',d:'M151 26 C138 28 127 32 118 38'});
    add(svg,'path',{class:'map-border',d:'M102 8 V23 M101 61 V84 M58 8 V84'});
    add(svg,'path',{class:'map-terrain',d:'M16 18 C33 27 24 38 42 48 M132 14 C119 24 132 34 121 44'});
    [['MI',69,69],['ON',112,18],['QC',151,13]].forEach(([t,x,y])=>{const n=add(svg,'text',{x,y});n.textContent=t});
  }

  function atlanticBase(svg){
    add(svg,'path',{class:'map-land',d:'M8 20 L39 14 53 29 46 66 17 72 7 51 Z'});
    add(svg,'path',{class:'map-land',d:'M128 15 L169 20 174 60 154 78 129 67 119 42 Z'});
    add(svg,'path',{class:'map-water',d:'M54 24 C72 14 101 14 121 25 M51 68 C75 79 103 78 128 65'});
    const ocean=add(svg,'text',{x:89,y:48,'text-anchor':'middle'});ocean.textContent='Atlantic';
  }

  function europeBase(svg){
    add(svg,'path',{class:'map-land',d:'M40 10 L70 14 82 8 104 18 127 16 142 31 133 48 143 63 121 78 98 73 79 83 61 70 44 66 33 48 Z'});
    add(svg,'path',{class:'map-water',d:'M41 14 C52 20 53 31 44 38 M126 18 C118 29 121 37 133 42'});
    add(svg,'path',{class:'map-border',d:'M72 18 L74 68 M102 16 L99 74 M48 46 L136 46'});
  }

  function renderMap(scene){
    const spec=maps[scene?.mapKey]||maps['arizona-statewide'];
    const old=mapCard.querySelector('svg');
    const svg=el('svg',{class:'story-route-map',viewBox:'0 0 180 92',role:'img','aria-label':`${scene?.locator||'Family location'} regional route map`});
    if(spec.base==='us')usBase(svg);else if(spec.base==='four')fourBase(svg);else if(spec.base==='great')greatBase(svg);else if(spec.base==='atlantic')atlanticBase(svg);else if(spec.base==='europe')europeBase(svg);else arizonaBase(svg);
    if(spec.route?.length){
      add(svg,'polyline',{class:`map-route${scene?.routeStatus==='unresolved'?' unresolved':''}`,points:spec.route.map(point=>point.join(',')).join(' ')});
      spec.route.forEach((point,index)=>add(svg,'circle',{class:index===spec.route.length-1?'map-focus':'map-stop',cx:point[0],cy:point[1],r:index===spec.route.length-1?3.6:2.6}));
    }else if(spec.focus){add(svg,'circle',{class:'map-focus',cx:spec.focus[0],cy:spec.focus[1],r:3.8})}
    (spec.labels||[]).forEach(([x,y,text])=>{const node=add(svg,'text',{x,y,'text-anchor':'middle'});node.textContent=text});
    old?.replaceWith(svg);
    if(label)label.textContent=scene?.locator||'Family story';
  }

  function arizonaFlag(){
    return '<svg viewBox="0 0 96 60" role="img" aria-hidden="true"><rect width="96" height="60" fill="#174a7c"/><path d="M48 30L0 30V17ZM48 30L0 17V4ZM48 30L6 0H23ZM48 30L23 0H38ZM48 30L38 0H52ZM48 30L52 0H68ZM48 30L68 0H85ZM48 30L85 0L96 5V18ZM48 30L96 18V30Z" fill="#f2b134"/><path d="M48 30L0 30V17ZM48 30L6 0H23ZM48 30L38 0H52ZM48 30L68 0H85ZM48 30L96 18V30Z" fill="#b51f2e"/><polygon points="48,19 51,26 59,26 53,31 55,39 48,34 41,39 43,31 37,26 45,26" fill="#c9822b"/></svg>';
  }

  function usFlag(stars=50){
    const rows=13;let stripes='';for(let i=0;i<rows;i++)stripes+=`<rect y="${i*60/rows}" width="96" height="${60/rows+.15}" fill="${i%2?'#fff':'#b22234'}"/>`;
    let dots='';const starRows=6,columns=Math.ceil(stars/starRows);for(let i=0;i<stars;i++){const r=Math.floor(i/columns),c=i%columns;dots+=`<circle cx="${3.4+c*(38/(columns-1||1))}" cy="${3+r*4.7}" r=".72" fill="#fff"/>`}
    return `<svg viewBox="0 0 96 60" role="img" aria-hidden="true">${stripes}<rect width="45" height="32" fill="#3c3b6e"/>${dots}</svg>`;
  }

  function michiganFlag(){
    return '<svg viewBox="0 0 96 60" role="img" aria-hidden="true"><rect width="96" height="60" fill="#00287e"/><ellipse cx="48" cy="30" rx="18" ry="20" fill="#d8c48a" stroke="#fff" stroke-width="1.5"/><path d="M38 38 Q48 16 58 38 Q48 33 38 38" fill="#5c8b55"/><path d="M42 28 Q48 21 54 28" fill="none" stroke="#5a321d" stroke-width="2"/></svg>';
  }

  function canadaRedEnsign(){
    return '<svg viewBox="0 0 96 60" role="img" aria-hidden="true"><rect width="96" height="60" fill="#b22234"/><rect width="48" height="30" fill="#173b73"/><path d="M0 0L48 30M48 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0L48 30M48 0L0 30" stroke="#b22234" stroke-width="2.5"/><path d="M24 0V30M0 15H48" stroke="#fff" stroke-width="10"/><path d="M24 0V30M0 15H48" stroke="#b22234" stroke-width="5"/><path d="M65 18H84V42H65Z" fill="#fff" stroke="#d3b76b"/><path d="M68 37L74 24L78 32L82 21" fill="none" stroke="#4d7f55" stroke-width="2"/></svg>';
  }

  function germanEmpireFlag(){return '<svg viewBox="0 0 96 60" role="img" aria-hidden="true"><rect width="96" height="20" fill="#111"/><rect y="20" width="96" height="20" fill="#fff"/><rect y="40" width="96" height="20" fill="#c5282f"/></svg>'}
  function provinceCanadaFlag(){return canadaRedEnsign()}
  function canadaUsFlag(){return `<svg viewBox="0 0 96 60" role="img" aria-hidden="true"><g transform="scale(.5 1)">${canadaRedEnsign()}</g><g transform="translate(48) scale(.5 1)">${usFlag(48)}</g></svg>`}

  function renderFlag(scene){
    const key=scene?.flagKey||'arizona-1917';
    let name='Arizona';let markup=arizonaFlag();
    if(key==='michigan-1923'){name='Michigan';markup=michiganFlag()}
    else if(key==='united-states-48-star'){name='United States 48-star flag';markup=usFlag(48)}
    else if(key==='united-states-50-star'){name='United States flag';markup=usFlag(50)}
    else if(key==='united-states-37-star'){name='United States 37-star flag';markup=usFlag(37)}
    else if(key==='united-states-45-star'){name='United States 45-star flag';markup=usFlag(45)}
    else if(key==='united-states-46-star'){name='United States 46-star flag';markup=usFlag(46)}
    else if(key==='canada-red-ensign'){name='Canadian Red Ensign';markup=canadaRedEnsign()}
    else if(key==='german-empire'){name='German Empire flag';markup=germanEmpireFlag()}
    else if(key==='province-canada'){name='Province of Canada historical flag context';markup=provinceCanadaFlag()}
    else if(key==='canada-us'){name='Canada and United States';markup=canadaUsFlag()}
    flag.innerHTML=markup;flag.setAttribute('aria-label',name);flag.title=name;
  }

  document.addEventListener('ancestryatlas:scenechange',event=>{
    document.body.classList.remove('story-map-expanded');
    const scene=event.detail?.scene||{};renderFlag(scene);renderMap(scene);
    const media=event.detail?.media,index=event.detail?.index||0;
    const count=Array.isArray(media?.scenes)?media.scenes.length:0;
    const preview=!media?.audio&&count>1;
    if(previewNav)previewNav.hidden=!preview;
    if(previewPrev)previewPrev.disabled=index<=0;
    if(previewNext)previewNext.disabled=index>=count-1;
  });
  mapCard.tabIndex=0;
  mapCard.setAttribute('role','button');
  mapCard.setAttribute('aria-label','Open larger regional map');
  const toggleMap=()=>{
    const open=document.body.classList.toggle('story-map-expanded');
    mapCard.setAttribute('aria-expanded',String(open));
    mapCard.setAttribute('aria-label',open?'Close larger regional map':'Open larger regional map');
  };
  mapCard.addEventListener('click',toggleMap);
  mapCard.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleMap()}});
  previewPrev?.addEventListener('click',()=>window.AncestryTour?.previewScene?.(-1));
  previewNext?.addEventListener('click',()=>window.AncestryTour?.previewScene?.(1));
  window.AncestryStoryOverlays={version:'3.8.1',maps:Object.keys(maps)};
})();
