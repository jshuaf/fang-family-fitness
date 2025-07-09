# 🏃‍♀️ Fang Family Fitness Dashboard

A beautiful, modern dashboard to track your family's fitness journey together.

## 🚀 Deploy Now

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjshuaf%2Ffang-family-fitness&env=DATABASE_URL&envDescription=Supabase%20PostgreSQL%20connection%20string&project-name=fang-family-fitness&repository-name=fang-family-fitness)

**Environment Variable Required:**
- `DATABASE_URL`: `postgresql://postgres:strava@db.urkrmvdjxnmvtoyoogrm.supabase.co:5432/postgres`

## Features

- **Real-time Leaderboard**: See who's leading the family fitness challenge
- **Interactive Bar Chart**: Visual representation of miles run by each family member
- **Detailed Statistics**: Miles, runs, averages, and personal bests
- **Recent Activities**: Latest activities from all family members
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Polished UI with thoughtful micro-interactions

## Deployment

### Deploy to Vercel

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in Vercel:
   - `DATABASE_URL`: Your Supabase PostgreSQL connection string

3. Deploy:
```bash
vercel
```

### Environment Variables

Create a `.env.local` file with:
```
DATABASE_URL=postgresql://postgres:strava@db.urkrmvdjxnmvtoyoogrm.supabase.co:5432/postgres
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful charts and graphs
- **Lucide React** - Clean, consistent icons
- **PostgreSQL** - Database via Supabase

## Design Features

- **Modern Design**: Clean, professional look with subtle gradients
- **Responsive Layout**: Works on all screen sizes
- **Smooth Animations**: Staggered animations for lists and cards
- **Interactive Elements**: Hover effects and transitions
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Performance**: Optimized bundle size and fast loading