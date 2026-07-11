#!/usr/bin/env node
/**
 * Deploy influencer 5-layer staircase on TikTok (PAUSED/OFF).
 * Reads ads/influencer-recruit/INFLUENCER-STAIRCASE.json
 *
 * Usage:
 *   node scripts/marketing/launch-influencer-staircase-tiktok.mjs
 *   node scripts/marketing/launch-influencer-staircase-tiktok.mjs --layer L1
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

const PAYLOADS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/marketing/tiktok-ad-payloads.json"), "utf8")
);
const STAIRCASE = JSON.parse(
  fs.readFileSync(path.join(ROOT, "ads/influencer-recruit/INFLUENCER-STAIRCASE.json"), "utf8")
);
const MANIFEST_PATH = path.join(ROOT, "ads/influencer-recruit/LAUNCH-MANIFEST.json");

const { constants, videos } = PAYLOADS;
const FL_DMAS = ["534", "528", "539", "561"];
const NOW = new Date().toISOString().slice(0, 19).replace("T", " ");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Creatives not yet in TikTok library — closest uploaded match */
const CREATIVE_FALLBACK = {
  calling_all: "open_v1",
  stream: "how",
  creator_reminder: "open_exact",
  streamer_last_call: "open_opt",
};

const CAMPAIGN_IDS = {
  L1_see_you: "1870345571958114",
  L2_get_curious: "1870345580231025",
  L3_sign_up: "1870260441542146",
  L4_come_back: "1870345588238449",
  L5_show_up: "1870345600654738",
};

const LAYER_OPT = {
  L1_see_you: { optimization_goal: "CLICK", billing_event: "CPC", pixel: false },
  L2_get_curious: {
    optimization_goal: "TRAFFIC_LANDING_PAGE_VIEW",
    billing_event: "OCPM",
    pixel: false,
  },
  L4_come_back: {
    optimization_goal: "CONVERT",
    billing_event: "OCPM",
    pixel: true,
    optimization_event: "FORM",
  },
  L5_show_up: {
    optimization_goal: "CONVERT",
    billing_event: "OCPM",
    pixel: true,
    optimization_event: "FORM",
  },
};

function resolveVideo(creativeKey) {
  const key = videos[creativeKey] ? creativeKey : CREATIVE_FALLBACK[creativeKey];
  if (!key || !videos[key]) {
    throw new Error(`No TikTok video for creative: ${creativeKey}`);
  }
  return { key, video: videos[key], fallback: key !== creativeKey };
}

function ageGroups(min, max) {
  const all = [
    ["AGE_18_24", 18, 24],
    ["AGE_25_34", 25, 34],
    ["AGE_35_44", 35, 44],
  ];
  return all.filter(([, lo, hi]) => lo >= min && hi <= max).map(([g]) => g);
}

function utmContent(layerKey, slug, suffix) {
  const layer = layerKey.replace(/^L\d_/, "").replace(/_/g, "");
  return `inf_${layer}_${slug}_${suffix}`.toLowerCase();
}

function buildAdgroup(layerKey, campaign_id, group, opt) {
  const params = {
    advertiser_id: constants.advertiser_id,
    request_id: `${Date.now()}${Math.floor(Math.random() * 10000)}`,
    campaign_id,
    adgroup_name: group.name,
    promotion_type: "WEBSITE",
    optimization_goal: opt.optimization_goal,
    bid_type: "BID_TYPE_NO_BID",
    billing_event: opt.billing_event,
    schedule_type: "SCHEDULE_FROM_NOW",
    schedule_start_time: NOW,
    placement_type: "PLACEMENT_TYPE_NORMAL",
    placements: ["PLACEMENT_TIKTOK"],
    targeting_optimization_mode: "MANUAL",
    targeting_spec: {
      location_ids: FL_DMAS,
      age_groups: ageGroups(group.age_min, group.age_max),
      languages: ["en"],
    },
    operation_status: "DISABLE",
  };
  if (opt.pixel) {
    params.pixel_id = constants.pixel_id;
    params.optimization_event = opt.optimization_event;
  }
  return { tool_name: "smart_plus_adgroup_create", label: group.name, params };
}

function buildAd(layerKey, adgroup_id, layer, group, ad) {
  const { key, video, fallback } = resolveVideo(ad.creative);
  const content = utmContent(layerKey, group.slug, ad.suffix);
  const landing = `${constants.landing_base}?utm_source=tiktok&utm_medium=paid_social&utm_campaign=${STAIRCASE.utm_campaign_base}&utm_content=${content}`;
  const adName = `AD_HB_Inf_${layer.step}_${ad.suffix}_${group.slug === "gaming" ? "Gaming" : "Creators"}`;
  return {
    tool_name: "smart_plus_ad_create",
    label: adName,
    meta: { layerKey, creative: ad.creative, videoKey: key, fallback },
    params: {
      advertiser_id: constants.advertiser_id,
      adgroup_id,
      ad_name: adName,
      ad_text_list: ad.tiktok_texts.map((ad_text) => ({ ad_text })),
      landing_page_url_list: [{ landing_page_url: landing }],
      operation_status: "DISABLE",
      ad_configuration: {
        identity_type: "TT_USER",
        identity_id: constants.identity_id,
        call_to_action_id: constants.cta_id,
        tracking_info: { tracking_pixel_id: constants.pixel_id },
        utm_params: [
          { key: "utm_source", value: "tiktok" },
          { key: "utm_medium", value: "paid_social" },
          { key: "utm_campaign", value: STAIRCASE.utm_campaign_base },
          { key: "utm_content", value: content },
        ],
      },
      creative_list: [
        {
          creative_info: {
            ad_format: "SINGLE_VIDEO",
            identity_type: "TT_USER",
            identity_id: constants.identity_id,
            video_info: { video_id: video.video_id, file_name: video.file_name },
            image_info: [{ web_uri: video.cover }],
          },
        },
      ],
    },
  };
}

