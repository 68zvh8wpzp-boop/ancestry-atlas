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
      var needsReview=["chauncey_webb","ann_eliza_webb","brigham_young","eliza_jane_churchill"].includes(id);
      return {
        person:person,
        parents:parentIds.map(function(p){return people.get(p);}),
        coParents:coParentIds.map(function(p){return people.get(p);}),
        children:childIds.map(function(c){return people.get(c);}),
        needsReview:needsReview,
        childCount:childIds.length,
        isCollateral:!!person.collateral
      };
    }
    return {family:family,hasPerson:function(id){return people.has(id);},people:people,parents:parents,children:children};
  }
  scope.Atlas2DFamily={create:create};
  if(typeof module!=="undefined"&&module.exports)module.exports={create:create};
})(typeof window!=="undefined"?window:globalThis);
