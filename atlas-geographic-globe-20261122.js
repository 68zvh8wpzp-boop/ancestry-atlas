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
   '<div class="aa-geo-toolbar"><div class="aa-geo-heading"><strong>Family geography</strong><span>Explore documented family places</span></div></div>'+
   '<div class="aa-geo-selectors">'+
   '<label>Family branch<select id="aaGeoBranch" aria-label="Filter globe by family branch"><option value="">All family branches</option></select></label>'+
   '<label>From<select id="aaGeoFrom" aria-label="Select route origin"><option value="">All origins</option></select></label>'+
   '<label>To<select id="aaGeoTo" aria-label="Select route destination"><option value="">All destinations</option></select></label>'+
   '</div>'+
   '<div class="aa-geo-tools">'+
   '<label><input type="checkbox" id="aaGeoPaths" checked> From → to paths</label>'+
   '<label><input type="checkbox" id="aaGeoCurrent"> Selected person</label>'+
   '<label><input type="checkbox" id="aaGeoCollateral"> Collateral</label>'+
   '<label><input type="checkbox" id="aaGeoFrontier"> Provisional</label>'+
   '<span class="aa-geo-count" id="aaGeoCount"></span></div>'+
   '<div class="aa-geo-canvas-wrap"><canvas id="aaGeoCanvas" role="img" aria-label="Rotatable world globe with place pins and dotted source-qualified from to connections." tabindex="0"></canvas>'+
   '<div class="aa-geo-zoom"><button type="button" data-geo-zoom="in" aria-label="Zoom globe in">+</button>'+
   '<button type="button" data-geo-zoom="out" aria-label="Zoom globe out">−</button></div>'+
   '<div class="aa-geo-prompt">Drag to rotate · Select a red pin</div></div>'+
   '<div id="aaGeoDetail" class="aa-geo-detail" aria-live="polite" hidden></div>'+
   '<details class="aa-geo-legend"><summary>Map key & evidence</summary>'+
   '<div><b>Red pins</b> show place summaries or explicitly categorized life events. Hollow circles indicate approximate region centers. '+
   '<b>Dotted navy paths</b> connect the FROM and TO place names in an Atlas summary; their order is reported, not proof of migration or a precise journey. '+
   'Routes are projected on the visible globe and disappear at the horizon. '+
   'Research leads remain provisional; no location is an exact home or farm address.</div></details>';
  var head=parent.querySelector(".aa-places-head");
  if(head)head.insertAdjacentElement("afterend",section);else parent.prepend(section);
  var canvas=section.querySelector("#aaGeoCanvas"),ctx=canvas.getContext("2d");
  if(!ctx){section.querySelector(".aa-geo-canvas-wrap").textContent="Your browser does not support this globe.";return null;}
  var detail=section.querySelector("#aaGeoDetail"),status=section.querySelector("#aaGeoCount");
  var branchControl=section.querySelector("#aaGeoBranch"),fromControl=section.querySelector("#aaGeoFrom"),toControl=section.querySelector("#aaGeoTo");
  function branchGroup(label){
    var b=String(label||"");
    if(/Brenay|Gooley|Dennis|Skinner/i.test(b))return "Brenay · Gooley · Skinner";
    if(/Hill|Dunbar|Prather|Edwards|Weedon/i.test(b))return "Hill · Dunbar · Prather";
    if(/Denmark|Seje|Seye|Aurin/i.test(b))return "Denmark · Scandinavia";
    if(/Webb|Carling|Ray/i.test(b))return "Webb · Carling · Ray";
    return "Other family lines";
  }
  [...new Set(people.map(function(p){return branchGroup(p.branch);}))]
    .sort().forEach(function(label){var opt=document.createElement("option");opt.value=label;opt.textContent=label;branchControl.appendChild(opt);});
  var state={lon:-94,lat:39,zoom:1,focus:false,collateral:false,frontier:false,
    branch:"",from:"",to:"",paths:true,selected:null,drag:null};
  var px=0,py=0,radius=0,cx=0,cy=0,visibleMarkers=[],model={pins:[],routes:[]};
  var viewportWidth=0,viewportHeight=0,dpr=1;
  function selectedPerson(){try{return getPerson?.()||"you";}catch(_){return "you";}}
  function rebuild(){
    var filtered=state.branch?people.filter(function(p){return branchGroup(p.branch)===state.branch;}):people;
    model=api.build(filtered,{
      personId:state.focus?selectedPerson():null,includeFrontier:state.frontier,
      includeCollateral:state.collateral
    });
    updateRouteSelectors();
    if(!model.pins.some(function(p){return p.id===state.selected}))state.selected=null;
    var eventCount=model.pins.reduce(function(n,p){return n+p.events.length;},0);
    status.textContent=model.pins.length+" places · "+model.routes.length+" summary paths";
    updateDetail();
    render();
  }
  function updateRouteSelectors(){
    var oldFrom=state.from,oldTo=state.to;
    var fromIds=[...new Set(model.routes.map(function(r){return r.from;}))];
    var availableTo=model.routes.filter(function(r){return !oldFrom||r.from===oldFrom;});
    var toIds=[...new Set(availableTo.map(function(r){return r.to;}))];
    if(oldFrom&&!fromIds.includes(oldFrom))state.from="";
    if(oldTo&&!toIds.includes(oldTo))state.to="";
    function fillSelect(select,ids,allLabel,current){
      select.replaceChildren();
      var blank=document.createElement("option");blank.value="";blank.textContent=allLabel;select.appendChild(blank);
      ids.map(function(id){return api.catalog.find(function(a){return a.id===id;});}).filter(Boolean)
        .sort(function(a,b){return a.name.localeCompare(b.name);})
        .forEach(function(place){var opt=document.createElement("option");opt.value=place.id;opt.textContent=place.name;select.appendChild(opt);});
      select.value=current;
    }
    fillSelect(fromControl,fromIds,"All origins",state.from);
    fillSelect(toControl,[...new Set(model.routes.filter(function(r){return !state.from||r.from===state.from;}).map(function(r){return r.to;}))],
      "All destinations",state.to);
  }
  function selectedRoutes(){
    if(!state.paths)return [];
    return model.routes.filter(function(r){
      return (!state.from||r.from===state.from)&&(!state.to||r.to===state.to);
    });
  }
  function routeLabel(id){var place=api.catalog.find(function(p){return p.id===id;});return place?.name||id;}
  // Locate selected summary connections on the visible hemisphere. This rotates
  // the VIEW only; it does not assert that a person travelled between these points.
  function centerOnSummaryRoute(){
    var matching=model.routes.filter(function(route){
      return (!state.from||route.from===state.from)&&(!state.to||route.to===state.to);
    });
    var route=matching[0],from=route&&api.catalog.find(function(p){return p.id===route.from;});
    var to=route&&api.catalog.find(function(p){return p.id===route.to;});
    if(!from&&!to)return;
    // Spherical midpoint keeps trans-Atlantic legs visible together, rather
    // than placing the Earth between longitudes by naive arithmetic.
    function vector(place){
      var lat=place.lat*RAD,lon=place.lon*RAD;
      return [Math.cos(lat)*Math.cos(lon),Math.cos(lat)*Math.sin(lon),Math.sin(lat)];
    }
    var a=vector(from||to),z=vector(to||from),x=a[0]+z[0],y=a[1]+z[1],v=a[2]+z[2];
    var norm=Math.hypot(x,y,v);
    if(norm<.0001){state.lat=clamp(from.lat,-70,70);state.lon=shortLon(from.lon);return;}
    state.lon=shortLon(Math.atan2(y,x)/RAD);
    state.lat=clamp(Math.atan2(v,Math.hypot(x,y))/RAD,-70,70);
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
  function drawRoute(from,to,emphasis){
    var p=api.catalog.find(function(x){return x.id===from});
    var q=api.catalog.find(function(x){return x.id===to});
    if(!p||!q)return;
    var vec=function(place){var lat=place.lat*RAD,lon=place.lon*RAD;
      return [Math.cos(lat)*Math.cos(lon),Math.cos(lat)*Math.sin(lon),Math.sin(lat)];};
    var a=vec(p),b=vec(q),dot=clamp(a[0]*b[0]+a[1]*b[1]+a[2]*b[2],-1,1);
    var theta=Math.acos(dot),sin=Math.sin(theta);
    if(theta<.00001)return;
    var steps=Math.max(28,Math.ceil(theta/(2*RAD))),seen=false;
    ctx.beginPath();
    for(var i=0;i<=steps;i++){
      var t=i/steps,u=Math.sin((1-t)*theta)/sin,v=Math.sin(t*theta)/sin;
      var x=a[0]*u+b[0]*v,y=a[1]*u+b[1]*v,z=a[2]*u+b[2]*v;
      var lon=Math.atan2(y,x)/RAD,lat=Math.atan2(z,Math.hypot(x,y))/RAD;
      var at=project(lon,lat);
      if(at.z<=0){seen=false;continue;}
      if(seen)ctx.lineTo(at.x,at.y);else{ctx.moveTo(at.x,at.y);seen=true;}
    }
    ctx.setLineDash(emphasis?[5,5]:[3,6]);
    ctx.strokeStyle=emphasis?"rgba(238,199,132,.94)":"rgba(120,169,204,.43)";
    ctx.lineWidth=emphasis?2.2:1.15;ctx.stroke();ctx.setLineDash([]);
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
    selectedRoutes().forEach(function(route){
      var active=!!(state.from||state.to||state.selected===route.from||state.selected===route.to);
      drawRoute(route.from,route.to,active);
    });
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
    var routes=selectedRoutes();
    if(!pin&&!state.from&&!state.to){detail.hidden=true;return;}
    detail.hidden=false;
    var close=document.createElement("button");close.type="button";close.className="aa-geo-close";
    close.setAttribute("aria-label","Close place and journey details");close.textContent="×";
    close.dataset.geoPlace="";detail.appendChild(close);
    var title=document.createElement("strong");title.textContent=pin?pin.name:"From → to journeys";detail.appendChild(title);
    if(pin){
      var note=document.createElement("p");
      note.textContent=(pin.type==="region"?"Approximate region center; not a property address. ":"Community-scale location. ")+
        pin.people.length+" people · "+pin.events.length+" classified events";
      detail.appendChild(note);
      var events=document.createElement("div");events.className="aa-geo-event-list";
      pin.events.forEach(function(e){
        var box=document.createElement("p");
        box.textContent=(e.kind==="parent-origin"?"Parent origin":e.kind.toUpperCase())+
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
    }
    var nearby=routes.filter(function(route){
      return !pin||route.from===pin.id||route.to===pin.id;
    });
    if(nearby.length){
      var heading=document.createElement("h3");heading.textContent="From → to · summary order";detail.appendChild(heading);
      nearby.slice(0,18).forEach(function(route){
        var person=people.find(function(n){return n.id===route.personId;});
        var item=document.createElement("p");item.className="aa-geo-route-item";
        item.textContent=(person?.name||"Atlas person")+": "+routeLabel(route.from)+" → "+routeLabel(route.to);
        detail.appendChild(item);
      });
      var disclaimer=document.createElement("p");disclaimer.className="aa-geo-warning";
      disclaimer.textContent="Source summaries indicate place order, not independently verified migration.";
      detail.appendChild(disclaimer);
    }
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
    if(b.dataset.geoZoom){state.zoom=clamp(state.zoom*(b.dataset.geoZoom==="in"?1.2:1/1.2),.72,1.8);render();}
  });
  branchControl.addEventListener("change",function(){
    state.branch=branchControl.value;state.from="";state.to="";
    rebuild();
    if(state.branch){centerOnSummaryRoute();render();}
  });
  fromControl.addEventListener("change",function(){
    state.from=fromControl.value;state.to="";
    if(state.from){state.paths=true;section.querySelector("#aaGeoPaths").checked=true;}
    updateRouteSelectors();centerOnSummaryRoute();updateDetail();render();
  });
  toControl.addEventListener("change",function(){
    state.to=toControl.value;
    if(state.to){state.paths=true;section.querySelector("#aaGeoPaths").checked=true;}
    centerOnSummaryRoute();updateDetail();render();
  });
  section.querySelector("#aaGeoPaths").addEventListener("change",function(e){state.paths=e.target.checked;updateDetail();render();});
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
    selectPerson:function(id){
      var pin=model.pins.find(function(p){return p.people.some(function(person){return person.id===id;});});
      if(pin)setPlace(pin.id);
    },
    getState:function(){return {pins:model.pins.length,routes:model.routes.length,branch:state.branch,from:state.from,to:state.to,lat:state.lat,lon:state.lon,selected:state.selected,events:model.pins.reduce(function(s,p){return s+p.events.length;},0)};}};
}
root.AtlasGeoGlobe=Object.freeze({create:create});
})(typeof window!=="undefined"?window:globalThis);
