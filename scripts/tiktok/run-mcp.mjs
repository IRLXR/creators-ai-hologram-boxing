#!/usr/bin/env node
/**
 * Starts @cesteral/tiktok-mcp in stdio mode for Cursor.
 * Loads Marketing API credentials from .env.local when present.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const envLocal = path.join(root, ".env.local");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(envLocal);

// MCP package expects TIKTOK_ACCESS_TOKEN — map from Marketing API var if set.
if (!process.env.TIKTOK_ACCESS_TOKEN && process.env.TIKTOK_MARKETING_ACCESS_TOKEN) {
  process.env.TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_MARKETING_ACCESS_TOKEN;
}

const entry = path.join(root, "node_modules", "@cesteral", "tiktok-mcp", "dist", "index.js");
if (!fs.existsSync(entry)) {
  console.error("Missing @cesteral/tiktok-mcp. Run: npm install");
  process.exit(1);
}

const child = spawn(process.execPath, [entry], {
  stdio: "inherit",
  env: process.env,
  cwd: root,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
