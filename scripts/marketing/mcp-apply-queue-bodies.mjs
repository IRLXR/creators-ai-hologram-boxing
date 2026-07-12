#!/usr/bin/env node
/**
 * Helper: apply queued TikTok ad bodies via sequential MCP tool_execute calls.
 * Run from Cursor agent context — reads JSON body file array and applies each.
 *
 * Usage: node mcp-apply-queue-bodies.mjs <bodies-json-file>
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node mcp-apply-queue-bodies.mjs <bodies-json-file>");
  process.exit(1);
}
const bodies = JSON.parse(fs.readFileSync(file, "utf8"));
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PROGRESS = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-progress.json");
let progress = fs.existsSync(PROGRESS) ? JSON.parse(fs.readFileSync(PROGRESS, "utf8")) : { updated: [], errors: [] };

// This script only records intent; actual MCP calls must be made by the agent.
for (const body of bodies) {
  const name = body.ad_name;
  if (progress.updated.some((x) => x.name === name)) continue;
  console.log("PENDING_MCP", name, body.smart_plus_ad_id);
}
