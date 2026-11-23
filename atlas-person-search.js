/* Shared person-name search for Atlas navigation.
   Read-only: suggestions never merge identities or rewrite genealogy.
   Matches common spelling variations only against names and documented aliases. */
(function(root){
  "use strict";
  function normalize(value){
    return String(value==null?"":value).normalize("NFKD").replace(/[\u0300-\u036f]/g,"")
      .replace(/æ/g,"ae").replace(/Æ/g,"ae").replace(/[øö]/g,"o").replace(/[ØÖ]/g,"o")
      .replace(/ß/g,"ss").replace(/[ðÐ]/g,"d").replace(/[þÞ]/g,"th")
      .toLowerCase().replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim();
  }
  function valueText(value){
    if(Array.isArray(value))return value.map(valueText).join(" ");
    if(value&&typeof value==="object")return Object.values(value).map(valueText).join(" ");
    return value==null?"":String(value);
  }
  function namesFor(person){
    return [valueText(person.name),valueText(person.aliases),valueText(person.alternateNames),
      valueText(person.surnameHypothesis),valueText(person.nameVariants)].filter(Boolean);
  }
  function editDistance(a,b,limit){
    if(Math.abs(a.length-b.length)>limit)return limit+1;
    if(a===b)return 0;
    // Optimal-string-alignment edits: insert, delete, substitute and adjacent transpose.
    var previous2=null,previous=Array.from({length:b.length+1},(_,i)=>i);
    for(var i=1;i<=a.length;i++){
      var row=[i],minimum=i;
      for(var j=1;j<=b.length;j++){
        var cost=a[i-1]===b[j-1]?0:1;
        var d=Math.min(previous[j]+1,row[j-1]+1,previous[j-1]+cost);
        if(previous2&&i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1]){
          d=Math.min(d,previous2[j-2]+1);
        }
        row.push(d);minimum=Math.min(minimum,d);
      }
      if(minimum>limit)return limit+1;
      previous2=previous;previous=row;
    }
    return previous[b.length];
  }
  function score(person,input){
    var q=normalize(input);
    if(!q)return null;
    var name=normalize(person.name),aliases=normalize(namesFor(person).slice(1).join(" "));
    var other=normalize([person.years,person.place,person.branch].join(" "));
    if(name===q)return {score:0,approximate:false,reason:"Exact name"};
    if(name.startsWith(q))return {score:1,approximate:false,reason:"Name starts with search"};
    if(name.includes(q))return {score:2,approximate:false,reason:"Name contains search"};
    if(aliases&&aliases.includes(q))return {score:3,approximate:false,reason:"Recorded name variant"};
    if(other.includes(q))return {score:5,approximate:false,reason:"Matching date, place or branch"};
    // Names only from here. Never use fuzzy matching to invent a place, date or family link.
    var terms=q.split(" ").filter(Boolean);
    var words=Array.from(new Set((name+" "+aliases).split(" ").filter(Boolean)));
    if(!terms.length||!words.length)return null;
    var approximate=0,prefix=0;
    for(var i=0;i<terms.length;i++){
      var term=terms[i];
      if(words.includes(term))continue;
      if(term.length>=2&&words.some(function(w){return w.startsWith(term)})){prefix++;continue;}
      if(term.length<5)return null;
      var maximum=term.length>=10?2:1;
      var nearby=words.some(function(w){return w.length>=4&&editDistance(term,w,maximum)<=maximum;});
      if(!nearby)return null;
      approximate++;
    }
    return {score:approximate?12+approximate*2+prefix:6+prefix,
      approximate:approximate>0,
      reason:approximate?"Possible spelling match":"Name tokens match"};
  }
  function search(records,input,maxResults){
    var q=normalize(input);
    if(!q)return {matches:[],total:0,approximateCount:0};
    var rows=(Array.isArray(records)?records:[]).map(function(person){
      var m=score(person,q);return m?{person:person,score:m.score,approximate:m.approximate,reason:m.reason}:null;
    }).filter(Boolean);
    rows.sort(function(a,b){
      return a.score-b.score||String(a.person.name).localeCompare(String(b.person.name))||
        String(a.person.id).localeCompare(String(b.person.id));
    });
    var n=Number.isInteger(maxResults)&&maxResults>0?maxResults:55;
    return {matches:rows.slice(0,n),total:rows.length,
      approximateCount:rows.filter(function(x){return x.approximate}).length};
  }
  root.AtlasPersonSearch=Object.freeze({normalize:normalize,score:score,search:search});
})(typeof window!=="undefined"?window:globalThis);
