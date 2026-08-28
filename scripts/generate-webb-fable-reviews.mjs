import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const validateOnly = process.argv.includes("--validate-only");
const apiKey = process.env.OPENAI_API_KEY;
if (!validateOnly && !apiKey) {
  throw new Error("OPENAI_API_KEY is not available. Run with --validate-only to verify the locked inputs without generating audio.");
}

const biographies = [
  ["James Wilford “Jay” Webb", "james_wilford", "James_wilford_webb_fable_review.mp3"],
  ["Jonathan Henry Webb", "jonathan_henry", "Jonathan_henry_webb_fable_review.mp3"],
  ["Edward Milo Webb Jr.", "edward_milo_jr", "Edward_milo_webb_jr_fable_review.mp3"],
  ["Edward Milo Webb Sr.", "edward_milo_sr", "Edward_milo_webb_sr_fable_review.mp3"],
  ["James Webb Jr.", "james_webb_jr", "James_webb_jr_fable_review.mp3"]
].map(([name, personId, output]) => ({
  name,
  personId,
  source: `biographies/webb-branch/people/${personId}/narration-approved.txt`,
  output
}));

const instructions = [
  "Use a calm, composed British documentary narration.",
  "Keep a natural conversational cadence that is measured but not slow.",
  "Sound warm without sentimentality, neutral, grounded, and quietly authoritative.",
  "Use restrained emphasis and brief meaningful pauses.",
  "Avoid an announcer voice, theatricality, exaggerated emotion, and robotic regularity."
].join(" ");

const outputDirectory = resolve("review-output/webb-fable");
mkdirSync(outputDirectory, { recursive: true });
const metadata = [];

for (const biography of biographies) {
  const transcript = readFileSync(resolve(biography.source), "utf8")
    .replace(/\r\n/g, "\n")
    .trim();
  if (!transcript) throw new Error(`${biography.name}: transcript is empty.`);
  if (transcript.length > 3000) {
    throw new Error(`${biography.name}: transcript is ${transcript.length} characters; project limit is 3000.`);
  }

  const record = {
    name: biography.name,
    personId: biography.personId,
    source: biography.source,
    output: biography.output,
    transcriptCharacters: transcript.length,
    transcriptSha256: createHash("sha256").update(transcript + "\n").digest("hex"),
    model: "gpt-4o-mini-tts",
    voice: "fable",
    status: validateOnly ? "validated; audio not generated" : "review-only; not approved and not deployed"
  };

  if (!validateOnly) {
    console.log(`Generating ${biography.name} from ${transcript.length} characters...`);
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
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
    writeFileSync(resolve(outputDirectory, biography.output.replace(/\.mp3$/, "_transcript.txt")), transcript + "\n");
  }
  metadata.push(record);
  console.log(`${record.name}: ${record.transcriptCharacters} characters — ${record.status}`);
}

writeFileSync(
  resolve(outputDirectory, "webb_fable_reviews_metadata.json"),
  JSON.stringify({ sourceCommit: process.env.GITHUB_SHA || null, biographies: metadata }, null, 2) + "\n"
);
console.log(validateOnly ? "Validated five locked Webb narration inputs." : "Created five review-only Webb Fable MP3s.");
