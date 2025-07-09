'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, Heart, Activity } from 'lucide-react'
import LeaderboardChart from '@/components/LeaderboardChart'
import LeaderboardTable from '@/components/LeaderboardTable'
import StatsCard from '@/components/StatsCard'

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

  const totalRuns = data?.leaderboard.reduce((sum, member) => sum + member.total_runs, 0) || 0
  const totalMembers = data?.leaderboard.length || 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary-500 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gradient">
              Fang Family Fitness
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Tracking our family's fitness journey together
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
            
            {lastUpdated && (
              <div className="text-sm text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {data && (
          <>
            {/* Stats Cards */}
            <StatsCard 
              totalMiles={data.totalMiles}
              month={data.month}
              totalRuns={totalRuns}
              totalMembers={totalMembers}
            />

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart */}
              <div className="animate-slide-up">
                <LeaderboardChart data={data.leaderboard} />
              </div>

              {/* Leaderboard Table */}
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <LeaderboardTable data={data.leaderboard} />
              </div>
            </div>

            {/* Recent Activities */}
            <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Activity className="w-4 h-4" />
                    <span>Latest runs</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {data.activities.slice(0, 8).map((activity, index) => (
                    <div 
                      key={`${activity.athlete_name}-${index}`}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{activity.athlete_name}</div>
                        <div className="text-sm text-gray-600">{activity.activity_name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{activity.distance.toFixed(2)} mi</div>
                        <div className="text-sm text-gray-500">
                          {Math.floor(activity.duration / 60)}m {activity.duration % 60}s
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}