"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

export default function SecurityRadarChart({ data }: { data: Record<string, number> }) {
  // Transform data for radar chart
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    fullMark: 100,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Security Score" dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
