param(
  [ValidateSet('Start', 'Status', 'Stop')][string]$Action = 'Start',
  [string]$Address = '',
  [switch]$EnableAutoStart
)
$ErrorActionPreference = 'Stop'
$workspace = Split-Path $PSScriptRoot -Parent
$deviceDirectory = Join-Path $env:LOCALAPPDATA 'AutomaticityDeviceAccess'
New-Item -ItemType Directory -Path $deviceDirectory -Force | Out-Null
$statusFile = Join-Path $deviceDirectory 'status.json'
$gatewayScript = Join-Path $workspace 'shared/device-access/gateway.mjs'
$existing = if (Test-Path -LiteralPath $statusFile) { Get-Content -LiteralPath $statusFile -Raw | ConvertFrom-Json } else { $null }
$process = if ($existing) { Get-CimInstance Win32_Process -Filter "ProcessId=$($existing.pid)" -ErrorAction SilentlyContinue } else { $null }
$owned = $process -and $process.CommandLine -and $process.CommandLine.Contains($gatewayScript)
function Enable-DeviceAutoStart {
  $shortcutPath = Join-Path ([Environment]::GetFolderPath('Startup')) 'Automaticity Device Access.lnk'
  $shortcut = (New-Object -ComObject WScript.Shell).CreateShortcut($shortcutPath)
  $shortcut.TargetPath = (Get-Command pwsh).Source
  $shortcut.Arguments = '-NoProfile -File "' + $PSCommandPath + '"'
  $shortcut.WorkingDirectory = $workspace
  $shortcut.WindowStyle = 7
  $shortcut.Save()
}
if ($Action -eq 'Status') {
  if (-not $owned) { Write-Output 'Device gateway is stopped.'; exit 1 }
  $existing | ConvertTo-Json
  exit
}
if ($Action -eq 'Stop') {
  # The recorded PID alone is insufficient: it may have been reused by another app.
  if ($owned) { & taskkill.exe /PID $existing.pid /T /F | Out-Null }
  Write-Output 'Device gateway stopped. Previously running apps were preserved.'
  exit
}
if ($owned) { if ($EnableAutoStart) { Enable-DeviceAutoStart }; $existing | ConvertTo-Json; exit }
if (-not $Address) {
  $Address = Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -and $_.NetAdapter.Status -eq 'Up' } |
    ForEach-Object { $_.IPv4Address.IPAddress } | Where-Object { $_ -match '^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)' } | Select-Object -First 1
}
if (-not $Address) { throw 'No private Wi-Fi/Ethernet address found. Connect to your local network first.' }
$nodePath = (Get-Command node -ErrorAction Stop).Source
$arguments = @('"' + $gatewayScript + '"', $Address, '"' + $deviceDirectory + '"')
$launched = Start-Process -FilePath $nodePath -ArgumentList $arguments -WorkingDirectory $workspace -WindowStyle Hidden -PassThru `
  -RedirectStandardOutput (Join-Path $deviceDirectory 'gateway.log') -RedirectStandardError (Join-Path $deviceDirectory 'gateway-error.log')
for ($attempt = 0; $attempt -lt 45; $attempt++) {
  Start-Sleep -Milliseconds 1000
  if ($launched.HasExited) { throw "Device gateway failed. See $deviceDirectory\gateway-error.log" }
  if (Test-Path -LiteralPath $statusFile) {
    $ready = Get-Content -LiteralPath $statusFile -Raw | ConvertFrom-Json
    if ($ready.pid -eq $launched.Id) { break }
  }
}
if (-not $ready -or $ready.pid -ne $launched.Id) { throw 'Gateway did not become ready within 45 seconds.' }
if ($EnableAutoStart) { Enable-DeviceAutoStart }
$ready | ConvertTo-Json
