/* Four straightforward Atlas destinations.
 * Home is only Tree, People, Globe, Stories.
 * The comprehensive person pages and A/V player are preserved, not duplicated.
 * In biography iframe, leave the original archival reader alone. */
(function(){
"use strict";
if(window.self!==window.top)return;
var atlas=window.__ATLAS_DATA,geo=window.AtlasGeoGlobe,query=new URLSearchParams(location.search);
if(!atlas||!Array.isArray(atlas.nodes))return;
document.body.classList.add("aa-four-door-shell");
var release="20261124-identity-guard-v2";
var page=document.createElement("section");
page.id="aaSimpleHome";page.setAttribute("aria-label","Ancestry Atlas: four ways to explore");
var doorMedia={
 tree:'<div class="aa-cover aa-tree-preview"><div class="aa-photo aa-photo-first"><img loading="eager" src="./jay_marion_mesa_1941.png" alt="Preserved Webb family photograph"></div><div class="aa-tree-join"></div><div class="aa-photo aa-photo-second"><img loading="eager" src="./sheldon_inez_wedding_1965.jpeg" alt="Preserved Sheldon and Inez wedding photograph"></div><div class="aa-photo aa-photo-third"><img loading="eager" src="./james_sheldon_with_siblings_c1951.png" alt="Webb family siblings photograph"></div></div>',
 people:'<div class="aa-cover aa-people-preview"><img loading="eager" src="./marion_webb_1945.png" alt="Archival portrait of Marion Beulah Brenay Webb"><span class="aa-photo-frame"></span></div>',
 globe:'<div class="aa-cover aa-map-preview"><canvas id="aaHomeMiniGlobe" width="340" height="246" role="img" aria-label="Illustrated world showing recorded family places"></canvas><span class="aa-map-pin"></span></div>',
 stories:'<div class="aa-cover aa-stories-preview"><img loading="eager" src="./James_Sheldon_Webb_TV_Presentation_poster.jpg" alt="Cover image for the James Sheldon Webb family-history film"><span class="aa-reel-play" aria-hidden="true">▶</span></div>'
};
var doorLabels=[
 ["tree","Tree","Explore generations"],
 ["people","People","Lives & original records"],
 ["globe","Globe","Places & family paths"],
 ["stories","Stories","Watch & listen"]
];
page.innerHTML='<div class="aa-simple-wrap"><div class="aa-museum-masthead">'+
 '<div class="aa-masthead-rule"><span>THE FAMILY HISTORY COLLECTION</span></div>'+
 '<h1>Ancestry <em>Atlas</em></h1>'+
 '<p class="aa-masthead-subtitle">Discover the people, places and journeys behind your family story.</p>'+
 '</div><nav class="aa-simple-doors" aria-label="Choose one of four Atlas destinations">'+
 doorLabels.map(function(item){return '<button type="button" class="aa-simple-door aa-door-'+item[0]+'" data-aa-go="'+item[0]+'" aria-label="'+item[1]+' — '+item[2]+'">'+
   doorMedia[item[0]]+'<span class="aa-door-label">'+item[1]+'</span><span class="aa-door-description">'+item[2]+'</span></button>';}).join("")+
 '</nav><p class="aa-museum-footer">NAMES · PLACES · EVIDENCE · MEMORY</p></div>';
document.body.appendChild(page);
function renderMiniGlobe(){
  var canvas=page.querySelector("#aaHomeMiniGlobe"),land=window.ATLAS_WORLD_LAND||[];
  if(!canvas||!land.length)return;
  var ctx=canvas.getContext("2d");if(!ctx)return;
  var W=canvas.width,H=canvas.height,R=104,cx=W/2,cy=H/2,lon0=-35*Math.PI/180,lat0=37*Math.PI/180;
  ctx.clearRect(0,0,W,H);
  var sea=ctx.createRadialGradient(cx-26,cy-40,10,cx,cy,R);
  sea.addColorStop(0,"#377081");sea.addColorStop(1,"#0a3246");
  ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fillStyle=sea;ctx.fill();ctx.strokeStyle="#c8a66c";ctx.lineWidth=2;ctx.stroke();
  function proj(lon,lat){var a=lon*Math.PI/180-lon0,b=lat*Math.PI/180;var z=Math.sin(lat0)*Math.sin(b)+Math.cos(lat0)*Math.cos(b)*Math.cos(a);
    return [cx+R*Math.cos(b)*Math.sin(a),cy-R*(Math.cos(lat0)*Math.sin(b)-Math.sin(lat0)*Math.cos(b)*Math.cos(a)),z];}
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,R-1,0,Math.PI*2);ctx.clip();
  ctx.fillStyle="#b9af87";ctx.strokeStyle="#d3bb8c";ctx.lineWidth=.6;
  land.forEach(function(ring){ctx.beginPath();var on=false;
    ring.forEach(function(pos){var p=proj(pos[0],pos[1]);if(p[2]<0){on=false;return;}if(!on){ctx.moveTo(p[0],p[1]);on=true;}else ctx.lineTo(p[0],p[1]);});
    if(on){ctx.fill();ctx.stroke();}
  });
  var pins=(window.AtlasGeoPlaces?.catalog||[]).filter(function(p){return ["arnstein","saybrook_ct","haarbolle","colonia_pacheco","alpena","sweden"].includes(p.id);});
  pins.forEach(function(p){var at=proj(p.lon,p.lat);if(at[2]<0)return;ctx.beginPath();ctx.arc(at[0],at[1],3.4,0,Math.PI*2);ctx.fillStyle="#ef7770";ctx.fill();ctx.strokeStyle="#ffe0b6";ctx.lineWidth=.7;ctx.stroke();});
  ctx.restore();
}
renderMiniGlobe();

var header=document.createElement("div");
header.id="aaSimpleHeader";header.hidden=true;
header.innerHTML='<nav class="aa-museum-route" aria-label="Atlas navigation">'+
 '<button type="button" id="aaSimpleBackHome" class="aa-route-home" aria-label="Return to Atlas home"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7"/></svg><span>Home</span></button>'+
 '<button type="button" id="aaSimpleBack" aria-label="Back to previous screen" title="Back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5 7 12l7 7M7 12h12"/></svg></button>'+
 '<button type="button" id="aaSimpleForward" aria-label="Forward to next screen" title="Forward"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 5 7 7-7 7M17 12H5"/></svg></button>'+
 '</nav><strong id="aaSimpleSectionTitle"></strong>';
document.body.appendChild(header);
var people=document.createElement("section");
people.id="aaSimplePeople";people.hidden=true;people.setAttribute("aria-label","Search Atlas people");
people.innerHTML='<div class="aa-simple-main"><h2>Find a person</h2>'+
 '<p class="aa-simple-description">Search the people in the Atlas by name, spelling variant, year, or place. A close name match is a suggestion, not a proven identity.</p>'+
 '<input id="aaSimplePersonInput" type="search" placeholder="Enter a name or place…" autocomplete="off" aria-label="Search ancestors">'+
 '<p id="aaSimplePersonCount" class="aa-simple-count" aria-live="polite"></p>'+
 '<div id="aaSimplePersonResults" class="aa-simple-results"></div></div>';
document.body.appendChild(people);
var globePanel=document.createElement("section");globePanel.id="aaSimpleGlobe";globePanel.hidden=true;
globePanel.setAttribute("aria-label","Atlas geographic globe");
globePanel.innerHTML='<div class="aa-simple-globe-wrap"><p>Drag to rotate the globe. Select a red pin to see associated people and source-qualified events.</p></div>';
document.body.appendChild(globePanel);
var profile=document.createElement("section");profile.id="aaSimpleProfile";profile.hidden=true;
profile.setAttribute("aria-label","Person biography and historical sources");
profile.innerHTML='<div class="aa-simple-profile-head"><strong id="aaSimpleProfileName">Person page</strong></div>'+
 '<iframe id="aaSimpleProfileFrame" title="Full Atlas person biography and archival evidence" loading="lazy"></iframe>';
document.body.appendChild(profile);
var current="home",profileOrigin="people",profileId=null,globeInstance=null,storyRequested=false,restoringHistory=false;
var chooser=document.getElementById("lineChooser"),storyModal=document.getElementById("storyModal");
document.getElementById("landing")?.classList.add("hidden");
function section(next){
  var previous=current;
  current=next;
  page.hidden=next!=="home";people.hidden=next!=="people";
  globePanel.hidden=next!=="globe";profile.hidden=next!=="profile";
  header.hidden=next==="home";
  document.getElementById("aaSimpleSectionTitle").textContent=
   {people:"People",globe:"Globe",profile:"Person page",stories:"A/V Stories"}[next]||"";
  if(!restoringHistory&&next!==previous){
    history.pushState({aaFourDoor:true,screen:next,person:profileId,origin:profileOrigin},"",location.href);
  }
}
function closeStorySurface(){
  storyRequested=false;
  if(chooser?.classList.contains("open"))document.getElementById("lineChooserClose")?.click();
  if(storyModal?.classList.contains("open"))document.getElementById("storyClose")?.click();
}
function showHome(){
  if(current==="stories")closeStorySurface();
  if(current==="profile"){
    var frame=profile.querySelector("#aaSimpleProfileFrame");
    frame.onload=null;frame.src="about:blank";
  }
  storyRequested=false;
  section("home");
  document.getElementById("landing")?.classList.add("hidden");
}
function showPeople(){
  section("people");
  drawSearch();
  var input=people.querySelector("#aaSimplePersonInput");
  requestAnimationFrame(function(){input.focus({preventScroll:true});});
}
function showGlobe(){
  section("globe");
  if(!globeInstance&&geo){
    globeInstance=geo.create(globePanel.querySelector(".aa-simple-globe-wrap"),atlas,function(){return profileId||"you";});
  }
  if(globeInstance)requestAnimationFrame(function(){globeInstance.resize();});
}
function showStories(){
  storyRequested=true;section("stories");
  var start=document.getElementById("startStory");
  if(start){start.click();}
  else{storyRequested=false;showHome();}
}
function visit(where){
  if(where==="tree"){
    location.assign("./atlas-2d-journey-preview.html?v="+release);
  }else if(where==="people")showPeople();
  else if(where==="globe")showGlobe();
  else if(where==="stories")showStories();
}
page.addEventListener("click",function(e){
  var button=e.target.closest("[data-aa-go]");if(button)visit(button.dataset.aaGo);
});
header.querySelector("#aaSimpleBackHome").addEventListener("click",showHome);
header.querySelector("#aaSimpleBack").addEventListener("click",function(){if(history.length>1)history.back();else showHome();});
header.querySelector("#aaSimpleForward").addEventListener("click",function(){history.forward();});
var input=people.querySelector("#aaSimplePersonInput");
var count=people.querySelector("#aaSimplePersonCount");
var results=people.querySelector("#aaSimplePersonResults");
function confidence(person){
  if(person.confidence==="frontier")return "Research frontier · unproven";
  if(person.confidence==="provisional")return "Provisional";
  if(person.collateral)return "Collateral relative";
  if(person.confidence==="confirmed")return "Documented";
  return "Strongly supported";
}
function drawSearch(){
  results.replaceChildren();
  var term=input.value.trim();
  if(!term){count.textContent="Search all "+atlas.nodes.length+" Atlas people.";return;}
  var found=window.AtlasPersonSearch?
    window.AtlasPersonSearch.search(atlas.nodes,term,100):
    {matches:atlas.nodes.filter(function(n){return (n.name+" "+(n.place||"")).toLowerCase().includes(term.toLowerCase());})
       .slice(0,100).map(function(person){return {person:person,approximate:false};}),total:0};
  count.textContent=found.total+" result"+(found.total===1?"":"s")+(found.total>100?" · showing first 100":"");
  if(!found.matches.length){count.textContent+=" · Try a different spelling.";return;}
  found.matches.forEach(function(hit){
    var n=hit.person;
    var b=document.createElement("button");b.type="button";b.className="aa-simple-person";b.dataset.aaPerson=n.id;
    if(window.AtlasFamilyPortraitUI)window.AtlasFamilyPortraitUI.attachPortrait(b,n.id,{small:true});
    var strong=document.createElement("strong");strong.textContent=n.name;b.appendChild(strong);
    var small=document.createElement("small");
    small.textContent=[hit.approximate?"Possible spelling match — verify identity":null,
      confidence(n),n.years,n.place].filter(Boolean).join(" · ");
    b.appendChild(small);results.appendChild(b);
  });
}
input.addEventListener("input",drawSearch);
people.addEventListener("click",function(e){
 var b=e.target.closest("[data-aa-person]");if(b)openProfile(b.dataset.aaPerson,"people");
});
globePanel.addEventListener("click",function(e){
 var b=e.target.closest("[data-aa-person]");if(b)openProfile(b.dataset.aaPerson,"globe");
});
function openProfile(id,origin){
  var n=atlas.nodes.find(function(p){return p.id===id;});
  if(!n)return;
  profileId=id;profileOrigin=origin==="globe"?"globe":"people";
  profile.querySelector("#aaSimpleProfileName").textContent=n.name;
  section("profile");
  var iframe=profile.querySelector("#aaSimpleProfileFrame");
  iframe.onload=function(){
    try{
      var win=iframe.contentWindow,doc=win.document;
      doc.getElementById("landing")?.classList.add("hidden");
      var sty=doc.createElement("style");sty.textContent=[
        "html,body{height:100%!important;overflow:hidden!important;background:#071724!important}",
        "#landing,.family-toolbar,#mobileTreeDock,#controls,#hud,#timeline,#mobilePersonSearch,#ppReturnToExplorer{display:none!important}",
        "#app{display:block!important;height:100%!important}",
        "#stage{position:fixed!important;inset:0!important;width:100%!important;height:100%!important;overflow:hidden!important}",
        "#stage>canvas{visibility:hidden!important}",
        "#card{position:fixed!important;inset:0!important;width:100%!important;max-height:none!important;border:0!important;border-radius:0!important;overflow:auto!important;padding:17px 16px 40px!important;margin:0!important;display:block!important;background:#0b2030!important;box-shadow:none!important;z-index:100!important}",
        "#card #close,#card .button-row,#card #navhint{display:none!important}",
        "#card h3{font-size:20px!important}"
      ].join(" ");
      doc.head.appendChild(sty);
      if(typeof win.selectPersonSearchResult==="function")win.selectPersonSearchResult(id);
      else if(typeof win.openNode==="function")win.openNode(id,true,true);
    }catch(error){console.warn("Atlas existing biography reader unavailable",error);}
  };
  iframe.src="./atlas-v3.9.63.html?from=four-door-person&person="+encodeURIComponent(id)+"&v="+release;
}
// Existing A/V tour chooser and playback remain the sole Stories presentation.
function updateStoryStatus(){
  if(!storyRequested)return;
  var active=chooser?.classList.contains("open")||storyModal?.classList.contains("open")||
    ["tour-active","tour-orienting","tour-story-open","tour-chooser-open"].some(function(k){return document.body.classList.contains(k);});
  if(!active)showHome();
}
[chooser,storyModal,document.body].filter(Boolean).forEach(function(el){
  new MutationObserver(updateStoryStatus).observe(el,{attributes:true,attributeFilter:["class"]});
});
document.addEventListener("keydown",function(e){
  if(e.key==="Escape"&&current==="profile")history.back();
  else if(e.key==="Escape"&&(current==="people"||current==="globe"))showHome();
});
window.addEventListener("message",function(event){
  if(event.origin!==location.origin||event.source!==profile.querySelector("#aaSimpleProfileFrame").contentWindow)return;
  var info=event.data;
  if(!info||info.type!=="atlas-person-page"||!info.id)return;
  var person=atlas.nodes.find(function(p){return p.id===info.id;});
  if(!person)return;
  profileId=person.id;
  profile.querySelector("#aaSimpleProfileName").textContent=person.name;
  if(history.state?.aaFourDoor&&history.state.screen==="profile")
    history.replaceState(Object.assign({},history.state,{person:person.id}),"",location.href);
});
window.addEventListener("popstate",function(event){
  var state=event.state;
  if(!state||!state.aaFourDoor)return;
  restoringHistory=true;
  if(current==="stories"&&state.screen!=="stories")closeStorySurface();
  if(state.screen==="home")showHome();
  else if(state.screen==="people")showPeople();
  else if(state.screen==="globe")showGlobe();
  else if(state.screen==="profile"&&state.person)openProfile(state.person,state.origin);
  else if(state.screen==="stories")showStories();
  restoringHistory=false;
});
section("home");
if(!history.state||!history.state.aaFourDoor){
  var initialScreen=query.get("view")==="globe"?"globe":"home";
  var requestedPerson=query.get("person");
  if(initialScreen==="globe"&&atlas.nodes.some(function(p){return p.id===requestedPerson;}))
    profileId=requestedPerson;
  history.replaceState({aaFourDoor:true,screen:initialScreen,person:profileId,origin:null},"",location.href);
}
if(history.state.screen!=="home"){
  var saved=history.state;
  restoringHistory=true;
  if(saved.screen==="people")showPeople();
  else if(saved.screen==="globe"){
    profileId=saved.person;
    showGlobe();
    if(profileId)globeInstance?.selectPerson(profileId);
  }
  else if(saved.screen==="profile"&&saved.person)openProfile(saved.person,saved.origin);
  restoringHistory=false;
}
window.AncestryAtlasSimpleHome={
  go:visit,home:showHome,current:function(){return current;},
  openPerson:openProfile
};
})();
