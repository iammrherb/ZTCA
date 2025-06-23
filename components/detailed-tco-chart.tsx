"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export default function DetailedTcoChart({ data, vendor }: { data: any; vendor: string }) {
  const chartData = [
    {
      name: "Licensing",
      value: data.licensing.total,
      fill: "var(--chart-1)",
    },
    {
      name: "Implementation",
      value: data.implementation.total,
      fill: "var(--chart-2)",
    },
    {
      name: "Annual Operations",
      value: data.annual.maintenance * 3, // Assuming 3 years for visualization
      fill: "var(--chart-3)",
    },
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{data.name}</p>
          <p className="text-primary font-bold">${data.value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            {((data.value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% of total
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
