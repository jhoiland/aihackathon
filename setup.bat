@echo off
REM Travel Discovery App - Setup Script for Windows
REM This script installs dependencies and starts the development server

echo.
echo ============================================
echo   Travel Discovery App - Setup
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo.
    echo Please download and install Node.js from: https://nodejs.org/
    echo Make sure to select "Add to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check npm version
echo npm version:
npm --version
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed successfully
echo.
echo ============================================
echo   Starting Development Server
echo ============================================
echo.
echo The app will open at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
call npm run dev

pause
