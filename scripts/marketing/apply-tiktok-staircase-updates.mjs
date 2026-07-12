#!/usr/bin/env node
/**
 * Apply all queued TikTok staircase ad updates.
 * Reads body JSON files from _mcp-bodies/ and calls TikTok API via MCP bridge file.
 *
 * Usage: node apply-tiktok-staircase-updates.mjs --from 10
 *
 * Writes requests to _mcp-pending/ and reads responses from _mcp-responses/
 * when driven by external MCP batch runner.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const QUEUE_PATH = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-queue.json");
const PROGRESS_PATH = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-progress.json");
const from = Number(process.argv.includes("--from") ? process.argv[process.argv.indexOf("--from") + 1] : 0);

const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8")).queue;
let progress = fs.existsSync(PROGRESS_PATH)
  ? JSON.parse(fs.readFileSync(PROGRESS_PATH, "utf8"))
  : { updated: [], errors: [] };
const done = new Set(progress.updated.map((x) => x.name));

const pending = queue.slice(from).filter((x) => !done.has(x.ad_name));
const outDir = path.join(ROOT, "ads/influencer-recruit/_mcp-pending");
fs.mkdirSync(outDir, { recursive: true });

for (const item of pending) {
  fs.writeFileSync(
    path.join(outDir, `${item.smart_plus_ad_id}.json`),
    JSON.stringify({ tool_name: "smart_plus_ad_update", params: item.body }, null, 2)
  );
}

console.log(JSON.stringify({ pending: pending.length, from, names: pending.map((x) => x.ad_name) }));
