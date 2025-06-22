"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ImplementationTimelineChart({ vendor }: { vendor: any }) {
  // Create timeline data based on vendor complexity
  const getTimelineData = () => {
    const duration = vendor.implementation.duration
    const complexity = vendor.implementation.complexity

    if (complexity === "Low") {
      return [
        { phase: "Planning", weeks: 1, effort: 20 },
        { phase: "Setup", weeks: 1, effort: 40 },
        { phase: "Testing", weeks: 1, effort: 30 },
        { phase: "Deployment", weeks: 1, effort: 60 },
      ]
    } else if (complexity === "Medium" || complexity === "Medium-High") {
      return [
        { phase: "Planning", weeks: 2, effort: 30 },
        { phase: "Infrastructure", weeks: 4, effort: 80 },
        { phase: "Configuration", weeks: 3, effort: 70 },
        { phase: "Testing", weeks: 2, effort: 50 },
        { phase: "Training", weeks: 2, effort: 40 },
        { phase: "Deployment", weeks: 1, effort: 60 },
      ]
    } else {
      return [
        { phase: "Planning", weeks: 3, effort: 40 },
        { phase: "Infrastructure", weeks: 6, effort: 90 },
        { phase: "Configuration", weeks: 4, effort: 85 },
        { phase: "Integration", weeks: 3, effort: 75 },
        { phase: "Testing", weeks: 3, effort: 60 },
        { phase: "Training", weeks: 4, effort: 50 },
        { phase: "Deployment", weeks: 2, effort: 70 },
      ]
    }
  }

  const timelineData = getTimelineData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={timelineData} layout="horizontal" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, "dataMax"]} />
        <YAxis dataKey="phase" type="category" />
        <Tooltip
          formatter={(value: number, name: string) => [
            name === "weeks" ? `${value} weeks` : `${value}% effort`,
            name === "weeks" ? "Duration" : "Effort Level",
          ]}
          labelStyle={{ color: "var(--foreground)" }}
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
          }}
        />
        <Bar dataKey="weeks" fill="var(--chart-1)" />
        <Bar dataKey="effort" fill="var(--chart-2)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
