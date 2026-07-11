#!/usr/bin/env node
/** Print ad-create payloads for influencer staircase (stdout JSON array). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const STAIRCASE = JSON.parse(
  fs.readFileSync(path.join(ROOT, "ads/influencer-recruit/INFLUENCER-STAIRCASE.json"), "utf8")
);
const { constants, videos } = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/marketing/tiktok-ad-payloads.json"), "utf8")
);

const FALLBACK = {
  calling_all: "open_v1",
  stream: "how",
  creator_reminder: "open_exact",
  streamer_last_call: "open_opt",
};

const ADGROUPS = {
  L1_see_you: { gaming: "1870345667162434", creators: "1870345677808817" },
  L2_get_curious: { gaming: "1870345678592097", creators: "1870345677811185" },
  L4_come_back: { gaming: "1870345749405314", creators: "1870345771609170" },
  L5_show_up: { gaming: "1870345767397378", creators: "1870345772618818" },
};

function video(creative) {
  const key = videos[creative] ? creative : FALLBACK[creative];
  return { key, ...videos[key] };
}

const ops = [];
let n = 0;
for (const [layerKey, layer] of Object.entries(STAIRCASE.staircase)) {
  if (!ADGROUPS[layerKey]) continue;
  for (const group of layer.adgroups) {
    const adgroup_id = ADGROUPS[layerKey][group.slug];
    for (const ad of layer.ads) {
      const v = video(ad.creative);
      const content = `inf_${layerKey.replace(/^L\d_/, "").replace(/_/g, "")}_${group.slug}_${ad.suffix}`.toLowerCase();
      const landing = `${constants.landing_base}?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=${content}`;
      const adName = `AD_HB_Inf_L${layer.step}_${ad.suffix}_${group.slug === "gaming" ? "Gaming" : "Creators"}`;
      n++;
      ops.push({
        request_id: `202607101626${String(n).padStart(3, "0")}`,
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
            { key: "utm_campaign", value: "influencer_recruit" },
            { key: "utm_content", value: content },
          ],
        },
        creative_list: [
          {
            creative_info: {
              ad_format: "SINGLE_VIDEO",
              identity_type: "TT_USER",
              identity_id: constants.identity_id,
              video_info: { video_id: v.video_id, file_name: v.file_name },
              image_info: [{ web_uri: v.cover }],
            },
          },
        ],
      });
    }
  }
}
console.log(JSON.stringify(ops, null, 2));
