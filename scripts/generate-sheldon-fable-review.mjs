import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not available to this workflow.");
}

const sourcePath = resolve("atlas-content.js");
const source = readFileSync(sourcePath, "utf8");
const transcriptMatch = source.match(
  /const TOUR_MEDIA\s*=\s*\{[\s\S]*?\bjames_sheldon\s*:\s*\{[\s\S]*?\btranscript\s*:\s*("(?:\\.|[^"\\])*")\s*,\s*contract\s*:/
);

if (!transcriptMatch) {
  throw new Error("Could not locate Sheldon’s locked transcript in atlas-content.js.");
}

const transcript = JSON.parse(transcriptMatch[1]);
if (!transcript.trim()) {
  throw new Error("Sheldon’s transcript is empty.");
}
if (transcript.length > 4096) {
  throw new Error(`Sheldon’s transcript is ${transcript.length} characters; the speech endpoint limit is 4096.`);
}

const instructions = [
  "Use a calm, composed British documentary narration.",
  "Keep a natural conversational cadence that is measured but not slow.",
  "Sound warm without sentimentality, neutral, grounded, and quietly authoritative.",
  "Use restrained emphasis and brief meaningful pauses.",
  "Avoid an announcer voice, theatricality, exaggerated emotion, and robotic regularity."
].join(" ");

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
  throw new Error(`OpenAI speech request failed (${response.status}): ${detail}`);
}

const outputDirectory = resolve("review-output");
mkdirSync(outputDirectory, { recursive: true });

const audioPath = resolve(outputDirectory, "James_sheldon_webb_fable_review.mp3");
writeFileSync(audioPath, Buffer.from(await response.arrayBuffer()));
writeFileSync(resolve(outputDirectory, "James_sheldon_webb_fable_review_transcript.txt"), transcript + "\n");
writeFileSync(
  resolve(outputDirectory, "James_sheldon_webb_fable_review_metadata.json"),
  JSON.stringify(
    {
      model: "gpt-4o-mini-tts",
      voice: "fable",
      responseFormat: "mp3",
      transcriptSource: "atlas-content.js → TOUR_MEDIA.james_sheldon.transcript",
      transcriptCharacters: transcript.length,
      sourceCommit: process.env.GITHUB_SHA || null,
      status: "review-only; not approved and not deployed"
    },
    null,
    2
  ) + "\n"
);

console.log(`Created review MP3 from ${transcript.length} characters.`);
