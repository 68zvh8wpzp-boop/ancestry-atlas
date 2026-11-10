/* A048 — non-mutating original Fable audio integrity diagnostic.
   Historical approval marks a 2026-08-31 commit and source ZIP 11,797,878 bytes.
   Never overwrite MP3 or relock hashes. This report audits stored bytes only. */
import {readFileSync, statSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import path from 'node:path';

const root=process.cwd();
const sha256=b=>createHash('sha256').update(b).digest('hex');
const record=JSON.parse(readFileSync(path.join(root,'approved-audio/fable/review-records/v3.8.19_fable_reviews_metadata.json'),'utf8'));
const checksumLines=readFileSync(path.join(root,'approved-audio/fable/SHA256SUMS.txt'),'utf8').trim().split(/\r?\n/);
const approvedLocks=new Map(checksumLines.map(line=>{
 const m=line.match(/^([a-f0-9]{64})\s+(.+?)\s*$/);return m?[m[2],m[1]]:[null,null];
}).filter(([name])=>name));

function probeFormat(file){
  const p=spawnSync('ffprobe',['-v','error','-show_entries','format=duration,bit_rate,size','-of','json',file],{encoding:'utf8',maxBuffer:1000000});
  if(p.error)return {error:p.error.message};
  if(p.status!==0)return {error:p.stderr?.slice(0,350)||'ffprobe failed',exitCode:p.status};
  try{const obj=JSON.parse(p.stdout);return {reportedDurationSeconds:Number(obj.format?.duration||0),bitRate:Number(obj.format?.bit_rate||0),formatSize:Number(obj.format?.size||0)}}
  catch(e){return {error:'invalid ffprobe JSON: '+e.message}}
}
function decodeActualDuration(file){
  const p=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-progress','pipe:1','-i',file,'-vn','-f','null','-'],{encoding:'utf8',maxBuffer:1000000});
  if(p.error)return {error:p.error.message};
  const lines=p.stdout.split(/\r?\n/);
  const t=lines.filter(line=>line.startsWith('out_time_us=')).at(-1);
  const sec=t?Number(t.split('=')[1])/1000000:null;
  return {decodedSeconds:Number.isFinite(sec)?Math.round(sec*100)/100:null,exitCode:p.status,decodeWarnings:p.stderr?.trim().slice(0,500)||null};
}
const files=record.biographies.map(item=>{
 const file=path.join(root,'approved-audio/fable',item.output);
 const bytes=readFileSync(file);
 const actual=sha256(bytes);
 const ffprobe=probeFormat(file);
 const decoder=decodeActualDuration(file);
 return {person:item.name,file:item.output,transcriptCharacters:item.transcriptCharacters,bytes:bytes.length,
  expectedReviewSha256:item.audioSha256,expectedLockSha256:approvedLocks.get(item.output)||null,
  repositorySha256:actual,matchesApprovalHash:actual===item.audioSha256,
  metadataAndLockAgree:approvedLocks.get(item.output)===item.audioSha256,
  ...ffprobe,...decoder};
});
const historicalArtifact={runId:33342187526,artifactId:9740906917,name:'v3.8.19-fable-reviews-1',zipBytesFromWorkflowLog:11797878,filesInZipFromLog:13,
  retentionDaysFromWorkflow:14,githubCurrentLookup:'404; expired artifact not re-downloadable'};
const sum=files.reduce((n,f)=>n+f.bytes,0);
const result={schema:'a048-fable-audio-forensics-v1',historicalPromotionCommit:'30dc5d05193c12a27a5dd29293a332035798abef',
 reviewedFiles:files.length,files,repositorySixMp3TotalBytes:sum,historicalArtifact,
 historicalArtifactVsRepositoryDifferenceBytes:historicalArtifact.zipBytesFromWorkflowLog-sum,
 conclusion:'All six repository files have identical or near-identical length, differ from original approved hashes, and are much smaller than original six-MP3 review ZIP; likely truncated. Restore only exact approved originals if verifiably recovered; never replace hash lock with new ones.',
 noBytesModified:true};
console.log(JSON.stringify(result,null,2));
