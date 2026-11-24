/* Unified, read-only family presentation.
 * Reuses the Atlas2DFamily relationship projection and the SOURCE-IDENTIFIED
 * 2D portrait crop registry. Never infers a marriage or invents a likeness. */
(function(root){
"use strict";
function portraitRoot(){return root.ATLAS_2D_PORTRAITS||{};}
function fallback(target,small){
  // This is decorative collection artwork, never a representation of the named ancestor.
  target.classList.add("aa-photo-unavailable");
  var cameo=document.createElement("img");
  cameo.className="aa-archival-cameo";
  cameo.alt="No verified historical portrait; anonymous illustrated cameo";
  cameo.decoding="async";cameo.loading="lazy";
  cameo.src="./assets/atlas-anonymous-cameo-20261123.svg";
  target.appendChild(cameo);return cameo;
}
// One source crop, one proportional fit. Shared by cards and canvas tree.
function portraitBounds(item,iw,ih){
  if(!Number.isFinite(iw)||!Number.isFinite(ih)||iw<=0||ih<=0)throw Error("Invalid portrait dimensions");
  var crop=item?.crop;
  if(!Array.isArray(crop)||crop.length!==4||!crop.every(Number.isFinite)||crop[0]<0||crop[1]<0||crop[2]<=0||crop[3]<=0||crop[0]+crop[2]>1.000001||crop[1]+crop[3]>1.000001)return {sx:0,sy:0,sw:iw,sh:ih};
  var sx=Math.min(iw-1,crop[0]*iw),sy=Math.min(ih-1,crop[1]*ih);
  return {sx:sx,sy:sy,sw:Math.max(1,Math.min(iw-sx,crop[2]*iw)),sh:Math.max(1,Math.min(ih-sy,crop[3]*ih))};
}
function fitPortrait(sw,sh,w,h){
  var ratio=Math.min(w/sw,h/sh);
  return {w:sw*ratio,h:sh*ratio,x:(w-sw*ratio)/2,y:(h-sh*ratio)/2};
}
function attachPortrait(target,id,options){
  options=options||{};
  var outer=document.createElement("div");outer.className="aa-family-photo"+(options.small?" aa-photo-small":"");
  outer.dataset.photoPerson=id;target.appendChild(outer);
  var entries=portraitRoot()[id];if(!entries){fallback(outer,options.small);return outer;}
  var candidates=[entries].concat(entries.alternatePortraits||[]);
  function tryImage(index){
    if(index>=candidates.length){fallback(outer,options.small);return;}
    var item=candidates[index],img=new Image();img.decoding="async";
    img.onload=function(){
      if(!outer.isConnected)return;
      try{
        var iw=img.naturalWidth,ih=img.naturalHeight,b=portraitBounds(item,iw,ih);
        var display=img;
        if(b.sx||b.sy||b.sw!==iw||b.sh!==ih){
          // Offscreen canvas only; the DOM receives an ordinary aspect-preserving image.
          // This avoids global legacy canvas styles and a second object-fit:cover crop.
          var c=document.createElement("canvas"),scale=Math.min(1,640/Math.max(b.sw,b.sh));
          c.width=Math.max(1,Math.round(b.sw*scale));c.height=Math.max(1,Math.round(b.sh*scale));
          var ctx=c.getContext("2d");if(!ctx)throw Error("No 2D canvas");
          ctx.drawImage(img,b.sx,b.sy,b.sw,b.sh,0,0,c.width,c.height);
          display=document.createElement("img");display.src=c.toDataURL("image/png");
        }
        display.className="aa-family-photo-image";display.alt=item.title||"Sourced historical portrait";
        display.decoding="async";display.draggable=false;
        outer.replaceChildren(display);outer.title=item.title||"Sourced historical portrait";
        outer.dataset.source=item.fullSourceUrl||item.url;
        var link=target.querySelector(".aa-family-original");if(link)link.href=outer.dataset.source;
      }catch(_){tryImage(index+1);}
    };
    img.onerror=function(){tryImage(index+1);};
    img.src=item.url;
  }
  tryImage(0);
  return outer;
}
function enhanceScrollTrack(track){
  if(!track||track.parentElement?.classList.contains("aa-carousel-frame"))return;
  var frame=document.createElement("div");frame.className="aa-carousel-frame";
  var controls=document.createElement("div");controls.className="aa-carousel-controls";
  controls.innerHTML='<button type="button" class="aa-carousel-prev" aria-label="Previous family photographs">‹</button>'+
    '<button type="button" class="aa-carousel-next" aria-label="Next family photographs">›</button>';
  track.parentNode.insertBefore(frame,track);
  frame.appendChild(track);frame.appendChild(controls);
  track.classList.add("aa-family-carousel");
  var prev=controls.querySelector(".aa-carousel-prev"),next=controls.querySelector(".aa-carousel-next");
  function refresh(){
    var max=track.scrollWidth-track.clientWidth;
    prev.disabled=track.scrollLeft<3;
    next.disabled=track.scrollLeft>=max-3;
    controls.hidden=max<=4;
  }
  prev.addEventListener("click",function(){track.scrollBy({left:-Math.max(160,track.clientWidth*.82),behavior:"smooth"});});
  next.addEventListener("click",function(){track.scrollBy({left:Math.max(160,track.clientWidth*.82),behavior:"smooth"});});
  track.addEventListener("scroll",refresh,{passive:true});
  if(typeof ResizeObserver!=="undefined")new ResizeObserver(refresh).observe(track);
  requestAnimationFrame(refresh);
}
function makePersonCard(person,label,current,onOpen){
  var card=document.createElement("article");card.className="aa-family-member";
  if(current)card.classList.add("is-current");
  attachPortrait(card,person.id,{});
  var wrap=document.createElement("div");wrap.className="aa-family-member-details";
  var name=document.createElement("strong");name.textContent=person.name;wrap.appendChild(name);
  if(person.years){var years=document.createElement("small");years.textContent=person.years;wrap.appendChild(years);}
  if(label){var note=document.createElement("span");note.textContent=label;note.className="aa-family-membership";wrap.appendChild(note);}
  if(onOpen){
    var btn=document.createElement("button");btn.className="aa-family-open";btn.type="button";btn.textContent="View person";
    btn.addEventListener("click",function(){onOpen(person.id);});wrap.appendChild(btn);
  }
  var source=portraitRoot()[person.id];
  if(source){
    var link=document.createElement("a");link.className="aa-family-original";
    link.href=source.fullSourceUrl||source.url;link.target="_blank";link.rel="noopener noreferrer";
    link.textContent="Original photograph";wrap.appendChild(link);
  }
  card.appendChild(wrap);return card;
}
function familySection(parent,title,entries,onOpen){
  var section=document.createElement("section");section.className="aa-family-related-section";
  var titleNode=document.createElement("h4");titleNode.textContent=title;section.appendChild(titleNode);
  var track=document.createElement("div");track.className="aa-family-related-track";
  if(entries.length)entries.forEach(function(entry){
    track.appendChild(makePersonCard(entry.person,entry.label,entry.current,onOpen));
  });
  else{var empty=document.createElement("p");empty.className="aa-family-no-links";
    empty.textContent="No relationship recorded in the current Atlas.";track.appendChild(empty);}
  section.appendChild(track);parent.appendChild(section);
  if(entries.length)enhanceScrollTrack(track);
}
function mountCanonical(){
  var card=document.getElementById("card"),data=root.__ATLAS_DATA,lib=root.Atlas2DFamily;
  if(!card||!data||!lib||!card.querySelector("#personHeader")||document.getElementById("aaPersonFamilySections"))return;
  var families=lib.create(data);
  var section=document.createElement("section");section.id="aaPersonFamilySections";
  section.setAttribute("aria-label","Family relationships and photographs");
  var anchor=card.querySelector("#extraInfo");
  anchor?.insertAdjacentElement("afterend",section);
  var header=card.querySelector("#personHeader h3");
  if(!header)return;
  var previous="";
  function render(){
    // Bind family group to the canonical ID; never infer from similar names.
    var activeId=card.dataset.atlasPersonId||"";
    var person=activeId?data.nodes.find(function(n){return n.id===activeId;}):null;
    if(!person||previous===person.id)return;
    previous=person.id;
    var family=families.family(person.id);
    section.replaceChildren();
    if(!family)return;
    var heading=document.createElement("div");heading.className="aa-family-heading";
    heading.innerHTML='<strong>Family connections</strong><span>Portraits are shown only when the subject is identified by a source.</span>';
    section.appendChild(heading);
    if(family.parents.length){
      var parents=document.createElement("p");parents.className="aa-family-parent-summary";
      parents.textContent="Recorded parents: "+family.parents.map(function(n){return n.name;}).join(" · ");
      section.appendChild(parents);
    }
    function open(id){
      if(typeof root.openNode==="function")root.openNode(id,true,true);
      else if(typeof root.selectPersonSearchResult==="function")root.selectPersonSearchResult(id);
    }
    var siblings=[{person:family.person,label:"Selected person",current:true}].concat(
      family.siblings.map(function(s){return {person:s.person,label:s.label,current:false};}));
    familySection(section,"Siblings & family of origin",siblings,open);
    if(family.childGroups.length){
      family.childGroups.forEach(function(group){
        var withNames=group.otherParents.map(function(x){return x.name;});
        var label=withNames.length?"Children · with "+withNames.join(", "):"Children · other parent not recorded";
        familySection(section,label,group.children.map(function(child){return {person:child,label:"Recorded child"};}),open);
      });
    }else familySection(section,"Children",[],open);
    var warning=document.createElement("p");warning.className="aa-family-caution";
    warning.textContent="Family groupings use recorded parent-child links. Shared children do not establish marriage; absent siblings or children are not proof that none existed.";
    section.appendChild(warning);
    try{if(root.parent!==root)root.parent.postMessage({type:"atlas-person-page",id:person.id,name:person.name},root.location.origin);}catch(_){}
  }
  var observer=new MutationObserver(render);observer.observe(header,{subtree:true,childList:true,characterData:true});
  render();
}
root.AtlasFamilyPortraitUI=Object.freeze({attachPortrait:attachPortrait,portraitBounds:portraitBounds,fitPortrait:fitPortrait,enhanceScrollTrack:enhanceScrollTrack,makePersonCard:makePersonCard,mountCanonical:mountCanonical});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mountCanonical,{once:true});
else mountCanonical();
})(typeof window!=="undefined"?window:globalThis);
