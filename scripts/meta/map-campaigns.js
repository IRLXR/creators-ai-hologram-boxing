/**
 * Maps ads/campaigns.json → Meta Marketing API structure:
 * Campaign (objective) → Ad Set (budget, audience) → Ad Creative → Ad
 */

const fs = require("fs");
const path = require("path");

const OBJECTIVE_MAP = {
  Leads: "OUTCOME_LEADS",
  Awareness: "OUTCOME_AWARENESS",
  Traffic: "OUTCOME_TRAFFIC",
  Sales: "OUTCOME_SALES",
  Engagement: "OUTCOME_ENGAGEMENT",
};

const OPTIMIZATION_MAP = {
  OUTCOME_LEADS: "LEAD_GENERATION",
  OUTCOME_AWARENESS: "REACH",
  OUTCOME_TRAFFIC: "LINK_CLICKS",
  OUTCOME_SALES: "OFFSITE_CONVERSIONS",
  OUTCOME_ENGAGEMENT: "POST_ENGAGEMENT",
};

const CTA_MAP = {
  "Sign Up": "SIGN_UP",
  "Learn More": "LEARN_MORE",
  "Book Now": "BOOK_NOW",
  "Watch More": "WATCH_MORE",
  "Apply Now": "APPLY_NOW",
};

function loadCampaignConfig() {
  const file = path.join(__dirname, "../../ads/campaigns.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function getPhaseBudget(config, phaseId) {
  const phase = config.phases.find((p) => p.id === phaseId);
  return phase?.daily_budget_usd?.meta ?? 20;
}

function buildTrackingUrl(siteBase, adPath, adId) {
  const base = siteBase.replace(/\/$/, "");
  const pathPart = adPath.startsWith("/") ? adPath : `/${adPath}`;
  const [pathname, existingQuery] = pathPart.split("?");
  const params = new URLSearchParams(existingQuery || "");
  if (!params.has("utm_source")) params.set("utm_source", "meta");
  if (!params.has("utm_medium")) params.set("utm_medium", "paid_social");
  if (!params.has("utm_content")) params.set("utm_content", adId);
  return `${base}${pathname}?${params.toString()}`;
}

function mapMetaObjective(metaBlock) {
  const raw = metaBlock.objective || "Traffic";
  return OBJECTIVE_MAP[raw] || OBJECTIVE_MAP.Traffic;
}

function mapCampaignBundle(config, campaignEntry) {
  const meta = campaignEntry.meta;
  const objective = mapMetaObjective(meta);
  const dailyBudgetUsd = getPhaseBudget(config, campaignEntry.phase);

  return {
    campaign: {
      name: meta.campaign_name,
      objective,
      status: "PAUSED",
    },
    adSet: {
      name: meta.ad_set_name,
      dailyBudgetUsd,
      optimizationGoal: OPTIMIZATION_MAP[objective] || "LINK_CLICKS",
      targeting: {
        geo_locations: { countries: config.default_targeting.geo },
        age_min: config.default_targeting.age_min,
        age_max: config.default_targeting.age_max,
        publisher_platforms: ["facebook", "instagram"],
        facebook_positions: ["feed", "story"],
        instagram_positions: ["stream", "story", "reels"],
        targeting_automation: { advantage_audience: 0 },
      },
    },
    ads: campaignEntry.ads.map((ad) => ({
      id: ad.id,
      name: ad.name,
      creativeFile: ad.creative,
      message: ad.meta_primary,
      headline: ad.headline,
      linkUrl: buildTrackingUrl(config.site_base, ad.path, ad.id),
      callToAction: CTA_MAP[meta.cta] || "LEARN_MORE",
      note: "Upload video via Ad Videos API first; pass video_id when creating creative.",
    })),
  };
}

function listAllBundles() {
  const config = loadCampaignConfig();
  return config.campaigns.map((entry) => ({
    phase: entry.phase,
    objective: entry.objective,
    bundle: mapCampaignBundle(config, entry),
  }));
}

module.exports = {
  loadCampaignConfig,
  mapCampaignBundle,
  listAllBundles,
  OBJECTIVE_MAP,
  CTA_MAP,
};
