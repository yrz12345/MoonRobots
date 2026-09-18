$ErrorActionPreference = "Stop"

if (-not $env:CARGO_BUILD_JOBS) {
  $env:CARGO_BUILD_JOBS = "1"
}

$tauri = Join-Path $PSScriptRoot "..\node_modules\.bin\tauri.cmd"

if (-not (Test-Path -LiteralPath $tauri)) {
  throw "Tauri CLI is not installed. Run 'npm ci' first."
}

& $tauri build --bundles nsis
exit $LASTEXITCODE
