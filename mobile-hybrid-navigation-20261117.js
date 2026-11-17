/* Ancestry Atlas mobile hybrid navigation — presentation-only enhancement.
   Reads existing DATA/edges; does not mutate nodes, relationships, or evidence. */
(function(){
  "use strict";
  if(!window.matchMedia || !window.matchMedia("(max-width:800px)").matches) return;
  var atlas=window.__ATLAS_DATA;
  if(!atlas || !Array.isArray(atlas.nodes) || !Array.isArray(atlas.edges)) return;
  var byId=new Map(atlas.nodes.map(function(n){return [n.id,n];}));
  var parents=new Map(),children=new Map();
  atlas.edges.forEach(function(e){
    if(!parents.has(e.a)) parents.set(e.a,[]);
    if(!children.has(e.b)) children.set(e.b,[]);
    parents.get(e.a).push(e.b);children.get(e.b).push(e.a);
  });
  var chosen="you",tab="people",filter="all",query="",shown=28;
  var root=document.createElement("section");
  root.id="mobileHybridNav";
  root.setAttribute("role","dialog");
  root.setAttribute("aria-modal","true");
  root.setAttribute("aria-label","Browse Ancestry Atlas");
  root.hidden=true;
  root.innerHTML='<header class="mh-header"><div class="mh-heading"><h2 id="mhTitle">People</h2><button type="button" class="mh-close" data-mh-action="close" aria-label="Return to tree">×</button></div><p class="mh-subhead" id="mhSubtitle">Find a person by name, year, place or family branch.</p></header><main class="mh-scroll" id="mhScroll"><div id="mhContent"></div></main><nav class="mh-bottom" aria-label="Mobile ancestry views"><button type="button" class="mh-tab" data-mh-tab="people"><span aria-hidden="true">⌕</span>People</button><button type="button" class="mh-tab" data-mh-tab="family"><span aria-hidden="true">♧</span>Family</button><button type="button" class="mh-tab" data-mh-tab="tree"><span aria-hidden="true">⌘</span>Full tree</button></nav>';
  document.body.appendChild(root);
  var content=root.querySelector("#mhContent"),scroller=root.querySelector("#mhScroll");
  var title=root.querySelector("#mhTitle"),subtitle=root.querySelector("#mhSubtitle");
  var launch=document.createElement("button");
  launch.id="mobileTreePeople";launch.type="button";
  launch.setAttribute("aria-label","Find people and browse family");
  launch.innerHTML='<span aria-hidden="true">⌕</span><small>People</small>';
  var dock=document.getElementById("mobileTreeDock");
  if(dock){dock.insertBefore(launch,dock.children[1]||null);}
  function clean(s){return String(s||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();}
  function element(tag,cls,text){var el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=String(text);return el;}
  function put(parent,child){parent.appendChild(child);return child;}
  function unique(ids){return Array.from(new Set(ids||[])).filter(function(id){return byId.has(id);});}
  function parentsOf(id){return unique(parents.get(id));}
  function childrenOf(id){return unique(children.get(id));}
  function coparentsOf(id){
    var others=[];
    childrenOf(id).forEach(function(c){parentsOf(c).forEach(function(p){if(p!==id)others.push(p);});});
    return unique(others);
  }
  function routeTo(id){
    if(id==="you") return ["you"];
    var q=[["you"]],seen=new Set(["you"]);
    while(q.length){
      var path=q.shift(),at=path[path.length-1];
      var next=parentsOf(at);
      for(var i=0;i<next.length;i++){
        var p=next[i];if(seen.has(p))continue;
        var candidate=path.concat(p);
        if(p===id) return candidate;
        seen.add(p);q.push(candidate);
      }
    }
    return null;
  }
  function degreeText(id){
    var path=routeTo(id);if(!path)return byId.get(id)&&byId.get(id).collateral?"Collateral relative":"Relationship not mapped";
    var d=path.length-1;if(!d)return "You";if(d===1)return "Parent";if(d===2)return "Grandparent";
    if(d===3)return "Great-grandparent";return (d-2)+"× great-grandparent";
  }
  function namePart(n){return n&&n.name?n.name:"Unknown person";}
  function initials(name){
    var words=String(name||"").replace(/[“”]/g,"").split(/\s+/).filter(Boolean);
    return (words[0]||"?").slice(0,1).toUpperCase()+((words.length>1?words[words.length-1]:"").slice(0,1).toUpperCase());
  }
  function personButton(id,extra){
    var n=byId.get(id);if(!n)return null;
    var btn=element("button","mh-item");btn.type="button";btn.dataset.mhPerson=id;
    put(btn,element("span","mh-avatar",initials(n.name)));
    var copy=put(btn,element("span","mh-person-copy"));
    put(copy,element("span","mh-name",namePart(n)));
    var label=[extra||degreeText(id),n.years,n.branch].filter(Boolean).join(" · ");
    put(copy,element("span","mh-detail",label));
    if(n.place)put(copy,element("span","mh-detail",n.place));
    put(btn,element("span","mh-chevron","›"));
    return btn;
  }
  var chips=[
    ["all","All people"],["webb","Webb"],["brenay","Brenay / Gooley"],
    ["hill","Hill / Prather"],["carling","Carling"],["aurin","Aurin / Swedish"],["denmark","Denmark"]
  ];
  function matchesFilter(n){
    if(filter==="all")return true;
    var s=clean([n.branch,n.name,n.place].join(" "));
    if(filter==="brenay")return /brenay|gooley|brunne|goulet|dennis/.test(s);
    if(filter==="hill")return /hill|prather/.test(s);
    if(filter==="aurin")return /aurin|auren|swed/.test(s);
    if(filter==="denmark")return /denmark|danish|seje|seye|mortensen/.test(s);
    return s.includes(filter);
  }
  function searchScore(n,q){
    var name=clean(n.name),rest=clean([n.years,n.place,n.branch,n.surnameHypothesis,n.aliases,n.alternateNames].join(" "));
    if(!q)return 10;
    if(name===q)return 0;if(name.startsWith(q))return 1;if(name.includes(q))return 2;
    if(rest.includes(q))return 3;
    return 99;
  }
  function renderPeople(){
    title.textContent="Find people";subtitle.textContent="Search first, then explore one family at a time.";
    content.replaceChildren();
    var search=put(content,element("input","mh-search"));
    search.type="search";search.id="mhSearch";search.autocomplete="off";search.placeholder="Name, place, year or branch";
    search.setAttribute("aria-label","Search ancestors");
    search.value=query;
    var chipRow=put(content,element("div","mh-chips"));
    chips.forEach(function(ch){
      var b=put(chipRow,element("button","",ch[1]));b.type="button";b.dataset.mhFilter=ch[0];
      b.setAttribute("aria-pressed",String(filter===ch[0]));
    });
    var results=put(content,element("div"));results.id="mhResults";
    renderPeopleResults();
  }
  function renderPeopleResults(){
    var results=content.querySelector("#mhResults");
    if(!results)return;
    results.replaceChildren();
    var q=clean(query);
    var rows=atlas.nodes.filter(matchesFilter).map(function(n){return {n:n,score:searchScore(n,q),path:routeTo(n.id)};})
      .filter(function(x){return x.score<99;})
      .sort(function(a,b){
        if(a.score!==b.score)return a.score-b.score;
        var aa=a.path?a.path.length:999,bb=b.path?b.path.length:999;
        if(aa!==bb)return aa-bb;
        return namePart(a.n).localeCompare(namePart(b.n));
      });
    put(results,element("div","mh-count",rows.length+" people found"));
    if(!rows.length)put(results,element("div","mh-empty","No matching person. Try a different name or clear the branch filter."));
    rows.slice(0,shown).forEach(function(x){put(results,personButton(x.n.id));});
    if(rows.length>shown){
      var more=put(results,element("button","mh-action","Show more people"));more.type="button";more.dataset.mhAction="more";
      more.style.width="100%";more.style.marginTop="10px";
    }
  }
  function section(titleText,ids,emptyText){
    put(content,element("h3","mh-section-title",titleText));
    var wrap=put(content,element("div","mh-family-list"));
    if(!ids.length){put(wrap,element("p","mh-empty",emptyText));return;}
    ids.forEach(function(id){put(wrap,personButton(id));});
  }
  function renderFamily(){
    var n=byId.get(chosen)||byId.get("you");
    chosen=n.id;title.textContent="Family view";
    subtitle.textContent="Tap any relative to recenter this view.";
    content.replaceChildren();
    var route=routeTo(chosen);
    var overview=put(content,element("div","mh-card mh-selected"));
    put(overview,element("div","mh-status",degreeText(chosen)+" · "+(n.branch||"Family")));
    put(overview,element("div","mh-person-title",namePart(n)));
    put(overview,element("div","mh-status",[n.years,n.place].filter(Boolean).join(" · ")||"Person in Ancestry Atlas"));
    put(overview,element("div","mh-status","Research status: "+(n.confidence||"not stated")));
    var actions=put(overview,element("div","mh-button-row"));
    var biography=put(actions,element("button","mh-action mh-action-primary","Open person page"));biography.type="button";biography.dataset.mhAction="profile";
    var classic=put(actions,element("button","mh-action","Show in full tree"));classic.type="button";classic.dataset.mhAction="tree";
    if(route){
      put(content,element("h3","mh-section-title","Your ancestral connection"));
      var pathRow=put(content,element("div","mh-relation-path"));
      route.forEach(function(id,i){
        if(i)put(pathRow,element("span","mh-path-arrow","→"));
        var b=put(pathRow,element("button","mh-path-node",namePart(byId.get(id))));
        b.type="button";b.dataset.mhPerson=id;
      });
      put(content,element("div","mh-note","This is the parent-child route currently mapped in Atlas. Check the source and research status on individual person pages."));
    }else{
      put(content,element("div","mh-note","A direct parent-child path back to you is not established in the current Atlas. This view does not assume a connection."));
    }
    section("Parents / earlier generation",parentsOf(chosen),"No earlier parent is mapped for this person.");
    section("Co-parents in mapped family links",coparentsOf(chosen),"No co-parent is mapped through a child.");
    section("Children / later generation",childrenOf(chosen),"No children are mapped for this person.");
    put(content,element("div","mh-note","Only Atlas-mapped family links appear here. Research candidates are not added as established relatives."));
  }
  function visible(){return !root.hidden;}
  function show(next){
    if(next==="tree"){openClassic();return;}
    tab=next;root.hidden=false;document.body.classList.add("mh-nav-open");
    root.querySelectorAll("[data-mh-tab]").forEach(function(b){b.setAttribute("aria-current",b.dataset.mhTab===tab?"page":"false");});
    if(tab==="people")renderPeople();else renderFamily();
    scroller.scrollTop=0;
  }
  function close(){root.hidden=true;document.body.classList.remove("mh-nav-open");}
  function focusPerson(id){if(!byId.has(id))return;chosen=id;show("family");}
  function openClassic(){
    close();
    var id=chosen;
    try{
      if(typeof selectPersonSearchResult==="function")selectPersonSearchResult(id);
      else if(typeof openNode==="function")openNode(id,true,true);
      var card=document.getElementById("card");
      if(card)card.style.display="none";
      if(typeof draw==="function")draw();
    }catch(err){console.error("Classic tree navigation unavailable",err);}
  }
  function openProfile(){
    close();
    try{
      if(typeof selectPersonSearchResult==="function")selectPersonSearchResult(chosen);
      else if(typeof openNode==="function")openNode(chosen,true,true);
    }catch(err){console.error("Person page navigation unavailable",err);}
  }
  root.addEventListener("click",function(e){
    var target=e.target.closest("button");if(!target)return;
    if(target.dataset.mhPerson){focusPerson(target.dataset.mhPerson);return;}
    if(target.dataset.mhFilter){filter=target.dataset.mhFilter;shown=28;renderPeople();return;}
    if(target.dataset.mhTab){show(target.dataset.mhTab);return;}
    if(target.dataset.mhAction==="close"){close();return;}
    if(target.dataset.mhAction==="profile"){openProfile();return;}
    if(target.dataset.mhAction==="tree"){openClassic();return;}
    if(target.dataset.mhAction==="more"){shown+=28;var scroll=scroller.scrollTop;renderPeopleResults();scroller.scrollTop=scroll;}
  });
  root.addEventListener("input",function(e){
    if(e.target.id==="mhSearch"){
      query=e.target.value;shown=28;
      // Preserve focus and keyboard during results refresh on iPhone.
      renderPeopleResults();
    }
  });
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&visible()){close();}});
  launch.addEventListener("click",function(){
    var legacy=typeof selected!=="undefined"?selected:null;
    if(legacy&&byId.has(legacy))chosen=legacy;
    show("people");
  });
  // Escape hatch from the legacy More menu for people who have hidden the dock.
  var menu=document.getElementById("mobileTreeMenuSheet");
  if(menu){
    var jump=element("button","","Browse people / focused family");
    jump.type="button";jump.addEventListener("click",function(){menu.classList.remove("open");menu.setAttribute("aria-hidden","true");show("people");});
    menu.insertBefore(jump,menu.children[1]||null);
  }
  window.AncestryAtlasMobileHybrid={
    open:function(){show("people");},
    showPerson:function(id){focusPerson(id);},
    close:close,
    getState:function(){return {chosen:chosen,tab:tab,open:visible(),count:atlas.nodes.length};}
  };
})();
