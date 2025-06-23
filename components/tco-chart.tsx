"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function TcoChart({ data, years }: { data: any; years: number }) {
  // Transform data for chart
  const chartData = [
    {
      name: "Initial Cost",
      value: data.initialCost,
      fill: "var(--chart-1)",
    },
    {
      name: "Annual Cost",
      value: data.annualCost * years,
      fill: "var(--chart-2)",
    },
  ]

  if (data.trainingCost > 0) {
    chartData.push({
      name: "Training",
      value: data.trainingCost,
      fill: "var(--chart-3)",
    })
  }

  if (data.maintenanceCost > 0) {
    chartData.push({
      name: "Maintenance",
      value: data.maintenanceCost * years,
      fill: "var(--chart-4)",
    })
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value}`} />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString()}`, "Cost"]}
          labelStyle={{ color: "var(--foreground)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <Legend />
        <Bar dataKey="value" name="Cost" />
      </BarChart>
    </ResponsiveContainer>
  )
}
