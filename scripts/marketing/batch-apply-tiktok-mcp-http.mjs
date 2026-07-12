#!/usr/bin/env node
/**
 * Batch-apply TikTok staircase updates via MCP HTTP (OAuth session in Cursor).
 * Reads _mcp-bodies/*.json from index 012 onward and calls tool_execute.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const BODIES_DIR = path.join(ROOT, "ads/influencer-recruit/_mcp-bodies");
const PROGRESS_PATH = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-progress.json");
const MCP_URL = "https://business-api.tiktok.com/open_mcp/tt-ads-mcp-layer";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fromIdx = Number(process.argv[2] || 12);
const limit = Number(process.argv[3] || 999);

let progress = fs.existsSync(PROGRESS_PATH)
  ? JSON.parse(fs.readFileSync(PROGRESS_PATH, "utf8"))
  : { updated: [], errors: [] };
const done = new Set(progress.updated.map((x) => x.name));

const files = fs
  .readdirSync(BODIES_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort()
  .filter((f) => {
    const n = Number(f.slice(0, 3));
    return n >= fromIdx;
  })
  .slice(0, limit);

async function mcpCall(body, id = 1) {
  const payload = {
    jsonrpc: "2.0",
    id,
    method: "tools/call",
    params: { name: "tool_execute", arguments: { tool_name: "smart_plus_ad_update", params: body } },
  };
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text.slice(0, 500), status: res.status };
  }
}

for (const file of files) {
  const body = JSON.parse(fs.readFileSync(path.join(BODIES_DIR, file), "utf8"));
  if (done.has(body.ad_name)) continue;
  let ok = false;
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await mcpCall(body);
    const content = res?.result?.content?.[0]?.text;
    let parsed;
    try {
      parsed = content ? JSON.parse(content) : res;
    } catch {
      parsed = { raw: content || res };
    }
    if (parsed?.code === 41021) {
      await sleep(2500 * (attempt + 1));
      continue;
    }
    if (parsed?.code === 0) {
      progress.updated.push({
        name: body.ad_name,
        video_id: body.creative_list[0].creative_info.video_info.video_id,
      });
      console.log("OK", body.ad_name);
      ok = true;
      break;
    }
    if (attempt === 4) {
      progress.errors.push({ name: body.ad_name, message: parsed?.message || JSON.stringify(parsed).slice(0, 200) });
      console.log("FAIL", body.ad_name, parsed?.message || parsed);
    }
    break;
  }
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2));
  await sleep(700);
}

console.log(JSON.stringify({ updated: progress.updated.length, errors: progress.errors.length }));
