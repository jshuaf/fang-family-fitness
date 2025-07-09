import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function GET() {
  try {
    // Debug environment variable
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not found in environment variables')
      return NextResponse.json({ 
        error: 'Database configuration missing', 
        details: 'DATABASE_URL environment variable not set' 
      }, { status: 500 })
    }

    const client = await pool.connect()
    
    // Get current month start and end dates
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    
    console.log('Current month filter:', monthStart, 'to', nextMonth)
    
    // Get leaderboard data for current month only
    const leaderboardResult = await client.query(`
      SELECT 
        athlete_name,
        COUNT(*) as total_runs,
        ROUND(SUM(distance)::numeric, 2) as total_miles,
        ROUND(AVG(distance)::numeric, 2) as avg_distance,
        ROUND(MAX(distance)::numeric, 2) as longest_run,
        ROUND(MIN(distance)::numeric, 2) as shortest_run
      FROM activities 
      WHERE last_fetched_at >= $1 AND last_fetched_at < $2
      GROUP BY athlete_name
      ORDER BY total_miles DESC, total_runs DESC
    `, [monthStart, nextMonth])
    
    // Get individual activities for chart data - current month
    const activitiesResult = await client.query(`
      SELECT 
        athlete_name,
        activity_name,
        activity_type,
        ROUND(distance::numeric, 2) as distance,
        duration,
        last_fetched_at
      FROM activities 
      WHERE last_fetched_at >= $1 AND last_fetched_at < $2
      ORDER BY last_fetched_at DESC
    `, [monthStart, nextMonth])
    
    // Calculate total miles for all family members
    const totalMiles = leaderboardResult.rows.reduce((sum, row) => sum + parseFloat(row.total_miles), 0)
    
    client.release()
    
    return NextResponse.json({
      leaderboard: leaderboardResult.rows,
      activities: activitiesResult.rows,
      totalMiles: Math.round(totalMiles * 100) / 100,
      month: now.toLocaleString('default', { month: 'long', year: 'numeric' })
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}