'use client'

import { Calendar, MapPin, Clock, Zap } from 'lucide-react'

interface StatsCardProps {
  totalMiles: number
  month: string
  totalRuns: number
  totalMembers: number
}

export default function StatsCard({ totalMiles, month, totalRuns, totalMembers }: StatsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div className="stat-card animate-scale-in glow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white/80">Total Miles</h3>
          <MapPin className="w-6 h-6 text-white/60" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{totalMiles.toFixed(2)}</div>
        <div className="text-sm text-white/70">All time</div>
      </div>
      
      <div className="card animate-scale-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white/80">Total Runs</h3>
          <Zap className="w-6 h-6 text-purple-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{totalRuns}</div>
        <div className="text-sm text-white/70">Activities completed</div>
      </div>
      
      <div className="card animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white/80">Active Members</h3>
          <Clock className="w-6 h-6 text-pink-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{totalMembers}</div>
        <div className="text-sm text-white/70">Family members</div>
      </div>
      
      <div className="card animate-scale-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white/80">Avg per Person</h3>
          <Calendar className="w-6 h-6 text-orange-400" />
        </div>
        <div className="text-4xl font-bold text-white mb-2">{(totalMiles / totalMembers).toFixed(1)}</div>
        <div className="text-sm text-white/70">miles per member</div>
      </div>
    </div>
  )
}