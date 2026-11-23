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
var release="20261123-portrait-crops-v3";
var icons={
 tree:'<svg viewBox="0 0 80 80" aria-hidden="true"><path class="aa-ink-stroke" d="M39 67V44m0 14-8 8m8-14 9 12M39 45 26 32m13 12 15-16m-27 5-7-13m7 13 3-16m24 11 7-13m-7 13-6-13"/><path class="aa-icon-earth" d="M16 68c15-4 33-3 49 0"/><circle class="aa-gold-fill" cx="20" cy="20" r="5"/><circle class="aa-gold-fill" cx="30" cy="17" r="5"/><circle class="aa-gold-fill" cx="47" cy="15" r="5"/><circle class="aa-gold-fill" cx="61" cy="15" r="5"/><circle class="aa-leaf" cx="26" cy="32" r="6"/><circle class="aa-leaf" cx="54" cy="28" r="6"/><circle class="aa-gold-fill" cx="39" cy="43" r="5"/><circle class="aa-root" cx="39" cy="67" r="3"/></svg>',
 people:'<svg viewBox="0 0 80 80" aria-hidden="true"><ellipse class="aa-medallion" cx="40" cy="40" rx="28" ry="32"/><path class="aa-person-silhouette" d="M26 66c2-10 8-13 17-16l3-7c-4-2-6-5-6-9l-4-2 3-5-1-7c1-9 6-14 14-14 8 0 14 6 14 15 0 6-3 11-7 15l-1 8c5 5 9 11 9 22z"/><path class="aa-fine-line" d="M46 41c4 3 8 3 12 2M24 67h42"/></svg>',
 globe:'<svg viewBox="0 0 80 80" aria-hidden="true"><circle class="aa-globe-sea" cx="39" cy="38" r="26"/><path class="aa-globe-graticule" d="M13 38h52M39 12c-10 11-12 40 0 52M39 12c11 13 12 40 0 52M19 24h40M19 52h40"/><path class="aa-globe-land" d="M20 22 30 16l7 4 1 7-6 2-1 8-7-2-3-6-6-1zM38 40l8-8 9 2 6 7-7 3-3 9-8 7-4-8z"/><path class="aa-fine-line" d="M39 65v8m-16 1h32"/><path class="aa-gold-stroke" d="M18 60a37 37 0 0 0 43-44"/></svg>',
 stories:'<svg viewBox="0 0 80 80" aria-hidden="true"><circle class="aa-reel" cx="36" cy="35" r="24"/><circle class="aa-reel-hole" cx="36" cy="35" r="4"/><circle class="aa-reel-hole" cx="36" cy="19" r="6"/><circle class="aa-reel-hole" cx="51" cy="30" r="6"/><circle class="aa-reel-hole" cx="45" cy="47" r="6"/><circle class="aa-reel-hole" cx="26" cy="48" r="6"/><circle class="aa-reel-hole" cx="20" cy="30" r="6"/><path class="aa-film-tail" d="M57 46c14 1 12 11 13 23H43v-9h18V54H53"/><path class="aa-fine-line" d="M46 65h21"/></svg>'
};
var page=document.createElement("section");
page.id="aaSimpleHome";page.setAttribute("aria-label","Ancestry Atlas: four ways to explore");
page.innerHTML='<div class="aa-simple-wrap"><div class="aa-museum-masthead">'+
 '<div class="aa-masthead-rule"><span>THE FAMILY HISTORY COLLECTION</span></div>'+
 '<h1>Ancestry <em>Atlas</em></h1>'+
 '<p class="aa-masthead-subtitle">A world of people, places and stories worth preserving.</p>'+
 '</div><nav class="aa-simple-doors" aria-label="Choose an Atlas destination">'+
 [
  ["tree","Tree"],["people","People"],["globe","Globe"],["stories","A/V Stories"]
 ].map(function(x,i){return '<button type="button" class="aa-simple-door aa-door-'+x[0]+'" data-aa-go="'+x[0]+'" aria-label="'+x[1]+'">'+
   '<span class="aa-simple-icon">'+icons[x[0]]+'</span><span class="aa-door-label">'+x[1]+'</span><span class="aa-door-index">0'+(i+1)+'</span></button>';}).join("")+
 '</nav><div class="aa-simple-explain" aria-label="What each destination does">'+
 '<p><strong>Tree</strong><span>Follow the generations in a connected portrait family tree.</span></p>'+
 '<p><strong>People</strong><span>Discover biographies, photographs, and original records.</span></p>'+
 '<p><strong>Globe</strong><span>Trace the places our ancestors lived, with evidence-aware pins.</span></p>'+
 '<p><strong>Stories</strong><span>Experience narrated family-history films and tours.</span></p>'+
 '</div><p class="aa-museum-footer">NAMES · PLACES · EVIDENCE · MEMORY</p></div>';
document.body.appendChild(page);
var header=document.createElement("div");
header.id="aaSimpleHeader";header.hidden=true;
header.innerHTML='<nav class="aa-museum-route" aria-label="Atlas navigation">'+
 '<button type="button" id="aaSimpleBackHome" class="aa-route-home" aria-label="Return to Atlas home"><span aria-hidden="true">⌂</span><span>Home</span></button>'+
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
function showHome(){
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
window.addEventListener("popstate",function(event){
  var state=event.state;
  if(!state||!state.aaFourDoor)return;
  restoringHistory=true;
  if(state.screen==="home")showHome();
  else if(state.screen==="people")showPeople();
  else if(state.screen==="globe")showGlobe();
  else if(state.screen==="profile"&&state.person)openProfile(state.person,state.origin);
  else if(state.screen==="stories")showStories();
  restoringHistory=false;
});
section("home");
if(!history.state||!history.state.aaFourDoor)history.replaceState({aaFourDoor:true,screen:"home",person:null,origin:null},"",location.href);
else if(history.state.screen!=="home"){
  var saved=history.state;
  restoringHistory=true;
  if(saved.screen==="people")showPeople();
  else if(saved.screen==="globe")showGlobe();
  else if(saved.screen==="profile"&&saved.person)openProfile(saved.person,saved.origin);
  restoringHistory=false;
}
window.AncestryAtlasSimpleHome={
  go:visit,home:showHome,current:function(){return current;},
  openPerson:openProfile
};
})();
