import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";
import vm from "node:vm";

const read=name=>readFile(new URL("../"+name,import.meta.url),"utf8");
async function library(){
  const source=await read("atlas-person-search.js");
  const context={window:{}};
  vm.runInNewContext(source,context);
  return context.window.AtlasPersonSearch;
}
async function genealogy(){
  const html=await read("atlas-v3.9.63.html");
  const i=html.indexOf("const DATA = "),j=html.indexOf(";\n",i);
  assert.ok(i>=0&&j>i,"Original atlas dataset must remain accessible");
  return JSON.parse(html.slice(i+"const DATA = ".length,j));
}
test("close-name suggestions recover historically spelled Atlas names",async()=>{
  const [api,data]=await Promise.all([library(),genealogy()]);
  const lookup=(query)=>api.search(data.nodes,query,100);
  const dorthea=data.nodes.find(person=>person.id==="dorthea_jensen");
  assert.equal(dorthea.name,"Dorthea Jensen Mortensen");
  assert.ok(lookup("Dorthea Jensen").matches.some(hit=>hit.person.id===dorthea.id&&!hit.approximate));
  assert.ok(lookup("Dorothea Jensen").matches.some(hit=>hit.person.id===dorthea.id&&hit.approximate));
  assert.ok(lookup("Dorothea").matches.some(hit=>hit.person.id===dorthea.id&&hit.approximate));
  assert.ok(!lookup("Dorothea").matches.some(hit=>hit.person.name==="James Sheldon Webb"));
  assert.equal(api.normalize("Aurén"),"auren");
  assert.equal(api.search(data.nodes,"  ",60).total,0);
  assert.ok(lookup("Ontario").matches.length>0);
});
test("matching suggestions do not modify people, relationships or evidence",async()=>{
  const [api,data]=await Promise.all([library(),genealogy()]);
  const before=JSON.stringify(data);
  for(const q of ["Dorothea","Dorthea","Jensen","Brunne","Auren","Ontario","1827"]){
    api.search(data.nodes,q,100);
  }
  assert.equal(JSON.stringify(data),before);
  const edited=api.search([{id:"one",name:"Dorthea Jensen"}],"Dorothea");
  assert.equal(edited.matches[0].approximate,true);
  assert.equal(edited.matches[0].reason,"Possible spelling match");
  assert.equal(edited.total,1);
});
test("all family access paths share the name search and clear return destinations",async()=>{
  const [html,explorer,nav,map,mapHTML,oldMobile,css]=await Promise.all([
    read("atlas-v3.9.63.html"),read("iphone-ancestry-explorer-preview.js"),
    read("atlas-navigation-20261122.js"),read("atlas-2d-map.js"),
    read("atlas-2d-journey-preview.html"),read("mobile-hybrid-navigation-20261117.js"),
    read("atlas-navigation-20261122.css")
  ]);
  assert.match(html,/atlas-person-search\.js/);
  assert.match(mapHTML,/atlas-person-search\.js/);
  assert.ok(html.indexOf("atlas-person-search.js")<html.indexOf("iphone-ancestry-explorer-preview.js"));
  assert.ok(mapHTML.indexOf("atlas-person-search.js")<mapHTML.indexOf('atlas-2d-map.js'));
  for(const js of [explorer,nav,map,oldMobile])assert.match(js,/AtlasPersonSearch/);
  for(const js of [explorer,nav,map,oldMobile])assert.doesNotThrow(()=>new vm.Script(js));
  assert.match(html,/function findAtlasNameMatches\(/);
  assert.match(explorer,/Possible spelling match — verify identity/);
  assert.match(nav,/Possible spelling match — verify identity/);
  assert.match(map,/Possible spelling match — verify identity/);
  assert.match(nav,/showFamily\(\);if\(typeof openAlbum==="function"\)openAlbum/);
  assert.match(css,/#aaPrimaryNav/);
});
