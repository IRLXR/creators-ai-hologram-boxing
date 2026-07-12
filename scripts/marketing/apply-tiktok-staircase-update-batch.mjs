#!/usr/bin/env node
/**
 * Apply TikTok staircase ad updates from _tiktok-update-queue.json.
 * Outputs batch files for MCP tool_execute (smart_plus_ad_update).
 * Usage: node apply-tiktok-staircase-update-batch.mjs [offset] [limit]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const QUEUE_PATH = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-queue.json");
const RESULTS_PATH = path.join(ROOT, "ads/influencer-recruit/staircase-tiktok-update.json");

const offset = Number(process.argv[2] || 0);
const limit = Number(process.argv[3] || 8);

const queueData = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
const slice = queueData.queue.slice(offset, offset + limit);

let results = { updated_at: new Date().toISOString(), uploads: queueData.uploadCount, updated: [], errors: [], skipped: queueData.skipped, unmatched: queueData.unmatched };
if (fs.existsSync(RESULTS_PATH)) {
  results = { ...results, ...JSON.parse(fs.readFileSync(RESULTS_PATH, "utf8")) };
}

const batchDir = path.join(ROOT, "ads/influencer-recruit/_mcp-batches");
fs.mkdirSync(batchDir, { recursive: true });
const batchFile = path.join(batchDir, `batch-${offset}.json`);
fs.writeFileSync(batchFile, JSON.stringify(slice.map((x) => ({ ad_name: x.ad_name, body: x.body })), null, 2));
console.log(JSON.stringify({ batchFile, count: slice.length, names: slice.map((x) => x.ad_name) }));
