param(
  [string]$InstalledRoot = "",
  [string]$ManifestUrl = "",
  [switch]$Automatic,
  [switch]$ForcePrompt,
  [switch]$NoDialogs,
  [switch]$CheckOnly,
  [string]$UpdateRootOverride = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.IO.Compression.FileSystem

$AppName = "Cross Repository Code Intelligence"
$ProductId = "cross-repository-code-intelligence"
$DefaultManifestUrl = "https://raw.githubusercontent.com/Hajimohammadi-KI/APPS_root_new/main/releases/cross-repository-update.json"
$AppRoot = if ([string]::IsNullOrWhiteSpace($InstalledRoot)) {
  [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
} else {
  [IO.Path]::GetFullPath($InstalledRoot)
}
$UserDataRoot = Join-Path $env:LOCALAPPDATA "CrossRepositoryCodeIntelligence-UserData"
$UpdateRoot = if ([string]::IsNullOrWhiteSpace($UpdateRootOverride)) {
  Join-Path $env:LOCALAPPDATA "CrossRepositoryCodeIntelligence-Updates"
} else {
  [IO.Path]::GetFullPath($UpdateRootOverride)
}
$StatePath = Join-Path $UserDataRoot "update-state.json"
$UpdateLog = Join-Path $UserDataRoot "update-check.log"

function Write-UpdateLog([string]$Message) {
  New-Item -ItemType Directory -Path $UserDataRoot -Force | Out-Null
  Add-Content -LiteralPath $UpdateLog -Value ("[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message) -Encoding UTF8
}

function Show-Info([string]$Message) {
  if ($NoDialogs) {
    Write-Host $Message
    return
  }
  [void][System.Windows.Forms.MessageBox]::Show(
    $Message,
    $AppName,
    [System.Windows.Forms.MessageBoxButtons]::OK,
    [System.Windows.Forms.MessageBoxIcon]::Information
  )
}

function Show-Error([string]$Message) {
  if ($Automatic) {
    Write-UpdateLog "Update-Prüfung fehlgeschlagen: $Message"
    return
  }
  if ($NoDialogs) {
    Write-Host $Message -ForegroundColor Red
    return
  }
  [void][System.Windows.Forms.MessageBox]::Show(
    $Message,
    "$AppName - Update-Fehler",
    [System.Windows.Forms.MessageBoxButtons]::OK,
    [System.Windows.Forms.MessageBoxIcon]::Error
  )
}

function Get-PackageVersion([string]$Root) {
  $packagePath = Join-Path $Root "package.json"
  if (-not (Test-Path -LiteralPath $packagePath -PathType Leaf)) {
    return $null
  }
  $package = Get-Content -LiteralPath $packagePath -Raw -Encoding UTF8 | ConvertFrom-Json
  if ($package.version -isnot [string] -or [string]::IsNullOrWhiteSpace($package.version)) {
    return $null
  }
  return $package.version.Trim()
}

function ConvertTo-AppVersion([string]$Value) {
  $match = [Regex]::Match($Value, "^\s*(\d+)\.(\d+)\.(\d+)")
  if (-not $match.Success) {
    throw "Ungültige Versionsnummer: $Value"
  }
  return [Version]::new(
    [int]$match.Groups[1].Value,
    [int]$match.Groups[2].Value,
    [int]$match.Groups[3].Value
  )
}

function Read-UpdateState {
  if (-not (Test-Path -LiteralPath $StatePath -PathType Leaf)) {
    return $null
  }
  try {
    return Get-Content -LiteralPath $StatePath -Raw -Encoding UTF8 | ConvertFrom-Json
  }
  catch {
    return $null
  }
}

function Write-UpdateState([string]$OfferedVersion, [string]$Decision) {
  New-Item -ItemType Directory -Path $UserDataRoot -Force | Out-Null
  $state = [ordered]@{
    schemaVersion = 1
    currentVersion = Get-PackageVersion $AppRoot
    lastOfferedVersion = $OfferedVersion
    lastDecision = $Decision
    lastCheckedAt = (Get-Date).ToUniversalTime().ToString("o")
  }
  $state | ConvertTo-Json | Set-Content -LiteralPath $StatePath -Encoding UTF8
}

function Resolve-ManifestUrl {
  if (-not [string]::IsNullOrWhiteSpace($ManifestUrl)) {
    return $ManifestUrl
  }
  if (-not [string]::IsNullOrWhiteSpace($env:CROSS_REPOSITORY_UPDATE_MANIFEST_URL)) {
    return $env:CROSS_REPOSITORY_UPDATE_MANIFEST_URL
  }
  return $DefaultManifestUrl
}

function Assert-TrustedHttpsUrl([string]$Url, [string[]]$AllowedHosts) {
  $uri = [Uri]$Url
  if (-not $uri.IsAbsoluteUri -or $uri.Scheme -ne "https") {
    throw "Update-Adressen müssen HTTPS verwenden."
  }
  if ($AllowedHosts -notcontains $uri.Host.ToLowerInvariant()) {
    throw "Nicht vertrauenswürdiger Update-Host: $($uri.Host)"
  }
  return $uri
}

function Get-ReleaseManifest {
  $url = Resolve-ManifestUrl
  [void](Assert-TrustedHttpsUrl $url @("raw.githubusercontent.com"))
  $headers = @{
    "User-Agent" = "CrossRepositoryCodeIntelligence-Updater"
    "Cache-Control" = "no-cache"
  }
  $manifest = Invoke-RestMethod -Uri $url -Headers $headers -Method Get -TimeoutSec 15
  if ($manifest.schemaVersion -ne 1 -or $manifest.productId -ne $ProductId) {
    throw "Das Update-Manifest gehört nicht zu dieser Anwendung."
  }
  [void](ConvertTo-AppVersion ([string]$manifest.version))
  if ([string]$manifest.sha256 -notmatch "^[A-Fa-f0-9]{64}$") {
    throw "Das Update-Manifest enthält keinen gültigen SHA-256-Wert."
  }
  [void](Assert-TrustedHttpsUrl ([string]$manifest.downloadUrl) @("raw.githubusercontent.com"))
  if ([string]$manifest.fileName -notmatch "\.zip$") {
    throw "Das Update-Paket muss eine ZIP-Datei sein."
  }
  return $manifest
}

function Expand-VerifiedArchive([string]$ArchivePath, [string]$Destination) {
  New-Item -ItemType Directory -Path $Destination -Force | Out-Null
  $root = [IO.Path]::GetFullPath($Destination).TrimEnd('\') + '\'
  $archive = [IO.Compression.ZipFile]::OpenRead($ArchivePath)
  try {
    foreach ($entry in $archive.Entries) {
      $target = [IO.Path]::GetFullPath((Join-Path $Destination $entry.FullName))
      if (-not $target.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Das Update-Paket enthält einen ungültigen Pfad."
      }
      if ([string]::IsNullOrEmpty($entry.Name)) {
        New-Item -ItemType Directory -Path $target -Force | Out-Null
        continue
      }
      $parent = Split-Path -Parent $target
      New-Item -ItemType Directory -Path $parent -Force | Out-Null
      [IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $target, $true)
    }
  }
  finally {
    $archive.Dispose()
  }
}

function Find-PackageRoot([string]$StagingRoot) {
  $candidates = @($StagingRoot) + @(Get-ChildItem -LiteralPath $StagingRoot -Directory -Force -ErrorAction SilentlyContinue | ForEach-Object { $_.FullName })
  foreach ($candidate in $candidates) {
    if ((Test-Path -LiteralPath (Join-Path $candidate "SETUP-WINDOWS.bat") -PathType Leaf) -and
        (Test-Path -LiteralPath (Join-Path $candidate "scripts\setup-windows.ps1") -PathType Leaf) -and
        (Test-Path -LiteralPath (Join-Path $candidate "package.json") -PathType Leaf)) {
      return $candidate
    }
  }
  throw "Das heruntergeladene Paket enthält kein vollständiges Windows-Setup."
}

function Invoke-VerifiedUpdate($Manifest) {
  New-Item -ItemType Directory -Path $UpdateRoot -Force | Out-Null
  $downloadPath = Join-Path $UpdateRoot ([IO.Path]::GetFileName([string]$Manifest.fileName))
  $stagingRoot = Join-Path $UpdateRoot ("staging-" + [Guid]::NewGuid().ToString("N"))
  try {
    Write-UpdateLog "Download von Version $($Manifest.version) gestartet."
    Invoke-WebRequest -Uri ([string]$Manifest.downloadUrl) -UseBasicParsing -OutFile $downloadPath -TimeoutSec 120
    $item = Get-Item -LiteralPath $downloadPath
    if ($item.Length -le 0 -or $item.Length -gt 100MB) {
      throw "Das Update-Paket hat eine unerwartete Größe."
    }
    $actualHash = (Get-FileHash -LiteralPath $downloadPath -Algorithm SHA256).Hash
    if (-not $actualHash.Equals(([string]$Manifest.sha256), [StringComparison]::OrdinalIgnoreCase)) {
      throw "SHA-256-Prüfung fehlgeschlagen. Das Update wird nicht ausgeführt."
    }
    Unblock-File -LiteralPath $downloadPath -ErrorAction SilentlyContinue
    Expand-VerifiedArchive $downloadPath $stagingRoot
    Get-ChildItem -LiteralPath $stagingRoot -Recurse -Force -File | Unblock-File -ErrorAction SilentlyContinue
    $packageRoot = Find-PackageRoot $stagingRoot
    $packageVersion = Get-PackageVersion $packageRoot
    if ($packageVersion -ne [string]$Manifest.version) {
      throw "Paketversion und Update-Manifest stimmen nicht überein."
    }

    $setupScript = Join-Path $packageRoot "scripts\setup-windows.ps1"
    $setupSource = [IO.File]::ReadAllText($setupScript, [Text.Encoding]::UTF8)
    & ([ScriptBlock]::Create($setupSource)) -Action Menu -ScriptRoot (Split-Path -Parent $setupScript)

    $installedVersion = Get-PackageVersion $AppRoot
    if ($installedVersion -eq [string]$Manifest.version) {
      Write-UpdateState ([string]$Manifest.version) "installed"
      Write-UpdateLog "Version $installedVersion wurde installiert."
      return $true
    }
    Write-UpdateState ([string]$Manifest.version) "later"
    Write-UpdateLog "Update-Dialog wurde ohne Installation geschlossen."
    return $false
  }
  finally {
    if (Test-Path -LiteralPath $stagingRoot) {
      Remove-Item -LiteralPath $stagingRoot -Recurse -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path -LiteralPath $downloadPath) {
      Remove-Item -LiteralPath $downloadPath -Force -ErrorAction SilentlyContinue
    }
  }
}

try {
  if ($env:CROSS_REPOSITORY_DISABLE_UPDATE_CHECK -eq "1") {
    exit 0
  }
  $currentVersion = Get-PackageVersion $AppRoot
  if (-not $currentVersion) {
    throw "Die installierte Versionsnummer fehlt. Bitte Reparieren ausführen."
  }
  $manifest = Get-ReleaseManifest
  $remoteVersion = [string]$manifest.version
  if ((ConvertTo-AppVersion $remoteVersion) -le (ConvertTo-AppVersion $currentVersion)) {
    Write-UpdateState $remoteVersion "current"
    Write-UpdateLog "Keine neue Version. Installiert: $currentVersion."
    if (-not $Automatic -and -not $CheckOnly) {
      Show-Info "Version $currentVersion ist aktuell. Es ist kein Update erforderlich."
    }
    exit 0
  }

  if ($CheckOnly -or $NoDialogs) {
    [pscustomobject]@{
      updateAvailable = $true
      currentVersion = $currentVersion
      availableVersion = $remoteVersion
      downloadUrl = [string]$manifest.downloadUrl
      sha256 = [string]$manifest.sha256
    } | ConvertTo-Json -Depth 3
    exit 20
  }

  $state = Read-UpdateState
  if ($Automatic -and -not $ForcePrompt -and $state -and
      $state.lastOfferedVersion -eq $remoteVersion -and $state.lastDecision -eq "later") {
    Write-UpdateLog "Version $remoteVersion wurde bereits angeboten und auf später gesetzt."
    exit 0
  }

  $notes = if ($manifest.releaseNotes -is [Array]) {
    (($manifest.releaseNotes | ForEach-Object { "• $_" }) -join "`n")
  } else {
    "• Verbesserungen an Installation, Update und Deinstallation"
  }
  $answer = [System.Windows.Forms.MessageBox]::Show(
    "Eine neue Version ist verfügbar.`n`nInstalliert: $currentVersion`nNeu: $remoteVersion`n`n$notes`n`nJetzt herunterladen und aktualisieren?`nDie Aktualisierung startet nur mit Ihrer Zustimmung; persönliche Daten bleiben erhalten.",
    "$AppName - Update verfügbar",
    [System.Windows.Forms.MessageBoxButtons]::YesNo,
    [System.Windows.Forms.MessageBoxIcon]::Information
  )
  if ($answer -ne [System.Windows.Forms.DialogResult]::Yes) {
    Write-UpdateState $remoteVersion "later"
    Write-UpdateLog "Version $remoteVersion wurde abgelehnt oder auf später gesetzt."
    exit 0
  }

  Show-Info "Die HTTPS-Adresse und der SHA-256-Wert werden geprüft. Danach öffnet sich das Setup mit der neuen Version."
  if (Invoke-VerifiedUpdate $manifest) {
    exit 10
  }
  exit 0
}
catch {
  Show-Error $_.Exception.Message
  if ($Automatic) { exit 0 }
  exit 1
}
