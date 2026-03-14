@echo off
REM This script starts both the email server and the Vite dev server

echo.
echo ===============================================
echo   TEDx KPRCAS - Starting Development Servers
echo ===============================================
echo.

REM Start email server in a new terminal
echo [1/2] Starting Email Server (Nodemailer)...
start cmd /k "cd server && npm run dev"

REM Wait a second for the email server to start
timeout /t 2 /nobreak

REM Start Vite dev server in a new terminal
echo [2/2] Starting Frontend Server (Vite)...
start cmd /k "npm run dev"

echo.
echo ===============================================
echo   Servers Starting...
echo ===============================================
echo.
echo Email Server:  http://localhost:3001
echo Frontend:     http://localhost:5173
echo.
echo Press Ctrl+C in each terminal to stop the servers.
echo.
