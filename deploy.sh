#!/bin/bash

# Fang Family Fitness - Deployment Script

echo "🚀 Deploying Fang Family Fitness to Vercel..."

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🎉 Your Fang Family Fitness dashboard is live!"

# Instructions for setting up environment variables
echo ""
echo "🔧 Don't forget to set up your environment variables in Vercel:"
echo "   DATABASE_URL=postgresql://postgres:strava@db.urkrmvdjxnmvtoyoogrm.supabase.co:5432/postgres"
echo ""
echo "📝 To set environment variables in Vercel:"
echo "   1. Go to your project dashboard on vercel.com"
echo "   2. Go to Settings -> Environment Variables"
echo "   3. Add DATABASE_URL with your Supabase connection string"
echo "   4. Redeploy the project"