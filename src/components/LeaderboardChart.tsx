'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface LeaderboardData {
  athlete_name: string
  total_miles: number
  total_runs: number
  avg_distance: number
  longest_run: number
  shortest_run: number
}

interface LeaderboardChartProps {
  data: LeaderboardData[]
}

const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

export default function LeaderboardChart({ data }: LeaderboardChartProps) {
  const chartData = data.map((item, index) => ({
    name: item.athlete_name.split(' ')[0], // First name only
    miles: parseFloat(item.total_miles.toString()),
    runs: parseInt(item.total_runs.toString()),
    rank: index + 1,
    fullName: item.athlete_name
  }))

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Progress</h3>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={{ value: 'Miles', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                      <p className="font-semibold text-gray-900">{data.fullName}</p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{data.miles} miles</span> • {data.runs} runs
                      </p>
                      <p className="text-xs text-gray-500">Rank #{data.rank}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="miles" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}