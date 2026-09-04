param(
  [string]$OutputRoot = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$AppRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$Package = Get-Content -Raw -LiteralPath (Join-Path $AppRoot "package.json") | ConvertFrom-Json
$Version = [string]$Package.version
$ResolvedOutputRoot = if ([string]::IsNullOrWhiteSpace($OutputRoot)) {
  Join-Path $AppRoot "outputs\release"
} else {
  [IO.Path]::GetFullPath($OutputRoot)
}
$ReleaseName = "CrossRepositoryCodeIntelligence-$Version-final"
$StagingRoot = Join-Path $ResolvedOutputRoot $ReleaseName
$ZipPath = Join-Path $ResolvedOutputRoot "$ReleaseName.zip"

function Assert-ChildPath([string]$Candidate, [string]$Parent) {
  $candidateFull = [IO.Path]::GetFullPath($Candidate)
  $parentFull = [IO.Path]::GetFullPath($Parent).TrimEnd('\') + '\'
  if (-not $candidateFull.StartsWith($parentFull, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Release target escaped the output directory: $candidateFull"
  }
}

function Get-Sha256Hex([string]$Path) {
  $stream = [IO.File]::OpenRead($Path)
  $algorithm = [Security.Cryptography.SHA256]::Create()
  try {
    return ([BitConverter]::ToString($algorithm.ComputeHash($stream))).Replace("-", "")
  } finally {
    $algorithm.Dispose()
    $stream.Dispose()
  }
}

New-Item -ItemType Directory -Path $ResolvedOutputRoot -Force | Out-Null
Assert-ChildPath $StagingRoot $ResolvedOutputRoot
Assert-ChildPath $ZipPath $ResolvedOutputRoot

foreach ($path in @($StagingRoot, $ZipPath)) {
  if (Test-Path -LiteralPath $path) {
    Remove-Item -LiteralPath $path -Recurse -Force
  }
}

New-Item -ItemType Directory -Path $StagingRoot | Out-Null
$excludedDirectories = @(
  ".bun-install-cache",
  ".bun-install-cache-2",
  ".git",
  ".next",
  ".npm-cache",
  ".vercel",
  ".wrangler",
  "dist",
  "node_modules",
  "outputs",
  "releases"
)
$arguments = @($AppRoot, $StagingRoot, "/E", "/R:1", "/W:1", "/NFL", "/NDL", "/NJH", "/NJS", "/NP", "/XD") + $excludedDirectories + @("/XF", ".env.local")
& robocopy.exe @arguments | Out-Null
if ($LASTEXITCODE -gt 7) {
  throw "Release payload copy failed with robocopy code $LASTEXITCODE"
}

foreach ($requiredFile in @("package.json", "SETUP-WINDOWS.bat", "scripts\setup-windows.ps1", "public\prompts\complete-daily-thesis-work-prompt.md")) {
  if (-not (Test-Path -LiteralPath (Join-Path $StagingRoot $requiredFile) -PathType Leaf)) {
    throw "Release payload is missing $requiredFile"
  }
}

$StagedPackage = Get-Content -Raw -LiteralPath (Join-Path $StagingRoot "package.json") | ConvertFrom-Json
if ([string]$StagedPackage.version -ne $Version) {
  throw "Staged package version does not match $Version"
}

Compress-Archive -Path (Join-Path $StagingRoot "*") -DestinationPath $ZipPath -CompressionLevel Optimal
$Hash = Get-Sha256Hex $ZipPath

[pscustomobject]@{
  version = $Version
  stagingRoot = $StagingRoot
  package = $ZipPath
  bytes = (Get-Item -LiteralPath $ZipPath).Length
  sha256 = $Hash
  codeSigningStatus = "not-signed-zip"
} | ConvertTo-Json -Depth 3
