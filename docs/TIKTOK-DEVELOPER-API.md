# TikTok Developer API (Marketing API) — Connect

Use this when you need **programmatic ads access** (tokens, verify script, community MCP) — separate from the **official MCP OAuth** path in `docs/TIKTOK-MCP-CONNECT.md`.

Portal: [TikTok API for Business](https://business-api.tiktok.com/portal/auth)

---

## Two TikTok tokens (don’t mix them)

| Variable | Purpose |
|----------|---------|
| `TIKTOK_ACCESS_TOKEN` | **Events API** — pixel / server conversions only |
| `TIKTOK_MARKETING_ACCESS_TOKEN` | **Marketing API** — ads, campaigns, MCP community server |

Your `.env.local` Events token **cannot** call Marketing API endpoints.

---

## Step 1 — Create a developer app

1. Sign in: [business-api.tiktok.com/portal/auth](https://business-api.tiktok.com/portal/auth)
2. **My Apps** → **Create an app** → **Marketing API**
3. Enable scopes: **Ads Management**, **Reporting** (and any others you need)
4. **Advertiser redirect URL** — add one you control, e.g.:
   - `http://localhost:8080/callback`
   - or `https://www.hologramboxing.com/callback`
5. Wait for app **Approved** if TikTok requires review

Copy from the app dashboard:

- **App ID** — numeric only
- **App Secret**

---

## Step 2 — Add to `.env.local`

```env
# TikTok Developer / Marketing API (ads automation)
TIKTOK_APP_ID=7123456789012345678
TIKTOK_APP_SECRET=your-app-secret
TIKTOK_REDIRECT_URI=http://localhost:8080/callback

# Filled after OAuth (Step 3)
TIKTOK_MARKETING_ACCESS_TOKEN=
TIKTOK_ADVERTISER_ID=
```

Keep **Events API** vars separate:

```env
TIKTOK_PIXEL_ID=D94N53BC77UFCF7AK7E0
TIKTOK_ACCESS_TOKEN=your-events-api-token
```

---

## Step 3 — OAuth (get Marketing access token)

```bash
npm run tiktok:oauth -- url
```

1. Open the printed URL → sign in with TikTok for Business
2. Approve your advertiser account
3. Copy `auth_code` from the redirect URL
4. Exchange:

```bash
npm run tiktok:oauth -- exchange YOUR_AUTH_CODE
```

5. Paste the printed lines into `.env.local`

---

## Step 4 — Verify

```bash
npm run tiktok:verify
```

Should list advertiser accounts and campaigns.

---

## Use with Cursor

### Option A — Official MCP (App ID on auth screen)

If Cursor shows **App ID / App Secret** for `tiktok-for-business`:

- **App ID** = numeric ID from Step 1
- **App Secret** = from Step 1  
- Click **Next** → approve advertiser access

No `auth` block needed unless Cursor keeps asking every time.

### Option B — Community MCP (token-based)

Add to `~/.cursor/mcp.json` after Step 4 succeeds:

```json
"tiktok-ads-api": {
  "command": "node",
  "args": ["scripts/tiktok/run-mcp.mjs"],
  "cwd": "C:/Users/suzet/Desktop/creators-ai-hologram-boxing"
}
```

Reload Cursor. Uses `@cesteral/tiktok-mcp` + `.env.local` tokens.

---

## Links

- [Developer Portal](https://business-api.tiktok.com/portal/auth)
- [Marketing API docs](https://business-api.tiktok.com/portal/docs)
- [Official MCP connect guide](https://business-api.tiktok.com/portal/docs/how-to-connect-to-tiktok-for-business-mcp-server/v1.3)
- [Ads Manager](https://ads.tiktok.com)
