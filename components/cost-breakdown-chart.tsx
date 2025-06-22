"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function CostBreakdownChart({ data, years }: { data: any; years: number }) {
  const chartData = [
    {
      category: "Implementation",
      Setup: data.implementation.setup,
      Training: data.implementation.training,
      Infrastructure: data.implementation.infrastructure,
    },
    {
      category: "Year 1",
      Licensing: data.licensing.annual,
      Maintenance: data.annual.maintenance,
      "Insurance Savings": -data.insurance.annualSavings,
    },
    {
      category: "Year 2",
      Licensing: data.licensing.annual,
      Maintenance: data.annual.maintenance,
      "Insurance Savings": -data.insurance.annualSavings,
    },
    {
      category: "Year 3",
      Licensing: data.licensing.annual,
      Maintenance: data.annual.maintenance,
      "Insurance Savings": -data.insurance.annualSavings,
    },
  ].slice(0, years + 1)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis
          tickFormatter={(value) =>
            `$${Math.abs(value) >= 1000 ? `${(Math.abs(value) / 1000).toFixed(0)}K` : Math.abs(value)}`
          }
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            `${value < 0 ? "-" : ""}$${Math.abs(value).toLocaleString()}`,
            name,
          ]}
          labelStyle={{ color: "var(--foreground)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <Legend />
        <Bar dataKey="Setup" stackId="a" fill="var(--chart-1)" />
        <Bar dataKey="Training" stackId="a" fill="var(--chart-2)" />
        <Bar dataKey="Infrastructure" stackId="a" fill="var(--chart-3)" />
        <Bar dataKey="Licensing" stackId="a" fill="var(--chart-4)" />
        <Bar dataKey="Maintenance" stackId="a" fill="var(--chart-5)" />
        <Bar dataKey="Insurance Savings" stackId="a" fill="#22c55e" />
      </BarChart>
    </ResponsiveContainer>
  )
}
