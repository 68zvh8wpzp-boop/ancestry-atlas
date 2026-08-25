import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY is not available to this workflow.");

const biographies = [
  {
    name: "Marion Beulah Brenay Webb",
    source: "biographies/marion/narration-approved-photo-context.txt",
    output: "Marion_beulah_brenay_webb_fable_review.mp3"
  },
  {
    name: "Charles Albert Brenay",
    source: "biographies/brenay-canada/narration/charles_albert_brenay.txt",
    output: "Charles_albert_brenay_fable_review.mp3"
  },
  {
    name: "Charles Godfrey Brenay",
    source: "biographies/brenay-canada/narration/charles_godfrey_brenay.txt",
    output: "Charles_godfrey_brenay_fable_review.mp3"
  },
  {
    name: "Ida Mae Gooley",
    source: "biographies/brenay-canada/narration/ida_mae_gooley.txt",
    output: "Ida_mae_gooley_fable_review.mp3"
  },
  {
    name: "John Peter Gooley",
    source: "biographies/brenay-canada/narration/john_peter_gooley.txt",
    output: "John_peter_gooley_fable_review.mp3"
  },
  {
    name: "Mary Ann Dennis",
    source: "biographies/brenay-canada/narration/mary_ann_dennis.txt",
    output: "Mary_ann_dennis_fable_review.mp3"
  }
];

const instructions = [
  "Use a calm, composed British documentary narration.",
  "Keep a natural conversational cadence that is measured but not slow.",
  "Sound warm without sentimentality, neutral, grounded, and quietly authoritative.",
  "Use restrained emphasis and brief meaningful pauses.",
  "Avoid an announcer voice, theatricality, exaggerated emotion, and robotic regularity."
].join(" ");

const outputDirectory = resolve("review-output");
mkdirSync(outputDirectory, { recursive: true });
const metadata = [];

for (const biography of biographies) {
  const transcript = readFileSync(resolve(biography.source), "utf8")
    .replace(/\r\n/g, "\n")
    .trim();

  if (!transcript) throw new Error(`${biography.name}: transcript is empty.`);
  if (transcript.length > 4096) {
    throw new Error(`${biography.name}: transcript is ${transcript.length} characters; limit is 4096.`);
  }

  console.log(`Generating ${biography.name} from ${transcript.length} characters...`);
  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "fable",
      input: transcript,
      instructions,
      response_format: "mp3"
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`${biography.name}: OpenAI speech request failed (${response.status}): ${detail}`);
  }

  writeFileSync(resolve(outputDirectory, biography.output), Buffer.from(await response.arrayBuffer()));
  writeFileSync(
    resolve(outputDirectory, biography.output.replace(/\.mp3$/, "_transcript.txt")),
    transcript + "\n"
  );
  metadata.push({
    name: biography.name,
    source: biography.source,
    output: biography.output,
    transcriptCharacters: transcript.length,
    model: "gpt-4o-mini-tts",
    voice: "fable",
    status: "review-only; not approved and not deployed"
  });
}

writeFileSync(
  resolve(outputDirectory, "remaining_fable_reviews_metadata.json"),
  JSON.stringify({ sourceCommit: process.env.GITHUB_SHA || null, biographies: metadata }, null, 2) + "\n"
);
console.log("Created six review-only Fable MP3s.");
