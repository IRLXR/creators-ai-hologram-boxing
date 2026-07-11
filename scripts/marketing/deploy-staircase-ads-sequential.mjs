#!/usr/bin/env node
/** Deploy staircase ads sequentially via TikTok API (ads only). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const envLocal = path.join(ROOT, ".env.local");
function loadEnv() {
  if (!fs.existsSync(envLocal)) return;
  for (const line of fs.readFileSync(envLocal, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim();
  }
}
loadEnv();
if (!process.env.TIKTOK_ACCESS_TOKEN && process.env.TIKTOK_MARKETING_ACCESS_TOKEN) {
  process.env.TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_MARKETING_ACCESS_TOKEN;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SKIP = new Set([
  "AD_HB_Inf_L1_CallingAll_Gaming",
  "AD_HB_Inf_L1_FutureMystery_Gaming",
]);

// Regenerate ops (avoid BOM corruption from PowerShell redirect)
const { stdout } = spawnSync("node", ["scripts/marketing/staircase-ad-payloads.mjs"], {
  cwd: ROOT,
  encoding: "utf8",
});
const ops = JSON.parse(stdout);

async function call(params) {
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  const res = await fetch("https://business-api.tiktok.com/open_api/v1.3/smart_plus/ad/create/", {
    method: "POST",
    headers: { "Access-Token": token, "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.json();
}

const results = { created: [], errors: [], skipped: [] };

for (const params of ops) {
  if (SKIP.has(params.ad_name)) {
    results.skipped.push(params.ad_name);
    continue;
  }
  for (let attempt = 0; attempt < 6; attempt++) {
    const result = await call(params);
    if (result.code === 41021) {
      await sleep(3000 * (attempt + 1));
      continue;
    }
    if (result.code !== 0) {
      results.errors.push({ name: params.ad_name, code: result.code, message: result.message });
      console.log(`FAIL ${params.ad_name}: ${result.message}`);
    } else {
      results.created.push({ name: params.ad_name, id: result.data?.smart_plus_ad_id });
      console.log(`OK ${params.ad_name} → ${result.data?.smart_plus_ad_id}`);
    }
    break;
  }
  await sleep(1500);
}

const out = path.join(ROOT, "ads/influencer-recruit/staircase-tiktok-deploy.json");
fs.writeFileSync(out, JSON.stringify(results, null, 2));
console.log(`\nCreated: ${results.created.length}, Errors: ${results.errors.length}, Skipped: ${results.skipped.length}`);
