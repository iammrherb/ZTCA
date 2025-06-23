"use client"

import { useMemo } from "react"
import { ResponsiveStream } from "@nivo/stream"
import { NIVO_THEME } from "@/lib/dashboard-data"
import { ChartContainer, DebugChartWrapper } from "./ui"

const ensureArray = (value: any) => (Array.isArray(value) ? value : [])

export function FinancialDeepDive({ data = [], config = {} }: { data: any[]; config: any }) {
  const safeData = ensureArray(data)
  const portnox = safeData.find((v) => v.id === "portnox")
  const validData = safeData.filter((v) => v.financials && v.financials.breakdown && v.shortName)

  const roiTimelineData = useMemo(() => {
    const timeline = []
    if (validData.length > 0) {
      for (let month = 0; month <= 36; month += 3) {
        const monthData: { [key: string]: any } = { month: `Month ${month}` }
        for (const vendor of validData.slice(0, 5)) {
          const monthlyOpex = (vendor.financials.breakdown.opex || 0) / ((config.analysisPeriod || 3) * 12)
          const cumCost = (vendor.financials.breakdown.capex || 0) + monthlyOpex * month
          const cumSavings =
            ((vendor.financials.breakdown.totalSavings || 0) / ((config.analysisPeriod || 3) * 12)) * month
          monthData[vendor.shortName] = Math.round(cumSavings - cumCost)
        }
        timeline.push(monthData)
      }
    }
    return timeline
  }, [validData, config.analysisPeriod])

  const streamKeys = useMemo(
    () =>
      validData
        .slice(0, 5)
        .map((v) => v.shortName)
        .filter(Boolean),
    [validData],
  )

  if (safeData.length === 0) return <div className="chart-placeholder">Loading Financial Deep Dive Analysis...</div>
  if (!portnox || !portnox.financials) return <div className="chart-placeholder">Loading Portnox Financial Data...</div>

  return (
    <div className="space-y-8">
      <ChartContainer title="Cumulative ROI Timeline" description="Net benefit progression over 36 months">
        <div style={{ height: 400 }}>
          <DebugChartWrapper chartName="ROI Stream Chart" data={roiTimelineData} keys={streamKeys}>
            <ResponsiveStream
              data={roiTimelineData}
              keys={streamKeys}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45,
                legend: "Timeline",
                legendOffset: 45,
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Cumulative Value (USD)",
                legendOffset: -50,
                format: (v) => `$${(v as number) / 1000}K`,
              }}
              offsetType="diverging"
              colors={(d: any) => validData.find((v) => v.shortName === d.id)?.color || "#666"}
              theme={NIVO_THEME}
              animate={true}
              motionConfig="gentle"
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  translateX: 100,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: "#999",
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [{ on: "hover", style: { itemTextColor: "#fff" } }],
                },
              ]}
            />
          </DebugChartWrapper>
        </div>
      </ChartContainer>
    </div>
  )
}
