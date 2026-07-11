#!/usr/bin/env node
/**
 * Verify TikTok Marketing API credentials (same vars as TikTok MCP).
 * Usage: node --env-file=.env.local scripts/tiktok/verify.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const API = "https://business-api.tiktok.com/open_api/v1.3";

function token() {
  const marketing = process.env.TIKTOK_MARKETING_ACCESS_TOKEN?.trim();
  if (!marketing) {
    throw new Error(
      "Missing TIKTOK_MARKETING_ACCESS_TOKEN. Events token (TIKTOK_ACCESS_TOKEN) is not valid for Marketing API. See docs/TIKTOK-DEVELOPER-API.md"
    );
  }
  return marketing;
}

function advertiserId() {
  return process.env.TIKTOK_ADVERTISER_ID || "";
}

async function tiktokGet(pathname, params = {}) {
  const accessToken = token();
  if (!accessToken) {
    throw new Error(
      "Missing TIKTOK_MARKETING_ACCESS_TOKEN (or TIKTOK_ACCESS_TOKEN). See docs/TIKTOK-MCP-CONNECT.md"
    );
  }

  const url = new URL(`${API}${pathname}`);
  url.searchParams.set("access_token", accessToken);
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== "") url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json();
  if (!res.ok || data.code !== 0) {
    const msg = data.message || data.msg || res.statusText;
    throw new Error(`TikTok API ${pathname}: ${msg} (code ${data.code ?? res.status})`);
  }
  return data.data;
}

async function main() {
  console.log("TikTok Marketing API verify\n");

  const advertisers = await tiktokGet("/oauth2/advertiser/get/", {
    app_id: process.env.TIKTOK_APP_ID || "",
    secret: process.env.TIKTOK_APP_SECRET || "",
  }).catch(async () => {
    // Some tokens work without app_id/secret on advertiser list — try authorized accounts.
    const id = advertiserId();
    if (!id) throw new Error("Set TIKTOK_ADVERTISER_ID in .env.local");
    const info = await tiktokGet("/advertiser/info/", {
      advertiser_ids: JSON.stringify([id]),
    });
    return { list: [{ advertiser_id: id, advertiser_name: info?.list?.[0]?.name || id }] };
  });

  const list = advertisers?.list || advertisers || [];
  console.log(`Advertisers accessible: ${Array.isArray(list) ? list.length : 1}`);
  for (const row of (Array.isArray(list) ? list : [list]).slice(0, 5)) {
    console.log(`  - ${row.advertiser_id}  ${row.advertiser_name || ""}`);
  }

  const id = advertiserId();
  if (id) {
    const campaigns = await tiktokGet("/campaign/get/", {
      advertiser_id: id,
      page: 1,
      page_size: 5,
    });
    const rows = campaigns?.list || [];
    console.log(`\nCampaigns (first 5) for ${id}: ${rows.length}`);
    for (const c of rows) {
      console.log(`  - ${c.campaign_name}  [${c.operation_status}]  id=${c.campaign_id}`);
    }
  } else {
    console.log("\nTip: add TIKTOK_ADVERTISER_ID to .env.local for campaign listing.");
  }

  console.log("\nOK — credentials work. Enable TikTok MCP in Cursor (docs/TIKTOK-MCP-CONNECT.md).");
}

main().catch((err) => {
  console.error("\nFAILED:", err.message);
  console.error("\nSetup: docs/TIKTOK-MCP-CONNECT.md");
  process.exit(1);
});
