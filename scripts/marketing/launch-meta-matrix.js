#!/usr/bin/env node
/**
 * Launch full ad matrix on Meta (PAUSED by default).
 * Mirrors TikTok structure from AD-SET-AD-BUILD-MATRIX.md
 *
 * Usage:
 *   node scripts/marketing/launch-meta-matrix.js
 *   node scripts/marketing/launch-meta-matrix.js --execute
 *   node scripts/marketing/launch-meta-matrix.js --execute --phase founding_fan
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
  floridaTargeting,
  creatorInterestsTargeting,
} = require("../meta/meta-client");

const ROOT = path.join(__dirname, "../..");
const MANIFEST = path.join(ROOT, "ads/influencer-recruit/LAUNCH-MANIFEST.json");
const LANDING = "https://www.hologramboxing.com/landing.html";

const VIDEOS = {
  walk: "ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4",
  future_vo: "ads/output/FUTURE-IS-HERE-15s-9x16-VO.mp4",
  future_mystery: "ads/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4",
  whatis: "ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4",
  open_exact: "ads/influencer-recruit/output/OPEN-CALL-EXACT-POSTER-15s.mp4",
  open_opt: "ads/influencer-recruit/output/TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4",
  livefx: "ads/output/32-live-interactive-effects-plate.mp4",
};

const FOUNDING_FAN_PACK = [
  {
    suffix: "WalkInside",
    creative: "walk",
    headline: "Would You Walk Inside?",
    message:
      "Something the world has never seen is waiting behind that door. AI hologram boxers. Live. Front row energy. Become a Founding Fan.",
    utm_content: "walk_inside",
  },
  {
    suffix: "FutureIsHere",
    creative: "future_vo",
    headline: "The Future Is Here",
    message:
      "The future of live entertainment just arrived. Walk into the arena, gear up, and watch AI hologram boxers go live. Become a Founding Fan.",
    utm_content: "future_vo",
  },
  {
    suffix: "FutureMystery",
    creative: "future_mystery",
    headline: "The Future Is Here",
    message:
      "The future of live entertainment. Premium trailer energy — tent, headsets, hologram boxers going live. Become a Founding Fan.",
    utm_content: "future_mystery",
  },
  {
    suffix: "WhatIs",
    creative: "whatis",
    headline: "Join the Waitlist",
    message:
      "What is hologram boxing? Walk into an inflatable tent, AR on, watch Wave hologram boxers. Join the waitlist before tickets drop.",
    utm_content: "whatis",
  },
];

const ADSET_SLICES = [
  { slug: "CombatSports", name: "ADSET_HB_Convert_CombatSports_FL", ageMin: 18, ageMax: 44, budget: 15 },
  { slug: "TechGamers", name: "ADSET_HB_Convert_TechGamers_FL", ageMin: 18, ageMax: 34, budget: 15 },
  { slug: "General", name: "ADSET_HB_Convert_General_FL", ageMin: 18, ageMax: 44, budget: 15 },
  { slug: "FamilyNight", name: "ADSET_HB_Convert_FamilyNight_FL", ageMin: 25, ageMax: 54, budget: 10 },
];

const EXISTING = {
  influencer_campaign: "120249816887950588",
  influencer_adsets: {
    exact: "120249817287270588",
    recruit: "120249816888100588",
  },
  experience_campaign: "120249813620600588",
  experience_adset: "120249813620600588",
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
  const out = path.join(os.tmpdir(), `meta-matrix-thumb-${Date.now()}.jpg`);
  execFileSync(
    "ffmpeg",
    ["-y", "-i", videoPath, "-ss", "00:00:01", "-vframes", "1", "-q:v", "2", out],
    { stdio: "ignore" }
  );
  return out;
}

function loadManifest() {
  if (fs.existsSync(MANIFEST)) {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  }
  return { meta: { video_ids: {} }, tiktok: {} };
}

function saveManifest(m) {
  fs.writeFileSync(MANIFEST, JSON.stringify(m, null, 2));
}

function landingUrl(utmCampaign, utmContent, slug) {
  const content = `${utmContent}_${slug.toLowerCase()}`;
  return `${LANDING}?utm_source=meta&utm_medium=paid_social&utm_campaign=${utmCampaign}&utm_content=${content}`;
}

async function ensureVideoUploaded(manifest, creativeKey) {
  if (manifest.meta.video_ids[creativeKey]) {
    return manifest.meta.video_ids[creativeKey];
  }
  const rel = VIDEOS[creativeKey];
  const videoPath = path.join(ROOT, rel);
  if (!fs.existsSync(videoPath)) throw new Error(`Missing video: ${rel}`);
  console.log(`  Uploading ${path.basename(videoPath)}…`);
  const vu = await uploadVideo(videoPath);
  const ready = await waitForVideo(vu.id);
  const tp = thumb(videoPath);
  const img = await uploadAdImage(tp);
  fs.unlinkSync(tp);
  const imageUrl = pickImageUrl(img, ready);
  manifest.meta.video_ids[creativeKey] = { videoId: vu.id, imageUrl, file: rel };
  saveManifest(manifest);
  return manifest.meta.video_ids[creativeKey];
}

async function createVideoAd({ adSpec, adSetId, pageId, status, manifest }) {
  const asset = await ensureVideoUploaded(manifest, adSpec.creative);
  const creativeRes = await createAdCreative({
    name: `${adSpec.name}_Creative`,
    pageId,
    videoId: asset.videoId,
    imageUrl: asset.imageUrl,
    message: adSpec.message,
    headline: adSpec.headline,
    linkUrl: adSpec.linkUrl,
    callToAction: "SIGN_UP",
  });
  const adRes = await createAd({
    name: adSpec.name,
    adSetId,
    creativeId: creativeRes.id,
    status,
  });
  return { adId: adRes.id, creativeId: creativeRes.id };
}

async function launchFoundingFan(status, manifest) {
  console.log("\n=== Meta: Founding Fan conversion ===");
  const campaign = await createCampaign({
    name: "CAMP_HB_Convert_FoundingFan_001",
    objective: "OUTCOME_TRAFFIC",
    status,
  });
  console.log("Campaign:", campaign.id);

  const pageId = process.env.META_PAGE_ID;
  const results = { campaignId: campaign.id, adsets: [] };

  for (const slice of ADSET_SLICES) {
    console.log(`\nAd set: ${slice.name}`);
    const adSet = await createAdSet({
      campaignId: campaign.id,
      name: slice.name,
      dailyBudgetUsd: slice.budget,
      optimizationGoal: "LINK_CLICKS",
      targeting: floridaTargeting({ ageMin: slice.ageMin, ageMax: slice.ageMax }),
      status,
    });
    console.log("  Ad set:", adSet.id);

    const ads = [];
    for (const pack of FOUNDING_FAN_PACK) {
      const name = `AD_HB_Convert_${slice.slug}_${pack.suffix}`;
      console.log(`  Creating ${name}`);
      const ad = await createVideoAd({
        adSpec: {
          name,
          creative: pack.creative,
          headline: pack.headline,
          message: pack.message,
          linkUrl: landingUrl("founding_fan", pack.utm_content, slice.slug),
        },
        adSetId: adSet.id,
        pageId,
        status,
        manifest,
      });
      ads.push({ name, ...ad });
    }
    results.adsets.push({ name: slice.name, id: adSet.id, ads });
  }
  return results;
}

async function launchAwareness(status, manifest) {
  console.log("\n=== Meta: Awareness ===");
  const campaign = await createCampaign({
    name: "CAMP_HB_Awareness_001",
    objective: "OUTCOME_AWARENESS",
    status,
  });
  console.log("Campaign:", campaign.id);

  const slices = [
    { slug: "CombatSports", name: "ADSET_HB_Aware_CombatSports_FL", ageMin: 18, ageMax: 44 },
    { slug: "Tech", name: "ADSET_HB_Aware_Tech_FL", ageMin: 18, ageMax: 34 },
    { slug: "General", name: "ADSET_HB_Aware_General_FL", ageMin: 18, ageMax: 44 },
  ];
  const pack = FOUNDING_FAN_PACK.filter((p) => p.suffix !== "WhatIs");
  const pageId = process.env.META_PAGE_ID;
  const results = { campaignId: campaign.id, adsets: [] };

  for (const slice of slices) {
    const adSet = await createAdSet({
      campaignId: campaign.id,
      name: slice.name,
      dailyBudgetUsd: 10,
      optimizationGoal: "REACH",
      targeting: floridaTargeting({ ageMin: slice.ageMin, ageMax: slice.ageMax }),
      status,
    });
    const ads = [];
    for (const item of pack) {
      const name = `AD_HB_Aware_${slice.slug}_${item.suffix}`;
      const ad = await createVideoAd({
        adSpec: {
          name,
          creative: item.creative,
          headline: item.headline,
          message: item.message,
          linkUrl: landingUrl("awareness", item.utm_content, slice.slug),
        },
        adSetId: adSet.id,
        pageId,
        status,
        manifest,
      });
      ads.push({ name, ...ad });
    }
    results.adsets.push({ name: slice.name, id: adSet.id, ads });
  }
  return results;
}

async function launchInfluencerAdSets(status, manifest) {
  console.log("\n=== Meta: New influencer ad sets ===");
  const campaignId = EXISTING.influencer_campaign;
  const pageId = process.env.META_PAGE_ID;

  const slices = [
    { slug: "GamingStreamers", name: "ADSET_HB_InfluencerRecruit_GamingStreamers_FL", ageMin: 18, ageMax: 34 },
    { slug: "CombatCreators", name: "ADSET_HB_InfluencerRecruit_CombatCreators_FL", ageMin: 18, ageMax: 44 },
    { slug: "ReelsCreators", name: "ADSET_HB_InfluencerRecruit_ReelsCreators_FL", ageMin: 18, ageMax: 34 },
    { slug: "OrlandoMiami", name: "ADSET_HB_InfluencerRecruit_OrlandoMiami_FL", ageMin: 18, ageMax: 44, citiesOnly: true },
  ];

  const pack = [
    {
      suffix: "OpenCallExact",
      creative: "open_exact",
      headline: "WE WANT YOU!",
      message:
        "OPEN CALL for streamers & content creators. Live stream the first AI hologram boxing event — Kick, Twitch, YouTube, TikTok. Apply now.",
      utm_content: "open_call_exact",
    },
    {
      suffix: "OpenCallOpt",
      creative: "open_opt",
      headline: "Open Call — We Want You",
      message:
        "Calling streamers & content creators. Co-stream hologram boxing — VIP access, brand ambassador roles. Sign up.",
      utm_content: "open_call_optimized",
    },
    {
      suffix: "FutureCross",
      creative: "future_vo",
      headline: "Open Call — We Want You",
      message:
        "The future of live entertainment. Creators — stream the first AI hologram boxing event. WE WANT YOU!",
      utm_content: "future_creator_cross",
    },
    {
      suffix: "LiveFX",
      creative: "livefx",
      headline: "Stream the Tent — Live FX",
      message: "Stream the tent — live interactive effects. Kick & Twitch creators welcome. Sign up.",
      utm_content: "livefx_creator",
    },
  ];

  const results = { campaignId, adsets: [] };
  for (const slice of slices) {
    const targeting = slice.citiesOnly
      ? {
          ...floridaTargeting({ ageMin: slice.ageMin, ageMax: slice.ageMax }),
          geo_locations: {
            cities: [
              { key: "2429275", radius: 25, distance_unit: "mile" },
              { key: "2428987", radius: 25, distance_unit: "mile" },
            ],
            location_types: ["home", "recent"],
          },
        }
      : creatorInterestsTargeting();

    if (!slice.citiesOnly) {
      targeting.age_min = slice.ageMin;
      targeting.age_max = slice.ageMax;
    }

    const adSet = await createAdSet({
      campaignId,
      name: slice.name,
      dailyBudgetUsd: 20,
      optimizationGoal: "LINK_CLICKS",
      targeting,
      status,
    });

    const ads = [];
    for (const item of pack) {
      const name = `AD_HB_Influencer_${slice.slug}_${item.suffix}`;
      const ad = await createVideoAd({
        adSpec: {
          name,
          creative: item.creative,
          headline: item.headline,
          message: item.message,
          linkUrl: landingUrl("influencer_recruit", item.utm_content, slice.slug),
        },
        adSetId: adSet.id,
        pageId,
        status,
        manifest,
      });
      ads.push({ name, ...ad });
    }
    results.adsets.push({ name: slice.name, id: adSet.id, ads });
  }
  return results;
}

async function expandInfluencer(status, manifest) {
  console.log("\n=== Meta: Expand influencer ad sets ===");
  const pageId = process.env.META_PAGE_ID;
  const expansions = [
    {
      adSetId: EXISTING.influencer_adsets.exact,
      ads: [
        {
          name: "AD_HB_OpenCallExact_FutureCross",
          creative: "future_vo",
          headline: "Open Call — We Want You",
          message:
            "The future of live entertainment. Creators — stream the first AI hologram boxing event. WE WANT YOU!",
          linkUrl: `${LANDING}?utm_source=meta&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=future_open_call_cross`,
        },
        {
          name: "AD_HB_OpenCallExact_WalkInside_Cross",
          creative: "walk",
          headline: "Calling All Creators",
          message: "Would you walk inside? Streamers — co-stream hologram boxing. Apply now.",
          linkUrl: `${LANDING}?utm_source=meta&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=walk_inside_creator`,
        },
      ],
    },
    {
      adSetId: EXISTING.influencer_adsets.recruit,
      ads: [
        {
          name: "AD_HB_OpenCall_WalkInside_Cross",
          creative: "walk",
          headline: "Calling All Creators",
          message: "Would you walk inside? Creators — stream the first hologram boxing event.",
          linkUrl: `${LANDING}?utm_source=meta&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=walk_inside_creator`,
        },
        {
          name: "AD_HB_OpenCall_WhatIs_Cross",
          creative: "whatis",
          headline: "Join the Team",
          message: "What is hologram boxing? Stream it live. Sign up to partner with us.",
          linkUrl: `${LANDING}?utm_source=meta&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=whatis_creator`,
        },
      ],
    },
  ];

  const created = [];
  for (const group of expansions) {
    for (const adSpec of group.ads) {
      console.log(`  ${adSpec.name}`);
      const ad = await createVideoAd({
        adSpec: { ...adSpec, creative: adSpec.creative },
        adSetId: group.adSetId,
        pageId,
        status,
        manifest,
      });
      created.push({ ...adSpec, ...ad });
    }
  }
  return { campaignId: EXISTING.influencer_campaign, ads: created };
}

async function main() {
  loadEnv();
  const execute = process.argv.includes("--execute");
  const phase = process.argv.find((a) => a.startsWith("--phase="))?.split("=")[1] || "all";
  const status = process.argv.includes("--activate") ? "ACTIVE" : "PAUSED";

  const plan = {
    phases: ["founding_fan", "awareness", "influencer_expand", "influencer_adsets"],
    status,
    landing: LANDING,
    adsets: ADSET_SLICES.length,
    ads_per_set: FOUNDING_FAN_PACK.length,
  };

  console.log("\nMeta full matrix launch plan");
  console.log(JSON.stringify(plan, null, 2));

  if (!execute) {
    console.log("\nDry run. Add --execute to create PAUSED campaigns in Meta.");
    console.log("Requires fresh META_ACCESS_TOKEN in .env.local");
    return;
  }

  const { me, adAccount } = await verifyConnection();
  console.log(`\nConnected: ${me.name} · ${adAccount.name}`);

  const billing = await getAdAccountBillingStatus();
  if (!billing.funding_source_details) {
    console.warn("\n⚠ No payment method on Meta — ad creation may fail.");
  }

  const manifest = loadManifest();
  const results = {};

  if (phase === "all" || phase === "founding_fan") {
    results.founding_fan = await launchFoundingFan(status, manifest);
  }
  if (phase === "all" || phase === "awareness") {
    results.awareness = await launchAwareness(status, manifest);
  }
  if (phase === "all" || phase === "influencer_expand") {
    results.influencer_expand = await expandInfluencer(status, manifest);
  }
  if (phase === "all" || phase === "influencer_adsets") {
    results.influencer_adsets = await launchInfluencerAdSets(status, manifest);
  }

  manifest.meta.last_launch = new Date().toISOString();
  manifest.meta.results = results;
  saveManifest(manifest);

  const act = process.env.META_AD_ACCOUNT_ID;
  console.log("\n✓ Meta launch complete (PAUSED)");
  console.log(JSON.stringify(results, null, 2));
  console.log(`\nAds Manager: https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${act}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
