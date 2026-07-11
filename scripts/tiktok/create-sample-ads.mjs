#!/usr/bin/env node
/**
 * Create Day 1 TikTok sample ads via Marketing API (requires TIKTOK_MARKETING_ACCESS_TOKEN)
 * or run from Cursor with tiktok-for-business MCP connected + billing on the ad account.
 *
 * Usage: node scripts/tiktok/create-sample-ads.mjs
 */
import 'dotenv/config';

const ADVERTISER_ID = process.env.TIKTOK_ADVERTISER_ID || '7658020511833014273';
const PIXEL_ID = process.env.TIKTOK_PIXEL_ID_API || '7658773511775043592';
const IDENTITY_ID = '74ce7df5-a252-5942-9d55-6d43033f4752';
const CTA_PORTFOLIO_ID = '7659792406161673234';
const US_LOCATION = '6252001';
const LANDING =
  'https://www.hologramboxing.com/landing.html?utm_source=tiktok&utm_medium=paid_social&utm_campaign=walk_inside&utm_content=launch_15s_vo';

const SAMPLE = {
  campaign: {
    advertiser_id: ADVERTISER_ID,
    request_id: String(Date.now()),
    objective_type: 'WEB_CONVERSIONS',
    sales_destination: 'WEBSITE',
    campaign_name: 'CAMP_HB_WalkInside_001',
    budget: 15,
    budget_mode: 'BUDGET_MODE_DYNAMIC_DAILY_BUDGET',
    operation_status: 'DISABLE',
  },
  adgroup: {
    advertiser_id: ADVERTISER_ID,
    request_id: String(Date.now() + 1),
    adgroup_name: 'ADGRP_HB_WalkInside_US_18-44',
    promotion_type: 'WEBSITE',
    optimization_goal: 'CONVERT',
    optimization_event: 'FORM',
    pixel_id: PIXEL_ID,
    bid_type: 'BID_TYPE_NO_BID',
    billing_event: 'OCPM',
    schedule_type: 'SCHEDULE_FROM_NOW',
    schedule_start_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
    targeting_spec: {
      location_ids: [US_LOCATION],
      age_groups: ['AGE_18_24', 'AGE_25_34', 'AGE_35_44'],
      languages: ['en'],
    },
    operation_status: 'DISABLE',
  },
  ad: {
    advertiser_id: ADVERTISER_ID,
    ad_name: 'AD_HB_WalkInside_Launch15s',
    ad_text_list: [{ ad_text: 'Would you walk inside? AI hologram boxers LIVE. Front row energy. Become a Founding Fan' }],
    landing_page_url_list: [{ landing_page_url: LANDING }],
    operation_status: 'DISABLE',
    ad_configuration: {
      identity_type: 'TT_USER',
      identity_id: IDENTITY_ID,
      call_to_action_id: CTA_PORTFOLIO_ID,
    },
    creative_list: [
      {
        creative_info: {
          ad_format: 'SINGLE_VIDEO',
          identity_type: 'TT_USER',
          identity_id: IDENTITY_ID,
          video_info: {
            video_id: 'v10033g50000d93c5tvog65iq2di4on0',
            file_name: 'FUTURE-IS-HERE-15s-9x16-VO.mp4',
          },
          image_info: [{ web_uri: 'tos-alisg-p-0051c001-sg/454dc9201a411ad6f1c301d414596074' }],
        },
      },
    ],
  },
};

console.log(JSON.stringify(SAMPLE, null, 2));
console.log('\n---');
console.log('MCP steps (after billing is added in Ads Manager):');
console.log('1. smart_plus_campaign_create', JSON.stringify(SAMPLE.campaign));
console.log('2. smart_plus_adgroup_create — pass campaign_id from step 1');
console.log('3. Upload Walk Inside video → file_video_ad_upload');
console.log('4. smart_plus_ad_create — pass adgroup_id, video_id, cover web_uri');
console.log('\nManual paste guide: ads/tiktok-sample-ads.html');
