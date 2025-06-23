"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, DollarSign, Shield, Building2, BarChart3 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import DetailedTcoChart from "@/components/detailed-tco-chart"
import RoiTimelineChart from "@/components/roi-timeline-chart"
import CostBreakdownChart from "@/components/cost-breakdown-chart"
import VendorComparisonChart from "@/components/vendor-comparison-chart"
import SecurityPostureChart from "@/components/security-posture-chart"
import ComplianceMatrixChart from "@/components/compliance-matrix-chart"
import Image from "next/image"
import { BrandedHeader } from "@/components/branded-header"

const allVendors = {
  portnox: {
    name: "Portnox",
    type: "Cloud-Native",
    logo: "/images/portnox-logo.png",
    color: "#0066cc",
    licensing: {
      model: "Per Device/Month",
      basePrice: 4.5,
      tiers: [
        {
          name: "Essential",
          devices: "1-500",
          price: 4.5,
          features: ["Basic NAC", "Device Discovery", "Basic Policies"],
        },
        {
          name: "Professional",
          devices: "501-2000",
          price: 3.75,
          features: ["Advanced Policies", "Guest Management", "API Access"],
        },
        {
          name: "Enterprise",
          devices: "2001+",
          price: 3.0,
          features: ["Zero Trust", "Advanced Analytics", "Premium Support"],
        },
      ],
    },
    implementation: { duration: "2-4 weeks", cost: 15000, complexity: "Low" },
    training: { required: true, cost: 8000, duration: "1 week" },
    support: { included: "24/7 Premium Support", cost: 0, sla: "99.9%" },
    infrastructure: { hardware: 0, cloud: "Included", maintenance: 0 },
    securityScore: 95,
    complianceScore: 92,
  },
  cisco: {
    name: "Cisco ISE",
    type: "On-Premises/Hybrid",
    logo: "/placeholder-logo.png",
    color: "#1ba1e2",
    licensing: {
      model: "Perpetual + Maintenance",
      basePrice: 125,
      tiers: [
        { name: "Base", devices: "1-100", price: 125, features: ["Basic NAC", "802.1X", "MAB"] },
        { name: "Plus", devices: "101-500", price: 95, features: ["Guest Services", "BYOD", "Profiling"] },
        { name: "Apex", devices: "501+", price: 75, features: ["TrustSec", "pxGrid", "Advanced Analytics"] },
      ],
    },
    implementation: { duration: "12-16 weeks", cost: 85000, complexity: "High" },
    training: { required: true, cost: 25000, duration: "4 weeks" },
    support: { included: "SmartNet", cost: 15000, sla: "99.5%" },
    infrastructure: { hardware: 45000, cloud: "Optional", maintenance: 12000 },
    securityScore: 88,
    complianceScore: 85,
  },
  aruba: {
    name: "Aruba ClearPass",
    type: "On-Premises/Hybrid",
    logo: "/placeholder-logo.png",
    color: "#ff6900",
    licensing: {
      model: "Perpetual + Maintenance",
      basePrice: 110,
      tiers: [
        { name: "Base", devices: "1-100", price: 110, features: ["Basic NAC", "Guest Access", "Device Profiling"] },
        {
          name: "Policy Manager",
          devices: "101-500",
          price: 85,
          features: ["Advanced Policies", "BYOD", "Onboarding"],
        },
        {
          name: "Enterprise",
          devices: "501+",
          price: 65,
          features: ["Analytics", "API Integration", "Advanced Features"],
        },
      ],
    },
    implementation: { duration: "10-14 weeks", cost: 65000, complexity: "Medium-High" },
    training: { required: true, cost: 18000, duration: "3 weeks" },
    support: { included: "Foundation Care", cost: 12000, sla: "99.0%" },
    infrastructure: { hardware: 35000, cloud: "Optional", maintenance: 9000 },
    securityScore: 82,
    complianceScore: 80,
  },
  forescout: {
    name: "Forescout",
    type: "On-Premises/Hybrid",
    logo: "/placeholder-logo.png",
    color: "#00a651",
    licensing: {
      model: "Perpetual + Maintenance",
      basePrice: 135,
      tiers: [
        {
          name: "Core",
          devices: "1-100",
          price: 135,
          features: ["Device Discovery", "Classification", "Basic Control"],
        },
        {
          name: "Advanced",
          devices: "101-500",
          price: 105,
          features: ["Automated Response", "Integration", "Analytics"],
        },
        {
          name: "Enterprise",
          devices: "501+",
          price: 85,
          features: ["Advanced Analytics", "Threat Detection", "Orchestration"],
        },
      ],
    },
    implementation: { duration: "8-12 weeks", cost: 55000, complexity: "Medium" },
    training: { required: true, cost: 15000, duration: "2 weeks" },
    support: { included: "Standard Support", cost: 10000, sla: "98.5%" },
    infrastructure: { hardware: 25000, cloud: "Optional", maintenance: 7500 },
    securityScore: 85,
    complianceScore: 78,
  },
  securew2: {
    name: "SecureW2",
    type: "Cloud-Native",
    logo: "/placeholder-logo.png",
    color: "#7b68ee",
    licensing: {
      model: "Per User/Month",
      basePrice: 2.5,
      tiers: [
        {
          name: "JoinNow",
          devices: "1-1000",
          price: 2.5,
          features: ["Certificate Management", "Onboarding", "Basic Support"],
        },
        {
          name: "CloudRADIUS",
          devices: "1001-5000",
          price: 2.0,
          features: ["Cloud RADIUS", "Advanced Policies", "Analytics"],
        },
        {
          name: "Enterprise",
          devices: "5001+",
          price: 1.5,
          features: ["Full Suite", "Premium Support", "Custom Integration"],
        },
      ],
    },
    implementation: { duration: "1-2 weeks", cost: 8000, complexity: "Low" },
    training: { required: false, cost: 3000, duration: "3 days" },
    support: { included: "Business Hours", cost: 5000, sla: "99.0%" },
    infrastructure: { hardware: 0, cloud: "Included", maintenance: 0 },
    securityScore: 78,
    complianceScore: 75,
  },
  foxpass: {
    name: "Foxpass",
    type: "Cloud-Native",
    logo: "/placeholder-logo.png",
    color: "#ff4500",
    licensing: {
      model: "Per User/Month",
      basePrice: 3.0,
      tiers: [
        { name: "Starter", devices: "1-100", price: 3.0, features: ["LDAP", "RADIUS", "Basic Integration"] },
        { name: "Professional", devices: "101-500", price: 2.5, features: ["Advanced RADIUS", "SSO", "API Access"] },
        {
          name: "Enterprise",
          devices: "501+",
          price: 2.0,
          features: ["Full Features", "Premium Support", "Custom Development"],
        },
      ],
    },
    implementation: { duration: "1-3 weeks", cost: 10000, complexity: "Low-Medium" },
    training: { required: false, cost: 4000, duration: "2 days" },
    support: { included: "Email Support", cost: 6000, sla: "98.0%" },
    infrastructure: { hardware: 0, cloud: "Included", maintenance: 0 },
    securityScore: 75,
    complianceScore: 72,
  },
}

