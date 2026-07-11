# Builds FINAL-FOR-RUNNING-ADS - approved finals only (no master frames / test plates).
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$dest = Join-Path $env:USERPROFILE "Desktop\FINAL-FOR-RUNNING-ADS"

$dirs = @(
  "$dest\videos\01-hero-cinematic",
  "$dest\videos\02-documentary",
  "$dest\videos\05-memory-brief-004",
  "$dest\videos\03-ugc-paid-social",
  "$dest\videos\06-tiktok-ugc-variants",
  "$dest\videos\04-platform-ready-tiktok-instagram",
  "$dest\photos\social-posters-collection-001",
  "$dest\photos\social-posters-collection-002"
)
foreach ($d in $dirs) { New-Item -ItemType Directory -Force -Path $d | Out-Null }

function Copy-IfExists($src, $dst) {
  if (-not $src) { Write-Warning "Missing source path for: $dst"; return $null }
  if (-not (Test-Path $src)) { Write-Warning "Missing: $src"; return $null }
  Copy-Item -LiteralPath $src -Destination $dst -Force
  return (Get-Item $dst)
}

$manifest = @{
  folder = $dest
  created = (Get-Date -Format "yyyy-MM-dd HH:mm")
  landing_url = "https://www.hologramboxing.com/landing.html"
  note = "Approved final exports only. No master frames, seedance segments, or test keyframes."
  verify = "Open CHECKLIST.md - every INCLUDED row must exist on disk. Re-run: npm run build:final-ads"
  files = @()
}
$checklist = @()

