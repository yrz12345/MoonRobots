$ErrorActionPreference = "Stop"
$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")

if (-not $env:CARGO_BUILD_JOBS) {
  $env:CARGO_BUILD_JOBS = "1"
}

$tauri = Join-Path $PSScriptRoot "..\node_modules\.bin\tauri.cmd"

if (-not (Test-Path -LiteralPath $tauri)) {
  throw "Tauri CLI is not installed. Run 'npm ci' first."
}

& $tauri build --bundles nsis

if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

$targetRoot = if ($env:CARGO_TARGET_DIR) {
  $env:CARGO_TARGET_DIR
} else {
  Join-Path $projectRoot "src-tauri\target"
}

$releaseRoot = Join-Path $targetRoot "release"
$installer = Join-Path $releaseRoot "bundle\nsis\MoonRobots_0.1.0_x64-setup.exe"
$portable = Join-Path $releaseRoot "moonrobots-desktop.exe"
$dist = Join-Path $projectRoot "dist"

New-Item -ItemType Directory -Path $dist -Force | Out-Null
Copy-Item -LiteralPath $installer -Destination (Join-Path $dist "MoonRobots-Setup.exe") -Force
Copy-Item -LiteralPath $portable -Destination (Join-Path $dist "MoonRobots-Portable.exe") -Force

Write-Host "Desktop packages are ready in $dist"
