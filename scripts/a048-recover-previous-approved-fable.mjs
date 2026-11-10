/* A048 recovery candidate — export August 30, 2026 previously approved ORIGINAL Fable bytes
   to temporary GitHub Actions review-output only. NO production edits / hash relocks.
   Run only in a read-only checkout with prior approved commit fetched. */
import {spawnSync} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const historicalCommit='fa41af02e7a6405a0150a3ba9be3a84391463627';
const names=['Charles_albert_brenay.mp3','Charles_godfrey_brenay.mp3','Ida_mae_gooley.mp3','John_peter_gooley.mp3','Mary_ann_dennis.mp3','James_wilford_webb.mp3'];
const directory=path.resolve('review-output/a048-approved-fable-20260830');
mkdirSync(directory,{recursive:true});
function show(p){
 const x=spawnSync('git',['show',historicalCommit+':'+p],{maxBuffer:6*1024*1024});
 if(x.error||x.status!==0)throw Error('Cannot read historical approved source: '+p+': '+(x.stderr?.toString()||x.error));
 return x.stdout;
}
const historicalChecksums=show('approved-audio/fable/SHA256SUMS.txt').toString('utf8');
const lock=new Map(historicalChecksums.trim().split(/\r?\n/).map(line=>{
 const m=line.match(/^([0-9a-f]{64})\s+(.+?)\s*$/);
 return m?[m[2],m[1]]:[null,null];
}).filter(([name])=>!!name));
const sha=b=>createHash('sha256').update(b).digest('hex');
function duration(file){
 const x=spawnSync('ffprobe',['-v','error','-show_entries','format=duration,bit_rate','-of','json',file],{encoding:'utf8'});
 if(x.status!==0)throw Error('Historical approved MP3 failed ffprobe: '+file);
 const obj=JSON.parse(x.stdout);
 const y=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-progress','pipe:1','-i',file,'-vn','-f','null','-'],{encoding:'utf8',maxBuffer:200000});
 if(y.error||y.status!==0||y.stderr?.trim())throw Error('Historical MP3 cannot decode cleanly: '+file+'; '+y.stderr?.slice(0,200));
 const t=y.stdout.split(/\r?\n/).filter(x=>x.startsWith('out_time_us=')).at(-1);
 return {formatSeconds:Number(obj.format.duration),decodedSeconds:t?Math.round(Number(t.split('=')[1])/10000)/100:null,bitRate:Number(obj.format.bit_rate)};
}
const files=names.map(name=>{
 const src='approved-audio/fable/'+name;
 const bytes=show(src);
 const expected=lock.get(name);
 if(!expected)throw Error('Missing historical checksum for '+name);
 const actual=sha(bytes);
 if(actual!==expected)throw Error('Historical approved bytes do not match historical owner approval for '+name+': '+actual+' != '+expected);
 const dst=path.join(directory,name);
 writeFileSync(dst,bytes);
 const d=duration(dst);
 return {name,bytes:bytes.length,sha256:actual,sourceCommit:historicalCommit,verifiedHistoricalApproval:true,...d};
});
writeFileSync(path.join(directory,'SHA256SUMS_2026-08-30_ORIGINAL.txt'),historicalChecksums);
writeFileSync(path.join(directory,'APPROVAL_2026-08-30_ORIGINAL.md'),show('approved-audio/fable/APPROVAL.md'));
writeFileSync(path.join(directory,'REVIEW_MANIFEST.json'),JSON.stringify({
 status:'RECOVERY REVIEW CANDIDATE, NOT RELEASE OR NEW APPROVAL',
 restoredOnlyFromPriorOwnerApprovedGitCommit:true,
 commit:historicalCommit,
 noProductionAudioOverwritten:true,
 userMustReviewNarrationTextAndDeviceBeforeUse:true,
 files
},null,2)+'\n');
console.log(JSON.stringify({historicalCommit,restoredBytes:files.reduce((n,f)=>n+f.bytes,0),count:files.length,files,location:directory,noProductionAudioOverwritten:true},null,2));
