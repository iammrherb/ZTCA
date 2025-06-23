"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function VendorComparisonChart({ data, years }: { data: any[]; years: number }) {
  const chartData = data.map(({ vendor, costs }) => ({
    name: vendor.name,
    "Total Cost": costs.totals.netCost,
    Implementation: costs.implementation.total,
    "Annual Cost": costs.annual.total,
    color: vendor.color,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          tickFormatter={(value) =>
            `$${value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value}`
          }
        />
        <Tooltip
          formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
          labelStyle={{ color: "var(--foreground)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <Legend />
        <Bar dataKey="Total Cost" fill="var(--chart-1)" />
        <Bar dataKey="Implementation" fill="var(--chart-2)" />
        <Bar dataKey="Annual Cost" fill="var(--chart-3)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
