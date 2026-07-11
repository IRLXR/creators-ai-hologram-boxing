#!/usr/bin/env node
/**
 * Launch influencer/creator recruitment ads on Meta (PAUSED by default).
 * Spec: ads/influencer-recruit/CAMPAIGN-SPEC.json
 *
 * Usage:
 *   node scripts/marketing/launch-influencer-ads.mjs
 *   node scripts/marketing/launch-influencer-ads.mjs --execute
 *   node scripts/marketing/launch-influencer-ads.mjs --execute --activate
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const os = require("os");
const {
  verifyConnection,
  getAdAccountBillingStatus,
  createCampaign,
  createAdSet,
  createAdCreative,
  createAd,
  uploadVideo,
  uploadAdImage,
  waitForVideo,
  pickImageUrl,
  defaultTargeting,
} = require("../meta/meta-client");

const ROOT = path.join(__dirname, "../..");
const SPEC = JSON.parse(
  fs.readFileSync(path.join(ROOT, "ads/influencer-recruit/CAMPAIGN-SPEC.json"), "utf8")
);

function loadEnv() {
  const envFile = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envFile)) return;
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim();
  }
}

function thumb(videoPath) {
  const out = path.join(os.tmpdir(), `meta-inf-thumb-${Date.now()}.jpg`);
  execFileSync(
    "ffmpeg",
    ["-y", "-i", videoPath, "-ss", "00:00:01", "-vframes", "1", "-q:v", "2", out],
    { stdio: "ignore" }
  );
  return out;
}

async function main() {
  loadEnv();
  const execute = process.argv.includes("--execute");
  const activate = process.argv.includes("--activate");
  const status = activate ? "ACTIVE" : "PAUSED";
  const m = SPEC.meta;
  const videoPath = path.join(ROOT, m.video);

  const plan = {
    campaign: m.campaign_name,
    adSet: m.adset_name,
    ad: m.ad_name,
    budget: `$${m.daily_budget_usd}/day`,
    status,
    landing: m.landing_url,
    headline: m.headline,
    primary: m.primary_text,
    video: m.video,
  };

  console.log("\nInfluencer recruitment — Meta launch plan");
  console.log(JSON.stringify(plan, null, 2));

  if (!execute) {
    console.log("\nDry run. Add --execute to create PAUSED campaign in Meta.");
    console.log("Add --execute --activate to turn on spend (not recommended until you approve).");
    return;
  }

  if (!fs.existsSync(videoPath)) {
    throw new Error(`Video missing: ${m.video}. Run build-optimized-poster.py first.`);
  }

  const { me, adAccount } = await verifyConnection();
  console.log(`\nConnected: ${me.name} · ${adAccount.name}`);

  const billing = await getAdAccountBillingStatus();
  if (!billing.funding_source_details) {
    console.warn("\n⚠ No payment method on Meta — ad creation may fail (1359188).");
  }

  console.log(`\nCreating campaign (${status})…`);
  const campaign = await createCampaign({
    name: m.campaign_name,
    objective: m.objective,
    status,
  });
  console.log("Campaign:", campaign.id);

  const adSet = await createAdSet({
    campaignId: campaign.id,
    name: m.adset_name,
    dailyBudgetUsd: m.daily_budget_usd,
    optimizationGoal: m.optimization_goal,
    targeting: defaultTargeting(),
    status,
  });
  console.log("Ad set:", adSet.id);

  console.log("Uploading video…");
  const vu = await uploadVideo(videoPath);
  const ready = await waitForVideo(vu.id);
  const tp = thumb(videoPath);
  const img = await uploadAdImage(tp);
  fs.unlinkSync(tp);

  const creative = await createAdCreative({
    name: `${m.ad_name}_Creative`,
    pageId: process.env.META_PAGE_ID,
    videoId: vu.id,
    imageUrl: pickImageUrl(img, ready),
    headline: m.headline,
    message: m.primary_text,
    linkUrl: m.landing_url,
    callToAction: m.call_to_action,
  });
  console.log("Creative:", creative.id);

  const ad = await createAd({
    name: m.ad_name,
    adSetId: adSet.id,
    creativeId: creative.id,
    status,
  });
  console.log("Ad:", ad.id);

  const act = process.env.META_AD_ACCOUNT_ID;
  console.log("\n✓ Meta influencer ad created");
  console.log(JSON.stringify({ campaignId: campaign.id, adSetId: adSet.id, adId: ad.id, creativeId: creative.id }, null, 2));
  console.log(`\nAds Manager: https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${act}&selected_campaign_ids=${campaign.id}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
