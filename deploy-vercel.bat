@echo off
REM Vercel Deployment Script for Money Tracker (Windows)
REM This script helps deploy Money Tracker to Vercel

echo 🚀 Money Tracker Vercel Deployment Script
echo ========================================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found.
    echo Installing Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Vercel CLI. Please install manually:
        echo npm install -g vercel
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI installed successfully
)

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Initializing...
    git init
    echo ✅ Git repository initialized
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ No remote origin found.
    echo Please add your GitHub repository:
    echo git remote add origin https://github.com/yourusername/money-tracker.git
    echo Replace 'yourusername' with your actual GitHub username.
    pause
    exit /b 1
)

REM Add all files
echo 📁 Adding files to git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Deploy Money Tracker to Vercel"

REM Push to main branch
echo 📤 Pushing to GitHub...
git push origin main

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

echo.
echo ✅ Deployment completed!
echo.
echo Your site is now live on Vercel!
echo Check your Vercel dashboard for deployment URL.
echo.
echo Next steps:
echo 1. Visit your Vercel dashboard
echo 2. Configure custom domain (optional)
echo 3. Enable Vercel Analytics (optional)
echo 4. Test your deployed application
echo.
echo 🎉 Happy tracking!
pause