const industryData = {
  healthcare: { name: "Healthcare", compliance: ["HIPAA", "HITECH", "FDA 21 CFR Part 11"], riskMultiplier: 1.4 },
  finance: { name: "Financial Services", compliance: ["PCI DSS", "SOX", "GLBA", "FFIEC"], riskMultiplier: 1.6 },
  manufacturing: { name: "Manufacturing", compliance: ["ISO 27001", "NIST", "IEC 62443"], riskMultiplier: 1.2 },
  government: { name: "Government", compliance: ["FISMA", "NIST 800-53", "FedRAMP"], riskMultiplier: 1.8 },
  education: { name: "Education", compliance: ["FERPA", "COPPA", "CIPA"], riskMultiplier: 1.1 },
}

export default function EnhancedExecutiveSummary({ data }) {
  const { costs, vendor, industry, endpoints, years } = data
  const [selectedVendors, setSelectedVendors] = useState(["portnox", vendor])

  const primaryVendor = allVendors[vendor] || allVendors.portnox
  const industryInfo = industryData[industry] || industryData.healthcare

  const handleVendorToggle = (vendorKey: string) => {
    if (vendorKey === "portnox") return // Portnox always selected

    setSelectedVendors((prev) =>
      prev.includes(vendorKey) ? prev.filter((v) => v !== vendorKey) : [...prev, vendorKey],
    )
  }

  const calculateVendorCosts = (vendorKey: string) => {
    const vendorData = allVendors[vendorKey]
    const deviceCount = endpoints

    let tierPrice = vendorData.licensing.basePrice
    for (const tier of vendorData.licensing.tiers) {
      const maxDevices = tier.devices.includes("+")
        ? Number.POSITIVE_INFINITY
        : Number.parseInt(tier.devices.split("-")[1])
      if (deviceCount <= maxDevices) {
        tierPrice = tier.price
        break
      }
    }

    const annualLicensing = vendorData.licensing.model.includes("Month")
      ? tierPrice * deviceCount * 12
      : tierPrice * deviceCount
    const totalImplementation =
      vendorData.implementation.cost + vendorData.training.cost + vendorData.infrastructure.hardware
    const totalAnnual = annualLicensing + vendorData.support.cost + vendorData.infrastructure.maintenance
    const totalCost = totalImplementation + totalAnnual * years

    return {
      licensing: { annual: annualLicensing, perDevice: tierPrice },
      implementation: { total: totalImplementation },
      annual: { total: totalAnnual },
      totals: { cost: totalCost, netCost: totalCost },
    }
  }

  const comparisonData = selectedVendors.map((vendorKey) => ({
    vendor: allVendors[vendorKey],
    costs: calculateVendorCosts(vendorKey),
  }))

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-4">
      {/* Header with Custom Branding */}
      <BrandedHeader
        title="Zero Trust NAC Executive Summary"
        subtitle="Comprehensive Analysis & Vendor Comparison"
        className="mb-6"
      />

      {/* Vendor Selection Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Vendor Comparison Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(allVendors).map(([key, vendorData]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedVendors.includes(key)}
                  onCheckedChange={() => handleVendorToggle(key)}
                  disabled={key === "portnox"}
                />
                <Label htmlFor={key} className="flex items-center gap-2 cursor-pointer">
                  <Image
                    src={vendorData.logo || "/placeholder.svg"}
                    alt={vendorData.name}
                    width={20}
                    height={20}
                    className="rounded"
                  />
                  <span className="text-sm">{vendorData.name}</span>
                  {key === "portnox" && (
                    <Badge variant="secondary" className="text-xs">
                      Default
                    </Badge>
                  )}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="security">Security Analysis</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Executive Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">
                This comprehensive analysis evaluates the implementation of <strong>{primaryVendor.name}</strong>
                Network Access Control (NAC) solution for an organization in the <strong>{industryInfo.name}</strong>
                sector with <strong>{endpoints.toLocaleString()}</strong> endpoints over a <strong>{years}-year</strong>{" "}
                period.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-900">${costs.totals.netCost.toLocaleString()}</div>
                    <div className="text-xs text-blue-700">Total Net Cost ({years} years)</div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-900">
                      {costs.totals.roi > 0 ? `${costs.totals.roi.toFixed(1)}%` : "N/A"}
                    </div>
                    <div className="text-xs text-green-700">Return on Investment</div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-900">{primaryVendor.securityScore}</div>
                    <div className="text-xs text-purple-700">Security Score</div>
                  </CardContent>
                </Card>
              </div>

              <div className="h-[300px] mt-6">
                <DetailedTcoChart data={costs} vendor={primaryVendor.name} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cost Breakdown Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <CostBreakdownChart data={costs} years={years} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">ROI Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <RoiTimelineChart data={costs} years={years} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">${costs.implementation.total.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Implementation</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">${costs.annual.total.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Annual Cost</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">${costs.licensing.perDevice.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">Per Device/Year</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-lg font-bold text-green-700">
                    ${costs.insurance.totalSavings.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-600">Insurance Savings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Multi-Vendor Cost Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <VendorComparisonChart data={comparisonData} years={years} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonData.map(({ vendor: vendorData, costs: vendorCosts }) => (
              <Card key={vendorData.name} className="relative">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={vendorData.logo || "/placeholder.svg"}
                      alt={vendorData.name}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <CardTitle className="text-base">{vendorData.name}</CardTitle>
                    {vendorData.name === "Portnox" && <Badge className="text-xs">Recommended</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground">{vendorData.type}</div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Cost ({years}yr):</span>
                    <span className="font-medium">${vendorCosts.totals.netCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Implementation:</span>
                    <span className="font-medium">${vendorCosts.implementation.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Annual Cost:</span>
                    <span className="font-medium">${vendorCosts.annual.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Per Device/Year:</span>
                    <span className="font-medium">${vendorCosts.licensing.perDevice.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Security Score:</span>
                    <Badge variant="outline" style={{ borderColor: vendorData.color, color: vendorData.color }}>
                      {vendorData.securityScore}/100
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Security Posture Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <SecurityPostureChart vendors={selectedVendors.map((key) => allVendors[key])} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Threat Mitigation Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { threat: "Unauthorized Access", mitigation: "95%", color: "green" },
                  { threat: "Lateral Movement", mitigation: "88%", color: "green" },
                  { threat: "Data Exfiltration", mitigation: "92%", color: "green" },
                  { threat: "Malware Propagation", mitigation: "85%", color: "yellow" },
                  { threat: "Insider Threats", mitigation: "78%", color: "yellow" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{item.threat}</span>
                    <Badge variant={item.color === "green" ? "default" : "secondary"}>{item.mitigation}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compliance Matrix Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ComplianceMatrixChart
                  vendors={selectedVendors.map((key) => allVendors[key])}
                  industry={industryInfo}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Industry Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {industryInfo.compliance.map((standard, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm font-medium">{standard}</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Compliant
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Compliance Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p>
                    • <strong>Audit Readiness:</strong> Automated compliance reporting and documentation
                  </p>
                  <p>
                    • <strong>Risk Reduction:</strong> {((1 - 1 / industryInfo.riskMultiplier) * 100).toFixed(0)}%
                    reduction in compliance-related risks
                  </p>
                  <p>
                    • <strong>Penalty Avoidance:</strong> Estimated $2.5M+ in potential regulatory fines avoided
                  </p>
                  <p>
                    • <strong>Insurance Benefits:</strong> Up to 70% reduction in cyber insurance premiums
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Strategic Recommendation */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Image src="/images/portnox-logo.png" alt="Portnox" width={24} height={24} className="rounded" />
            Strategic Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-800 leading-relaxed">
            Based on comprehensive analysis, <strong>Portnox</strong> emerges as the optimal choice for Zero Trust NAC
            implementation. The solution offers superior ROI (
            {costs.totals.roi > 0 ? `${costs.totals.roi.toFixed(1)}%` : "positive"}), fastest deployment (2-4 weeks vs.
            industry average of 8-16 weeks), and lowest total cost of ownership. The cloud-native architecture ensures
            scalability, reduces infrastructure overhead, and provides 99.9% SLA guarantee. This investment is critical
            for maintaining competitive advantage, ensuring regulatory compliance, and protecting against evolving cyber
            threats in today's digital landscape.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
