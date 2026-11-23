/* Ancestry Atlas geographic index, v1.
   Only geocodes EXISTING place-summary labels. Coordinates are navigational,
   not proof of residence, exact property locations or ancestral links.
   Birth/death/census events require explicit source descriptions below.
   No automatic inference from "A → B" to an actual migration route. */
(function(root){
"use strict";
var A=[
 // Curated locality coordinates (community centers; not historical property points).
 {id:"arnstein",name:"Arnstein, Ontario",lat:45.9217,lon:-79.933,type:"locality",rx:/\barnstein\b|\bansteen\b/i},
 {id:"haarbolle",name:"Hårbølle, Møn",lat:54.896,lon:12.14,type:"locality",rx:/hårbølle|harbolle/i},
 {id:"colonia_pacheco",name:"Colonia Pacheco, Chihuahua",lat:30.0864,lon:-108.348,type:"locality",rx:/colonia pacheco/i},
 {id:"pinedale",name:"Pinedale, Arizona",lat:34.3075,lon:-110.2515,type:"locality",rx:/\bpinedale\b/i},
 {id:"woodruff",name:"Woodruff, Arizona",lat:34.7814,lon:-110.0434,type:"locality",rx:/\bwoodruff\b/i},
 {id:"mcnary",name:"McNary, Arizona",lat:34.09194,lon:-109.85472,type:"locality",rx:/\bmcnary\b/i},
 {id:"stjohns",name:"St. Johns, Arizona",lat:34.50194,lon:-109.37833,type:"locality",rx:/st\.\s*johns|saint johns/i},
 {id:"saginaw",name:"Saginaw, Michigan",lat:43.42,lon:-83.95,type:"locality",rx:/\bsaginaw\b/i},
 {id:"alpena",name:"Alpena, Michigan",lat:45.06,lon:-83.43,type:"locality",rx:/\balpena\b/i},
 {id:"mesa",name:"Mesa, Arizona",lat:33.415,lon:-111.831,type:"locality",rx:/\bmesa\b/i},
 {id:"springerville",name:"Springerville, Arizona",lat:34.13,lon:-109.288,type:"locality",rx:/\bspringerville\b/i},
 {id:"richmond_mo",name:"Richmond, Missouri",lat:39.28,lon:-93.98,type:"locality",rx:/\brichmond,\s*(?:ray county,?\s*)?missouri/i},
 {id:"gunnison",name:"Gunnison, Utah",lat:39.16,lon:-111.82,type:"locality",rx:/\bgunnison\b/i},
 {id:"salt_lake",name:"Salt Lake City, Utah",lat:40.76,lon:-111.89,type:"locality",rx:/salt lake/i},
 {id:"nauvoo",name:"Nauvoo, Illinois",lat:40.55,lon:-91.38,type:"locality",rx:/\bnauvoo\b/i},
 {id:"hanover_ny",name:"Hanover, New York",lat:42.55,lon:-79.12,type:"locality",rx:/\bhanover,\s*new york/i},
 {id:"east_hampton_ct",name:"East Hampton, Connecticut",lat:41.58,lon:-72.51,type:"locality",rx:/east hampton|chatham,\s*connecticut/i},
 {id:"saybrook_ct",name:"Saybrook, Connecticut",lat:41.29,lon:-72.38,type:"locality",rx:/\bsaybrook\b/i},
 {id:"chester_ct",name:"Chester, Connecticut",lat:41.40,lon:-72.45,type:"locality",rx:/\bchester,\s*connecticut/i},
 {id:"east_haddam_ct",name:"East Haddam, Connecticut",lat:41.45,lon:-72.46,type:"locality",rx:/east haddam/i},
 {id:"toreby",name:"Toreby, Lolland",lat:54.75,lon:11.79,type:"locality",rx:/\btoreby\b/i},
 {id:"lolland",name:"Lolland, Denmark",lat:54.77,lon:11.53,type:"region",rx:/lolland|flintinge/i},
 {id:"moen",name:"Møn, Denmark",lat:54.92,lon:12.25,type:"region",rx:/\bmøn\b|\bmoen\b|\bfanefjord\b|\bstege\b|\bmagleby\b|\bdamme\b|\bæbelnæs\b|\bebbelnæs\b|\bkokseby\b|\brøddinge\b|\bbusemarke\b|\bbudsemarke\b/i},
 {id:"oceana",name:"Oceana County, Michigan",lat:43.65,lon:-86.30,type:"region",rx:/oceana county|elbridge township|crystal township|\bcrystal,\s*mich/i},
 {id:"chihuahua",name:"Chihuahua, Mexico",lat:28.65,lon:-106.07,type:"region",rx:/\bchihuahua\b/i},
 // Broad administrative centers are intentionally approximate, and are labeled as such.
 {id:"ontario",name:"Ontario, Canada",lat:49.3,lon:-84.8,type:"region",rx:/\bontario\b/i},
 {id:"quebec",name:"Québec, Canada",lat:47.0,lon:-71.5,type:"region",rx:/\bqu[eé]bec\b|\bcompton\b|\bsherbrooke\b/i},
 {id:"michigan",name:"Michigan, USA",lat:44.4,lon:-85.4,type:"region",rx:/\bmichigan\b/i},
 {id:"arizona",name:"Arizona, USA",lat:34.2,lon:-111.7,type:"region",rx:/\barizona\b/i},
 {id:"missouri",name:"Missouri, USA",lat:38.5,lon:-92.5,type:"region",rx:/\bmissouri\b|\bboone\s*(?:co\.?|county)\b/i},
 {id:"utah",name:"Utah, USA",lat:39.3,lon:-111.7,type:"region",rx:/\butah\b/i},
 {id:"connecticut",name:"Connecticut, USA",lat:41.6,lon:-72.7,type:"region",rx:/\bconnecticut\b/i},
 {id:"kentucky",name:"Kentucky, USA",lat:37.8,lon:-85.5,type:"region",rx:/\bkentucky\b/i},
 {id:"virginia",name:"Virginia, USA",lat:37.6,lon:-78.5,type:"region",rx:/\bvirginia\b|\bloudoun\b/i},
 {id:"newyork",name:"New York, USA",lat:42.7,lon:-75.7,type:"region",rx:/\bnew york\b/i},
 {id:"illinois",name:"Illinois, USA",lat:40.2,lon:-89.3,type:"region",rx:/\billinois\b/i},
 {id:"nebraska",name:"Nebraska, USA",lat:41.5,lon:-99.8,type:"region",rx:/\bnebraska\b/i},
 {id:"massachusetts",name:"Massachusetts, USA",lat:42.3,lon:-71.9,type:"region",rx:/\bmassachusetts\b|\bconcord\b/i},
 {id:"ohio",name:"Ohio, USA",lat:40.4,lon:-82.8,type:"region",rx:/\bohio\b/i},
 {id:"germany",name:"Germany",lat:51.2,lon:10.4,type:"region",rx:/\bgermany\b/i},
 {id:"denmark",name:"Denmark",lat:56.0,lon:10.0,type:"region",rx:/\bdenmark\b|\bdanish\b/i},
 {id:"sweden",name:"Sweden",lat:62.0,lon:15.0,type:"region",rx:/\bsweden\b|\bswedish\b/i},
 {id:"england",name:"England",lat:52.5,lon:-1.8,type:"region",rx:/\bengland\b|\btaunton\b|\bsomerset\b/i},
 {id:"france",name:"France",lat:46.6,lon:2.3,type:"region",rx:/\bfrance\b|\bfrench canada\b/i},
 {id:"mexico",name:"Mexico",lat:23.7,lon:-102.5,type:"region",rx:/\bmexico\b/i},
 {id:"usa",name:"United States",lat:39.8,lon:-98.5,type:"region",rx:/\bu\.s\.?\b|\bunited states\b/i}
];
// A known historical event is never generated from coordinate matching alone.
// These assertions are bounded to explicit notes/evidence already on person pages.
var E=[
 {personId:"charles_albert",placeId:"arnstein",kind:"birth",date:"29 Mar 1897",basis:"Original 1901 Canadian census and 1918 draft registration",grade:"original"},
 {personId:"morten_peder",placeId:"haarbolle",kind:"birth",date:"24 May 1828",basis:"Original Fanefjord parish register entry 19",grade:"original"},
 {personId:"jessie_irene_aurin",placeId:"oceana",kind:"birth",date:"25 Oct 1879",basis:"Original Oceana County birth return: Crystal Township; county-level locator",grade:"original"},
 {personId:"jessie_irene_aurin",placeId:"oceana",kind:"census",date:"19 Jun 1880",basis:"Original Elbridge Township census: household residence; county-level locator",grade:"original"},
 {personId:"della_ray",placeId:"colonia_pacheco",kind:"birth",date:"13 Jun 1891",basis:"Recorded in existing Atlas biography",grade:"biography"},
 {personId:"della_ray",placeId:"mcnary",kind:"death",date:"1 Dec 1969",basis:"Recorded in existing Atlas biography",grade:"biography"},
 {personId:"james_wilford",placeId:"pinedale",kind:"birth",date:"5 Oct 1924",basis:"Recorded in existing Atlas biography",grade:"biography"},
 {personId:"jonathan_henry",placeId:"woodruff",kind:"birth",date:"21 Jun 1886",basis:"Recorded in existing Atlas biography",grade:"biography"},
 {personId:"grace_hill",placeId:"richmond_mo",kind:"birth",date:"24 Dec 1908",basis:"Atlas biography; original 1950 census gives an age requiring reconciliation",grade:"biography"},
 {personId:"marion_brenay",placeId:"saginaw",kind:"birth",date:"1923",basis:"Probable birthplace only in existing Atlas biography",grade:"provisional"},
 {personId:"james_sheldon",placeId:"stjohns",kind:"birth",date:"1943",basis:"Probable birthplace only in existing Atlas biography",grade:"provisional"},
 {personId:"jessie_irene_aurin",placeId:"sweden",kind:"parent-origin",date:"1879 record",basis:"Jessie’s original Michigan birth return records father John Auene as Sweden-born; does not establish where in Sweden",grade:"original",contextOnly:true}
];
var byId=new Map(A.map(function(a){return [a.id,a]}));
function resolveSummary(place){
  if(!place||typeof place!=="string")return [];
  var tokens=place.split(/\s*→\s*/).map(function(t){return t.trim()}).filter(Boolean);
  var hits=[];
  tokens.forEach(function(token,index){
    // Select a named locality over a state/country in the same summary segment.
    var found=A.find(function(a){return a.rx.test(token)});
    if(found&&!hits.some(function(h){return h.placeId===found.id})){
      hits.push({placeId:found.id,label:token,step:index});
    }
  });
  return hits;
}
function build(nodes,options){
  options=options||{};
  var showFrontier=!!options.includeFrontier,showCollateral=!!options.includeCollateral;
  var selected=options.personId||"";
  var persons=(Array.isArray(nodes)?nodes:[]).filter(function(p){
    if(!p||!p.id||!p.place)return false;
    if(selected&&p.id!==selected)return false;
    if(!showFrontier&&(p.confidence==="frontier"||p.confidence==="provisional"))return false;
    if(!showCollateral&&p.collateral)return false;
    return true;
  });
  var pins=new Map(),routes=[];
  function pin(placeId){var a=byId.get(placeId);if(!a)return null;
    if(!pins.has(placeId))pins.set(placeId,{id:placeId,name:a.name,lat:a.lat,lon:a.lon,type:a.type,people:[],events:[]});
    return pins.get(placeId);
  }
  persons.forEach(function(p){
    var locations=resolveSummary(p.place);
    locations.forEach(function(ref){
      var point=pin(ref.placeId);
      if(point&&!point.people.some(function(person){return person.id===p.id})){
        point.people.push({id:p.id,name:p.name,confidence:p.confidence,collateral:!!p.collateral,sourcePlace:p.place});
      }
    });
    // Dotted lines indicate summary order, never certified travel/migration.
    if(p.place.includes("→")){
      for(var i=1;i<locations.length;i++)
        if(locations[i].step>locations[i-1].step)
          routes.push({personId:p.id,from:locations[i-1].placeId,to:locations[i].placeId,
            claim:"Order of Atlas place-summary mentions; migration unverified"});
    }
  });
  E.forEach(function(e){
    var p=(Array.isArray(nodes)?nodes:[]).find(function(n){return n.id===e.personId});
    if(!p||selected&&p.id!==selected)return;
    if(!showFrontier&&(p.confidence==="frontier"||p.confidence==="provisional"))return;
    if(!showCollateral&&p.collateral)return;
    var point=pin(e.placeId);if(!point)return;
    if(!point.people.some(function(n){return n.id===p.id}))point.people.push({
      id:p.id,name:p.name,confidence:p.confidence,collateral:!!p.collateral,sourcePlace:p.place
    });
    point.events.push({personId:p.id,personName:p.name,kind:e.kind,date:e.date,basis:e.basis,grade:e.grade,contextOnly:!!e.contextOnly});
  });
  return {pins:Array.from(pins.values()),routes:routes,
    mappedPersons:persons.length,summary:"Geographic markers refer to existing Atlas records. Regional centers are approximate, not historical addresses."};
}
root.AtlasGeoPlaces=Object.freeze({catalog:A,events:E,resolveSummary:resolveSummary,build:build});
})(typeof window!=="undefined"?window:globalThis);
