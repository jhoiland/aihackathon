#!/bin/bash

# Travel Discovery App - Setup Script for macOS/Linux
# This script installs dependencies and starts the development server

echo ""
echo "==========================================="
echo "  Travel Discovery App - Setup"
echo "==========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo ""
    echo "Please download and install Node.js from: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "Node.js version:"
node --version
echo ""

echo "npm version:"
npm --version
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "✓ Dependencies installed successfully"
echo ""
echo "==========================================="
echo "  Starting Development Server"
echo "==========================================="
echo ""
echo "The app will open at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
