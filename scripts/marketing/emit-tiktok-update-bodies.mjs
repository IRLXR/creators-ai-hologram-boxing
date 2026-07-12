#!/usr/bin/env node
/**
 * Apply all queued TikTok ad updates via MCP tool_execute (smart_plus_ad_update).
 * Requires Cursor MCP OAuth session on user-tiktok-for-business.
 *
 * This script reads queue bodies and prints MCP call instructions.
 * For automated apply, run with --emit-bodies to write per-ad JSON files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const QUEUE_PATH = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-queue.json");
const PROGRESS_PATH = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-progress.json");
const offset = Number(process.argv[2] || 0);
const limit = Number(process.argv[3] || 999);

const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8")).queue.slice(offset, offset + limit);
const outDir = path.join(ROOT, "ads/influencer-recruit/_mcp-bodies");
fs.mkdirSync(outDir, { recursive: true });

for (const [i, item] of queue.entries()) {
  const idx = offset + i;
  fs.writeFileSync(path.join(outDir, `${String(idx).padStart(3, "0")}-${item.ad_name}.json`), JSON.stringify(item.body));
}
console.log(JSON.stringify({ written: queue.length, offset, outDir }));
