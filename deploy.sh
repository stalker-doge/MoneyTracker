#!/bin/bash

# GitHub Pages Deployment Script for Money Tracker
# This script helps deploy the Money Tracker to GitHub Pages

echo "🚀 Money Tracker GitHub Pages Deployment Script"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    echo "✅ Git repository initialized"
fi

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    echo "❌ No remote origin found."
    echo "Please add your GitHub repository:"
    echo "git remote add origin https://github.com/yourusername/money-tracker.git"
    echo "Replace 'yourusername' with your actual GitHub username."
    exit 1
fi

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy Money Tracker to GitHub Pages"

# Push to main branch
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment completed!"
echo ""
echo "Next steps:"
echo "1. Go to your repository on GitHub"
echo "2. Click on Settings tab"
echo "3. Scroll down to Pages section"
echo "4. Under 'Build and deployment', select 'Source': Deploy from a branch"
echo "5. Select 'Branch': main"
echo "6. Select 'Folder': / (root)"
echo "7. Click Save"
echo ""
echo "Your site will be available at: https://yourusername.github.io/money-tracker/"
echo ""
echo "🎉 Happy tracking!"
