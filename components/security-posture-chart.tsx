"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts"

export default function SecurityPostureChart({ vendors }: { vendors: any[] }) {
  const securityMetrics = [
    "Access Control",
    "Threat Detection",
    "Compliance",
    "Visibility",
    "Automation",
    "Integration",
  ]

  const data = securityMetrics.map((metric) => {
    const dataPoint = { metric }
    vendors.forEach((vendor) => {
      // Generate realistic scores based on vendor characteristics
      let score = vendor.securityScore
      if (metric === "Access Control") score = Math.min(100, score + 2)
      if (metric === "Threat Detection") score = Math.max(70, score - 5)
      if (metric === "Compliance") score = vendor.complianceScore
      if (metric === "Visibility") score = vendor.name === "Portnox" ? 95 : Math.max(75, score - 3)
      if (metric === "Automation")
        score = vendor.type === "Cloud-Native" ? Math.min(100, score + 5) : Math.max(70, score - 8)
      if (metric === "Integration") score = Math.max(65, score - 10)

      dataPoint[vendor.name] = score
    })
    return dataPoint
  })

  const colors = ["#0066cc", "#1ba1e2", "#ff6900", "#00a651", "#7b68ee", "#ff4500"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        {vendors.map((vendor, index) => (
          <Radar
            key={vendor.name}
            name={vendor.name}
            dataKey={vendor.name}
            stroke={colors[index] || vendor.color}
            fill={colors[index] || vendor.color}
            fillOpacity={0.1}
            strokeWidth={2}
          />
        ))}
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}
