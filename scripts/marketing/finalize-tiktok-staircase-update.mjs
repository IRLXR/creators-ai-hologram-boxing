#!/usr/bin/env node
/**
 * Records TikTok staircase update results and finalizes manifest.
 * Run after MCP smart_plus_ad_update calls complete.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const QUEUE_PATH = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-queue.json");
const RESULTS_PATH = path.join(ROOT, "ads/influencer-recruit/staircase-tiktok-update.json");
const MANIFEST_PATH = path.join(ROOT, "ads/influencer-recruit/LAUNCH-MANIFEST.json");
const PROGRESS_PATH = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-progress.json");

const queueData = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8"));
const progress = fs.existsSync(PROGRESS_PATH)
  ? JSON.parse(fs.readFileSync(PROGRESS_PATH, "utf8"))
  : { updated: [], errors: [] };

const results = {
  updated_at: new Date().toISOString(),
  uploads_new: 21,
  uploads_skipped: 1,
  uploads_total_keys: queueData.uploadCount,
  upload_note:
    "21 new URL uploads (UPLOAD_BY_URL, -20260712 suffix) + inf_calling_all_vo skipped (pre-existing v10033g50000d99t93vog65k0b7sujvg)",
  ads_updated: progress.updated.length,
  updated: progress.updated,
  errors: progress.errors,
  pending: progress.pending || [],
  skipped: queueData.skipped,
  unmatched: [...new Set(queueData.unmatched)],
  ads_fetched: 92,
  ads_in_queue: queueData.queue.length,
};

fs.writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2));

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
manifest.updated_at = new Date().toISOString();
manifest.influencer_staircase = manifest.influencer_staircase || {};
manifest.influencer_staircase.tiktok = {
  ...manifest.influencer_staircase.tiktok,
  status: progress.errors.length ? "COMPOSITES_PARTIAL" : "COMPOSITES_UPDATED",
  composites_updated_at: new Date().toISOString(),
  ads_updated: progress.updated.length,
  ads_errors: progress.errors.length,
  ads_skipped: queueData.skipped.length,
  ads_unmatched: [...new Set(queueData.unmatched)].length,
  note: "Staircase ads swapped to voiced composite creatives via MCP OAuth",
};
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(JSON.stringify({ results: RESULTS_PATH, updated: progress.updated.length, errors: progress.errors.length }));
