@echo off
title Ferdous Jaman - Portfolio
cd /d "%~dp0"
echo ========================================================
echo   Launching Md. Ferdous Jaman's Portfolio...
echo ========================================================

:: Open directly in default browser (instant, reliable, zero server needed)
start "" "%~dp0index.html"

echo Portfolio opened in your browser!
echo.
echo Starting optional local HTTP server on http://127.0.0.1:8080/ ...
echo Keep this window open if you want to use http://127.0.0.1:8080/
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
