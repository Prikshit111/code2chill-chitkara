@echo off
title Upload Code2Chill to GitHub
color 0b
echo ========================================================
echo        Code2Chill Chitkara - GitHub Uploader
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\Programs\git\cmd;%PATH%"

cd /d "C:\Users\PRIKSHIt\Desktop\code2chill"

echo Your repository is ready with all code committed on branch 'main'.
echo Target repo: code2chill-chitkara
echo.
set /p GH_USER="Enter your GitHub Username (or full repo URL): "

if "%GH_USER%"=="" (
    echo [ERROR] Input cannot be empty!
    pause
    exit /b
)

echo %GH_USER% | findstr /i "http" >nul
if %ERRORLEVEL% equ 0 (
    set "REPO_URL=%GH_USER%"
) else (
    set "REPO_URL=https://github.com/%GH_USER%/code2chill-chitkara.git"
)

echo.
echo Configuring remote origin: %REPO_URL% ...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo.
echo Uploading code to GitHub...
echo (If a browser window appears, click 'Authorize Git Credential Manager')
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo  SUCCESS! Your code is now live on GitHub!
    echo ========================================================
) else (
    echo.
    echo If push failed, make sure the repo exists on GitHub and you are signed in.
)
echo.
pause
