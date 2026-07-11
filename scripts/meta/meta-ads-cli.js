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
const { execFileSync } = require("child_process");
const os = require("os");
const {
  verifyConnection,
  getAdAccountBillingStatus,
  listCampaigns,
  createCampaign,
  createAdSet,
  createAdCreative,
  createAd,
  updateObjectStatus,
  uploadVideo,
  uploadAdImage,
  waitForVideo,
  pickImageUrl,
  defaultTargeting,
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

const TEST_AD = {
  campaignName: "CAMP_HB_Test_001",
  adSetName: "ADSET_HB_Test_US_18-44",
  adName: "AD_HB_Test_WalkInside_001",
  video: "ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4",
  headline: "Would You Walk Inside?",
  message:
    "Something the world has never seen is waiting behind that door. AI hologram boxers. Live. Front row energy. Become a Founding Fan.",
  linkUrl:
    "https://www.hologramboxing.com/landing.html?utm_source=meta&utm_medium=paid_social&utm_campaign=test&utm_content=walk_inside",
  callToAction: "SIGN_UP",
  dailyBudgetUsd: 5,
};

function extractThumbnail(videoPath) {
  const thumbPath = path.join(os.tmpdir(), `meta-test-thumb-${Date.now()}.jpg`);
  execFileSync(
    "ffmpeg",
    ["-y", "-i", videoPath, "-ss", "00:00:01", "-vframes", "1", "-q:v", "2", thumbPath],
    { stdio: "ignore" }
  );
  return thumbPath;
}

async function cmdCreateTestAd(execute) {
  const root = path.join(__dirname, "../..");
  const videoPath = path.join(root, TEST_AD.video);
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Video not found: ${TEST_AD.video}`);
  }

  const plan = {
    ...TEST_AD,
    videoPath,
    status: "PAUSED",
    note: "Creates traffic test campaign + ad set + video ad for landing page preview.",
  };

  if (!execute) {
    printJson("Dry run — would create test ad", plan);
    console.log("\nAdd --execute to upload video and create PAUSED test ad in Meta.");
    return;
  }

  console.log("Creating test traffic campaign…");
  const campaignRes = await createCampaign({
    name: TEST_AD.campaignName,
    objective: "OUTCOME_TRAFFIC",
    status: "PAUSED",
  });
  console.log("Campaign:", campaignRes.id);

  const adSetRes = await createAdSet({
    campaignId: campaignRes.id,
    name: TEST_AD.adSetName,
    dailyBudgetUsd: TEST_AD.dailyBudgetUsd,
    optimizationGoal: "LINK_CLICKS",
    targeting: defaultTargeting(),
    status: "PAUSED",
  });
  console.log("Ad set:", adSetRes.id);

  console.log("Uploading video (this may take a minute)…");
  const videoUpload = await uploadVideo(videoPath);
  const videoId = videoUpload.id;
  console.log("Video ID:", videoId);

  console.log("Waiting for Meta video processing…");
  const videoReady = await waitForVideo(videoId);

  console.log("Uploading thumbnail…");
  const thumbPath = extractThumbnail(videoPath);
  const imageUpload = await uploadAdImage(thumbPath);
  fs.unlinkSync(thumbPath);
  const imageUrl = pickImageUrl(imageUpload, videoReady);

  const pageId = process.env.META_PAGE_ID;
  const creativeRes = await createAdCreative({
    name: `${TEST_AD.adName}_Creative`,
    pageId,
    videoId,
    imageUrl,
    message: TEST_AD.message,
    headline: TEST_AD.headline,
    linkUrl: TEST_AD.linkUrl,
    callToAction: TEST_AD.callToAction,
  });
  console.log("Creative:", creativeRes.id);

  const adRes = await createAd({
    name: TEST_AD.adName,
    adSetId: adSetRes.id,
    creativeId: creativeRes.id,
    status: "PAUSED",
  });
  console.log("Ad:", adRes.id);

  printJson("Test ad created (PAUSED)", {
    campaignId: campaignRes.id,
    adSetId: adSetRes.id,
    videoId,
    creativeId: creativeRes.id,
    adId: adRes.id,
    previewUrl: `https://adsmanager.facebook.com/adsmanager/manage/ads?act=${process.env.META_AD_ACCOUNT_ID}&selected_ad_ids=${adRes.id}`,
  });
  console.log("\nOpen Ads Manager → preview ad → turn ON only when ready to spend.");
}

const LANDING_BASE = "https://www.hologramboxing.com/landing.html";

const DAY1_LAUNCH = {
  campaignName: "CAMP_HB_Experience_001",
  adSetName: "ADSET_HB_Experience_US_18-44",
  dailyBudgetUsd: 20,
  objective: "OUTCOME_TRAFFIC",
  optimizationGoal: "LINK_CLICKS",
  ads: [
    {
      name: "AD_HB_WalkInside_Launch15s",
      video: "ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4",
      headline: "Would You Walk Inside?",
      message:
        "Something the world has never seen is waiting behind that door. AI hologram boxers. Live. Front row energy. Become a Founding Fan.",
      linkUrl:
        `${LANDING_BASE}?utm_source=meta&utm_medium=paid_social&utm_campaign=walk_inside&utm_content=launch_15s_vo`,
      callToAction: "SIGN_UP",
    },
    {
      name: "AD_HB_FutureIsHere_Launch15s_VO",
      video: "ads/output/FUTURE-IS-HERE-15s-9x16-VO.mp4",
      headline: "The Future Is Here",
      message:
        "The future of live entertainment just arrived. Walk into the arena, gear up, and watch AI hologram boxers go live — front row energy you've never felt before. Become a Founding Fan.",
      linkUrl:
        `${LANDING_BASE}?utm_source=meta&utm_medium=paid_social&utm_campaign=future_is_here&utm_content=launch_15s_vo`,
      callToAction: "SIGN_UP",
    },
  ],
};

