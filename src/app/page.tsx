'use client'

import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import SimpleBarChart from '@/components/SimpleBarChart'

interface LeaderboardData {
  athlete_name: string
  total_miles: number
  total_runs: number
  avg_distance: number
  longest_run: number
  shortest_run: number
}

interface ActivityData {
  athlete_name: string
  activity_name: string
  distance: number
  duration: number
  last_fetched_at: string
}

interface ApiResponse {
  leaderboard: LeaderboardData[]
  activities: ActivityData[]
  totalMiles: number
  month: string
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = async () => {
    try {
      const response = await fetch('/api/leaderboard')
      const result = await response.json()
      setData(result)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const totalRuns = data?.leaderboard.reduce((sum, member) => sum + parseInt(member.total_runs.toString()), 0) || 0
  const totalMembers = data?.leaderboard.length || 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-5xl mx-auto px-8 py-16">
        
        {/* Header - Editorial Style */}
        <div className="mb-20">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="w-2 h-2 bg-stone-900 rounded-full mt-4"></div>
            <h1 className="text-4xl font-light tracking-tight text-stone-900">
              Fang Family Fitness
            </h1>
          </div>
          <p className="text-stone-600 text-sm ml-5">
            {data?.month || 'Monthly'} running log
          </p>
        </div>

        {data && (
          <>
            {/* Hero Metric - Large Central Display */}
            <div className="mb-24 text-center">
              <div className="section-title">Total Distance This Month</div>
              <div className="metric-display text-9xl leading-none mb-4">
                {data.totalMiles.toFixed(1)}
              </div>
              <div className="text-stone-500 text-sm tracking-wide">
                MILES RUN IN {data.month.toUpperCase()} BY {totalMembers} FAMILY MEMBERS
              </div>
            </div>

            {/* Bar Chart - Clean and Minimal */}
            <SimpleBarChart data={data.leaderboard} />

            {/* Leaderboard - Minimal List */}
            <div className="mb-20">
              <div className="section-title">Leaderboard</div>
              <div className="space-y-0">
                {data.leaderboard.map((member, index) => (
                  <div 
                    key={member.athlete_name}
                    className="py-6 border-b border-stone-200 last:border-b-0 hover-lift"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-8">
                        <div className="mono text-stone-400 text-sm w-8">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <div className="name-display text-lg">
                            {member.athlete_name}
                          </div>
                          <div className="text-stone-500 text-xs mt-1">
                            {member.total_runs} runs • avg {parseFloat(member.avg_distance.toString()).toFixed(1)} mi
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="metric-display text-2xl">
                          {parseFloat(member.total_miles.toString()).toFixed(1)}
                        </div>
                        <div className="text-stone-400 text-xs mt-1">
                          MILES
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid - Minimal */}
            <div className="grid grid-cols-3 gap-12 mb-16">
              <div className="text-center">
                <div className="metric-display text-3xl mb-2">
                  {totalRuns}
                </div>
                <div className="text-stone-500 text-xs tracking-wide">
                  RUNS THIS MONTH
                </div>
              </div>
              <div className="text-center">
                <div className="metric-display text-3xl mb-2">
                  {(data.totalMiles / totalMembers).toFixed(1)}
                </div>
                <div className="text-stone-500 text-xs tracking-wide">
                  AVG PER PERSON
                </div>
              </div>
              <div className="text-center">
                <div className="metric-display text-3xl mb-2">
                  {data.leaderboard.length > 0 ? Math.max(...data.leaderboard.map(m => parseFloat(m.longest_run.toString()))).toFixed(1) : '0.0'}
                </div>
                <div className="text-stone-500 text-xs tracking-wide">
                  LONGEST RUN
                </div>
              </div>
            </div>

            {/* Refresh Button - Minimal */}
            <div className="text-center">
              <button
                onClick={fetchData}
                className="mono text-xs text-stone-600 hover:text-stone-900 transition-colors border-b border-stone-300 hover:border-stone-900 pb-1"
              >
                REFRESH DATA
              </button>
              {lastUpdated && (
                <div className="text-stone-400 text-xs mt-2">
                  Last updated {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>

          </>
        )}
      </div>
    </div>
  )
}