import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const setup = await readFile(new URL("../scripts/setup-windows.ps1", import.meta.url), "utf8");
const setupLauncher = await readFile(new URL("../SETUP-WINDOWS.bat", import.meta.url), "utf8");
const appLauncher = await readFile(new URL("../STARTEN-WINDOWS.bat", import.meta.url), "utf8");
const localSupervisor = await readFile(new URL("../scripts/start-local-app.ps1", import.meta.url), "utf8");
const uninstallLauncher = await readFile(new URL("../DEINSTALLIEREN-WINDOWS.bat", import.meta.url), "utf8");
const updateLauncher = await readFile(new URL("../UPDATE-PRUEFEN-WINDOWS.bat", import.meta.url), "utf8");
const updateChecker = await readFile(new URL("../scripts/check-for-updates.ps1", import.meta.url), "utf8");
const localEnvGenerator = await readFile(new URL("../scripts/generate-local-env.mjs", import.meta.url), "utf8");
const runWebScript = await readFile(new URL("../scripts/wsl/run-web.sh", import.meta.url), "utf8");
const prepareWslScript = await readFile(new URL("../scripts/wsl/prepare-wsl.sh", import.meta.url), "utf8");
const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const packageLock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));

test("release version is synchronized across package and Windows setup", () => {
  assert.equal(packageJson.version, "0.7.0-version2");
  assert.equal(packageLock.version, packageJson.version);
  assert.equal(packageLock.packages[""].version, packageJson.version);
  assert.match(setup, /Version \$sourceVersion/);
});

test("Windows updater asks for consent and verifies a trusted package", () => {
  assert.match(appLauncher, /check-for-updates\.ps1/);
  assert.match(updateLauncher, /check-for-updates\.ps1/);
  assert.match(updateChecker, /MessageBoxButtons\]::YesNo/);
  assert.match(updateChecker, /lastDecision = \$Decision/);
  assert.match(updateChecker, /Write-UpdateState \$remoteVersion "later"/);
  assert.match(updateChecker, /Invoke-WebRequest[^\n]+-OutFile/);
  assert.match(updateChecker, /Get-FileHash[^\n]+-Algorithm SHA256/);
  assert.match(updateChecker, /Assert-TrustedHttpsUrl/);
  assert.match(updateChecker, /raw\.githubusercontent\.com/);
  assert.match(updateChecker, /SHA-256-Prüfung fehlgeschlagen/);
  assert.match(updateChecker, /Paketversion und Update-Manifest stimmen nicht überein/);
  assert.match(updateChecker, /if \(\$CheckOnly -or \$NoDialogs\)/);
});

