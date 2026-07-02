/**
 * Minimal Meta Marketing API client (Graph API v22).
 * Requires META_ACCESS_TOKEN and META_AD_ACCOUNT_ID in env or .env.local
 */

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
    const msg = data?.error?.message || res.statusText;
    throw new Error(`Meta API ${method} ${path}: ${msg}`);
  }
  return data;
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
  message,
  headline,
  linkUrl,
  callToAction,
}) {
  const account = adAccountPath();
  return graph(`${account}/adcreatives`, {
    method: "POST",
    body: {
      name,
      object_story_spec: {
        page_id: pageId,
        video_data: {
          video_id: videoId,
          message,
          title: headline,
          call_to_action: {
            type: callToAction,
            value: { link: linkUrl },
          },
        },
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

function defaultTargeting() {
  return {
    geo_locations: { countries: ["US"] },
    age_min: 18,
    age_max: 44,
    publisher_platforms: ["facebook", "instagram"],
    facebook_positions: ["feed", "story"],
    instagram_positions: ["stream", "story", "reels"],
    targeting_automation: { advantage_audience: 0 },
  };
}

module.exports = {
  graph,
  adAccountPath,
  verifyConnection,
  listCampaigns,
  createCampaign,
  createAdSet,
  createAdCreative,
  createAd,
  defaultTargeting,
};
