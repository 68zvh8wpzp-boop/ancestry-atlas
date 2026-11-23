/* Ancestry Atlas — isolated, exploratory iPhone pedigree preview.
   Reads the original Atlas's mapped relationships. Does not mutate genealogical evidence. */
(function(){
  "use strict";
  var launch=document.getElementById("startAncestorExplorer");
  var data=window.__ATLAS_DATA;
  if(!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)){
    console.error("Ancestor Explorer: Atlas genealogy records unavailable.");
    return;
  }
  var byId=new Map(data.nodes.map(function(n){return [n.id,n];}));
  var parentMap=new Map();
  data.edges.forEach(function(edge){
    if(!parentMap.has(edge.a))parentMap.set(edge.a,[]);
    parentMap.get(edge.a).push(edge.b);
  });
  function parentsOf(id){
    return Array.from(new Set(parentMap.get(id)||[])).filter(function(p){return byId.has(p)&&p!==id;});
  }
  function pathFromYou(id){
    if(!byId.has(id)||!byId.has("you"))return null;
    var queue=[["you"]],visited=new Set(["you"]);
    while(queue.length){
      var path=queue.shift(),p=path[path.length-1];
      if(p===id)return path;
      for(var parent of parentsOf(p)){
        if(visited.has(parent))continue;
        visited.add(parent);queue.push(path.concat(parent));
      }
    }
    return null;
  }
  function safe(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
  function norm(s){return String(s||"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();}
  function personName(id){return byId.get(id)?.name||"Unknown";}
  function shortName(id){
    var n=personName(id).split(/\s+/).filter(Boolean);
    return n.length?n[0].replace(/[“”]/g,""):"?";
  }
  function degree(id){
    var path=pathFromYou(id);
    if(!path)return byId.get(id)?.collateral?"Collateral relative":"Relationship not fully mapped";
    var generations=path.length-1;
    if(!generations)return "You";
    if(generations===1)return "Parent";
    if(generations===2)return "Grandparent";
    if(generations===3)return "Great-grandparent";
    return (generations-2)+"× great-grandparent";
  }
  var key="aa-iphone-explorer-preview-v1",persisted={};
  try{persisted=JSON.parse(localStorage.getItem(key)||"{}")||{};}catch(_){}
  var expanded=new Set(Array.isArray(persisted.expanded)?persisted.expanded.filter(function(id){return byId.has(id);}):["you"]);
  if(!expanded.size)expanded.add("you");
  var selected=byId.has(persisted.selected)?persisted.selected:"you";
  var fanRoot=byId.has(persisted.fanRoot)?persisted.fanRoot:"you";
  var view=["explore","overview","find"].includes(persisted.view)?persisted.view:"explore";
  var visited=Array.isArray(persisted.visited)?persisted.visited.filter(function(id){return byId.has(id);}).slice(-16):["you"];
  var term="";
  var main,container,returnBtn;
  var root=document.createElement("section");
  root.id="pedigreePrototype";
  root.setAttribute("role","region");
  root.setAttribute("aria-label","iPhone family explorer prototype");
  root.innerHTML=
    '<header class="pp-top">'+
       '<div class="pp-heading"><div class="pp-title">Explore your ancestry</div><button type="button" class="pp-exit" data-pp-action="exit">3D Atlas</button></div>'+
       '<p class="pp-subtitle">Tap an arrow to expand a branch.</p>'+
    '</header>'+
    '<nav class="pp-tabs" aria-label="Explore ancestors">'+
       '<button type="button" class="pp-tab" data-pp-view="explore">Explore tree</button>'+
       '<button type="button" class="pp-tab" data-pp-view="overview">Overview</button>'+
       '<button type="button" class="pp-tab" data-pp-view="find">Find person</button>'+
    '</nav>'+
    '<main id="ppMain" class="pp-main" tabindex="-1"></main>'+
    '<footer class="pp-bottom"><button type="button" data-pp-action="reset">Start from You</button></footer>';
  document.body.appendChild(root);
  main=root.querySelector("#ppMain");
  returnBtn=document.createElement("button");
  returnBtn.id="ppReturnToExplorer";returnBtn.type="button";
  returnBtn.textContent="↶ Explorer";
  returnBtn.setAttribute("aria-label","Return to expandable family explorer");
  returnBtn.style.cssText="position:fixed;z-index:12000;top:max(9px,env(safe-area-inset-top));right:10px;min-height:44px;padding:9px 13px;border:1px solid #98bcd2;border-radius:12px;background:#0d3149;color:#eefaff;font:700 13px system-ui";
  returnBtn.hidden=true;document.body.appendChild(returnBtn);
  returnBtn.onclick=function(){showExplorer();};
  var originalLanding=document.getElementById("landing");
  function save(){
    try{
      localStorage.setItem(key,JSON.stringify({expanded:Array.from(expanded),selected:selected,fanRoot:fanRoot,view:view,visited:visited.slice(-16)}));
    }catch(_){}
  }
  function remember(id){
    if(!byId.has(id))return;
    selected=id;
    if(visited[visited.length-1]!==id)visited.push(id);
    visited=visited.slice(-16);
    save();
  }
  function hideExplorer(){
    root.hidden=true;returnBtn.hidden=false;
    document.body.classList.remove("pp-preview-open");
  }
  function showExplorer(){
    root.hidden=false;returnBtn.hidden=true;
    document.body.classList.add("pp-preview-open");
    originalLanding?.classList.add("hidden");
    render(false);
  }
  function openPersonPage(){
    hideExplorer();
    try {
      if(typeof selectPersonSearchResult==="function")selectPersonSearchResult(selected);
      else if(typeof openNode==="function")openNode(selected,true,true);
    } catch(error) {
      console.error("Could not open Atlas person page",error);
      showExplorer();
    }
  }
  function renderRecentPath(){
    var ids=visited.filter(function(id,i,arr){return arr.lastIndexOf(id)===i;}).slice(-6);
    if(ids.length<=1)return "";
    var buttons=ids.map(function(id){
      return '<button type="button" data-pp-select="'+safe(id)+'">'+safe(id==="you"?"You":personName(id))+'</button>';
    }).join("");
    return '<div class="pp-recent"><span>Recently explored</span><div class="pp-recent-chips">'+buttons+'</div></div>';
  }
  function renderSelection(){
    var n=byId.get(selected)||byId.get("you");
    var path=pathFromYou(n.id),chain=path?path.map(function(id){
      return '<button type="button" data-pp-select="'+safe(id)+'">'+safe(id==="you"?"You":personName(id))+'</button>';
    }).join('<span class="pp-path-arrow">›</span>'):'<span class="pp-note">No established direct ancestor path back to You is mapped for this person.</span>';
    return '<section class="pp-info" aria-label="Selected ancestor">'+
      '<div class="pp-info-name">'+safe(n.name)+'</div>'+
      '<div class="pp-info-meta">'+safe([degree(n.id),n.years,n.branch].filter(Boolean).join(" · "))+'</div>'+
      '<div class="pp-info-actions"><button type="button" class="pp-mini pp-mini-primary" data-pp-action="open-profile">Person page</button>'+
      '<button type="button" class="pp-mini" data-pp-action="follow-selected">Follow this line</button></div>'+
      '</section><div class="pp-path" aria-label="Ancestry path">'+chain+'</div>'+renderRecentPath();
  }
  function collectRows(){
    var rows=[],safety=0;
    function walk(id,depth,path){
      if(!byId.has(id)||safety>=350)return;
      var cycle=path.has(id);
      rows.push({id:id,depth:depth,cycle:cycle});
      safety++;
      if(!cycle&&expanded.has(id)){
        var next=new Set(path);next.add(id);
        parentsOf(id).forEach(function(p){walk(p,depth+1,next);});
      }
    }
    walk("you",0,new Set());
    return rows;
  }
  function treeHtml(){
    var rows=collectRows();
    var html='<div class="pp-instruction">Tap <strong>the arrow</strong> to uncover parents; tap <strong>the name</strong> to inspect someone. Open branches stay open as you explore.</div>'+
       '<div class="pp-tools">'+
       '<button type="button" class="pp-tool" data-pp-action="one-more">Unfold one generation</button>'+
       '<button type="button" class="pp-tool" data-pp-action="collapse">Collapse branches</button><button type="button" class="pp-tool" data-pp-action="back">Previous person</button></div>'+
       '<div class="pp-tree" role="tree" aria-label="Expandable ancestor tree">';
    rows.forEach(function(row){
      var n=byId.get(row.id),p=parentsOf(row.id),open=expanded.has(row.id),isChosen=selected===row.id;
      html+='<div class="pp-row" style="--depth:'+row.depth+'" role="treeitem" aria-level="'+(row.depth+1)+'" aria-selected="'+isChosen+'">'+
        '<button type="button" class="pp-expand" data-pp-expand="'+safe(row.id)+'" aria-label="'+(p.length?(open?"Collapse parents of ":"Show parents of "):"No parents mapped for ")+safe(n.name)+'"'+
          (p.length&&!row.cycle?' aria-expanded="'+open+'"':' disabled')+'>'+
          (p.length?(open?"▾":"›"):"·")+'</button>'+
        '<button type="button" class="pp-person" data-pp-select="'+safe(row.id)+'" aria-current="'+isChosen+'">'+
          '<span class="pp-name">'+safe(n.name)+'</span>'+
          '<span class="pp-rowmeta">'+safe([n.years,n.branch].filter(Boolean).join(" · ")||"Mapped person")+'</span>'+
        '</button><span class="pp-tag" aria-label="Generation '+row.depth+'">G'+row.depth+'</span></div>';
    });
    html+='</div><div class="pp-note">Only mapped parent-child relationships appear here. Candidate ancestors are not promoted to proven family links.</div>';
    if(rows.length>=350)html+='<div class="pp-empty">Display limit reached. Collapse a branch to continue exploring another one.</div>';
    return html;
  }
  function levelsFor(rootId){
    var levels=[[rootId]];
    for(var i=1;i<=4;i++){
      var parentLevel=[];
      levels[i-1].forEach(function(id){
        var p=id?parentsOf(id):[];
        parentLevel.push(p[0]||null,p[1]||null);
      });
      levels.push(parentLevel);
    }
    return levels;
  }
  function polar(r,angle){
    var a=angle*Math.PI/180;
    return [200+r*Math.cos(a),198+r*Math.sin(a)];
  }
  function segment(r0,r1,start,end){
    var a=polar(r0,start),b=polar(r1,start),c=polar(r1,end),d=polar(r0,end);
    return "M"+a[0].toFixed(2)+","+a[1].toFixed(2)+" L"+b[0].toFixed(2)+","+b[1].toFixed(2)+
      " A"+r1+","+r1+" 0 0 1 "+c[0].toFixed(2)+","+c[1].toFixed(2)+
      " L"+d[0].toFixed(2)+","+d[1].toFixed(2)+
      " A"+r0+","+r0+" 0 0 0 "+a[0].toFixed(2)+","+a[1].toFixed(2)+" Z";
  }
  function fanSvg(levels){
    var svg='<svg viewBox="0 0 400 220" role="img" aria-label="Semicircular overview of four mapped ancestral generations. A readable list follows below.">';
    for(var g=4;g>=1;g--){
      var count=2**g,r0=22+(g-1)*39,r1=r0+37;
      for(var i=0;i<count;i++){
        var id=levels[g][i],p=id?byId.get(id):null;
        var paternal=i< count/2;
        var palette=paternal?["#306084","#2d536d","#355b7b","#294a63"]:["#2d646c","#36666b","#2d525a","#31555c"];
        var fill=id?palette[g-1]:"#132737";
        var a=180+i*180/count,b=180+(i+1)*180/count;
        svg+='<path d="'+segment(r0,r1,a,b)+'" fill="'+fill+'"'+
          (id?' role="button" tabindex="0" data-pp-fan="'+safe(id)+'" aria-label="'+safe(personName(id))+'"':'')+
          ' data-selected="'+(id===selected)+'"><title>'+safe(id?personName(id):"Unmapped ancestor")+'</title></path>';
        if(id && g<=2){
          var pt=polar((r0+r1)/2,(a+b)/2);
          svg+='<text class="pp-fan-label" x="'+pt[0].toFixed(2)+'" y="'+pt[1].toFixed(2)+'">'+safe(shortName(id).slice(0,10))+'</text>';
        }
      }
    }
    svg+='<circle cx="200" cy="198" r="21" fill="#bcdbe9" stroke="#40617a" stroke-width="2"/>'+
       '<text x="200" y="199" font-size="10" fill="#122e3e" text-anchor="middle" font-weight="750">'+safe(shortName(fanRoot).slice(0,8))+'</text></svg>';
    return svg;
  }
  function overviewHtml(){
    var levels=levelsFor(fanRoot),rootName=personName(fanRoot);
    var html='<div class="pp-overview-head">Four-generation overview of '+safe(rootName)+'</div>'+
      '<div class="pp-instruction">The fan shows where each family line branches. Tap a segment or choose a larger name button below.</div>'+
      '<div class="pp-fan-wrap">'+fanSvg(levels)+
      '<div class="pp-fan-legend"><span>Left: first parent line</span><span>Right: second parent line</span></div></div>'+
      '<div class="pp-overview-actions">'+
      '<button type="button" data-pp-action="fan-center">Center on selected person</button>'+
      '<button type="button" data-pp-action="fan-home">Back to You</button></div>';
    for(var g=1;g<=4;g++){
      var people=levels[g].filter(Boolean);
      html+='<h3 class="pp-overview-head">Generation '+g+(g===1?" · Parents":g===2?" · Grandparents":" · Earlier ancestors")+'</h3>';
      if(!people.length){html+='<div class="pp-empty">No mapped ancestors at this level.</div>';continue;}
      people.forEach(function(id){
        var n=byId.get(id);
        html+='<button type="button" class="pp-list-button" data-pp-fan="'+safe(id)+'"><strong>'+safe(n.name)+'</strong>'+
          '<small>'+safe([n.years,n.branch].filter(Boolean).join(" · "))+'</small></button>';
      });
    }
    html+='<div class="pp-note">This overview shows at most two parents per position. The expandable tree shows all mapped parents. Empty sections do not mean the research has been exhausted.</div>';
    return html;
  }
  function personMatches(n,q){
    var s=norm([n.name,n.years,n.place,n.branch,n.surnameHypothesis,n.aliases,n.alternateNames].join(" "));
    return s.includes(q);
  }
  function matchList(){
    return window.AtlasPersonSearch.search(data.nodes,term,55).map(function(hit){return hit.person;});
  }
  function searchHitsHtml(){
    if(!term.trim())return '<div class="pp-empty">Search a name, surname, location, or year. Then choose a result to jump into its place in the pedigree.</div>';
    var hits=matchList(),h='<p>'+hits.length+(hits.length===55?"+":"")+' matching people</p>';
    if(!hits.length)return h+'<div class="pp-empty">No matches. Try another spelling or search a branch name.</div>';
    hits.forEach(function(n){
      h+='<button type="button" class="pp-list-button" data-pp-follow="'+safe(n.id)+'"><strong>'+safe(n.name)+'</strong>'+
         '<small>'+safe([window.AtlasPersonSearch.match(n,term)?.label,degree(n.id),n.years,n.branch,n.place].filter(Boolean).join(" · "))+'</small></button>';
    });
    return h;
  }
  function searchHtml(){
    return '<div class="pp-instruction">This is the shortcut. Explore Tree lets you discover people even when you do not know their names.</div>'+
       '<input id="ppFindInput" class="pp-field" type="search" placeholder="Find name, place, or year..." autocomplete="off" enterkeyhint="search" value="'+safe(term)+'" aria-label="Find ancestors">'+
       '<div id="ppResults" class="pp-results">'+searchHitsHtml()+'</div>';
  }
  function render(preserveScroll){
    var position=preserveScroll?main.scrollTop:0;
    root.querySelectorAll("[data-pp-view]").forEach(function(btn){
      btn.setAttribute("aria-current",btn.dataset.ppView===view?"page":"false");
    });
    var body=renderSelection();
    body+=view==="explore"?treeHtml():view==="overview"?overviewHtml():searchHtml();
    main.innerHTML=body;
    main.scrollTop=position;
    save();
  }
  function expandTo(id){
    var path=pathFromYou(id);
    if(path){path.slice(0,-1).forEach(function(p){expanded.add(p);});}
    remember(id);view="explore";render(false);
    if(path){
      requestAnimationFrame(function(){
        var row=Array.from(root.querySelectorAll("[data-pp-select]")).find(function(el){return el.dataset.ppSelect===id && el.closest(".pp-row");});
        if(row)row.scrollIntoView({block:"center",behavior:"auto"});
      });
    }
  }
  function reset(){
    expanded=new Set(["you"]);fanRoot="you";selected="you";visited=["you"];view="explore";term="";render(false);
  }
  root.addEventListener("click",function(event){
    var wedge=event.target.closest("[data-pp-fan]");
    if(wedge && wedge.tagName.toLowerCase()==="path"){
      remember(wedge.dataset.ppFan);render(true);return;
    }
    var btn=event.target.closest("button");if(!btn)return;
    if(btn.dataset.ppView){view=btn.dataset.ppView;render(false);return;}
    if(btn.dataset.ppExpand){
      var id=btn.dataset.ppExpand;
      if(expanded.has(id))expanded.delete(id);else expanded.add(id);
      render(true);return;
    }
    if(btn.dataset.ppFollow){expandTo(btn.dataset.ppFollow);return;}
    if(btn.dataset.ppFan){
      remember(btn.dataset.ppFan);render(true);return;
    }
    if(btn.dataset.ppSelect){remember(btn.dataset.ppSelect);render(true);return;}
    var action=btn.dataset.ppAction;
    if(action==="reset"){reset();return;}
    if(action==="exit"){hideExplorer();return;}
    if(action==="open-profile"){openPersonPage();return;}
    if(action==="follow-selected"){expandTo(selected);return;}
    if(action==="back"){if(visited.length>1){visited.pop();selected=visited[visited.length-1];render(true);}return;}
    if(action==="collapse"){expanded=new Set(["you"]);render(true);return;}
    if(action==="fan-home"){fanRoot="you";render(true);return;}
    if(action==="fan-center"){fanRoot=selected;render(false);return;}
    if(action==="one-more"){
      var visible=collectRows();
      var additions=visible.filter(function(row){return row.depth<9 && parentsOf(row.id).length && !expanded.has(row.id);}).slice(0,25);
      additions.forEach(function(row){expanded.add(row.id);});
      render(true);return;
    }
  });
  root.addEventListener("input",function(event){
    if(event.target.id==="ppFindInput"){
      term=event.target.value;
      var results=root.querySelector("#ppResults");
      if(results)results.innerHTML=searchHitsHtml();
    }
  });
  root.addEventListener("keydown",function(event){
    if((event.key==="Enter"||event.key===" ")&&event.target.dataset.ppFan){
      event.preventDefault();
      remember(event.target.dataset.ppFan);render(true);
    }
  });
  root.hidden=true;
  launch?.addEventListener("click",showExplorer);
  if(!launch || new URLSearchParams(location.search).get("view")==="ancestors"){
    showExplorer();
  }
  window.AncestryAtlasPedigreePreview={
    open:showExplorer,
    reset:reset,
    getState:function(){return {selected:selected,expanded:Array.from(expanded),fanRoot:fanRoot,view:view};},
    selectPerson:function(id,show){if(!byId.has(id))return false;expandTo(id);if(show!==false)showExplorer();return true;}
  };
})();
