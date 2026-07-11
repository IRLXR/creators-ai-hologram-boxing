#!/usr/bin/env node
/**
 * New ad set / ad group — exact Open Call poster (no copy changes).
 * TikTok + Meta, PAUSED/DISABLE by default.
 *
 * Usage:
 *   node scripts/marketing/launch-open-call-exact-adset.js
 *   node scripts/marketing/launch-open-call-exact-adset.js --execute
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const os = require("os");
const {
  verifyConnection,
  createAdSet,
  createAdCreative,
  createAd,
  uploadVideo,
  uploadAdImage,
  waitForVideo,
  pickImageUrl,
} = require("../meta/meta-client");

const ROOT = path.join(__dirname, "../..");
const COPY = JSON.parse(
  fs.readFileSync(path.join(ROOT, "ads/influencer-recruit/OPEN-CALL-EXACT-COPY.json"), "utf8")
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
  const out = path.join(os.tmpdir(), `meta-exact-thumb-${Date.now()}.jpg`);
  execFileSync(
    "ffmpeg",
    ["-y", "-i", videoPath, "-ss", "00:00:01", "-vframes", "1", "-q:v", "2", out],
    { stdio: "ignore" }
  );
  return out;
}

function creatorTargetingMeta() {
  return {
    geo_locations: { countries: ["US"] },
    age_min: 18,
    age_max: 34,
    publisher_platforms: ["facebook", "instagram"],
    facebook_positions: ["feed", "story"],
    instagram_positions: ["stream", "story", "reels"],
    targeting_automation: { advantage_audience: 0 },
  };
}

async function launchMeta(status) {
  const m = COPY.meta;
  const videoPath = path.join(ROOT, COPY.video);
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Missing ${COPY.video}. Run build-exact-poster-video.py first.`);
  }

  const adSet = await createAdSet({
    campaignId: m.campaign_id,
    name: m.adset_name,
    dailyBudgetUsd: 20,
    optimizationGoal: "LINK_CLICKS",
    targeting: creatorTargetingMeta(),
    status,
  });

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
    callToAction: "SIGN_UP",
  });

  const ad = await createAd({
    name: m.ad_name,
    adSetId: adSet.id,
    creativeId: creative.id,
    status,
  });

  return { adSetId: adSet.id, adId: ad.id, creativeId: creative.id };
}

async function main() {
  loadEnv();
  const execute = process.argv.includes("--execute");
  const status = process.argv.includes("--activate") ? "ACTIVE" : "PAUSED";

  console.log("\nOpen Call EXACT poster — new ad set plan (ACMO creator targeting)");
  console.log(JSON.stringify({ tiktok: COPY.tiktok, meta: { ...COPY.meta, status } }, null, 2));

  if (!execute) {
    console.log("\nDry run. Add --execute to create PAUSED ad sets.");
    console.log("TikTok ad group is created via MCP in the same run when --execute is set.");
    return;
  }

  console.log("\n--- Meta ---");
  await verifyConnection();
  const meta = await launchMeta(status);
  console.log("Meta ad set:", meta.adSetId, "· ad:", meta.adId);

  const act = process.env.META_AD_ACCOUNT_ID;
  console.log(
    `Meta Ads Manager: https://adsmanager.facebook.com/adsmanager/manage/adsets?act=${act}&selected_adset_ids=${meta.adSetId}`
  );
  console.log("\nTikTok ad group: run MCP step after video upload (see script output in assistant session).");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
