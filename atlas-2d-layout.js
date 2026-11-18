/* Pure layout for the 2D Atlas family journey. The Atlas data itself is never edited.
   Horizontal lanes: rightward means earlier generations; top is the first mapped parent line.
*/
(function(scope){
  "use strict";
  function create(data,rootId){
    rootId=rootId||"you";
    if(!data||!Array.isArray(data.nodes)||!Array.isArray(data.edges))throw Error("Missing Atlas node/edge data");
    var byId=new Map(data.nodes.map(function(n){return [n.id,n];}));
    if(!byId.has(rootId))throw Error("Mapped root absent: "+rootId);
    var parents=new Map(),edgesByKey=new Map();
    data.edges.forEach(function(e){
      if(!byId.has(e.a)||!byId.has(e.b)||e.a===e.b)return;
      if(!parents.has(e.a))parents.set(e.a,[]);
      var row=parents.get(e.a);
      if(!row.includes(e.b))row.push(e.b);
      edgesByKey.set(e.a+"|"+e.b,e);
    });
    var discovered=new Map([[rootId,{id:rootId,depth:0,order:"",from:null}]]),queue=[rootId];
    while(queue.length){
      var id=queue.shift(),base=discovered.get(id);
      var relations=parents.get(id)||[];
      relations.forEach(function(parent,index){
        if(discovered.has(parent))return;
        discovered.set(parent,{id:parent,depth:base.depth+1,order:base.order+"."+String(index).padStart(2,"0"),from:id});
        queue.push(parent);
      });
    }
    var levels=new Map();
    discovered.forEach(function(d){
      if(!levels.has(d.depth))levels.set(d.depth,[]);
      levels.get(d.depth).push(d);
    });
    var all=[],positions=new Map();
    levels.forEach(function(items,g){
      items.sort(function(a,b){return a.order<b.order?-1:a.order>b.order?1:a.id.localeCompare(b.id);});
      items.forEach(function(d,i){
        var n=byId.get(d.id);
        // Keep a minimum 142 world-unit clearance on every generation lane.
        var x=270*g,y=(i-(items.length-1)/2)*148;
        var o={id:d.id,name:n.name,years:n.years||"",place:n.place||"",branch:n.branch||"",
          collateral:!!n.collateral,confidence:n.confidence||"strong",x:x,y:y,
          generation:g,from:d.from,order:d.order,knownParents:(parents.get(d.id)||[]).length};
        positions.set(o.id,o);all.push(o);
      });
    });
    var lines=[];
    data.edges.forEach(function(e){
      var a=positions.get(e.a),b=positions.get(e.b);
      if(!a||!b||a.generation>=b.generation)return;
      lines.push({from:e.a,to:e.b,confidence:e.confidence||"strong"});
    });
    var maxX=Math.max.apply(null,all.map(function(n){return n.x;}));
    var minY=Math.min.apply(null,all.map(function(n){return n.y;}));
    var maxY=Math.max.apply(null,all.map(function(n){return n.y;}));
    var bounds={minX:-180,maxX:maxX+180,minY:minY-120,maxY:maxY+120};
    function pathTo(id){
      var p=positions.get(id),chain=[],seen=new Set();
      while(p && !seen.has(p.id)){
        seen.add(p.id);chain.push(p.id);p=p.from?positions.get(p.from):null;
      }
      return chain.reverse();
    }
    return {
      rootId:rootId,nodes:all,positions:positions,links:lines,bounds:bounds,
      maxGeneration:Math.max.apply(null,all.map(function(n){return n.generation;})),
      levels:levels,parents:parents,pathTo:pathTo
    };
  }
  var api={create:create};
  scope.Atlas2DLayout=api;
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof window!=="undefined"?window:globalThis);