test("Windows setup registers standard update and uninstall integration", () => {
  assert.match(setup, /Register-UninstallEntry/);
  assert.match(setup, /CurrentVersion\\Uninstall\\CrossRepositoryCodeIntelligence/);
  assert.match(setup, /DisplayVersion/);
  assert.match(setup, /UninstallString/);
  assert.match(setup, /QuietUninstallString/);
  assert.match(setup, /ModifyPath/);
  assert.match(setup, /Remove-UninstallEntry/);
  assert.match(setup, /function Remove-UninstallEntry \{\s+if \(\$SkipShortcuts\)/);
  assert.match(setup, /Nach Updates suchen/);
});

test("Windows setup exposes install, update, repair, and uninstall", () => {
  for (const action of ["Install", "Update", "Repair", "Uninstall"]) {
    assert.match(setup, new RegExp(`\\b${action}\\b`));
  }
  assert.match(setupLauncher, /setup-windows\.ps1/);
  assert.match(uninstallLauncher, /-Action Uninstall/);
  assert.match(setupLauncher, /-WindowStyle Hidden/);
  assert.match(uninstallLauncher, /-WindowStyle Hidden/);
  assert.match(setupLauncher, /start "" powershell\.exe/);
  assert.match(uninstallLauncher, /start "" powershell\.exe/);
});

test("Windows setup detects and repairs incomplete installations", () => {
  assert.match(setup, /function Test-InstallFiles/);
  assert.match(setup, /function Test-IncompleteInstallation/);
  assert.match(setup, /node_modules\\\.bin\\bun\.cmd/);
  assert.match(setup, /\.env\.local/);
  assert.match(setup, /dist\\server\\index\.js/);
  assert.match(setup, /apps\\api\\dist\\main\.js/);
  assert.match(setup, /Unvollständige Installation erkannt/);
  assert.match(setup, /\$availableModes\["Repair"\] = \(\$installed -or \$incomplete\)/);
});

test("Windows setup uses a modern single-action interface", () => {
  assert.match(setup, /Cross Repository`nCode Intelligence/);
  assert.match(setup, /ERSTINSTALLATION AUSGEWÄHLT/);
  assert.match(setup, /Jetzt installieren/);
  assert.match(setup, /Installationsprotokoll/);
  assert.match(setup, /ProgressBarStyle\]::Marquee/);
  assert.match(setup, /\$white = \[System\.Drawing\.Color\]::White/);
  assert.match(setup, /New-UiLabel "Cross Repository`nCode Intelligence"[^\r\n]+\$white/);
  for (const [index, line] of setup.split(/\r?\n/).entries()) {
    if (/^\s*function\s+New-Ui/.test(line) || !/\bNew-Ui(?:Label|Button)\s/.test(line)) continue;
    assert.doesNotMatch(
      line,
      /(?:^|\s)\[System\.(?:Drawing|Windows\.Forms)\.[^\]]+\]::[A-Za-z_]\w*(?:\([^)]*\))?(?=\s|$)/,
      `Static .NET values passed to a PowerShell UI function must be parenthesized or assigned to a variable (line ${index + 1})`,
    );
  }
  assert.match(setup, /\$uiState = @\{ SelectedMode = "Install"; Busy = \$false \}/);
  assert.match(setup, /\$uiState\.SelectedMode = \$Mode/);
  assert.match(setup, /\$mode = \$uiState\.SelectedMode/);
  assert.match(setup, /UseVisualStyleBackColor = \$false/);
  assert.match(setup, /\$actionButton\.ForeColor = \$white/);
  assert.match(setup, /if \(\$uiState\.Busy\) \{ return \}/);
  assert.doesNotMatch(setup, /\$actionButton\.Enabled = \$false/);
  assert.doesNotMatch(setup, /\$modePanel\.Enabled = \$false/);
});

test("Windows setup uses the accessible purple palette", () => {
  assert.match(setup, /\$navy = \[System\.Drawing\.Color\]::FromArgb\(73, 52, 101\)/);
  assert.match(setup, /\$purple = \[System\.Drawing\.Color\]::FromArgb\(111, 82, 150\)/);
  assert.match(setup, /\$lavender = \[System\.Drawing\.Color\]::FromArgb\(241, 234, 250\)/);
  assert.match(setup, /\$button\.ForeColor = \$white/);
  assert.match(setup, /\$actionButton\.ForeColor = \$white/);
  assert.doesNotMatch(setup, /FromArgb\(17, 137, 124\)|FromArgb\(226, 247, 243\)/);
});

test("Windows setup retries dependency installation and preserves diagnostics", () => {
  assert.match(setup, /function Invoke-NpmAttempt/);
  assert.match(setup, /setup-install\.log/);
  assert.match(setup, /"cache", "verify"/);
  assert.match(setup, /3\. Versuch: kompatible Installation/);
  assert.match(setup, /Vollständiges Protokoll/);
  assert.match(setup, /Invoke-BunAttempt @\("run", "build:all"\)/);
  assert.match(setup, /Invoke-BunAttempt @\("run", "validate:artifact"\)/);
});

test("Windows setup removes the downloaded-file warning from installed app files", () => {
  assert.match(setup, /function Remove-DownloadedFileMark/);
  assert.match(setup, /Unblock-File -LiteralPath \$_\.FullName/);
  assert.match(setup, /Restore-SavedData\s+Normalize-ShellScriptLineEndings\s+Remove-DownloadedFileMark\s+Install-Dependencies/);
});

