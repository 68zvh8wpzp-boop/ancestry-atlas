/* Atlas person lookup, 2026-11-22. Search only: never add people, aliases, or family links.
   Conservative close-spelling matches are suggestions, not identity claims. */
(function(root){
 "use strict";
 function normalize(value){
   return String(value==null?"":value).normalize("NFKD")
     .replace(/[\u0300-\u036f]/g,"").replace(/ß/g,"ss").replace(/æ/g,"ae")
     .replace(/œ/g,"oe").replace(/ø/g,"o").replace(/[^a-zA-Z0-9]+/g," ")
     .toLowerCase().replace(/\s+/g," ").trim();
 }
 function valueStrings(value){
   if(Array.isArray(value))return value.flatMap(valueStrings);
   if(typeof value==="string"||typeof value==="number")return [String(value)];
   return [];
 }
 function distance(a,b,limit){
   if(a===b)return 0;
   if(Math.abs(a.length-b.length)>limit)return limit+1;
   var prev=Array.from({length:b.length+1},function(_,i){return i});
   for(var i=1;i<=a.length;i++){
     var row=[i],rowMin=i;
     for(var j=1;j<=b.length;j++){
       var cost=a[i-1]===b[j-1]?0:1;
       var v=Math.min(prev[j]+1,row[j-1]+1,prev[j-1]+cost);
       row.push(v);if(v<rowMin)rowMin=v;
     }
     if(rowMin>limit)return limit+1;
     prev=row;
   }
   return prev[b.length];
 }
 function tokenScore(query,token){
   if(token===query)return 0;
   if(query.length>=3&&token.startsWith(query))return 2;
   // Only complete, moderately long tokens may be approximate.
   if(query.length>=5&&token.length>=4){
     var cap=query.length>=8?2:1;
     var d=distance(query,token,cap);
     if(d<=cap)return 8+d*4;
   }
   return Infinity;
 }
 function nameMatch(query,name){
   var nameNorm=normalize(name);
   if(!nameNorm)return null;
   if(query===nameNorm)return {score:0,kind:"exact"};
   if(nameNorm.startsWith(query))return {score:1,kind:"name"};
   if(nameNorm.includes(query))return {score:3,kind:"name"};
   var parts=query.split(" "),words=nameNorm.split(" ");
   var costs=parts.map(function(part){
     return words.reduce(function(best,word){return Math.min(best,tokenScore(part,word));},Infinity);
   });
   if(costs.some(function(x){return !Number.isFinite(x);}))return null;
   var close=costs.some(function(x){return x>=8;});
   return {score:12+costs.reduce(function(a,b){return a+b;},0),kind:close?"close-spelling":"name"};
 }
 function match(node,term){
   var q=normalize(term);
   if(!q)return null;
   var names=[node.name].concat(
     valueStrings(node.aliases),valueStrings(node.alternateNames),valueStrings(node.surnameHypothesis)
   );
   var best=null;
   names.forEach(function(name,i){
     var hit=nameMatch(q,name);
     if(!hit)return;
     var candidate={node:node,score:hit.score+(i?8:0),kind:i?(hit.kind==="close-spelling"?"close-spelling":"alternate-name"):hit.kind};
     if(!best||candidate.score<best.score)best=candidate;
   });
   var other=normalize([node.years,node.place,node.branch].filter(Boolean).join(" "));
   if(other.includes(q)){
     var info={node:node,score:65,kind:"record-details"};
     if(!best||info.score<best.score)best=info;
   }
   return best;
 }
 function search(nodes,term,limit){
   if(!Array.isArray(nodes)||!normalize(term))return [];
   var results=nodes.map(function(n){return match(n,term);}).filter(Boolean);
   results.sort(function(a,b){return a.score-b.score||String(a.node.name).localeCompare(String(b.node.name));});
   return Number.isInteger(limit)&&limit>0?results.slice(0,limit):results;
 }
 function relationLabel(node,allData){
   if(node.id==="you")return "You";
   if(node.collateral)return "Collateral relative or record";
   if(node.confidence==="frontier")return "Research frontier — not established";
   if(node.confidence==="provisional")return "Provisional ancestry — verify links";
   var edges=Array.isArray(allData?.edges)?allData.edges:[];
   var parent=new Map();
   edges.forEach(function(e){
     if(!parent.has(e.a))parent.set(e.a,[]);
     parent.get(e.a).push(e);
   });
   var queue=[{id:"you",unproved:false}],seen=new Set(["you"]);
   for(var i=0;i<queue.length;i++){
     var cur=queue[i];
     for(var e of parent.get(cur.id)||[]){
       if(seen.has(e.b))continue;
       var unproved=cur.unproved||e.confidence==="provisional"||e.confidence==="frontier";
       if(e.b===node.id)return unproved?"Proposed ancestor — link unproven":"Mapped direct ancestor";
       seen.add(e.b);queue.push({id:e.b,unproved:unproved});
     }
   }
   return "Not on mapped direct line";
 }
 root.AtlasPersonSearch=Object.freeze({normalize:normalize,search:search,match:match,relationLabel:relationLabel});
})(window);
