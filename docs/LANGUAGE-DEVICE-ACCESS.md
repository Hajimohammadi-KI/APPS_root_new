# Use the language apps on a phone, tablet or pen-enabled Windows computer

Connect the device to the same local network as this Windows computer. Keep the
computer awake. Start the apps by double-clicking `START-LANGUAGE-DEVICES.cmd` in
`D:\APPS_root_new`. The launcher opens no terminal windows for the app services.

| App | Reading, listening, typing and handwriting | Recording with trusted HTTPS |
| --- | --- | --- |
| English Automaticity | http://192.168.178.24:3203/ | https://192.168.178.24:3204/ |
| DeutschFlow | http://192.168.178.24:3211/ | https://192.168.178.24:3212/ |
| Roadmap | http://192.168.178.24:3317/LANGUAGE-AUTOMATICITY-ROADMAP.html | https://192.168.178.24:3318/LANGUAGE-AUTOMATICITY-ROADMAP.html |

These addresses are private network links. They do not provide access from mobile
data or outside the local network. The roadmap is a read-only generated snapshot.
Its local refresh endpoint and arbitrary workspace files are not exposed.

## Write with a pen

Open **Grammar / Grammatik**, choose a topic, and open one of the three worksheet
pages. Use the pen control beside an answer or WHY field. Write in the pad, then
close it to return to the worksheet. Pen, stroke eraser, undo and clear are
available. A finger or mouse also works. Touch scrolling remains available outside
the writing pad.

Typed answers and handwriting are saved separately in that browser. Closing and
reopening the page restores them. Handwriting is not converted to text or graded
automatically. Real stylus pressure and palm rejection depend on the device and
browser; the app ignores a second pointer while a stroke is active.

## Enable microphone recording on a mobile device

Browsers require a trusted secure connection and the learner's microphone
permission. Ordinary LAN HTTP can display the exercises but cannot capture the
microphone. See [MDN's getUserMedia documentation](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).

A private certificate has been generated locally for this computer. No certificate
has been installed in a trust store automatically. Only the public certificate is
downloadable; the server key stays in the current Windows user's local data folder.
The signing key was discarded after creating the server certificate.

1. On the device, download the [private device certificate](http://192.168.178.24:3317/device-ca.cer).
2. Check its SHA-256 fingerprint against the local `certificate.json` described
   below before choosing to trust it.
3. On iPad/iPhone, install the downloaded profile, then enable full trust for
   **Automaticity Private Device Access** under **Settings > General > About >
   Certificate Trust Settings**. Installing the profile alone does not enable SSL
   trust. See [Apple's instructions](https://support.apple.com/en-us/102390).
4. On Android, use the device's security settings to install this as a CA
   certificate. Menu names depend on the manufacturer and OS version. Managed
   devices may require an administrator. On a Windows tablet, use the current
   user's certificate manager to trust the public certificate if you choose to.
5. Open the corresponding HTTPS app link above. Verify that the browser reports a
   secure connection. Open **Conversation / Gespräch**, continue to recording and
   grant microphone permission when asked.

Do not rely on bypassing a certificate warning. The final trust and microphone
permission steps must be completed on each actual device. No browser security
flags are needed for normal use.

The current public certificate fingerprint is:

```text
8BB5C68A9D13DD636C8F04B362E0FF58A8E0721121729453CAC8B1633DB3866B
```

Certificate metadata, including the address and expiration, is stored in
`%LOCALAPPDATA%\AutomaticityDeviceAccess\certificates\certificate.json`.
This certificate expires on 8 September 2027. If the computer's network address
changes, a new certificate and device trust step are needed. The launcher detects
that mismatch rather than silently replacing a certificate already trusted by a
device.

For a new computer, create its own private certificate before starting the
gateway: `pwsh -NoProfile -File scripts/create-language-device-certificate.ps1
-Address 192.168.178.24` (use that computer's actual private address). Archive an
expired certificate directory before intentionally generating its replacement.

## Listening and conversation speed

The playback selector offers **0.5×, 0.75×, 1×, 1.25×, 1.5× and 2×**. It applies to
listening, conversation examples and recorded playback. A speech-synthesis voice
uses the selected speed on its next utterance. Recording time and fluency evidence
use the original capture, independent of playback speed.

The three conversation screens remain **Prepare → Speak → Feedback**. A retry
returns to the recording screen and saves a separate attempt. Original audio,
original recognition output, confirmed text, immediate retry and delayed review
remain separate evidence. A completed checkbox or a faster replay does not mark
mastery.

## Keep your answers when changing devices or links

Browser data belongs to a specific device, browser and address. HTTP and HTTPS
use separate storage, as do different port numbers. Export a backup from the old
app address before moving to another address or device, then import it there.
Opening the same server does not synchronize handwritten answers or recordings
between devices automatically. Keep an exported copy of work you need to retain.

## Manage the launcher

From `D:\APPS_root_new` in PowerShell 7:

```powershell
pwsh -NoProfile -File scripts/start-language-devices.ps1
pwsh -NoProfile -File scripts/start-language-devices.ps1 -Action Status
pwsh -NoProfile -File scripts/start-language-devices.ps1 -Action Stop
```

To opt into starting the gateway when this Windows user signs in, start it with
`-EnableAutoStart`. Remove **Automaticity Device Access.lnk** from the Windows
Startup folder to disable that option. Auto-start is not enabled by default.

Logs are in `%LOCALAPPDATA%\AutomaticityDeviceAccess`. The launcher starts missing
app services, reuses healthy existing services, and only stops the process tree it
owns. After a source rebuild, stop and restart the launcher so it loads the new
build. Node and Bun must remain installed. Windows release installers contain the
same app changes; this repository launcher serves the local workspace build.

If another device cannot connect, first check the address, shared Wi-Fi and that
the computer is awake. A restricted firewall helper is provided if needed:

```powershell
# Inspect first; -WhatIf makes no changes.
pwsh -NoProfile -File scripts/allow-language-devices-firewall.ps1 -Address 192.168.178.24 -WhatIf
```

Running it without `-WhatIf` requires an Administrator PowerShell. It allows only
the gateway's six TCP ports for Node, on that local address, from LocalSubnet.
It does not disable the firewall or open the backend API ports.

## Reproduce verification

```powershell
bun test shared/device-access shared/learning-core/src/client-id.test.ts
$env:DEVICE_TEST_HOST = '192.168.178.24'
node shared/device-access/verify-browser.mjs
```

Browser checks require the dedicated disposable Chrome CDP profile on port 9337.
They do not access the learner's regular Chrome profile. Emulated viewport and
pointer tests are useful checks, but they do not certify a particular physical
phone, stylus, microphone or Safari version.
