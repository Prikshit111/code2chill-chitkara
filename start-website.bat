@echo off
title Code2Chill Club - Chitkara University Rajpura
echo ======================================================================
echo   Starting Code2Chill Club Web Platform (Chitkara University)
echo ======================================================================
echo.
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

echo Opening website in your browser...
start http://localhost:5000

echo Starting backend server on port 5000...
echo (Press Ctrl + C anytime to stop the server)
echo.
node server/server.js
pause
