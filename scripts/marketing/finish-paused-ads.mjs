#!/usr/bin/env node
/**
 * Finish Day 1 Meta ads as PAUSED (no spend until you activate in Ads Manager).
 * Requires: META_ACCESS_TOKEN + billing on act_534185933351087
 *
 * Usage: node scripts/marketing/finish-paused-ads.mjs
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const os = require("os");
const {
  createAd,
  uploadVideo,
  uploadAdImage,
  waitForVideo,
  pickImageUrl,
  createAdCreative,
  updateObjectStatus,
} = require("../meta/meta-client");

const ROOT = path.join(__dirname, "../..");
const envFile = path.join(ROOT, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim();
  }
}

const CAMPAIGN_ID = "120249813620400588";
const ADSET_ID = "120249813620600588";
const WALK_CREATIVE_ID = "1535420298240214";
const LANDING = "https://www.hologramboxing.com/landing.html";

function thumb(videoPath) {
  const out = path.join(os.tmpdir(), `meta-thumb-${Date.now()}.jpg`);
  execFileSync(
    "ffmpeg",
    ["-y", "-i", videoPath, "-ss", "00:00:01", "-vframes", "1", "-q:v", "2", out],
    { stdio: "ignore" }
  );
  return out;
}

async function main() {
  console.log("Ensuring campaign + ad set stay PAUSED…");
  await updateObjectStatus(CAMPAIGN_ID, "PAUSED");
  await updateObjectStatus(ADSET_ID, "PAUSED");

  console.log("Creating Walk Inside ad (PAUSED)…");
  const walk = await createAd({
    name: "AD_HB_WalkInside_Launch15s",
    adSetId: ADSET_ID,
    creativeId: WALK_CREATIVE_ID,
    status: "PAUSED",
  });
  console.log("  Ad:", walk.id);

  const futurePath = path.join(ROOT, "ads/output/FUTURE-IS-HERE-15s-9x16-VO.mp4");
  console.log("Uploading Future Is Here…");
  const vu = await uploadVideo(futurePath);
  const ready = await waitForVideo(vu.id);
  const tp = thumb(futurePath);
  const img = await uploadAdImage(tp);
  fs.unlinkSync(tp);
  const cr = await createAdCreative({
    name: "AD_HB_FutureIsHere_Launch15s_VO_Creative",
    pageId: process.env.META_PAGE_ID,
    videoId: vu.id,
    imageUrl: pickImageUrl(img, ready),
    headline: "The Future Is Here",
    message:
      "The future of live entertainment just arrived. Walk into the arena, gear up, and watch AI hologram boxers go live — front row energy you've never felt before. Become a Founding Fan.",
    linkUrl: `${LANDING}?utm_source=meta&utm_medium=paid_social&utm_campaign=future_is_here&utm_content=launch_15s_vo`,
    callToAction: "SIGN_UP",
  });
  console.log("  Creative:", cr.id);

  const future = await createAd({
    name: "AD_HB_FutureIsHere_Launch15s_VO",
    adSetId: ADSET_ID,
    creativeId: cr.id,
    status: "PAUSED",
  });
  console.log("  Ad:", future.id);

  console.log("\nDone — all PAUSED. Turn on in Ads Manager when ready:");
  console.log(
    `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${process.env.META_AD_ACCOUNT_ID}&selected_campaign_ids=${CAMPAIGN_ID}`
  );
}

main().catch((e) => {
  console.error(e.message);
  if (e.message.includes("1359188")) {
    console.error("\nAdd billing first: https://adsmanager.facebook.com/adsmanager/manage/ad_account_settings/ad_account_setup?act=534185933351087");
  }
  process.exit(1);
});
