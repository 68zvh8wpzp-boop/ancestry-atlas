import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const register=JSON.parse(await readFile(new URL('../biographies/webb-branch/research-register.json',import.meta.url),'utf8'));
const sources=JSON.parse(await readFile(new URL('../biographies/webb-branch/sources.json',import.meta.url),'utf8'));
const evidenceContract=await readFile(new URL('../PRODUCTION_CONTRACT_v3_8_22_EVIDENCE_PROMOTION.md',import.meta.url),'utf8');
const failures=[];
const sourceIds=new Set(sources.sources.map(source=>source.sourceId));

const match=html.match(/const DATA = (\{.*?\});\s*\nconst canvas/s);
if(!match){
  failures.push({kind:'canonical-data-not-found'});
}else{
  const sandbox={};
  vm.createContext(sandbox);
  vm.runInContext(`globalThis.DATA=${match[1]}`,sandbox);
  const {nodes=[],edges=[]}=sandbox.DATA;
  const ids=new Set();
  const allowed=new Set(['confirmed','strong','provisional','frontier']);
  for(const node of nodes){
    if(ids.has(node.id)) failures.push({kind:'duplicate-node-id',id:node.id});
    ids.add(node.id);
    if(!allowed.has(node.confidence)) failures.push({kind:'invalid-node-confidence',id:node.id,value:node.confidence});
  }
  for(const edge of edges){
    if(!ids.has(edge.a)||!ids.has(edge.b)) failures.push({kind:'dangling-edge',edge});
    if(!allowed.has(edge.confidence)) failures.push({kind:'invalid-edge-confidence',edge});
  }
  for(const id of register.provenTrunk){
    if(!ids.has(id)) failures.push({kind:'register-person-missing-from-graph',id});
  }
  for(const claim of register.claims){
    if(!ids.has(claim.subjectId)) failures.push({kind:'claim-subject-missing',claimId:claim.claimId,id:claim.subjectId});
    for(const id of claim.objectIds||[]){
      if(!ids.has(id)) failures.push({kind:'claim-object-missing',claimId:claim.claimId,id});
    }
    if(!claim.nextAction) failures.push({kind:'claim-next-action-missing',claimId:claim.claimId});
    if(!Array.isArray(claim.sourceRefs)) failures.push({kind:'claim-sourceRefs-invalid',claimId:claim.claimId});
    for(const sourceRef of claim.sourceRefs||[]){
      if(!sourceIds.has(sourceRef)) failures.push({kind:'claim-source-missing',claimId:claim.claimId,sourceRef});
    }
  }
}

for(const phrase of [
  'A record proving that a namesake person or couple existed does not prove that',
  'No parent-child edge may move above provisional without direct evidence',
  'A finding aid or index is a retrieval lead.',
  'The public tree and biography must stop at the last supported person.',
  'approve a new source without'
]){
  if(!evidenceContract.includes(phrase)) failures.push({kind:'evidence-promotion-contract-missing',phrase});
}

for(const phrase of ['speechSynthesis','SpeechSynthesisUtterance']){
  if(html.includes(phrase)) failures.push({kind:'browser-speech-present',phrase});
}

console.log(JSON.stringify({
  branch:register.branchId,
  baselinePackage:register.baselinePackage,
  provenTrunkCount:register.provenTrunk.length,
  claimCount:register.claims.length,
  failures
},null,2));
if(failures.length) process.exitCode=1;
