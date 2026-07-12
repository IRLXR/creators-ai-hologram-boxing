#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const UPLOAD_DATA = path.join(ROOT, "scripts/marketing/_tiktok-staircase-upload-data.json");
const PAYLOADS_PATH = path.join(ROOT, "scripts/marketing/tiktok-ad-payloads.json");
const PREVIEW_HTML = path.join(ROOT, "ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html");
const ADS_FETCH = process.argv[2] || path.join(ROOT, "agent-tools/ads-fetch.json");
const OUT = path.join(ROOT, "ads/influencer-recruit/_tiktok-update-queue.json");

const IDENTITY_ID = "74ce7df5-a252-5942-9d55-6d43033f4752";
const ADVERTISER_ID = "7658020511833014273";

function parsePreviewCatalog() {
  const html = fs.readFileSync(PREVIEW_HTML, "utf8");
  const layersMatch = html.match(/const LAYERS = (\[[\s\S]*?\n    \]);/);
  if (!layersMatch) throw new Error("Could not parse LAYERS");
  const LAYERS = eval(`(${layersMatch[1]})`);
  const adByName = new Map();
  for (const layer of LAYERS) {
    for (const ad of layer.ads) adByName.set(ad.name, ad.cr);
  }
  return adByName;
}

const uploads = JSON.parse(fs.readFileSync(UPLOAD_DATA, "utf8"));
const payloads = JSON.parse(fs.readFileSync(PAYLOADS_PATH, "utf8"));
payloads.videos = { ...payloads.videos, ...uploads };
fs.writeFileSync(PAYLOADS_PATH, JSON.stringify(payloads, null, 2));

const adByName = parsePreviewCatalog();
const fetchRes = JSON.parse(fs.readFileSync(ADS_FETCH, "utf8"));
const ads = fetchRes.data?.list || [];

const queue = [];
const unmatched = [];
const skipped = [];

for (const ad of ads) {
  const cr = adByName.get(ad.ad_name);
  if (!cr) {
    unmatched.push(ad.ad_name);
    continue;
  }
  const video = uploads[cr] || payloads.videos[cr];
  if (!video?.video_id) {
    skipped.push({ name: ad.ad_name, reason: `no video for ${cr}` });
    continue;
  }
  const currentVid = ad.creative_list?.[0]?.creative_info?.video_info?.video_id;
  if (currentVid === video.video_id) {
    skipped.push({ name: ad.ad_name, reason: "already on composite video_id" });
    continue;
  }
  queue.push({
    ad_name: ad.ad_name,
    smart_plus_ad_id: ad.smart_plus_ad_id,
    creative_key: cr,
    body: {
      advertiser_id: ADVERTISER_ID,
      smart_plus_ad_id: ad.smart_plus_ad_id,
      ad_name: ad.ad_name,
      ad_text_list: ad.ad_text_list,
      landing_page_url_list: ad.landing_page_url_list,
      ad_configuration: ad.ad_configuration,
      creative_list: [
        {
          creative_info: {
            ad_format: "SINGLE_VIDEO",
            identity_type: "TT_USER",
            identity_id: IDENTITY_ID,
            video_info: { video_id: video.video_id, file_name: video.file_name },
            image_info: [{ web_uri: video.cover }],
          },
        },
      ],
    },
  });
}

fs.writeFileSync(OUT, JSON.stringify({ queue, skipped, unmatched, uploadCount: Object.keys(uploads).length }, null, 2));
console.log(JSON.stringify({ uploads: Object.keys(uploads).length, toUpdate: queue.length, skipped: skipped.length, unmatched: unmatched.length, out: OUT }));
