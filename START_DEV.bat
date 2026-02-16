@echo off
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║          RESTARTING DEV SERVER WITH ENV VARIABLES          ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Kill any existing node processes
echo Killing existing dev server...
taskkill /F /IM node.exe 2>nul

REM Wait a moment
timeout /t 2 /nobreak

echo.
echo Starting dev server...
cd /d E:\Ihub\New folder\kprcas-spark
npm run dev

pause

