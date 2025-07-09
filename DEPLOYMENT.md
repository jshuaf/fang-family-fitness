# 🚀 Deployment Instructions

## Quick Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy Button
Click this button to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjshuaf%2Ffang-family-fitness&env=DATABASE_URL&envDescription=Supabase%20PostgreSQL%20connection%20string&envLink=https%3A%2F%2Fsupabase.com&project-name=fang-family-fitness&repository-name=fang-family-fitness)

### Option 2: Manual Import
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. **Import Git Repository**: `jshuaf/fang-family-fitness`
4. **Framework**: Next.js (auto-detected)
5. **Add Environment Variable**:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:strava@db.urkrmvdjxnmvtoyoogrm.supabase.co:5432/postgres`
6. Click **"Deploy"**

### Option 3: Vercel CLI
```bash
# Login first
vercel login

# Deploy
vercel

# Add environment variable
vercel env add DATABASE_URL
# Paste: postgresql://postgres:strava@db.urkrmvdjxnmvtoyoogrm.supabase.co:5432/postgres

# Redeploy with env vars
vercel --prod
```

## 🎯 Expected Result
- **Live URL**: `fang-family-fitness-xxx.vercel.app`
- **Auto-deployments** on every GitHub push
- **Dashboard** showing Fang Family Fitness leaderboard

## 🔧 Environment Variables Required
| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres:strava@db.urkrmvdjxnmvtoyoogrm.supabase.co:5432/postgres` |

## 📱 Features
- Real-time leaderboard
- Interactive charts
- Mobile responsive
- Automatic data refresh