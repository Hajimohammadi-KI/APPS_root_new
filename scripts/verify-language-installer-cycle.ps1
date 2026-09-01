param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('English', 'German')]
  [string]$Product,

  [Parameter(Mandatory = $true)]
  [string]$SetupPath,

  # Conservative cold-start ceiling. The verified 1 September root cause was
  # not extraction time: Electron inherited ELECTRON_RUN_AS_NODE by presence
  # and exited with code 134 before serving HTTP. Removing that environment
  # entry around Start-Process fixed the exact current artifacts; the fresh
  # isolated runs answered in 1.768s (English) and 7.400s (German). Keep a
  # larger ceiling for slower disks/antivirus while the per-contract evidence
  # below still records attempts, last errors, process exit, and elapsed time.
  [int]$StartupTimeoutSeconds = 180
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

function Wait-ForHttpContracts {
  param(
    [Parameter(Mandatory = $true)]
    [array]$Contracts,

    [Parameter(Mandatory = $true)]
    [datetime]$Deadline,

    [Parameter(Mandatory = $true)]
    [System.Diagnostics.Process]$DesktopProcess
  )

  $startedAt = Get-Date
  $states = @(
    foreach ($contract in $Contracts) {
      [ordered]@{
        name = [string]$contract.Name
        url = [string]$contract.Url
        validator = [scriptblock]$contract.Validator
        ready = $false
        attempts = 0
        lastStatus = $null
        lastError = $null
        satisfiedAtMs = $null
      }
    }
  )

  do {
    foreach ($state in $states) {
      if ($state.ready) {
        continue
      }

      $state.attempts += 1
      try {
        $response = Invoke-WebRequest -Uri $state.url -UseBasicParsing -TimeoutSec 3
        $state.lastStatus = [int]$response.StatusCode
        if ($response.StatusCode -eq 200 -and (& $state.validator $response)) {
          $state.ready = $true
          $state.lastError = $null
          $state.satisfiedAtMs = [int][Math]::Round(
            ((Get-Date) - $startedAt).TotalMilliseconds
          )
        } else {
          $state.lastError = 'HTTP response did not satisfy the expected contract.'
        }
      } catch {
        # Startup is asynchronous; retain the last transient failure as evidence.
        $state.lastError = $_.Exception.Message
      }
    }

    $allReady = @($states | Where-Object { -not $_.ready }).Count -eq 0
    $DesktopProcess.Refresh()
    if ($allReady -or $DesktopProcess.HasExited) {
      break
    }
    Start-Sleep -Milliseconds 750
  } while ((Get-Date) -lt $Deadline)

  $checks = @(
    foreach ($state in $states) {
      [ordered]@{
        name = $state.name
        url = $state.url
        ready = $state.ready
        attempts = $state.attempts
        lastStatus = $state.lastStatus
        lastError = $state.lastError
        satisfiedAtMs = $state.satisfiedAtMs
      }
    }
  )
  $DesktopProcess.Refresh()
  return [ordered]@{
    ready = @($states | Where-Object { -not $_.ready }).Count -eq 0
    elapsedMs = [int][Math]::Round(((Get-Date) - $startedAt).TotalMilliseconds)
    processExited = $DesktopProcess.HasExited
    processExitCode = if ($DesktopProcess.HasExited) { $DesktopProcess.ExitCode } else { $null }
    checks = $checks
  }
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
  startupElapsedMs = $null
  startupProcessExited = $null
  startupProcessExitCode = $null
  startupContracts = @()
  startupStdoutPath = $null
  startupStderrPath = $null
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
    $hadElectronRunAsNode = Test-Path Env:ELECTRON_RUN_AS_NODE
    $electronRunAsNode = if ($hadElectronRunAsNode) {
      [string]$env:ELECTRON_RUN_AS_NODE
    } else {
      $null
    }
    # PowerShell's Start-Process can retain an Env: provider entry that was
    # cleared only through Environment.SetEnvironmentVariable(). Electron
    # treats ELECTRON_RUN_AS_NODE as enabled by presence, even with an empty
    # value, then aborts because the packaged app has no Node snapshot.
    Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
    try {
      $startupStdoutPath = Join-Path $evidenceRoot 'startup.stdout.log'
      $startupStderrPath = Join-Path $evidenceRoot 'startup.stderr.log'
      $desktopProcess = Start-Process `
        -FilePath $mainExecutable `
        -WorkingDirectory $installRoot `
        -WindowStyle Hidden `
        -RedirectStandardOutput $startupStdoutPath `
        -RedirectStandardError $startupStderrPath `
        -PassThru
      $report.startupStdoutPath = $startupStdoutPath
      $report.startupStderrPath = $startupStderrPath
    } finally {
      if ($hadElectronRunAsNode) {
        Set-Item Env:ELECTRON_RUN_AS_NODE $electronRunAsNode
      } else {
        Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
      }
    }
    $deadline = (Get-Date).AddSeconds($StartupTimeoutSeconds)
    $startupResult = Wait-ForHttpContracts `
      -Contracts @(
        @{ Name = 'web'; Url = [string]$profile.WebUrl; Validator = $profile.WebValidator },
        @{ Name = 'api'; Url = [string]$profile.ApiUrl; Validator = $profile.ApiValidator }
      ) `
      -Deadline $deadline `
      -DesktopProcess $desktopProcess
    $report.startupElapsedMs = $startupResult.elapsedMs
    $report.startupProcessExited = $startupResult.processExited
    $report.startupProcessExitCode = $startupResult.processExitCode
    $report.startupContracts = $startupResult.checks
    if (-not $startupResult.ready) {
      $failedContracts = @(
        $startupResult.checks |
          Where-Object { -not $_.ready } |
          ForEach-Object { "$($_.name): $($_.lastError)" }
      ) -join '; '
      throw "Installed application did not satisfy its HTTP readiness contracts. $failedContracts"
    }
    Start-Sleep -Seconds 2
    $desktopProcess.Refresh()
    if ($desktopProcess.HasExited) {
      $report.startupProcessExited = $true
      $report.startupProcessExitCode = $desktopProcess.ExitCode
      throw "Installed desktop process exited after HTTP readiness with code $($desktopProcess.ExitCode)."
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
  $report | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $reportPath -Encoding utf8
  Write-Output ($report | ConvertTo-Json -Depth 8)
}

if ($null -ne $report.error) {
  exit 1
}
if ($report.startup -ne 'verified') {
  exit 2
}
