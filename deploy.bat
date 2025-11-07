@echo off
REM GitHub Pages Deployment Script for Money Tracker (Windows)
REM This script helps deploy the Money Tracker to GitHub Pages

echo 🚀 Money Tracker GitHub Pages Deployment Script
echo ==============================================

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
git commit -m "Deploy Money Tracker to GitHub Pages"

REM Push to main branch
echo 📤 Pushing to GitHub...
git push origin main

echo.
echo ✅ Deployment completed!
echo.
echo Next steps:
echo 1. Go to your repository on GitHub
echo 2. Click on Settings tab
echo 3. Scroll down to Pages section
echo 4. Under 'Build and deployment', select 'Source': Deploy from a branch
echo 5. Select 'Branch': main
echo 6. Select 'Folder': / (root)
echo 7. Click Save
echo.
echo Your site will be available at: https://yourusername.github.io/money-tracker/
echo.
echo 🎉 Happy tracking!
pause
