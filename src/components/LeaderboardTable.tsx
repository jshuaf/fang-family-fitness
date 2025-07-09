'use client'

import { Trophy, Award, Medal, Target, Activity, TrendingUp } from 'lucide-react'

interface LeaderboardData {
  athlete_name: string
  total_miles: number
  total_runs: number
  avg_distance: number
  longest_run: number
  shortest_run: number
}

interface LeaderboardTableProps {
  data: LeaderboardData[]
}

export default function LeaderboardTable({ data }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Award className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-orange-500" />
      default:
        return <Target className="w-5 h-5 text-blue-500" />
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'badge badge-gold'
      case 2:
        return 'badge badge-silver'
      case 3:
        return 'badge badge-bronze'
      default:
        return 'badge badge-default'
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-2xl font-bold text-white">Leaderboard</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Activity className="w-5 h-5" />
          <span>{data.length} members</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {data.map((member, index) => (
          <div 
            key={member.athlete_name}
            className="leaderboard-item animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {getRankIcon(index + 1)}
                <span className={getRankBadge(index + 1)}>
                  #{index + 1}
                </span>
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-xl text-white">{member.athlete_name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{member.total_runs} runs</span>
                  </div>
                  <div>
                    Avg: {parseFloat(member.avg_distance.toString()).toFixed(2)}mi
                  </div>
                  <div>
                    Best: {parseFloat(member.longest_run.toString()).toFixed(2)}mi
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                {parseFloat(member.total_miles.toString()).toFixed(2)}
              </div>
              <div className="text-sm text-gray-400">miles</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}