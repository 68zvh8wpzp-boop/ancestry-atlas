import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {test} from "node:test";

const read=path=>readFile(new URL("../"+path,import.meta.url));
const full="assets/charles-godfrey/charles-ida-marriage-1893.jpg";
const expectedHash="ddcc0efcfd07e100e11e0bebb1ec3d9d96568ecd85d4a047142245b0be6a824f";
const ids=["charles_godfrey","ida_mae","john_peter","mary_ann"];

test("A437: actual original 1893 Alpena original bytes are identical to preserved source",async()=>{
  const original=await read(full);
  assert.equal(original.length,3654320);
  assert.equal(createHash("sha256").update(original).digest("hex"),expectedHash);
});

test("A437: exactly four direct-ancestor person pages reference the one existing master",async()=>{
  const html=(await read("atlas-v3.9.63.html")).toString("utf8");
  const begin=html.indexOf("const DATA = ");
  const end=html.indexOf(";\n",begin);
  assert.ok(begin>=0 && end>begin);
  const data=JSON.parse(html.slice(begin+"const DATA = ".length,end));
  assert.equal(data.nodes.length,106);
  assert.equal(data.edges.length,108);
  const expected=new Set(ids);
  for(const id of ids){
    const n=data.nodes.find(x=>x.id===id);
    assert.ok(n,"missing person "+id);
    const matches=(n.evidence||[]).filter(x=>x.full===full);
    assert.equal(matches.length,1,"exactly one original document link on "+id);
    const x=matches[0];
    assert.equal(x.thumb,x.full);
    assert.equal(x.originalAsset,x.full);
    assert.equal(x.sourceLevel,"original");
    assert.equal(x.kind,"document");
    assert.match(x.sourceReference,/SHA-256/);
    assert.match(x.sourceReference,/Mary A[.] Gooley/);
    assert.match(x.transcription,/SELECTED ORIGINAL ENTRY 820 FIELDS/);
    assert.ok(!x.transcription.includes("FULL-PAGE TRANSCRIPTION"));
  }
  const refUsers=data.nodes.filter(n=>(n.evidence||[]).some(e=>e.full===full)).map(n=>n.id);
  assert.deepEqual(refUsers.sort(),ids.slice().sort(),"no unrelated ancestors linked to the 1893 wedding");
  const mary=data.nodes.find(n=>n.id==="mary_ann");
  assert.match(mary.note,/does not independently prove the maiden surname Dennis/);
  const ida=data.nodes.find(n=>n.id==="ida_mae");
  assert.match(ida.note,/age 20 \(not 18/);
  assert.equal(data.edges.some(e=>e.a==="john_peter"&&e.b==="john_peter_goulet_1828"),false);
  const imageEvidence=data.nodes.flatMap(n=>(n.evidence||[]).filter(x=>x.full===full));
  assert.equal(imageEvidence.length,4);
});
