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
$installerFolderName = -join @([char]0x5B89, [char]0x88C5, [char]0x5305)
$installerDir = Join-Path $projectRoot $installerFolderName

New-Item -ItemType Directory -Path $installerDir -Force | Out-Null
Copy-Item -LiteralPath $installer -Destination (Join-Path $installerDir "MoonRobots-Setup.exe") -Force
Copy-Item -LiteralPath $portable -Destination (Join-Path $projectRoot "MoonRobots.exe") -Force

Write-Host "MoonRobots.exe is ready in $projectRoot"
Write-Host "The installer is ready in $installerDir"
