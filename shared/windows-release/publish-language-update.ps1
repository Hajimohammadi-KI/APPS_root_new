param(
  [Parameter(Mandatory = $true)][string]$ProjectRoot,
  [Parameter(Mandatory = $true)][string]$ProductId,
  [Parameter(Mandatory = $true)][string]$ManifestName,
  [Parameter(Mandatory = $true)][string]$SetupFile,
  [Parameter(Mandatory = $true)][string]$PayloadFile,
  [Parameter(Mandatory = $true)][string]$ReleaseSlug
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-Sha256Hex([string]$Path) {
  $stream = [IO.File]::OpenRead($Path)
  $algorithm = [Security.Cryptography.SHA256]::Create()
  try { return ([BitConverter]::ToString($algorithm.ComputeHash($stream))).Replace('-', '') }
  finally { $algorithm.Dispose(); $stream.Dispose() }
}
$ProjectRoot = [IO.Path]::GetFullPath($ProjectRoot)
$config = Get-Content -LiteralPath (Join-Path $ProjectRoot "distribution\windows-modern\setup.config.json") -Raw -Encoding UTF8 | ConvertFrom-Json
$version = [string]$config.version
$workspace = [IO.DirectoryInfo]$ProjectRoot
while ($workspace -and -not (Test-Path -LiteralPath (Join-Path $workspace.FullName "shared\windows-release") -PathType Container)) { $workspace = $workspace.Parent }
if (-not $workspace) { throw "Workspace root was not found." }
$releaseRoot = Join-Path $workspace.FullName "releases"
New-Item -ItemType Directory -Path $releaseRoot -Force | Out-Null
$setupPath = Join-Path $ProjectRoot $SetupFile
$payloadPath = Join-Path $ProjectRoot $PayloadFile
foreach ($path in @($setupPath, $payloadPath)) { if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Release input is missing: $path" } }
$packageName = "$ProductId-$version-Windows.zip"
$packagePath = Join-Path $releaseRoot $packageName
if (Test-Path -LiteralPath $packagePath) { Remove-Item -LiteralPath $packagePath -Force }
Compress-Archive -LiteralPath @($setupPath, $payloadPath) -DestinationPath $packagePath -CompressionLevel Optimal
$manifest = [ordered]@{
  schemaVersion = 1; productId = $ProductId; version = $version; publishedAt = (Get-Date -Format "yyyy-MM-dd")
  fileName = $packageName; localPackagePath = $packageName
  downloadUrl = "https://github.com/Hajimohammadi-KI/APPS_root_new/releases/download/$ReleaseSlug-v$version/$packageName"
  sha256 = Get-Sha256Hex $packagePath
  setupFile = $SetupFile; setupSha256 = Get-Sha256Hex $setupPath
  payloadFile = $PayloadFile; payloadSha256 = Get-Sha256Hex $payloadPath
  integrity = "sha256"; codeSigningStatus = "not-signed"
  releaseNotes = @("Asks before installing a new version", "Verifies the package and both installer files with SHA-256", "Preserves learning data during update and repair")
}
$manifestPath = Join-Path $releaseRoot $ManifestName
$manifest | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $manifestPath -Encoding UTF8
[pscustomobject]@{version=$version;package=$packagePath;manifest=$manifestPath;sha256=$manifest.sha256;bytes=(Get-Item -LiteralPath $packagePath).Length} | ConvertTo-Json
