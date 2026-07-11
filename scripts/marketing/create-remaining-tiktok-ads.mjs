#!/usr/bin/env node
/**
 * Creates remaining TikTok ads via MCP tool_execute pattern.
 * Run output through TikTok MCP or use as reference for batch creation.
 */
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

function utmContent(creative, slug) {
  const map = {
    walk: `walk_inside_${slug}`,
    future_vo: `future_vo_${slug}`,
    future_mystery: `future_mystery_${slug}`,
    whatis: `whatis_${slug}`,
  };
  return map[creative] || `${creative}_${slug}`;
}

function buildAd({ adgroup_id, ad_name, creativeKey, texts, utm_campaign, utm_slug }) {
  const v = videos[creativeKey];
  const content = utmContent(creativeKey, utm_slug);
  const landing = `${constants.landing_base}?utm_source=tiktok&utm_medium=paid_social&utm_campaign=${utm_campaign}&utm_content=${content}`;
  return {
    tool_name: "smart_plus_ad_create",
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
    params: {
      advertiser_id: constants.advertiser_id,
      request_id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
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
      targeting_spec: {
        location_ids: FL_DMAS,
        age_groups,
        languages: ["en"],
      },
      operation_status: "DISABLE",
    },
  };
}

const ops = [];

// 1. Founding fan ads (12)
const foundingSegments = [
  { adgroup_id: campaigns.founding_fan.adgroups.tech, segment: "TechGamers", slug: "tech_fl" },
  { adgroup_id: campaigns.founding_fan.adgroups.general, segment: "General", slug: "general_fl" },
  { adgroup_id: campaigns.founding_fan.adgroups.family, segment: "FamilyNight", slug: "family_fl" },
];
for (const seg of foundingSegments) {
  for (const pack of ad_packs.founding_fan_4) {
    ops.push(
      buildAd({
        adgroup_id: seg.adgroup_id,
        ad_name: `AD_HB_Convert_${seg.segment}_${pack.suffix}`,
        creativeKey: pack.creative,
        texts: pack.texts,
        utm_campaign: campaigns.founding_fan.utm_campaign,
        utm_slug: seg.slug,
      })
    );
  }
}

// 2. Experience ad group + ads
const experienceAdgroup = buildAdgroup({
  campaign_id: campaigns.experience.campaign_id,
  adgroup_name: "ADGRP_HB_Experience_FL_18-44",
  age_groups: ["AGE_18_24", "AGE_25_34", "AGE_35_44"],
});
experienceAdgroup._key = "ADGRP_HB_Experience_FL_18-44";
ops.push(experienceAdgroup);

const experienceAds = [
  { suffix: "WalkInside_Launch15s", creative: "walk", texts: ["Would you walk inside? AI hologram boxers LIVE. Front row energy. Become a Founding Fan.", "Something wild is behind that door. AI hologram boxing LIVE. Sign up."] },
  { suffix: "FutureIsHere_Launch15s_VO", creative: "future_vo", texts: ["The future of live entertainment is here. Sign up — first access to HB 002.", "Picture this — tent + AR + AI boxers LIVE. Become a Founding Fan."] },
  { suffix: "FutureIsHere_Mystery15s", creative: "future_mystery", texts: ["THE FUTURE OF LIVE ENTERTAINMENT... IT'S HERE. Become a Founding Fan.", "Premium trailer energy — hologram boxers going live. Join the waitlist."] },
  { suffix: "WhatIs_Waitlist15s", creative: "whatis", texts: ["What is hologram boxing? Tent + AR + AI fighters. Join the waitlist.", "What is hologram boxing? Tap to join the Founding Fan waitlist."] },
];
for (const ad of experienceAds) {
  const content = utmContent(ad.creative, "experience");
  const built = buildAd({
    adgroup_id: "__ADGRP_HB_Experience_FL_18-44__",
    ad_name: `AD_HB_${ad.suffix.replace(/^([^_]+)_/, "$1_")}`,
    creativeKey: ad.creative,
    texts: ad.texts,
    utm_campaign: campaigns.experience.utm_campaign,
    utm_slug: "experience",
  });
  built.params.ad_name = `AD_HB_${ad.suffix}`;
  built._dependsOn = "ADGRP_HB_Experience_FL_18-44";
  ops.push(built);
}

