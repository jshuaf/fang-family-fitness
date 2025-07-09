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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="stat-card animate-scale-in">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-primary-100">Total Miles</h3>
          <MapPin className="w-5 h-5 text-primary-200" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">{totalMiles}</div>
        <div className="text-sm text-primary-100">This month</div>
      </div>
      
      <div className="card animate-scale-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Total Runs</h3>
          <Zap className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{totalRuns}</div>
        <div className="text-sm text-gray-500">Activities completed</div>
      </div>
      
      <div className="card animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Active Members</h3>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{totalMembers}</div>
        <div className="text-sm text-gray-500">Family members</div>
      </div>
      
      <div className="card animate-scale-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Current Month</h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-lg font-bold text-gray-900 mb-1">{month}</div>
        <div className="text-sm text-gray-500">Tracking period</div>
      </div>
    </div>
  )
}