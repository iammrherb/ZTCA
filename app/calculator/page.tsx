"use client"

import { useState } from "react"
import { ArrowLeft, Calculator, Download, Info, TrendingUp, DollarSign, Users, Building, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import DetailedTcoChart from "@/components/detailed-tco-chart"
import RoiTimelineChart from "@/components/roi-timeline-chart"
import CostBreakdownChart from "@/components/cost-breakdown-chart"
import ImplementationTimelineChart from "@/components/implementation-timeline-chart"
import CyberInsuranceChart from "@/components/cyber-insurance-chart"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ExecutiveSummary from "@/components/executive-summary"

// Enhanced vendor data with detailed cost structures
const vendorCostData = {
  portnox: {
    name: "Portnox",
    type: "Cloud-Native",
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
    implementation: {
      duration: "2-4 weeks",
      cost: 15000,
      complexity: "Low",
      requirements: ["Cloud connectivity", "Network integration"],
    },
    training: {
      required: true,
      cost: 8000,
      duration: "1 week",
      certification: "Portnox Certified Administrator",
    },
    support: {
      included: "24/7 Premium Support",
      cost: 0,
      sla: "99.9%",
    },
    infrastructure: {
      hardware: 0,
      cloud: "Included",
      maintenance: 0,
    },
  },
  cisco: {
    name: "Cisco ISE",
    type: "On-Premises/Hybrid",
    licensing: {
      model: "Perpetual + Maintenance",
      basePrice: 125,
      tiers: [
        { name: "Base", devices: "1-100", price: 125, features: ["Basic NAC", "802.1X", "MAB"] },
        { name: "Plus", devices: "101-500", price: 95, features: ["Guest Services", "BYOD", "Profiling"] },
        { name: "Apex", devices: "501+", price: 75, features: ["TrustSec", "pxGrid", "Advanced Analytics"] },
      ],
    },
    implementation: {
      duration: "12-16 weeks",
      cost: 85000,
      complexity: "High",
      requirements: ["Hardware deployment", "Network reconfiguration", "Integration"],
    },
    training: {
      required: true,
      cost: 25000,
      duration: "4 weeks",
      certification: "Cisco ISE Specialist",
    },
    support: {
      included: "SmartNet",
      cost: 15000,
      sla: "99.5%",
    },
    infrastructure: {
      hardware: 45000,
      cloud: "Optional",
      maintenance: 12000,
    },
  },
  aruba: {
    name: "Aruba ClearPass",
    type: "On-Premises/Hybrid",
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
    implementation: {
      duration: "10-14 weeks",
      cost: 65000,
      complexity: "Medium-High",
      requirements: ["Hardware deployment", "Network integration"],
    },
    training: {
      required: true,
      cost: 18000,
      duration: "3 weeks",
      certification: "Aruba ClearPass Expert",
    },
    support: {
      included: "Foundation Care",
      cost: 12000,
      sla: "99.0%",
    },
    infrastructure: {
      hardware: 35000,
      cloud: "Optional",
      maintenance: 9000,
    },
  },
  forescout: {
    name: "Forescout",
    type: "On-Premises/Hybrid",
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
    implementation: {
      duration: "8-12 weeks",
      cost: 55000,
      complexity: "Medium",
      requirements: ["Network deployment", "Integration setup"],
    },
    training: {
      required: true,
      cost: 15000,
      duration: "2 weeks",
      certification: "Forescout Certified Professional",
    },
    support: {
      included: "Standard Support",
      cost: 10000,
      sla: "98.5%",
    },
    infrastructure: {
      hardware: 25000,
      cloud: "Optional",
      maintenance: 7500,
    },
  },
  securew2: {
    name: "SecureW2",
    type: "Cloud-Native",
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
    implementation: {
      duration: "1-2 weeks",
      cost: 8000,
      complexity: "Low",
      requirements: ["Cloud setup", "Certificate deployment"],
    },
    training: {
      required: false,
      cost: 3000,
      duration: "3 days",
      certification: "SecureW2 Administrator",
    },
    support: {
      included: "Business Hours",
      cost: 5000,
      sla: "99.0%",
    },
    infrastructure: {
      hardware: 0,
      cloud: "Included",
      maintenance: 0,
    },
  },
  foxpass: {
    name: "Foxpass",
    type: "Cloud-Native",
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
    implementation: {
      duration: "1-3 weeks",
      cost: 10000,
      complexity: "Low-Medium",
      requirements: ["Directory integration", "Network configuration"],
    },
    training: {
      required: false,
      cost: 4000,
      duration: "2 days",
      certification: "Foxpass Certified",
    },
    support: {
      included: "Email Support",
      cost: 6000,
      sla: "98.0%",
    },
    infrastructure: {
      hardware: 0,
      cloud: "Included",
      maintenance: 0,
    },
  },
}

// Industry-specific data
const industryData = {
  healthcare: {
    name: "Healthcare",
    compliance: ["HIPAA", "HITECH", "FDA 21 CFR Part 11"],
    riskMultiplier: 1.4,
    insurancePremium: 0.08,
    avgDevices: 2500,
  },
  finance: {
    name: "Financial Services",
    compliance: ["PCI DSS", "SOX", "GLBA", "FFIEC"],
    riskMultiplier: 1.6,
    insurancePremium: 0.12,
    avgDevices: 3500,
  },
  manufacturing: {
    name: "Manufacturing",
    compliance: ["ISO 27001", "NIST", "IEC 62443"],
    riskMultiplier: 1.2,
    insurancePremium: 0.06,
    avgDevices: 5000,
  },
  government: {
    name: "Government",
    compliance: ["FISMA", "NIST 800-53", "FedRAMP"],
    riskMultiplier: 1.8,
    insurancePremium: 0.15,
    avgDevices: 2000,
  },
  education: {
    name: "Education",
    compliance: ["FERPA", "COPPA", "CIPA"],
    riskMultiplier: 1.1,
    insurancePremium: 0.04,
    avgDevices: 4000,
  },
}

export default function CalculatorPage() {
  const [vendor, setVendor] = useState("portnox")
  const [industry, setIndustry] = useState("healthcare")
  const [deploymentType, setDeploymentType] = useState("cloud")
  const [endpoints, setEndpoints] = useState(1000)
  const [years, setYears] = useState(3)
  const [includeTraining, setIncludeTraining] = useState(true)
  const [includeMaintenance, setIncludeMaintenance] = useState(true)
  const [includeInsurance, setIncludeInsurance] = useState(true)
  const [customDeviceCount, setCustomDeviceCount] = useState("")
  const [summaryOpen, setSummaryOpen] = useState(false)

  const selectedVendor = vendorCostData[vendor]
  const selectedIndustry = industryData[industry]

  // Calculate detailed costs
  const calculateDetailedCosts = () => {
    const deviceCount = customDeviceCount ? Number.parseInt(customDeviceCount) : endpoints

    // Determine pricing tier
    let tierPrice = selectedVendor.licensing.basePrice
    if (selectedVendor.licensing.tiers) {
      for (const tier of selectedVendor.licensing.tiers) {
        const maxDevices = tier.devices.includes("+")
          ? Number.POSITIVE_INFINITY
          : Number.parseInt(tier.devices.split("-")[1])
        if (deviceCount <= maxDevices) {
          tierPrice = tier.price
          break
        }
      }
    }

    // Calculate licensing costs
    const annualLicensing = selectedVendor.licensing.model.includes("Month")
      ? tierPrice * deviceCount * 12
      : tierPrice * deviceCount

    // Implementation costs
    const implementationCost = selectedVendor.implementation.cost

    // Training costs
    const trainingCost = includeTraining ? selectedVendor.training.cost : 0

    // Infrastructure costs
    const infrastructureCost = selectedVendor.infrastructure.hardware

    // Annual maintenance and support
    const annualMaintenance = includeMaintenance
      ? selectedVendor.support.cost + selectedVendor.infrastructure.maintenance
      : 0

    // Cyber insurance impact
    const baseInsurancePremium = deviceCount * 50 // Base premium per device
    const withoutNACPremium = baseInsurancePremium * selectedIndustry.riskMultiplier
    const withNACPremium = withoutNACPremium * 0.3 // 70% reduction with NAC
    const annualInsuranceSavings = includeInsurance ? withoutNACPremium - withNACPremium : 0

    // Total costs
    const totalImplementation = implementationCost + trainingCost + infrastructureCost
    const totalAnnual = annualLicensing + annualMaintenance
    const totalCost = totalImplementation + totalAnnual * years
    const totalSavings = annualInsuranceSavings * years

    return {
      licensing: {
        annual: annualLicensing,
        total: annualLicensing * years,
        perDevice: tierPrice,
      },
      implementation: {
        setup: implementationCost,
        training: trainingCost,
        infrastructure: infrastructureCost,
        total: totalImplementation,
      },
      annual: {
        maintenance: annualMaintenance,
        licensing: annualLicensing,
        total: totalAnnual,
      },
      insurance: {
        withoutNAC: withoutNACPremium,
        withNAC: withNACPremium,
        annualSavings: annualInsuranceSavings,
        totalSavings: totalSavings,
      },
      totals: {
        cost: totalCost,
        savings: totalSavings,
        netCost: totalCost - totalSavings,
        roi: totalSavings > 0 ? ((totalSavings - totalCost) / totalCost) * 100 : 0,
      },
    }
  }

  const costs = calculateDetailedCosts()

  const handleExportPdf = () => {
    // This is a placeholder for PDF generation logic.
    // In a real app, you'd use libraries like jsPDF and html2canvas
    // to capture the content of the page and save it as a PDF.
    alert("PDF export functionality would be implemented here.")
    console.log("Exporting the following data to PDF:", {
      vendor: selectedVendor,
      industry,
      endpoints,
      costs,
    })
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Zero Trust NAC - Detailed Cost Analysis</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Cost Calculator Inputs
            </CardTitle>
            <CardDescription>Configure your analysis parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vendor">NAC Vendor</Label>
              <Select value={vendor} onValueChange={setVendor}>
                <SelectTrigger id="vendor">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portnox">Portnox (Cloud-Native)</SelectItem>
                  <SelectItem value="cisco">Cisco ISE</SelectItem>
                  <SelectItem value="aruba">Aruba ClearPass</SelectItem>
                  <SelectItem value="forescout">Forescout</SelectItem>
                  <SelectItem value="securew2">SecureW2</SelectItem>
                  <SelectItem value="foxpass">Foxpass</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground">
                {selectedVendor.type} • {selectedVendor.licensing.model}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry Sector</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(industryData).map(([key, data]) => (
                    <SelectItem key={key} value={key}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedIndustry.compliance.map((comp) => (
                  <Badge key={comp} variant="outline" className="text-xs">
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deployment">Deployment Type</Label>
              <Select value={deploymentType} onValueChange={setDeploymentType}>
                <SelectTrigger id="deployment">
                  <SelectValue placeholder="Select deployment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cloud">Cloud-based</SelectItem>
                  <SelectItem value="onprem">On-premises</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="endpoints">Number of Endpoints</Label>
                <span className="text-sm font-medium">{endpoints.toLocaleString()}</span>
              </div>
              <Slider
                id="endpoints"
                min={100}
                max={10000}
                step={100}
                value={[endpoints]}
                onValueChange={(value) => setEndpoints(value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-devices">Custom Device Count (Optional)</Label>
              <Input
                id="custom-devices"
                type="number"
                placeholder="Enter exact device count"
                value={customDeviceCount}
                onChange={(e) => setCustomDeviceCount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="years">Analysis Period (Years)</Label>
                <span className="text-sm font-medium">{years} years</span>
              </div>
              <Slider
                id="years"
                min={1}
                max={5}
                step={1}
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
                className="py-4"
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="training">Include Training Costs</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">{selectedVendor.training.duration} training program</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="training" checked={includeTraining} onCheckedChange={setIncludeTraining} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="maintenance">Include Maintenance & Support</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Annual maintenance and support costs</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="maintenance" checked={includeMaintenance} onCheckedChange={setIncludeMaintenance} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="insurance">Include Cyber Insurance Impact</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Calculate cyber insurance premium reductions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch id="insurance" checked={includeInsurance} onCheckedChange={setIncludeInsurance} />
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Executive Summary
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Executive Summary</DialogTitle>
                  </DialogHeader>
                  <ExecutiveSummary data={{ costs, vendor: selectedVendor, industry, endpoints, years }} />
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full" onClick={handleExportPdf}>
                <Download className="mr-2 h-4 w-4" />
                Export Detailed Report (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Comprehensive Cost Analysis</CardTitle>
            <CardDescription>Detailed breakdown of all costs and savings for {selectedVendor.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Costs</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="comparison">Per-Device</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="pt-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Cost Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">Total Implementation</span>
                        </div>
                        <span className="font-medium">${costs.implementation.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">Annual Operating Cost</span>
                        </div>
                        <span className="font-medium">${costs.annual.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">Per Device Cost (Annual)</span>
                        </div>
                        <span className="font-medium">${costs.licensing.perDevice.toFixed(2)}</span>
                      </div>
                      {includeInsurance && (
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-green-600" />
                            <span className="text-green-700">Insurance Savings ({years} years)</span>
                          </div>
                          <span className="font-medium text-green-700">
                            ${costs.insurance.totalSavings.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Net Total Cost ({years} years)</span>
                        <span className="font-bold text-lg">${costs.totals.netCost.toLocaleString()}</span>
                      </div>
                      {costs.totals.roi > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">ROI</span>
                          <span className="font-bold text-lg text-green-600">{costs.totals.roi.toFixed(1)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <DetailedTcoChart data={costs} vendor={selectedVendor.name} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="pt-6">
                <div className="h-[500px]">
                  <CostBreakdownChart data={costs} years={years} />
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="pt-6">
                <div className="space-y-6">
                  <div className="h-[300px]">
                    <RoiTimelineChart data={costs} years={years} />
                  </div>
                  <div className="h-[200px]">
                    <ImplementationTimelineChart vendor={selectedVendor} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insurance" className="pt-6">
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Without NAC</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                          ${costs.insurance.withoutNAC.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Annual Premium</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">With NAC</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                          ${costs.insurance.withNAC.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Annual Premium</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Annual Savings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">
                          ${costs.insurance.annualSavings.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">70% Reduction</div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="h-[300px]">
                    <CyberInsuranceChart data={costs.insurance} industry={selectedIndustry.name} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="pt-6">
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="text-center">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Monthly Per Device</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-primary">
                          ${(costs.licensing.perDevice / 12).toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Annual Per Device</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-primary">${costs.licensing.perDevice.toFixed(2)}</div>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Implementation Per Device</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-primary">
                          $
                          {(
                            costs.implementation.total /
                            (customDeviceCount ? Number.parseInt(customDeviceCount) : endpoints)
                          ).toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="text-center">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Total Per Device ({years}yr)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-primary">
                          $
                          {(
                            costs.totals.netCost / (customDeviceCount ? Number.parseInt(customDeviceCount) : endpoints)
                          ).toFixed(2)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">Pricing Tiers for {selectedVendor.name}</h3>
                    <div className="grid gap-3 md:grid-cols-3">
                      {selectedVendor.licensing.tiers.map((tier, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="font-medium">{tier.name}</div>
                          <div className="text-sm text-muted-foreground">{tier.devices} devices</div>
                          <div className="text-lg font-bold text-primary mt-1">
                            ${tier.price.toFixed(2)}
                            {selectedVendor.licensing.model.includes("Month") ? "/mo" : ""}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            {tier.features.slice(0, 2).join(", ")}
                            {tier.features.length > 2 && "..."}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
