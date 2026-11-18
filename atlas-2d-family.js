/* A read-only, evidence-conservative immediate family projection.
   Parent links from the Atlas run from child (a) to parent (b).
   Co-parent does NOT automatically mean spouse or established marriage.
   Three known misdirected collateral links are NOT interpreted as parentage here;
   they remain unchanged in the original source pending a separate evidence audit.
*/
(function(scope){
  "use strict";
  var invalidAsParent=new Set([
    "chauncey_webb|eliza_jane_churchill",
    "chauncey_webb|ann_eliza_webb",
    "ann_eliza_webb|brigham_young"
  ]);
  function create(data){
    if(!data||!Array.isArray(data.nodes)||!Array.isArray(data.edges))throw Error("Expected Atlas snapshot");
    var people=new Map(data.nodes.map(function(n){return [n.id,n];}));
    var parents=new Map(),children=new Map();
    function append(map,a,b){
      if(!map.has(a))map.set(a,[]);
      var list=map.get(a);
      if(!list.includes(b))list.push(b);
    }
    data.edges.forEach(function(edge){
      if(!people.has(edge.a)||!people.has(edge.b)||edge.a===edge.b)return;
      if(invalidAsParent.has(edge.a+"|"+edge.b))return;
      append(parents,edge.a,edge.b);
      append(children,edge.b,edge.a);
    });
    // Siblings are people sharing one or more explicitly mapped parents.
    // Two shared parents means "both mapped parents"; a single shared parent
    // never, by itself, proves that the siblings have different other parents.
    function siblingsOf(id){
      var parentIds=parents.get(id)||[];
      var seen=new Set(),ids=[];
      parentIds.forEach(function(parentId){
        (children.get(parentId)||[]).forEach(function(childId){
          if(childId===id||seen.has(childId))return;
          seen.add(childId);ids.push(childId);
        });
      });
      return ids.map(function(otherId){
        var otherParents=parents.get(otherId)||[];
        var sharedParentIds=parentIds.filter(function(parentId){return otherParents.includes(parentId);});
        var sharesAllMappedParents=parentIds.length===2&&otherParents.length===2&&sharedParentIds.length===2;
        return {
          person:people.get(otherId),
          sharedParents:sharedParentIds.map(function(p){return people.get(p);}),
          label:sharesAllMappedParents?"Both mapped parents":sharedParentIds.length===1?
            "Shared parent: "+people.get(sharedParentIds[0]).name:
            "Shares "+sharedParentIds.length+" mapped parents"
        };
      });
    }
    function family(id){
      var person=people.get(id);
      if(!person)return null;
      var parentIds=parents.get(id)||[];
      var childIds=children.get(id)||[];
      var coParentIds=[];
      childIds.forEach(function(child){
        (parents.get(child)||[]).forEach(function(p){
          if(p!==id && !coParentIds.includes(p))coParentIds.push(p);
        });
      });
      // Partition children by the exact set of their other mapped parents.
      // This supports multiple contemporaneous family groups without assuming
      // that a shared child documents a marriage or that every spouse had children.
      var grouped=new Map();
      childIds.forEach(function(childId){
        var otherIds=Array.from(new Set(parents.get(childId)||[])).filter(function(p){return p!==id;}).sort();
        var key=otherIds.length?otherIds.join("|"):"__no_other_parent_mapped__";
        if(!grouped.has(key)){
          grouped.set(key,{id:key,otherParents:otherIds.map(function(p){return people.get(p);}),children:[],parentageNeedsReview:otherIds.length>1});
        }
        grouped.get(key).children.push(people.get(childId));
      });
      var childGroups=Array.from(grouped.values());
      var needsReview=["chauncey_webb","ann_eliza_webb","brigham_young","eliza_jane_churchill"].includes(id);
      return {
        person:person,
        parents:parentIds.map(function(p){return people.get(p);}),
        coParents:coParentIds.map(function(p){return people.get(p);}),
        children:childIds.map(function(c){return people.get(c);}),
        siblings:siblingsOf(id),
        siblingCount:siblingsOf(id).length,
        childGroups:childGroups,
        needsReview:needsReview,
        childCount:childIds.length,
        isCollateral:!!person.collateral
      };
    }
    return {family:family,siblingsOf:siblingsOf,hasPerson:function(id){return people.has(id);},people:people,parents:parents,children:children};
  }
  scope.Atlas2DFamily={create:create};
  if(typeof module!=="undefined"&&module.exports)module.exports={create:create};
})(typeof window!=="undefined"?window:globalThis);
