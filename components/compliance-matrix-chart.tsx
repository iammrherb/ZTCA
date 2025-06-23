"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ComplianceMatrixChart({ vendors, industry }: { vendors: any[]; industry: any }) {
  const complianceStandards = industry.compliance

  const data = complianceStandards.map((standard) => {
    const dataPoint = { standard }
    vendors.forEach((vendor) => {
      // Generate compliance scores based on vendor characteristics
      let score = vendor.complianceScore
      if (standard.includes("HIPAA") || standard.includes("PCI")) score = Math.min(100, score + 3)
      if (standard.includes("NIST")) score = vendor.name === "Portnox" ? 95 : Math.max(80, score - 2)
      if (standard.includes("ISO")) score = Math.max(75, score - 5)

      dataPoint[vendor.name] = score
    })
    return dataPoint
  })

  const colors = ["#0066cc", "#1ba1e2", "#ff6900", "#00a651", "#7b68ee", "#ff4500"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="standard" />
        <YAxis domain={[0, 100]} />
        <Tooltip
          formatter={(value: number, name: string) => [`${value}%`, name]}
          labelStyle={{ color: "var(--foreground)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        {vendors.map((vendor, index) => (
          <Bar key={vendor.name} dataKey={vendor.name} fill={colors[index] || vendor.color} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
