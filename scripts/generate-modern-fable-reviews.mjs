import {createHash} from 'node:crypto';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const apiKey=process.env.OPENAI_API_KEY;
if(!apiKey)throw new Error('OPENAI_API_KEY is not available to this workflow.');

const biographies=[
  {
    id:'james_sheldon',
    name:'James Sheldon Webb',
    source:'biographies/sheldon/narration-approved-photo-context.txt',
    transcript:readFileSync(resolve('biographies/sheldon/narration-approved-photo-context.txt'),'utf8').trim(),
    output:'James_sheldon_webb_fable_review.mp3'
  },
  {
    id:'marion_brenay',
    name:'Marion Beulah Brenay Webb',
    source:'biographies/marion/narration-approved-photo-context.txt',
    transcript:readFileSync(resolve('biographies/marion/narration-approved-photo-context.txt'),'utf8').trim(),
    output:'Marion_beulah_brenay_webb_fable_review.mp3'
  },
  {
    id:'james_wilford',
    name:'James Wilford “Jay” Webb',
    source:'biographies/webb-branch/people/james_wilford/narration-approved.txt',
    transcript:readFileSync(resolve('biographies/webb-branch/people/james_wilford/narration-approved.txt'),'utf8').trim(),
    output:'James_wilford_webb_fable_review.mp3'
  }
];

const instructions=[
  'Use a calm, composed British documentary narration.',
  'Keep a natural conversational cadence that is measured but not slow.',
  'Sound warm without sentimentality, neutral, grounded, and quietly authoritative.',
  'Use restrained emphasis and brief meaningful pauses.',
  'Avoid an announcer voice, theatricality, exaggerated emotion, and robotic regularity.'
].join(' ');

const outputDirectory=resolve('review-output/modern-fable-2026-08-30');
mkdirSync(outputDirectory,{recursive:true});
const metadata=[];

for(const biography of biographies){
  const transcript=biography.transcript.replace(/\r\n/g,'\n').trim();
  if(!transcript)throw new Error(`${biography.name}: transcript is empty.`);
  if(transcript.length>4096)throw new Error(`${biography.name}: transcript is ${transcript.length} characters; speech limit is 4096.`);
  console.log(`Generating ${biography.name} from ${transcript.length} characters...`);
  const response=await fetch('https://api.openai.com/v1/audio/speech',{
    method:'POST',
    headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:'gpt-4o-mini-tts',voice:'fable',input:transcript,instructions,response_format:'mp3'})
  });
  if(!response.ok)throw new Error(`${biography.name}: speech request failed (${response.status}): ${await response.text()}`);
  const audio=Buffer.from(await response.arrayBuffer());
  writeFileSync(resolve(outputDirectory,biography.output),audio);
  writeFileSync(resolve(outputDirectory,biography.output.replace(/\.mp3$/,'_transcript.txt')),`${transcript}\n`);
  metadata.push({
    id:biography.id,name:biography.name,source:biography.source,output:biography.output,
    transcriptCharacters:transcript.length,transcriptSha256:createHash('sha256').update(transcript).digest('hex'),
    audioSha256:createHash('sha256').update(audio).digest('hex'),model:'gpt-4o-mini-tts',voice:'fable',
    status:'review-only; not approved and not deployed'
  });
}

writeFileSync(resolve(outputDirectory,'modern_fable_reviews_metadata.json'),`${JSON.stringify({generatedOn:'2026-08-30',biographies:metadata},null,2)}\n`);
console.log('Created three review-only Fable MP3s.');
