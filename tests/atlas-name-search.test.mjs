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
test("single People search uses one evidence-preserving name index",async()=>{
 const [main,shell,map,mapHTML]=await Promise.all([
   read("atlas-v3.9.63.html"),read("atlas-four-doors-20261123.js"),
   read("atlas-2d-map.js"),read("atlas-2d-journey-preview.html")
 ]);
 assert.match(main,/atlas-person-search\.js/);
 assert.match(mapHTML,/atlas-person-search\.js/);
 assert.ok(main.indexOf("atlas-person-search.js")<main.indexOf("atlas-four-doors-20261123.js"));
 assert.ok(mapHTML.indexOf("atlas-person-search.js")<mapHTML.indexOf("atlas-2d-map.js"));
 assert.match(shell,/AtlasPersonSearch\.search\(atlas\.nodes,term,100\)/);
 assert.match(shell,/Possible spelling match — verify identity/);
 assert.match(map,/Possible spelling match — verify identity/);
 assert.match(shell,/openProfile\(b\.dataset\.aaPerson,"people"\)/);
 assert.doesNotThrow(()=>new vm.Script(shell));
 assert.ok(!/data\.nodes\.(push|splice)|data\.edges\.(push|splice)/.test(shell));
});
