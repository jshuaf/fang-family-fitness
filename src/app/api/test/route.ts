import { NextResponse } from 'next/server'

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL
  
  return NextResponse.json({
    hasDatabase: !!databaseUrl,
    databaseStatus: databaseUrl ? 'Connected' : 'Missing',
    timestamp: new Date().toISOString(),
    // Don't expose the full URL for security, just show if it exists
    preview: databaseUrl ? `${databaseUrl.substring(0, 20)}...` : 'Not set'
  })
}