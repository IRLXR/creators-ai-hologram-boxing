#!/usr/bin/env node
/**
 * Generates docs/INFLUENCER-PREVIEW-LAUNCH-MATRIX.md from preview HTML data.
 * Run: node scripts/marketing/generate-preview-launch-matrix.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const previewPath = join(root, "ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html");
const html = readFileSync(previewPath, "utf8");

const creativeMatch = html.match(/const CREATIVE = (\{[\s\S]*?\n    \});/);
const layersMatch = html.match(/const LAYERS = (\[[\s\S]*?\n    \]);/);
const CREATIVE = eval(`(${creativeMatch[1]})`);
const LAYERS = eval(`(${layersMatch[1]})`);

const LAYER_META = {
  L1: {
    layerNum: "01",
    funnel: "Awareness",
    plain: "See you",
    tiktokCampaign: "CAMP_HB_Influencer_L1_SeeYou_001",
    tiktokCampaignId: "1870345571958114",
    metaCampaign: "CAMP_HB_Influencer_L1_SeeYou_001",
    objectiveTiktok: "WEB_CONVERSIONS",
    optimizationTiktok: "CLICK",
    objectiveMeta: "OUTCOME_AWARENESS",
    optimizationMeta: "REACH",
    cta: "Learn More",
    turnOn: "Turn on with L2 + L3 for cold creator prospecting (influencers first).",
    retarget: "Cold — no retarget list required.",
    budgetDay: 20,
    adgroups: {
      gaming: { name: "ADGRP_HB_Inf_L1_GamingStreamers_FL", id: "1870345667162434", age: "18–34" },
      creators: { name: "ADGRP_HB_Inf_L1_AllCreators_FL", id: "1870345677808817", age: "18–44" },
    },
  },
  L2: {
    layerNum: "02",
    funnel: "Consideration",
    plain: "Get curious",
    tiktokCampaign: "CAMP_HB_Influencer_L2_Curious_001",
    tiktokCampaignId: "1870345580231025",
    metaCampaign: "CAMP_HB_Influencer_L2_Curious_001",
    objectiveTiktok: "WEB_CONVERSIONS",
    optimizationTiktok: "TRAFFIC_LANDING_PAGE_VIEW",
    objectiveMeta: "OUTCOME_TRAFFIC",
    optimizationMeta: "LINK_CLICKS",
    cta: "Learn More",
    turnOn: "Turn on with L1 + L3. Drives landing page views for tent / co-stream education.",
    retarget: "Cold — interest-based FL creators.",
    budgetDay: 20,
    adgroups: {
      gaming: { name: "ADGRP_HB_Inf_L2_GamingStreamers_FL", id: "1870345678592097", age: "18–34" },
      creators: { name: "ADGRP_HB_Inf_L2_AllCreators_FL", id: "1870345677811185", age: "18–44" },
    },
  },
  L3: {
    layerNum: "03",
    funnel: "Conversion",
    plain: "Sign up",
    tiktokCampaign: "CAMP_HB_InfluencerRecruit_001",
    tiktokCampaignId: "1870260441542146",
    metaCampaign: "CAMP_HB_InfluencerRecruit_001",
    metaCampaignId: "120249816887950588",
    objectiveTiktok: "WEB_CONVERSIONS",
    optimizationTiktok: "CONVERT",
    optimizationEvent: "FORM",
    objectiveMeta: "OUTCOME_TRAFFIC",
    optimizationMeta: "LINK_CLICKS",
    cta: "Sign Up",
    turnOn: "Primary signup layer — turn on first with L1 + L2.",
    retarget: "Cold + broad creator interests per ad group.",
    budgetDay: 20,
    adgroups: {},
  },
  L4: {
    layerNum: "04",
    funnel: "Retargeting",
    plain: "Come back",
    tiktokCampaign: "CAMP_HB_Influencer_L4_ComeBack_001",
    tiktokCampaignId: "1870345588238449",
    metaCampaign: "CAMP_HB_Influencer_L4_ComeBack_001",
    objectiveTiktok: "WEB_CONVERSIONS",
    optimizationTiktok: "CONVERT",
    optimizationEvent: "FORM",
    objectiveMeta: "OUTCOME_TRAFFIC",
    optimizationMeta: "LINK_CLICKS",
    cta: "Sign Up",
    turnOn: "Enable after L3 runs 7+ days and pixel has landing visitors.",
    retarget: "Landing visitors 7d excluding Lead (TikTok retarget list / Meta custom audience).",
    budgetDay: 20,
    adgroups: {
      gaming: { name: "ADGRP_HB_Inf_L4_GamingStreamers_FL", id: "1870345749405314", age: "18–34" },
      creators: { name: "ADGRP_HB_Inf_L4_AllCreators_FL", id: "1870345771609170", age: "18–44" },
    },
  },
  L5: {
    layerNum: "05",
    funnel: "Countdown",
    plain: "Show up",
    tiktokCampaign: "CAMP_HB_Influencer_L5_ShowUp_001",
    tiktokCampaignId: "1870345600654738",
    metaCampaign: "CAMP_HB_Influencer_L5_ShowUp_001",
    objectiveTiktok: "WEB_CONVERSIONS",
    optimizationTiktok: "CONVERT",
    optimizationEvent: "FORM",
    objectiveMeta: "OUTCOME_TRAFFIC",
    optimizationMeta: "LINK_CLICKS",
    cta: "Sign Up",
    turnOn: "Enable when HB 002 is ≤14 days out; sync with site countdown.",
    retarget: "Warm creators + retarget pools; urgency creative set.",
    budgetDay: 20,
    adgroups: {
      gaming: { name: "ADGRP_HB_Inf_L5_GamingStreamers_FL", id: "1870345767397378", age: "18–34" },
      creators: { name: "ADGRP_HB_Inf_L5_AllCreators_FL", id: "1870345772618818", age: "18–44" },
    },
  },
  BONUS: {
    layerNum: "06",
    funnel: "A/B test pool",
    plain: "Bonus composites",
    cta: "Sign Up",
    turnOn: "Not in staircase launch matrix — duplicate into live ad groups for creative A/B only.",
    retarget: "Match parent script layer when testing (L3 open call, L4 partner, etc.).",
  },
};

const L3_ADGROUPS = [
  { previewStart: 13, previewEnd: 16, name: "ADGRP_HB_OpenCallExact_US_Creators18-44", slug: "open_call_exact", age: "18–44", audience: "FL creators 18–44 · open call exact" },
  { previewStart: 17, previewEnd: 20, name: "ADGRP_HB_InfluencerRecruit_US_18-44", slug: "optimized_broad", age: "18–44", audience: "FL creators 18–44 · optimized broad" },
  { previewStart: 21, previewEnd: 24, name: "ADGRP_HB_InfluencerRecruit_GamingStreamers_FL", slug: "gaming", age: "18–44", audience: "Gaming streamers FL" },
  { previewStart: 25, previewEnd: 28, name: "ADGRP_HB_InfluencerRecruit_CombatCreators_FL", slug: "combat", age: "18–44", audience: "Combat creators FL" },
  { previewStart: 29, previewEnd: 32, name: "ADGRP_HB_InfluencerRecruit_ReelsCreators_FL", slug: "reels", age: "18–44", audience: "Reels / TikTok creators FL" },
  { previewStart: 33, previewEnd: 36, name: "ADGRP_HB_InfluencerRecruit_OrlandoMiami_FL", slug: "orlando_miami", age: "18–44", audience: "Orlando + Miami FL" },
];

const CREATIVE_META = {
  inf_calling_all_vo: {
    script: 34,
    vo: "INFLUENCER-CALLING-ALL-15s-VO.mp4",
    bg: "ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4",
    poster: "INFLUENCER-CALLING-ALL-COMPOSITE-POSTER-15s.mp4",
    type: "composite cinematic",
  },
  inf_open_call_vo: {
    script: 33,
    vo: "INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4",
    bg: "assets/higgsfield-386b5e5c-43c6-44ee-a8f3-ab148fe272ca.mp4",
    poster: "INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4",
    hf: "INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-HF-386B5E5C-15s.mp4",
    type: "composite cinematic",
  },
  inf_join_team_vo: {
    script: 35,
    vo: "INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4",
    bg: "assets/ep3-ar-experience-hero.mp4",
    poster: "INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4",
    hf: "INFLUENCER-JOIN-THE-TEAM-COMPOSITE-HF-B002936B-15s.mp4",
    type: "composite cinematic",
  },
  inf_l4_retarget_vo: { script: 36, vo: "INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4", bg: "ads/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4", type: "composite cinematic" },
  inf_l4_partner_reviews_vo: { script: 37, vo: "INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4", bg: "assets/ep2-ar-experience.mp4", poster: "INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-POSTER-15s.mp4", type: "composite cinematic" },
  inf_l4_reminder_vo: { script: 38, vo: "INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4", bg: "assets/ep3-ringside-ots.mp4", poster: "INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-POSTER-15s.mp4", type: "composite cinematic" },
  inf_l4_streamer_reviews_vo: { script: 39, vo: "INFLUENCER-L4-STREAMER-REVIEWS-15s-VO.mp4", bg: "assets/higgsfield-892f90b0-5456-4ceb-9589-266f3b418c4d.mp4", type: "composite cinematic" },
  inf_l4_confirms_partner_vo: { script: 43, vo: "INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4", bg: "assets/ep3-ar-wide-tent.mp4", type: "composite cinematic" },
  inf_l4_confirms_reminder_vo: { script: 44, vo: "INFLUENCER-L4-CONFIRMS-REMINDER-AD-15s-VO.mp4", bg: "assets/ep3-pov-passthrough.mp4", type: "composite cinematic" },
  inf_l4_confirms_open_call_vo: { script: 45, vo: "INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4", bg: "assets/ep3-blue-silver-v1-faceoff.mp4", poster: "INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-POSTER-15s.mp4", type: "composite cinematic" },
  inf_l5_countdown_vo: { script: 40, vo: "INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4", bg: "assets/ep3-fight-impact.mp4", poster: "INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-POSTER-15s.mp4", type: "composite cinematic" },
  inf_l5_last_call_vo: { script: 41, vo: "INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4", bg: "assets/ep3-ar-experience.mp4", poster: "INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-POSTER-15s.mp4", type: "composite cinematic" },
  inf_l5_final_slots_vo: { script: 42, vo: "INFLUENCER-L5-FINAL-SLOTS-CLOSING-15s-VO.mp4", bg: "assets/ep3-tent-corner-crowd.mp4", type: "composite cinematic" },
  livefx: { script: "L2", vo: "ads/output/32-live-interactive-effects-plate.mp4", bg: "assets/ep3-ar-closeup-v2.mp4", type: "composite L2 (host plate FG)" },
  stream: { script: "L2", vo: "ugc/output/08-watch-free-on-kick-twitch-plate.mp4", bg: "assets/ep3-ar-ringside.mp4", type: "composite L2 (host plate FG)" },
  tent: { script: "L2", vo: "ugc/output/02-the-inflatable-tent-plate.mp4", bg: "assets/ep1-tent-preview.mp4", type: "composite L2/L3 (host plate FG)" },
  whatis: { script: "L3", vo: "ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4", bg: "assets/ep3-ar-closeup.mp4", type: "composite L3 (host plate FG)" },
  walk: { type: "silent cinematic B-roll", bg: "ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4", note: "No host PiP — full-screen silent walk plate" },
  future_mystery: { type: "cinematic trailer", bg: "ads/brief-001/output/Director_Brief_001_Version_B_Cinematic_Mystery.mp4" },
  future_vo: { type: "ambient cinematic", bg: "ads/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4", note: "Silent ambient — no double VO" },
  open_exact: { type: "silent poster flyer", bg: "ads/influencer-recruit/output/OPEN-CALL-EXACT-POSTER-15s.mp4" },
  open_opt: { type: "silent poster flyer", bg: "ads/influencer-recruit/output/TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4" },
  open_v1: { type: "silent poster flyer", bg: "ads/influencer-recruit/output/TIKTOK-OPEN-CALL-CREATORS-15s.mp4" },
  inf_open_call_hf: { script: 33, type: "composite HF bonus", shipOnly: true, parent: "inf_open_call_vo", hfJob: "386b5e5c", hfShare: "https://higgsfield.ai/s/DSV6gTILagQ" },
  inf_join_team_hf: { script: 35, type: "composite HF bonus", shipOnly: true, parent: "inf_join_team_vo", hfJob: "b002936b", hfShare: "https://higgsfield.ai/s/-hX774_N8iM" },
  inf_open_call_poster: { script: 33, type: "composite poster A/B", parent: "inf_open_call_vo" },
  inf_calling_all_poster: { script: 34, type: "composite poster A/B", parent: "inf_calling_all_vo" },
  inf_join_team_poster: { script: 35, type: "composite poster A/B", parent: "inf_join_team_vo" },
  inf_l4_partner_poster: { script: 37, type: "composite poster A/B", parent: "inf_l4_partner_reviews_vo" },
  inf_l4_reminder_poster: { script: 38, type: "composite poster A/B", parent: "inf_l4_reminder_vo" },
  inf_l5_countdown_poster: { script: 40, type: "composite poster A/B", parent: "inf_l5_countdown_vo" },
  inf_l5_last_call_poster: { script: 41, type: "composite poster A/B", parent: "inf_l5_last_call_vo" },
  inf_l4_confirms_open_call_poster: { script: 45, type: "composite poster A/B", parent: "inf_l4_confirms_open_call_vo" },
};

const OUT_PREFIX = "ads/influencer-recruit/";

function resolveShipPath(crKey) {
  const rel = CREATIVE[crKey];
  if (!rel) return null;
  if (rel.startsWith("output/")) return OUT_PREFIX + rel;
  if (rel.startsWith("../")) return "ads/influencer-recruit/" + rel.replace(/^\.\.\//, "");
  return rel;
}

function slugUtm(name) {
  return name.replace(/^AD_HB_|^BONUS_/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function pickAdgroup(layerId, previewN, aud, name) {
  if (layerId === "L1" || layerId === "L2" || layerId === "L4" || layerId === "L5") {
    const isGaming = /gaming|18–34|18-34/i.test(aud) || /_Gaming$/i.test(name);
    const meta = LAYER_META[layerId];
    return isGaming && !/Creators · 2nd touch/i.test(aud) ? meta.adgroups.gaming : meta.adgroups.creators;
  }
  if (layerId === "L3") {
    return L3_ADGROUPS.find((g) => previewN >= g.previewStart && previewN <= g.previewEnd) || null;
  }
  return null;
}

function slotInLayer(layerId, previewN) {
  const offsets = { L1: 0, L2: 6, L3: 12, L4: 36, L5: 48, BONUS: 54 };
  return previewN - (offsets[layerId] || 0);
}

let globalN = 0;
const allAds = [];
for (const layer of LAYERS) {
  for (const ad of layer.ads) {
    globalN++;
    allAds.push({ ...ad, layerId: layer.id, layerTitle: layer.title, layerDesc: layer.desc, previewN: globalN });
  }
}

function fmtAdSection(ad) {
  const lm = LAYER_META[ad.layerId];
  const layerNum = lm.layerNum;
  const slot = String(slotInLayer(ad.layerId, ad.previewN)).padStart(2, "0");
  const id = `${layerNum}.${slot}.00`;
  const cr = ad.cr;
  const ship = resolveShipPath(cr);
  const cm = CREATIVE_META[cr] || {};
  const ag = pickAdgroup(ad.layerId, ad.previewN, ad.aud, ad.name);
  const inStaircase = ad.layerId !== "BONUS";
  const utmContent = `${slugUtm(ad.name)}_${cr}`;

  const lines = [];
  lines.push(`### ${id} — Preview #${ad.previewN} · \`${ad.name}\``);
  lines.push("");
  lines.push(`#### ${id.replace(/00$/, "01")} Identity & funnel`);
  lines.push("");
  lines.push(`| Field | Value |`);
  lines.push(`|-------|-------|`);
  lines.push(`| **Preview #** | ${ad.previewN} |`);
  lines.push(`| **Layer** | ${ad.layerId} — ${lm.funnel} (${lm.plain}) |`);
  lines.push(`| **Funnel phase** | ${lm.funnel} |`);
  lines.push(`| **Layer description** | ${ad.layerDesc} |`);
  lines.push(`| **In staircase launch** | ${inStaircase ? "Yes — ship in TikTok/Meta staircase" : "No — A/B test pool only"} |`);
  lines.push(`| **Format** | 15s · 9:16 video |`);
  lines.push("");
  lines.push(`#### ${id.replace(/00$/, "02")} Targeting & audience`);
  lines.push("");
  lines.push(`| Field | Value |`);
  lines.push(`|-------|-------|`);
  lines.push(`| **Audience (preview)** | ${ad.aud} |`);
  lines.push(`| **Geo** | Florida DMAs — Orlando (534) · Miami (528) · Tampa (539) · Jacksonville (561) |`);
  lines.push(`| **Language** | English |`);
  if (ag) {
    lines.push(`| **TikTok ad group** | \`${ag.name}\`${ag.id ? ` · ID \`${ag.id}\`` : ""} |`);
    lines.push(`| **Age** | ${ag.age || "per ad group"} |`);
    if (ag.audience) lines.push(`| **Ad group focus** | ${ag.audience} |`);
  }
  lines.push(`| **Retarget rule** | ${lm.retarget} |`);
  lines.push(`| **Turn-on rule** | ${lm.turnOn} |`);
  lines.push("");
  lines.push(`#### ${id.replace(/00$/, "03")} Platform objectives & CTA`);
  lines.push("");
  lines.push(`| Field | TikTok | Meta |`);
  lines.push(`|-------|--------|------|`);
  if (ad.layerId !== "BONUS") {
    lines.push(`| **Campaign** | \`${lm.tiktokCampaign}\`${lm.tiktokCampaignId ? ` (\`${lm.tiktokCampaignId}\`)` : ""} | \`${lm.metaCampaign}\`${lm.metaCampaignId ? ` (\`${lm.metaCampaignId}\`)` : ""} |`);
    lines.push(`| **Objective** | ${lm.objectiveTiktok} | ${lm.objectiveMeta} |`);
    lines.push(`| **Optimization** | ${lm.optimizationTiktok}${lm.optimizationEvent ? ` → \`${lm.optimizationEvent}\`` : ""} | ${lm.optimizationMeta} |`);
    lines.push(`| **Budget (campaign CBO)** | $${lm.budgetDay}/day | $${lm.budgetDay}/day |`);
  } else {
    lines.push(`| **Campaign** | Match parent script layer when A/B testing | Match parent script layer when A/B testing |`);
    lines.push(`| **Objective** | Same as parent L3/L4/L5 slot | Same as parent slot |`);
  }
  lines.push(`| **CTA button** | ${ad.layerId === "L1" || ad.layerId === "L2" ? "Learn More" : lm.cta} | ${ad.layerId === "L1" || ad.layerId === "L2" ? "Learn More" : lm.cta} |`);
  lines.push("");
  lines.push(`#### ${id.replace(/00$/, "04")} Creative files`);
  lines.push("");
  lines.push(`| Field | Path |`);
  lines.push(`|-------|------|`);
  lines.push(`| **Creative key** | \`${cr}\` |`);
  lines.push(`| **Ship file (preview)** | \`${ship}\` |`);
  if (cm.script) lines.push(`| **Talking-head script** | ${typeof cm.script === "number" ? `Script ${cm.script}` : cm.script} |`);
  if (cm.vo) {
    const voPath = cm.vo.includes("/") ? cm.vo : `${OUT_PREFIX}output/${cm.vo}`;
    lines.push(`| **VO / foreground plate** | \`${voPath}\` |`);
  }
  if (cm.bg) lines.push(`| **BG cinematic source** | \`${cm.bg}\` |`);
  if (cm.poster) lines.push(`| **Poster A/B composite** | \`${OUT_PREFIX}output/${cm.poster}\` |`);
  if (cm.hf) lines.push(`| **HF B-roll variant** | \`${OUT_PREFIX}output/${cm.hf}\` |`);
  if (cm.hfJob) lines.push(`| **HF job ID** | \`${cm.hfJob}\` · [share](${cm.hfShare}) |`);
  if (cm.type) lines.push(`| **Creative type** | ${cm.type} |`);
  if (cm.note) lines.push(`| **Note** | ${cm.note} |`);
  if (cm.parent) lines.push(`| **Parent creative key** | \`${cm.parent}\` |`);
  lines.push(`| **Rebuild composites** | \`scripts/marketing/build-influencer-composites.ps1\` |`);
  lines.push("");
  lines.push(`#### ${id.replace(/00$/, "05")} Copy`);
  lines.push("");
  if (ad.hook) lines.push(`- **Hook overlay (0–3s):** ${ad.hook}`);
  ad.texts.forEach((t, i) => lines.push(`- **TikTok text ${i + 1}:** ${t}`));
  lines.push("");
  lines.push(`#### ${id.replace(/00$/, "06")} Tracking & launch`);
  lines.push("");
  lines.push(`| Field | Value |`);
  lines.push(`|-------|-------|`);
  lines.push(`| **Landing** | https://www.hologramboxing.com/landing.html |`);
  lines.push(`| **UTM campaign** | \`influencer_recruit\` |`);
  lines.push(`| **UTM content** | \`${utmContent}\` |`);
  lines.push(`| **Full UTM example** | \`?utm_source=tiktok&utm_medium=paid_social&utm_campaign=influencer_recruit&utm_content=${utmContent}\` |`);
  lines.push(`| **Meta pixel** | \`3661825047289885\` |`);
  lines.push(`| **TikTok pixel** | \`D94N53BC77UFCF7AK7E0\` (API \`7658773511775043592\`) |`);
  lines.push(`| **Status** | PAUSED / OFF until QA complete |`);
  lines.push(`| **Preview QA** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html#${ad.layerId} |`);
  lines.push("");
  return lines.join("\n");
}

const indexRows = allAds.map((ad) => {
  const lm = LAYER_META[ad.layerId];
  const slot = String(slotInLayer(ad.layerId, ad.previewN)).padStart(2, "0");
  const id = `${lm.layerNum}.${slot}.00`;
  const ship = resolveShipPath(ad.cr);
  return `| ${ad.previewN} | \`${id}\` | ${ad.layerId} | ${lm.funnel} | \`${ad.name}\` | \`${ad.cr}\` | \`${ship?.split("/").pop()}\` | ${ad.layerId === "BONUS" ? "A/B only" : "Staircase"} |`;
});

const out = [];
out.push("# Influencer Preview → Launch Matrix");
out.push("");
out.push("**Last updated:** July 12, 2026  ");
out.push("**Purpose:** Bridge between the [64-card preview](../ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html) and TikTok/Meta launch — targeting, funnel phase, ship files, copy, and UTMs.  ");
out.push("**ID format:** `XX.YY.ZZ` — layer.slot.section (`XX.YY.00` = ad slot · `XX.YY.01`–`06` = field groups under that slot).");
out.push("");
out.push("---");
out.push("");
out.push("## 00.00.00 — Document overview");
out.push("");
out.push("| Item | Value |");
out.push("|------|-------|");
out.push("| **Preview URL (local)** | http://127.0.0.1:8765/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html |");
out.push("| **Open preview** | `npm run preview:influencer-ads:open` or `OPEN-INFLUENCER-ADS-PREVIEW.bat` |");
out.push("| **Staircase ads** | 54 (#1–#54) — 48 base + 6 L4 confirmation |");
out.push("| **Bonus A/B ads** | 10 (#55–#64) — 2 HF B-roll · 8 poster composites |");
out.push("| **Total preview cards** | **64** |");
out.push("| **Landing** | https://www.hologramboxing.com/landing.html |");
out.push("| **UTM campaign** | `influencer_recruit` |");
out.push("| **Goal** | Creators sign up to co-stream Hologram Boxing |");
out.push("| **Machine spec** | `ads/influencer-recruit/INFLUENCER-STAIRCASE.json` |");
out.push("| **Deploy manifest** | `ads/influencer-recruit/LAUNCH-MANIFEST.json` |");
out.push("");
out.push("### 00.00.01 Related documentation");
out.push("");
out.push("| ID | Document | Role |");
out.push("|----|----------|------|");
out.push("| — | [INFLUENCER-ADS-MASTER-GUIDE.md](./INFLUENCER-ADS-MASTER-GUIDE.md) | Ops, readiness, platform status |");
out.push("| — | [INFLUENCER-STAIRCASE-GUIDE.md](./INFLUENCER-STAIRCASE-GUIDE.md) | Layer rules, turn-on order |");
out.push("| — | [AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md](./AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md) | Full funnel (fans + creators) |");
out.push("| — | [AD-SET-AD-BUILD-MATRIX.md](./AD-SET-AD-BUILD-MATRIX.md) | Ad set × creative reuse |");
out.push("| — | [VIDEO-TOPIC-MATCHING-GUIDE.md](./VIDEO-TOPIC-MATCHING-GUIDE.md) | Script ↔ B-roll topic fit |");
out.push("| — | [VIDEO-BROLL-TALKING-HEAD-MATCHING.md](./VIDEO-BROLL-TALKING-HEAD-MATCHING.md) | Composite build rules |");
out.push("| — | [INFLUENCER-TALKING-HEAD-SCRIPTS.md](../ads/influencer-recruit/INFLUENCER-TALKING-HEAD-SCRIPTS.md) | VO scripts + Seedance prompts |");
out.push("");
out.push("---");
out.push("");
out.push("## 00.01.00 — Master index (all 64 preview cards)");
out.push("");
out.push("| Preview # | Doc ID | Layer | Funnel | Ad name | Creative key | Ship file | Launch |");
out.push("|-----------|--------|-------|--------|---------|--------------|-----------|--------|");
out.push(indexRows.join("\n"));
out.push("");
out.push("---");
out.push("");
out.push("## 00.02.00 — Global targeting & platform rules");
out.push("");
out.push("### 00.02.01 Geo & language");
out.push("");
out.push("| Field | Value |");
out.push("|-------|-------|");
out.push("| **Locations** | Orlando · Miami · Tampa · Jacksonville (FL DMAs) |");
out.push("| **TikTok DMA codes** | 534 · 528 · 539 · 561 |");
out.push("| **Meta radius** | 25 mi around each city (when using city targeting) |");
out.push("| **Language** | English |");
out.push("");
out.push("### 00.02.02 Turn-on order (influencer staircase)");
out.push("");
out.push("| Order | Layer | Doc IDs | When |");
out.push("|-------|-------|---------|------|");
out.push("| 1 | **L1 + L2 + L3** | `01.*` · `02.*` · `03.*` | Cold creator prospecting + signup — turn on first |");
out.push("| 2 | **L4** | `04.*` | After L3 runs **7+ days** · pixel has **landing visitors 7d excl. Lead** |");
out.push("| 3 | **L5** | `05.*` | When HB 002 is **≤14 days out** · sync site countdown |");
out.push("| — | **Bonus** | `06.*` | A/B tests only — duplicate into live ad groups; not auto-launched |");
out.push("");
out.push("### 00.02.03 Platform accounts & pixels");
out.push("");
out.push("| Platform | Account / ID | Pixel |");
out.push("|----------|--------------|-------|");
out.push("| **TikTok advertiser** | `7658020511833014273` | `D94N53BC77UFCF7AK7E0` (API `7658773511775043592`) |");
out.push("| **TikTok identity** | @hologramboxing | — |");
out.push("| **Meta ad account** | `534185933351087` | `3661825047289885` |");
out.push("");
out.push("### 00.02.04 Campaign summary");
out.push("");
out.push("| Layer | Campaign | TikTok ID | Ads | CTA | TikTok opt | Meta objective |");
out.push("|-------|----------|-----------|-----|-----|------------|----------------|");
out.push("| L1 | `CAMP_HB_Influencer_L1_SeeYou_001` | `1870345571958114` | 6 | Learn More | CLICK | Awareness → Reach |");
out.push("| L2 | `CAMP_HB_Influencer_L2_Curious_001` | `1870345580231025` | 6 | Learn More | TRAFFIC_LANDING_PAGE_VIEW | Traffic → Link clicks |");
out.push("| L3 | `CAMP_HB_InfluencerRecruit_001` | `1870260441542146` | 24 | Sign Up | CONVERT → FORM | Traffic → Link clicks |");
out.push("| L4 | `CAMP_HB_Influencer_L4_ComeBack_001` | `1870345588238449` | 12 | Sign Up | CONVERT → FORM | Traffic → Link clicks |");
out.push("| L5 | `CAMP_HB_Influencer_L5_ShowUp_001` | `1870345600654738` | 6 | Sign Up | CONVERT → FORM | Traffic → Link clicks |");
out.push("| Bonus | — | — | 10 | Sign Up | per parent | per parent |");
out.push("");
out.push("### 00.02.05 Ship-file priority");
out.push("");
out.push("1. **Primary (staircase):** `INFLUENCER-*-COMPOSITE-15s.mp4` — cinematic B-roll + host PiP  ");
out.push("2. **A/B poster:** `INFLUENCER-*-COMPOSITE-POSTER-15s.mp4` — silent flyer BG + host PiP (Bonus #57–64)  ");
out.push("3. **A/B HF B-roll:** `INFLUENCER-*-COMPOSITE-HF-*.mp4` — alternate Higgsfield BG (Bonus #55–56)  ");
out.push("4. **Silent / trailer slots:** `walk` · `future_mystery` · `open_v1` · poster MP4s — no double VO  ");
out.push("");
out.push("### 00.02.06 L3 ad group map (24 ads)");
out.push("");
out.push("| Preview # | Doc ID | TikTok ad group | Creatives in group |");
out.push("|-----------|--------|-----------------|-------------------|");
for (const g of L3_ADGROUPS) {
  const startId = `03.${String(g.previewStart - 12).padStart(2, "0")}.00`;
  const endId = `03.${String(g.previewEnd - 12).padStart(2, "0")}.00`;
  out.push(`| ${g.previewStart}–${g.previewEnd} | \`${startId}\`–\`${endId}\` | \`${g.name}\` | Open Call Exact · Optimized · Creators v1 · Live FX |`);
}
out.push("");
out.push("---");

for (const layer of LAYERS) {
  const lm = LAYER_META[layer.id];
  const firstAd = allAds.find((a) => a.layerId === layer.id);
  const lastAd = [...allAds].reverse().find((a) => a.layerId === layer.id);
  out.push("");
  out.push(`## ${lm.layerNum}.00.00 — ${layer.title}`);
  out.push("");
  out.push(layer.desc);
  if (layer.id !== "BONUS") {
    out.push("");
    out.push(`| Field | Value |`);
    out.push(`|-------|-------|`);
    out.push(`| **Preview range** | #${firstAd.previewN}–#${lastAd.previewN} |`);
    out.push(`| **TikTok campaign** | \`${lm.tiktokCampaign}\` (\`${lm.tiktokCampaignId}\`) |`);
    out.push(`| **Funnel phase** | ${lm.funnel} — ${lm.plain} |`);
    out.push(`| **CTA** | ${lm.cta} |`);
    out.push(`| **Turn-on** | ${lm.turnOn} |`);
    out.push(`| **Retarget** | ${lm.retarget} |`);
  }
  out.push("");
  out.push("---");
  for (const ad of allAds.filter((a) => a.layerId === layer.id)) {
    out.push(fmtAdSection(ad));
    out.push("---");
  }
}

out.push("");
out.push("## 00.03.00 — QA checklist (before turn-on)");
out.push("");
out.push("### 00.03.01 Per-ad QA");
out.push("");
out.push("- [ ] Open preview card — video plays on http://127.0.0.1:8765 (not `file://`)");
out.push("- [ ] Ship file matches **04 Creative files** row for that doc ID");
out.push("- [ ] Host audio only on composites (no double VO from B-roll)");
out.push("- [ ] TikTok texts match preview card copy");
out.push("- [ ] CTA matches layer (Learn More L1/L2 · Sign Up L3–L5)");
out.push("- [ ] `utm_content` unique per ad name");
out.push("");
out.push("### 00.03.02 Layer QA");
out.push("");
out.push("- [ ] L1–L3 paused ON together for first launch wave");
out.push("- [ ] L4 audiences attached before enabling retarget campaign");
out.push("- [ ] L5 countdown synced with site event date");
out.push("- [ ] Bonus creatives uploaded only as A/B duplicates — not replacing staircase primaries");
out.push("");
out.push("*Generated by `scripts/marketing/generate-preview-launch-matrix.mjs` — re-run after preview HTML changes.*");

const outPath = join(root, "docs/INFLUENCER-PREVIEW-LAUNCH-MATRIX.md");
writeFileSync(outPath, out.join("\n"), "utf8");
console.log(`Wrote ${outPath} (${out.length} lines)`);
