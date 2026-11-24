/* Atlas legacy-overlay containment.
 * Shared genealogy is authoritative only in atlas-canonical-family-data.js.
 * Certain historical layers retain guarded write calls for older releases.
 * Freeze those exact code bytes and prevent any NEW loaded script from adding
 * people or relationships without an explicit data migration and audit.
 */
import {readFileSync,existsSync} from "node:fs";
import {createHash} from "node:crypto";
import {fileURLToPath} from "node:url";
import {resolve,dirname} from "node:path";
const ROOT=dirname(fileURLToPath(import.meta.url));
const read=(p)=>readFileSync(resolve(ROOT,p),"utf8");
const digest=(p)=>{const bytes=readFileSync(resolve(ROOT,p));return createHash("sha1").update("blob "+bytes.length+"\0").update(bytes).digest("hex");};
export function scriptPaths(source){
  // Applies to literal script tags in HTML and document.write legacy loaders.
  return [...source.matchAll(/<script\b[^>]*\bsrc=["']([^"']+\.js)(?:\?[^"']*)?["']/g)].map(x=>x[1].replace(/^\.\//,""));
}
export function structuralWrites(js){
  const matches=[];
  const direct=/(?:\bDATA\.(?:nodes|edges)|\b(?:nodes|edges))\.(?:push|splice|pop|shift|unshift)\s*\(/g;
  for(const m of js.matchAll(direct)){
    // Ignore unrelated local arrays, but catch aliased canonical arrays.
    if(/^(?:nodes|edges)\./.test(m[0])&&!/\b(?:const|let|var)\s+(?:nodes|edges)\s*=\s*DATA\.(?:nodes|edges)\b/.test(js))continue;
    matches.push({offset:m.index,action:m[0]});
  }
  if(/\bDATA\.(?:nodes|edges)\s*=(?!=)/.test(js))matches.push({offset:0,action:"replaces canonical graph array"});
  return matches;
}
export function verifyLegacyOverlays({
  pages=[read("atlas-v3.9.63.html"),read("atlas-2d-journey-preview.html")],
  manifest=JSON.parse(read("data/atlas-legacy-overlay-writers.json")),
  load=read,sha=digest
}={}){
  const errors=[],scripts=new Set(),visited=new Set(),writers=[];
  function add(path){
    if(/^(?:https?:|\/\/|data:)/i.test(path)||path.startsWith("/")||path.includes("..")){
      errors.push("Unsafe loaded script path: "+path);return;
    }
    scripts.add(path);
    if(visited.has(path))return;
    visited.add(path);
    let source;
    try{source=load(path);}
    catch(error){errors.push("Active Atlas script missing: "+path);return;}
    for(const nested of scriptPaths(source))add(nested);
  }
  pages.forEach(p=>scriptPaths(p).forEach(add));
  const allowed=new Map((manifest.writers||[]).map(w=>[w.path,w]));
  if(manifest.schema!==1)errors.push("Legacy overlay policy version missing");
  for(const path of scripts){
    if(path==="atlas-canonical-family-data.js")continue;
    const js=load(path),hits=structuralWrites(js);
    if(!hits.length)continue;
    writers.push(path);
    const exception=allowed.get(path);
    if(!exception)errors.push("Unexpected live genealogy writer: "+path+" ("+hits.map(h=>h.action).join(", ")+")");
    else{
      if(!exception.reason||exception.reason.length<25)errors.push("Undocumented legacy writer: "+path);
      if(sha(path)!==exception.gitBlobSha)errors.push("Legacy relationship writer bytes changed without review: "+path);
    }
  }
  for(const path of allowed.keys())if(!writers.includes(path))
    errors.push("Stale legacy genealogy-writer exception: "+path+" (retire the permission if migration removed the write)");
  return {errors,writers:writers.sort(),scriptsChecked:scripts.size};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const result=verifyLegacyOverlays();
  console.log(JSON.stringify(result,null,2));
  if(result.errors.length)process.exitCode=1;
}
