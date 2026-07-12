#!/usr/bin/env node
/**
 * Upload composite ship files and update existing TikTok + Meta influencer staircase ads.
 *
 * Usage:
 *   node scripts/marketing/update-influencer-staircase-ads.mjs --execute
 *   node scripts/marketing/update-influencer-staircase-ads.mjs --execute --tiktok-only
 *   node scripts/marketing/update-influencer-staircase-ads.mjs --execute --meta-only
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import os from "node:os";

const require = createRequire(import.meta.url);
const {
  verifyConnection,
  uploadVideo,
  uploadAdImage,
  waitForVideo,
  pickImageUrl,
  createAdCreative,
  graph,
  adAccountPath,
} = require("../meta/meta-client");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PREVIEW_HTML = path.join(ROOT, "ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html");
const PAYLOADS_PATH = path.join(ROOT, "scripts/marketing/tiktok-ad-payloads.json");
const MANIFEST_PATH = path.join(ROOT, "ads/influencer-recruit/LAUNCH-MANIFEST.json");
const OUT_DIR = path.join(ROOT, "ads/influencer-recruit");
const RECRUIT = path.join(ROOT, "ads/influencer-recruit");

const CAMPAIGN_IDS = [
  "1870345571958114",
  "1870345580231025",
  "1870260441542146",
  "1870345588238449",
  "1870345600654738",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadEnv() {
  const envFile = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envFile)) return;
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim();
  }
}

function parsePreviewCatalog() {
  const html = fs.readFileSync(PREVIEW_HTML, "utf8");
  const creativeMatch = html.match(/const CREATIVE = (\{[\s\S]*?\n    \});/);
  const layersMatch = html.match(/const LAYERS = (\[[\s\S]*?\n    \]);/);
  if (!creativeMatch || !layersMatch) throw new Error("Could not parse preview HTML catalog");
  const CREATIVE = eval(`(${creativeMatch[1]})`);
  const LAYERS = eval(`(${layersMatch[1]})`);
  const adByName = new Map();
  const creativesNeeded = new Set();
  const AD_ALIASES = {
    AD_HB_Inf_L4_WalkInsideRT_Creators: "walk",
    AD_HB_Inf_L4_WalkInsideRT_Gaming: "walk",
    AD_HB_Inf_L5_LiveFXUrgency_Creators: "livefx",
    AD_HB_Inf_L5_LiveFXUrgency_Gaming: "livefx",
  };
  for (const layer of LAYERS) {
    for (const ad of layer.ads) {
      adByName.set(ad.name, { creativeKey: ad.cr, layer: layer.id });
      creativesNeeded.add(ad.cr);
    }
  }
  for (const [name, cr] of Object.entries(AD_ALIASES)) {
    adByName.set(name, { creativeKey: cr, layer: "alias" });
    creativesNeeded.add(cr);
  }
  const files = {};
  for (const key of creativesNeeded) {
    const rel = CREATIVE[key];
    if (!rel) continue;
    let abs;
    if (rel.startsWith("../")) abs = path.join(RECRUIT, rel);
    else if (rel.startsWith("output/")) abs = path.join(RECRUIT, rel);
    else abs = path.join(ROOT, rel);
    files[key] = abs;
  }
  return { adByName, files };
}

function resolveShipFile(creativeKey, files) {
  if (files[creativeKey]) return files[creativeKey];
  const fallbacks = {
    inf_open_call_hf: "inf_open_call_vo",
    inf_join_team_hf: "inf_join_team_vo",
    inf_open_call_poster: "inf_open_call_vo",
    inf_calling_all_poster: "inf_calling_all_vo",
    inf_join_team_poster: "inf_join_team_vo",
    inf_l4_partner_poster: "inf_l4_partner_reviews_vo",
    inf_l4_reminder_poster: "inf_l4_reminder_vo",
    inf_l5_countdown_poster: "inf_l5_countdown_vo",
    inf_l5_last_call_poster: "inf_l5_last_call_vo",
    inf_l4_confirms_open_call_poster: "inf_l4_confirms_open_call_vo",
  };
  const parent = fallbacks[creativeKey];
  return parent ? files[parent] : null;
}

async function tiktokApi(pathSuffix, { method = "GET", body, token, query } = {}) {
  const url = new URL(`https://business-api.tiktok.com/open_api/v1.3${pathSuffix}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, typeof v === "object" ? JSON.stringify(v) : String(v));
    }
  }
  const res = await fetch(url, {
    method,
    headers: { "Access-Token": token, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

async function uploadTikTokVideo(advertiserId, filePath, token) {
  const fileName = path.basename(filePath);
  const buffer = fs.readFileSync(filePath);
  const form = new FormData();
  form.append("advertiser_id", advertiserId);
  form.append("video_file", new Blob([buffer], { type: "video/mp4" }), fileName);
  form.append("file_name", fileName);
  const res = await fetch("https://business-api.tiktok.com/open_api/v1.3/file/video/ad/upload/", {
    method: "POST",
    headers: { "Access-Token": token },
    body: form,
  });
  const data = await res.json();
  if (data.code !== 0) throw new Error(`TikTok upload ${fileName}: ${data.message}`);
  const videoId = data.data?.video_id;
  if (!videoId) throw new Error(`TikTok upload ${fileName}: no video_id`);

  for (let i = 0; i < 40; i++) {
    await sleep(3000);
    const info = await tiktokApi("/file/video/ad/info/", {
      token,
      query: { advertiser_id: advertiserId, video_ids: JSON.stringify([videoId]) },
    });
    const row = info.data?.list?.[0];
    if (row?.video_status === "bind_success") break;
    if (row?.video_status === "error" || row?.video_status === "deleted") {
      throw new Error(`TikTok video bind failed: ${videoId}`);
    }
    if (i === 39) throw new Error(`TikTok video bind timeout: ${videoId}`);
  }

  await sleep(5000);
  const cover = await tiktokApi("/file/video/suggestcover/", {
    token,
    query: { advertiser_id: advertiserId, video_id: videoId, poster_number: 1 },
  });
  if (cover.code !== 0) throw new Error(`TikTok cover ${videoId}: ${cover.message}`);
  const webUri = cover.data?.list?.[0]?.web_uri;
  if (!webUri) throw new Error(`TikTok cover missing for ${videoId}`);
  return { video_id: videoId, file_name: fileName, cover: webUri };
}

async function uploadTikTokLibrary(advertiserId, files, token, force) {
  const payloads = JSON.parse(fs.readFileSync(PAYLOADS_PATH, "utf8"));
  payloads.videos = payloads.videos || {};
  const uploaded = {};
  for (const [key, filePath] of Object.entries(files)) {
    if (!fs.existsSync(filePath)) {
      console.warn(`  SKIP missing: ${key} → ${filePath}`);
      continue;
    }
    if (!force && payloads.videos[key]?.composite_uploaded) {
      uploaded[key] = payloads.videos[key];
      continue;
    }
    console.log(`  TikTok upload: ${path.basename(filePath)} (${key})`);
    const asset = await uploadTikTokVideo(advertiserId, filePath, token);
    payloads.videos[key] = { ...asset, composite_uploaded: new Date().toISOString() };
    uploaded[key] = payloads.videos[key];
    fs.writeFileSync(PAYLOADS_PATH, JSON.stringify(payloads, null, 2));
    await sleep(1200);
  }
  return uploaded;
}

async function fetchTikTokAds(advertiserId, token) {
  const all = [];
  let page = 1;
  while (true) {
    const res = await tiktokApi("/smart_plus/ad/get/", {
      token,
      query: {
        advertiser_id: advertiserId,
        filtering: JSON.stringify({ campaign_ids: CAMPAIGN_IDS }),
        page,
        page_size: 100,
      },
    });
    if (res.code !== 0) throw new Error(`smart_plus_ad_get: ${res.message}`);
    const list = res.data?.list || [];
    all.push(...list);
    const total = res.data?.page_info?.total_number || list.length;
    if (all.length >= total || list.length === 0) break;
    page += 1;
    await sleep(400);
  }
  return all;
}

function buildCreativeList(ad, videoAsset, constants) {
  const existing = ad.creative_list?.[0]?.creative_info || {};
  return [
    {
      creative_info: {
        ad_format: "SINGLE_VIDEO",
        identity_type: existing.identity_type || "TT_USER",
        identity_id: existing.identity_id || constants.identity_id,
        video_info: { video_id: videoAsset.video_id, file_name: videoAsset.file_name },
        image_info: [{ web_uri: videoAsset.cover }],
      },
    },
  ];
}

async function updateTikTokAds({ execute, adByName, files, force }) {
  const token = process.env.TIKTOK_ACCESS_TOKEN || process.env.TIKTOK_MARKETING_ACCESS_TOKEN;
  if (!token) throw new Error("Missing TIKTOK_ACCESS_TOKEN");
  const payloads = JSON.parse(fs.readFileSync(PAYLOADS_PATH, "utf8"));
  const { constants } = payloads;
  const advertiserId = constants.advertiser_id;

  console.log("\n=== TikTok: upload composite library ===");
  const library = await uploadTikTokLibrary(advertiserId, files, token, force);

  console.log("\n=== TikTok: fetch live ads ===");
  const ads = await fetchTikTokAds(advertiserId, token);
  console.log(`Found ${ads.length} ads across influencer campaigns`);

  const results = { updated: [], skipped: [], errors: [], unmatched: [] };

  for (const ad of ads) {
    const name = ad.ad_name;
    const spec = adByName.get(name);
    if (!spec) {
      results.unmatched.push(name);
      continue;
    }
    const filePath = resolveShipFile(spec.creativeKey, files);
    let videoAsset = library[spec.creativeKey];
    if (!videoAsset && filePath) {
      const parent = path.basename(filePath);
      videoAsset = Object.values(library).find((v) => v.file_name === parent);
    }
    if (!videoAsset) {
      results.skipped.push({ name, reason: `no asset for ${spec.creativeKey}` });
      continue;
    }

    const currentVid = ad.creative_list?.[0]?.creative_info?.video_info?.video_id;
    if (!force && currentVid === videoAsset.video_id) {
      results.skipped.push({ name, reason: "already on composite video_id" });
      continue;
    }

    if (!execute) {
      console.log(`  DRY would update: ${name} → ${videoAsset.file_name}`);
      results.updated.push({ name, dryRun: true });
      continue;
    }

    const body = {
      advertiser_id: advertiserId,
      smart_plus_ad_id: ad.smart_plus_ad_id,
      ad_name: name,
      ad_text_list: ad.ad_text_list,
      landing_page_url_list: ad.landing_page_url_list,
      ad_configuration: ad.ad_configuration,
      creative_list: buildCreativeList(ad, videoAsset, constants),
    };

    for (let attempt = 0; attempt < 5; attempt++) {
      const res = await tiktokApi("/smart_plus/ad/update/", { method: "POST", token, body });
      if (res.code === 41021) {
        await sleep(2500 * (attempt + 1));
        continue;
      }
      if (res.code !== 0) {
        results.errors.push({ name, message: res.message });
        console.log(`  FAIL ${name}: ${res.message}`);
        break;
      }
      results.updated.push({ name, video_id: videoAsset.video_id });
      console.log(`  OK ${name}`);
      break;
    }
    await sleep(700);
  }

  const out = path.join(OUT_DIR, "staircase-tiktok-update.json");
  fs.writeFileSync(out, JSON.stringify({ updated_at: new Date().toISOString(), ...results }, null, 2));
  console.log(`\nTikTok summary: updated ${results.updated.length}, skipped ${results.skipped.length}, errors ${results.errors.length}, unmatched ${results.unmatched.length}`);
  console.log(`Wrote ${out}`);
  return results;
}

function metaThumb(videoPath) {
  const out = path.join(os.tmpdir(), `meta-update-thumb-${Date.now()}.jpg`);
  execFileSync("ffmpeg", ["-y", "-i", videoPath, "-ss", "00:00:01", "-vframes", "1", "-q:v", "2", out], {
    stdio: "ignore",
  });
  return out;
}

async function ensureMetaVideo(manifest, creativeKey, filePath, force) {
  manifest.meta = manifest.meta || {};
  manifest.meta.video_ids = manifest.meta.video_ids || {};
  const existing = manifest.meta.video_ids[creativeKey];
  if (!force && existing?.file === path.relative(ROOT, filePath).replace(/\\/g, "/")) {
    return existing;
  }
  console.log(`  Meta upload: ${path.basename(filePath)} (${creativeKey})`);
  const vu = await uploadVideo(filePath);
  const ready = await waitForVideo(vu.id);
  const tp = metaThumb(filePath);
  const img = await uploadAdImage(tp);
  fs.unlinkSync(tp);
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
  const asset = { videoId: vu.id, imageUrl: pickImageUrl(img, ready), file: rel };
  manifest.meta.video_ids[creativeKey] = asset;
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  return asset;
}

async function fetchMetaAds() {
  const act = adAccountPath();
  const ads = [];
  let nextPath = `${act}/ads?fields=id,name,status,adset_id,campaign_id,creative{id}&limit=100`;
  while (nextPath) {
    const data = await graph(nextPath);
    ads.push(...(data.data || []));
    const nextUrl = data.paging?.next;
    if (nextUrl) {
      const u = new URL(nextUrl);
      nextPath = u.pathname.replace(/^\/v[\d.]+\//, "") + u.search;
    } else {
      nextPath = null;
    }
  }
  return ads.filter((a) => /^AD_HB_|^BONUS_/i.test(a.name));
}

async function updateMetaAds({ execute, adByName, files, force }) {
  const pageId = process.env.META_PAGE_ID;
  const manifest = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
    : { meta: { video_ids: {} } };

  console.log("\n=== Meta: upload composite library ===");
  const metaAssets = {};
  for (const [key, filePath] of Object.entries(files)) {
    if (!fs.existsSync(filePath)) continue;
    metaAssets[key] = await ensureMetaVideo(manifest, key, filePath, force);
    await sleep(500);
  }

  console.log("\n=== Meta: fetch live ads ===");
  const ads = await fetchMetaAds();
  console.log(`Found ${ads.length} HB ads`);

  const results = { updated: [], skipped: [], errors: [], unmatched: [] };

  for (const ad of ads) {
    const spec = adByName.get(ad.name);
    if (!spec) {
      results.unmatched.push(ad.name);
      continue;
    }
    const asset = metaAssets[spec.creativeKey];
    if (!asset) {
      results.skipped.push({ name: ad.name, reason: `no asset for ${spec.creativeKey}` });
      continue;
    }
    if (!execute) {
      console.log(`  DRY would create new creative for: ${ad.name}`);
      results.updated.push({ name: ad.name, dryRun: true });
      continue;
    }
    try {
      const creativeRes = await createAdCreative({
        name: `${ad.name}_Composite_${Date.now()}`,
        pageId,
        videoId: asset.videoId,
        imageUrl: asset.imageUrl,
        message: "Creators — co-stream hologram boxing. Sign up at hologramboxing.com",
        headline: "Open Call — We Want You",
        linkUrl: "https://www.hologramboxing.com/landing.html?utm_source=meta&utm_medium=paid_social&utm_campaign=influencer_recruit",
        callToAction: "SIGN_UP",
      });
      await graph(ad.id, {
        method: "POST",
        body: { creative: { creative_id: creativeRes.id } },
      });
      results.updated.push({ name: ad.name, creativeId: creativeRes.id });
      console.log(`  OK ${ad.name}`);
    } catch (e) {
      results.errors.push({ name: ad.name, message: e.message });
      console.log(`  FAIL ${ad.name}: ${e.message}`);
    }
    await sleep(600);
  }

  manifest.influencer_staircase = manifest.influencer_staircase || {};
  manifest.influencer_staircase.meta = {
    ...manifest.influencer_staircase.meta,
    composites_updated_at: new Date().toISOString(),
    status: "COMPOSITES_UPLOADED",
  };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  const out = path.join(OUT_DIR, "staircase-meta-update.json");
  fs.writeFileSync(out, JSON.stringify({ updated_at: new Date().toISOString(), ...results }, null, 2));
  console.log(`\nMeta summary: updated ${results.updated.length}, skipped ${results.skipped.length}, errors ${results.errors.length}, unmatched ${results.unmatched.length}`);
  console.log(`Wrote ${out}`);
  return results;
}

async function deployMetaStaircaseIfNeeded(execute) {
  if (!execute) return;
  console.log("\n=== Meta: deploy missing staircase campaigns (PAUSED) ===");
  const { spawnSync } = await import("node:child_process");
  const r = spawnSync(process.execPath, ["scripts/marketing/launch-influencer-staircase-meta.js", "--execute"], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });
  if (r.status !== 0) throw new Error("meta staircase launch failed");
}

async function main() {
  loadEnv();
  const execute = process.argv.includes("--execute");
  const force = process.argv.includes("--force");
  const tiktokOnly = process.argv.includes("--tiktok-only");
  const metaOnly = process.argv.includes("--meta-only");
  const skipDeploy = process.argv.includes("--skip-deploy");

  const { adByName, files } = parsePreviewCatalog();
  console.log(`Catalog: ${adByName.size} ads · ${Object.keys(files).length} creative files`);

  if (!execute) {
    console.log("\nDRY RUN — add --execute to upload composites and update platform ads");
  }

  if (!metaOnly) {
    await updateTikTokAds({ execute, adByName, files, force });
  }

  if (!tiktokOnly) {
    await verifyConnection();
    if (!skipDeploy) await deployMetaStaircaseIfNeeded(execute);
    await updateMetaAds({ execute, adByName, files, force });
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
