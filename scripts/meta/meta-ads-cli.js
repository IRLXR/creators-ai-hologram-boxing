#!/usr/bin/env node
/**
 * Meta Marketing API CLI for Hologram Boxing.
 *
 * Usage:
 *   node scripts/meta/meta-ads-cli.js verify
 *   node scripts/meta/meta-ads-cli.js list
 *   node scripts/meta/meta-ads-cli.js plan [campaign_name]
 *   node scripts/meta/meta-ads-cli.js create-waitlist --execute
 *
 * Env (.env.local): META_ACCESS_TOKEN, META_AD_ACCOUNT_ID, META_PAGE_ID
 */

const fs = require("fs");
const path = require("path");
const {
  verifyConnection,
  listCampaigns,
  createCampaign,
  createAdSet,
} = require("./meta-client");
const { listAllBundles, mapCampaignBundle, loadCampaignConfig } = require("./map-campaigns");

function loadEnv() {
  const envFile = path.join(__dirname, "../../.env.local");
  if (!fs.existsSync(envFile)) return;
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

function printJson(label, data) {
  console.log(`\n${label}\n${"─".repeat(label.length)}`);
  console.log(JSON.stringify(data, null, 2));
}

async function cmdVerify() {
  const { me, adAccount } = await verifyConnection();
  printJson("Connected as", me);
  printJson("Ad account", adAccount);
  console.log("\nReady for Campaign → Ad Set → Creative → Ad automation.");
}

async function cmdList() {
  const data = await listCampaigns();
  printJson("Existing campaigns", data);
}

function cmdPlan(campaignName) {
  const config = loadCampaignConfig();
  const entries = config.campaigns.filter(
    (c) => !campaignName || c.meta.campaign_name === campaignName
  );
  if (!entries.length) {
    console.error(`No campaign matching: ${campaignName || "(none)"}`);
    process.exit(1);
  }
  for (const entry of entries) {
    const bundle = mapCampaignBundle(config, entry);
    printJson(`Plan: ${bundle.campaign.name}`, bundle);
  }
  console.log("\nMeta structure:");
  console.log("  1. Campaign  — objective only");
  console.log("  2. Ad Set    — budget, schedule, audience, bidding");
  console.log("  3. Creative  — video/image + copy (immutable after create)");
  console.log("  4. Ad        — links creative to ad set");
  console.log("\nRun with --execute to create campaign + ad set (PAUSED).");
  console.log("Creatives/ads require uploaded video IDs (META_VIDEO_ID or upload step).");
}

async function cmdCreateWaitlist(execute) {
  const config = loadCampaignConfig();
  const entry = config.campaigns.find((c) => c.meta.campaign_name === "CAMP_HB_Waitlist_001");
  if (!entry) throw new Error("CAMP_HB_Waitlist_001 not found in ads/campaigns.json");

  const bundle = mapCampaignBundle(config, entry);
  if (!execute) {
    printJson("Dry run — would create", bundle);
    console.log("\nAdd --execute to POST to Meta (creates PAUSED campaign + ad set).");
    return;
  }

  const campaignRes = await createCampaign(bundle.campaign);
  console.log("Created campaign:", campaignRes.id);

  const adSetRes = await createAdSet({
    campaignId: campaignRes.id,
    ...bundle.adSet,
  });
  console.log("Created ad set:", adSetRes.id);
  console.log("\nNext: upload videos, create ad creatives, then ads.");
  printJson("Ads to attach", bundle.ads);
}

async function main() {
  loadEnv();
  const [command, arg, ...rest] = process.argv.slice(2);
  const execute = rest.includes("--execute");

  switch (command) {
    case "verify":
      await cmdVerify();
      break;
    case "list":
      await cmdList();
      break;
    case "plan":
      cmdPlan(arg);
      break;
    case "create-waitlist":
      await cmdCreateWaitlist(execute);
      break;
    default:
      console.log(`Meta Marketing API — Hologram Boxing

Commands:
  verify              Test token + ad account act_${process.env.META_AD_ACCOUNT_ID || "534185933351087"}
  list                List existing campaigns
  plan [name]         Show Campaign → Ad Set → Ads mapping from campaigns.json
  create-waitlist     Create PAUSED waitlist campaign + ad set (--execute)

Setup:
  1. Copy .env.example → .env.local
  2. Add META_ACCESS_TOKEN (ads_read, ads_management)
  3. Add META_PAGE_ID (Facebook Page connected to ad account)
`);
      process.exit(command ? 1 : 0);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
