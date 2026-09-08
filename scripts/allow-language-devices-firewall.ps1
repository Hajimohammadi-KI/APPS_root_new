# Run only if another device cannot reach the gateway. This script needs Administrator.
[CmdletBinding(SupportsShouldProcess)]
param([Parameter(Mandatory)][string]$Address)
$ErrorActionPreference = 'Stop'
if ($Address -notmatch '^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)') { throw 'Use the private LAN IPv4 address of this computer.' }
$null = [System.Net.IPAddress]::Parse($Address)
$nodeProgram = (Get-Command node -ErrorAction Stop).Source
if ($PSCmdlet.ShouldProcess("$nodeProgram on $Address, TCP ports 3203,3211,3317,3204,3212,3318", 'Allow inbound connections from LocalSubnet')) {
  $ruleName = 'Automaticity-Private-Device-Access'
  if (Get-NetFirewallRule -Name $ruleName -ErrorAction SilentlyContinue) { throw 'The rule already exists. Inspect it before changing it.' }
  New-NetFirewallRule -Name $ruleName -DisplayName 'Automaticity private device access' -Direction Inbound -Action Allow `
    -Program $nodeProgram -Protocol TCP -LocalPort 3203,3211,3317,3204,3212,3318 -LocalAddress $Address -RemoteAddress LocalSubnet -Profile Any
}
