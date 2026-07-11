#!/usr/bin/env node
/**
 * Launch influencer 5-layer staircase on Meta (PAUSED by default).
 * Mirrors ads/influencer-recruit/INFLUENCER-STAIRCASE.json
 *
 * Usage:
 *   node scripts/marketing/launch-influencer-staircase-meta.js
 *   node scripts/marketing/launch-influencer-staircase-meta.js --execute
 *   node scripts/marketing/launch-influencer-staircase-meta.js --execute --layer L1
 */
const fs = require("fs");
const path = require("path");
const {
  verifyConnection,
  createCampaign,
  createAdSet,
  createAdCreative,
  createAd,
  uploadVideo,
  uploadAdImage,
  waitForVideo,
  pickImageUrl,
  floridaTargeting,
} = require("../meta/meta-client");

const ROOT = path.join(__dirname, "../..");
const STAIRCASE_PATH = path.join(ROOT, "ads/influencer-recruit/INFLUENCER-STAIRCASE.json");
const MANIFEST_PATH = path.join(ROOT, "ads/influencer-recruit/LAUNCH-MANIFEST.json");
const LANDING = "https://www.hologramboxing.com/landing.html";

const VIDEOS = {
  walk: "ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4",
  future_mystery: "ads/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4",
  calling_all: "ads/influencer-recruit/output/TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4",
  livefx: "ads/output/32-live-interactive-effects-plate.mp4",
  stream: "ugc/output/08-watch-free-on-kick-twitch-plate.mp4",
  tent: "ugc/output/02-the-inflatable-tent-plate.mp4",
  open_exact: "ads/influencer-recruit/output/OPEN-CALL-EXACT-POSTER-15s.mp4",
  open_opt: "ads/influencer-recruit/output/TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4",
  creator_reminder: "ads/influencer-recruit/output/CREATOR-REMINDER-15s.mp4",
  streamer_last_call: "ads/influencer-recruit/output/STREAMER-LAST-CALL-15s.mp4",
};

const LAYER_META = {
  L1_see_you: { objective: "OUTCOME_AWARENESS", optimizationGoal: "REACH", budget: 20, cta: "LEARN_MORE" },
  L2_get_curious: { objective: "OUTCOME_TRAFFIC", optimizationGoal: "LINK_CLICKS", budget: 20, cta: "LEARN_MORE" },
  L3_sign_up: { objective: "OUTCOME_TRAFFIC", optimizationGoal: "LINK_CLICKS", budget: 20, cta: "SIGN_UP", existing: true },
  L4_come_back: { objective: "OUTCOME_TRAFFIC", optimizationGoal: "LINK_CLICKS", budget: 20, cta: "SIGN_UP" },
  L5_show_up: { objective: "OUTCOME_TRAFFIC", optimizationGoal: "LINK_CLICKS", budget: 20, cta: "SIGN_UP" },
};

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
  const { execFileSync } = require("child_process");
  const os = require("os");
  const out = path.join(os.tmpdir(), `meta-staircase-thumb-${Date.now()}.jpg`);
  execFileSync("ffmpeg", ["-y", "-i", videoPath, "-ss", "00:00:01", "-vframes", "1", "-q:v", "2", out], {
    stdio: "ignore",
  });
  return out;
}

function landingUrl(layerKey, slug, suffix) {
  const layer = layerKey.replace(/^L\d_/, "").replace(/_/g, "");
  const content = `inf_${layer}_${slug}_${suffix}`.toLowerCase();
  return `${LANDING}?utm_source=meta&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=${content}`;
}

async function ensureVideo(manifest, creativeKey) {
  manifest.meta = manifest.meta || {};
  manifest.meta.video_ids = manifest.meta.video_ids || {};
  if (manifest.meta.video_ids[creativeKey]) return manifest.meta.video_ids[creativeKey];

  const rel = VIDEOS[creativeKey];
  const videoPath = path.join(ROOT, rel);
  if (!fs.existsSync(videoPath)) throw new Error(`Missing video: ${rel}`);
  console.log(`  Uploading ${path.basename(videoPath)}…`);
  const vu = await uploadVideo(videoPath);
  const ready = await waitForVideo(vu.id);
  const tp = thumb(videoPath);
  const img = await uploadAdImage(tp);
  fs.unlinkSync(tp);
  const asset = { videoId: vu.id, imageUrl: pickImageUrl(img, ready), file: rel };
  manifest.meta.video_ids[creativeKey] = asset;
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  return asset;
}

