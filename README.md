# Creators AI Hologram Boxing Website

A Brand Risk Promotions-style website for the **Creators AI Hologram Boxing Event** — built with your flyer's branding (neon blue, gold, black cyberpunk theme).

## Quick Start

Open `index.html` in your browser, or run a local server:

```bash
npm start
# or: python -m http.server 8080
```

Then visit `http://localhost:8080`

## Customize (one file)

Edit **`site-config.js`** — no code changes needed. Every page loads this automatically:

```js
window.SITE_CONFIG = {
  tiktokHandle: "your_tiktok_handle",
  tiktokUrl: "https://www.tiktok.com/@your_tiktok_handle",
  email: "ic4d@irlxr.com",
  siteName: "Creators AI Hologram Boxing",
  tagline: "Step in. Gear up. Get in the ring."
};
```

All TikTok links, handles, and email buttons update automatically across every page.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage — hero, events, fighters, watch, TikTok, news, booking |
| `events.html` | Full event archive |
| `fighters.html` | Fighter profiles |
| `watch.html` | Episode player & highlights |
| `news.html` | News & announcements |
| `book.html` | Booking form, apply to fight, partnerships |
| `blog/introducing-website.html` | Launch announcement |

## Assets

| File | Purpose |
|------|---------|
| `assets/logo.svg` | Nav logo + favicon (hologram boxer wireframe) |
| `assets/og-image.svg` | Social share preview image |

## Deploy Live (Free)

### Option A — Netlify (easiest, drag & drop)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `creators-ai-hologram-boxing` folder onto the page
3. Your site goes live instantly with a `.netlify.app` URL

Or connect via CLI:

```bash
npx netlify-cli deploy --prod --dir=.
```

### Option B — Vercel

```bash
npx vercel --prod
```

Follow the login prompts on first run.

### Option C — GitHub Pages

1. Push this folder to a GitHub repo
2. Go to **Settings → Pages → Deploy from branch**
3. Select `main` branch, root folder
4. Save — site live at `https://yourusername.github.io/repo-name/`

## Features

- Responsive design (mobile + desktop)
- Brand Risk-style layout with hologram boxing branding
- Centralized config via `site-config.json`
- SVG logo + OG social image
- Working navigation, booking form, episode player
- Cookie consent banner
- Ready for Netlify & Vercel deployment
