"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function IndustryComplianceChart({ industry }: { industry: any }) {
  const chartData = industry.compliance.map((comp: any) => ({
    name: comp.standard,
    controls: comp.nacControls.length,
    criticality: comp.criticality,
    color: comp.criticality === "Critical" ? "#ef4444" : comp.criticality === "High" ? "#f97316" : "#eab308",
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{label}</p>
          <p className="text-sm">NAC Controls: {data.controls}</p>
          <p className="text-sm">Criticality: {data.criticality}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="controls" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
