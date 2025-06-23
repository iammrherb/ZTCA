import { MASTER_DATA } from "./dashboard-data"

export const calculateFinancials = (vendorId: string, config: any) => {
  const vendor = MASTER_DATA.vendors[vendorId as keyof typeof MASTER_DATA.vendors]
  const industry = MASTER_DATA.industries[config.industry as keyof typeof MASTER_DATA.industries]
  const orgSize = MASTER_DATA.organizationSizes.find((s) => s.id === config.orgSize) || MASTER_DATA.organizationSizes[2]

  if (!vendor) return { tco: 0, roi: 0, payback: 0, breakdown: {} }

  let capex = vendor.costs.hardware + vendor.costs.implementation
  let opex = 0

  const sizeMultiplier =
    orgSize.id === "small" ? 0.7 : orgSize.id === "midmarket" ? 0.85 : orgSize.id === "enterprise" ? 1 : 1.3

  if (vendor.pricing.model === "subscription") {
    opex = vendor.pricing.basePrice * config.deviceCount * 12 * sizeMultiplier + vendor.costs.personnelPerYear
  } else {
    capex += vendor.pricing.basePrice * config.deviceCount * sizeMultiplier
    opex = capex * 0.2 + vendor.costs.personnelPerYear
  }

  const tco = capex + opex * config.analysisPeriod

  const complianceScore =
    Object.values(vendor.compliance).reduce((a, b) => a + b, 0) / Object.keys(vendor.compliance).length
  const riskReduction = (vendor.security.zeroTrustScore / 100) * industry.riskMultiplier * (complianceScore / 100)

  const complianceSavings = orgSize.complianceNeeds * 50000 * (complianceScore / 100)
  const annualSavings =
    industry.breachCost * 0.28 * riskReduction +
    (1.2 - vendor.metrics.fteRequired) * config.fteCost +
    complianceSavings / config.analysisPeriod

  const totalSavings = annualSavings * config.analysisPeriod
  const netBenefit = totalSavings - tco
  const roi = tco > 0 ? Math.round((netBenefit / tco) * 100) : 0
  const payback = annualSavings > 0 ? Math.max(0, Math.round((capex / annualSavings) * 12)) : 0

  return {
    tco,
    roi,
    payback,
    breakdown: {
      capex,
      opex: opex * config.analysisPeriod,
      totalSavings,
      complianceSavings,
      riskSavings: industry.breachCost * 0.28 * riskReduction * config.analysisPeriod,
      efficiencySavings: (1.2 - vendor.metrics.fteRequired) * config.fteCost * config.analysisPeriod,
    },
  }
}
