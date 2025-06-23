"use client"
import { motion } from "framer-motion"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveRadar } from "@nivo/radar"
import { DollarSign, TrendingUp, ShieldCheck, Zap } from "lucide-react"
import { MASTER_DATA, NIVO_THEME } from "@/lib/dashboard-data"
import { Card, ChartContainer, DebugChartWrapper } from "./ui"

const ensureArray = (value: any) => (Array.isArray(value) ? value : [])

export function ExecutiveDashboard({ data = [], config = {} }: { data: any[]; config: any }) {
  const safeData = ensureArray(data)
  if (safeData.length === 0) return <div className="chart-placeholder">Loading Executive Dashboard Analysis...</div>

  const portnox = safeData.find((v) => v.id === "portnox")
  const competitors = safeData.filter((v) => v.id !== "portnox")
  const avgCompetitorTCO =
    competitors.length > 0 ? competitors.reduce((acc, v) => acc + (v.financials?.tco || 0), 0) / competitors.length : 0
  const savings = portnox ? avgCompetitorTCO - (portnox.financials?.tco || 0) : 0
  const industry =
    MASTER_DATA.industries[config.industry as keyof typeof MASTER_DATA.industries] || MASTER_DATA.industries.technology

  if (!portnox) return <div className="chart-placeholder">Loading Portnox Data for Executive Dashboard...</div>

  const kpiCards = [
    {
      title: "Total Cost Savings",
      value: `$${(savings / 1000).toFixed(0)}K`,
      desc: `vs average competitor over ${config.analysisPeriod || 3} years`,
      icon: DollarSign,
      color: "from-green-400 to-emerald-600",
    },
    {
      title: "Portnox ROI",
      value: `${portnox.financials?.roi || 0}%`,
      desc: `${portnox.financials?.payback || 0} month payback period`,
      icon: TrendingUp,
      color: "from-cyan-400 to-blue-600",
    },
    {
      title: "Risk Reduction",
      value: `${(((portnox.security?.zeroTrustScore || 0) / 100) * industry.riskMultiplier * 100).toFixed(0)}%`,
      desc: "Financial impact mitigation",
      icon: ShieldCheck,
      color: "from-purple-400 to-pink-600",
    },
    {
      title: "Deployment Speed",
      value: `${portnox.metrics?.deploymentTime || 0} Day`,
      desc: "vs 90+ days for on-prem solutions",
      icon: Zap,
      color: "from-amber-400 to-orange-600",
    },
  ]

  const tcoComparisonData = safeData
    .filter((v) => v.financials && typeof v.financials.tco === "number")
    .sort((a, b) => b.financials.tco - a.financials.tco)
    .slice(0, 8)

  const complianceRadarData = Object.keys(MASTER_DATA.compliance).map((std) => ({
    standard: MASTER_DATA.compliance[std as keyof typeof MASTER_DATA.compliance].name,
    portnox: portnox?.compliance?.[std as keyof typeof portnox.compliance] || 0,
    average:
      competitors.length > 0
        ? Math.round(
            competitors.reduce((acc, v) => acc + (v.compliance?.[std as keyof typeof v.compliance] || 0), 0) /
              competitors.length,
          )
        : 0,
  }))

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiCards.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card variant="gradient" className="overflow-hidden p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${kpi.color} bg-opacity-20`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-400 mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-white mb-1">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <ChartContainer title="Total Cost of Ownership Analysis" description="3-year TCO comparison across vendors">
          <div style={{ height: 350 }}>
            <DebugChartWrapper
              chartName="TCO Bar Chart"
              data={tcoComparisonData}
              keys={["financials.tco"]}
              indexBy="shortName"
            >
              <ResponsiveBar
                data={tcoComparisonData}
                keys={["financials.tco"]}
                indexBy="shortName"
                margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
                padding={0.3}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={(d: any) => (d.data.id === "portnox" ? "#00F5D4" : d.data.color)}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: "Vendor",
                  legendPosition: "middle",
                  legendOffset: 50,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Total Cost (USD)",
                  legendPosition: "middle",
                  legendOffset: -70,
                  format: (v) => `$${((v as number) / 1000000).toFixed(1)}M`,
                }}
                labelTextColor={{ from: "color", modifiers: [["darker", 3]] }}
                animate={true}
                motionConfig="gentle"
                theme={NIVO_THEME}
              />
            </DebugChartWrapper>
          </div>
        </ChartContainer>
        <ChartContainer title="Compliance Coverage Analysis" description="Regulatory standard coverage comparison">
          <div style={{ height: 350 }}>
            <DebugChartWrapper
              chartName="Compliance Radar Chart"
              data={complianceRadarData}
              keys={["portnox", "average"]}
              indexBy="standard"
            >
              <ResponsiveRadar
                data={complianceRadarData}
                keys={["portnox", "average"]}
                indexBy="standard"
                maxValue={100}
                margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                curve="linearClosed"
                gridLevels={5}
                gridShape="circular"
                gridLabelOffset={20}
                colors={["#00F5D4", "#F15BB5"]}
                fillOpacity={0.25}
                animate={true}
                motionConfig="gentle"
                theme={NIVO_THEME}
                legends={[
                  {
                    anchor: "top-left",
                    direction: "column",
                    translateX: -50,
                    translateY: -40,
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
    </div>
  )
}