async function createVideoAd({ adSpec, adSetId, pageId, status }) {
  const root = path.join(__dirname, "../..");
  const videoPath = path.join(root, adSpec.video);
  if (!fs.existsSync(videoPath)) {
    throw new Error(`Video not found: ${adSpec.video}`);
  }

  console.log(`Uploading ${path.basename(videoPath)}…`);
  const videoUpload = await uploadVideo(videoPath);
  const videoId = videoUpload.id;
  console.log("  Video ID:", videoId);

  console.log("  Waiting for Meta video processing…");
  const videoReady = await waitForVideo(videoId);

  console.log("  Uploading thumbnail…");
  const thumbPath = extractThumbnail(videoPath);
  const imageUpload = await uploadAdImage(thumbPath);
  fs.unlinkSync(thumbPath);
  const imageUrl = pickImageUrl(imageUpload, videoReady);

  const creativeRes = await createAdCreative({
    name: `${adSpec.name}_Creative`,
    pageId,
    videoId,
    imageUrl,
    message: adSpec.message,
    headline: adSpec.headline,
    linkUrl: adSpec.linkUrl,
    callToAction: adSpec.callToAction,
  });
  console.log("  Creative:", creativeRes.id);

  const adRes = await createAd({
    name: adSpec.name,
    adSetId,
    creativeId: creativeRes.id,
    status,
  });
  console.log("  Ad:", adRes.id);
  return { videoId, creativeId: creativeRes.id, adId: adRes.id };
}

async function cmdLaunchDay1(execute, activate) {
  const status = activate ? "ACTIVE" : "PAUSED";
  const plan = { ...DAY1_LAUNCH, status, landing: LANDING_BASE };

  if (!execute) {
    printJson("Dry run — Day 1 Meta launch (2 hero ads)", plan);
    console.log("\nAdd --execute to create in Meta.");
    console.log("Add --execute --activate to create AND turn on spend ($20/day).");
    console.log("\nTikTok Day 1 ($15/day): open ads/launch-hub.html → TikTok tab (manual upload).");
    return;
  }

  console.log("Checking Meta connection and billing…");
  const { me, adAccount } = await verifyConnection();
  console.log(`Connected as ${me.name} · Ad account ${adAccount.name} (status ${adAccount.account_status})`);

  const billing = await getAdAccountBillingStatus();
  if (!billing.funding_source_details && billing.account_status !== 1) {
    console.warn(
      "\n⚠ No payment method detected. Ad creation may fail (error 1359188)."
    );
    console.warn(
      "Add billing: https://adsmanager.facebook.com/adsmanager/manage/ad_account_settings/ad_account_setup?act=534185933351087"
    );
  }

  console.log(`\nCreating Day 1 campaign (${status})…`);
  const campaignRes = await createCampaign({
    name: DAY1_LAUNCH.campaignName,
    objective: DAY1_LAUNCH.objective,
    status,
  });
  console.log("Campaign:", campaignRes.id);

  const adSetRes = await createAdSet({
    campaignId: campaignRes.id,
    name: DAY1_LAUNCH.adSetName,
    dailyBudgetUsd: DAY1_LAUNCH.dailyBudgetUsd,
    optimizationGoal: DAY1_LAUNCH.optimizationGoal,
    targeting: defaultTargeting(),
    status,
  });
  console.log("Ad set:", adSetRes.id, `($${DAY1_LAUNCH.dailyBudgetUsd}/day)`);

  const pageId = process.env.META_PAGE_ID;
  const createdAds = [];
  for (const adSpec of DAY1_LAUNCH.ads) {
    console.log(`\nCreating ad: ${adSpec.name}`);
    const result = await createVideoAd({ adSpec, adSetId: adSetRes.id, pageId, status });
    createdAds.push({ ...adSpec, ...result });
  }

  const act = process.env.META_AD_ACCOUNT_ID;
  printJson(`Day 1 Meta ads ${activate ? "LIVE" : "created (PAUSED)"}`, {
    campaignId: campaignRes.id,
    adSetId: adSetRes.id,
    dailyBudgetUsd: DAY1_LAUNCH.dailyBudgetUsd,
    landingUrl: LANDING_BASE,
    ads: createdAds,
    adsManagerUrl: `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${act}&selected_campaign_ids=${campaignRes.id}`,
  });

  if (activate) {
    console.log("\n✓ Meta ads are ACTIVE — spending up to $20/day.");
  } else {
    console.log("\nAds created PAUSED. Re-run with --execute --activate to turn on spend.");
  }
  console.log("\nTikTok ($15/day): ads/launch-hub.html → TikTok tab → upload same 2 videos.");
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const [command, arg] = args;
  const execute = args.includes("--execute");
  const activate = args.includes("--activate");

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
    case "create-test-ad":
      await cmdCreateTestAd(execute);
      break;
    case "launch-day1":
      await cmdLaunchDay1(execute, activate);
      break;
    default:
      console.log(`Meta Marketing API — Hologram Boxing

Commands:
  verify              Test token + ad account act_${process.env.META_AD_ACCOUNT_ID || "534185933351087"}
  list                List existing campaigns
  plan [name]         Show Campaign → Ad Set → Ads mapping from campaigns.json
  create-waitlist     Create PAUSED waitlist campaign + ad set (--execute)
  create-test-ad      Upload hero video + create PAUSED test ad (--execute)
  launch-day1         Day 1: 2 hero ads → landing ($20/day Meta) (--execute [--activate])

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
