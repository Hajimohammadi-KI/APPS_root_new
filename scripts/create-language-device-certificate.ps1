param([Parameter(Mandatory)][string]$Address)
$ErrorActionPreference = 'Stop'
if ($PSVersionTable.PSVersion.Major -lt 7) { throw 'Run this script with PowerShell 7 (pwsh).' }
$ip = [System.Net.IPAddress]::Parse($Address)
if ($Address -notmatch '^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)') { throw 'Use the computer private LAN IPv4 address.' }
$certificateDirectory = Join-Path $env:LOCALAPPDATA 'AutomaticityDeviceAccess/certificates'
$metadataFile = Join-Path $certificateDirectory 'certificate.json'
if (Test-Path -LiteralPath $metadataFile) {
  $existing = Get-Content -LiteralPath $metadataFile -Raw | ConvertFrom-Json
  if ($existing.host -eq $Address -and [datetime]$existing.expires -gt (Get-Date).AddDays(7)) { $existing | ConvertTo-Json; exit }
  throw 'An older certificate exists. Archive that certificate directory before intentionally replacing it and re-trusting devices.'
}
New-Item -ItemType Directory -Path $certificateDirectory -Force | Out-Null
$rsa = [System.Security.Cryptography.RSA]
$requestType = [System.Security.Cryptography.X509Certificates.CertificateRequest]
$hash = [System.Security.Cryptography.HashAlgorithmName]::SHA256
$padding = [System.Security.Cryptography.RSASignaturePadding]::Pkcs1
$rootKey = $rsa::Create(3072)
$leafKey = $rsa::Create(2048)
$start = [datetimeoffset]::UtcNow.AddDays(-1)
$end = [datetimeoffset]::UtcNow.AddDays(365)
try {
  $rootRequest = $requestType::new('CN=Automaticity Private Device Access', $rootKey, $hash, $padding)
  $rootRequest.CertificateExtensions.Add([System.Security.Cryptography.X509Certificates.X509BasicConstraintsExtension]::new($true, $true, 0, $true))
  $rootRequest.CertificateExtensions.Add([System.Security.Cryptography.X509Certificates.X509KeyUsageExtension]::new([System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::KeyCertSign -bor [System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::CrlSign, $true))
  $rootCert = $rootRequest.CreateSelfSigned($start, $end.AddDays(1))
  $leafRequest = $requestType::new("CN=$Address", $leafKey, $hash, $padding)
  $san = [System.Security.Cryptography.X509Certificates.SubjectAlternativeNameBuilder]::new()
  $san.AddIpAddress($ip)
  $san.AddIpAddress([System.Net.IPAddress]::Parse('127.0.0.1'))
  $san.AddDnsName('localhost')
  $leafRequest.CertificateExtensions.Add($san.Build())
  $leafRequest.CertificateExtensions.Add([System.Security.Cryptography.X509Certificates.X509BasicConstraintsExtension]::new($false, $false, 0, $true))
  $leafRequest.CertificateExtensions.Add([System.Security.Cryptography.X509Certificates.X509KeyUsageExtension]::new([System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::DigitalSignature -bor [System.Security.Cryptography.X509Certificates.X509KeyUsageFlags]::KeyEncipherment, $true))
  $purposes = [System.Security.Cryptography.OidCollection]::new()
  $null = $purposes.Add([System.Security.Cryptography.Oid]::new('1.3.6.1.5.5.7.3.1'))
  $leafRequest.CertificateExtensions.Add([System.Security.Cryptography.X509Certificates.X509EnhancedKeyUsageExtension]::new($purposes, $true))
  $serial = [System.Security.Cryptography.RandomNumberGenerator]::GetBytes(16)
  $leafCert = $leafRequest.Create($rootCert, $start, $end, $serial)
  [System.IO.File]::WriteAllBytes((Join-Path $certificateDirectory 'device-ca.cer'), $rootCert.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Cert))
  [System.IO.File]::WriteAllText((Join-Path $certificateDirectory 'device-ca.pem'), $rootCert.ExportCertificatePem())
  [System.IO.File]::WriteAllText((Join-Path $certificateDirectory 'server.pem'), $leafCert.ExportCertificatePem())
  $keyFile = Join-Path $certificateDirectory 'server-key.pem'
  [System.IO.File]::WriteAllText($keyFile, $leafKey.ExportPkcs8PrivateKeyPem())
  # Only the current Windows user and SYSTEM can read the server private key.
  # The signing key is never persisted and no certificate trust store is modified.
  $identity = [System.Security.Principal.WindowsIdentity]::GetCurrent().User
  $acl = [System.Security.AccessControl.FileSecurity]::new()
  $acl.SetAccessRuleProtection($true, $false)
  $acl.AddAccessRule([System.Security.AccessControl.FileSystemAccessRule]::new($identity, 'FullControl', 'Allow'))
  $acl.AddAccessRule([System.Security.AccessControl.FileSystemAccessRule]::new([System.Security.Principal.SecurityIdentifier]::new('S-1-5-18'), 'FullControl', 'Allow'))
  Set-Acl -LiteralPath $keyFile -AclObject $acl
  $metadata = @{ host = $Address; expires = $end.ToString('o'); caSha256 = $rootCert.GetCertHashString([System.Security.Cryptography.HashAlgorithmName]::SHA256); trustInstalled = $false }
  $metadata | ConvertTo-Json | Set-Content -LiteralPath $metadataFile -Encoding utf8
  $metadata | ConvertTo-Json
} finally { $rootKey.Dispose(); $leafKey.Dispose() }
