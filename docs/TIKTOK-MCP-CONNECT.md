# How to connect to TikTok for Business MCP Server

Official guide: [How to connect v1.3](https://business-api.tiktok.com/portal/docs/how-to-connect-to-tiktok-for-business-mcp-server/v1.3)

Connecting gives your AI agent direct access to the TikTok Ads platform via standardized MCP tool calls.

---

## Before you start

- **TikTok for Business account** — required to authorize the MCP server. [Create one](https://ads.tiktok.com) if needed.
- **MCP-compatible agent** — Cursor supports HTTP MCP servers.
- **Advertiser ID (this project):** `7658020511833014273` (AI Hologram Boxing)

---

## Choose your server URL

| Server type | URL | When to use |
|-------------|-----|-------------|
| **Full Disclosure** | `https://business-api.tiktok.com/open_mcp/tt-ads-mcp-flat` | ~400 tools load at connection. Large context window only. |
| **Progressive Disclosure** *(recommended for Cursor)* | `https://business-api.tiktok.com/open_mcp/tt-ads-mcp-layer` | ~40 core tools initially; more discoverable on demand. Token-conscious setups. |

Use **`open_mcp`** (not `open_api`). No trailing slash.

---

## Step 1: Configure in Cursor

Add to `~/.cursor/mcp.json` under `mcpServers`:

```json
"tiktok-for-business": {
  "url": "https://business-api.tiktok.com/open_mcp/tt-ads-mcp-layer",
  "type": "http"
}
```

- **`tiktok-for-business`** — local alias (official docs use `tiktok-ads`; either name works).
- **`type": "http"`** — required for Cursor HTTP MCP transport.
- **Do not** add an `auth` block or App ID / App Secret — OAuth via Ads Manager handles authorization.

Template: `mcp.tiktok.example.json`

Reload Cursor after saving.

---

## Step 2: Authorize the connection

1. **Settings → Tools & MCP → tiktok-for-business → Connect**
2. Sign in to **TikTok Ads Manager** if prompted.
3. Review permissions → **Authorize**.

Authorization lasts **30 days**; reauthorize with the same TikTok for Business account when it expires.

### Windows: App ID / App Secret loop

If TikTok shows **MCP Authorization — App ID / App Secret** instead of Ads Manager login:

1. Try install from [Agentic Hub](https://ads.tiktok.com/apps_and_agents/agentic-hub) (deeplink flow).
2. Log out of TikTok in browser → reload Cursor → Connect once (don’t cancel OAuth).
3. Fallback: create campaigns manually via [Ads Manager](https://ads.tiktok.com) and `ads/tiktok-day1.html`.

You do **not** need a separate Marketing API developer app for MCP OAuth under normal flow.

---

## Step 3: Interact with your agent

Example prompts:

- *"Create a new Upgraded Smart+ Campaign for my latest product."*
- *"Show me the performance report for all active campaigns this week."*
- *"List my TikTok ad accounts and confirm advertiser 7658020508377825297."*
- *"Build Day 1 campaign CAMP_HB_WalkInside_001 at $15/day using ads/tiktok-day1.html."*

---

## Get support

- [TikTok for Business MCP support ticket](https://business-api.tiktok.com/portal/docs/how-to-connect-to-tiktok-for-business-mcp-server/v1.3) (see **Get support** on the doc page)
- Email: tiktok-ads-mcp-agentic-hub@tiktok.com
- [Agentic Hub](https://ads.tiktok.com/apps_and_agents/agentic-hub)
- [Ads Manager](https://ads.tiktok.com)
