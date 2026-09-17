$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$generated = Join-Path $projectRoot "_build\js\release\build\web_api\web_api.js"
$destination = Join-Path $projectRoot "web\assets\moonrobots.js"

Push-Location $projectRoot
try {
  moon build src/web_api --target js --release
  Copy-Item -LiteralPath $generated -Destination $destination -Force
  Write-Host "Web runtime updated: $destination"
} finally {
  Pop-Location
}
