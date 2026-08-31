param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('English', 'German')]
  [string]$Product,

  [Parameter(Mandatory = $true)]
  [string]$SetupPath,

  [int]$StartupTimeoutSeconds = 45
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Invoke-SetupAction {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Action
  )

  $process = Start-Process `
    -FilePath $script:ResolvedSetupPath `
    -ArgumentList "--silent-$Action" `
    -Wait `
    -PassThru `
    -WindowStyle Hidden
  if ($process.ExitCode -ne 0) {
    throw "Installer action '$Action' exited with code $($process.ExitCode)."
  }
}

function Wait-ForHttpContract {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Url,

    [Parameter(Mandatory = $true)]
    [scriptblock]$Validate,

    [Parameter(Mandatory = $true)]
    [datetime]$Deadline
  )

  do {
    try {
      $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 3
      if ($response.StatusCode -eq 200 -and (& $Validate $response)) {
        return $true
      }
    } catch {
      # Startup is asynchronous; transient connection failures are expected.
    }
    Start-Sleep -Milliseconds 750
  } while ((Get-Date) -lt $Deadline)

  return $false
}

function Stop-IsolatedProductProcesses {
  param(
    [Parameter(Mandatory = $true)]
    [string]$InstallRoot
  )

  $escapedRoot = [Regex]::Escape([IO.Path]::GetFullPath($InstallRoot))
  Get-CimInstance Win32_Process | Where-Object {
    -not [string]::IsNullOrWhiteSpace($_.ExecutablePath) -and
    $_.ExecutablePath -match "^$escapedRoot"
  } | ForEach-Object {
    # Only processes whose executable lives inside this unique evidence root
    # are stopped; existing user installations remain outside the target.
    Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
  }
}

$profiles = @{
  English = @{
    Prefix = 'ENGLISH_GRAMMAR'
    Version = '27.3.20'
    MainExecutable = 'English Grammar Automaticity.exe'
    WebUrl = 'http://127.0.0.1:3202/'
    ApiUrl = 'http://127.0.0.1:4201/api/health'
    WebValidator = { param($response) $response.Content -match 'dir="ltr"' }
    ApiValidator = {
      param($response)
      $json = $response.Content | ConvertFrom-Json
      $json.service -eq 'grammar-automaticity-api' -and $json.status -eq 'ok'
    }
  }
  German = @{
    Prefix = 'DEUTSCHFLOW'
    Version = '20.8.28'
    MainExecutable = 'DeutschFlow.exe'
    WebUrl = 'http://127.0.0.1:3210/'
    ApiUrl = 'http://127.0.0.1:4210/api/v1/health'
    WebValidator = { param($response) $response.Content -match 'dir="ltr"' }
    ApiValidator = {
      param($response)
      $json = $response.Content | ConvertFrom-Json
      $json.service -eq 'grammar-api' -and $json.status -eq 'ok'
    }
  }
}

$profile = $profiles[$Product]
$script:ResolvedSetupPath = [IO.Path]::GetFullPath($SetupPath)
if (-not (Test-Path -LiteralPath $script:ResolvedSetupPath -PathType Leaf)) {
  throw "Setup executable not found: $script:ResolvedSetupPath"
}
$payloadPath = [IO.Path]::ChangeExtension($script:ResolvedSetupPath, '.payload.zip')
if (-not (Test-Path -LiteralPath $payloadPath -PathType Leaf)) {
  throw "Companion payload not found: $payloadPath"
}

$workspaceRoot = Split-Path -Parent $PSScriptRoot
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$evidenceRoot = Join-Path $workspaceRoot "artifacts\installer-cycle\$Product-$stamp-$([Guid]::NewGuid().ToString('N').Substring(0, 8))"
$installRoot = Join-Path $evidenceRoot 'install'
$dataRoot = Join-Path $evidenceRoot 'data'
New-Item -ItemType Directory -Force -Path $dataRoot | Out-Null

$learnerDataPath = Join-Path $dataRoot 'synthetic-learner-data.json'
$learnerData = '{"purpose":"installer-preservation-check","containsRealLearnerData":false}'
[IO.File]::WriteAllText($learnerDataPath, $learnerData, [Text.UTF8Encoding]::new($false))
$learnerDataHash = (Get-FileHash -LiteralPath $learnerDataPath -Algorithm SHA256).Hash

$prefix = [string]$profile.Prefix
[Environment]::SetEnvironmentVariable("${prefix}_INSTALL_ROOT", $installRoot, 'Process')
[Environment]::SetEnvironmentVariable("${prefix}_DATA_ROOT", $dataRoot, 'Process')
[Environment]::SetEnvironmentVariable("${prefix}_USER_DATA_ROOT", $dataRoot, 'Process')
[Environment]::SetEnvironmentVariable("${prefix}_NO_SHORTCUTS", '1', 'Process')
[Environment]::SetEnvironmentVariable("${prefix}_NO_LAUNCH", '1', 'Process')

$report = [ordered]@{
  product = $Product
  version = [string]$profile.Version
  setupPath = $script:ResolvedSetupPath
  setupSha256 = (Get-FileHash -LiteralPath $script:ResolvedSetupPath -Algorithm SHA256).Hash
  payloadSha256 = (Get-FileHash -LiteralPath $payloadPath -Algorithm SHA256).Hash
  signature = (Get-AuthenticodeSignature -FilePath $script:ResolvedSetupPath).Status.ToString()
  evidenceRoot = $evidenceRoot
  install = 'not-run'
  startup = 'not-run'
  startupError = $null
  update = 'not-run'
  repair = 'not-run'
  uninstall = 'not-run'
  learnerDataPreserved = $false
  error = $null
}

try {
  Invoke-SetupAction -Action 'install'
  $mainExecutable = Join-Path $installRoot ([string]$profile.MainExecutable)
  $versionPath = Join-Path $installRoot 'version.txt'
  if (-not (Test-Path -LiteralPath $mainExecutable -PathType Leaf)) {
    throw "Installed executable is missing: $mainExecutable"
  }
  if ((Get-Content -Raw -LiteralPath $versionPath).Trim() -ne [string]$profile.Version) {
    throw 'Fresh-install version marker does not match the expected version.'
  }
  $report.install = 'verified'

  try {
    [Environment]::SetEnvironmentVariable("${prefix}_NO_LAUNCH", $null, 'Process')
    $electronRunAsNode = [Environment]::GetEnvironmentVariable('ELECTRON_RUN_AS_NODE', 'Process')
    [Environment]::SetEnvironmentVariable('ELECTRON_RUN_AS_NODE', $null, 'Process')
    try {
      Start-Process -FilePath $mainExecutable -WorkingDirectory $installRoot -WindowStyle Hidden | Out-Null
    } finally {
      [Environment]::SetEnvironmentVariable('ELECTRON_RUN_AS_NODE', $electronRunAsNode, 'Process')
    }
    $deadline = (Get-Date).AddSeconds($StartupTimeoutSeconds)
    $webReady = Wait-ForHttpContract `
      -Url ([string]$profile.WebUrl) `
      -Validate $profile.WebValidator `
      -Deadline $deadline
    $apiReady = Wait-ForHttpContract `
      -Url ([string]$profile.ApiUrl) `
      -Validate $profile.ApiValidator `
      -Deadline $deadline
    if (-not ($webReady -and $apiReady)) {
      throw 'Installed application did not satisfy both HTTP readiness contracts.'
    }
    $report.startup = 'verified'
  } catch {
    # Preserve the exact startup failure while continuing update/repair checks.
    $report.startup = 'blocked'
    $report.startupError = $_.Exception.Message
  } finally {
    Stop-IsolatedProductProcesses -InstallRoot $installRoot
    [Environment]::SetEnvironmentVariable("${prefix}_NO_LAUNCH", '1', 'Process')
  }

  Invoke-SetupAction -Action 'update'
  if ((Get-Content -Raw -LiteralPath $versionPath).Trim() -ne [string]$profile.Version) {
    throw 'Update version marker does not match the expected version.'
  }
  $report.update = 'verified'

  [IO.File]::WriteAllText($versionPath, 'corrupted-for-repair-check', [Text.UTF8Encoding]::new($false))
  Invoke-SetupAction -Action 'repair'
  if ((Get-Content -Raw -LiteralPath $versionPath).Trim() -ne [string]$profile.Version) {
    throw 'Repair did not restore the version marker.'
  }
  $report.repair = 'verified'

  Invoke-SetupAction -Action 'uninstall'
  if (Test-Path -LiteralPath $installRoot) {
    throw 'Uninstall left the isolated installation root behind.'
  }
  $report.uninstall = 'verified'
  $report.learnerDataPreserved =
    (Test-Path -LiteralPath $learnerDataPath -PathType Leaf) -and
    ((Get-FileHash -LiteralPath $learnerDataPath -Algorithm SHA256).Hash -eq $learnerDataHash)
  if (-not $report.learnerDataPreserved) {
    throw 'Synthetic learner data was not preserved across the lifecycle.'
  }
} catch {
  $report.error = $_.Exception.Message
} finally {
  Stop-IsolatedProductProcesses -InstallRoot $installRoot
  New-Item -ItemType Directory -Force -Path $evidenceRoot | Out-Null
  $reportPath = Join-Path $evidenceRoot 'report.json'
  $report | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $reportPath -Encoding utf8
  Write-Output ($report | ConvertTo-Json -Depth 5)
}

if ($null -ne $report.error) {
  exit 1
}
if ($report.startup -ne 'verified') {
  exit 2
}
