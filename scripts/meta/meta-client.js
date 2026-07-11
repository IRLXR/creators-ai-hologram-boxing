/**
 * Minimal Meta Marketing API client (Graph API v22).
 * Requires META_ACCESS_TOKEN and META_AD_ACCOUNT_ID in env or .env.local
 */

const fs = require("fs");
const path = require("path");

const GRAPH = "https://graph.facebook.com/v22.0";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Add it to .env.local (see .env.example).`);
  return value;
}

function adAccountPath() {
  const id = requireEnv("META_AD_ACCOUNT_ID").replace(/^act_/, "");
  return `act_${id}`;
}

async function graph(path, { method = "GET", body } = {}) {
  const token = requireEnv("META_ACCESS_TOKEN");
  const url = new URL(`${GRAPH}/${path}`);
  url.searchParams.set("access_token", token);

  const options = { method, headers: { Accept: "application/json" } };
  if (body && method !== "GET") {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.error_user_msg || data?.error?.message || res.statusText;
    const code = data?.error?.error_subcode ? ` (subcode ${data.error.error_subcode})` : "";
    throw new Error(`Meta API ${method} ${path}: ${msg}${code}`);
  }
  return data;
}

async function graphMultipart(apiPath, formData) {
  const token = requireEnv("META_ACCESS_TOKEN");
  const url = new URL(`${GRAPH}/${apiPath}`);
  url.searchParams.set("access_token", token);
  const res = await fetch(url, { method: "POST", body: formData });
  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.error_user_msg || data?.error?.message || res.statusText;
    const code = data?.error?.error_subcode ? ` (subcode ${data.error.error_subcode})` : "";
    throw new Error(`Meta API POST ${apiPath}: ${msg}${code}`);
  }
  return data;
}

async function uploadVideo(filePath) {
  const account = adAccountPath();
  const filename = path.basename(filePath);
  const form = new FormData();
  form.append(
    "source",
    new Blob([fs.readFileSync(filePath)], { type: "video/mp4" }),
    filename
  );
  form.append("title", filename);
  return graphMultipart(`${account}/advideos`, form);
}

async function uploadAdImage(filePath) {
  const account = adAccountPath();
  const filename = path.basename(filePath);
  const form = new FormData();
  form.append(
    "filename",
    new Blob([fs.readFileSync(filePath)], { type: "image/jpeg" }),
    filename
  );
  return graphMultipart(`${account}/adimages`, form);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForVideo(videoId, { attempts = 40, delayMs = 3000 } = {}) {
  for (let i = 0; i < attempts; i += 1) {
    const data = await graph(`${videoId}?fields=status,thumbnails,picture`);
    const status = data.status?.video_status;
    if (status === "ready") return data;
    if (status === "error") throw new Error(`Video processing failed for ${videoId}`);
    await sleep(delayMs);
  }
  throw new Error(`Video processing timeout for ${videoId}`);
}

function pickImageUrl(imageUpload, videoData) {
  const images = imageUpload?.images || {};
  const first = Object.values(images)[0];
  if (first?.url) return first.url;
  const thumb = videoData?.thumbnails?.data?.[0]?.uri;
  if (thumb) return thumb;
  if (videoData?.picture) return videoData.picture;
  throw new Error("Could not resolve thumbnail URL for video creative.");
}

async function verifyConnection() {
  const account = adAccountPath();
  const [me, adAccount] = await Promise.all([
    graph("me?fields=id,name"),
    graph(`${account}?fields=id,name,account_status,currency,timezone_name,amount_spent,balance`),
  ]);
  return { me, adAccount };
}

async function listCampaigns({ limit = 25 } = {}) {
  const account = adAccountPath();
  return graph(
    `${account}/campaigns?fields=id,name,status,objective,daily_budget,lifetime_budget,created_time&limit=${limit}`
  );
}

async function createCampaign({ name, objective, status = "PAUSED", specialAdCategories = [] }) {
  const account = adAccountPath();
  return graph(`${account}/campaigns`, {
    method: "POST",
    body: {
      name,
      objective,
      status,
      special_ad_categories: specialAdCategories,
      is_adset_budget_sharing_enabled: false,
    },
  });
}

async function createAdSet({
  campaignId,
  name,
  dailyBudgetUsd,
  optimizationGoal,
  billingEvent = "IMPRESSIONS",
  targeting,
  status = "PAUSED",
  startTime,
  endTime,
}) {
  const account = adAccountPath();
  const pageId = requireEnv("META_PAGE_ID");
  const body = {
    name,
    campaign_id: campaignId,
    daily_budget: Math.round(dailyBudgetUsd * 100),
    billing_event: billingEvent,
    optimization_goal: optimizationGoal,
    bid_strategy: "LOWEST_COST_WITHOUT_CAP",
    targeting: targeting || defaultTargeting(),
    status,
    promoted_object: { page_id: pageId },
  };
  if (startTime) body.start_time = startTime;
  if (endTime) body.end_time = endTime;
  return graph(`${account}/adsets`, { method: "POST", body });
}

async function createAdCreative({
  name,
  pageId,
  videoId,
  imageUrl,
  message,
  headline,
  linkUrl,
  callToAction,
}) {
  const account = adAccountPath();
  const videoData = {
    video_id: videoId,
    message,
    title: headline,
    call_to_action: {
      type: callToAction,
      value: { link: linkUrl },
    },
  };
  if (imageUrl) videoData.image_url = imageUrl;
  return graph(`${account}/adcreatives`, {
    method: "POST",
    body: {
      name,
      object_story_spec: {
        page_id: pageId,
        video_data: videoData,
      },
    },
  });
}

async function createAd({ name, adSetId, creativeId, status = "PAUSED" }) {
  const account = adAccountPath();
  return graph(`${account}/ads`, {
    method: "POST",
    body: {
      name,
      adset_id: adSetId,
      creative: { creative_id: creativeId },
      status,
    },
  });
}

async function updateObjectStatus(objectId, status) {
  return graph(objectId, { method: "POST", body: { status } });
}

async function getAdAccountBillingStatus() {
  const account = adAccountPath();
  return graph(
    `${account}?fields=id,name,account_status,currency,disable_reason,funding_source_details,amount_spent,balance`
  );
}

function defaultTargeting() {
  return floridaTargeting();
}

/** Orlando, Miami, Tampa, Jacksonville — 25 mi. See ads/influencer-recruit/GEO-TARGETING.json */
function floridaTargeting({ ageMin = 18, ageMax = 44, interests } = {}) {
  const targeting = {
    geo_locations: {
      cities: [
        { key: "2429275", radius: 25, distance_unit: "mile" },
        { key: "2428987", radius: 25, distance_unit: "mile" },
        { key: "2429990", radius: 25, distance_unit: "mile" },
        { key: "2428577", radius: 25, distance_unit: "mile" },
      ],
      location_types: ["home", "recent"],
    },
    age_min: ageMin,
    age_max: ageMax,
    publisher_platforms: ["facebook", "instagram"],
    facebook_positions: ["feed", "story"],
    instagram_positions: ["stream", "story", "reels"],
    targeting_automation: { advantage_audience: 0 },
  };
  if (interests?.length) {
    targeting.flexible_spec = [{ interests: interests.map((i) => ({ id: i.id, name: i.name })) }];
  }
  return targeting;
}

function creatorInterestsTargeting() {
  return floridaTargeting({
    ageMin: 18,
    ageMax: 34,
    interests: [
      { id: "6003440235625", name: "Twitch" },
      { id: "6003940339466", name: "Video games" },
      { id: "6004158316095", name: "YouTube" },
      { id: "6003717913546", name: "Gamer" },
      { id: "6003389760112", name: "Social media marketing" },
    ],
  });
}

module.exports = {
  graph,
  adAccountPath,
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
  floridaTargeting,
  creatorInterestsTargeting,
};
