/**
 * Generate Brief 003 documentary narration via ElevenLabs.
 * Requires ELEVENLABS_API_KEY in .env.local (see docs/ELEVENLABS-CONNECT.md).
 *
 * Usage:
 *   npm run generate:brief003-vo
 *   node --env-file=.env.local scripts/generate-brief003-vo.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import voiceConfig from "../ads/VOICE-CONFIG.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "ads/brief-003/output");
const OUT_FILE = join(OUT_DIR, "EVOLUTION-vo-documentary-v1.mp3");

const cfg = voiceConfig.elevenlabs_brief003;
const apiKey = process.env.ELEVENLABS_API_KEY;

if (!apiKey) {
  console.error(
    "Missing ELEVENLABS_API_KEY. Add it to .env.local — see docs/ELEVENLABS-CONNECT.md"
  );
  process.exit(1);
}

// Default: George (deep narrator). Override in ads/VOICE-CONFIG.json → elevenlabs_brief003.voice_id
const voiceId = cfg.voice_id || "JBFqnCBsd6RMkjVDRZzb";

const NARRATION = `
Since the beginning of humanity…
We have gathered…
To witness strength…
Courage…
Competition…
And unforgettable moments.

Long before history was written…
Competition brought people together.

Civilizations grew…
But the desire to witness greatness never changed.

From the birth of organized sport…
Humanity celebrated those willing to compete.

Empires rose…
And millions gathered…
To witness legends.

Competition became more than strength…
It became discipline…
Honor…
And mastery.

The world evolved…
But one thing remained the same…
People came together…
To experience something unforgettable.

Every generation has witnessed the next chapter…
This… is ours.

A new era of live spectacle is beginning…
Where hologram warriors clash… and the crowd wears the future on their eyes.
You don't just watch history anymore…
You step inside it.
Be part of something… truly unforgettable.
`.trim();

const client = new ElevenLabsClient({ apiKey });

console.log("Generating Brief 003 VO…");
console.log("Voice ID:", voiceId);
console.log("Model:", cfg.model);

const audioStream = await client.textToSpeech.convert(voiceId, {
  text: NARRATION,
  modelId: cfg.model,
  outputFormat: "mp3_44100_128",
  voiceSettings: {
    stability: cfg.stability,
    similarityBoost: cfg.similarity_boost,
    speed: cfg.speed,
  },
});

const chunks = [];
for await (const chunk of audioStream) {
  chunks.push(chunk);
}
const buffer = Buffer.concat(chunks);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, buffer);

console.log("Wrote", OUT_FILE);
console.log("Size:", (buffer.length / 1024 / 1024).toFixed(2), "MB");
