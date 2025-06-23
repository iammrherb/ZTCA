"use client"

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

export default function RadarChartComponent({ vendors }: { vendors: any[] }) {
  // Transform vendor data for radar chart
  const metrics = [
    { name: "Authentication", fullMark: 100 },
    { name: "Authorization", fullMark: 100 },
    { name: "Visibility", fullMark: 100 },
    { name: "Threat Detection", fullMark: 100 },
    { name: "Remediation", fullMark: 100 },
    { name: "Compliance", fullMark: 100 },
  ]

  // Sample data - in a real app, this would come from the actual vendor data
  const chartData = metrics.map((metric) => {
    const dataPoint: any = { name: metric.name }

    vendors.forEach((vendor, index) => {
      // Generate a score between 70-95 for each vendor and metric
      const baseScore = 70 + Math.floor(Math.random() * 25)
      dataPoint[vendor.name] = baseScore
    })

    return dataPoint
  })

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />

        {vendors.map((vendor, index) => (
          <Radar
            key={vendor.name}
            name={vendor.name}
            dataKey={vendor.name}
            stroke={`var(--chart-${index + 1})`}
            fill={`var(--chart-${index + 1})`}
            fillOpacity={0.2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  )
}
