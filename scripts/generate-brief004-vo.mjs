/**
 * Generate Brief 004 invite-style narration via ElevenLabs.
 * Warm happy voice — draws people in, does not describe on-screen action.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import voiceConfig from "../ads/VOICE-CONFIG.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "ads/brief-004/output");
const OUT_RAW = join(OUT_DIR, "MEMORY-vo-invite-v3-raw.mp3");

const cfg = voiceConfig.elevenlabs_brief004;
const apiKey = process.env.ELEVENLABS_API_KEY;

if (!apiKey) {
  console.error("Missing ELEVENLABS_API_KEY in .env.local");
  process.exit(1);
}

const NARRATION = `
This is not another fight night.

This is the night hologram warriors come to life — human-sized, in a glowing square, while the crowd leans in.

AI Hologram Boxing. The tent. The fog. The future — right in front of you.

Bring your friends. Bring your family.

Feel the buzz at the entrance… then step inside something you've only imagined.

Wave fighters in the mist. Headsets on. Hearts racing.

Not on a screen. Not in a highlight. Live — in the room.

This is what the next era of entertainment feels like. Pure fun. Pure wonder.

One night with the people you love — a story you'll tell for years.

Every generation leaves behind moments… that become memories.

The moments we share… become the stories we tell.

The stories we tell… become the memories we keep.

Welcome… to the next evolution of live entertainment.
`.trim();

const client = new ElevenLabsClient({ apiKey });

console.log("Generating Brief 004 invite VO…");
console.log("Voice:", cfg.voice_name, cfg.voice_id);

const audioStream = await client.textToSpeech.convert(cfg.voice_id, {
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
writeFileSync(OUT_RAW, buffer);

console.log("Wrote", OUT_RAW);
console.log("Size:", (buffer.length / 1024).toFixed(0), "KB");
