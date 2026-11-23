/* Self-contained orthographic geographic globe for Atlas Places.
   It renders public-domain Natural Earth land vectors and read-only Atlas pins.
   No external map API, telemetry, geocoding, or family-data mutation. */
(function(root){
"use strict";
var RAD=Math.PI/180;
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function lerp(a,b,t){return a+(b-a)*t;}
function shortLon(v){return (v+540)%360-180;}
function create(parent,atlasData,getPerson){
  if(!parent||!root.AtlasGeoPlaces)return null;
  var api=root.AtlasGeoPlaces,people=atlasData?.nodes||[];
  var section=document.createElement("section");
  section.id="aaGeoGlobe";section.setAttribute("aria-label","Geographic globe of recorded Atlas places");
  section.innerHTML=
   '<div class="aa-geo-toolbar"><div class="aa-geo-heading"><strong>Geographic globe</strong><span>Drag to rotate · tap a red pin</span></div>'+
   '<div class="aa-geo-buttons"><button type="button" data-geo-target="americas">Americas</button>'+
   '<button type="button" data-geo-target="europe">Europe</button>'+
   '<button type="button" data-geo-target="reset">Reset</button></div></div>'+
   '<div class="aa-geo-canvas-wrap"><canvas id="aaGeoCanvas" role="img" aria-label="Interactive rotating Earth. Choose a locator below for accessible place details." tabindex="0"></canvas>'+
   '<div class="aa-geo-zoom"><button type="button" data-geo-zoom="in" aria-label="Zoom globe in">+</button>'+
   '<button type="button" data-geo-zoom="out" aria-label="Zoom globe out">−</button></div></div>'+
   '<div class="aa-geo-filters"><label><input type="checkbox" id="aaGeoCurrent"> Focus on selected ancestor</label>'+
   '<label><input type="checkbox" id="aaGeoCollateral"> Include collateral</label>'+
   '<label><input type="checkbox" id="aaGeoFrontier"> Include provisional/frontier</label></div>'+
   '<div class="aa-geo-count" id="aaGeoCount"></div>'+
   '<div id="aaGeoDetail" class="aa-geo-detail" aria-live="polite"></div>'+
   '<details class="aa-geo-legend"><summary>Map key and evidence limitations</summary>'+
   '<div><b>Red pin</b> = Atlas place mention or separately labeled event. Hollow rings = approximate regional center. '+
   '<b>Event type</b> appears only when supported by the named record or biography. '+
   '<b>Dashed blue route</b> = order of text mentions (A → B), never proof of travel. '+
   'Possible or frontier ancestor identities remain provisional, not documented ancestry. '+
   'The globe does not place an ancestor at an exact house, farm, or cemetery plot.</div></details>';
  var head=parent.querySelector(".aa-places-head");
  if(head)head.insertAdjacentElement("afterend",section);else parent.prepend(section);
  var canvas=section.querySelector("#aaGeoCanvas"),ctx=canvas.getContext("2d");
  if(!ctx){section.querySelector(".aa-geo-canvas-wrap").textContent="Your browser does not support this globe.";return null;}
  var detail=section.querySelector("#aaGeoDetail"),status=section.querySelector("#aaGeoCount");
  var state={lon:-94,lat:39,zoom:1,focus:false,collateral:false,frontier:false,
    selected:null,drag:null};
  var px=0,py=0,radius=0,cx=0,cy=0,visibleMarkers=[],model={pins:[],routes:[]};
  var viewportWidth=0,viewportHeight=0,dpr=1;
  function selectedPerson(){try{return getPerson?.()||"you";}catch(_){return "you";}}
  function rebuild(){
    model=api.build(people,{
      personId:state.focus?selectedPerson():null,includeFrontier:state.frontier,
      includeCollateral:state.collateral
    });
    if(!model.pins.some(function(p){return p.id===state.selected}))state.selected=null;
    var eventCount=model.pins.reduce(function(n,p){return n+p.events.length;},0);
    status.textContent=model.pins.length+" mapped places · "+eventCount+
      " explicitly categorized record/biography events or context notes";
    updateDetail();
    render();
  }
  function project(lon,lat){
    var ll=(lon-state.lon)*RAD,p=lat*RAD,p0=state.lat*RAD;
    var cp=Math.cos(p),sp=Math.sin(p),c0=Math.cos(p0),s0=Math.sin(p0);
    var z=s0*sp+c0*cp*Math.cos(ll);
    return {x:cx+radius*cp*Math.sin(ll),
      y:cy-radius*(c0*sp-s0*cp*Math.cos(ll)),z:z};
  }
  function drawGeoArc(coords,close,fill){
    if(!coords||coords.length<2)return;
    var begun=false,previous=null,first=null;
    ctx.beginPath();
    for(var i=0;i<=coords.length;i++){
      var value=coords[i%coords.length];
      if(i===coords.length&&!close)break;
      var p=project(value[0],value[1]);
      if(first===null)first=p;
      if(!previous){if(p.z>=0){ctx.moveTo(p.x,p.y);begun=true;}previous=p;continue;}
      var frontA=previous.z>=0,frontB=p.z>=0;
      if(frontA&&frontB){if(!begun){ctx.moveTo(previous.x,previous.y);begun=true;}ctx.lineTo(p.x,p.y);}
      else if(frontA!==frontB){
        // Linear longitude/latitude bisection; land 110m vectors are short enough.
        var a=coords[(i-1)%coords.length],b=value,delta=shortLon(b[0]-a[0]);
        var lo=0,hi=1;
        for(var j=0;j<14;j++){
          var mid=(lo+hi)/2;
          var trial=project(a[0]+delta*mid,a[1]+(b[1]-a[1])*mid);
          if((trial.z>=0)===frontA)lo=mid;else hi=mid;
        }
        var t=(lo+hi)/2,cross=project(a[0]+delta*t,a[1]+(b[1]-a[1])*t);
        if(frontA){ctx.lineTo(cross.x,cross.y);begun=false;}
        else {ctx.moveTo(cross.x,cross.y);ctx.lineTo(p.x,p.y);begun=true;}
      }else begun=false;
      previous=p;
    }
    if(fill){ctx.fillStyle="#314e55";ctx.fill();}
    ctx.strokeStyle="#6a8794";ctx.lineWidth=.72;ctx.stroke();
  }
  function drawGraticule(){
    ctx.strokeStyle="rgba(130,168,189,.19)";ctx.lineWidth=.7;
    function line(points){
      ctx.beginPath();var on=false;
      for(var i=0;i<points.length;i++){
        var v=project(points[i][0],points[i][1]);
        if(v.z<0){on=false;continue;}
        if(on)ctx.lineTo(v.x,v.y);else{ctx.moveTo(v.x,v.y);on=true;}
      }ctx.stroke();
    }
    for(var lon=-180;lon<180;lon+=30){
      var meridian=[];for(var lat=-88;lat<=88;lat+=2)meridian.push([lon,lat]);line(meridian);
    }
    for(var lat=-60;lat<=80;lat+=20){
      var parallel=[];for(var lon=-180;lon<=180;lon+=2)parallel.push([lon,lat]);line(parallel);
    }
  }
  function drawRoute(from,to){
    var p=api.catalog.find(function(x){return x.id===from});
    var q=api.catalog.find(function(x){return x.id===to});
    if(!p||!q)return;
    var a=project(p.lon,p.lat),b=project(q.lon,q.lat);
    if(a.z<0||b.z<0)return;
    // Screen-space curved dashed connection, showing *summary order* only.
    var mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y;
    ctx.beginPath();ctx.moveTo(a.x,a.y);
    ctx.quadraticCurveTo(mx-dy*.11,my+dx*.11,b.x,b.y);
    ctx.setLineDash([3,5]);ctx.strokeStyle="#789fc3";ctx.lineWidth=1.25;ctx.stroke();ctx.setLineDash([]);
  }
  function render(){
    var rect=canvas.getBoundingClientRect(),w=Math.round(rect.width),h=Math.round(rect.height);
    if(w<100||h<100)return;
    dpr=Math.min(root.devicePixelRatio||1,2);
    if(w!==viewportWidth||h!==viewportHeight||canvas.width!==Math.round(w*dpr)){
      viewportWidth=w;viewportHeight=h;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
    }
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,w,h);
    cx=w/2;cy=h/2;radius=Math.min(w*.47,h*.46)*state.zoom;
    ctx.save();
    ctx.shadowColor="rgba(10,54,88,.6)";ctx.shadowBlur=28;
    ctx.beginPath();ctx.arc(cx,cy,radius,0,2*Math.PI);
    var sea=ctx.createRadialGradient(cx-radius*.35,cy-radius*.4,radius*.05,cx,cy,radius);
    sea.addColorStop(0,"#20435b");sea.addColorStop(.65,"#0d3045");sea.addColorStop(1,"#061622");
    ctx.fillStyle=sea;ctx.fill();ctx.restore();
    ctx.save();ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.clip();
    drawGraticule();
    (root.ATLAS_WORLD_LAND||[]).forEach(function(ring){drawGeoArc(ring,true,true);});
    if(state.focus)model.routes.forEach(function(route){drawRoute(route.from,route.to);});
    ctx.restore();
    visibleMarkers=[];
    model.pins.forEach(function(pin){
      var at=project(pin.lon,pin.lat);
      if(at.z<=0)return;
      visibleMarkers.push({pin:pin,x:at.x,y:at.y});
    });
    // Draw regional pins beneath precise town/community pins.
    visibleMarkers.sort(function(a,b){return (a.pin.type==="region"?0:1)-(b.pin.type==="region"?0:1);});
    visibleMarkers.forEach(function(hit){
      var p=hit.pin,active=p.id===state.selected;
      ctx.beginPath();ctx.arc(hit.x,hit.y,active?7.5:p.type==="region"?5.6:4.6,0,2*Math.PI);
      ctx.fillStyle=active?"#f7d3d3":"#e7656d";
      if(p.type==="region"){ctx.lineWidth=1.5;ctx.strokeStyle="#f49da1";ctx.stroke();}
      else ctx.fill();
      ctx.beginPath();ctx.arc(hit.x,hit.y,1.55,0,2*Math.PI);
      ctx.fillStyle="#3d1018";ctx.fill();
      if(active){
        ctx.beginPath();ctx.arc(hit.x,hit.y,10,0,2*Math.PI);
        ctx.strokeStyle="#ffe7dc";ctx.lineWidth=1.2;ctx.stroke();
      }
    });
  }
  function updateDetail(){
    detail.replaceChildren();
    var pin=model.pins.find(function(x){return x.id===state.selected;});
    if(!pin){
      var all=document.createElement("p");
      all.textContent="Choose a pin to see the Atlas people and explicitly sourced events for that place.";
      detail.appendChild(all);
      var selectors=document.createElement("div");selectors.className="aa-geo-index";
      model.pins.slice().sort(function(a,b){return a.name.localeCompare(b.name);}).forEach(function(p){
        var b=document.createElement("button");b.type="button";b.dataset.geoPlace=p.id;
        b.textContent=p.name+" ("+p.people.length+")";selectors.appendChild(b);
      });detail.appendChild(selectors);return;
    }
    var title=document.createElement("strong");title.textContent=pin.name;detail.appendChild(title);
    var note=document.createElement("p");note.textContent=(pin.type==="region"?
      "Approximate region center, not a historical address. ":"Community-scale location, not a specific building. ")+
      pin.people.length+" mapped people; "+pin.events.length+" separately classified event/context entries.";
    detail.appendChild(note);
    var events=document.createElement("div");events.className="aa-geo-event-list";
    pin.events.forEach(function(e){
      var box=document.createElement("p");
      box.textContent=(e.kind==="parent-origin"?"Parent's origin in record":e.kind.toUpperCase())+
       " · "+e.personName+" · "+e.date+" · "+e.basis+
       (e.grade==="provisional"?" (probable)":e.grade==="biography"?" (biography statement)":" (original record)");
      events.appendChild(box);
    });
    detail.appendChild(events);
    pin.people.slice().sort(function(a,b){return a.name.localeCompare(b.name);}).forEach(function(p){
      var b=document.createElement("button");b.type="button";b.dataset.aaPerson=p.id;
      b.textContent=p.name+" · "+(p.confidence==="frontier"?"Research frontier":p.confidence==="provisional"?"Provisional":p.confidence==="strong"?"Strongly supported":"Documented");
      detail.appendChild(b);
    });
    var back=document.createElement("button");back.type="button";back.dataset.geoPlace="";back.textContent="All mapped places";back.className="aa-geo-all";
    detail.appendChild(back);
  }
  function setPlace(id){
    state.selected=id||null;
    var pin=model.pins.find(function(p){return p.id===state.selected;});
    if(pin){state.lat=clamp(pin.lat, -70,70);state.lon=shortLon(pin.lon);}
    updateDetail();render();
  }
  section.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;
    if(b.hasAttribute("data-geo-place")){setPlace(b.dataset.geoPlace);return;}
    if(b.dataset.geoTarget){
      var t=b.dataset.geoTarget;
      if(t==="europe"){state.lon=12;state.lat=48;}
      else if(t==="americas"){state.lon=-100;state.lat=38;}
      else{state.lon=-94;state.lat=39;state.zoom=1;}
      render();return;
    }
    if(b.dataset.geoZoom){state.zoom=clamp(state.zoom*(b.dataset.geoZoom==="in"?1.2:1/1.2),.72,1.8);render();}
  });
  [["aaGeoCurrent","focus"],["aaGeoCollateral","collateral"],["aaGeoFrontier","frontier"]].forEach(function(pair){
    section.querySelector("#"+pair[0]).addEventListener("change",function(e){state[pair[1]]=e.target.checked;rebuild();});
  });
  canvas.addEventListener("pointerdown",function(e){
    if(e.button!==undefined&&e.button!==0)return;
    state.drag={x:e.clientX,y:e.clientY,originX:e.clientX,originY:e.clientY,moved:false};
    try{canvas.setPointerCapture(e.pointerId);}catch(_){}
  });
  canvas.addEventListener("pointermove",function(e){
    if(!state.drag)return;
    var dx=e.clientX-state.drag.x,dy=e.clientY-state.drag.y;
    if(Math.abs(e.clientX-state.drag.originX)+Math.abs(e.clientY-state.drag.originY)>5)state.drag.moved=true;
    if(state.drag.moved){
      state.lon=shortLon(state.lon-dx*.45);
      state.lat=clamp(state.lat+dy*.35,-75,75);
      render();
    }
    state.drag.x=e.clientX;state.drag.y=e.clientY;
  });
  canvas.addEventListener("pointerup",function(e){
    if(!state.drag)return;
    var moved=state.drag.moved;state.drag=null;
    if(moved)return;
    var rect=canvas.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top;
    var chosen=null,nearest=Infinity;
    visibleMarkers.forEach(function(m){var dist=Math.hypot(m.x-x,m.y-y);
      if(dist<15&&dist<nearest){nearest=dist;chosen=m.pin.id;}
    });
    if(chosen)setPlace(chosen);
  });
  canvas.addEventListener("pointercancel",function(){state.drag=null;});
  canvas.addEventListener("wheel",function(e){e.preventDefault();state.zoom=clamp(state.zoom*(e.deltaY>0?.92:1.08),.72,1.8);render();},{passive:false});
  canvas.addEventListener("keydown",function(e){
    if(e.key==="ArrowLeft"){state.lon=shortLon(state.lon-15);}
    else if(e.key==="ArrowRight"){state.lon=shortLon(state.lon+15);}
    else if(e.key==="ArrowUp"){state.lat=clamp(state.lat+10,-75,75);}
    else if(e.key==="ArrowDown"){state.lat=clamp(state.lat-10,-75,75);}
    else return;
    e.preventDefault();render();
  });
  root.addEventListener("resize",render);
  rebuild();
  return {resize:render,refresh:rebuild,selectPlace:setPlace,
    getState:function(){return {pins:model.pins.length,lat:state.lat,lon:state.lon,selected:state.selected,events:model.pins.reduce(function(s,p){return s+p.events.length;},0)};}};
}
root.AtlasGeoGlobe=Object.freeze({create:create});
})(typeof window!=="undefined"?window:globalThis);
