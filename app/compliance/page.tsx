"use client"

import { useState } from "react"
import { ArrowLeft, Check, Download, Info, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import ComplianceHeatmap from "@/components/compliance-heatmap"

// Sample compliance data
const complianceData = {
  standards: [
    { id: "pci", name: "PCI DSS", description: "Payment Card Industry Data Security Standard" },
    { id: "hipaa", name: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
    { id: "gdpr", name: "GDPR", description: "General Data Protection Regulation" },
    { id: "nist", name: "NIST 800-53", description: "National Institute of Standards and Technology" },
    { id: "iso", name: "ISO 27001", description: "International Organization for Standardization" },
    { id: "soc2", name: "SOC 2", description: "Service Organization Control 2" },
  ],
  requirements: {
    pci: [
      {
        id: "pci-1",
        name: "Requirement 1: Network Security",
        description: "Install and maintain a firewall configuration to protect cardholder data",
      },
      {
        id: "pci-2",
        name: "Requirement 2: Secure Configurations",
        description: "Do not use vendor-supplied defaults for system passwords and other security parameters",
      },
      { id: "pci-3", name: "Requirement 3: Protect Stored Data", description: "Protect stored cardholder data" },
      {
        id: "pci-4",
        name: "Requirement 4: Encrypt Transmission",
        description: "Encrypt transmission of cardholder data across open, public networks",
      },
      {
        id: "pci-5",
        name: "Requirement 5: Malware Protection",
        description: "Protect all systems against malware and regularly update anti-virus software",
      },
      {
        id: "pci-6",
        name: "Requirement 6: Secure Systems",
        description: "Develop and maintain secure systems and applications",
      },
    ],
    hipaa: [
      {
        id: "hipaa-1",
        name: "Privacy Rule",
        description: "Protects the privacy of individually identifiable health information",
      },
      {
        id: "hipaa-2",
        name: "Security Rule",
        description: "Sets standards for the security of electronic protected health information",
      },
      {
        id: "hipaa-3",
        name: "Breach Notification Rule",
        description: "Requires notification following a breach of unsecured protected health information",
      },
      {
        id: "hipaa-4",
        name: "Access Controls",
        description: "Implement technical policies and procedures for electronic information systems",
      },
      {
        id: "hipaa-5",
        name: "Audit Controls",
        description: "Implement hardware, software, and/or procedural mechanisms to record and examine activity",
      },
      {
        id: "hipaa-6",
        name: "Integrity Controls",
        description: "Implement policies and procedures to protect electronic protected health information",
      },
    ],
    gdpr: [
      {
        id: "gdpr-1",
        name: "Lawfulness, Fairness, Transparency",
        description: "Processing must be lawful, fair, and transparent to the data subject",
      },
      {
        id: "gdpr-2",
        name: "Purpose Limitation",
        description: "You must process data for the legitimate purposes specified to the data subject",
      },
      {
        id: "gdpr-3",
        name: "Data Minimization",
        description: "You should collect and process only as much data as absolutely necessary",
      },
      { id: "gdpr-4", name: "Accuracy", description: "You must keep personal data accurate and up to date" },
      {
        id: "gdpr-5",
        name: "Storage Limitation",
        description: "You may only store personally identifying data for as long as necessary",
      },
      {
        id: "gdpr-6",
        name: "Integrity & Confidentiality",
        description: "Processing must ensure appropriate security, integrity, and confidentiality",
      },
    ],
    nist: [
      {
        id: "nist-1",
        name: "Access Control",
        description: "Limit system access to authorized users, processes, or devices",
      },
      {
        id: "nist-2",
        name: "Awareness and Training",
        description: "Ensure that personnel are adequately trained to carry out their duties",
      },
      {
        id: "nist-3",
        name: "Audit and Accountability",
        description: "Create, protect, and retain system audit records to monitor, analyze, investigate",
      },
      {
        id: "nist-4",
        name: "Configuration Management",
        description: "Establish and maintain baseline configurations and inventories of systems",
      },
      {
        id: "nist-5",
        name: "Identification and Authentication",
        description: "Identify system users, processes, and devices",
      },
      { id: "nist-6", name: "Incident Response", description: "Establish an operational incident-handling capability" },
    ],
    iso: [
      {
        id: "iso-1",
        name: "Information Security Policies",
        description: "Management direction for information security",
      },
      {
        id: "iso-2",
        name: "Organization of Information Security",
        description: "Internal organization and mobile devices/teleworking",
      },
      {
        id: "iso-3",
        name: "Human Resource Security",
        description: "Prior to, during, and termination/change of employment",
      },
      {
        id: "iso-4",
        name: "Asset Management",
        description: "Responsibility for assets, information classification, media handling",
      },
      {
        id: "iso-5",
        name: "Access Control",
        description: "Business requirements, user access management, system and application access control",
      },
      { id: "iso-6", name: "Cryptography", description: "Cryptographic controls policy and key management" },
    ],
    soc2: [
      { id: "soc2-1", name: "Security", description: "Protection of system resources against unauthorized access" },
      {
        id: "soc2-2",
        name: "Availability",
        description: "System is available for operation and use as committed or agreed",
      },
      {
        id: "soc2-3",
        name: "Processing Integrity",
        description: "System processing is complete, valid, accurate, timely, and authorized",
      },
      {
        id: "soc2-4",
        name: "Confidentiality",
        description: "Information designated as confidential is protected as committed or agreed",
      },
      {
        id: "soc2-5",
        name: "Privacy",
        description:
          "Personal information is collected, used, retained, disclosed, and disposed of in conformity with commitments",
      },
    ],
  },
  vendors: {
    portnox: {
      name: "Portnox",
      compliance: {
        "pci-1": { compliant: true, notes: "Strong network access controls and segmentation" },
        "pci-2": { compliant: true, notes: "Enforces secure configurations and password policies" },
        "pci-3": { compliant: true, notes: "Helps protect stored data through access controls" },
        "pci-4": { compliant: true, notes: "Supports encrypted communications" },
        "pci-5": { compliant: true, notes: "Checks endpoint security posture including anti-virus" },
        "pci-6": { compliant: true, notes: "Continuous monitoring of system security" },

        "hipaa-1": { compliant: true, notes: "Controls access to PHI systems" },
        "hipaa-2": { compliant: true, notes: "Enforces security controls for ePHI" },
        "hipaa-3": { compliant: true, notes: "Helps identify unauthorized access" },
        "hipaa-4": { compliant: true, notes: "Strong access control implementation" },
        "hipaa-5": { compliant: true, notes: "Comprehensive audit logging" },
        "hipaa-6": { compliant: true, notes: "Maintains integrity through access controls" },

        "gdpr-1": { compliant: true, notes: "Transparent access control policies" },
        "gdpr-2": { compliant: true, notes: "Limits access based on legitimate purpose" },
        "gdpr-3": { compliant: true, notes: "Minimizes unnecessary access to data" },
        "gdpr-4": { compliant: true, notes: "Helps maintain data accuracy through controls" },
        "gdpr-5": { compliant: true, notes: "Supports data lifecycle management" },
        "gdpr-6": { compliant: true, notes: "Strong security and confidentiality controls" },

        "nist-1": { compliant: true, notes: "Comprehensive access control framework" },
        "nist-2": { compliant: true, notes: "Supports security awareness" },
        "nist-3": { compliant: true, notes: "Detailed audit capabilities" },
        "nist-4": { compliant: true, notes: "Enforces secure configurations" },
        "nist-5": { compliant: true, notes: "Strong identification and authentication" },
        "nist-6": { compliant: true, notes: "Supports incident response through alerts" },

        "iso-1": { compliant: true, notes: "Aligns with security policy requirements" },
        "iso-2": { compliant: true, notes: "Supports organizational security structure" },
        "iso-3": { compliant: true, notes: "Manages access throughout employment lifecycle" },
        "iso-4": { compliant: true, notes: "Supports asset management through visibility" },
        "iso-5": { compliant: true, notes: "Comprehensive access control" },
        "iso-6": { compliant: true, notes: "Supports cryptographic implementations" },

        "soc2-1": { compliant: true, notes: "Strong security controls" },
        "soc2-2": { compliant: true, notes: "High availability architecture" },
        "soc2-3": { compliant: true, notes: "Ensures processing integrity through controls" },
        "soc2-4": { compliant: true, notes: "Maintains confidentiality of information" },
        "soc2-5": { compliant: true, notes: "Supports privacy requirements" },
      },
    },
    cisco: {
      name: "Cisco ISE",
      compliance: {
        "pci-1": { compliant: true, notes: "Strong network security controls" },
        "pci-2": { compliant: true, notes: "Enforces secure configurations" },
        "pci-3": { compliant: true, notes: "Helps protect stored data" },
        "pci-4": { compliant: true, notes: "Supports encrypted communications" },
        "pci-5": { compliant: true, notes: "Checks endpoint security" },
        "pci-6": { compliant: true, notes: "Monitors system security" },

        "hipaa-1": { compliant: true, notes: "Controls access to PHI systems" },
        "hipaa-2": { compliant: true, notes: "Enforces security controls" },
        "hipaa-3": { compliant: true, notes: "Helps identify unauthorized access" },
        "hipaa-4": { compliant: true, notes: "Strong access controls" },
        "hipaa-5": { compliant: true, notes: "Comprehensive audit logging" },
        "hipaa-6": { compliant: true, notes: "Maintains integrity through controls" },

        "gdpr-1": { compliant: true, notes: "Transparent access policies" },
        "gdpr-2": { compliant: true, notes: "Limits access appropriately" },
        "gdpr-3": { compliant: true, notes: "Minimizes unnecessary access" },
        "gdpr-4": { compliant: true, notes: "Helps maintain data accuracy" },
        "gdpr-5": { compliant: true, notes: "Supports data lifecycle" },
        "gdpr-6": { compliant: true, notes: "Strong security controls" },

        "nist-1": { compliant: true, notes: "Comprehensive access control" },
        "nist-2": { compliant: true, notes: "Supports security awareness" },
        "nist-3": { compliant: true, notes: "Detailed audit capabilities" },
        "nist-4": { compliant: true, notes: "Enforces configurations" },
        "nist-5": { compliant: true, notes: "Strong authentication" },
        "nist-6": { compliant: true, notes: "Supports incident response" },

        "iso-1": { compliant: true, notes: "Aligns with security policies" },
        "iso-2": { compliant: true, notes: "Supports organizational security" },
        "iso-3": { compliant: true, notes: "Manages access throughout lifecycle" },
        "iso-4": { compliant: true, notes: "Supports asset management" },
        "iso-5": { compliant: true, notes: "Comprehensive access control" },
        "iso-6": { compliant: true, notes: "Supports cryptography" },

        "soc2-1": { compliant: true, notes: "Strong security controls" },
        "soc2-2": { compliant: true, notes: "High availability" },
        "soc2-3": { compliant: true, notes: "Ensures processing integrity" },
        "soc2-4": { compliant: true, notes: "Maintains confidentiality" },
        "soc2-5": { compliant: true, notes: "Supports privacy requirements" },
      },
    },
    aruba: {
      name: "Aruba Clearpass",
      compliance: {
        "pci-1": { compliant: true, notes: "Network security controls" },
        "pci-2": { compliant: true, notes: "Enforces configurations" },
        "pci-3": { compliant: true, notes: "Helps protect data" },
        "pci-4": { compliant: true, notes: "Supports encryption" },
        "pci-5": { compliant: true, notes: "Checks endpoint security" },
        "pci-6": { compliant: true, notes: "Monitors security" },

        "hipaa-1": { compliant: true, notes: "Controls access" },
        "hipaa-2": { compliant: true, notes: "Enforces security" },
        "hipaa-3": { compliant: true, notes: "Identifies unauthorized access" },
        "hipaa-4": { compliant: true, notes: "Access controls" },
        "hipaa-5": { compliant: true, notes: "Audit logging" },
        "hipaa-6": { compliant: true, notes: "Maintains integrity" },

        "gdpr-1": { compliant: true, notes: "Access policies" },
        "gdpr-2": { compliant: true, notes: "Limits access" },
        "gdpr-3": { compliant: true, notes: "Minimizes access" },
        "gdpr-4": { compliant: true, notes: "Data accuracy" },
        "gdpr-5": { compliant: true, notes: "Data lifecycle" },
        "gdpr-6": { compliant: true, notes: "Security controls" },

        "nist-1": { compliant: true, notes: "Access control" },
        "nist-2": { compliant: true, notes: "Security awareness" },
        "nist-3": { compliant: true, notes: "Audit capabilities" },
        "nist-4": { compliant: true, notes: "Configurations" },
        "nist-5": { compliant: true, notes: "Authentication" },
        "nist-6": { compliant: true, notes: "Incident response" },

        "iso-1": { compliant: true, notes: "Security policies" },
        "iso-2": { compliant: true, notes: "Organizational security" },
        "iso-3": { compliant: true, notes: "Access management" },
        "iso-4": { compliant: true, notes: "Asset management" },
        "iso-5": { compliant: true, notes: "Access control" },
        "iso-6": { compliant: true, notes: "Cryptography" },

        "soc2-1": { compliant: true, notes: "Security controls" },
        "soc2-2": { compliant: true, notes: "Availability" },
        "soc2-3": { compliant: true, notes: "Processing integrity" },
        "soc2-4": { compliant: true, notes: "Confidentiality" },
        "soc2-5": { compliant: true, notes: "Privacy support" },
      },
    },
    forescout: {
      name: "Forescout",
      compliance: {
        "pci-1": { compliant: true, notes: "Network visibility and control" },
        "pci-2": { compliant: true, notes: "Configuration enforcement" },
        "pci-3": { compliant: true, notes: "Data protection" },
        "pci-4": { compliant: true, notes: "Encryption support" },
        "pci-5": { compliant: true, notes: "Security posture assessment" },
        "pci-6": { compliant: true, notes: "Security monitoring" },

        "hipaa-1": { compliant: true, notes: "Access controls" },
        "hipaa-2": { compliant: true, notes: "Security enforcement" },
        "hipaa-3": { compliant: true, notes: "Breach detection" },
        "hipaa-4": { compliant: true, notes: "Technical controls" },
        "hipaa-5": { compliant: true, notes: "Audit capabilities" },
        "hipaa-6": { compliant: true, notes: "Integrity controls" },

        "gdpr-1": { compliant: true, notes: "Transparent controls" },
        "gdpr-2": { compliant: true, notes: "Purpose-based access" },
        "gdpr-3": { compliant: true, notes: "Minimal access" },
        "gdpr-4": { compliant: true, notes: "Accuracy support" },
        "gdpr-5": { compliant: true, notes: "Storage controls" },
        "gdpr-6": { compliant: true, notes: "Security measures" },

        "nist-1": { compliant: true, notes: "Access management" },
        "nist-2": { compliant: true, notes: "Awareness support" },
        "nist-3": { compliant: true, notes: "Audit functions" },
        "nist-4": { compliant: true, notes: "Configuration management" },
        "nist-5": { compliant: true, notes: "Identity management" },
        "nist-6": { compliant: true, notes: "Incident handling" },

        "iso-1": { compliant: true, notes: "Policy alignment" },
        "iso-2": { compliant: true, notes: "Security organization" },
        "iso-3": { compliant: true, notes: "HR security" },
        "iso-4": { compliant: true, notes: "Asset controls" },
        "iso-5": { compliant: true, notes: "Access management" },
        "iso-6": { compliant: true, notes: "Crypto support" },

        "soc2-1": { compliant: true, notes: "Security implementation" },
        "soc2-2": { compliant: true, notes: "System availability" },
        "soc2-3": { compliant: true, notes: "Processing controls" },
        "soc2-4": { compliant: true, notes: "Data confidentiality" },
        "soc2-5": { compliant: true, notes: "Privacy controls" },
      },
    },
  },
}

export default function CompliancePage() {
  const [selectedVendor, setSelectedVendor] = useState("portnox")
  const [selectedStandard, setSelectedStandard] = useState("pci")

  const vendor = complianceData.vendors[selectedVendor]
  const standard = complianceData.standards.find((s) => s.id === selectedStandard)
  const requirements = complianceData.requirements[selectedStandard]

  // Calculate compliance percentage
  const calculateCompliance = (vendorId, standardId) => {
    const reqs = complianceData.requirements[standardId]
    if (!reqs) return 0

    const vendorData = complianceData.vendors[vendorId]
    if (!vendorData) return 0

    const compliantCount = reqs.filter((req) => vendorData.compliance[req.id]?.compliant).length

    return (compliantCount / reqs.length) * 100
  }

  // Get all vendors' compliance for heatmap
  const getComplianceData = () => {
    const data = []

    Object.keys(complianceData.vendors).forEach((vendorId) => {
      const vendorData = { vendor: complianceData.vendors[vendorId].name }

      complianceData.standards.forEach((standard) => {
        vendorData[standard.id] = calculateCompliance(vendorId, standard.id)
      })

      data.push(vendorData)
    })

    return data
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
          <h1 className="text-3xl font-bold">Compliance Mapping</h1>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compliance Heatmap</CardTitle>
          <CardDescription>Comparison of compliance coverage across vendors and standards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ComplianceHeatmap data={getComplianceData()} standards={complianceData.standards} />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select value={selectedVendor} onValueChange={setSelectedVendor}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select vendor" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(complianceData.vendors).map((key) => (
              <SelectItem key={key} value={key}>
                {complianceData.vendors[key].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStandard} onValueChange={setSelectedStandard}>
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Select compliance standard" />
          </SelectTrigger>
          <SelectContent>
            {complianceData.standards.map((standard) => (
              <SelectItem key={standard.id} value={standard.id}>
                {standard.name} - {standard.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>{standard?.name} Compliance</CardTitle>
              <CardDescription>{standard?.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Compliance:</span>
              <Badge variant="outline" className="text-base bg-green-50 text-green-700 border-green-200">
                {calculateCompliance(selectedVendor, selectedStandard).toFixed(0)}%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {requirements?.map((req) => {
                const compliance = vendor.compliance[req.id]

                return (
                  <div key={req.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{req.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{req.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge
                          variant={compliance?.compliant ? "outline" : "destructive"}
                          className={compliance?.compliant ? "bg-green-50 text-green-700 border-green-200" : ""}
                        >
                          {compliance?.compliant ? (
                            <div className="flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              <span>Compliant</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <X className="h-3 w-3" />
                              <span>Non-Compliant</span>
                            </div>
                          )}
                        </Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="w-[200px] text-xs">
                                {compliance?.notes || "No additional information available"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