async function callTikTok(tool_name, params) {
  const token = process.env.TIKTOK_ACCESS_TOKEN || process.env.TIKTOK_MARKETING_ACCESS_TOKEN;
  if (!token) throw new Error("Missing TIKTOK_ACCESS_TOKEN in .env.local");
  const paths = {
    smart_plus_ad_create: "/smart_plus/ad/create/",
    smart_plus_adgroup_create: "/smart_plus/adgroup/create/",
  };
  const res = await fetch(`https://business-api.tiktok.com/open_api/v1.3${paths[tool_name]}`, {
    method: "POST",
    headers: { "Access-Token": token, "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.json();
}

async function runOp(op, adgroupIds) {
  const params = { ...op.params };
  if (typeof params.adgroup_id === "string" && params.adgroup_id.startsWith("__")) {
    const key = params.adgroup_id.replace(/^__|__$/g, "");
    params.adgroup_id = adgroupIds[key];
    if (!params.adgroup_id) {
      return { ok: false, label: op.label, message: `Ad group missing: ${key}` };
    }
  }
  for (let attempt = 0; attempt < 5; attempt++) {
    const result = await callTikTok(op.tool_name, params);
    if (result.code === 41021) {
      await sleep(2500 * (attempt + 1));
      continue;
    }
    if (result.code !== 0) {
      return { ok: false, label: op.label, code: result.code, message: result.message };
    }
    if (op.tool_name === "smart_plus_adgroup_create") {
      const id = result.data?.adgroup_id;
      adgroupIds[op.label] = id;
      return { ok: true, type: "adgroup", label: op.label, id };
    }
    return {
      ok: true,
      type: "ad",
      label: op.label,
      id: result.data?.smart_plus_ad_id,
      adgroup_id: params.adgroup_id,
      meta: op.meta,
    };
  }
  return { ok: false, label: op.label, message: "Rate limited after retries" };
}

function saveResults(results) {
  const manifest = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
    : { tiktok: {}, meta: {} };
  manifest.updated_at = new Date().toISOString();
  manifest.influencer_staircase = manifest.influencer_staircase || { tiktok: {} };
  manifest.influencer_staircase.tiktok = {
    ...manifest.influencer_staircase.tiktok,
    ...results,
    deployed_at: new Date().toISOString(),
  };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  PAYLOADS.campaigns.influencer_staircase = PAYLOADS.campaigns.influencer_staircase || {};
  for (const [layer, data] of Object.entries(results.layers || {})) {
    PAYLOADS.campaigns.influencer_staircase[layer] = {
      campaign_id: data.campaign_id,
      adgroups: data.adgroups,
    };
  }
  fs.writeFileSync(
    path.join(ROOT, "scripts/marketing/tiktok-ad-payloads.json"),
    JSON.stringify(PAYLOADS, null, 2)
  );
}

async function main() {
  const onlyLayer = process.argv.find((a) => a.startsWith("--layer="))?.split("=")[1];
  const layerFilter = onlyLayer ? `L${onlyLayer.replace(/^L/i, "")}_` : null;

  const results = { layers: {}, adgroups: [], ads: [], errors: [], fallbacks: [] };
  const adgroupIds = {};

  for (const [layerKey, layer] of Object.entries(STAIRCASE.staircase)) {
    if (layerKey === "L3_sign_up") continue;
    if (layerFilter && !layerKey.startsWith(layerFilter)) continue;

    const campaign_id = CAMPAIGN_IDS[layerKey] || layer.campaign_id_tiktok;
    if (!campaign_id) {
      results.errors.push({ layer: layerKey, message: "Missing campaign_id" });
      continue;
    }

    const opt = LAYER_OPT[layerKey];
    if (!opt) continue;

    results.layers[layerKey] = { campaign_id, campaign_name: layer.tiktok_campaign, adgroups: {} };
    console.log(`\n=== ${layerKey} · ${layer.plain_english} · ${campaign_id} ===`);

    for (const group of layer.adgroups) {
      const agOp = buildAdgroup(layerKey, campaign_id, group, opt);
      console.log(`  Ad group: ${group.name}`);
      const agRes = await runOp(agOp, adgroupIds);
      if (!agRes.ok) {
        results.errors.push(agRes);
        console.log(`    FAIL: ${agRes.message}`);
        continue;
      }
      results.adgroups.push(agRes);
      results.layers[layerKey].adgroups[group.slug] = agRes.id;
      await sleep(800);

      for (const ad of layer.ads) {
        const adOp = buildAd(layerKey, agRes.id, layer, group, ad);
        if (adOp.meta.fallback) {
          results.fallbacks.push({
            ad: adOp.label,
            wanted: ad.creative,
            used: adOp.meta.videoKey,
          });
        }
        console.log(`    Ad: ${adOp.label}`);
        const adRes = await runOp(adOp, adgroupIds);
        if (!adRes.ok) {
          results.errors.push(adRes);
          console.log(`      FAIL: ${adRes.message}`);
        } else {
          results.ads.push(adRes);
        }
        await sleep(600);
      }
    }
  }

  saveResults(results);
  const outPath = path.join(ROOT, "ads/influencer-recruit/staircase-tiktok-deploy.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

  console.log("\n--- Summary ---");
  console.log(`Ad groups: ${results.adgroups.length}`);
  console.log(`Ads: ${results.ads.length}`);
  console.log(`Errors: ${results.errors.length}`);
  if (results.fallbacks.length) {
    console.log(`Video fallbacks: ${results.fallbacks.length} (upload pending)`);
  }
  console.log(`Wrote ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
