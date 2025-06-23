"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"

export default function RoiTimelineChart({ data, years }: { data: any; years: number }) {
  const chartData = []
  let cumulativeCost = data.implementation.total
  let cumulativeSavings = 0

  // Initial point
  chartData.push({
    period: "Implementation",
    "Cumulative Cost": cumulativeCost,
    "Cumulative Savings": 0,
    "Net Position": -cumulativeCost,
  })

  // Yearly progression
  for (let i = 1; i <= years; i++) {
    cumulativeCost += data.annual.total
    cumulativeSavings += data.insurance.annualSavings

    chartData.push({
      period: `Year ${i}`,
      "Cumulative Cost": cumulativeCost,
      "Cumulative Savings": cumulativeSavings,
      "Net Position": cumulativeSavings - cumulativeCost,
    })
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value}`} />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString()}`]}
          labelStyle={{ color: "var(--foreground)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="Cumulative Cost"
          stroke="var(--chart-1)"
          fillOpacity={1}
          fill="url(#colorCost)"
        />
        <Area
          type="monotone"
          dataKey="Cumulative Savings"
          stroke="var(--chart-2)"
          fillOpacity={1}
          fill="url(#colorSavings)"
        />
        <Area type="monotone" dataKey="Net Position" stroke="#22c55e" fillOpacity={1} fill="url(#colorNet)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
