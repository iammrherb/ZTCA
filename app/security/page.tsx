"use client"

import { useState } from "react"
import { ArrowLeft, Download, Info, ShieldAlert, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import SecurityRadarChart from "@/components/security-radar-chart"
import ThreatImpactChart from "@/components/threat-impact-chart"

// Sample security data
const securityData = {
  portnox: {
    name: "Portnox",
    riskScore: 92,
    securityMetrics: {
      Authentication: 95,
      Authorization: 90,
      Visibility: 94,
      "Threat Detection": 90,
      Remediation: 88,
      Compliance: 92,
      "Data Protection": 90,
      "API Security": 88,
    },
    threatImpact: {
      Ransomware: { withoutNAC: 90, withNAC: 15 },
      "Data Breach": { withoutNAC: 85, withNAC: 20 },
      "Lateral Movement": { withoutNAC: 95, withNAC: 10 },
      "Unauthorized Access": { withoutNAC: 90, withNAC: 15 },
      "IoT Compromise": { withoutNAC: 80, withNAC: 25 },
    },
    certifications: ["ISO 27001", "SOC 2 Type II", "GDPR Compliant", "HIPAA Compliant"],
    strengths: [
      "Zero-trust architecture",
      "Continuous risk assessment",
      "Automated remediation",
      "Cloud-native security controls",
      "Real-time threat intelligence",
    ],
  },
  cisco: {
    name: "Cisco ISE",
    riskScore: 88,
    securityMetrics: {
      Authentication: 92,
      Authorization: 90,
      Visibility: 85,
      "Threat Detection": 92,
      Remediation: 85,
      Compliance: 90,
      "Data Protection": 85,
      "API Security": 82,
    },
    threatImpact: {
      Ransomware: { withoutNAC: 90, withNAC: 20 },
      "Data Breach": { withoutNAC: 85, withNAC: 25 },
      "Lateral Movement": { withoutNAC: 95, withNAC: 15 },
      "Unauthorized Access": { withoutNAC: 90, withNAC: 20 },
      "IoT Compromise": { withoutNAC: 80, withNAC: 30 },
    },
    certifications: ["ISO 27001", "SOC 2 Type II", "GDPR Compliant", "HIPAA Compliant", "FISMA Compliant"],
    strengths: [
      "Deep network integration",
      "Mature security controls",
      "Cisco ecosystem integration",
      "Strong authentication options",
      "Extensive policy controls",
    ],
  },
  aruba: {
    name: "Aruba Clearpass",
    riskScore: 86,
    securityMetrics: {
      Authentication: 90,
      Authorization: 88,
      Visibility: 85,
      "Threat Detection": 88,
      Remediation: 82,
      Compliance: 85,
      "Data Protection": 84,
      "API Security": 80,
    },
    threatImpact: {
      Ransomware: { withoutNAC: 90, withNAC: 25 },
      "Data Breach": { withoutNAC: 85, withNAC: 30 },
      "Lateral Movement": { withoutNAC: 95, withNAC: 20 },
      "Unauthorized Access": { withoutNAC: 90, withNAC: 25 },
      "IoT Compromise": { withoutNAC: 80, withNAC: 35 },
    },
    certifications: ["ISO 27001", "SOC 2 Type II", "GDPR Compliant", "HIPAA Compliant"],
    strengths: [
      "Strong wireless security",
      "Good guest management security",
      "Device profiling",
      "Integration with HP security tools",
      "Role-based access controls",
    ],
  },
  forescout: {
    name: "Forescout",
    riskScore: 85,
    securityMetrics: {
      Authentication: 85,
      Authorization: 82,
      Visibility: 95,
      "Threat Detection": 86,
      Remediation: 80,
      Compliance: 84,
      "Data Protection": 80,
      "API Security": 78,
    },
    threatImpact: {
      Ransomware: { withoutNAC: 90, withNAC: 30 },
      "Data Breach": { withoutNAC: 85, withNAC: 35 },
      "Lateral Movement": { withoutNAC: 95, withNAC: 25 },
      "Unauthorized Access": { withoutNAC: 90, withNAC: 30 },
      "IoT Compromise": { withoutNAC: 80, withNAC: 25 },
    },
    certifications: ["ISO 27001", "SOC 2 Type II", "GDPR Compliant"],
    strengths: [
      "Excellent device visibility",
      "Agentless architecture",
      "IoT security focus",
      "Network segmentation",
      "Automated response actions",
    ],
  },
}

export default function SecurityPage() {
  const [selectedVendor, setSelectedVendor] = useState("portnox")
  const vendor = securityData[selectedVendor]

  const getRiskColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-emerald-500"
    if (score >= 70) return "text-yellow-500"
    if (score >= 60) return "text-orange-500"
    return "text-red-500"
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 80) return "bg-emerald-500"
    if (score >= 70) return "bg-yellow-500"
    if (score >= 60) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Security & Risk Assessment</h1>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="mb-6">
        <Select value={selectedVendor} onValueChange={setSelectedVendor}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select vendor" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(securityData).map((key) => (
              <SelectItem key={key} value={key}>
                {securityData[key].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Risk Score</CardTitle>
            <CardDescription>Comprehensive security assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full py-6">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-primary stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${vendor.riskScore * 2.51} 251.2`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${getRiskColor(vendor.riskScore)}`}>{vendor.riskScore}</span>
                  <span className="text-sm text-muted-foreground">out of 100</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-medium text-lg">{vendor.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {vendor.riskScore >= 90
                    ? "Excellent"
                    : vendor.riskScore >= 80
                      ? "Very Good"
                      : vendor.riskScore >= 70
                        ? "Good"
                        : vendor.riskScore >= 60
                          ? "Fair"
                          : "Poor"}{" "}
                  Security Rating
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Security Certifications & Strengths</CardTitle>
            <CardDescription>Key security capabilities and certifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-3">Certifications & Compliance</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Security Strengths</h3>
                <ul className="space-y-1">
                  {vendor.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Security Metrics Breakdown</CardTitle>
            <CardDescription>Detailed security capabilities assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(vendor.securityMetrics).map(([metric, score]) => (
                <div key={metric}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{metric}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-xs">
                              Measures the effectiveness of {metric.toLowerCase()} capabilities
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className={`text-sm font-medium ${getRiskColor(score)}`}>{score}/100</span>
                  </div>
                  <Progress value={score} className={`h-2 ${getProgressColor(score)}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Security Metrics Visualization</CardTitle>
            <CardDescription>Radar chart of security capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <SecurityRadarChart data={vendor.securityMetrics} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Threat Impact Analysis</CardTitle>
          <CardDescription>Comparison of threat impact with and without {vendor.name} NAC solution</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-6">
              <div className="h-[400px]">
                <ThreatImpactChart data={vendor.threatImpact} />
              </div>
            </TabsContent>
            <TabsContent value="table" className="pt-6">
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-4 text-left font-medium text-muted-foreground">Threat Type</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">Without NAC</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">With {vendor.name}</th>
                      <th className="p-4 text-left font-medium text-muted-foreground">Risk Reduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(vendor.threatImpact).map(([threat, values]) => (
                      <tr key={threat} className="border-t">
                        <td className="p-4 font-medium">{threat}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4 text-red-500" />
                            <span className="font-medium">{values.withoutNAC}% Risk</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-green-500" />
                            <span className="font-medium">{values.withNAC}% Risk</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {Math.round(((values.withoutNAC - values.withNAC) / values.withoutNAC) * 100)}% Reduction
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
