"use client"

import { Tooltip, ResponsiveContainer, Treemap } from "recharts"

export default function ComplianceHeatmap({
  data,
  standards,
}: {
  data: any[]
  standards: { id: string; name: string }[]
}) {
  // Transform data for treemap
  const transformedData = {
    name: "compliance",
    children: data.map((vendor) => ({
      name: vendor.vendor,
      children: standards.map((standard) => ({
        name: standard.name,
        size: vendor[standard.id],
        value: vendor[standard.id],
        standardId: standard.id,
      })),
    })),
  }

  // Color scale based on compliance percentage
  const getColor = (value: number) => {
    if (value >= 90) return "#22c55e" // green-500
    if (value >= 80) return "#10b981" // emerald-500
    if (value >= 70) return "#eab308" // yellow-500
    if (value >= 60) return "#f97316" // orange-500
    return "#ef4444" // red-500
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">Vendor: {data.root.name}</p>
          <p className="text-sm font-medium mt-1">{data.value.toFixed(0)}% Compliant</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        data={transformedData}
        dataKey="size"
        aspectRatio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent />}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  )
}

// Color scale based on compliance percentage
const getColor = (value: number) => {
  if (value >= 90) return "#22c55e" // green-500
  if (value >= 80) return "#10b981" // emerald-500
  if (value >= 70) return "#eab308" // yellow-500
  if (value >= 60) return "#f97316" // orange-500
  return "#ef4444" // red-500
}

// Custom treemap cell content
const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, name, value, standardId } = props

  // Only render cells for the standards (depth 2)
  if (depth !== 2) return null

  // Color based on compliance percentage
  const color = getColor(value)

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: "#fff",
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
      {width > 50 && height > 30 ? (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 12,
            fontWeight: "bold",
            fill: value > 70 ? "#000" : "#fff",
            pointerEvents: "none",
          }}
        >
          {name}
        </text>
      ) : null}
      {width > 50 && height > 50 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 14}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 11,
            fill: value > 70 ? "#000" : "#fff",
            pointerEvents: "none",
          }}
        >
          {`${value.toFixed(0)}%`}
        </text>
      ) : null}
    </g>
  )
}
