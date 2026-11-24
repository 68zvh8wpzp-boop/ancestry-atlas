import {readFileSync} from "node:fs";
import vm from "node:vm";
const base=new URL("../",import.meta.url);
export function canonicalGraph(){
  const source=readFileSync(new URL("atlas-canonical-family-data.js",base),"utf8");
  const context={window:{}};
  vm.runInNewContext(source,context,{timeout:8000});
  if(!context.window.AtlasCanonicalGraph)throw new Error("Missing canonical Atlas graph");
  return context.window.AtlasCanonicalGraph.read();
}
export function installCanonical(sandbox){
  const source=readFileSync(new URL("atlas-canonical-family-data.js",base),"utf8");
  vm.runInNewContext(source,sandbox,{timeout:8000});
  return sandbox.window.AtlasCanonicalGraph.read();
}
