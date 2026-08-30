import {createHash} from 'node:crypto';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const apiKey=process.env.OPENAI_API_KEY;
if(!apiKey)throw new Error('OPENAI_API_KEY is not available to this workflow.');

const biographies=[
  ['Charles Albert Brenay','biographies/brenay-canada/narration/charles_albert_brenay.txt','Charles_albert_brenay.mp3'],
  ['Charles Godfrey Brenay','biographies/brenay-canada/narration/charles_godfrey_brenay.txt','Charles_godfrey_brenay.mp3'],
  ['Ida Mae Gooley','biographies/brenay-canada/narration/ida_mae_gooley.txt','Ida_mae_gooley.mp3'],
  ['John Peter Gooley','biographies/brenay-canada/narration/john_peter_gooley.txt','John_peter_gooley.mp3'],
  ['Mary Ann Dennis','biographies/brenay-canada/narration/mary_ann_dennis.txt','Mary_ann_dennis.mp3'],
  ['James Wilford “Jay” Webb','biographies/webb-branch/people/james_wilford/narration-approved.txt','James_wilford_webb.mp3']
];

const instructions=[
  'Use a calm, composed British documentary narration.',
  'Keep a natural conversational cadence that is measured but not slow.',
  'Sound warm without sentimentality, neutral, grounded, and quietly authoritative.',
  'Use restrained emphasis and brief meaningful pauses.',
  'Avoid an announcer voice, theatricality, exaggerated emotion, and robotic regularity.'
].join(' ');

const outputDirectory=resolve('review-output/v3.8.19-fable');
mkdirSync(outputDirectory,{recursive:true});
const metadata=[];

for(const [name,source,output] of biographies){
  const transcript=readFileSync(resolve(source),'utf8').replace(/\r\n/g,'\n').trim();
  if(!transcript)throw new Error(`${name}: transcript is empty.`);
  if(transcript.length>3000)throw new Error(`${name}: ${transcript.length} characters exceeds the project limit.`);
  console.log(`Generating ${name} from ${transcript.length} characters...`);
  const response=await fetch('https://api.openai.com/v1/audio/speech',{
    method:'POST',
    headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:'gpt-4o-mini-tts',voice:'fable',input:transcript,instructions,response_format:'mp3'})
  });
  if(!response.ok)throw new Error(`${name}: OpenAI speech request failed (${response.status}): ${await response.text()}`);
  const audio=Buffer.from(await response.arrayBuffer());
  writeFileSync(resolve(outputDirectory,output),audio);
  writeFileSync(resolve(outputDirectory,output.replace(/\.mp3$/,'_transcript.txt')),`${transcript}\n`);
  metadata.push({name,source,output,transcriptCharacters:transcript.length,transcriptSha256:createHash('sha256').update(`${transcript}\n`).digest('hex'),audioSha256:createHash('sha256').update(audio).digest('hex'),model:'gpt-4o-mini-tts',voice:'fable',status:'review-only; text approved; audio awaiting listening approval'});
}

writeFileSync(resolve(outputDirectory,'v3.8.19_fable_reviews_metadata.json'),`${JSON.stringify({sourceCommit:process.env.GITHUB_SHA||null,biographies:metadata},null,2)}\n`);
console.log('Created six v3.8.19 review-only Fable MP3s.');
