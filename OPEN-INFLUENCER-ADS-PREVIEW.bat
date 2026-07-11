@echo off
cd /d "%~dp0"
echo Starting influencer ads preview server...
echo.
node scripts/serve-preview.mjs --open
