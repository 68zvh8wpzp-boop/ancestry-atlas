import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {test} from "node:test";

const read=p=>readFile(new URL("../"+p,import.meta.url));
const originals=[
 {file:"assets/john-peter/james-marriage-1898.jpg",size:458082,hash:"e9ad351c99a7e90916a56f7996693dd05ce582ebe63f9a13c74447178f97ccf6"},
 {file:"assets/john-peter/peter-death-1910.jpg",size:605848,hash:"3b33baa9c6199407bd09e6a10d83933e5a21ab8c6d94cfbdb425de02a9499064"},
 {file:"assets/john-peter/peter-census-1901.jpg",size:1662636,hash:"68922eef4490e8a8760b4439b1266478f215033346764e8644a3b6fe0871be08"}
];
async function source(){
 const s=(await read("atlas-v3.9.63.html")).toString("utf8"),a=s.indexOf("const DATA = "),b=s.indexOf(";\n",a);
 assert.ok(a>=0&&b>a);
 return JSON.parse(s.slice(a+"const DATA = ".length,b));
}
test("A440 original 1898/1910/1901 manuscripts are existing byte-identical files, not re-created crops",async()=>{
 for(const x of originals){const b=await read(x.file);assert.equal(b.length,x.size,"size "+x.file);assert.equal(createHash("sha256").update(b).digest("hex"),x.hash,"hash "+x.file);}
});
test("A440: James 1898 original explicitly provides maiden name Dennis without adding speculative grandparents",async()=>{
 const d=await source();
 assert.equal(d.nodes.length,106);
 assert.equal(d.edges.length,108);
 const file="assets/john-peter/james-marriage-1898.jpg";
 const ids=["john_peter","mary_ann","ida_mae"];
 const users=d.nodes.filter(n=>(n.evidence||[]).some(e=>e.full===file)).map(n=>n.id).sort();
 assert.deepEqual(users,ids.slice().sort());
 for(const id of ids){
   const n=d.nodes.find(x=>x.id===id);assert.ok(n);
   const docs=(n.evidence||[]).filter(e=>e.full===file);
   assert.equal(docs.length,1,"one collateral record per person "+id);
   const x=docs[0];assert.equal(x.sourceLevel,"original");assert.equal(x.originalAsset,file);assert.equal(x.thumb,file);
   assert.match(x.sourceReference,/page 543/);
   assert.match(x.sourceReference,/mother's maiden name/);
   assert.match(x.transcription,/Mary Dennis/);
   assert.match(x.sourceReference,/not a transcription from this page/);
   assert.match(x.summary,/1880|son|Ida/);
 }
 const mom=d.nodes.find(n=>n.id==="mary_ann");
 assert.match(mom.note,/independent|separate corroboration/);
 assert.match(mom.note,/mother.*maiden.name|maiden-name/);
 assert.match(mom.note,/her own parents remain unknown/);
 assert.equal(d.edges.some(e=>e.a==="mary_ann"&&/loveland|dennis_parent|pierre_goulet/.test(e.b)),false);
});
test("A440: Peter Gooley's 1910 original establishes death, not his own parents or exact birth",async()=>{
 const d=await source(),file="assets/john-peter/peter-death-1910.jpg";
 const n=d.nodes.find(x=>x.id==="john_peter");
 const x=n.evidence.filter(e=>e.full===file);
 assert.equal(x.length,1);assert.equal(x[0].originalAsset,file);assert.equal(x[0].sourceLevel,"original");
 assert.match(x[0].transcription,/date of birth 'Do not Know'/);
 assert.match(x[0].transcription,/father 'Do not Know'/);
 assert.match(x[0].transcription,/mother 'Do not Know'/);
 assert.match(n.note,/cannot identify his parents/);
 assert.equal(d.nodes.filter(p=>(p.evidence||[]).some(e=>e.full===file)).length,1);
 assert.equal(d.edges.some(e=>e.a==="john_peter"&&e.b==="john_peter_goulet_1828"),false);
});
