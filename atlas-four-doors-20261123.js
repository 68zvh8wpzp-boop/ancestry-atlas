/* Four straightforward Atlas destinations.
 * Home is only Tree, People, Globe, Stories.
 * The comprehensive person pages and A/V player are preserved, not duplicated.
 * In biography iframe, leave the original archival reader alone. */
(function(){
"use strict";
if(window.self!==window.top)return;
var atlas=window.__ATLAS_DATA,geo=window.AtlasGeoGlobe,query=new URLSearchParams(location.search);
if(!atlas||!Array.isArray(atlas.nodes))return;
var release="20261123-four-doors-v1";
var icons={
 tree:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 42V32M24 32L12 22M24 32L36 22M12 22V11M36 22V11M12 11L6 5M12 11L18 5M36 11L30 5M36 11L42 5"/><circle cx="24" cy="43" r="1.5"/></svg>',
 people:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="16" r="8"/><path d="M8 43v-5c0-9 7-14 16-14s16 5 16 14v5"/></svg>',
 globe:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="19"/><ellipse cx="24" cy="24" rx="9" ry="19"/><path d="M5 24h38M8 14h32M8 34h32"/></svg>',
 stories:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="20" cy="23" r="16"/><circle cx="20" cy="23" r="3"/><circle cx="20" cy="12" r="3"/><circle cx="30" cy="20" r="3"/><circle cx="20" cy="34" r="3"/><circle cx="10" cy="23" r="3"/><path d="M31 34h11v9H31"/></svg>'
};
var page=document.createElement("section");
page.id="aaSimpleHome";page.setAttribute("aria-label","Ancestry Atlas: four ways to explore");
page.innerHTML='<div class="aa-simple-wrap"><div class="aa-simple-kicker">Ancestry Atlas</div>'+
 '<h1>Explore your family</h1><p class="aa-simple-intro">Choose one way to explore.</p>'+
 '<nav class="aa-simple-doors" aria-label="Choose an Atlas destination">'+
 [
  ["tree","Tree"],["people","People"],["globe","Globe"],["stories","Stories"]
 ].map(function(x){return '<button type="button" class="aa-simple-door" data-aa-go="'+x[0]+'" aria-label="'+x[1]+'">'+
   '<span class="aa-simple-icon">'+icons[x[0]]+'</span><span>'+x[1]+'</span></button>';}).join("")+
 '</nav><div class="aa-simple-explain" aria-label="What each destination does">'+
 '<p><strong>Tree</strong><span>See your ancestors in a connected 2D family tree, with names and portraits where available.</span></p>'+
 '<p><strong>People</strong><span>Find a person by name and open their biography, photos, and original documents.</span></p>'+
 '<p><strong>Globe</strong><span>Explore family locations on an interactive world map, with evidence clearly labeled.</span></p>'+
 '<p><strong>Stories</strong><span>Watch or listen to guided family-history tours.</span></p>'+
 '</div></div>';
document.body.appendChild(page);
var header=document.createElement("div");
header.id="aaSimpleHeader";header.hidden=true;
header.innerHTML='<button type="button" id="aaSimpleBackHome" aria-label="Return to Atlas home">← Home</button>'+
 '<strong id="aaSimpleSectionTitle"></strong>';
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
profile.innerHTML='<div class="aa-simple-profile-head"><strong id="aaSimpleProfileName">Person page</strong>'+
 '<button type="button" id="aaSimpleProfileBack">← Back</button></div>'+
 '<iframe id="aaSimpleProfileFrame" title="Full Atlas person biography and archival evidence" loading="lazy"></iframe>';
document.body.appendChild(profile);
var current="home",profileOrigin="people",profileId=null,globeInstance=null,storyRequested=false;
var chooser=document.getElementById("lineChooser"),storyModal=document.getElementById("storyModal");
document.getElementById("landing")?.classList.add("hidden");
function section(next){
  current=next;
  page.hidden=next!=="home";people.hidden=next!=="people";
  globePanel.hidden=next!=="globe";profile.hidden=next!=="profile";
  header.hidden=next==="home"||next==="stories";
  document.getElementById("aaSimpleSectionTitle").textContent=
   {people:"People",globe:"Globe",profile:"Person page"}[next]||"";
}
function showHome(){
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
profile.querySelector("#aaSimpleProfileBack").addEventListener("click",function(){
  var iframe=profile.querySelector("#aaSimpleProfileFrame");
  iframe.onload=null;iframe.src="about:blank";
  if(profileOrigin==="globe")showGlobe();else showPeople();
});
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
  if(e.key==="Escape"&&current==="profile")profile.querySelector("#aaSimpleProfileBack").click();
  else if(e.key==="Escape"&&(current==="people"||current==="globe"))showHome();
});
section("home");
window.AncestryAtlasSimpleHome={
  go:visit,home:showHome,current:function(){return current;},
  openPerson:openProfile
};
})();
