"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function ThreatImpactChart({ data }: { data: Record<string, { withoutNAC: number; withNAC: number }> }) {
  // Transform data for chart
  const chartData = Object.entries(data).map(([threat, values]) => ({
    name: threat,
    withoutNAC: values.withoutNAC,
    withNAC: values.withNAC,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="name" type="category" />
        <Tooltip
          formatter={(value: number) => [`${value}% Risk`]}
          labelStyle={{ color: "var(--foreground)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <Legend />
        <Bar dataKey="withoutNAC" name="Without NAC" fill="var(--destructive)" />
        <Bar dataKey="withNAC" name="With NAC" fill="var(--primary)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
