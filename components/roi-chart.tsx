"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function RoiChart({ data, years }: { data: any; years: number }) {
  // Transform data for chart
  const chartData = []

  // Add initial investment point
  chartData.push({
    year: 0,
    investment: 0,
    savings: 0,
    netBenefit: 0,
  })

  // Calculate cumulative values for each year
  let cumulativeInvestment = 0
  let cumulativeSavings = 0

  for (let i = 1; i <= years; i++) {
    const yearKey = `savingsYear${i}` as keyof typeof data
    const yearSavings = (data[yearKey] as number) || 0

    // Assume investment is spread evenly across years
    const yearlyInvestment = i === 1 ? (data.totalCost / years) * 1.5 : data.totalCost / years

    cumulativeInvestment += yearlyInvestment
    cumulativeSavings += yearSavings

    chartData.push({
      year: i,
      investment: cumulativeInvestment,
      savings: cumulativeSavings,
      netBenefit: cumulativeSavings - cumulativeInvestment,
    })
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorNetBenefit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value}`} />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString()}`]}
          labelFormatter={(value) => `Year ${value}`}
          labelStyle={{ color: "var(--foreground)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="investment"
          name="Investment"
          stroke="var(--chart-1)"
          fillOpacity={1}
          fill="url(#colorInvestment)"
        />
        <Area
          type="monotone"
          dataKey="savings"
          name="Savings"
          stroke="var(--chart-2)"
          fillOpacity={1}
          fill="url(#colorSavings)"
        />
        <Area
          type="monotone"
          dataKey="netBenefit"
          name="Net Benefit"
          stroke="var(--chart-3)"
          fillOpacity={1}
          fill="url(#colorNetBenefit)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
