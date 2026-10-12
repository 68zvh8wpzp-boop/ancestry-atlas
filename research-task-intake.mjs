import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

export function assessTask(d,{recordId,sourceKey,owner,action}){
 const result=(decision,reason,taskId=null)=>({decision,reason,recordId:recordId||null,taskId});
 if(!['chat','work'].includes(owner))return result('BLOCK','Specify chat or work as the accountable owner');
 if(typeof action!=='string'||!action)return result('BLOCK','Specify the exact research action');
 if(!recordId&&!sourceKey)return result('BLOCK','Specify a registered record ID or exact source key');
 const records=d.records||[];
 const matches=recordId?records.filter(r=>r.id===recordId):
  records.filter(r=>(r.sourceKeys||[]).some(k=>k.toLowerCase()===String(sourceKey).toLowerCase()));
 if(matches.length!==1)return result('HOLD','No unique registered source. Reconcile latest original audits, saved Library files and Atlas gallery FIRST; do not treat absence as novelty');
 const record=matches[0];recordId=record.id;
 if(sourceKey&&!(record.sourceKeys||[]).some(k=>k.toLowerCase()===String(sourceKey).toLowerCase()))
  return result('BLOCK','Source key does not belong to this registered record');
 if(['examined','saved','published'].includes(record.status)&&
   ['find-record','inspect-original','audit-sources'].includes(action))
  return result('BLOCK','Original already inspected; use a specific documented targeted-reexamination task only for genuinely new evidence');
 if(['saved','published'].includes(record.status)&&action==='capture-original')
  return result('BLOCK','Authoritative source already saved; establish a specific new image-quality gap');
 const active=(d.tasks||[]).filter(t=>t.recordId===record.id&&t.state!=='paused');
 if(active.length>1)return result('BLOCK','Conflicting active/queued tasks detected; resolve registry first');
 if(active.length===1){
  const t=active[0];
  if(t.owner!==owner)return result('BLOCK','Record is owned by parallel '+t.owner+' workstream; hand off instead of starting');
  if(t.action!==action)return result('BLOCK','Existing task '+t.id+' has different action; reconcile before proceeding');
  return result('CONTINUE_EXISTING','Proceed only within existing task '+t.id+' after refreshing latest GitHub and Library checkpoints',t.id);
 }
 return result('HOLD','Registered source has no assigned active task. First add one validated task, novelty and owner to the source register');
}

if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
 const d=JSON.parse(readFileSync(new URL('./RESEARCH_SOURCE_REGISTRY.json',import.meta.url),'utf8'));
 const args={};
 for(let i=2;i<process.argv.length;i+=2){
  const flag=process.argv[i],value=process.argv[i+1];
  if(!['--record','--source-key','--owner','--action'].includes(flag)||!value){
   console.error('Usage: node research-task-intake.mjs --record ID --owner work|chat --action inspect-original');
   process.exit(2);
  }
  args[flag.slice(2).replace('source-key','sourceKey').replace('record','recordId')]=value;
 }
 const outcome=assessTask(d,args);
 console.log(JSON.stringify(outcome,null,2));
 if(outcome.decision!=='CONTINUE_EXISTING')process.exitCode=2;
}
