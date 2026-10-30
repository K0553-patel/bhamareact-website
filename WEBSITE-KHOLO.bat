@echo off
title Bhama Industries Website
cd /d "%~dp0"

echo.
echo ========================================
echo   Bhama Industries - Website khul rahi hai
echo ========================================
echo.

echo [1/3] Website build ho rahi hai...
call npm run build
if errorlevel 1 (
    echo Build fail ho gayi. Node.js install hai ya nahi check karein.
    pause
    exit /b 1
)

echo.
echo [2/3] Backend API start ho rahi hai...
start "Bhama Industries Backend" /D "%~dp0backend" cmd /k npm start

echo.
echo [3/3] Browser mein khol rahe hain...
echo Frontend band karne ke liye is window ko band kar dein.
echo.

cd vite-project
start http://127.0.0.1:4173/
call npx vite preview --host 127.0.0.1 --port 4173

pause
