import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {test} from "node:test";

const read=path=>readFile(new URL("../"+path,import.meta.url));
const thumb="assets/charles_albert_brunne_1901_census_full.jpg";
const master="assets/john-peter/peter-census-1901.jpg";
const ids=["charles_godfrey","charles_albert","ida_mae","john_peter","mary_ann"];
const hash="68922eef4490e8a8760b4439b1266478f215033346764e8644a3b6fe0871be08";

test("A438 corrected A440: high-resolution 1901 original master was already published at another path",async()=>{
  const publicThumb=await read(thumb),publicMaster=await read(master);
  assert.equal(publicThumb.length,467553);
  assert.equal(publicMaster.length,1662636);
  assert.equal(createHash("sha256").update(publicMaster).digest("hex"),hash);
});
test("A438/A440: five Canadian ancestors link same unchanged 1901 archival original with smaller thumbnail",async()=>{
  const html=(await read("atlas-v3.9.63.html")).toString("utf8");
  const begin=html.indexOf("const DATA = ");
  const end=html.indexOf(";\n",begin);
  assert.ok(begin>=0 && end>begin);
  const data=JSON.parse(html.slice(begin+"const DATA = ".length,end));
  assert.equal(data.nodes.length,106);
  assert.equal(data.edges.length,108);
  const owners=data.nodes.filter(n=>(n.evidence||[]).some(e=>e.full===master)).map(n=>n.id).sort();
  assert.deepEqual(owners,ids.slice().sort(),"only relevant Canadian ancestors may link to census");
  for(const id of ids){
    const n=data.nodes.find(n=>n.id===id);
    const docs=(n.evidence||[]).filter(d=>d.full===master);
    assert.equal(docs.length,1,"missing or duplicate 1901 source for "+id);
    const e=docs[0];
    assert.equal(e.thumb,thumb);
    assert.equal(e.originalAsset,master);
    assert.equal(e.kind,"document");
    assert.equal(e.sourceLevel,"original");
    assert.match(e.sourceReference,/ALREADY published/);
    assert.ok(e.sourceReference.includes(hash));
    assert.match(e.transcription,/SELECTED RECORD FIELDS ONLY/);
  }
  assert.match(data.nodes.find(n=>n.id==="john_peter").evidence.find(x=>x.full===master).summary,/United States birthplace/);
  assert.match(data.nodes.find(n=>n.id==="mary_ann").evidence.find(x=>x.full===master).summary,/does not print her maiden surname Dennis/);
  assert.match(data.nodes.find(n=>n.id==="charles_albert").evidence.find(x=>x.full===master).summary,/not an 1897 birth registration/);
  const ida=data.nodes.find(n=>n.id==="ida_mae");
  assert.ok(ida.evidence.some(x=>String(x.title).includes("original 1893 marriage return")),"original A437 preserved");
  assert.equal(ida.evidence.filter(x=>x.full&&x.kind==="document").length,4,"1880, 1893, 1898, 1901 original sources (A441)");
});
