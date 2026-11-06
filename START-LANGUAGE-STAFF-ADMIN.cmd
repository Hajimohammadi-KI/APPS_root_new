@echo off
setlocal
cd /d "%~dp0"
bun run scripts\manage-language-staff.ts
if errorlevel 1 pause
