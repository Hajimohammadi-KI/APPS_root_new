param([switch]$Launch)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$workspace = [IO.Path]::GetFullPath((Split-Path -Parent $PSScriptRoot))
$output = Join-Path $workspace ('artifacts\installed-language-update\' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $output -Force | Out-Null
$products = @(
  @{ Name='English'; Prefix='ENGLISH_GRAMMAR'; Directory='English Grammar Automaticity Desktop'; Profile='English Grammar Automaticity'; Setup='EnglishGrammar-Setup'; Executable='English Grammar Automaticity.exe'; Version='27.3.24'; Source='Apps\English\English-Automaticity'; Port=3202 },
  @{ Name='German'; Prefix='DEUTSCHFLOW'; Directory='DeutschFlow'; Profile='DeutschFlow'; Setup='DeutschFlow-Setup'; Executable='DeutschFlow.exe'; Version='20.8.30'; Source='Apps\Deutsch-Automaticity'; Port=3210 }
)
function Get-TreeManifest([string]$Root) {
  $resolved = [IO.Path]::GetFullPath($Root).TrimEnd('\') + '\'
  @(Get-ChildItem -LiteralPath $Root -File -Recurse -Force | Sort-Object FullName | ForEach-Object {
    [pscustomobject]@{ path=$_.FullName.Substring($resolved.Length); bytes=$_.Length; sha256=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash }
  })
}
function Assert-SameManifest($Before, $After, [string]$Context) {
  if (($Before | ConvertTo-Json -Depth 4 -Compress) -cne ($After | ConvertTo-Json -Depth 4 -Compress)) { throw "File preservation mismatch: $Context" }
}
$report = [ordered]@{ createdAt=(Get-Date).ToUniversalTime().ToString('o'); scope='Normal installed application update; complete private profile copy and hashes before startup'; products=@(); status='running' }
try {
  foreach ($product in $products) {
    foreach ($suffix in @('INSTALL_ROOT','DATA_ROOT','USER_DATA_ROOT')) {
      if ([Environment]::GetEnvironmentVariable(($product.Prefix + '_' + $suffix))) { throw "Unexpected root override for $($product.Name): $suffix" }
    }
    $install = Join-Path $env:LOCALAPPDATA ('Programs\' + $product.Directory)
    $profile = Join-Path $env:APPDATA $product.Profile
    $setup = Join-Path $workspace ($product.Source + '\apps\web\public\downloads\' + $product.Setup + '-v' + $product.Version + '.exe')
    $payload = [IO.Path]::ChangeExtension($setup, '.payload.zip')
    foreach ($required in @($install,$profile,$setup,$payload)) { if (-not (Test-Path -LiteralPath $required)) { throw "Required path missing: $required" } }
    $prefix = [IO.Path]::GetFullPath($install).TrimEnd('\') + '\'
    $running = @(Get-Process | Where-Object { $_.Path -and $_.Path.StartsWith($prefix, [StringComparison]::OrdinalIgnoreCase) })
    if ($running.Count) { throw "Close the running $($product.Name) application before the preservation snapshot; no forced shutdown is performed." }
    $client = [Net.Sockets.TcpClient]::new()
    try { $occupied=$false; try { $connection=$client.ConnectAsync('127.0.0.1',$product.Port); if ($connection.Wait(500)) { $occupied=$client.Connected } } catch {} ; if ($occupied) { throw "Canonical port is occupied: $($product.Port)" } } finally { $client.Dispose() }
    $saved = Join-Path $output $product.Name
    New-Item -ItemType Directory -Path $saved -Force | Out-Null
    $before = Get-TreeManifest $profile
    $profileCopy = Join-Path $saved 'profile'
    Copy-Item -LiteralPath $profile -Destination $profileCopy -Recurse -Force
    Assert-SameManifest $before (Get-TreeManifest $profileCopy) 'backup copy'
    Assert-SameManifest $before (Get-TreeManifest $profile) 'source remained unchanged during copy'
    $before | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $saved 'profile-manifest.json') -Encoding UTF8
    foreach ($suffix in @('.exe','.payload.zip')) {
      $old = Join-Path $install ($product.Setup + $suffix)
      $copy = Join-Path $saved ($product.Setup + $suffix)
      Copy-Item -LiteralPath $old -Destination $copy
      if ((Get-FileHash -LiteralPath $old).Hash -ne (Get-FileHash -LiteralPath $copy).Hash) { throw 'Rollback installer copy mismatch' }
    }
    $row = [ordered]@{ product=$product.Name; installRoot=$install; profileRoot=$profile; backupRoot=$saved; previousVersion=(Get-Content -LiteralPath (Join-Path $install 'version.txt') -Raw).Trim(); version=$product.Version; profileFiles=$before.Count; profileBytes=($before | Measure-Object bytes -Sum).Sum; setupSha256=(Get-FileHash -LiteralPath $setup).Hash; payloadSha256=(Get-FileHash -LiteralPath $payload).Hash; update='not-run'; profilePreservedBeforeStartup=$false; processId=$null; httpStatus=$null }
    $report.products += $row
    [Environment]::SetEnvironmentVariable(($product.Prefix + '_NO_LAUNCH'),'1','Process')
    [Environment]::SetEnvironmentVariable(($product.Prefix + '_DISABLE_UPDATE_CHECK'),'1','Process')
    $process = Start-Process -FilePath $setup -ArgumentList '--silent-update' -WindowStyle Hidden -PassThru -Wait
    if ($process.ExitCode -ne 0) { throw "Setup exited $($process.ExitCode); backup retained at $saved" }
    if ((Get-Content -LiteralPath (Join-Path $install 'version.txt') -Raw).Trim() -ne $product.Version) { throw 'Installed version mismatch' }
    foreach ($pair in @(@($setup, ($product.Setup + '.exe')), @($payload, ($product.Setup + '.payload.zip')))) {
      $destination = Join-Path $install $pair[1]
      if ((Get-FileHash -LiteralPath $pair[0]).Hash -ne (Get-FileHash -LiteralPath $destination).Hash) { throw "Installed repair payload mismatch: $($pair[1])" }
    }
    Assert-SameManifest $before (Get-TreeManifest $profile) 'installed update preserved complete profile'
    $row.update='verified'; $row.profilePreservedBeforeStartup=$true
    if ($Launch) {
      # Electron checks presence; clear the PowerShell provider entry too.
      Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
      $desktop = Start-Process -FilePath (Join-Path $install $product.Executable) -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $saved 'startup.stdout.log') -RedirectStandardError (Join-Path $saved 'startup.stderr.log')
      $row.processId=$desktop.Id
      $deadline=(Get-Date).AddSeconds(180)
      do {
        try { $response=Invoke-WebRequest -Uri ('http://127.0.0.1:' + $product.Port + '/practice') -UseBasicParsing -TimeoutSec 3; if ($response.StatusCode -eq 200 -and $response.Content -match 'id="practice-root"') { $row.httpStatus=200; break } } catch {}
        $desktop.Refresh(); if ($desktop.HasExited) { throw "Installed desktop exited: $($desktop.ExitCode)" }
        Start-Sleep -Milliseconds 700
      } while ((Get-Date) -lt $deadline)
      if ($row.httpStatus -ne 200) { throw 'Installed practice page did not become ready' }
    }
    $report | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $output 'report.json') -Encoding UTF8
    Write-Output "$($product.Name) $($product.Version): update and exact profile preservation verified."
  }
  $report.status='verified'
} catch { $report.status='failed'; $report.error=$_.Exception.Message; throw }
finally { $report | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $output 'report.json') -Encoding UTF8; Write-Output "Evidence: $output" }