// Fix experience ad names
const expNameMap = {
  WalkInside_Launch15s: "AD_HB_WalkInside_Launch15s",
  FutureIsHere_Launch15s_VO: "AD_HB_FutureIsHere_Launch15s_VO",
  FutureIsHere_Mystery15s: "AD_HB_FutureIsHere_Mystery15s",
  WhatIs_Waitlist15s: "AD_HB_WhatIs_Waitlist15s",
};

// 3. Awareness ad groups + ads
const awarenessGroups = [
  { name: "ADGRP_HB_Aware_CombatSports_FL", segment: "CombatSports", slug: "combat_fl", ages: ["AGE_18_24", "AGE_25_34", "AGE_35_44"] },
  { name: "ADGRP_HB_Aware_Tech_FL", segment: "Tech", slug: "tech_fl", ages: ["AGE_18_24", "AGE_25_34"] },
  { name: "ADGRP_HB_Aware_General_FL", segment: "General", slug: "general_fl", ages: ["AGE_18_24", "AGE_25_34", "AGE_35_44"] },
];
const awarenessPack = [
  { suffix: "WalkInside", creative: "walk", texts: ["Would you walk inside? AI hologram boxers LIVE. Become a Founding Fan.", "Something wild is behind that door. AI hologram boxing LIVE. Sign up."] },
  { suffix: "FutureMystery", creative: "future_mystery", texts: ["THE FUTURE OF LIVE ENTERTAINMENT... IT'S HERE. Become a Founding Fan.", "Premium trailer energy — hologram boxers going live. Join the waitlist."] },
  { suffix: "FutureIsHere", creative: "future_vo", texts: ["The future of live entertainment is here. Sign up — first access to HB 002.", "Picture this — tent + AR + AI boxers LIVE. Become a Founding Fan."] },
];
for (const grp of awarenessGroups) {
  const ag = buildAdgroup({
    campaign_id: campaigns.awareness.campaign_id,
    adgroup_name: grp.name,
    age_groups: grp.ages,
  });
  ag._key = grp.name;
  ops.push(ag);
  for (const pack of awarenessPack) {
    const built = buildAd({
      adgroup_id: `__${grp.name}__`,
      ad_name: `AD_HB_Aware_${grp.segment}_${pack.suffix}`,
      creativeKey: pack.creative,
      texts: pack.texts,
      utm_campaign: campaigns.awareness.utm_campaign,
      utm_slug: grp.slug,
    });
    built._dependsOn = grp.name;
    ops.push(built);
  }
}

// 4. Influencer expansion ads
const influencerAds = [
  {
    adgroup_id: campaigns.influencer.adgroups.exact,
    ad_name: "AD_HB_OpenCallExact_SignUp_V2",
    creative: "open_exact",
    utm_content: "open_call_exact_signup_v2",
    texts: ["Streamers wanted — sign up at hologramboxing.com", "OPEN CALL FOR CREATORS. WE WANT YOU! Apply at hologramboxing.com"],
  },
  {
    adgroup_id: campaigns.influencer.adgroups.exact,
    ad_name: "AD_HB_OpenCallExact_WalkInside_X",
    creative: "walk",
    utm_content: "walk_inside_creator_cross",
    texts: ["Would you walk inside? Creators — stream the first event. Apply.", "Something wild is behind that door. Creators — stream hologram boxing live."],
  },
  {
    adgroup_id: campaigns.influencer.adgroups.optimized,
    ad_name: "AD_HB_OpenCall_Optimized_Future_X",
    creative: "future_vo",
    utm_content: "future_creator_cross",
    texts: ["The future of live entertainment. Creators — we want you.", "Picture this — tent + AR + AI boxers LIVE. Creators apply now."],
  },
  {
    adgroup_id: campaigns.influencer.adgroups.optimized,
    ad_name: "AD_HB_OpenCall_UGC_WhatIs",
    creative: "whatis",
    utm_content: "whatis_creator",
    texts: ["What is hologram boxing? Stream it live. Sign up.", "What is hologram boxing? Creators — join the first AI fight night."],
  },
];
for (const inf of influencerAds) {
  const v = videos[inf.creative];
  const landing = `${constants.landing_base}?utm_source=tiktok&utm_medium=paid_social&utm_campaign=${campaigns.influencer.utm_campaign}&utm_content=${inf.utm_content}`;
  ops.push({
    tool_name: "smart_plus_ad_create",
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
          { key: "utm_campaign", value: campaigns.influencer.utm_campaign },
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

console.log(JSON.stringify(ops, null, 2));
