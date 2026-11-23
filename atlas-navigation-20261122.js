/* Ancestry Atlas · consolidated navigation · 2026-11-22
   Presentation only: never alters person, family, or evidence records.
   Keep the legacy 2D map and 3D family tree accessible under Family > Views. */
(function(){
"use strict";
// The 2D family-map biography iframe must show the original person page alone.
if(window.self!==window.top)return;
var twoD=/atlas-2d-journey-preview\.html$/i.test(location.pathname);
var main="./atlas-v3.9.63.html";
var query=new URLSearchParams(location.search);
var nav=document.createElement("nav");
nav.id="aaPrimaryNav";
nav.setAttribute("aria-label","Main Atlas destinations");
nav.innerHTML='<button type="button" data-aa-section="family"><span aria-hidden="true">♧</span>Family</button>'+
  '<button type="button" data-aa-section="places"><span aria-hidden="true">◎</span>Places</button>'+
  '<button type="button" data-aa-section="stories"><span aria-hidden="true">▤</span>Stories</button>';
document.body.appendChild(nav);
function currentPerson(){
  if(twoD){try{var state=JSON.parse(localStorage.getItem("ancestry-atlas-2d-camera-v1")||"{}");return state.selected||"you";}catch(_){}}
  return window.AncestryAtlasPedigreePreview?.getState?.().selected||"you";
}
function mainUrl(section){
  var url=main+"?section="+encodeURIComponent(section)+"&nav=20261122-v2";
  var id=currentPerson();if(id&&section==="family")url+="&person="+encodeURIComponent(id);
  return url;
}
function active(section){
  nav.querySelectorAll("[data-aa-section]").forEach(function(button){
    var on=button.dataset.aaSection===section;
    button.setAttribute("aria-current",on?"page":"false");
  });
}
if(twoD){
  nav.addEventListener("click",function(event){
    var button=event.target.closest("[data-aa-section]");if(!button)return;
    location.assign(mainUrl(button.dataset.aaSection));
  });
  active("family");
  return;
}
var explorer=document.getElementById("pedigreePrototype");
var more=document.createElement("div");
more.id="aaFamilyViews";
more.hidden=true;
more.setAttribute("role","menu");
more.setAttribute("aria-label","Other family views and collections");
more.innerHTML=
 '<button type="button" role="menuitem" data-aa-view="2d">2D family tree</button>'+
 '<button type="button" role="menuitem" data-aa-view="fan">Fan overview</button>'+
 '<button type="button" role="menuitem" data-aa-view="3d">3D family tree</button>'+
 '<button type="button" role="menuitem" data-aa-view="album">Family photographs</button>'+
 '<button type="button" role="menuitem" data-aa-view="documents">Original documents</button>';
document.body.appendChild(more);
var viewsButton=document.createElement("button");
viewsButton.type="button";viewsButton.id="aaViewsButton";
viewsButton.textContent="Views ▾";
viewsButton.setAttribute("aria-haspopup","menu");
viewsButton.setAttribute("aria-expanded","false");
explorer?.querySelector(".pp-heading")?.appendChild(viewsButton);
var places=document.createElement("section");
places.id="aaPlacesPanel";
places.hidden=true;
places.setAttribute("role","region");
places.setAttribute("aria-label","Places in the Atlas");
places.innerHTML='<header class="aa-places-head"><div><div class="aa-eyebrow">Ancestry Atlas</div><h2>Places</h2>'+
  '<p>Find people through the locations recorded in their Atlas entries. Location mentions are not proof of birth or residence.</p></div></header>'+
  '<div class="aa-place-controls"><label for="aaPlaceSearch">Search people or locations</label>'+
  '<input id="aaPlaceSearch" type="search" placeholder="Try Ontario, Arizona, Denmark…" autocomplete="off"></div>'+
  '<div id="aaRegionTabs" class="aa-regions" aria-label="Filter by geographic region"></div>'+
  '<div class="aa-places-list" id="aaPlacesResults"></div>'+
  '<footer class="aa-place-footer"><button type="button" id="aaPlacesGallery">View historical-place images</button>'+
  '<small>A plotted geographic globe has not yet been added; this is an index of existing location fields.</small></footer>';
document.body.appendChild(places);
var stories=document.createElement("section");
stories.id="aaStoriesPanel";stories.hidden=true;
stories.setAttribute("role","region");stories.setAttribute("aria-label","Family stories and tours");
stories.innerHTML='<header class="aa-stories-head"><div class="aa-eyebrow">Ancestry Atlas</div>'+
 '<h2>Stories</h2><p>Explore the family narrative through guided audio-visual tours.</p></header>'+
 '<div class="aa-story-tile"><strong>Guided family tours</strong>'+
 '<p>Choose Canada / Brenay, Webb, Dunbar or Denmark. The existing story player retains its narration and source material.</p>'+
 '<button type="button" id="aaChooseTour">Choose a tour</button></div>';
document.body.appendChild(stories);
var regions=[
 ["All",null],
 ["Canada",/\b(canada|ontario|québec|quebec|alberta|nova scotia|british columbia|new brunswick|arnstein|stanstead)\b/i],
 ["United States",/\b(usa|u\.s\.|united states|arizona|michigan|utah|minnesota|connecticut|new york|illinois|massachusetts|california|missouri|idaho|iowa|ohio|nebraska|wisconsin|wyoming|alpena|saginaw|pinedale|order ville|orderville)\b/i],
 ["Denmark",/\b(denmark|danish|lolland|falster|fanefjord|møn|moen|copenhagen)\b/i],
 ["England",/\b(england|somerset|taunton|london|yorkshire)\b/i],
 ["Sweden",/\b(sweden|swedish|stockholm)\b/i],
 ["France",/\b(france|french|normandy)\b/i],
 ["Mexico",/\b(mexico|mexican)\b/i]
];
var region="All",searchTerm="",maxItems=60,returnToPlacesAfterGallery=false;
var data=window.__ATLAS_DATA;
var people=(data&&Array.isArray(data.nodes)?data.nodes:[]).filter(function(n){return n&&n.id&&n.place;});
function clean(s){return String(s||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase();}
function make(tag,text,className){var el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;}
function drawPlaces(){
  var tabs=places.querySelector("#aaRegionTabs");
  tabs.replaceChildren();
  regions.forEach(function(item){
    var b=make("button",item[0]);b.type="button";b.dataset.aaRegion=item[0];b.setAttribute("aria-pressed",String(item[0]===region));tabs.appendChild(b);
  });
  var expression=regions.find(function(x){return x[0]===region;})?.[1];
  var scope=people.filter(function(n){return !expression||expression.test(n.place);});
  var results=searchTerm.trim()&&window.AtlasPersonSearch?
    window.AtlasPersonSearch.search(scope,searchTerm,scope.length):null;
  var matches=results?results.matches.map(function(m){return m.person}):
    scope.filter(function(n){return !searchTerm.trim()||
      clean([n.name,n.place,n.years,n.branch].join(" ")).includes(clean(searchTerm));})
    .sort(function(a,b){return String(a.name).localeCompare(String(b.name));});
  var approximateIds=new Set(results?results.matches.filter(function(m){return m.approximate;}).map(function(m){return m.person.id;}):[]);
  var list=places.querySelector("#aaPlacesResults");list.replaceChildren();
  list.appendChild(make("p",matches.length+" mapped people with matching location fields"+
    (approximateIds.size?" · "+approximateIds.size+" possible name-spelling matches":""),"aa-place-count"));
  matches.slice(0,maxItems).forEach(function(n){
    var b=make("button",undefined,"aa-place-person");b.type="button";b.dataset.aaPerson=n.id;
    b.appendChild(make("strong",n.name));
    b.appendChild(make("span",[approximateIds.has(n.id)?"Possible spelling match — verify identity":null,n.years,n.place].filter(Boolean).join(" · ")));
    list.appendChild(b);
  });
  if(matches.length>maxItems){
    var expand=make("button","Show more ("+(matches.length-maxItems)+" remaining)","aa-place-more");
    expand.type="button";expand.id="aaPlacesMore";list.appendChild(expand);
  }
  if(!matches.length)list.appendChild(make("p","No matching locations in the current Atlas entries.","aa-place-count"));
}
function dismissViews(){more.hidden=true;viewsButton.setAttribute("aria-expanded","false");}
function hideLanding(){document.getElementById("landing")?.classList.add("hidden");}
function hideExplorer(){if(explorer)explorer.hidden=true;document.body.classList.remove("pp-preview-open");}
function showFamily(id){
  dismissViews();places.hidden=true;stories.hidden=true;hideLanding();
  if(id&&window.AncestryAtlasPedigreePreview?.selectPerson)window.AncestryAtlasPedigreePreview.selectPerson(id,false);
  window.AncestryAtlasPedigreePreview?.open?.();
  active("family");
}
function showPlaces(){
  dismissViews();stories.hidden=true;hideExplorer();hideLanding();places.hidden=false;drawPlaces();active("places");
}
function showStories(){
  dismissViews();places.hidden=true;hideExplorer();hideLanding();stories.hidden=false;active("stories");
}
function show3d(){
  dismissViews();places.hidden=true;stories.hidden=true;hideExplorer();hideLanding();active("family");
}
function clearOverlays(){
  if(typeof closeAlbum==="function"){try{closeAlbum();}catch(_){}}
}
nav.addEventListener("click",function(event){
  var b=event.target.closest("[data-aa-section]");if(!b)return;
  clearOverlays();
  var destination=b.dataset.aaSection;
  if(destination==="family")showFamily();
  if(destination==="places")showPlaces();
  if(destination==="stories")showStories();
});
viewsButton.addEventListener("click",function(){
  more.hidden=!more.hidden;viewsButton.setAttribute("aria-expanded",String(!more.hidden));
});
more.addEventListener("click",function(event){
  var b=event.target.closest("[data-aa-view]");if(!b)return;
  var view=b.dataset.aaView;
  dismissViews();
  if(view==="2d"){location.assign("./atlas-2d-journey-preview.html?v=20261122-atlas-nav-v2");return;}
  if(view==="3d"){show3d();return;}
  if(view==="fan"){
    showFamily();var fan=explorer?.querySelector('[data-pp-view="overview"]');fan?.click();return;
  }
  if(view==="album"||view==="documents"){
    show3d();if(typeof openAlbum==="function")openAlbum(view==="album"?"family":"document");
  }
});
places.addEventListener("click",function(event){
  var b=event.target.closest("button");if(!b)return;
  if(b.dataset.aaRegion){region=b.dataset.aaRegion;maxItems=60;drawPlaces();return;}
  if(b.id==="aaPlacesMore"){maxItems+=80;drawPlaces();return;}
  if(b.id==="aaPlacesGallery"){
    returnToPlacesAfterGallery=true;show3d();active("places");if(typeof openAlbum==="function")openAlbum("place");return;
  }
  if(b.dataset.aaPerson){
    var id=b.dataset.aaPerson;
    window.AncestryAtlasPedigreePreview?.selectPerson?.(id,false);
    places.hidden=true;hideExplorer();
    try{
      if(typeof selectPersonSearchResult==="function")selectPersonSearchResult(id);
      else if(typeof openNode==="function")openNode(id,true,true);
    }catch(error){console.warn("Could not open place-linked person",error);showPlaces();}
    active("places");
  }
});
var albumModal=document.getElementById("albumModal");
if(albumModal)new MutationObserver(function(){
  if(returnToPlacesAfterGallery&&!albumModal.classList.contains("open")){
    returnToPlacesAfterGallery=false;showPlaces();
  }
}).observe(albumModal,{attributes:true,attributeFilter:["class"]});
stories.addEventListener("click",function(event){
  if(!event.target.closest("#aaChooseTour"))return;
  var launch=document.getElementById("startStory");
  if(!launch){stories.querySelector(".aa-story-tile p").textContent="The existing tour player is unavailable on this page.";return;}
  stories.hidden=true;launch.click();
  // If the story player declined to open, the Stories hub remains accessible.
  queueMicrotask(updateStoriesAfterTour);
});
function updateStoriesAfterTour(){
  var chooser=document.getElementById("lineChooser");
  var modal=document.getElementById("storyModal");
  var isTourOpen=!!(chooser?.classList.contains("open")||modal?.classList.contains("open"));
  if(nav.querySelector('[data-aa-section="stories"][aria-current="page"]')&&!isTourOpen)stories.hidden=false;
}
["lineChooser","storyModal"].forEach(function(id){
  var el=document.getElementById(id);
  if(el)new MutationObserver(updateStoriesAfterTour).observe(el,{attributes:true,attributeFilter:["class","aria-hidden"]});
});
places.querySelector("#aaPlaceSearch").addEventListener("input",function(event){searchTerm=event.target.value;maxItems=60;drawPlaces();});
document.addEventListener("pointerdown",function(event){
  if(!more.hidden&&!more.contains(event.target)&&event.target!==viewsButton)dismissViews();
});
document.addEventListener("keydown",function(event){
  if(event.key==="Escape"&&!more.hidden){dismissViews();viewsButton.focus();}
});
window.AncestryAtlasNavigation={
  open: function(section){if(section==="places")showPlaces();else if(section==="stories")showStories();else showFamily();},
  current: function(){return nav.querySelector('[aria-current="page"]')?.dataset.aaSection||"family";}
};
var entry=query.get("section")||"family";
if(query.get("view")==="3d"){show3d();}
else if(entry==="places"){showPlaces();}
else if(entry==="stories"){showStories();}
else showFamily(query.get("person"));
})();