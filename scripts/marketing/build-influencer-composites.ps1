# Composite influencer talking heads (white plate) over B-roll.
# Builds TWO sets: cinematic COMPOSITE-15s.mp4 (primary) + silent poster COMPOSITE-POSTER-15s.mp4 (add-on A/B).
# Usage: .\scripts\marketing\build-influencer-composites.ps1

$Root = Resolve-Path (Join-Path $PSScriptRoot "../..")
$Out = Join-Path $Root "ads/influencer-recruit/output"

function Build-Composite {
  param(
    [string]$Bg,
    [string]$Fg,
    [string]$OutputName
  )
  $bgPath = Join-Path $Root $Bg
  $fgPath = Join-Path $Root $Fg
  $outPath = Join-Path $Out $OutputName
  if (-not (Test-Path $bgPath)) { Write-Error "Missing BG: $bgPath"; return $false }
  if (-not (Test-Path $fgPath)) { Write-Error "Missing FG: $fgPath"; return $false }

  $bgExt = [System.IO.Path]::GetExtension($bgPath).ToLower()
  $isImage = $bgExt -in @(".png", ".jpg", ".jpeg", ".webp")
  $bgArgs = if ($isImage) { @("-loop", "1", "-i", $bgPath) } else { @("-i", $bgPath) }

  $filter = @"
[0:v]loop=loop=-1:size=32767:start=0,trim=duration=15,setpts=PTS-STARTPTS,scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280[bg];
[1:v]scale=400:-1,format=rgba,colorkey=0xFFFFFF:0.08:0.04[fg];
[bg][fg]overlay=(W-w)/2:H-h-20:shortest=1[outv]
"@
  & ffmpeg -y @bgArgs -i $fgPath -filter_complex $filter `
    -map "[outv]" -map 1:a -c:v libx264 -crf 19 -c:a aac -movflags +faststart $outPath 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) { Write-Error "ffmpeg failed: $OutputName"; return $false }
  Write-Host "OK $OutputName"
  return $true
}

$cinematicJobs = @(
  @{ Bg = "assets/higgsfield-386b5e5c-43c6-44ee-a8f3-ab148fe272ca.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4"; Out = "INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-15s.mp4" },
  @{ Bg = "ads/brief-002/output/WOULD-YOU-WALK-INSIDE-15s-9x16-silent.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-CALLING-ALL-15s-VO.mp4"; Out = "INFLUENCER-CALLING-ALL-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-ar-experience-hero.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4"; Out = "INFLUENCER-JOIN-THE-TEAM-COMPOSITE-15s.mp4" },
  @{ Bg = "ads/output/FUTURE-IS-HERE-15s-9x16-ambient.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-RETARGET-OPEN-CALL-15s-VO.mp4"; Out = "INFLUENCER-L4-RETARGET-OPEN-CALL-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep2-ar-experience.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4"; Out = "INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-ringside-ots.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4"; Out = "INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/higgsfield-892f90b0-5456-4ceb-9589-266f3b418c4d.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-STREAMER-REVIEWS-15s-VO.mp4"; Out = "INFLUENCER-L4-STREAMER-REVIEWS-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-fight-impact.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4"; Out = "INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-ar-experience.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4"; Out = "INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-tent-corner-crowd.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L5-FINAL-SLOTS-CLOSING-15s-VO.mp4"; Out = "INFLUENCER-L5-FINAL-SLOTS-CLOSING-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-ar-wide-tent.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-PARTNER-AD-15s-VO.mp4"; Out = "INFLUENCER-L4-CONFIRMS-PARTNER-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-pov-passthrough.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-REMINDER-AD-15s-VO.mp4"; Out = "INFLUENCER-L4-CONFIRMS-REMINDER-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-blue-silver-v1-faceoff.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4"; Out = "INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-ar-closeup-v2.mp4"; Fg = "ads/output/32-live-interactive-effects-plate.mp4"; Out = "INFLUENCER-L2-LIVEFX-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-ar-ringside.mp4"; Fg = "ugc/output/08-watch-free-on-kick-twitch-plate.mp4"; Out = "INFLUENCER-L2-COSTREAM-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep1-tent-preview.mp4"; Fg = "ugc/output/02-the-inflatable-tent-plate.mp4"; Out = "INFLUENCER-L2-INSIDE-TENT-COMPOSITE-15s.mp4" },
  @{ Bg = "assets/ep3-ar-closeup.mp4"; Fg = "ugc/output/ads-avatar-what-is-hologram-boxing-plate.mp4"; Out = "INFLUENCER-L3-WHATIS-COMPOSITE-15s.mp4" }
)

# Add-on: same talking heads over silent poster videos (PNG → 15s -an). Does not replace cinematic set.
$posterJobs = @(
  @{ Bg = "ads/influencer-recruit/output/OPEN-CALL-EXACT-POSTER-15s.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-OPEN-CALL-EXACT-15s-VO.mp4"; Out = "INFLUENCER-OPEN-CALL-EXACT-COMPOSITE-POSTER-15s.mp4" },
  @{ Bg = "ads/influencer-recruit/output/TIKTOK-CALLING-ALL-INFLUENCERS-15s.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-CALLING-ALL-15s-VO.mp4"; Out = "INFLUENCER-CALLING-ALL-COMPOSITE-POSTER-15s.mp4" },
  @{ Bg = "ads/influencer-recruit/output/TIKTOK-OPEN-CALL-OPTIMIZED-15s.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-JOIN-THE-TEAM-15s-VO.mp4"; Out = "INFLUENCER-JOIN-THE-TEAM-COMPOSITE-POSTER-15s.mp4" },
  @{ Bg = "ads/influencer-recruit/output/PARTNER-SPOTLIGHT-15s.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-PARTNER-REVIEWS-15s-VO.mp4"; Out = "INFLUENCER-L4-PARTNER-REVIEWS-COMPOSITE-POSTER-15s.mp4" },
  @{ Bg = "ads/influencer-recruit/output/CREATOR-REMINDER-15s.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-REMINDER-SLOTS-15s-VO.mp4"; Out = "INFLUENCER-L4-REMINDER-SLOTS-COMPOSITE-POSTER-15s.mp4" },
  @{ Bg = "ads/influencer-recruit/output/COUNTDOWN-TIMER-15s.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L5-COUNTDOWN-TIMER-15s-VO.mp4"; Out = "INFLUENCER-L5-COUNTDOWN-TIMER-COMPOSITE-POSTER-15s.mp4" },
  @{ Bg = "ads/influencer-recruit/output/STREAMER-LAST-CALL-15s.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L5-LAST-CALL-STREAMERS-15s-VO.mp4"; Out = "INFLUENCER-L5-LAST-CALL-STREAMERS-COMPOSITE-POSTER-15s.mp4" },
  @{ Bg = "ads/influencer-recruit/output/OPEN-CALL-EXACT-POSTER-15s.mp4"; Fg = "ads/influencer-recruit/output/INFLUENCER-L4-CONFIRMS-OPEN-CALL-AD-15s-VO.mp4"; Out = "INFLUENCER-L4-CONFIRMS-OPEN-CALL-COMPOSITE-POSTER-15s.mp4" }
)

$jobs = $cinematicJobs + $posterJobs

$ok = 0
foreach ($j in $jobs) {
  if (Build-Composite -Bg $j.Bg -Fg $j.Fg -OutputName $j.Out) { $ok++ }
}
Write-Host "Done: $ok / $($jobs.Count) composites"