async function createVideoAd({ adSpec, adSetId, pageId, status, manifest }) {
  const asset = await ensureVideo(manifest, adSpec.creative);
  const creativeRes = await createAdCreative({
    name: `${adSpec.name}_Creative`,
    pageId,
    videoId: asset.videoId,
    imageUrl: asset.imageUrl,
    message: adSpec.message,
    headline: adSpec.headline,
    linkUrl: adSpec.linkUrl,
    callToAction: adSpec.cta || "SIGN_UP",
  });
  const adRes = await createAd({
    name: adSpec.name,
    adSetId,
    creativeId: creativeRes.id,
    status,
  });
  return { adId: adRes.id, creativeId: creativeRes.id };
}

async function launchLayer(layerKey, layer, status, manifest, onlyLayer) {
  if (onlyLayer && !layerKey.startsWith(`L${onlyLayer.replace(/^L/i, "")}_`)) return null;
  if (layerKey === "L3_sign_up") {
    console.log(`\n=== ${layerKey} — EXISTING Meta campaign ${layer.campaign_id_meta} (skip create) ===`);
    return { layerKey, skipped: true, campaignId: layer.campaign_id_meta };
  }

  const meta = LAYER_META[layerKey];
  if (!meta) return null;

  console.log(`\n=== Meta ${layerKey} · ${layer.plain_english} ===`);
  const campaign = await createCampaign({
    name: layer.meta_campaign,
    objective: meta.objective,
    status,
  });
  console.log("Campaign:", campaign.id);

  const pageId = process.env.META_PAGE_ID;
  const results = { layerKey, campaignId: campaign.id, adsets: [] };

  for (const group of layer.adgroups) {
    const adSet = await createAdSet({
      campaignId: campaign.id,
      name: group.name.replace(/^ADGRP/, "ADSET"),
      dailyBudgetUsd: meta.budget,
      optimizationGoal: meta.optimizationGoal,
      targeting: floridaTargeting({ ageMin: group.age_min, ageMax: group.age_max }),
      status,
    });
    console.log(`  Ad set: ${adSet.id} (${group.name})`);

    const ads = [];
    for (const ad of layer.ads) {
      const adName = `AD_HB_Inf_L${layer.step}_${ad.suffix}_${group.slug === "gaming" ? "Gaming" : "Creators"}`;
      console.log(`    Ad: ${adName}`);
      const created = await createVideoAd({
        adSpec: {
          name: adName,
          creative: ad.creative,
          headline: ad.headline,
          message: ad.meta_message,
          linkUrl: landingUrl(layerKey, group.slug, ad.suffix),
          cta: meta.cta,
        },
        adSetId: adSet.id,
        pageId,
        status,
        manifest,
      });
      ads.push({ name: adName, ...created });
    }
    results.adsets.push({ name: group.name, id: adSet.id, ads });
  }
  return results;
}

async function main() {
  loadEnv();
  const execute = process.argv.includes("--execute");
  const onlyLayer = process.argv.find((a) => a.startsWith("--layer="))?.split("=")[1];

  const staircase = JSON.parse(fs.readFileSync(STAIRCASE_PATH, "utf8"));
  const manifest = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
    : { meta: { video_ids: {} } };

  if (!execute) {
    console.log("DRY RUN — influencer staircase Meta launch plan");
    console.log("Layers: L1 awareness, L2 traffic, L3 existing, L4/L5 retarget-ready conversion traffic");
    console.log("Run with --execute after META_ACCESS_TOKEN is refreshed.");
    return;
  }

  await verifyConnection();
  const status = "PAUSED";
  const all = [];

  for (const [layerKey, layer] of Object.entries(staircase.staircase)) {
    const res = await launchLayer(layerKey, layer, status, manifest, onlyLayer);
    if (res) all.push(res);
  }

  manifest.influencer_staircase = manifest.influencer_staircase || {};
  manifest.influencer_staircase.meta = { deployed_at: new Date().toISOString(), layers: all };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  const out = path.join(ROOT, "ads/influencer-recruit/staircase-meta-deploy.json");
  fs.writeFileSync(out, JSON.stringify(all, null, 2));
  console.log(`\nDone. Wrote ${out}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
