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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-orange-900/20"></div>
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl glow">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-gradient">
              Fang Family Fitness
            </h1>
          </div>
          <p className="text-gray-400 text-xl">
            Tracking our family's fitness journey together
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold glow"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Data
            </button>
            
            {lastUpdated && (
              <div className="text-sm text-gray-400">
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

          </>
        )}
      </div>
    </div>
  )
}