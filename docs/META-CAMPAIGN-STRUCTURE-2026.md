# Meta Campaign Structure 2026 — Explainer

**Source:** [The BEST Facebook Ads Campaign Structure for 2026](https://www.youtube.com/watch?v=TIs3ID-9a3o) — Sam Piliero / The Moonlighters (20 min)  
**For:** IRLXR · Creators AI Hologram Boxing  
**Last updated:** July 12, 2026

This doc explains **every major concept** from the video above — the **M4 / Moonlighters consolidated structure** used to scale Meta (Facebook + Instagram) accounts without fragmenting spend across dozens of campaigns.

**Related IRLXR docs:** [AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md](./AD-FUNNEL-LAYERS-GUIDE-2026-Q2.md) · [AD-FUNNEL-LEARNING-GUIDE.md](./AD-FUNNEL-LEARNING-GUIDE.md) · [INFLUENCER-STAIRCASE-GUIDE.md](./INFLUENCER-STAIRCASE-GUIDE.md)

---

## TL;DR

| Idea | What it means |
|------|----------------|
| **Two core campaigns** | One **prospecting** (new customers) + one **retention** (existing customers). Everything else is optional add-ons later. |
| **Ad set = Pack** | Each ad set is a “pack” of creatives. **Never inject new ads into old packs** — launch new creative in a **new pack**. |
| **Consolidate, don’t scatter** | Fewer, better-organized ads beat 100+ random ads fighting the same auction. |
| **20% testing cap** | New-pack testing spend should never exceed **20%** of total daily budget. |
| **Always optimize for Purchase** | Not Add to Cart, Initiate Checkout, or Add Payment Info. |
| **Broad placements first** | Run Advantage+ placements wide, then trim only with clear data. |

---

## The case study (why structure matters)

Sam walks through a fashion brand that went from **0.63 ROAS → 1.4 ROAS** in 30 days — a **121% ROAS increase** — with only ~**$14k** spend in that window.

Important details:

| Factor | What happened |
|--------|----------------|
| **No sale, no new products, no new ads** | Improvement came from **Ads Manager structure + breakdown optimization**, not promos or fresh creative. |
| **Fewer ads** | **165 ads → 62 ads** — condensing the account, not inflating it. |
| **Breakdown audit** | They reviewed **placement, age, gender, day of week, landing pages** and shifted spend toward what already worked. |
| **Break-even ROAS** | 1.4 ROAS was just above their break-even — structure got them from bleeding cash to sustainable. |

**Lesson for IRLXR:** Before adding more creatives or budget, fix **account architecture** and **where spend lands** (placements, audiences, landing pages).

---

## Core philosophy

### Open system vs closed system

| Your business | Unique — suppliers, COGS, team, ops, brand story. Hard to compare 1:1 to competitors. |
| Your ad account | **Closed system** — same rules, same auction, same optimization mechanics for everyone. You can copy proven structures. |

### Consolidation over fragmentation

Scattering budget across many small campaigns causes:

- Overlapping auctions (your ads compete with your ads)
- Weak pixel signals (optimization data spread too thin)
- Erratic metrics that look like “scale” but bleed cash

The fix: a **unified, predictable** foundation — then add specialized campaigns only when justified.

---

## The M4 foundation: two campaigns

```
Account
├── ML_prospecting   ← new + engaged visitors (exclude recent purchasers)
└── ML_retention     ← people who already bought (before they churn)
```

Everything else — zombie campaigns, bid caps, cost caps, geo splits, promo flights — stacks **on top** of this core. Sam says this is what he’d deploy for **9 out of 10 brands** on day one.

### Campaign 1 — Prospecting (`ML_prospecting`)

**Purpose:** Acquire **new customers** and reach people who visited the site but haven’t purchased yet. Meta’s audience-segment reporting should show this campaign favoring **New** and **Engaged**, not Existing.

**Objective:** Sales  
**Budget:** Campaign budget optimization (CBO) — one daily budget at campaign level.

| Budget guidance | Rule |
|-----------------|------|
| **Low end** | ≥ **1× target CPA** per day |
| **High end** | Scale vertically as aggressively as cash flow allows above break-even ROAS |
| **Bid strategy** | Highest volume **or** highest value |
| **Budget scheduling** | None (to start) |

**Audience setup (campaign level):**

- Turn on **engaged** and **existing** audience reporting in advertiser settings (required for segment breakdowns later).

**Ad set (Pack) settings:**

| Setting | Value |
|---------|--------|
| **Customer acquisition** | Acquire new customers |
| **Exclusions** | All **past purchasers before churn date** |
| **Conversion location** | Website |
| **Performance goal** | Maximize **number of conversions** (most brands) **or** maximize **value of conversions** (wide AOV / many SKUs) |
| **Conversion event** | **Purchase** — always |
| **Cost per result goal** | **Blank** |
| **Attribution** | Standard · **7-day click** · **1-day engagement** · **1-day view** · Count all conversions |
| **Ad set budget** | **Blank** on Pack 1 (CBO controls spend) |
| **Targeting** | Broad — exclusions handle purchaser filtering; Advantage+ audience |
| **Placements** | **All on** — Advantage+ placements, including skippable, etc. |
| **Brand safety** | **Expanded** (default; use Moderate only if brand requires it) |

**Pro tip from video:** Run **both** “maximize conversions” and “maximize value” in **separate campaigns** if you have budget — often outperforms picking only one.

### Campaign 2 — Retention (`ML_retention`)

**Purpose:** Get **existing customers** to buy again before they churn.

| Setting | Typical value |
|---------|----------------|
| **Daily budget** | Small to start (example: **$50/day**); scale based on **frequency** and list size |
| **Ad set name** | `purchase_180_days` (or 90 / 270 / 365 — see churn window) |
| **Customer strategy** | Get conversions — but **limit** to custom audience, not “suggestions” |
| **Audience** | Custom: **Purchasers in last N days** |
| **Exclusions** | None (you’re targeting buyers on purpose) |
| **Everything else** | Same conversion + attribution rules as prospecting |

**Retention creative ideas:**

- Winners already working in prospecting
- Discounts, promos, new arrivals
- **Catalog / dynamic product ads** — cheap CPMs, familiar products

---

## The Pack system (most important operational rule)

An **ad set = a Pack**. Naming convention:

```
pack{N}_{avatar}_{concept}
```

| Part | Meaning |
|------|---------|
| **pack** | Pack number — `pack1`, `pack2`, `pack3`… increments each launch wave |
| **avatar** | Who the ad **speaks to** (not necessarily who you target in settings) |
| **concept** | The **angle** — hook, offer, story, format |

Example: `pack2_streamers_inside-tent`

### Golden rule

> **Every time you launch new ads, launch them in a NEW pack (new ad set).**  
> **Never inject new creatives into an old pack.**

**Why:** Injecting into exhausted ad sets **degrades pixel optimization signal** and makes performance unpredictable.

### Pack 1 vs Pack 2+

| Pack | Budget behavior |
|------|-----------------|
| **Pack 1** | Foundation — no ad-set spending limits; CBO distributes |
| **Pack 2+** | Add **ad set spending limits → average daily minimum** to force test spend |

---

## Testing budget: the 20% rule + 7-day minimum

When launching **Pack 2+** (new creative round):

1. Open **Budget and schedule → Ad set spending limits**
2. Set **Average daily minimum**
3. Formula: **1× target CPA** (e.g. CPA $100 → minimum $100/day)
4. **Cap:** Total testing minimums across all test packs ≤ **20% of campaign daily budget**

| Campaign budget/day | Max testing minimum (20%) |
|---------------------|---------------------------|
| $1,000 | $200 |
| $100 | $20 |

5. Run the minimum for **7 days only**, then **turn it off**
6. Don’t worry about “resetting learning phase”
   - Winner keeps spending above minimum anyway
   - Dud fades when minimum is removed — that’s normal

**Mental model:** Testing is a **controlled burn** — never let experiments eat the whole account.

---

## Churn window & exclusions

**Churn date** = when you consider someone **no longer a customer** (they’re unlikely to return).

| Business type | Typical exclusion window |
|---------------|--------------------------|
| Standard e-commerce | **180 days** since last purchase |
| Long repurchase cycle (annual, B2B, high-ticket) | **365 days** (or 270 / 90 — use judgment) |

**Prospecting:** Exclude everyone who purchased **before** the churn window.  
**Retention:** Target purchasers **inside** that window (e.g. `purchase_180_days`).

For IRLXR (events / tickets): define churn based on **time since last ticket purchase** or **time since last event attended** — likely shorter than 365 for local events unless you’re nurturing repeat season pass buyers.

---

## Conversion & attribution settings

### Always Purchase

| Event | Use? |
|-------|------|
| **Purchase** | ✅ Always |
| Add to Cart | ❌ Never as optimization event |
| Initiate Checkout | ❌ |
| Add Payment Info | ❌ |

Optimizing for micro-events trains the pixel on **window shoppers**, not buyers.

### Attribution model

- **Standard** attribution  
- **7-day click**  
- **1-day engagement**  
- **1-day view**  
- **Count all conversions**

Leave **cost per result goal** blank unless you have a deliberate bid-cap / cost-cap strategy elsewhere.

### Maximize conversions vs value

| Choose **number of conversions** when | Choose **value of conversions** when |
|----------------------------------------|--------------------------------------|
| Few hero products | Many SKUs / wide price range |
| Similar AOV across products | Optimizing for revenue, not just order count |
| Most DTC brands | Catalog-heavy stores |

---

## Placements & Advantage+

**Default:** All placements on, Advantage+ placements on, **no exclusions** at launch.

**Trim later only with data** — e.g. if Threads consistently wastes spend for your account.

**Process:**

1. Go broad → collect data  
2. Use **breakdowns** (placement, platform, etc.)  
3. Cut losers deliberately — don’t pre-cut before you have signal  

---

## Ad-level setup checklist

### Identity & destination

| Setting | Recommendation |
|---------|----------------|
| **Facebook Page + Instagram** | Both connected — required |
| **Website URL** | Main landing page (for IRLXR: `hologramboxing.com/landing.html`) |
| **Display link** | Use if raw URL looks ugly |
| **Personalized destination** | Usually on — caution if site has many unrelated pages |
| **Browser add-ons** | Off |
| **Multi-advertiser ads** | **Off** unless commoditized (easy to buy on Amazon) |
| **Promoted products** | Off unless running catalog ads |

### Copy variants (signal generation)

Provide **meaningfully different** options — not micro-tweaks.

| Field | Minimum |
|-------|---------|
| **Primary text** | **2–3 unique** angles |
| **Headlines** | **3 unique** |
| **Description** | Optional (1) |

**Bad:** “Buy my shoes” / “Buy my shoes today” (same signal)  
**Good:** Different hooks — problem/solution, social proof, urgency, experience story

### Call to action

| CTA | When |
|-----|------|
| **Shop now** | Default (~80% of brands) |
| **Get offer** | Active sale / promo |
| **Learn more** | Case study, article, education-first |
| **Order now** | Sometimes beats Shop now — test |

### Enhancements (what to toggle)

**Rule:** If it **modifies the creative** (image/video), **leave off**. If it only changes **around** the ad, usually OK.

| Enhancement | Typical choice |
|-------------|----------------|
| Overlays | ✅ OK |
| Show spotlights | ✅ OK |
| Reveal details over time | ✅ OK |
| Text improvements | ✅ Usually on |
| Business AI / pop-ups | ❌ Off |
| Visual / image touch-ups | ❌ Off |
| Ad music | ❌ Off |
| Generate backgrounds | ❌ Off |
| Ad animations | ❌ Off |

**Image generation** in Ads Manager: **skip for now** (review quarterly as Meta improves).

**Translations:** Enable if you sell in multiple languages — expands reach beyond single-language targeting.

**Essential enhancements:** Re-check often — Meta changes these frequently.

### Tracking

| Setting | Notes |
|---------|-------|
| **Website events** | On |
| **Product tracking / product insights** | Enable if available — ties purchases to specific products in ad |

**URL parameters:** Add UTM or third-party tracking params if you use them (GHL, analytics, etc.).

---

## Reporting: audience segments breakdown

In prospecting, open **Breakdown → Audience segments** to see:

| Segment | Expected in prospecting |
|---------|-------------------------|
| **New** | High share of spend |
| **Engaged** | Moderate |
| **Existing** | Low (exclusions should limit this) |

If Existing is eating prospecting budget, tighten **purchaser exclusions** or churn window.

Also review standard breakdowns regularly:

- Placement / platform  
- Age / gender (if relevant)  
- Day of week  
- Landing page  

---

## Scaling beyond the core (optional layers)

The two-campaign core is the **foundation**, not the ceiling. Add when justified:

| Layer | When to add |
|-------|-------------|
| **Separate geo campaign** | Different country, fulfillment, pricing, or website |
| **Promo / sale campaign** | Time-boxed offer with distinct creative |
| **Zombie campaign** | Revive old winners with fresh packs |
| **Bid cap / cost cap** | Advanced spend control when core is stable |
| **Horizontal scaling** | Duplicate winners into new packs / avatars |
| **Vertical scaling** | Raise CBO budget on proven campaign |

Sam references deeper playbooks (vertical / horizontal / “twin engine” scaling) in his paid Blueprint community — not required to implement the core structure above.

---

## Glossary

| Term | Definition |
|------|------------|
| **ROAS** | Return on Ad Spend — revenue ÷ ad spend |
| **Break-even ROAS** | ROAS where you neither profit nor lose (after COGS, fees, etc.) |
| **CPA** | Cost per acquisition — average cost per purchase |
| **CBO** | Campaign Budget Optimization — budget set at campaign level, Meta splits across ad sets |
| **Pack** | One ad set holding one wave of related creatives |
| **Avatar** | Target persona the copy/creative speaks to |
| **Concept / angle** | The creative hook or story |
| **Churn window** | Time after purchase when a customer is still “active” |
| **Advantage+** | Meta’s automated placement / audience / creative optimization products |
| **First-party exclusions** | Your purchaser lists used to stop prospecting from hitting buyers |
| **Retention** | Campaigns aimed at repeat purchase from existing customers |
| **Average daily minimum** | Ad-set spend floor to force testing budget on new packs |

---

## IRLXR mapping (how this connects to our funnel)

Our influencer staircase ([INFLUENCER-STAIRCASE-GUIDE.md](./INFLUENCER-STAIRCASE-GUIDE.md)) uses **5 layers** (L1–L5). The Moonlighters **two-campaign core** maps like this:

| Moonlighters | IRLXR influencer staircase |
|--------------|----------------------------|
| `ML_prospecting` | L1 Awareness + L2 Consideration + L3 Conversion (cold/warm) |
| `ML_retention` | L4 Retargeting + L5 Countdown (hot / known audiences) |

**Practical merge:**

- Use **pack naming** inside each layer’s ad sets when uploading new composite batches  
- **Never** add new composites into old ad sets — new file = new pack  
- Keep **Purchase** (or **Lead** if optimizing waitlist first, then graduate to Purchase) consistent per campaign objective  
- Apply **20% testing rule** when spinning up new L4/L5 creative waves  

Fan campaigns (`CAMP_HB_Awareness_001`, etc.) should follow the same pack logic when Meta mirror launches.

---

## Quick implementation checklist

- [ ] Advertiser settings: engaged + existing audience segments enabled  
- [ ] Custom audiences: purchasers 90/180/365d (pick churn window)  
- [ ] Campaign 1: Sales · CBO · `ML_prospecting` · exclude purchasers  
- [ ] Pack 1: foundation creatives · no ad-set minimum  
- [ ] Pack 2+: new ad set per launch · 7-day average daily minimum · ≤20% test budget  
- [ ] Campaign 2: Sales · `ML_retention` · target `purchase_{N}_days`  
- [ ] All ads: Purchase event · standard attribution · 2–3 primary texts · 3 headlines  
- [ ] Placements broad · trim from breakdown data only  
- [ ] Enhancements: don’t modify creative  
- [ ] Weekly: breakdown audit (placement, segments, landing page, day)  

---

## Source & credit

Video: **[The BEST Facebook Ads Campaign Structure for 2026](https://www.youtube.com/watch?v=TIs3ID-9a3o)** — Sam Piliero, The Moonlighters.  
This document is an **internal explainer** for the IRLXR team; structure credit belongs to the original author.
