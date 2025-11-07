#!/bin/bash

# Vercel Deployment Script for Money Tracker
# This script helps deploy the Money Tracker to Vercel

echo "🚀 Money Tracker Vercel Deployment Script"
echo "========================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found."
    echo "Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI. Please install manually:"
        echo "npm install -g vercel"
        exit 1
    fi
    echo "✅ Vercel CLI installed successfully"
fi

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
git commit -m "Deploy Money Tracker to Vercel"

# Push to main branch
echo "📤 Pushing to GitHub..."
git push origin main

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment completed!"
echo ""
echo "Your site is now live on Vercel!"
echo "Check your Vercel dashboard for the deployment URL."
echo ""
echo "Next steps:"
echo "1. Visit your Vercel dashboard"
echo "2. Configure custom domain (optional)"
echo "3. Enable Vercel Analytics (optional)"
echo "4. Test your deployed application"
echo ""
echo "🎉 Happy tracking!"
