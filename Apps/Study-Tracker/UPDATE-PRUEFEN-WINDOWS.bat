@echo off
setlocal
cd /d "%~dp0" || goto :failed

where powershell.exe >nul 2>nul || goto :powershell_missing
if not exist "%~dp0scripts\check-for-updates.ps1" goto :failed

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\check-for-updates.ps1" -InstalledRoot "%~dp0" -ForcePrompt
set "UPDATE_RESULT=%errorlevel%"
if "%UPDATE_RESULT%"=="10" exit /b 0
if "%UPDATE_RESULT%"=="0" exit /b 0
goto :failed

:powershell_missing
echo Windows PowerShell wurde nicht gefunden.

:failed
echo.
echo Die Update-Pruefung konnte nicht abgeschlossen werden.
pause
exit /b 1
