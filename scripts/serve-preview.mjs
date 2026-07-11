#!/usr/bin/env node
/** Static file server for local ad preview (Windows-friendly). */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PREVIEW_PORT || 8765);
const PREVIEW =
  "/ads/influencer-recruit/INFLUENCER-42-ADS-PREVIEW.html";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = PREVIEW;
  const filePath = path.normalize(path.join(ROOT, urlPath.replace(/^\//, "")));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end(`Not found: ${urlPath}`);
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, "127.0.0.1", () => {
  const url = `http://127.0.0.1:${PORT}${PREVIEW}`;
  console.log(`\nInfluencer ads preview:\n  ${url}\n`);
  console.log("Press Ctrl+C to stop.\n");
  const openBrowser = process.argv.includes("--open") || process.env.OPEN_BROWSER === "1";
  if (openBrowser) {
    import("node:child_process").then(({ exec }) => {
      exec(`start "" "${url}"`, { shell: true });
    });
  }
});
