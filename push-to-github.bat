@echo off
echo ===================================================
echo   MERCYVISUALS - GitHub Push Helper
echo ===================================================
echo.
cd /d "%~dp0"
set "PATH=C:\Users\user\.gemini\antigravity-ide\tools\mingit\cmd;%PATH%"

echo Checking repository status...
git status
echo.
echo Pushing to https://github.com/wixpartnersonia-star/mercyvisuals.git ...
echo.
git push -u origin main

echo.
echo ===================================================
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Code successfully pushed to GitHub!
) else (
    echo [ERROR] Push failed. Check credentials or network connection.
)
echo ===================================================
pause