test("Windows uninstaller releases local processes and removes from a temporary working directory", () => {
  assert.match(setup, /function Stop-LocalAppProcesses/);
  assert.match(setup, /Get-CimInstance Win32_Process/);
  assert.match(setup, /"powershell\.exe"/);
  for (const processName of ["bun.exe", "wrangler.exe", "esbuild.exe"]) {
    assert.match(setup, new RegExp(`"${processName.replace(".", "\\.")}"`));
  }
  assert.match(setup, /Start-Process -FilePath "powershell\.exe" -ArgumentList \$arguments -WorkingDirectory \$env:TEMP/);
  assert.match(setup, /Move-Item -LiteralPath \$InstallRoot -Destination \$tombstone/);
  assert.match(setup, /Start-DeferredRemoval \$removalTarget/);
  assert.match(setup, /\.CrossRepositoryCodeIntelligence\.uninstalling-/);
  assert.match(setup, /robocopy\.exe \$emptyRoot \$targetPath \/MIR/);
  assert.match(setup, /Stop-LocalAppProcesses\s+if \(\$dataChoice -eq \[System\.Windows\.Forms\.DialogResult\]::Yes\)/);
  assert.match(setup, /Remove-Shortcuts\s+Remove-UninstallEntry[\s\S]*Start-DeferredRemoval \$removalTarget/);
  assert.match(setup, /if \(\$Mode -ne "Install"\) \{\s+Stop-LocalAppProcesses\s+\}\s+Copy-ApplicationFiles/);
});

test("Windows update migrates only known legacy local ports", () => {
  assert.match(localEnvGenerator, /function migrateLegacyValue/);
  assert.match(localEnvGenerator, /migrateLegacyValue\("API_PORT", "4311", "4313"\)/);
  assert.match(localEnvGenerator, /migrateLegacyValue\("WEB_ORIGIN", "http:\/\/127\.0\.0\.1:4310", "http:\/\/127\.0\.0\.1:4312"\)/);
  assert.match(localEnvGenerator, /migrateLegacyValue\("API_INTERNAL_URL", "http:\/\/127\.0\.0\.1:4311\/v1\/health", "http:\/\/127\.0\.0\.1:4313\/v1\/health"\)/);
});

test("Windows setup preserves local data during update and repair", () => {
  assert.match(setup, /\.wrangler/);
  assert.match(setup, /\.env\.local/);
  assert.match(setup, /Save-UserData/);
  assert.match(setup, /Restore-SavedData/);
});

test("Windows setup guarantees LF-only WSL shell payloads", () => {
  assert.doesNotMatch(prepareWslScript, /\r/);
  assert.doesNotMatch(runWebScript, /\r/);
  assert.match(setup, /function Normalize-ShellScriptLineEndings/);
  assert.match(setup, /\.Replace\("`r`n", "`n"\)\.Replace\("`r", "`n"\)/);
  assert.match(setup, /Restore-SavedData\s+Normalize-ShellScriptLineEndings\s+Remove-DownloadedFileMark/s);
});

test("Windows setup excludes audit-only screenshots from the installed payload", () => {
  assert.match(setup, /"outputs"/);
});

test("Windows setup excludes local Bun caches from install and update payloads", () => {
  assert.match(setup, /"\.bun-install-cache"/);
  assert.match(setup, /"\.bun-install-cache-2"/);
});

test("Windows setup supports an isolated lifecycle verification target", () => {
  assert.match(setup, /InstallRootOverride/);
  assert.match(setup, /SavedDataRootOverride/);
  assert.match(setup, /SkipShortcuts/);
  assert.match(runWebScript, /APP_KEY=.*sha256sum/);
  assert.match(runWebScript, /windows install root in WSL notation is required/);
  assert.match(setup, /--migrate-legacy/);
  assert.match(setup, /\$ErrorActionPreference = "Continue"[\s\S]*\$wslExitCode = \$LASTEXITCODE/);
  assert.match(localSupervisor, /\$RunWebScriptWsl, \$AppRootWsl/);
  assert.match(prepareWslScript, /for attempt in 1 2/);
});

