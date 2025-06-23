"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function FeatureScoreChart({ vendors, categories }: { vendors: any[]; categories: string[] }) {
  // Calculate average scores by category for each vendor
  const chartData = categories.map((category) => {
    const dataPoint: any = { category }

    vendors.forEach((vendor) => {
      const categoryFeatures = Object.entries(vendor.features).filter(
        ([_, featureData]: [string, any]) => featureData.category === category,
      )

      if (categoryFeatures.length > 0) {
        const avgScore =
          categoryFeatures.reduce((sum, [_, featureData]: [string, any]) => sum + featureData.score, 0) /
          categoryFeatures.length

        dataPoint[vendor.name] = avgScore
      } else {
        dataPoint[vendor.name] = 0
      }
    })

    return dataPoint
  })

  const colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
        <YAxis domain={[0, 5]} />
        <Tooltip
          formatter={(value: number) => [value.toFixed(1), "Score"]}
          labelStyle={{ color: "var(--foreground)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <Legend />
        {vendors.map((vendor, index) => (
          <Bar key={vendor.name} dataKey={vendor.name} fill={colors[index % colors.length]} radius={[2, 2, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
