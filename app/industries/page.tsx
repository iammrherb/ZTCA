"use client"

import { useState } from "react"
import { ArrowLeft, Building2, Shield, AlertTriangle, CheckCircle, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import IndustryComplianceChart from "@/components/industry-compliance-chart"
import IndustryRiskChart from "@/components/industry-risk-chart"

// Comprehensive industry data
const industryData = {
  healthcare: {
    name: "Healthcare",
    description: "Hospitals, clinics, medical practices, and healthcare systems",
    compliance: [
      {
        standard: "HIPAA",
        description: "Health Insurance Portability and Accountability Act",
        criticality: "Critical",
        nacControls: ["Access Control", "Audit Logging", "Device Authentication", "Data Encryption"],
      },
      {
        standard: "HITECH",
        description: "Health Information Technology for Economic and Clinical Health Act",
        criticality: "High",
        nacControls: ["Breach Notification", "Access Monitoring", "Device Compliance"],
      },
      {
        standard: "FDA 21 CFR Part 11",
        description: "Electronic Records and Electronic Signatures",
        criticality: "High",
        nacControls: ["User Authentication", "Audit Trails", "System Validation"],
      },
    ],
    riskFactors: {
      dataValue: 95,
      regulatoryRisk: 90,
      cyberTargeting: 85,
      deviceComplexity: 80,
      patientSafety: 95,
    },
    avgDevices: 2500,
    commonThreats: ["Ransomware", "Data Breach", "Medical Device Compromise", "Insider Threats"],
    nacBenefits: [
      "Patient data protection",
      "Medical device security",
      "Compliance automation",
      "Incident response",
      "Access control for clinical systems",
    ],
    costMultiplier: 1.4,
    insurancePremium: 0.08,
  },
  finance: {
    name: "Financial Services",
    description: "Banks, credit unions, investment firms, and financial institutions",
    compliance: [
      {
        standard: "PCI DSS",
        description: "Payment Card Industry Data Security Standard",
        criticality: "Critical",
        nacControls: ["Network Segmentation", "Access Control", "Monitoring", "Vulnerability Management"],
      },
      {
        standard: "SOX",
        description: "Sarbanes-Oxley Act",
        criticality: "Critical",
        nacControls: ["IT Controls", "Access Management", "Change Control", "Audit Logging"],
      },
      {
        standard: "GLBA",
        description: "Gramm-Leach-Bliley Act",
        criticality: "High",
        nacControls: ["Customer Data Protection", "Access Controls", "Risk Assessment"],
      },
      {
        standard: "FFIEC",
        description: "Federal Financial Institutions Examination Council",
        criticality: "High",
        nacControls: ["Cybersecurity Framework", "Risk Management", "Incident Response"],
      },
    ],
    riskFactors: {
      dataValue: 98,
      regulatoryRisk: 95,
      cyberTargeting: 95,
      deviceComplexity: 75,
      financialImpact: 98,
    },
    avgDevices: 3500,
    commonThreats: ["Advanced Persistent Threats", "Insider Trading", "Payment Fraud", "Data Theft"],
    nacBenefits: [
      "Financial data protection",
      "Regulatory compliance",
      "Fraud prevention",
      "Trading floor security",
      "Customer data protection",
    ],
    costMultiplier: 1.6,
    insurancePremium: 0.12,
  },
  manufacturing: {
    name: "Manufacturing",
    description: "Industrial manufacturing, automotive, aerospace, and production facilities",
    compliance: [
      {
        standard: "ISO 27001",
        description: "Information Security Management Systems",
        criticality: "High",
        nacControls: ["Security Policies", "Access Control", "Risk Management", "Incident Management"],
      },
      {
        standard: "NIST Cybersecurity Framework",
        description: "National Institute of Standards and Technology",
        criticality: "High",
        nacControls: ["Identify", "Protect", "Detect", "Respond", "Recover"],
      },
      {
        standard: "IEC 62443",
        description: "Industrial Automation and Control Systems Security",
        criticality: "Critical",
        nacControls: ["Network Segmentation", "Device Authentication", "Security Monitoring"],
      },
    ],
    riskFactors: {
      dataValue: 75,
      regulatoryRisk: 70,
      cyberTargeting: 80,
      deviceComplexity: 90,
      operationalImpact: 95,
    },
    avgDevices: 5000,
    commonThreats: ["Industrial Espionage", "Ransomware", "Supply Chain Attacks", "IoT Vulnerabilities"],
    nacBenefits: [
      "OT/IT network segmentation",
      "Industrial IoT security",
      "Intellectual property protection",
      "Production continuity",
      "Supply chain security",
    ],
    costMultiplier: 1.2,
    insurancePremium: 0.06,
  },
  government: {
    name: "Government",
    description: "Federal, state, and local government agencies",
    compliance: [
      {
        standard: "FISMA",
        description: "Federal Information Security Management Act",
        criticality: "Critical",
        nacControls: ["Continuous Monitoring", "Access Control", "Risk Assessment", "Security Controls"],
      },
      {
        standard: "NIST 800-53",
        description: "Security and Privacy Controls for Federal Information Systems",
        criticality: "Critical",
        nacControls: ["Access Control", "Audit and Accountability", "Configuration Management"],
      },
      {
        standard: "FedRAMP",
        description: "Federal Risk and Authorization Management Program",
        criticality: "Critical",
        nacControls: ["Cloud Security", "Continuous Monitoring", "Incident Response"],
      },
    ],
    riskFactors: {
      dataValue: 90,
      regulatoryRisk: 98,
      cyberTargeting: 98,
      deviceComplexity: 85,
      nationalSecurity: 98,
    },
    avgDevices: 2000,
    commonThreats: ["Nation-State Attacks", "Espionage", "Data Breaches", "Critical Infrastructure Attacks"],
    nacBenefits: [
      "National security protection",
      "Classified data security",
      "Compliance automation",
      "Threat detection",
      "Incident response",
    ],
    costMultiplier: 1.8,
    insurancePremium: 0.15,
  },
  education: {
    name: "Education",
    description: "K-12 schools, universities, and educational institutions",
    compliance: [
      {
        standard: "FERPA",
        description: "Family Educational Rights and Privacy Act",
        criticality: "High",
        nacControls: ["Student Data Protection", "Access Control", "Audit Logging"],
      },
      {
        standard: "COPPA",
        description: "Children's Online Privacy Protection Act",
        criticality: "High",
        nacControls: ["Minor Data Protection", "Parental Consent", "Data Minimization"],
      },
      {
        standard: "CIPA",
        description: "Children's Internet Protection Act",
        criticality: "Medium",
        nacControls: ["Content Filtering", "Internet Safety", "Access Control"],
      },
    ],
    riskFactors: {
      dataValue: 70,
      regulatoryRisk: 75,
      cyberTargeting: 65,
      deviceComplexity: 85,
      studentSafety: 90,
    },
    avgDevices: 4000,
    commonThreats: ["Ransomware", "Student Data Theft", "BYOD Risks", "Phishing Attacks"],
    nacBenefits: [
      "Student data protection",
      "BYOD management",
      "Campus network security",
      "Research data protection",
      "Compliance automation",
    ],
    costMultiplier: 1.1,
    insurancePremium: 0.04,
  },
  retail: {
    name: "Retail",
    description: "Retail stores, e-commerce, and consumer-facing businesses",
    compliance: [
      {
        standard: "PCI DSS",
        description: "Payment Card Industry Data Security Standard",
        criticality: "Critical",
        nacControls: ["Payment System Security", "Network Segmentation", "Access Control"],
      },
      {
        standard: "GDPR",
        description: "General Data Protection Regulation",
        criticality: "High",
        nacControls: ["Customer Data Protection", "Privacy Controls", "Breach Notification"],
      },
      {
        standard: "CCPA",
        description: "California Consumer Privacy Act",
        criticality: "Medium",
        nacControls: ["Consumer Rights", "Data Protection", "Privacy Controls"],
      },
    ],
    riskFactors: {
      dataValue: 80,
      regulatoryRisk: 75,
      cyberTargeting: 85,
      deviceComplexity: 70,
      customerImpact: 85,
    },
    avgDevices: 1500,
    commonThreats: ["Payment Card Fraud", "Customer Data Theft", "POS Malware", "E-commerce Attacks"],
    nacBenefits: [
      "POS system security",
      "Customer data protection",
      "Payment compliance",
      "Store network security",
      "E-commerce protection",
    ],
    costMultiplier: 1.3,
    insurancePremium: 0.07,
  },
}

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare")
  const industry = industryData[selectedIndustry]

  const getComplianceCriticality = (criticality: string) => {
    switch (criticality) {
      case "Critical":
        return { color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-50" }
      case "High":
        return { color: "bg-orange-500", textColor: "text-orange-700", bgColor: "bg-orange-50" }
      case "Medium":
        return { color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-50" }
      default:
        return { color: "bg-gray-500", textColor: "text-gray-700", bgColor: "bg-gray-50" }
    }
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
          <h1 className="text-3xl font-bold">Industry-Specific NAC Analysis</h1>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Industry Report
        </Button>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {Object.entries(industryData).map(([key, data]) => (
            <Button
              key={key}
              variant={selectedIndustry === key ? "default" : "outline"}
              onClick={() => setSelectedIndustry(key)}
              className="h-auto p-3 flex flex-col items-center gap-2"
            >
              <Building2 className="h-5 w-5" />
              <span className="text-xs text-center">{data.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {industry.name} Overview
            </CardTitle>
            <CardDescription>{industry.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Avg. Devices:</span>
                <div className="font-medium">{industry.avgDevices.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cost Multiplier:</span>
                <div className="font-medium">{industry.costMultiplier}x</div>
              </div>
              <div>
                <span className="text-muted-foreground">Insurance Premium:</span>
                <div className="font-medium">{(industry.insurancePremium * 100).toFixed(1)}%</div>
              </div>
              <div>
                <span className="text-muted-foreground">Compliance Standards:</span>
                <div className="font-medium">{industry.compliance.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Assessment
            </CardTitle>
            <CardDescription>Industry-specific risk factors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(industry.riskFactors).map(([factor, score]) => (
              <div key={factor} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{factor.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className="font-medium">{score}/100</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              NAC Benefits
            </CardTitle>
            <CardDescription>Key benefits for {industry.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {industry.nacBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Industry Analysis</CardTitle>
          <CardDescription>Comprehensive breakdown for {industry.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="compliance">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="threats">Threats</TabsTrigger>
              <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
              <TabsTrigger value="charts">Visual Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="compliance" className="pt-6">
              <div className="space-y-4">
                <h3 className="font-medium">Compliance Requirements</h3>
                {industry.compliance.map((comp, index) => {
                  const criticality = getComplianceCriticality(comp.criticality)
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{comp.standard}</h4>
                          <p className="text-sm text-muted-foreground">{comp.description}</p>
                        </div>
                        <Badge className={`${criticality.bgColor} ${criticality.textColor} border-0`}>
                          {comp.criticality}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <span className="text-sm font-medium">NAC Controls:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {comp.nacControls.map((control, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {control}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="threats" className="pt-6">
              <div className="space-y-4">
                <h3 className="font-medium">Common Threats in {industry.name}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {industry.commonThreats.map((threat, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="font-medium">{threat}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        High-priority threat requiring NAC controls for mitigation
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="costs" className="pt-6">
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Base Implementation Cost</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${(50000 * industry.costMultiplier).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {industry.costMultiplier}x industry multiplier
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Annual Insurance Premium</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        ${(industry.avgDevices * 50 * industry.insurancePremium).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Without NAC protection</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Potential Annual Savings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        ${(industry.avgDevices * 50 * industry.insurancePremium * 0.7).toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">70% insurance reduction with NAC</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="charts" className="pt-6">
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-4">Compliance Coverage</h3>
                    <div className="h-[300px]">
                      <IndustryComplianceChart industry={industry} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Risk Factor Analysis</h3>
                    <div className="h-[300px]">
                      <IndustryRiskChart riskFactors={industry.riskFactors} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
