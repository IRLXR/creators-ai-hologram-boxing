# Upload Blocker #2 poster PNGs to Higgsfield presigned URLs
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $PSScriptRoot "output"
$inp = Join-Path $PSScriptRoot "input"

$uploads = @(
  @{
    id = "9bf6a848-b5cb-43e0-a971-f2fbc8f6b3b6"
    file = Join-Path $out "CALLING-ALL-INFLUENCERS-9x16.png"
    url = $env:HF_UPLOAD_CALLING
  },
  @{
    id = "c9724afa-b07f-4035-8055-95533b26133d"
    file = Join-Path $out "OPEN-CALL-OPTIMIZED-TIKTOK-9x16.png"
    url = $env:HF_UPLOAD_OPEN_OPT
  },
  @{
    id = "bd06e90f-dca6-4af5-b419-bee1e3364541"
    file = Join-Path $out "CREATOR-REMINDER-9x16.png"
    url = $env:HF_UPLOAD_REMINDER
  },
  @{
    id = "ac493317-03b8-409d-a494-297a27d896ae"
    file = Join-Path $out "STREAMER-LAST-CALL-9x16.png"
    url = $env:HF_UPLOAD_LAST_CALL
  },
  @{
    id = "45644177-04c8-4cfd-95df-5b7e49ce5316"
    file = Join-Path $inp "hf_20260624_011044_6d239fc7-3b85-49ba-a813-6a42ad758976.png"
    url = $env:HF_UPLOAD_OPEN_EXACT
  }
)

foreach ($u in $uploads) {
  if (-not $u.url) { throw "Missing URL env for $($u.id)" }
  if (-not (Test-Path $u.file)) { throw "Missing file: $($u.file)" }
  $bytes = [System.IO.File]::ReadAllBytes($u.file)
  Invoke-RestMethod -Uri $u.url -Method Put -ContentType "image/png" -Body $bytes | Out-Null
  Write-Host "Uploaded $($u.id) <- $(Split-Path $u.file -Leaf)"
}

Write-Host "All 5 posters uploaded."
