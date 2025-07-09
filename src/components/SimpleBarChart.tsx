'use client'

interface LeaderboardData {
  athlete_name: string
  total_miles: number
  total_runs: number
}

interface SimpleBarChartProps {
  data: LeaderboardData[]
}

const PASTEL_COLORS = [
  '#fecaca', // soft red
  '#fed7aa', // soft orange  
  '#fef3c7', // soft yellow
  '#d9f99d', // soft green
  '#bfdbfe', // soft blue
  '#ddd6fe', // soft purple
]

export default function SimpleBarChart({ data }: SimpleBarChartProps) {
  if (!data || data.length === 0) return null

  const maxMiles = Math.max(...data.map(d => parseFloat(d.total_miles.toString())))
  
  return (
    <div className="mb-20">
      <div className="section-title">Monthly Progress</div>
      
      <div className="space-y-6">
        {data.map((member, index) => {
          const miles = parseFloat(member.total_miles.toString())
          const percentage = (miles / maxMiles) * 100
          
          return (
            <div key={member.athlete_name} className="hover-lift">
              <div className="flex items-center justify-between mb-2">
                <div className="name-display text-sm">
                  {member.athlete_name}
                </div>
                <div className="metric-display text-sm">
                  {miles.toFixed(1)}
                </div>
              </div>
              
              <div className="w-full bg-stone-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: PASTEL_COLORS[index % PASTEL_COLORS.length],
                  }}
                />
              </div>
              
              <div className="text-stone-400 text-xs mt-1">
                {member.total_runs} activities
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}