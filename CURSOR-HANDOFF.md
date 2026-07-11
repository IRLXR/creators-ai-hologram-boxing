# Cursor Handoff — Creators AI Hologram Boxing

Handoff doc for another Cursor user to clone this repo, wire integrations, and run ads + CRM automation locally.

**Repo:** [IRLXR/creators-ai-hologram-boxing](https://github.com/IRLXR/creators-ai-hologram-boxing)  
**Live site:** https://creators-ai-hologram-boxing.vercel.app

---

## 1. Quick start (5 min)

```bash
# Clone
gh repo clone IRLXR/creators-ai-hologram-boxing
cd creators-ai-hologram-boxing

# Open in Cursor
cursor .

# Local site
npm start
# → http://localhost:8080
```

No `npm install` required for the static site. Node is only needed for Meta ads CLI scripts.

---

## 2. What this project includes

| Area | Location | Purpose |
|------|----------|---------|
| Marketing site | `index.html`, `book.html`, `landing.html`, … | Hologram Boxing event site |
| Site config | `site-config.js` | Handles, URLs, GHL flags, Meta ad account ID |
| GHL form API | `api/ghl-submit.js` | Vercel serverless → Go High Level contacts |
| Meta ads CLI | `scripts/meta/` | Campaign → Ad Set → Creative → Ad via Marketing API |
| Ad copy / plans | `ads/campaigns.json`, `ads/launch-hub.html` | Campaign names, UTMs, launch checklist |
| UGC creatives | `ugc/output/*.mp4` | Paid social video plates |

---

## 3. Environment variables

Copy the example file and fill in secrets **locally only** (never commit):

```bash
cp .env.example .env.local
```

### Required for Meta ads API

| Variable | Example / where to get it |
|----------|---------------------------|
| `META_APP_ID` | `1553077533181756` (CursorAdsManger app) |
| `META_AD_ACCOUNT_ID` | `534185933351087` |
| `META_ACCESS_TOKEN` | [Graph API Explorer](https://developers.facebook.com/tools/explorer/) — scopes below |
| `META_PAGE_ID` | Facebook Page ID (currently **Romethelife**: `118345932178751`) |
| `META_PIXEL_ID` | Optional — Meta Events Manager |

**Token scopes:** `ads_read`, `ads_management`, `business_management`, `pages_show_list`, `pages_read_engagement`

### Required for Go High Level (local API + Vercel)

| Variable | Hologram Boxing sub-account |
|----------|----------------------------|
| `GHL_PIT_TOKEN` | Private Integration Token from GHL → Settings → Private Integrations |
| `GHL_LOCATION_ID` | `n6PdCClODfl4xSIPmYjr` |

Create a **new PIT** in the Hologram Boxing sub-account with **Contacts** (read/write) enabled. Do not share tokens in chat or commit them.

### Verify Meta connection

```bash
npm run meta:verify    # token + ad account
npm run meta:list      # existing campaigns
npm run meta:plan      # maps ads/campaigns.json → API structure
npm run tiktok:verify  # TikTok Marketing API + MCP credentials
```

---

## 4. Cursor MCP — TikTok Ads

Full setup: **`docs/TIKTOK-MCP-CONNECT.md`**

Add to **`~/.cursor/mcp.json`** (merge with existing servers):

```json
"tiktok-ads": {
  "command": "node",
  "args": ["scripts/tiktok/run-mcp.mjs"],
  "cwd": "C:/Users/suzet/Desktop/creators-ai-hologram-boxing"
}
```

Requires in `.env.local`:

- `TIKTOK_MARKETING_ACCESS_TOKEN` — Marketing API (not Events/pixel token)
- `TIKTOK_ADVERTISER_ID`

Template: `mcp.tiktok.example.json` · Package: `@cesteral/tiktok-mcp`

After adding: **Reload Cursor** → Tools & MCP → `tiktok-ads` should show green.

---

## 5. Cursor MCP — Go High Level

Add this block to **`~/.cursor/mcp.json`** under `mcpServers` (merge with existing servers):

```json
"gohighlevel-HologramBoxing": {
  "url": "https://services.leadconnectorhq.com/mcp/",
  "headers": {
    "Authorization": "Bearer YOUR_HOLOGRAM_BOXING_PIT",
    "locationId": "n6PdCClODfl4xSIPmYjr"
  }
}
```

Optional — agency / sibling sub-accounts already in use:

| MCP name | Location ID | Use |
|----------|-------------|-----|
| `gohighlevel-IRLXR` | `fMUCDP8nnG1uKTHbIl2o` | IRLXR sub-account |
| `gohighlevel-HologramBoxing` | `n6PdCClODfl4xSIPmYjr` | Hologram Boxing sub-account |

After editing `mcp.json`: **Cmd+Shift+P → Developer: Reload Window**

### GHL MCP capabilities (Hologram Boxing PIT)

- Contacts (create, update, upsert, tags)
- Conversations, calendars, opportunities
- Social posting stats (organic — not paid ad manager)
- Blogs, emails, payments (scope-dependent)

**GHL Ad Manager** (Meta/Google in GHL UI) is separate — connect in GHL → Marketing → Ad Manager → Connect Facebook.

---

## 5. Meta Marketing API setup (first-time)

### App details (already created)

| Item | Value |
|------|-------|
| Meta app name | CursorAdsManger |
| App ID | `1553077533181756` |
| Business ID | `1670207829759082` |
| Ad account | `act_534185933351087` |
| Ads Manager | https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=534185933351087 |

### Publish the app (required for ad creatives)

New Meta apps show **Unpublished** (old UI: Development mode). Ad creatives fail with error **1885183** until published.

1. [App dashboard](https://developers.facebook.com/apps/1553077533181756/) → **Publish** → **Go live**
2. Complete checklist:
   - **App settings → Basic:** Privacy Policy URL, Category, Contact email
   - **Use cases:** Marketing API / Manage ads
   - **App Review:** `ads_management` advanced access (if prompted)
   - **Business verification** (if prompted)
3. Click **Go live** → status becomes **Published**

Docs: https://developers.facebook.com/docs/development/release/

### Generate access token

1. [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. App: **CursorAdsManger** (`1553077533181756`)
3. Add permissions (see section 3)
4. **Generate Access Token** → paste into `.env.local`

For production automation, use a **System User** token in [Business Settings](https://business.facebook.com/settings) instead of a short-lived user token.

### Billing (required to create ads)

Ad account must have a valid payment method:

https://adsmanager.facebook.com/adsmanager/manage/ad_account_settings/ad_account_setup?act=534185933351087

Error **1359188** = no payment method on file.

---

## 6. Meta API — what works (verified)

| Action | Status | Notes |
|--------|--------|-------|
| Read campaigns / ad sets | ✅ | `npm run meta:list` |
| Create campaign | ✅ | Creates PAUSED |
| Create ad set | ✅ | Needs `targeting_automation.advantage_audience` |
| Upload video | ✅ | `act_.../advideos` |
| Create link/video creative | ✅ | After app is **Published** |
| Create ad | ✅ | After billing is set up |

### Meta API quirks (already fixed in code)

- Ad sets require `targeting_automation: { advantage_audience: 0 }` (2026 API)
- Do **not** use deprecated `facebook_positions: video_feeds`
- Video creatives need `image_url` thumbnail + `video_id`
- All test objects should stay **PAUSED**

### CLI commands

```bash
npm run meta:verify
npm run meta:plan CAMP_HB_Waitlist_001
npm run meta:create-waitlist              # dry run
npm run meta:create-waitlist -- --execute # creates PAUSED campaign + ad set
```

Scripts live in:

- `scripts/meta/meta-client.js` — Graph API v22 client
- `scripts/meta/map-campaigns.js` — `ads/campaigns.json` → Campaign/AdSet/Ads
- `scripts/meta/meta-ads-cli.js` — CLI entrypoint

---

## 7. Go High Level sub-accounts

| Sub-account | Location ID | PIT |
|-------------|-------------|-----|
| IRLXR | `fMUCDP8nnG1uKTHbIl2o` | Agency/integration token (locations scope) |
| Hologram Boxing | `n6PdCClODfl4xSIPmYjr` | Sub-account PIT with Contacts scope |

Website forms POST to `/api/ghl-submit` → creates/updates GHL contacts with tags like `website-booking`, `website-ticket`.

### Vercel env vars (production)

In Vercel project settings, add the same GHL vars as `.env.local`:

- `GHL_PIT_TOKEN`
- `GHL_LOCATION_ID`
- `GHL_EMAIL_FROM`, `GHL_EMAIL_FROM_NAME`, etc.

Deploy:

```bash
npm run deploy:vercel
```

---

## 8. Key config files

| File | Edit when… |
|------|------------|
| `site-config.js` | Kick/Twitch handles, event dates, `metaAdAccountId`, pixel IDs |
| `ads/campaigns.json` | Campaign names, budgets, ad copy, UTMs |
| `ads/launch-hub.html` | Interactive launch checklist for Meta/TikTok |
| `.env.local` | Secrets (gitignored) |
| `~/.cursor/mcp.json` | GHL MCP servers |

---

## 9. Suggested Cursor agent prompts

After setup, try:

```
Verify Meta ads connection with npm run meta:verify
```

```
Show the waitlist campaign plan from ads/campaigns.json
```

```
Create a PAUSED waitlist campaign on Meta (dry run first)
```

```
Create a test contact in Hologram Boxing GHL: name Test, email test@example.com
```

```
Open ads/launch-hub.html and summarize phase 1 launch steps
```

---

## 10. Troubleshooting

| Error | Fix |
|-------|-----|
| `1885183` — app in development mode | Publish app: **Publish → Go live** |
| `1359188` — no payment method | Add card in Ads Manager billing |
| `1870227` — Advantage audience required | Already handled in `meta-client.js` |
| `2490562` — video_feeds deprecated | Already removed from targeting |
| GHL `not authorized for this scope` | Enable **Contacts** on Private Integration |
| GHL MCP timeout | Reload Cursor window; check PIT + locationId |
| Token expired | Regenerate in Graph API Explorer; update `.env.local` |

---

## 11. Security checklist

- [ ] Never commit `.env.local` (already in `.gitignore`)
- [ ] Never paste tokens in Cursor chat or GitHub issues
- [ ] Rotate any token that was shared in chat
- [ ] Use System User tokens for long-running automation
- [ ] Keep test campaigns/ads **PAUSED** until ready to spend

---

## 12. Accounts reference (non-secret)

```
Meta App ID:        1553077533181756
Meta Business ID:   1670207829759082
Meta Ad Account:    act_534185933351087
Meta Page:          118345932178751 (Romethelife)
GHL Hologram Boxing: n6PdCClODfl4xSIPmYjr
GHL IRLXR:          fMUCDP8nnG1uKTHbIl2o
Site URL:           https://creators-ai-hologram-boxing.vercel.app
Support email:      ic4d@irlxr.com
```

---

## 13. Next steps for the team

1. Clone repo + create `.env.local`
2. Add GHL MCP to `~/.cursor/mcp.json` + reload Cursor
3. Confirm Meta app is **Published** + billing on ad account
4. Run `npm run meta:verify`
5. Run `npm run meta:plan` → review waitlist campaign
6. Create first PAUSED campaign when creatives + billing are ready
7. Optional: connect Meta in GHL Ad Manager for UI-based management
8. Optional: add `META_PIXEL_ID` to `site-config.js` for conversion tracking

---

*Last updated: July 2026 — Hologram Boxing / IRLXR stack*