test("Windows setup automatically restarts the app after a successful operation", () => {
  assert.match(setup, /Create-Shortcuts\s+Register-UninstallEntry\s+\$verb = switch/);
  assert.match(setup, /\$launcherProcess = Start-App/);
  assert.match(setup, /scripts\\start-local-app\.ps1/);
  assert.match(setup, /Start-Process -FilePath "powershell\.exe"[\s\S]*-WindowStyle Hidden -PassThru/);
  assert.match(setup, /Wait-ForAppReady \$launcherProcess/);
  assert.match(setup, /http:\/\/127\.0\.0\.1:4312\/api\/state/);
  assert.match(setup, /http:\/\/127\.0\.0\.1:4313\/v1\/health/);
  assert.match(setup, /Show-Info \"\$AppName wurde erfolgreich/);
  assert.match(setup, /Die App wurde automatisch gestartet/);
  assert.doesNotMatch(setup, /App jetzt starten\?/);
});

test("Windows update also stops the WSL web host before replacing files", () => {
  assert.match(setup, /processNames\s*=\s*@\([^\n]*"wsl\.exe"/);
  assert.match(setup, /\$escapedWslRoot = \[Regex\]::Escape/);
  assert.match(setup, /CommandLine -match \$escapedRoot -or \(\$escapedWslRoot/);
});

test("Windows setup closes itself after the launched app is ready", () => {
  assert.match(setup, /Invoke-InstallOperation \$mode -NoCompletionDialog/);
  assert.match(setup, /Invoke-InstallOperation \$mode -NoCompletionDialog\s+if \(\$openDeepLCheckBox\.Checked\)/);
  assert.match(setup, /if \(\$operationSucceeded\) \{\s+\$form\.Close\(\)\s+\}/);
});

test("Windows setup offers the official DeepL browser helper only by opt-in", () => {
  assert.match(setup, /Open-DeepLBrowserExtensionPage/);
  assert.match(setup, /https:\/\/www\.deepl\.com\/en\/app/);
  assert.match(setup, /DeepL wird nicht automatisch installiert/);
  assert.match(setup, /\$openDeepLCheckBox\.Checked = \$false/);
});

test("Windows launcher supervises compiled web and API without development watchers", () => {
  assert.match(appLauncher, /scripts\\start-local-app\.ps1/);
  assert.match(appLauncher, /dist\\server\\index\.js/);
  assert.match(appLauncher, /apps\\api\\dist\\main\.js/);
  assert.match(appLauncher, /http:\/\/127\.0\.0\.1:4312\/api\/state/);
  assert.match(appLauncher, /http:\/\/127\.0\.0\.1:4313\/v1\/health/);
  assert.doesNotMatch(appLauncher, /dev:all/);
  assert.match(localSupervisor, /\$MaxAttempts = 3/);
  assert.match(localSupervisor, /@\("run", "--cwd", "apps\/api", "start"\)/);
  assert.match(localSupervisor, /http:\/\/127\.0\.0\.1:4312\/api\/state/);
  assert.match(localSupervisor, /http:\/\/127\.0\.0\.1:4313\/v1\/health/);
  assert.match(localSupervisor, /function Stop-ProcessTree/);
  assert.match(localSupervisor, /runtime-startup\.log/);
});

// The web process does not run natively on Windows (workerd crashes on
// this machine, see run-web.sh's own comment) -- it launches through WSL
// instead, via run-web.sh, and this test suite never actually covered
// that indirection: the previous version of the test above still
// asserted a literal `bun run start` PowerShell array that predates the
// WSL-relay architecture and doesn't appear anywhere in the current
// launch path, so it was failing for the right reason (a real
// architecture change) but with the wrong fix (there is no `bun run
// start` to find -- the equivalent command now lives inside run-web.sh
// as `wrangler dev`, invoked over WSL, not PowerShell).
test("Windows launcher starts the web process inside WSL via run-web.sh", () => {
  assert.match(localSupervisor, /wsl\.exe/);
  assert.match(localSupervisor, /run-web\.sh/);
  assert.match(localSupervisor, /ConvertTo-WslPath/);
  assert.match(runWebScript, /wrangler dev/);
  assert.match(runWebScript, /tcp-relay\.mjs/);
});

test("Windows setup creates desktop and Start menu shortcuts with an icon", async () => {
  assert.match(setup, /GetFolderPath\("Desktop"\)/);
  assert.match(setup, /GetFolderPath\("StartMenu"\)/);
  assert.match(setup, /Create-Shortcuts/);
  assert.match(setup, /app-icon\.ico/);
  const icon = await stat(new URL("../public/app-icon.ico", import.meta.url));
  assert.ok(icon.size > 1_000);
});

test("local Vite configuration has no hosting manifest dependency", async () => {
  const vite = await readFile(new URL("../vite.config.ts", import.meta.url), "utf8");
  assert.doesNotMatch(vite, /\.openai\/hosting\.json/);
  assert.match(vite, /binding: "DB"/);
  assert.match(vite, /binding: "BUCKET"/);
});
