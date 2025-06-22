"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

export default function IndustryRiskChart({ riskFactors }: { riskFactors: any }) {
  const chartData = Object.entries(riskFactors).map(([key, value]) => ({
    factor: key.replace(/([A-Z])/g, " $1").trim(),
    score: value,
    fullMark: 100,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="factor" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar name="Risk Score" dataKey="score" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
