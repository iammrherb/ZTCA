"use client"

import { useMemo } from "react"
import { ResponsiveHeatMap } from "@nivo/heatmap"
import { MASTER_DATA, NIVO_THEME } from "@/lib/dashboard-data"
import { ChartContainer, DebugChartWrapper } from "./ui"

const ensureArray = (value: any) => (Array.isArray(value) ? value : [])

export function ComplianceMatrix({ data = [], config = {} }: { data: any[]; config: any }) {
  const safeData = ensureArray(data)
  const portnox = safeData.find((v) => v.id === "portnox")
  const vendorComplianceRawData = useMemo(
    () =>
      safeData
        .filter((vendor) => vendor.compliance && vendor.shortName)
        .slice(0, 8)
        .map((vendor) => ({
          vendor: vendor.shortName,
          ...Object.keys(MASTER_DATA.compliance).reduce(
            (acc, key) => ({ ...acc, [key]: vendor.compliance?.[key as keyof typeof vendor.compliance] || 0 }),
            {},
          ),
        })),
    [safeData],
  )

  const complianceHeatmapKeys = useMemo(() => Object.keys(MASTER_DATA.compliance), [])

  if (safeData.length === 0) return <div className="chart-placeholder">Loading Compliance Matrix Analysis...</div>
  if (!portnox || !portnox.compliance)
    return <div className="chart-placeholder">Loading Portnox Compliance Data...</div>

  return (
    <div className="space-y-8">
      <ChartContainer
        title="Vendor Compliance Comparison Matrix"
        description="Comprehensive compliance coverage across all standards"
      >
        <div style={{ height: 600, overflowX: "auto" }}>
          <div style={{ minWidth: 1200, height: "100%" }}>
            <DebugChartWrapper
              chartName="Compliance Heatmap"
              data={vendorComplianceRawData}
              keys={complianceHeatmapKeys}
              indexBy="vendor"
            >
              <ResponsiveHeatMap
                data={vendorComplianceRawData}
                keys={complianceHeatmapKeys}
                indexBy="vendor"
                margin={{ top: 100, right: 60, bottom: 60, left: 100 }}
                axisTop={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: "",
                  legendOffset: 46,
                  format: (v) => MASTER_DATA.compliance[v as keyof typeof MASTER_DATA.compliance]?.name || v,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Vendors",
                  legendPosition: "middle",
                  legendOffset: -80,
                }}
                colors={{ type: "sequential", scheme: "green_blue", minValue: 0, maxValue: 100 }}
                animate={true}
                motionConfig="gentle"
                theme={NIVO_THEME}
              />
            </DebugChartWrapper>
          </div>
        </div>
      </ChartContainer>
    </div>
  )
}
