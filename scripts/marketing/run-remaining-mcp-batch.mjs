#!/usr/bin/env node
/** Remaining TikTok ads only — executed via tool_execute payloads. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PAYLOADS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/marketing/tiktok-ad-payloads.json"), "utf8")
);
const { constants, videos, campaigns, ad_packs } = PAYLOADS;
const FL_DMAS = ["534", "528", "539", "561"];
const NOW = new Date().toISOString().slice(0, 19).replace("T", " ");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function utmContent(creative, slug) {
  return (
    {
      walk: `walk_inside_${slug}`,
      future_vo: `future_vo_${slug}`,
      future_mystery: `future_mystery_${slug}`,
      whatis: `whatis_${slug}`,
    }[creative] || `${creative}_${slug}`
  );
}

function buildAd({ adgroup_id, ad_name, creativeKey, texts, utm_campaign, utm_slug }) {
  const v = videos[creativeKey];
  const content = utmContent(creativeKey, utm_slug);
  const landing = `${constants.landing_base}?utm_source=tiktok&utm_medium=paid_social&utm_campaign=${utm_campaign}&utm_content=${content}`;
  return {
    tool_name: "smart_plus_ad_create",
    label: ad_name,
    params: {
      advertiser_id: constants.advertiser_id,
      adgroup_id,
      ad_name,
      ad_text_list: texts.map((ad_text) => ({ ad_text })),
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
          { key: "utm_campaign", value: utm_campaign },
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
    },
  };
}

function buildAdgroup({ campaign_id, adgroup_name, age_groups }) {
  return {
    tool_name: "smart_plus_adgroup_create",
    label: adgroup_name,
    params: {
      advertiser_id: constants.advertiser_id,
      request_id: String(Date.now()) + String(Math.floor(Math.random() * 1000)),
      campaign_id,
      adgroup_name,
      promotion_type: "WEBSITE",
      optimization_goal: "CONVERT",
      optimization_event: "FORM",
      pixel_id: constants.pixel_id,
      bid_type: "BID_TYPE_NO_BID",
      billing_event: "OCPM",
      schedule_type: "SCHEDULE_FROM_NOW",
      schedule_start_time: NOW,
      placement_type: "PLACEMENT_TYPE_NORMAL",
      placements: ["PLACEMENT_TIKTOK"],
      targeting_optimization_mode: "MANUAL",
      targeting_spec: { location_ids: FL_DMAS, age_groups, languages: ["en"] },
      operation_status: "DISABLE",
    },
  };
}

const ops = [];

// 1. Family — 3 remaining (WalkInside already done)
const familySkip = new Set(["WalkInside"]);
for (const pack of ad_packs.founding_fan_4) {
  if (familySkip.has(pack.suffix)) continue;
  ops.push(
    buildAd({
      adgroup_id: campaigns.founding_fan.adgroups.family,
      ad_name: `AD_HB_Convert_FamilyNight_${pack.suffix}`,
      creativeKey: pack.creative,
      texts: pack.texts,
      utm_campaign: "founding_fan",
      utm_slug: "family_fl",
    })
  );
}

// 2. Experience — 4 ads (ad group already exists)
const experienceAdgroupId = "1870330424155729";
for (const ad of [
  { name: "AD_HB_WalkInside_Launch15s", creative: "walk" },
  { name: "AD_HB_FutureIsHere_Launch15s_VO", creative: "future_vo" },
  { name: "AD_HB_FutureIsHere_Mystery15s", creative: "future_mystery" },
  { name: "AD_HB_WhatIs_Waitlist15s", creative: "whatis" },
]) {
  const pack = ad_packs.founding_fan_4.find((p) => p.creative === ad.creative);
  ops.push(
    buildAd({
      adgroup_id: experienceAdgroupId,
      ad_name: ad.name,
      creativeKey: ad.creative,
      texts: pack.texts,
      utm_campaign: "experience",
      utm_slug: "experience",
    })
  );
}

// 3. Awareness — 3 ad groups + 9 ads
const awarenessGroups = [
  {
    name: "ADGRP_HB_Aware_CombatSports_FL",
    segment: "CombatSports",
    slug: "combat_fl",
    ages: ["AGE_18_24", "AGE_25_34", "AGE_35_44"],
  },
  {
    name: "ADGRP_HB_Aware_Tech_FL",
    segment: "Tech",
    slug: "tech_fl",
    ages: ["AGE_18_24", "AGE_25_34"],
  },
  {
    name: "ADGRP_HB_Aware_General_FL",
    segment: "General",
    slug: "general_fl",
    ages: ["AGE_18_24", "AGE_25_34", "AGE_35_44"],
  },
];
const awarenessPack = [
  { suffix: "WalkInside", creative: "walk" },
  { suffix: "FutureMystery", creative: "future_mystery" },
  { suffix: "FutureIsHere", creative: "future_vo" },
];
for (const grp of awarenessGroups) {
  ops.push(
    buildAdgroup({
      campaign_id: campaigns.awareness.campaign_id,
      adgroup_name: grp.name,
      age_groups: grp.ages,
    })
  );
  for (const pack of awarenessPack) {
    const src = ad_packs.founding_fan_4.find((p) => p.creative === pack.creative);
    const built = buildAd({
      adgroup_id: `__${grp.name}__`,
      ad_name: `AD_HB_Aware_${grp.segment}_${pack.suffix}`,
      creativeKey: pack.creative,
      texts: src.texts,
      utm_campaign: "awareness",
      utm_slug: grp.slug,
    });
    built._dependsOn = grp.name;
    ops.push(built);
  }
}

// 4. Influencer expansion — 4 ads
for (const inf of [
  {
    adgroup_id: campaigns.influencer.adgroups.exact,
    ad_name: "AD_HB_OpenCallExact_SignUp_V2",
    creative: "open_exact",
    utm_content: "open_call_exact_signup_v2",
    texts: [
      "Streamers wanted — sign up at hologramboxing.com",
      "OPEN CALL FOR CREATORS. WE WANT YOU! Apply at hologramboxing.com",
    ],
  },
  {
    adgroup_id: campaigns.influencer.adgroups.exact,
    ad_name: "AD_HB_OpenCallExact_WalkInside_X",
    creative: "walk",
    utm_content: "walk_inside_creator_cross",
    texts: [
      "Would you walk inside? Creators — stream the first event. Apply.",
      "Something wild is behind that door. Creators — stream hologram boxing live.",
    ],
  },
  {
    adgroup_id: campaigns.influencer.adgroups.optimized,
    ad_name: "AD_HB_OpenCall_Optimized_Future_X",
    creative: "future_vo",
    utm_content: "future_creator_cross",
    texts: [
      "The future of live entertainment. Creators — we want you.",
      "Picture this — tent + AR + AI boxers LIVE. Creators apply now.",
    ],
  },
  {
    adgroup_id: campaigns.influencer.adgroups.optimized,
    ad_name: "AD_HB_OpenCall_UGC_WhatIs",
    creative: "whatis",
    utm_content: "whatis_creator",
    texts: [
      "What is hologram boxing? Stream it live. Sign up.",
      "What is hologram boxing? Creators — join the first AI fight night.",
    ],
  },
]) {
  const v = videos[inf.creative];
  const landing = `${constants.landing_base}?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=${inf.utm_content}`;
  ops.push({
    tool_name: "smart_plus_ad_create",
    label: inf.ad_name,
    params: {
      advertiser_id: constants.advertiser_id,
      adgroup_id: inf.adgroup_id,
      ad_name: inf.ad_name,
      ad_text_list: inf.texts.map((ad_text) => ({ ad_text })),
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
          { key: "utm_content", value: inf.utm_content },
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
    },
  });
}

// Output ops for MCP execution
console.log(JSON.stringify(ops, null, 2));
