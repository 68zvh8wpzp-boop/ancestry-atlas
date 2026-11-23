/* Ancestry Atlas 2-D journey — a continuous, zoomable map of original mapped ancestry.
   This prototype never changes the archival node/edge records. */
(function(){
"use strict";
var data=window.ATLAS_2D_PEDIGREE,lib=window.Atlas2DLayout,familyLib=window.Atlas2DFamily;
if(!data||!lib||!familyLib){document.body.textContent="The Atlas map could not load its family relationships.";return;}
var layout=lib.create(data,"you"),familyIndex=familyLib.create(data);
var nodes=layout.nodes,byId=layout.positions,links=layout.links;
var siblingCounts=new Map(nodes.map(function(n){return [n.id,familyIndex.family(n.id).siblingCount];}));
var rootParents=layout.parents.get("you")||[];
var fatherId=rootParents[0],motherId=rootParents[1];
var canvas=document.getElementById("tree"),ctx=canvas.getContext("2d",{alpha:false});
var mini=document.getElementById("mini"),mctx=mini.getContext("2d");
var info=document.getElementById("card"),nameEl=document.getElementById("selected-name");
var metaEl=document.getElementById("selected-meta"),stateEl=document.getElementById("selected-state");
var trailEl=document.getElementById("trail"),tipEl=document.getElementById("tip");
var w=0,h=0,dpr=1,cam={x:0,y:0,s:.8},selected="you",animation=0,ready=false;
var mapBounds=layout.bounds;
var pointers=new Map(),gesture={moved:false,pinch:false,startX:0,startY:0,startTime:0};
var drawPending=false,hideTip=false;
var persistKey="ancestry-atlas-2d-camera-v1";
try{
  var restore=JSON.parse(localStorage.getItem(persistKey)||"null");
  if(restore && byId.has(restore.selected)){selected=restore.selected;
    if(Number.isFinite(restore.s)&&Number.isFinite(restore.x)&&Number.isFinite(restore.y)){
      cam={x:restore.x,y:restore.y,s:Math.max(.07,Math.min(2.5,restore.s))};ready=true;
    }
  }
}catch(_){}
// Explicit navigation from Family takes precedence over an older camera position.
var requestedFromFamily=new URLSearchParams(location.search).get("person");
var unlinkedFromFamily=null;
if(requestedFromFamily&&byId.has(requestedFromFamily)){
  selected=requestedFromFamily;ready=false;
}else if(requestedFromFamily&&data.nodes.some(function(n){return n.id===requestedFromFamily;})){
  // The continuous 2D pedigree cannot display an unlinked research/collateral
  // node as an invented parent edge: open its existing family portrait instead.
  unlinkedFromFamily=requestedFromFamily;
}
var paternalColor="#8bb6d4",maternalColor="#6cb8af",gold="#f3d39a";
var selectionPath=layout.pathTo(selected);
var lastTap={time:0,x:0,y:0};
function store(){
  try{localStorage.setItem(persistKey,JSON.stringify({selected:selected,x:cam.x,y:cam.y,s:cam.s}));}catch(_){}
}
function clamp(x,a,b){return Math.max(a,Math.min(b,x));}
function xy(n){return {x:n.x*cam.s+cam.x,y:n.y*cam.s+cam.y};}
function world(x,y){return {x:(x-cam.x)/cam.s,y:(y-cam.y)/cam.s};}
function animateCamera(target,duration){
  animation++;
  var ticket=animation,start={x:cam.x,y:cam.y,s:cam.s},startAt=performance.now();
  if(!duration||window.matchMedia("(prefers-reduced-motion:reduce)").matches){
    Object.assign(cam,target);render();store();return;
  }
  function tick(t){
    if(ticket!==animation)return;
    var p=clamp((t-startAt)/duration,0,1),k=1-Math.pow(1-p,3);
    cam.x=start.x+(target.x-start.x)*k;
    cam.y=start.y+(target.y-start.y)*k;
    cam.s=start.s+(target.s-start.s)*k;
    render();
    if(p<1)requestAnimationFrame(tick);else store();
  }
  requestAnimationFrame(tick);
}
function focus(id,zoom,animate){
  var n=byId.get(id);if(!n)return;
  selected=id;selectionPath=layout.pathTo(id);fillInfo();
  var s=zoom?Math.max(.76,cam.s):cam.s;
  s=clamp(s,.07,2.5);
  var target={s:s,x:w*.245-n.x*s,y:h*.455-n.y*s};
  animateCamera(target,animate===false?0:430);
}
function zoomAt(multiplier,x,y,duration){
  var s=clamp(cam.s*multiplier,.07,2.5),p=world(x,y);
  var target={s:s,x:x-p.x*s,y:y-p.y*s};
  if(duration)animateCamera(target,duration);else{animation++;Object.assign(cam,target);render();store();}
}
function fitAll(){
  var b=mapBounds,availableH=h-260,scale=Math.min((w-48)/(b.maxX-b.minX),Math.max(190,availableH)/(b.maxY-b.minY));
  scale=clamp(scale,.07,1);
  var centerX=(b.minX+b.maxX)/2,centerY=(b.minY+b.maxY)/2;
  animateCamera({s:scale,x:w*.5-centerX*scale,y:h*.45-centerY*scale},500);
}
function resetToYou(){focus("you",true,true);}
function lineage(id){
  var path=layout.pathTo(id);
  if(path.length<2)return "root";
  if(path[1]===fatherId)return "father";
  if(path[1]===motherId)return "mother";
  return "other";
}
function showStatus(n){
  var confidence=n.confidence||"strong";
  if(confidence==="frontier")return "Research frontier — relationship or identity remains unresolved";
  if(confidence==="provisional")return "Provisional research link — not established";
  if(confidence==="strong")return "Strongly supported — review source notes for limits";
  if(confidence==="confirmed")return "Documented in the Atlas research";
  return "Research status: "+confidence;
}
function fillInfo(){
  var n=byId.get(selected)||byId.get("you");
  nameEl.textContent=n.name;
  metaEl.textContent=[n.years,n.branch,"Generation "+n.generation].filter(Boolean).join(" · ");
  var sibCount=siblingCounts.get(selected)||0;
  stateEl.textContent=(sibCount?sibCount+" mapped sibling"+(sibCount===1?"":"s")+" · ":"")+showStatus(n);
  // Photo attribution is independent of genealogical confidence. Preserve both.
  var portraitState=portraitCache?.get(selected);
  var portraitMeta=portraitState?.loaded?portraitState.activeEntry:window.ATLAS_2D_PORTRAITS?.[selected];
  if(portraitMeta)stateEl.textContent+=" · Portrait: "+
    (portraitMeta.type==="identified-group-crop"?"cropped from captioned family photograph":
     portraitMeta.sourceStatus==="family-attributed"?"family-attributed photograph":"identified individual photograph");
  var photoLink=document.getElementById("selected-photo-source");
  if(photoLink){
    photoLink.hidden=!portraitMeta?.url;
    if(portraitMeta?.url){
      photoLink.href=portraitMeta.fullSourceUrl||portraitMeta.url;
      photoLink.textContent=portraitMeta.crop?"View preserved source photograph":"View portrait source";
      photoLink.title=[portraitMeta.title,portraitMeta.identityEvidence,portraitMeta.provenance].filter(Boolean).join(" · ");
    }
  }
  trailEl.replaceChildren();
  selectionPath.forEach(function(id,i){
    if(i){var dot=document.createElement("span");dot.className="sep";dot.textContent="›";trailEl.appendChild(dot);}
    var btn=document.createElement("button");btn.type="button";btn.textContent=id==="you"?"You":byId.get(id).name;
    btn.dataset.person=id;trailEl.appendChild(btn);
  });
  trailEl.scrollLeft=trailEl.scrollWidth;
  var approx=(cam.s>=.6?"Close-up":cam.s>=.28?"Branch view":"Overview");
  document.getElementById("status").textContent=approx+" · "+nodes.length+" mapped people · "+layout.maxGeneration+" generations";
}
function measureCanvas(){
  var r=canvas.getBoundingClientRect();w=Math.max(250,r.width);h=Math.max(350,r.height);
  dpr=Math.min(window.devicePixelRatio||1,2.5);
  canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  var mrect=mini.getBoundingClientRect(),mdpr=Math.min(window.devicePixelRatio||1,2);
  mini.width=Math.max(1,Math.round(mrect.width*mdpr));mini.height=Math.max(1,Math.round(mrect.height*mdpr));
  mctx.setTransform(mdpr,0,0,mdpr,0,0);
  if(!ready){var node=byId.get(selected);cam.s=.8;cam.x=w*.245-node.x*cam.s;cam.y=h*.455-node.y*cam.s;ready=true;}
  fillInfo();render();
}
function roundRect(context,x,y,ww,hh,r){
  var rr=Math.min(r,ww/2,hh/2);
  context.beginPath();context.moveTo(x+rr,y);
  context.lineTo(x+ww-rr,y);context.quadraticCurveTo(x+ww,y,x+ww,y+rr);
  context.lineTo(x+ww,y+hh-rr);context.quadraticCurveTo(x+ww,y+hh,x+ww-rr,y+hh);
  context.lineTo(x+rr,y+hh);context.quadraticCurveTo(x,y+hh,x,y+hh-rr);
  context.lineTo(x,y+rr);context.quadraticCurveTo(x,y,x+rr,y);
  context.closePath();
}
function shorten(text,maxWidth,font){
  ctx.font=font;
  if(ctx.measureText(text).width<=maxWidth)return text;
  var out=text;
  while(out.length>1&&ctx.measureText(out+"…").width>maxWidth)out=out.slice(0,-1);
  return out+"…";
}
function drawBackground(){
  ctx.fillStyle="#07131f";ctx.fillRect(0,0,w,h);
  var sky=ctx.createLinearGradient(0,0,w,h);sky.addColorStop(0,"rgba(37,75,98,.22)");sky.addColorStop(1,"rgba(4,12,20,0)");
  ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
  // Stationary dot grid gives subtle panning feedback without perspective distortion.
  var grid=80*cam.s;if(grid<17)grid*=Math.ceil(17/grid);
  ctx.fillStyle="rgba(144,176,193,.11)";
  for(var x=((cam.x%grid)+grid)%grid;x<w;x+=grid)
    for(var y=((cam.y%grid)+grid)%grid;y<h;y+=grid){ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2);ctx.fill();}
  // Each vertical guide marks one generation. They remain fixed in the tree's world coordinates.
  for(var gen=0;gen<=layout.maxGeneration;gen++){
    var gx=gen*270*cam.s+cam.x;if(gx<-110||gx>w+100)continue;
    ctx.strokeStyle="rgba(132,166,183,.12)";ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,h);ctx.stroke();
    if(cam.s>.24){
      var label=gen===0?"You":gen===1?"Parents":gen===2?"Grandparents":gen===3?"Great-grandparents":(gen-2)+"× great";
      ctx.fillStyle="rgba(173,202,217,.62)";ctx.font="500 10px system-ui";
      ctx.textAlign="center";ctx.fillText(label,gx,92+Math.max(0,window.visualViewport?.offsetTop||0));
    }
  }
}
function edgePath(from,to){
  var a=xy(from),b=xy(to),m=(a.x+b.x)/2;
  ctx.beginPath();ctx.moveTo(a.x,a.y);
  ctx.bezierCurveTo(m,a.y,m,b.y,b.x,b.y);
}
function drawEdges(){
  var chosenLinks=new Set();
  for(var k=0;k<selectionPath.length-1;k++)chosenLinks.add(selectionPath[k]+"|"+selectionPath[k+1]);
  for(var highlight=0;highlight<=1;highlight++){
    for(var e of links){
      var active=chosenLinks.has(e.from+"|"+e.to);if(active!==!!highlight)continue;
      var a=byId.get(e.from),b=byId.get(e.to);if(!a||!b)continue;
      var aa=xy(a),bb=xy(b);
      if(Math.max(aa.x,bb.x)<-60||Math.min(aa.x,bb.x)>w+60)continue;
      if(Math.max(aa.y,bb.y)<-65||Math.min(aa.y,bb.y)>h+65)continue;
      ctx.save();
      ctx.strokeStyle=highlight?gold:(lineage(e.to)==="father"?paternalColor:lineage(e.to)==="mother"?maternalColor:"#789eae");
      ctx.globalAlpha=highlight?.95:.33;
      ctx.lineWidth=highlight?Math.max(2.5,2.9*cam.s):Math.max(1,1.8*cam.s);
      ctx.lineCap="round";
      if(!highlight&&/frontier|provisional/.test(e.confidence))ctx.setLineDash([5,6]);
      edgePath(a,b);ctx.stroke();ctx.restore();
    }
  }
}
// Only load preidentified person portraits. Missing images keep a neutral bust icon.
var portraits=window.ATLAS_2D_PORTRAITS||{},portraitCache=new Map();
// One decorative anonymous illustration is shared by all unpictured persons.
// It is NOT a historical likeness or additional photograph.
var atlasAnonymousCameo=new Image();
atlasAnonymousCameo.onload=function(){render();};
atlasAnonymousCameo.src="./assets/atlas-anonymous-cameo-20261123.svg";
Object.keys(portraits).forEach(function(id){
  var person=portraits[id];
  if(!byId.has(id)||!person?.url)return;
  // Alternate images are independently sourced photographs of the SAME named
  // person, used only if the chosen primary cannot load. No identity inference.
  var choices=[person].concat(person.alternatePortraits||[]);
  var img=new Image();
  var state={image:img,loaded:false,choices:choices,index:0,activeEntry:person};
  portraitCache.set(id,state);
  img.onload=function(){
    state.loaded=img.naturalWidth>0&&img.naturalHeight>0;
    if(id===selected)fillInfo();
    render();
  };
  img.onerror=function(){
    state.loaded=false;
    if(state.index+1<state.choices.length){
      state.index++;
      state.activeEntry=state.choices[state.index];
      img.src=state.activeEntry.url;
      return;
    }
    if(id===selected)fillInfo();
    render();
  };
  img.src=person.url;
});
function drawPortraitOrBust(id,x,y,width,height){
  ctx.save();
  roundRect(ctx,x,y,width,height,Math.max(3,5*cam.s));
  ctx.clip();
  ctx.fillStyle="#173244";ctx.fillRect(x,y,width,height);
  var photo=portraitCache.get(id);
  if(photo?.loaded){
    var img=photo.image,meta=photo.activeEntry||portraits[id]||{};
    // A cropped *view* of the preserved original. Normalized bounds are sourced
    // to caption-identifiable subjects, never inferred by face recognition.
    // Preserve facial proportions by center-covering within the chosen crop.
    var crop=meta.crop,iw=img.naturalWidth,ih=img.naturalHeight;
    if(Array.isArray(crop)&&crop.length===4){
      var sx=Math.max(0,Math.min(iw-1,crop[0]*iw));
      var sy=Math.max(0,Math.min(ih-1,crop[1]*ih));
      var sw=Math.max(1,Math.min(iw-sx,crop[2]*iw));
      var sh=Math.max(1,Math.min(ih-sy,crop[3]*ih));
      var sourceRatio=sw/sh,targetRatio=width/height;
      if(sourceRatio>targetRatio){var coverWidth=sh*targetRatio;sx+=(sw-coverWidth)/2;sw=coverWidth;}
      else{var coverHeight=sw/targetRatio;sy+=(sh-coverHeight)/2;sh=coverHeight;}
      try{ctx.drawImage(img,sx,sy,sw,sh,x,y,width,height);}catch(_){}
    }else{
      var ratio=Math.max(width/iw,height/ih);
      var scaledW=iw*ratio,scaledH=ih*ratio;
      try{ctx.drawImage(img,x+(width-scaledW)/2,y+(height-scaledH)/2,scaledW,scaledH);}catch(_){}
    }
  }else{
    // Museum cameo is decorative only, not a proposed or AI-generated likeness.
    if(atlasAnonymousCameo.complete&&atlasAnonymousCameo.naturalWidth>0){
      var iw=atlasAnonymousCameo.naturalWidth,ih=atlasAnonymousCameo.naturalHeight;
      var scale=Math.max(width/iw,height/ih);
      ctx.drawImage(atlasAnonymousCameo,x+(width-iw*scale)/2,y+(height-ih*scale)/2,iw*scale,ih*scale);
    }else{
      // Offline/failure backup: recognizable medallion, not a faint stick-figure.
      var mx=x+width/2,my=y+height*.46,r=Math.min(width*.36,height*.43);
      ctx.fillStyle="#d6bc85";ctx.beginPath();ctx.ellipse(mx,my,r*.85,r,0,0,2*Math.PI);ctx.fill();
      ctx.fillStyle="#18323d";ctx.beginPath();ctx.ellipse(mx,my,r*.74,r*.89,0,0,2*Math.PI);ctx.fill();
      ctx.fillStyle="#c6ae83";ctx.beginPath();ctx.ellipse(mx,my-r*.23,r*.24,r*.28,0,0,2*Math.PI);ctx.fill();
      ctx.beginPath();ctx.ellipse(mx,my+r*.58,r*.53,r*.35,0,Math.PI,2*Math.PI);ctx.fill();
    }
  }
  ctx.restore();
}
function drawNodes(){
  var s=cam.s;
  for(var node of nodes){
    var p=xy(node);
    if(p.x<-(125*s+35)||p.x>w+125*s+35||p.y<-(50*s+30)||p.y>h+50*s+30)continue;
    var active=node.id===selected,uncertain=node.confidence==="frontier"||node.confidence==="provisional";
    var branch=lineage(node.id),accent=branch==="father"?paternalColor:branch==="mother"?maternalColor:"#a3bfce";
    if(s<.28){
      ctx.beginPath();ctx.arc(p.x,p.y,active?6.5:Math.max(2.3,s*10),0,Math.PI*2);
      ctx.fillStyle=active?gold:accent;ctx.globalAlpha=active?1:.72;ctx.fill();ctx.globalAlpha=1;
      if(active){ctx.beginPath();ctx.arc(p.x,p.y,12,0,Math.PI*2);ctx.strokeStyle=gold;ctx.lineWidth=1.4;ctx.stroke();}
      continue;
    }
    var full=s>=.66,halfW=(full?105:79)*s,halfH=(full?34:24)*s;
    var rw=halfW*2,rh=halfH*2;
    ctx.save();
    roundRect(ctx,p.x-halfW,p.y-halfH,rw,rh,Math.max(5,12*s));
    ctx.fillStyle=active?"#37536a":(uncertain?"#263443":branch==="father"?"#203a51":branch==="mother"?"#1b3c41":"#203442");
    ctx.fill();
    ctx.strokeStyle=active?gold:uncertain?"#ad9a74":accent;
    ctx.lineWidth=active?Math.max(2,2*s):Math.max(1,1.2*s);
    if(uncertain&&!active)ctx.setLineDash([3,4]);
    ctx.stroke();ctx.setLineDash([]);
    // Tiny status bar stays meaningful even when text is abbreviated.
    ctx.fillStyle=active?gold:accent;ctx.fillRect(p.x-halfW+5*s,p.y-halfH+6*s,3*s,rh-12*s);
    ctx.textBaseline="middle";ctx.textAlign="left";ctx.fillStyle="#eff6fb";
    var textX=p.x-halfW+14*s;
    if(full){
      drawPortraitOrBust(node.id,p.x-halfW+10*s,p.y-halfH+8*s,39*s,rh-16*s);
      textX=p.x-halfW+55*s;
      var titleFont="700 "+Math.max(11,15*s)+"px system-ui";
      var detailFont="500 "+Math.max(10,11.6*s)+"px system-ui";
      var display=node.id==="you"?"You":node.name;
      ctx.font=titleFont;ctx.fillText(shorten(display,rw-67*s,titleFont),textX,p.y-9*s);
      ctx.fillStyle="#aec9d8";ctx.font=detailFont;
      var sibNum=siblingCounts.get(node.id)||0;
      var badgeText=sibNum?sibNum+" sib":"";
      var badgeFont=Math.max(10,11*s)+"px system-ui";
      ctx.font=badgeFont;
      var badgeW=sibNum?ctx.measureText(badgeText).width+11*s:0;
      // Reserve room within the existing node card; don't widen its hit target
      // or alter the spacing between ancestral generations.
      ctx.font=detailFont;
      ctx.fillText(shorten([node.years,node.branch].filter(Boolean).join(" · "),rw-67*s-(sibNum?badgeW+8*s:0),detailFont),textX,p.y+13*s);
      if(sibNum){
        var badgeH=Math.max(16,17*s),bx=p.x+halfW-badgeW-7*s,by=p.y+halfH-badgeH-5*s;
        roundRect(ctx,bx,by,badgeW,badgeH,Math.min(7,badgeH/2));
        ctx.fillStyle="#315968";ctx.fill();
        ctx.strokeStyle="#8bc4cc";ctx.lineWidth=1;ctx.stroke();
        ctx.fillStyle="#f5fbfd";ctx.textAlign="center";ctx.textBaseline="middle";
        ctx.font="700 "+badgeFont;ctx.fillText(badgeText,bx+badgeW/2,by+badgeH/2);
      }
    }else{
      var short=node.id==="you"?"You":node.name.split(" ").slice(-1)[0];
      var smallFont="700 "+Math.max(10,13*s)+"px system-ui";
      ctx.font=smallFont;ctx.fillText(shorten(short,rw-22*s,smallFont),textX,p.y);
    }
    ctx.restore();
  }
}
var miniTransform=null;
function drawMini(){
  var mw=mini.getBoundingClientRect().width,mh=mini.getBoundingClientRect().height;
  mctx.clearRect(0,0,mw,mh);mctx.fillStyle="#071b2b";mctx.fillRect(0,0,mw,mh);
  var b=mapBounds,sw=b.maxX-b.minX,sh=b.maxY-b.minY,scale=Math.min((mw-10)/sw,(mh-12)/sh);
  var ox=(mw-sw*scale)/2-b.minX*scale,oy=(mh-sh*scale)/2-b.minY*scale;
  miniTransform={ox:ox,oy:oy,scale:scale};
  mctx.strokeStyle="#355a72";mctx.lineWidth=.75;
  for(var e of links){
    var a=byId.get(e.from),z=byId.get(e.to);
    mctx.beginPath();mctx.moveTo(ox+a.x*scale,oy+a.y*scale);mctx.lineTo(ox+z.x*scale,oy+z.y*scale);mctx.stroke();
  }
  for(var n of nodes){
    mctx.fillStyle=n.id===selected?gold:lineage(n.id)==="father"?paternalColor:maternalColor;
    mctx.fillRect(ox+n.x*scale-1,oy+n.y*scale-1,2.4,2.4);
  }
  var left=(0-cam.x)/cam.s,right=(w-cam.x)/cam.s,top=(0-cam.y)/cam.s,bottom=(h-cam.y)/cam.s;
  mctx.strokeStyle="#ffe0a8";mctx.lineWidth=1.5;
  mctx.strokeRect(ox+left*scale,oy+top*scale,(right-left)*scale,(bottom-top)*scale);
}
function render(){
  if(!w||!h)return;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  drawBackground();drawEdges();drawNodes();drawMini();
}
function eventXY(e){var r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};}
function hit(x,y){
  var picked=null,best=Infinity;
  for(var n of nodes){
    var p=xy(n),dx=x-p.x,dy=y-p.y;
    var halfWidth=cam.s>=.66?106*cam.s:cam.s>=.28?80*cam.s:19;
    var halfHeight=cam.s>=.66?35*cam.s:cam.s>=.28?26*cam.s:19;
    var within=Math.abs(dx)<Math.max(halfWidth,21)&&Math.abs(dy)<Math.max(halfHeight,21);
    if(!within)continue;
    var score=(dx*dx+dy*dy);
    if(score<best){best=score;picked=n;}
  }
  return picked;
}
function beginGesture(e){
  if(e.button!==undefined && e.button!==0)return;
  e.preventDefault();animation++;
  var p=eventXY(e);
  pointers.set(e.pointerId,p);
  try{canvas.setPointerCapture(e.pointerId);}catch(_){}
  if(pointers.size===1)gesture={moved:false,pinch:false,startX:p.x,startY:p.y,startTime:performance.now()};
  if(pointers.size>1)gesture.pinch=true;
}
function mid(a,b){return {x:(a.x+b.x)/2,y:(a.y+b.y)/2};}
function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
function changeGesture(e){
  if(!pointers.has(e.pointerId))return;
  e.preventDefault();
  var before=pointers.get(e.pointerId),after=eventXY(e);
  if(Math.hypot(after.x-gesture.startX,after.y-gesture.startY)>8)gesture.moved=true;
  if(pointers.size===1 && !gesture.pinch){
    cam.x+=after.x-before.x;cam.y+=after.y-before.y;pointers.set(e.pointerId,after);
  }else if(pointers.size===2){
    var others=[...pointers.entries()].filter(function(entry){return entry[0]!==e.pointerId;});
    var other=others[0][1],from=mid(other,before),to=mid(other,after);
    var oldDist=Math.max(12,distance(other,before)),newDist=Math.max(12,distance(other,after));
    var anchor=world(from.x,from.y);
    var zoom=clamp(cam.s*newDist/oldDist,.07,2.5);
    cam.s=zoom;cam.x=to.x-anchor.x*zoom;cam.y=to.y-anchor.y*zoom;
    pointers.set(e.pointerId,after);gesture.pinch=true;
  }
  hideTip=true;render();
}
function endGesture(e){
  if(!pointers.has(e.pointerId))return;
  var p=eventXY(e);
  if(pointers.size===1 && !gesture.moved && !gesture.pinch && e.type==="pointerup"
     && performance.now()-gesture.startTime<550){
    var n=hit(p.x,p.y);
    if(n){
      // The first tap selects and recenters. Tap the same readable node again
      // for its stationary immediate-family portrait, without moving the map.
      if(n.id===selected && cam.s>=.4)openFamily(n.id);
      else focus(n.id,cam.s<.7,true);
      lastTap={time:performance.now(),x:p.x,y:p.y};
    }
  }
  pointers.delete(e.pointerId);
  if(!pointers.size){gesture.pinch=false;store();}
}
canvas.addEventListener("pointerdown",beginGesture,{passive:false});
canvas.addEventListener("pointermove",changeGesture,{passive:false});
canvas.addEventListener("pointerup",endGesture,{passive:false});
canvas.addEventListener("pointercancel",endGesture,{passive:false});
canvas.addEventListener("wheel",function(e){
  e.preventDefault();
  var p=eventXY(e);zoomAt(Math.exp(-e.deltaY*.0012),p.x,p.y,0);
},{passive:false});
canvas.addEventListener("keydown",function(e){
  var step=50;
  if(e.key==="ArrowLeft"){cam.x+=step;}else if(e.key==="ArrowRight"){cam.x-=step;}
  else if(e.key==="ArrowUp"){cam.y+=step;}else if(e.key==="ArrowDown"){cam.y-=step;}
  else if(e.key==="+"||e.key==="="){zoomAt(1.2,w/2,h*.45,0);e.preventDefault();return;}
  else if(e.key==="-"){zoomAt(1/1.2,w/2,h*.45,0);e.preventDefault();return;}
  else return;
  e.preventDefault();animation++;render();store();
});
mini.addEventListener("click",function(e){
  if(!miniTransform)return;
  var r=mini.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  var wx=(x-miniTransform.ox)/miniTransform.scale,wy=(y-miniTransform.oy)/miniTransform.scale;
  animateCamera({s:cam.s,x:w*.5-wx*cam.s,y:h*.43-wy*cam.s},350);
});
document.getElementById("back-you").addEventListener("click",resetToYou);
document.getElementById("fit-all").addEventListener("click",fitAll);
document.getElementById("zoom-plus").addEventListener("click",function(){zoomAt(1.3,w/2,h*.46,260);});
document.getElementById("zoom-minus").addEventListener("click",function(){zoomAt(1/1.3,w/2,h*.46,260);});
document.getElementById("zoom-near").addEventListener("click",function(){focus(selected,true,true);});
trailEl.addEventListener("click",function(e){var b=e.target.closest("[data-person]");if(b)focus(b.dataset.person,true,true);});
var searchPanel=document.getElementById("search-panel"),searchInput=document.getElementById("search"),searchResults=document.getElementById("search-results");
function normalize(text){return String(text||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();}
function searchNow(){
  searchResults.replaceChildren();
  var q=String(searchInput.value||"").trim();
  var result=q&&window.AtlasPersonSearch?
    window.AtlasPersonSearch.search(data.nodes,q,60):null;
  var matches=result?result.matches:q?data.nodes.filter(function(n){
    return normalize([n.name,n.years,n.place,n.branch].join(" ")).includes(normalize(q));
  }).map(function(person){return {person:person,approximate:false};}):[];
  var total=result?result.total:matches.length;
  document.getElementById("search-counter").textContent=q?
    total+" matching people in "+data.nodes.length+" Atlas records"+
      (result&&result.approximateCount?" · "+result.approximateCount+" possible spelling matches":""):
    "Search all "+data.nodes.length+" Atlas records, or close this panel to explore the connected tree.";
  matches.slice(0,60).forEach(function(hit){
    var n=hit.person,b=document.createElement("button");b.className="search-item";b.type="button";
    var strong=document.createElement("strong");strong.textContent=n.name;b.appendChild(strong);
    var small=document.createElement("small");
    small.textContent=[hit.approximate?"Possible spelling match — verify identity":null,
      n.years,n.branch,byId.has(n.id)?"On the direct tree":
      n.confidence==="frontier"?"Research frontier":"Unlinked or collateral record"].filter(Boolean).join(" · ");
    b.appendChild(small);
    b.onclick=function(){
      searchPanel.hidden=true;searchInput.blur();
      if(byId.has(n.id))focus(n.id,true,true);else openFamily(n.id);
    };
    searchResults.appendChild(b);
  });
}
function showSearch(){searchPanel.hidden=false;searchInput.value="";searchNow();searchInput.focus();}
function closeSearch(){searchPanel.hidden=true;searchInput.blur();}
document.getElementById("show-search").addEventListener("click",showSearch);
document.getElementById("close-search").addEventListener("click",closeSearch);
searchInput.addEventListener("input",searchNow);
searchInput.addEventListener("keydown",function(e){if(e.key==="Escape")closeSearch();});
var familyPanel=document.getElementById("family-panel");
var familyLastTrigger=null,familyPersonId=null;
function familyTile(person){
  var tile=document.createElement("div");tile.className="family-person";
  if(window.AtlasFamilyPortraitUI)window.AtlasFamilyPortraitUI.attachPortrait(tile,person.id,{});
  var name=document.createElement("h3");name.textContent=person.name;tile.appendChild(name);
  if(person.years){
    var years=document.createElement("p");years.textContent=person.years;tile.appendChild(years);
  }
  if(person.branch){
    var branch=document.createElement("p");branch.className="family-branch";branch.textContent=person.branch;tile.appendChild(branch);
  }

  var action=document.createElement("button");action.type="button";action.className="family-person-action";
  action.dataset.aaFamilyPerson=person.id;action.textContent="View person";tile.appendChild(action);
  return tile;
}
function familyGroup(elementId,people,emptyText){
  var parent=document.getElementById(elementId);
  parent.replaceChildren();
  if(!people.length){
    var empty=document.createElement("div");empty.className="family-empty";empty.textContent=emptyText;parent.appendChild(empty);
    return;
  }
  people.forEach(function(person){parent.appendChild(familyTile(person));});
}
function familySiblingGroup(family){
  var target=document.getElementById("family-siblings");target.replaceChildren();
  // Keep the chosen ancestor visibly highlighted within the family of origin.
  var entries=[{person:family.person,label:"Selected person",chosen:true}].concat(
    family.siblings.map(function(s){return {person:s.person,label:s.label,chosen:false};})
  );
  entries.forEach(function(entry){
    var tile=familyTile(entry.person);
    if(entry.chosen)tile.className+=" family-highlight";
    var note=document.createElement("p");
    note.className="family-relationship";
    note.textContent=entry.label;
    tile.appendChild(note);
    target.appendChild(tile);
  });
  if(window.AtlasFamilyPortraitUI)window.AtlasFamilyPortraitUI.enhanceScrollTrack(target);
  var count=family.siblingCount;
  document.getElementById("family-sibling-count").textContent=count?
    count+" sibling"+(count===1?"":"s")+" linked through at least one recorded parent · "
      +(count+1)+" family members displayed":
    "No sibling linked through a recorded parent in the current Atlas.";
}
function renderChildGroups(family){
  var container=document.getElementById("family-child-groups");
  container.replaceChildren();
  if(!family.childGroups.length){
    var empty=document.createElement("div");
    empty.className="family-empty";
    empty.textContent="No children are linked in the current Atlas records. Documented spouses without recorded children require a separate relationship record and are not inferred here.";
    container.appendChild(empty);return;
  }
  family.childGroups.forEach(function(group,index){
    var section=document.createElement("section");
    section.className="family-partner-group";
    var heading=document.createElement("div");
    heading.className="family-partner-heading";
    var text=document.createElement("strong");
    var parentNames=group.otherParents.map(function(p){return p.name;});
    text.textContent=parentNames.length===1?
      "With "+parentNames[0]:parentNames.length>1?
      "With other mapped parents: "+parentNames.join(", "):
      "Other parent not yet mapped";
    heading.appendChild(text);
    var note=document.createElement("small");
    note.textContent=parentNames.length>1?
      "Multiple other parents recorded for these children; review the underlying evidence":
      parentNames.length===1?
      "Shared parentage recorded · marital status not inferred":
      "Children linked to this person; the other parent is not recorded";
    heading.appendChild(note);
    section.appendChild(heading);
    var list=document.createElement("div");
    list.className="family-people family-group-children";
    group.children.forEach(function(child){list.appendChild(familyTile(child));});
    section.appendChild(list);
    if(window.AtlasFamilyPortraitUI)window.AtlasFamilyPortraitUI.enhanceScrollTrack(list);
    var counter=document.createElement("p");
    counter.className="family-group-count";
    counter.textContent=group.children.length+" recorded child"+(group.children.length===1?"":"ren")+" in this group";
    section.appendChild(counter);
    container.appendChild(section);
  });
}
function showFamilyTab(tab){
  var own=tab==="own";
  document.getElementById("family-own-view").hidden=!own;
  document.getElementById("family-origin-view").hidden=own;
  document.getElementById("family-tab-own").setAttribute("aria-selected",own?"true":"false");
  document.getElementById("family-tab-origin").setAttribute("aria-selected",own?"false":"true");
  document.getElementById("family-intro").textContent=own?
    "Children are shown in separate groups by their other recorded parent. A common child alone does not establish a marriage.":
    "Their parents, followed by the selected person highlighted among their recorded siblings.";
  document.getElementById("family-scroll").scrollTop=0;
}
document.getElementById("family-tab-own").addEventListener("click",function(){showFamilyTab("own");});
document.getElementById("family-tab-origin").addEventListener("click",function(){showFamilyTab("origin");});
function openFamily(personId){
  var family=familyIndex.family(personId);
  if(!family)return;
  familyLastTrigger=document.activeElement;
  familyPersonId=personId;
  document.getElementById("family-title").textContent=family.person.name;
  familyGroup("family-parents",family.parents,"No parents linked in the current Atlas records.");
  familySiblingGroup(family);
  renderChildGroups(family);
  var center=document.getElementById("family-center");
  center.replaceChildren();center.appendChild(familyTile(family.person));
  var footnote=document.getElementById("family-footnote");
  var outside=byId.has(personId)?"":" This person is outside the connected direct-ancestor map, but remains available in the wider Atlas.";
  var caution=family.needsReview?" Some collateral relationship edges in this branch need a separate source audit and are not asserted as parentage here.":"";
  footnote.textContent="These groupings reflect mapped parent-child links, not a list of documented marriages. Historical plural marriages may involve additional spouses, concurrent relationships or children not yet recorded in the Atlas. The full relationship history requires independently sourced spouse/union records. A shared parent alone does not establish whether siblings are full or half-siblings."+outside+caution;
  footnote.className=family.needsReview?"family-warning":"";
  showFamilyTab(family.childGroups.length?"own":"origin");
  familyPanel.hidden=false;
  document.getElementById("family-close").focus();
}
function closeFamily(){
  familyPanel.hidden=true;familyPersonId=null;
  if(familyLastTrigger&&typeof familyLastTrigger.focus==="function")familyLastTrigger.focus();
  familyLastTrigger=null;
}
document.getElementById("family-close").addEventListener("click",closeFamily);
var biographyPane=document.getElementById("biography-pane"),bioFrame=document.getElementById("bio-frame");
function openBiography(personId){
  var target=typeof personId==="string"?personId:selected;
  biographyPane.hidden=false;
  document.getElementById("bio-title").textContent=data.nodes.find(function(n){return n.id===target;})?.name||"Person page";
  document.getElementById("loading-bio").hidden=false;
  // Load the existing comprehensive app only when the person requests its sources.
  bioFrame.onload=function(){
    try{
      var child=bioFrame.contentWindow;
      child.document.getElementById("landing")?.classList.add("hidden");
      if(typeof child.selectPersonSearchResult==="function")child.selectPersonSearchResult(target);
      else if(typeof child.openNode==="function")child.openNode(target,true,true);
    }catch(error){console.warn("Original Atlas person page navigation",error);}
    document.getElementById("loading-bio").hidden=true;
  };
  bioFrame.src="./atlas-v3.9.63.html?iphone-refresh=20261123-globe-route-focus-v2&from=two-dimensional-map";
}
familyPanel.addEventListener("click",function(e){
  var button=e.target.closest("[data-aa-family-person]");
  if(!button)return;
  closeFamily();openBiography(button.dataset.aaFamilyPerson);
});
document.getElementById("open-family").addEventListener("click",function(){openFamily(selected);});
document.getElementById("open-biography").addEventListener("click",openBiography);
document.getElementById("bio-back").addEventListener("click",function(){
  biographyPane.hidden=true;bioFrame.onload=null;bioFrame.src="about:blank";
  render();
});
window.addEventListener("keydown",function(e){
  if(e.key==="Escape"){if(!familyPanel.hidden)closeFamily();
    else if(!biographyPane.hidden){document.getElementById("bio-back").click();}
    else if(!searchPanel.hidden)closeSearch();}
});
window.addEventListener("resize",measureCanvas);
if(window.visualViewport)window.visualViewport.addEventListener("resize",measureCanvas);
measureCanvas();
store();
if(unlinkedFromFamily)openFamily(unlinkedFromFamily);
window.Atlas2DJourney={
  select:function(id){focus(id,true,true);},
  fit:fitAll,
  home:resetToYou,
  family:function(id){openFamily(id||selected);},
  getState:function(){return {selected:selected,contextPerson:familyPersonId||selected,scale:cam.s,cameraX:cam.x,cameraY:cam.y,nodes:nodes.length,links:links.length,allRecords:data.nodes.length};}
};
})();
