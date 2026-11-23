/* Atlas person-name close matching (presentation only).
 * No genealogical identity merging: every hit retains its existing node ID.
 * Usable by the 3-D Atlas, mobile navigator, Ancestor Explorer, and 2-D map.
 */
(function(scope){
  "use strict";
  function normalize(value){
    return String(value==null?"":value)
      .replace(/[Ææ]/g,"ae").replace(/[Øø]/g,"o").replace(/[Åå]/g,"a")
      .replace(/[ß]/g,"ss").normalize("NFKD")
      .replace(/[\u0300-\u036f]/g,"").toLowerCase()
      .replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
  }
  function variants(person){
    var result=[person.name],keys=["aliases","alternateNames","nameVariants","maidenName","surnameHypothesis"];
    keys.forEach(function(key){
      var v=person[key];
      if(Array.isArray(v))v.forEach(function(s){if(s)result.push(s);});
      else if(typeof v==="string"&&v)result.push(v);
    });
    return result;
  }
  function distance(a,b,limit){
    if(Math.abs(a.length-b.length)>limit)return limit+1;
    var prev=Array.from({length:b.length+1},function(_,i){return i;});
    for(var i=1;i<=a.length;i++){
      var row=[i],small=i;
      for(var j=1;j<=b.length;j++){
        var v=Math.min(row[j-1]+1,prev[j]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
        row[j]=v;if(v<small)small=v;
      }
      if(small>limit)return limit+1;
      prev=row;
    }
    return prev[b.length];
  }
  function closeTokens(candidate,query){
    var words=candidate.split(" "),terms=query.split(" "),used=new Set(),penalty=0,edits=0;
    for(var t=0;t<terms.length;t++){
      var term=terms[t],best=Infinity,bestIndex=-1,bestEdit=0;
      for(var i=0;i<words.length;i++){
        if(used.has(i))continue;
        var word=words[i],cost=Infinity,edit=0;
        if(word===term)cost=0;
        else if(term.length>=2&&word.startsWith(term))cost=1;
        else {
          var limit=term.length>=7?2:term.length>=4?1:0;
          if(limit){
            var d=distance(term,word,limit);
            if(d<=limit){cost=5*d;edit=d;}
          }
        }
        if(cost<best){best=cost;bestIndex=i;bestEdit=edit;}
      }
      if(bestIndex<0||best===Infinity)return null;
      used.add(bestIndex);penalty+=best;edits+=bestEdit;
    }
    if(!edits && penalty===0)return {score:10,kind:"tokens",label:""};
    return {score:20+penalty,kind:edits?"close":"tokens",label:edits?"Close spelling":""};
  }
  function match(person,query){
    var q=normalize(query);if(!q||!person)return null;
    var best=null;
    variants(person).forEach(function(variant,i){
      var value=normalize(variant);if(!value)return;
      var result=null,offset=i?4:0;
      if(value===q)result={score:i?1:0,kind:i?"alias":"exact",label:i?"Alternative name":""};
      else if(value.startsWith(q))result={score:i?3:2,kind:i?"alias":"prefix",label:i?"Alternative name":""};
      else if(value.includes(q))result={score:i?5:4,kind:i?"alias":"contains",label:i?"Alternative name":""};
      else {
        var fuzzy=closeTokens(value,q);
        if(fuzzy)result={score:fuzzy.score+offset,kind:fuzzy.kind,label:fuzzy.label||(i?"Alternative name":"")};
      }
      if(result&&(!best||result.score<best.score))best=result;
    });
    var context=normalize([person.years,person.place,person.branch].join(" "));
    if(context&&q.length>=3&&context.includes(q)){
      var alternative={score:70,kind:"context",label:"Year, place or branch"};
      if(!best||alternative.score<best.score)best=alternative;
    }
    return best;
  }
  function search(nodes,query,limit){
    if(!normalize(query))return [];
    return (nodes||[]).map(function(person){
      var result=match(person,query);
      return result?Object.assign({person:person},result):null;
    }).filter(Boolean).sort(function(a,b){
      return a.score-b.score||String(a.person.name).localeCompare(String(b.person.name));
    }).slice(0,limit==null?30:limit);
  }
  var api={normalize:normalize,match:match,search:search};
  scope.AtlasPersonSearch=api;
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof window!=="undefined"?window:globalThis);
