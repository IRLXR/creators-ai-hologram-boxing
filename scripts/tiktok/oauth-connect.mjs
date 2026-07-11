#!/usr/bin/env node
/**
 * TikTok Marketing API (Developer Portal) OAuth helper.
 *
 * Usage:
 *   node --env-file=.env.local scripts/tiktok/oauth-connect.mjs url
 *   node --env-file=.env.local scripts/tiktok/oauth-connect.mjs exchange AUTH_CODE
 *
 * Requires in .env.local:
 *   TIKTOK_APP_ID, TIKTOK_APP_SECRET, TIKTOK_REDIRECT_URI
 */
const API = "https://business-api.tiktok.com/open_api/v1.3";

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return value;
}

function authUrl() {
  const appId = requireEnv("TIKTOK_APP_ID");
  const redirectUri = requireEnv("TIKTOK_REDIRECT_URI");
  const state = "hologram_boxing_oauth";

  const url = new URL("https://business-api.tiktok.com/portal/auth");
  url.searchParams.set("app_id", appId);
  url.searchParams.set("state", state);
  url.searchParams.set("redirect_uri", redirectUri);

  console.log("Open this URL in your browser, sign in, approve your ad account:\n");
  console.log(url.toString());
  console.log("\nAfter redirect, copy the auth_code from the callback URL.");
  console.log("Then run:");
  console.log("  npm run tiktok:oauth -- exchange YOUR_AUTH_CODE");
}

async function exchange(authCode) {
  const appId = requireEnv("TIKTOK_APP_ID");
  const secret = requireEnv("TIKTOK_APP_SECRET");

  const res = await fetch(`${API}/oauth2/access_token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      app_id: appId,
      secret,
      auth_code: authCode,
      grant_type: "authorization_code",
    }),
  });

  const data = await res.json();
  if (!res.ok || data.code !== 0) {
    throw new Error(data.message || data.msg || res.statusText);
  }

  const accessToken = data.data?.access_token;
  const advertisers = data.data?.advertiser_ids || [];

  console.log("\nSuccess. Add these to .env.local:\n");
  console.log(`TIKTOK_MARKETING_ACCESS_TOKEN=${accessToken}`);
  if (advertisers.length) {
    console.log(`TIKTOK_ADVERTISER_ID=${advertisers[0]}`);
    if (advertisers.length > 1) {
      console.log(`# Other advertiser IDs: ${advertisers.slice(1).join(", ")}`);
    }
  } else {
    console.log("# TIKTOK_ADVERTISER_ID=  (set from Ads Manager if not returned)");
  }
  console.log("\nThen run: npm run tiktok:verify");
}

const [cmd, arg] = process.argv.slice(2);

if (cmd === "url") {
  authUrl();
} else if (cmd === "exchange" && arg) {
  exchange(arg).catch((err) => {
    console.error("\nFAILED:", err.message);
    process.exit(1);
  });
} else {
  console.log(`TikTok Developer API OAuth helper

Commands:
  npm run tiktok:oauth -- url
  npm run tiktok:oauth -- exchange AUTH_CODE

Setup: docs/TIKTOK-DEVELOPER-API.md`);
}
