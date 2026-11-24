/* Atlas navigation on standalone Tree and Globe documents.
   Parent Atlas's four-door shell supplies its own matching header. */
(function(){
"use strict";
if(window.self!==window.top||document.getElementById("aaSimpleHeader"))return;
function initialize(){
 if(document.getElementById("aaMuseumRouteBar"))return;
 var isTree=!!document.getElementById("tree"),isGlobe=!!document.getElementById("globeMap");
 if(!isTree&&!isGlobe)return;
 var home="./index.html?iphone-refresh=20261124-clean-render-v1";
 var bar=document.createElement("nav");
 bar.id="aaMuseumRouteBar";bar.setAttribute("aria-label","Atlas navigation");
 bar.innerHTML='<div class="aa-museum-route-controls">'+
  '<button type="button" id="aaRouteHome" class="aa-route-home" aria-label="Return to Atlas home">'+
   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7"/></svg><span>Home</span></button>'+
  '<button type="button" id="aaRouteBack" aria-label="Back to previous screen" title="Back">'+
   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5 7 12l7 7M7 12h12"/></svg></button>'+
  '<button type="button" id="aaRouteForward" aria-label="Forward to next screen" title="Forward">'+
   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 5 7 7-7 7M17 12H5"/></svg></button></div>'+
  '<span class="aa-museum-route-name">'+(isTree?"Family Tree":"Family Globe")+'</span>';
 document.body.prepend(bar);
 document.body.classList.add("aa-with-museum-route");
 document.getElementById("aaRouteHome").addEventListener("click",function(){location.assign(home);});
 document.getElementById("aaRouteBack").addEventListener("click",function(){
  if(history.length>1)history.back();else location.assign(home);
 });
 document.getElementById("aaRouteForward").addEventListener("click",function(){history.forward();});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initialize,{once:true});
else initialize();
})();
