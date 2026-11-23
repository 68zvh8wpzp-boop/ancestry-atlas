import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {test} from "node:test";

const read=path=>readFile(new URL("../"+path,import.meta.url));
const file="assets/charles_albert_brunne_1901_census_full.jpg";
const ids=["charles_godfrey","charles_albert","ida_mae","john_peter","mary_ann"];
const fullMasterSHA="68922eef4490e8a8760b4439b1266478f215033346764e8644a3b6fe0871be08";

test("A438 publishes existing viewable 1901 original-page rendition, not the private high-res master",async()=>{
  const published=await read(file);
  assert.equal(published.length,467553,"do not silently replace existing published 1901 page image");
});

test("A438: five direct ancestors point to the existing 1901 original page with correct source separation",async()=>{
  const html=(await read("atlas-v3.9.63.html")).toString("utf8");
  const start=html.indexOf("const DATA = ");
  const end=html.indexOf(";\n",start);
  assert.ok(start>=0&&end>start);
  const data=JSON.parse(html.slice(start+"const DATA = ".length,end));
  assert.equal(data.nodes.length,106);
  assert.equal(data.edges.length,108);
  const owners=data.nodes.filter(n=>(n.evidence||[]).some(e=>e.full===file)).map(n=>n.id).sort();
  assert.deepEqual(owners,ids.slice().sort(),"source only belongs on relevant ancestor pages");
  for(const id of ids){
    const n=data.nodes.find(n=>n.id===id);
    const docs=(n.evidence||[]).filter(d=>d.full===file);
    assert.equal(docs.length,1,"missing or duplicated 1901 evidence for "+id);
    const e=docs[0];
    assert.equal(e.thumb,file);
    assert.equal(e.kind,"document");
    assert.match(e.sourceReference,/not byte-identical|NOT byte-identical/i);
    assert.ok(e.sourceReference.includes(fullMasterSHA));
    assert.match(e.transcription,/SELECTED RECORD FIELDS ONLY/);
    assert.ok(!e.originalAsset,"published rendition is not exact private original master");
  }
  assert.match(data.nodes.find(n=>n.id==="john_peter").evidence.find(x=>x.full===file).summary,/United States birthplace/);
  assert.match(data.nodes.find(n=>n.id==="mary_ann").evidence.find(x=>x.full===file).summary,/does not print her maiden surname Dennis/);
  assert.match(data.nodes.find(n=>n.id==="charles_albert").evidence.find(x=>x.full===file).summary,/not an 1897 birth registration/);
  const ida=data.nodes.find(n=>n.id==="ida_mae");
  assert.ok(ida.evidence.some(x=>String(x.title).includes("original 1893 marriage return")),"preserve prior original A437");
  assert.equal(ida.evidence.filter(x=>x.full&&x.kind==="document").length,2);
});