function Add-File($category, $label, $src, $dstName) {
  $dst = Join-Path $dest $dstName
  $item = Copy-IfExists $src $dst
  if ($item) {
    $manifest.files += [ordered]@{
      category = $category
      label = $label
      name = $item.Name
      path = $dstName.Replace("\", "/")
      source = $src.Replace("\", "/")
      bytes = $item.Length
    }
    $script:checklist += [ordered]@{
      status = "INCLUDED"
      category = $category
      label = $label
      package_file = $dstName.Replace("\", "/")
      source_file = $src.Replace("\", "/")
    }
  } else {
    $script:checklist += [ordered]@{
      status = "MISSING SOURCE"
      category = $category
      label = $label
      package_file = $dstName.Replace("\", "/")
      source_file = if ($src) { $src.Replace("\", "/") } else { "" }
    }
  }
}

function Add-Excluded($category, $label, $src, $reason) {
  $script:checklist += [ordered]@{
    status = "EXCLUDED"
    category = $category
    label = $label
    package_file = "-"
    source_file = $src.Replace("\", "/")
    reason = $reason
  }
}

# Hero cinematic
Add-File "hero" "Would You Walk Inside (15s VO)" "$root\ads\brief-002\output\WOULD-YOU-WALK-INSIDE-15s-9x16-VO.mp4" "videos\01-hero-cinematic\01-Walk-Inside-15s-VO.mp4"
Add-File "hero" "The Future Is Here - Version A with VO" "$root\ads\brief-001\output\Director_Brief_001_Version_A_With_VoiceOver.mp4" "videos\01-hero-cinematic\02-Future-Is-Here-Version-A-VO.mp4"
Add-File "hero" "The Future Is Here - Version B cinematic mystery" "$root\ads\brief-001\output\Director_Brief_001_Version_B_Cinematic_Mystery.mp4" "videos\01-hero-cinematic\03-Future-Is-Here-Version-B-Mystery.mp4"

# Documentary
$evoDesktop = Join-Path $env:USERPROFILE "Desktop\Evolution of the Fight - WATCH THIS.mp4"
$evoRepoVo = "$root\ads\brief-003\output\EVOLUTION-60s-9x16-VO.mp4"
if (Test-Path $evoDesktop) {
  Add-File "documentary" "Evolution of the Fight (HQ documentary - recommended)" $evoDesktop "videos\02-documentary\Evolution-of-the-Fight-Documentary-HQ.mp4"
} elseif (Test-Path $evoRepoVo) {
  Add-File "documentary" "Evolution of the Fight (60s VO montage)" $evoRepoVo "videos\02-documentary\Evolution-of-the-Fight-60s-VO.mp4"
}
Add-Excluded "documentary" "Evolution montage silent" "$root\ads\brief-003\output\EVOLUTION-60s-9x16-silent.mp4" "Alternate cut - HQ desktop version used instead when available"
Add-Excluded "documentary" "Evolution montage ambient" "$root\ads\brief-003\output\EVOLUTION-60s-9x16-ambient.mp4" "Alternate cut - HQ desktop version used instead when available"

# Brief 004 Memory
foreach ($m in @(
  @{ label = "Memory - 60s with VO (primary)"; file = "MEMORY-60s-16x9-VO.mp4"; out = "01-Memory-60s-VO.mp4" },
  @{ label = "Memory - 60s silent"; file = "MEMORY-60s-16x9-silent.mp4"; out = "02-Memory-60s-Silent.mp4" },
  @{ label = "Memory - 60s ambient"; file = "MEMORY-60s-16x9-ambient.mp4"; out = "03-Memory-60s-Ambient.mp4" }
)) {
  Add-File "memory" $m.label "$root\ads\brief-004\output\$($m.file)" "videos\05-memory-brief-004\$($m.out)"
}
Add-Excluded "memory" "Memory segment clip (child turns back)" "$root\ads\brief-004\output\13-child-turns-back-seedance.mp4" "Raw Seedance segment - not a finished ad"

# UGC paid social
$ugcMap = @(
  @{ label = "What Is Hologram Boxing / Waitlist"; file = "ads-avatar-what-is-hologram-boxing-plate.mp4"; out = "04-What-Is-Hologram-Boxing-Waitlist.mp4" },
  @{ label = "Inside the Inflatable Tent"; file = "02-the-inflatable-tent-plate.mp4"; out = "05-Inside-The-Tent.mp4" },
  @{ label = "Hologram Boxing Is Here (brand hero)"; file = "11-home-hero-brand-plate.mp4"; out = "06-Brand-Hero-Is-Here.mp4" },
  @{ label = "All Ages Welcome"; file = "10-all-ages-family-night-plate.mp4"; out = "07-All-Ages-Welcome.mp4" },
  @{ label = "Meet the Wave Roster"; file = "03-meet-the-wave-fighters-plate.mp4"; out = "08-Meet-The-Wave-Roster.mp4" },
  @{ label = "How It Works (4 steps)"; file = "13-how-it-works-four-steps-plate.mp4"; out = "09-How-It-Works.mp4" },
  @{ label = "AR Headset Experience"; file = "04-ar-headset-experience-plate.mp4"; out = "10-AR-Headset-Experience.mp4" },
  @{ label = "Watch Free on Kick and Twitch"; file = "08-watch-free-on-kick-twitch-plate.mp4"; out = "11-Watch-Free-Kick-Twitch.mp4" },
  @{ label = "Book the Tent for Your Party"; file = "09-book-the-tent-for-your-party-plate.mp4"; out = "18-Book-Tent-For-Party.mp4" },
  @{ label = "Follow on Kick and Twitch (social feed)"; file = "12-social-kick-twitch-feed-plate.mp4"; out = "19-Follow-Kick-Twitch-Feed.mp4" },
  @{ label = "Live Interactive Stream Effects"; file = "32-live-interactive-effects-plate.mp4"; out = "12-Live-Interactive-Effects.mp4"; ugc = $false },
  @{ label = "Hologram Boxing 001 Archive"; file = "14-event-archive-hb001-plate.mp4"; out = "13-HB001-Archive.mp4" },
  @{ label = "Hologram Boxing 002 - Book Now"; file = "15-hologram-boxing-002-plate.mp4"; out = "14-HB002-Book-Now.mp4" },
  @{ label = "Book with Me vs Me Crypto"; file = "05-tickets-and-mvm-crypto-plate.mp4"; out = "15-Book-MVM-Crypto.mp4" },
  @{ label = "10K Prize Pool"; file = "06-pick-your-fighter-win-prizes-plate.mp4"; out = "16-Prize-Pool-10K.mp4" },
  @{ label = "Choose Your POV"; file = "07-headset-pov-vs-attendee-pov-plate.mp4"; out = "17-Choose-Your-POV.mp4" }
)
foreach ($u in $ugcMap) {
  $base = if ($u.ugc -eq $false) { "$root\ads\output" } else { "$root\ugc\output" }
  Add-File "ugc" $u.label "$base\$($u.file)" "videos\03-ugc-paid-social\$($u.out)"
}

# TikTok UGC variants
foreach ($t in @(
  @{ label = "TikTok - What Is Hologram Boxing (15s plate)"; file = "TIKTOK-what-is-hologram-boxing-plate.mp4"; out = "TIKTOK-What-Is-Hologram-Boxing.mp4" },
  @{ label = "TikTok - Hoodie What Is Hologram Boxing"; file = "TIKTOK-hoodie-what-is-hologram-boxing-plate.mp4"; out = "TIKTOK-Hoodie-What-Is-Hologram-Boxing.mp4" }
)) {
  Add-File "tiktok-ugc" $t.label "$root\ugc\output\$($t.file)" "videos\06-tiktok-ugc-variants\$($t.out)"
}

Add-Excluded "ugc" "What Is Hologram Boxing (older plate)" "$root\ugc\output\01-what-is-hologram-boxing-plate.mp4" "Superseded by ads-avatar-what-is-hologram-boxing-plate.mp4 (Skye voice pass)"
Add-Excluded "ugc" "What Is Hologram Boxing (full concat)" "$root\ugc\output\01-what-is-hologram-boxing-plate-full.mp4" "Longer concat draft - ads-avatar plate is the approved final"
Add-Excluded "ugc" "Live Interactive Effects (voice test variants)" "$root\ugc\output\32-live-interactive-effects-vo-dej1-voicechange.mp4" "Voice-change test - approved final is ads/output/32-live-interactive-effects-plate.mp4"
Add-Excluded "ugc" "UGC scripts 16-31 (pending generation)" "$root\ugc\output\batch-manifest.json" "Not yet generated - see ugc/output/batch-manifest.json pending list"

# Platform exports
foreach ($p in @(
  @{ label = "TikTok - Walk Inside"; src = "$root\ads\brief-002\output\TIKTOK-WOULD-YOU-WALK-INSIDE.mp4"; out = "TIKTOK-Walk-Inside-15s.mp4" },
  @{ label = "Instagram Reel - Walk Inside"; src = "$root\ads\brief-002\output\INSTAGRAM-REEL-WOULD-YOU-WALK-INSIDE.mp4"; out = "INSTAGRAM-Walk-Inside-15s.mp4" },
  @{ label = "Facebook Reel - Walk Inside"; src = "$root\ads\brief-002\output\FACEBOOK-REEL-WOULD-YOU-WALK-INSIDE.mp4"; out = "FACEBOOK-Walk-Inside-15s.mp4" },
  @{ label = "YouTube Shorts - Walk Inside"; src = "$root\ads\brief-002\output\YOUTUBE-SHORTS-WOULD-YOU-WALK-INSIDE.mp4"; out = "YOUTUBE-Walk-Inside-15s.mp4" },
  @{ label = "TikTok - Future Is Here"; src = "$env:USERPROFILE\Desktop\TIKTOK-FUTURE-IS-HERE.mp4"; out = "TIKTOK-Future-Is-Here-15s.mp4" },
  @{ label = "Instagram Reel - Future Is Here"; src = "$env:USERPROFILE\Desktop\INSTAGRAM-REEL-FUTURE-IS-HERE.mp4"; out = "INSTAGRAM-Future-Is-Here-15s.mp4" }
)) {
  Add-File "platform" $p.label $p.src "videos\04-platform-ready-tiktok-instagram\$($p.out)"
}

# Social posters
for ($i = 1; $i -le 7; $i++) {
  $num = "{0:D3}" -f $i
  $match = Get-ChildItem "$root\assets\social-collection-001" -Filter "POST-$num-*-1080x1350.png" -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($match) { Add-File "poster" "Social Collection 001 POST-$num" $match.FullName "photos\social-posters-collection-001\$($match.Name)" }
}
for ($i = 8; $i -le 14; $i++) {
  $num = "{0:D3}" -f $i
  $match = Get-ChildItem "$root\assets\social-collection-002" -Filter "POST-$num-*-1080x1350.png" -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($match) { Add-File "poster" "Social Collection 002 POST-$num" $match.FullName "photos\social-posters-collection-002\$($match.Name)" }
}

# CHECKLIST.md
$included = @($checklist | Where-Object { $_.status -eq "INCLUDED" })
$excluded = @($checklist | Where-Object { $_.status -eq "EXCLUDED" })
$missing = @($checklist | Where-Object { $_.status -eq "MISSING SOURCE" })
$builtAt = Get-Date -Format "yyyy-MM-dd HH:mm"

$checklistMd = @(
  "# Final Ads Package - Verification Checklist",
  "",
  "**Built:** $builtAt",
  "**Folder:** $dest",
  "**Total included:** $($included.Count) files",
  "",
  "## How to verify nothing is missing",
  "",
  "1. Every INCLUDED row below must exist in the package folder.",
  "2. MANIFEST.json lists source path and copy path for each file.",
  "3. Re-run from the project: npm run build:final-ads",
  "4. Compare file sizes: manifest bytes must match the copied file on disk.",
  "",
  "## Included ($($included.Count))",
  "",
  "| Category | Label | Package file | Source |",
  "|----------|-------|--------------|--------|"
)
foreach ($row in $included) {
  $checklistMd += "| $($row.category) | $($row.label) | $($row.package_file) | $($row.source_file) |"
}
$checklistMd += ""
$checklistMd += "## Excluded on purpose ($($excluded.Count))"
$checklistMd += ""
$checklistMd += "| Category | Label | Source | Reason |"
$checklistMd += "|----------|-------|--------|--------|"
foreach ($row in $excluded) {
  $checklistMd += "| $($row.category) | $($row.label) | $($row.source_file) | $($row.reason) |"
}
if ($missing.Count -gt 0) {
  $checklistMd += ""
  $checklistMd += "## Missing source - fix before upload ($($missing.Count))"
  $checklistMd += ""
  $checklistMd += "| Category | Label | Expected package file | Missing source |"
  $checklistMd += "|----------|-------|----------------------|----------------|"
  foreach ($row in $missing) {
    $checklistMd += "| $($row.category) | $($row.label) | $($row.package_file) | $($row.source_file) |"
  }
}

Set-Content -Path "$dest\CHECKLIST.md" -Value ($checklistMd -join [Environment]::NewLine) -Encoding UTF8
$manifest | ConvertTo-Json -Depth 6 | Set-Content -Path "$dest\MANIFEST.json" -Encoding UTF8

$readmeLines = @(
  "# FINAL FOR RUNNING ADS - Creators AI Hologram Boxing",
  "",
  "**Created:** $(Get-Date -Format 'yyyy-MM-dd')",
  "**Landing page:** https://www.hologramboxing.com/landing.html",
  "",
  "Approved final exports only. Open CHECKLIST.md to verify every file.",
  "Re-build anytime: npm run build:final-ads",
  "",
  "## Folders",
  "- videos/01-hero-cinematic - 3 hero ads",
  "- videos/02-documentary - Evolution documentary",
  "- videos/05-memory-brief-004 - Memory 60s (VO, silent, ambient)",
  "- videos/03-ugc-paid-social - 16 UGC plates",
  "- videos/06-tiktok-ugc-variants - TikTok UGC plates",
  "- videos/04-platform-ready-tiktok-instagram - platform exports",
  "- photos/social-posters-collection-001 - POST 001-007",
  "- photos/social-posters-collection-002 - POST 008-014",
  "",
  "See MANIFEST.json for sizes and source paths.",
  "Ad copy: ads/launch-hub.html in the project repo."
)
Set-Content -Path "$dest\START-HERE.md" -Value ($readmeLines -join [Environment]::NewLine) -Encoding UTF8

$zip = Join-Path $env:USERPROFILE "Desktop\FINAL-FOR-RUNNING-ADS.zip"
if (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path $dest -DestinationPath $zip -CompressionLevel Optimal

Write-Output "Built: $dest"
Write-Output "Zip:   $zip"
Write-Output "Files: $($manifest.files.Count) included"
Write-Output "Check: $dest\CHECKLIST.md"
