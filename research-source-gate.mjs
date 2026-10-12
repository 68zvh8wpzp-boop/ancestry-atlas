import {existsSync, readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const data=JSON.parse(readFileSync(new URL('./RESEARCH_SOURCE_REGISTRY.json',import.meta.url),'utf8'));
const statuses=new Set(['indexed','unexamined','partial','examined','saved','published','blocked']);
const actions=new Set(['find-record','inspect-original','capture-original','transcribe-original','audit-sources','targeted-reexamination','verify-iphone']);
const alreadyExamined=new Set(['examined','saved','published']);
const alreadySaved=new Set(['saved','published']);

function pointerOK(value){
 if(typeof value!=='string')return false;
 if(/^library:file_[a-f0-9]{32}$/.test(value))return true;
 if(!/^github:[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(value))return false;
 const path=value.slice(7);
 return !path.split('/').some(part=>part==='.'||part==='..'||part==='');
}

export function validate(d,{checkPaths=false}={}){
 const errors=[], records=new Map(), keyOwner=new Map(), seenTasks=new Map();
 if(d?.schema!==1||!Array.isArray(d.records)||!Array.isArray(d.tasks))return ['Invalid registry schema'];
 if(!d.coverage||!['selected-records-only','fully-reconciled'].includes(d.coverage.kind)||
    typeof d.coverage.allAncestorOriginalsAudited!=='boolean')
  errors.push('Missing/invalid coverage declaration: unknown sources must not be assumed new');
 const checkPointer=(p,context)=>{
  if(!pointerOK(p)){errors.push('Invalid evidence pointer '+context+': '+p);return;}
  if(checkPaths&&p.startsWith('github:')){
   const filename=new URL('./'+p.slice(7),import.meta.url);
   if(!existsSync(filename))errors.push('Evidence file does not exist: '+p);
  }
 };
 for(const r of d.records){
  if(!r||typeof r!=='object'){errors.push('Invalid record');continue;}
  if(!r.id||records.has(r.id))errors.push('Duplicate/missing record ID '+r.id);
  records.set(r.id,r);
  if(!r.personId||!r.event||!statuses.has(r.status))errors.push('Incomplete record '+r.id);
  checkPointer(r.evidence,'record '+r.id);
  if(!Array.isArray(r.sourceKeys)||!r.sourceKeys.length)errors.push('Missing source identifier '+r.id);
  const localKeys=new Set();
  for(const k of r.sourceKeys||[]){
   if(typeof k!=='string'||!k.trim().includes(':')){errors.push('Malformed source key '+r.id);continue;}
   const canonical=k.trim().toLowerCase();
   if(localKeys.has(canonical)||keyOwner.has(canonical)&&keyOwner.get(canonical)!==r.id)errors.push('Duplicate source key '+canonical);
   localKeys.add(canonical);keyOwner.set(canonical,r.id);
  }
  if(r.locatorState==='not-yet-identified'&&
     (r.status!=='unexamined'||!(r.sourceKeys||[]).every(k=>typeof k==='string'&&k.startsWith('target:'))))
    errors.push('Unlocated target incorrectly represented as original: '+r.id);
  if(!Array.isArray(r.originalRefs))errors.push('Original references must be an array: '+r.id);
  else {
   for(const p of r.originalRefs)checkPointer(p,'original '+r.id);
   if(alreadySaved.has(r.status)&&!r.originalRefs.length)errors.push('Saved/published original has no retrievable originalRefs: '+r.id);
  }
  if(r.relatedPersonIds!==undefined&&(!Array.isArray(r.relatedPersonIds)||new Set(r.relatedPersonIds).size!==r.relatedPersonIds.length))
   errors.push('Invalid related people: '+r.id);
 }
 for(const t of d.tasks){
  if(!t||typeof t!=='object'){errors.push('Invalid task');continue;}
  if(!t.id||seenTasks.has(t.id))errors.push('Duplicate/missing task ID '+t.id);
  seenTasks.set(t.id,t);
  const r=records.get(t.recordId);
  if(!r){errors.push('Unknown record '+t.recordId);continue;}
  if(!['chat','work','hold'].includes(t.owner))errors.push('Invalid task owner '+t.id);
  if(!['queued','active','paused'].includes(t.state))errors.push('Invalid task state '+t.id);
  if(t.owner==='hold'&&t.state==='active')errors.push('Hold owner cannot be active '+t.id);
  if(!actions.has(t.action))errors.push('Unknown/bypass task action '+t.id+': '+t.action);
  if(typeof t.novelty!=='string'||t.novelty.trim().length<24)errors.push('Missing proof of novelty '+t.id);
  if(alreadyExamined.has(r.status)&&['inspect-original','find-record','audit-sources'].includes(t.action))
    errors.push('Already inspected: '+t.id+' ('+r.id+')');
  if(alreadySaved.has(r.status)&&t.action==='capture-original')errors.push('Already saved: '+t.id);
  if(t.action==='targeted-reexamination'){
   if(typeof t.overrideReason!=='string'||t.overrideReason.trim().length<40||
      typeof t.requestedDifference!=='string'||t.requestedDifference.trim().length<16||
      !pointerOK(t.overrideEvidenceRef))
    errors.push('Targeted re-examination lacks specific reason, evidence pointer and new objective: '+t.id);
   else checkPointer(t.overrideEvidenceRef,'override '+t.id);
  }else if(t.overrideReason||t.overrideEvidenceRef)errors.push('Use targeted-reexamination action for an exception: '+t.id);
 }
 for(const [id,t] of seenTasks)for(const [id2,t2] of seenTasks){
  if(id<id2&&t.recordId===t2.recordId&&t.state!=='paused'&&t2.state!=='paused')
   errors.push('Concurrent research ownership conflict '+id+' / '+id2);
 }
 return errors;
}

if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1]){
 const errors=validate(data,{checkPaths:true});
 console.log(JSON.stringify({records:data.records.length,tasks:data.tasks.length,coverage:data.coverage?.kind,errors},null,2));
 if(errors.length)process.exitCode=1;
}
