"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function CyberInsuranceChart({ data, industry }: { data: any; industry: string }) {
  const chartData = [
    {
      scenario: "Without NAC",
      premium: data.withoutNAC,
      risk: "High",
      color: "#ef4444",
    },
    {
      scenario: "With NAC",
      premium: data.withNAC,
      risk: "Low",
      color: "#22c55e",
    },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{label}</p>
          <p className="text-lg font-bold" style={{ color: data.color }}>
            ${data.premium.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Annual Premium</p>
          <p className="text-sm">Risk Level: {data.risk}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-medium">Cyber Insurance Impact - {industry}</h3>
        <p className="text-sm text-muted-foreground">Annual premium comparison with and without NAC implementation</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="scenario" />
          <YAxis tickFormatter={(value) => `$${value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value}`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="premium" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
          <span className="font-medium">Annual Savings: ${data.annualSavings.toLocaleString()}</span>
          <span className="text-green-600">↓ 70% reduction</span>
        </div>
      </div>
    </div>
  )
}
