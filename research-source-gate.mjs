import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const data=JSON.parse(readFileSync(fileURLToPath(new URL('./RESEARCH_SOURCE_REGISTRY.json',import.meta.url)),'utf8'));
export function validate(d){
 const errors=[], validStatuses=new Set(['indexed','unexamined','partial','examined','saved','published','blocked']);
 const keyOwner=new Map(), ids=new Set(), tasks=new Map();
 if(d.schema!==1||!Array.isArray(d.records)||!Array.isArray(d.tasks))errors.push('Invalid schema');
 for(const r of d.records||[]){
  if(!r.id||ids.has(r.id))errors.push('Missing/duplicate record ID '+r.id); ids.add(r.id);
  if(!r.personId||!r.event||!r.evidence||!validStatuses.has(r.status)) errors.push('Incomplete record '+r.id);
  if(!Array.isArray(r.sourceKeys)||!r.sourceKeys.length)errors.push('Missing source identifier '+r.id);
  for(const k of r.sourceKeys||[]){const canonical=k.trim().toLowerCase();if(!canonical)errors.push('Empty key '+r.id);
   if(keyOwner.has(canonical)&&keyOwner.get(canonical)!==r.id)errors.push('Duplicate source key '+canonical);
   keyOwner.set(canonical,r.id);}
 }
 for(const t of d.tasks||[]){
  if(!t.id||tasks.has(t.id))errors.push('Duplicate/missing task ID '+t.id);tasks.set(t.id,t);
  const r=(d.records||[]).find(x=>x.id===t.recordId);
  if(!r) {errors.push('Unknown record '+t.recordId);continue;}
  if(!['chat','work','hold'].includes(t.owner))errors.push('Invalid owner '+t.id);
  if(!['queued','active','paused'].includes(t.state))errors.push('Invalid task state '+t.id);
  if(!t.novelty||t.novelty.trim().length<24)errors.push('Missing proof of novelty '+t.id);
  if(['examined','saved','published'].includes(r.status)&&t.action==='inspect-original')errors.push('Already inspected: '+t.id+' ('+r.id+')');
  if(['saved','published'].includes(r.status)&&t.action==='capture-original')errors.push('Already saved: '+t.id);
  if(['examined','saved','published'].includes(r.status)&&t.action==='inspect-original'&&t.overrideReason)errors.push('Use targeted re-examination action for justified exceptions: '+t.id);
 }
 for(const [id,t] of tasks){for(const [id2,t2] of tasks){if(id>=id2)continue;if(t.recordId===t2.recordId&&t.state!=='paused'&&t2.state!=='paused')errors.push('Concurrent research ownership conflict '+id+' / '+id2);}}
 return errors;
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
 const errors=validate(data);
 console.log(JSON.stringify({records:data.records.length,tasks:data.tasks.length,errors},null,2));
 if(errors.length)process.exitCode=1;
}
