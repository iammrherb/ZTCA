"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function VendorRankingChart({ vendors, showWeighted }: { vendors: any[]; showWeighted: boolean }) {
  const chartData = vendors
    .map((vendor) => ({
      name: vendor.name,
      score: showWeighted ? vendor.weightedScore : vendor.overallScore,
      logo: vendor.logo,
    }))
    .sort((a, b) => b.score - a.score)

  const getBarColor = (score: number) => {
    if (score >= 90) return "#22c55e" // green
    if (score >= 80) return "#3b82f6" // blue
    if (score >= 70) return "#f59e0b" // yellow
    if (score >= 60) return "#f97316" // orange
    return "#ef4444" // red
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{data.logo}</span>
            <span className="font-medium">{data.name}</span>
          </div>
          <p className="text-lg font-bold" style={{ color: getBarColor(data.score) }}>
            {data.score.toFixed(1)} / 100
          </p>
          <p className="text-xs text-muted-foreground">{showWeighted ? "Weighted Score" : "Overall Score"}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} layout="horizontal" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="score" radius={[0, 4, 4, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
