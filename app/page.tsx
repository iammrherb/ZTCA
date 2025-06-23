"use client"

import React, { useState, useMemo } from "react"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveRadar } from "@nivo/radar"
import { ResponsiveHeatMap } from "@nivo/heatmap"
import { ResponsiveStream } from "@nivo/stream"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  DollarSign,
  ShieldCheck,
  CheckSquare,
  ChevronLeft,
  Menu,
  Zap,
  TrendingUp,
  Shield,
  HelpCircle,
  Settings,
  Download,
  RefreshCw,
  Maximize2,
  Minimize2,
  AlertTriangle,
  Bug,
} from "lucide-react"

// --- ENHANCED MASTER DATA WITH FULL COMPLIANCE ---
const MASTER_DATA = {
  vendors: {
    portnox: {
      name: "Portnox CLEAR",
      shortName: "Portnox",
      color: "#00F5D4",
      architecture: "Cloud-Native",
      security: { zeroTrustScore: 98, threatDetection: 95, mttr: 0.1 },
      metrics: { deploymentTime: 0.5, fteRequired: 0.2 },
      pricing: { model: "subscription", basePrice: 4 },
      costs: { hardware: 0, implementation: 5000, personnelPerYear: 21250 },
      features: {
        iot: 95,
        guest: 98,
        tacacs: 90,
        conditionalAccess: 100,
        mfa: 100,
        deviceTrust: 98,
        radius: 100,
        certAuth: 100,
      },
      compliance: {
        hipaa: 98,
        pci: 99,
        sox: 97,
        nist: 98,
        gdpr: 97,
        iso27001: 98,
        fedramp: 95,
        cmmc: 96,
        nerc: 94,
        ferpa: 96,
        ccpa: 97,
        glba: 96,
        fisma: 95,
        hitech: 98,
      },
    },
    cisco: {
      name: "Cisco ISE",
      shortName: "Cisco",
      color: "#00bceb",
      architecture: "On-Premises",
      security: { zeroTrustScore: 75, threatDetection: 70, mttr: 8 },
      metrics: { deploymentTime: 90, fteRequired: 1.5 },
      pricing: { model: "perpetual", basePrice: 60 },
      costs: { hardware: 120000, implementation: 75000, personnelPerYear: 127500 },
      features: {
        iot: 80,
        guest: 90,
        tacacs: 100,
        conditionalAccess: 70,
        mfa: 85,
        deviceTrust: 80,
        radius: 100,
        certAuth: 90,
      },
      compliance: {
        hipaa: 85,
        pci: 90,
        sox: 88,
        nist: 92,
        gdpr: 85,
        iso27001: 90,
        fedramp: 88,
        cmmc: 85,
        nerc: 90,
        ferpa: 85,
        ccpa: 83,
        glba: 87,
        fisma: 89,
        hitech: 86,
      },
    },
    aruba: {
      name: "Aruba ClearPass",
      shortName: "Aruba",
      color: "#ff6900",
      architecture: "On-Premises",
      security: { zeroTrustScore: 72, threatDetection: 65, mttr: 10 },
      metrics: { deploymentTime: 75, fteRequired: 1.2 },
      pricing: { model: "perpetual", basePrice: 55 },
      costs: { hardware: 85000, implementation: 65000, personnelPerYear: 102000 },
      features: {
        iot: 85,
        guest: 95,
        tacacs: 60,
        conditionalAccess: 65,
        mfa: 90,
        deviceTrust: 82,
        radius: 100,
        certAuth: 92,
      },
      compliance: {
        hipaa: 88,
        pci: 92,
        sox: 85,
        nist: 90,
        gdpr: 86,
        iso27001: 88,
        fedramp: 85,
        cmmc: 83,
        nerc: 87,
        ferpa: 86,
        ccpa: 85,
        glba: 86,
        fisma: 87,
        hitech: 87,
      },
    },
    fortinet: {
      name: "Fortinet FortiNAC",
      shortName: "Fortinet",
      color: "#ee3124",
      architecture: "On-Premises",
      security: { zeroTrustScore: 68, threatDetection: 75, mttr: 12 },
      metrics: { deploymentTime: 60, fteRequired: 1.0 },
      pricing: { model: "perpetual", basePrice: 45 },
      costs: { hardware: 60000, implementation: 40000, personnelPerYear: 85000 },
      features: {
        iot: 90,
        guest: 80,
        tacacs: 80,
        conditionalAccess: 60,
        mfa: 80,
        deviceTrust: 75,
        radius: 100,
        certAuth: 80,
      },
      compliance: {
        hipaa: 80,
        pci: 85,
        sox: 82,
        nist: 88,
        gdpr: 82,
        iso27001: 85,
        fedramp: 82,
        cmmc: 80,
        nerc: 85,
        ferpa: 81,
        ccpa: 80,
        glba: 82,
        fisma: 84,
        hitech: 81,
      },
    },
    forescout: {
      name: "Forescout Platform",
      shortName: "Forescout",
      color: "#7a2a90",
      architecture: "On-Premises",
      security: { zeroTrustScore: 80, threatDetection: 85, mttr: 6 },
      metrics: { deploymentTime: 120, fteRequired: 1.8 },
      pricing: { model: "perpetual", basePrice: 70 },
      costs: { hardware: 150000, implementation: 90000, personnelPerYear: 153000 },
      features: {
        iot: 100,
        guest: 85,
        tacacs: 50,
        conditionalAccess: 75,
        mfa: 80,
        deviceTrust: 88,
        radius: 100,
        certAuth: 85,
      },
      compliance: {
        hipaa: 90,
        pci: 88,
        sox: 86,
        nist: 94,
        gdpr: 88,
        iso27001: 91,
        fedramp: 89,
        cmmc: 87,
        nerc: 91,
        ferpa: 88,
        ccpa: 87,
        glba: 88,
        fisma: 90,
        hitech: 89,
      },
    },
    packetfence: {
      name: "PacketFence",
      shortName: "PacketFence",
      color: "#f0ad4e",
      architecture: "On-Premises",
      security: { zeroTrustScore: 60, threatDetection: 50, mttr: 24 },
      metrics: { deploymentTime: 100, fteRequired: 2.0 },
      pricing: { model: "open-source", basePrice: 0 },
      costs: { hardware: 50000, implementation: 100000, personnelPerYear: 170000 },
      features: {
        iot: 70,
        guest: 80,
        tacacs: 85,
        conditionalAccess: 50,
        mfa: 70,
        deviceTrust: 65,
        radius: 100,
        certAuth: 80,
      },
      compliance: {
        hipaa: 60,
        pci: 65,
        sox: 62,
        nist: 70,
        gdpr: 65,
        iso27001: 68,
        fedramp: 60,
        cmmc: 58,
        nerc: 65,
        ferpa: 62,
        ccpa: 60,
        glba: 62,
        fisma: 65,
        hitech: 61,
      },
    },
    ivanti: {
      name: "Ivanti Neurons for ZTA",
      shortName: "Ivanti",
      color: "#008c95",
      architecture: "Cloud-Managed",
      security: { zeroTrustScore: 82, threatDetection: 80, mttr: 4 },
      metrics: { deploymentTime: 30, fteRequired: 0.6 },
      pricing: { model: "subscription", basePrice: 18 },
      costs: { hardware: 10000, implementation: 25000, personnelPerYear: 51000 },
      features: {
        iot: 75,
        guest: 88,
        tacacs: 40,
        conditionalAccess: 85,
        mfa: 95,
        deviceTrust: 90,
        radius: 100,
        certAuth: 90,
      },
      compliance: {
        hipaa: 90,
        pci: 85,
        sox: 88,
        nist: 91,
        gdpr: 89,
        iso27001: 90,
        fedramp: 87,
        cmmc: 85,
        nerc: 88,
        ferpa: 88,
        ccpa: 88,
        glba: 87,
        fisma: 88,
        hitech: 89,
      },
    },
    extreme: {
      name: "ExtremeControl",
      shortName: "Extreme",
      color: "#682a7d",
      architecture: "On-Premises",
      security: { zeroTrustScore: 65, threatDetection: 60, mttr: 14 },
      metrics: { deploymentTime: 80, fteRequired: 1.1 },
      pricing: { model: "perpetual", basePrice: 50 },
      costs: { hardware: 75000, implementation: 50000, personnelPerYear: 93500 },
      features: {
        iot: 82,
        guest: 85,
        tacacs: 70,
        conditionalAccess: 60,
        mfa: 75,
        deviceTrust: 70,
        radius: 100,
        certAuth: 80,
      },
      compliance: {
        hipaa: 75,
        pci: 80,
        sox: 78,
        nist: 82,
        gdpr: 78,
        iso27001: 80,
        fedramp: 75,
        cmmc: 73,
        nerc: 80,
        ferpa: 76,
        ccpa: 75,
        glba: 77,
        fisma: 78,
        hitech: 76,
      },
    },
    juniper: {
      name: "Juniper Mist",
      shortName: "Juniper",
      color: "#84bd00",
      architecture: "Cloud-Managed",
      security: { zeroTrustScore: 79, threatDetection: 88, mttr: 5 },
      metrics: { deploymentTime: 25, fteRequired: 0.5 },
      pricing: { model: "subscription", basePrice: 22 },
      costs: { hardware: 30000, implementation: 25000, personnelPerYear: 42500 },
      features: {
        iot: 88,
        guest: 90,
        tacacs: 30,
        conditionalAccess: 80,
        mfa: 92,
        deviceTrust: 85,
        radius: 100,
        certAuth: 95,
      },
      compliance: {
        hipaa: 85,
        pci: 88,
        sox: 84,
        nist: 90,
        gdpr: 87,
        iso27001: 88,
        fedramp: 85,
        cmmc: 83,
        nerc: 87,
        ferpa: 85,
        ccpa: 85,
        glba: 85,
        fisma: 86,
        hitech: 85,
      },
    },
    arista: {
      name: "Arista AGNI",
      shortName: "Arista",
      color: "#ff7f00",
      architecture: "Cloud-Managed",
      security: { zeroTrustScore: 78, threatDetection: 82, mttr: 6 },
      metrics: { deploymentTime: 28, fteRequired: 0.6 },
      pricing: { model: "subscription", basePrice: 25 },
      costs: { hardware: 40000, implementation: 30000, personnelPerYear: 51000 },
      features: {
        iot: 85,
        guest: 88,
        tacacs: 35,
        conditionalAccess: 78,
        mfa: 90,
        deviceTrust: 84,
        radius: 100,
        certAuth: 90,
      },
      compliance: {
        hipaa: 82,
        pci: 86,
        sox: 83,
        nist: 89,
        gdpr: 85,
        iso27001: 86,
        fedramp: 83,
        cmmc: 81,
        nerc: 85,
        ferpa: 83,
        ccpa: 83,
        glba: 84,
        fisma: 84,
        hitech: 83,
      },
    },
    microsoft: {
      name: "Microsoft NPS",
      shortName: "Microsoft",
      color: "#00a4ef",
      architecture: "On-Premises",
      security: { zeroTrustScore: 45, threatDetection: 30, mttr: 48 },
      metrics: { deploymentTime: 45, fteRequired: 0.8 },
      pricing: { model: "included", basePrice: 5 },
      costs: { hardware: 20000, implementation: 15000, personnelPerYear: 68000 },
      features: {
        iot: 30,
        guest: 40,
        tacacs: 20,
        conditionalAccess: 50,
        mfa: 100,
        deviceTrust: 60,
        radius: 100,
        certAuth: 70,
      },
      compliance: {
        hipaa: 50,
        pci: 55,
        sox: 60,
        nist: 65,
        gdpr: 60,
        iso27001: 62,
        fedramp: 55,
        cmmc: 50,
        nerc: 58,
        ferpa: 55,
        ccpa: 55,
        glba: 57,
        fisma: 58,
        hitech: 52,
      },
    },
    securew2: {
      name: "SecureW2",
      shortName: "SecureW2",
      color: "#2c5aa0",
      architecture: "Cloud-Native",
      security: { zeroTrustScore: 85, threatDetection: 70, mttr: 3 },
      metrics: { deploymentTime: 7, fteRequired: 0.3 },
      pricing: { model: "subscription", basePrice: 8 },
      costs: { hardware: 0, implementation: 8000, personnelPerYear: 25500 },
      features: {
        iot: 60,
        guest: 85,
        tacacs: 20,
        conditionalAccess: 70,
        mfa: 95,
        deviceTrust: 80,
        radius: 100,
        certAuth: 100,
      },
      compliance: {
        hipaa: 80,
        pci: 85,
        sox: 82,
        nist: 88,
        gdpr: 83,
        iso27001: 85,
        fedramp: 80,
        cmmc: 78,
        nerc: 82,
        ferpa: 82,
        ccpa: 82,
        glba: 82,
        fisma: 83,
        hitech: 81,
      },
    },
    foxpass: {
      name: "Foxpass",
      shortName: "Foxpass",
      color: "#d62929",
      architecture: "Cloud-Native",
      security: { zeroTrustScore: 70, threatDetection: 60, mttr: 5 },
      metrics: { deploymentTime: 2, fteRequired: 0.25 },
      pricing: { model: "subscription", basePrice: 6 },
      costs: { hardware: 0, implementation: 5000, personnelPerYear: 21250 },
      features: {
        iot: 50,
        guest: 70,
        tacacs: 75,
        conditionalAccess: 60,
        mfa: 90,
        deviceTrust: 70,
        radius: 100,
        certAuth: 75,
      },
      compliance: {
        hipaa: 70,
        pci: 75,
        sox: 72,
        nist: 78,
        gdpr: 73,
        iso27001: 75,
        fedramp: 70,
        cmmc: 68,
        nerc: 72,
        ferpa: 71,
        ccpa: 71,
        glba: 72,
        fisma: 73,
        hitech: 71,
      },
    },
    meraki: {
      name: "Meraki Access Control",
      shortName: "Meraki",
      color: "#85c03c",
      architecture: "Cloud-Managed",
      security: { zeroTrustScore: 68, threatDetection: 65, mttr: 12 },
      metrics: { deploymentTime: 1, fteRequired: 0.4 },
      pricing: { model: "included", basePrice: 15 },
      costs: { hardware: 0, implementation: 10000, personnelPerYear: 34000 },
      features: {
        iot: 70,
        guest: 92,
        tacacs: 10,
        conditionalAccess: 65,
        mfa: 100,
        deviceTrust: 75,
        radius: 100,
        certAuth: 80,
      },
      compliance: {
        hipaa: 72,
        pci: 80,
        sox: 75,
        nist: 80,
        gdpr: 76,
        iso27001: 78,
        fedramp: 72,
        cmmc: 70,
        nerc: 75,
        ferpa: 73,
        ccpa: 73,
        glba: 74,
        fisma: 75,
        hitech: 73,
      },
    },
  },
  industries: {
    healthcare: {
      name: "Healthcare",
      icon: "🏥",
      breachCost: 11000000,
      riskMultiplier: 1.8,
      primaryStandards: ["HIPAA", "HITECH", "ISO 27001"],
      secondaryStandards: ["NIST", "CCPA"],
      keyRequirements: ["PHI protection", "Audit trails", "Encryption", "Access controls"],
    },
    finance: {
      name: "Financial Services",
      icon: "🏦",
      breachCost: 6000000,
      riskMultiplier: 2.0,
      primaryStandards: ["PCI-DSS", "SOX", "GLBA"],
      secondaryStandards: ["Basel III", "ISO 27001"],
      keyRequirements: ["Transaction security", "Data retention", "Audit compliance", "Fraud prevention"],
    },
    government: {
      name: "Government",
      icon: "🏛️",
      breachCost: 5000000,
      riskMultiplier: 1.5,
      primaryStandards: ["FedRAMP", "FISMA", "CMMC"],
      secondaryStandards: ["StateRAMP", "NIST"],
      keyRequirements: ["Zero trust architecture", "Continuous monitoring", "Supply chain security"],
    },
    manufacturing: {
      name: "Manufacturing",
      icon: "🏭",
      breachCost: 4500000,
      riskMultiplier: 1.4,
      primaryStandards: ["ISO 27001", "NIST", "IEC 62443"],
      secondaryStandards: ["TISAX"],
      keyRequirements: ["OT/IT convergence", "Supply chain", "IP protection"],
    },
    retail: {
      name: "Retail",
      icon: "🛍️",
      breachCost: 3300000,
      riskMultiplier: 1.3,
      primaryStandards: ["PCI-DSS", "CCPA", "SOC 2"],
      secondaryStandards: ["ISO 27001", "GDPR"],
      keyRequirements: ["Payment security", "Customer data", "Multi-location"],
    },
    education: {
      name: "Education",
      icon: "🎓",
      breachCost: 3900000,
      riskMultiplier: 1.1,
      primaryStandards: ["FERPA", "COPPA"],
      secondaryStandards: ["GDPR", "CCPA"],
      keyRequirements: ["Student data protection", "Access controls", "Remote learning"],
    },
    technology: {
      name: "Technology",
      icon: "💻",
      breachCost: 5500000,
      riskMultiplier: 1.2,
      primaryStandards: ["SOC 2", "ISO 27001"],
      secondaryStandards: ["GDPR", "CCPA"],
      keyRequirements: ["Data sovereignty", "API security", "Cloud security"],
    },
    energy: {
      name: "Energy/Utilities",
      icon: "⚡",
      breachCost: 4800000,
      riskMultiplier: 1.6,
      primaryStandards: ["NERC CIP", "IEC 62443"],
      secondaryStandards: ["ISO 27001", "NIST"],
      keyRequirements: ["Critical infrastructure", "SCADA security", "Grid resilience"],
    },
    pharmaceuticals: {
      name: "Pharmaceuticals",
      icon: "💊",
      breachCost: 5200000,
      riskMultiplier: 1.7,
      primaryStandards: ["FDA 21 CFR Part 11", "HIPAA"],
      secondaryStandards: ["GxP", "ISO 27001"],
      keyRequirements: ["Electronic records", "Validation", "Clinical trial data"],
    },
    telecommunications: {
      name: "Telecommunications",
      icon: "📡",
      breachCost: 4000000,
      riskMultiplier: 1.3,
      primaryStandards: ["CPNI", "GDPR"],
      secondaryStandards: ["ISO 27001", "PCI-DSS"],
      keyRequirements: ["Customer data", "Network security", "5G security"],
    },
    legal: {
      name: "Legal Services",
      icon: "⚖️",
      breachCost: 3500000,
      riskMultiplier: 1.2,
      primaryStandards: ["ABA Model Rules"],
      secondaryStandards: ["GDPR", "CCPA"],
      keyRequirements: ["Client confidentiality", "Data retention", "Privilege protection"],
    },
    insurance: {
      name: "Insurance",
      icon: "🛡️",
      breachCost: 4200000,
      riskMultiplier: 1.4,
      primaryStandards: ["NAIC Model Laws"],
      secondaryStandards: ["HIPAA", "PCI-DSS"],
      keyRequirements: ["Claims data", "PII protection", "Risk assessment"],
    },
  },
  compliance: {
    hipaa: {
      name: "HIPAA",
      fullName: "Health Insurance Portability and Accountability Act",
      controls: 54,
      category: "Healthcare",
      description: "Protects patient health information",
    },
    pci: {
      name: "PCI DSS 4.0",
      fullName: "Payment Card Industry Data Security Standard",
      controls: 12,
      category: "Financial",
      description: "Secures payment card data",
    },
    sox: {
      name: "SOX",
      fullName: "Sarbanes-Oxley Act",
      controls: 20,
      category: "Financial",
      description: "Financial reporting requirements",
    },
    nist: {
      name: "NIST 800-53",
      fullName: "NIST Special Publication 800-53",
      controls: 250,
      category: "Federal",
      description: "Security and privacy controls",
    },
    gdpr: {
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      controls: 99,
      category: "Privacy",
      description: "EU data protection regulation",
    },
    iso27001: {
      name: "ISO 27001",
      fullName: "ISO/IEC 27001:2022",
      controls: 93,
      category: "International",
      description: "Information security management",
    },
    fedramp: {
      name: "FedRAMP",
      fullName: "Federal Risk and Authorization Management Program",
      controls: 325,
      category: "Federal",
      description: "Cloud security for government",
    },
    cmmc: {
      name: "CMMC",
      fullName: "Cybersecurity Maturity Model Certification",
      controls: 110,
      category: "Defense",
      description: "DoD contractor requirements",
    },
    nerc: {
      name: "NERC CIP",
      fullName: "North American Electric Reliability Corporation Critical Infrastructure Protection",
      controls: 45,
      category: "Energy",
      description: "Electric grid security",
    },
    ferpa: {
      name: "FERPA",
      fullName: "Family Educational Rights and Privacy Act",
      controls: 12,
      category: "Education",
      description: "Student records privacy",
    },
    ccpa: {
      name: "CCPA",
      fullName: "California Consumer Privacy Act",
      controls: 20,
      category: "Privacy",
      description: "California privacy rights",
    },
    glba: {
      name: "GLBA",
      fullName: "Gramm-Leach-Bliley Act",
      controls: 16,
      category: "Financial",
      description: "Financial privacy protection",
    },
    fisma: {
      name: "FISMA",
      fullName: "Federal Information Security Management Act",
      controls: 171,
      category: "Federal",
      description: "Federal agency security",
    },
    hitech: {
      name: "HITECH",
      fullName: "Health Information Technology for Economic and Clinical Health Act",
      controls: 25,
      category: "Healthcare",
      description: "Electronic health records",
    },
  },
  organizationSizes: [
    {
      id: "small",
      size: "Small Business",
      users: "1-100",
      budget: "$10K-50K/year",
      complexity: "Basic",
      deviceRange: [100, 500],
      complianceNeeds: 1,
    },
    {
      id: "midmarket",
      size: "Mid-Market",
      users: "100-1,000",
      budget: "$50K-250K/year",
      complexity: "Moderate",
      deviceRange: [500, 2500],
      complianceNeeds: 3,
    },
    {
      id: "enterprise",
      size: "Enterprise",
      users: "1,000-10,000",
      budget: "$250K-1M/year",
      complexity: "High",
      deviceRange: [2500, 10000],
      complianceNeeds: 5,
    },
    {
      id: "global",
      size: "Global Enterprise",
      users: "10,000+",
      budget: "$1M+/year",
      complexity: "Very High",
      deviceRange: [10000, 50000],
      complianceNeeds: 10,
    },
  ],
}

// Helper function to safely ensure array
const ensureArray = (value) => {
  if (Array.isArray(value)) return value
  return []
}

// Helper function to safely get array property
const safeArrayAccess = (obj, prop, defaultValue = []) => {
  if (!obj || typeof obj !== "object") return defaultValue
  const value = obj[prop]
  return Array.isArray(value) ? value : defaultValue
}

// --- ENHANCED CALCULATIONS ---
const calculateFinancials = (vendorId, config) => {
  const vendor = MASTER_DATA.vendors[vendorId]
  const industry = MASTER_DATA.industries[config.industry]
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

// --- ENHANCED STYLES & THEME ---
const GlobalStyles = () => (
  <style>{`
    :root {
      --background-rgb: 10, 10, 20; 
      --foreground-rgb: 230, 230, 245; 
      --card-rgb: 20, 20, 35;
      --card-border-rgb: 45, 45, 75; 
      --primary-rgb: 0, 245, 212; 
      --secondary-rgb: 241, 91, 181;
      --accent-rgb: 155, 93, 229;
      --success-rgb: 16, 185, 129;
      --warning-rgb: 245, 158, 11;
      --danger-rgb: 239, 68, 68;
      --info-rgb: 59, 130, 246;
    }
    * { box-sizing: border-box; }
    body { 
      color: rgb(var(--foreground-rgb)); 
      background-color: rgb(var(--background-rgb)); 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
      margin: 0;
      padding: 0;
    }
    .quantum-grid-bg { 
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%; 
      z-index: -2; 
      background-image: 
        linear-gradient(rgba(var(--card-border-rgb), 0.15) 1px, transparent 1px), 
        linear-gradient(90deg, rgba(var(--card-border-rgb), 0.15) 1px, transparent 1px); 
      background-size: 2.5rem 2.5rem; 
    }
    .aurora-bg { 
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%; 
      z-index: -1; 
      overflow: hidden; 
    }
    .aurora-bg::before, .aurora-bg::after { 
      content: ''; 
      position: absolute; 
      width: 140vmax; 
      height: 140vmax; 
      animation: aurora 25s infinite linear; 
    }
    .aurora-bg::before {
      top: 50%; 
      left: 50%; 
      background-image: 
        radial-gradient(circle, rgba(var(--primary-rgb), 0.1) 0%, transparent 50%), 
        radial-gradient(circle, rgba(var(--secondary-rgb), 0.1) 0%, transparent 50%); 
      transform: translate(-50%, -50%);
    }
    .aurora-bg::after {
      top: 40%;
      left: 60%;
      background-image: 
        radial-gradient(circle, rgba(var(--accent-rgb), 0.08) 0%, transparent 50%),
        radial-gradient(circle, rgba(var(--info-rgb), 0.08) 0%, transparent 50%);
      transform: translate(-50%, -50%);
      animation-delay: -12.5s;
    }
    @keyframes aurora { 
      0% { transform: translate(-50%, -50%) rotate(0deg) scale(1.2); } 
      50% { transform: translate(-50%, -50%) rotate(180deg) scale(1.5); } 
      100% { transform: translate(-50%, -50%) rotate(360deg) scale(1.2); } 
    }
    ::-webkit-scrollbar { width: 8px; height: 8px; } 
    ::-webkit-scrollbar-track { background: transparent; } 
    ::-webkit-scrollbar-thumb { 
      background: rgba(var(--card-border-rgb), 0.8); 
      border-radius: 4px; 
    }
    ::-webkit-scrollbar-thumb:hover { 
      background: rgba(var(--card-border-rgb), 1); 
    }
    .glass-effect {
      background: rgba(var(--card-rgb), 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(var(--card-border-rgb), 0.5);
    }
    .neon-glow {
      box-shadow: 
        0 0 10px rgba(var(--primary-rgb), 0.5),
        0 0 20px rgba(var(--primary-rgb), 0.3),
        0 0 30px rgba(var(--primary-rgb), 0.1);
    }
    .gradient-text {
      background: linear-gradient(135deg, 
        rgb(var(--primary-rgb)), 
        rgb(var(--secondary-rgb)), 
        rgb(var(--accent-rgb))
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    .chart-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 200px;
      color: rgb(var(--foreground-rgb), 0.6);
      font-style: italic;
      border: 1px dashed rgba(var(--card-border-rgb), 0.5);
      border-radius: 0.5rem;
      padding: 1rem;
      text-align: center;
    }
  `}</style>
)

const NIVO_THEME = {
  background: "transparent",
  textColor: "rgb(var(--foreground-rgb))",
  fontSize: 12,
  axis: {
    domain: { line: { stroke: "rgba(var(--card-border-rgb), 0.8)", strokeWidth: 1 } },
    ticks: {
      line: { stroke: "rgba(var(--card-border-rgb), 0.8)", strokeWidth: 1 },
      text: { fill: "rgb(var(--foreground-rgb), 0.8)" },
    },
    legend: { text: { fill: "rgb(var(--foreground-rgb))", fontSize: 14, fontWeight: 600 } },
  },
  grid: { line: { stroke: "rgba(var(--card-border-rgb), 0.3)", strokeDasharray: "4 4" } },
  tooltip: {
    container: {
      background: "rgba(var(--card-rgb), 0.95)",
      color: "rgb(var(--foreground-rgb))",
      border: "1px solid rgba(var(--card-border-rgb), 0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: "8px",
      padding: "12px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    },
  },
  legends: { text: { fill: "rgb(var(--foreground-rgb), 0.9)", fontSize: 12 } },
  annotations: {
    text: {
      fontSize: 13,
      fill: "rgb(var(--foreground-rgb))",
      outlineWidth: 2,
      outlineColor: "rgba(var(--background-rgb), 0.8)",
    },
    link: { stroke: "rgba(var(--primary-rgb), 0.5)", strokeWidth: 1 },
    outline: {
      stroke: "rgba(var(--primary-rgb), 0.5)",
      strokeWidth: 2,
      outlineWidth: 3,
      outlineColor: "rgba(var(--background-rgb), 0.8)",
    },
    symbol: {
      fill: "rgba(var(--primary-rgb), 0.5)",
      outlineWidth: 2,
      outlineColor: "rgba(var(--background-rgb), 0.8)",
    },
  },
}

// --- UI & DEBUGGING COMPONENTS ---
const cn = (...inputs) => inputs.filter(Boolean).join(" ")

const Card = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-black/20 border-white/10 hover:border-white/20",
    glass: "glass-effect",
    neon: "bg-black/30 border-white/20 neon-glow",
    gradient: "bg-gradient-to-br from-[rgba(var(--card-rgb),0.8)] to-[rgba(var(--card-rgb),0.4)] border-white/10",
  }
  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-xl border text-card-foreground shadow-2xl shadow-black/30 backdrop-blur-md transition-all duration-300",
        variants[variant],
        className,
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      {...props}
    />
  )
})

const Button = React.forwardRef(
  ({ className, variant = "primary", size = "default", loading = false, ...props }, ref) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-[rgb(var(--primary-rgb))] to-[rgb(var(--accent-rgb))] text-black shadow-lg hover:shadow-xl hover:shadow-[rgb(var(--primary-rgb),0.25)] transition-all duration-300 transform hover:-translate-y-px",
      secondary: "bg-white/10 border border-white/20 text-white/90 hover:bg-white/20 hover:border-white/30",
      ghost: "hover:bg-white/10 text-white/80 hover:text-white",
      danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg hover:shadow-red-500/25",
      success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25",
    }
    const sizes = { default: "h-10 px-4 py-2", lg: "h-12 px-6", sm: "h-8 px-3 text-sm", icon: "h-10 w-10" }
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          loading && "cursor-wait",
          className,
        )}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
        {props.children}
      </button>
    )
  },
)

const ChartContainer = ({ title, description, children, actions, fullscreen = false, onToggleFullscreen }) => (
  <Card variant="glass" className={cn("flex flex-col", fullscreen ? "fixed inset-4 z-50" : "h-full min-h-[450px]")}>
    <div className="p-6 border-b border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold gradient-text">{title}</h3>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {onToggleFullscreen && (
            <Button variant="ghost" size="icon" onClick={onToggleFullscreen}>
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
    <div className="flex-1 p-4">{children}</div>
  </Card>
)

class DebugChartWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    const { chartName, children, ...propsToLog } = this.props // Exclude children from logged props
    console.error(`[DebugChartWrapper: ${chartName}] CRASHED! Details:`)
    console.error("Error Object:", error)
    if (error && typeof error === "object") {
      // Attempt to log all properties of the error object
      for (const key in error) {
        if (Object.prototype.hasOwnProperty.call(error, key)) {
          try {
            console.error(`Error property - ${key}:`, error[key])
          } catch (e) {
            console.error(`Error property - ${key}: (Could not log value)`)
          }
        }
      }
    }
    console.error("React Error Info (Component Stack):", errorInfo?.componentStack)
    console.error("Chart Props at time of crash:", propsToLog)
    this.setState({ error, errorInfo })
  }

  render() {
    const { chartName, children, ...props } = this.props
    const { hasError, error, errorInfo } = this.state

    if (hasError) {
      let errorMessage = "Unknown error"
      let errorStack = "No stack available"

      if (error) {
        if (error.message && typeof error.message === "string") {
          errorMessage = error.message
        } else if (typeof error.toString === "function" && error.toString() !== "[object Object]") {
          errorMessage = error.toString()
        } else {
          try {
            errorMessage = JSON.stringify(error)
          } catch (e) {
            errorMessage = "Could not stringify error object."
          }
        }
        if (error.stack && typeof error.stack === "string") {
          errorStack = error.stack
        } else if (errorInfo?.componentStack) {
          errorStack = errorInfo.componentStack
        }
      }

      return (
        <div className="chart-placeholder text-red-400">
          <AlertTriangle className="w-10 h-10 mb-3 text-red-500" />
          <p className="font-bold text-lg">Error rendering {chartName}.</p>
          <p className="text-sm text-gray-400 mt-1">Check browser console for detailed logs.</p>
          <details className="mt-3 text-xs text-left w-full max-w-md">
            <summary className="cursor-pointer text-gray-300 hover:text-white">Error Details</summary>
            <pre className="mt-2 bg-black/30 p-3 rounded-md max-w-full overflow-auto whitespace-pre-wrap break-all">
              Message: {errorMessage}
            </pre>
            <pre className="mt-2 bg-black/30 p-3 rounded-md max-w-full overflow-auto whitespace-pre-wrap break-all">
              Stack: {errorStack}
            </pre>
          </details>
        </div>
      )
    }

    console.log(`[DebugChartWrapper: ${chartName}] Rendering with props:`, { ...props })

    if (props.data === undefined || props.data === null) {
      console.warn(`[DebugChartWrapper: ${chartName}] 'data' prop is undefined or null.`)
      return <div className="chart-placeholder">Data for {chartName} is not available.</div>
    }
    if (!Array.isArray(props.data)) {
      console.warn(`[DebugChartWrapper: ${chartName}] 'data' prop is not an array. Received:`, props.data)
      return <div className="chart-placeholder">'data' prop must be an array for {chartName}.</div>
    }
    if (props.data.length === 0) {
      return <div className="chart-placeholder">No data to display for {chartName}.</div>
    }
    // Check for 'keys' prop if it exists and is expected to be an array
    if (props.keys !== undefined) {
      if (!Array.isArray(props.keys)) {
        console.warn(`[DebugChartWrapper: ${chartName}] 'keys' prop is not an array. Received:`, props.keys)
        return <div className="chart-placeholder">'keys' prop must be an array for {chartName}.</div>
      }
      if (props.keys.length === 0) {
        console.warn(`[DebugChartWrapper: ${chartName}] 'keys' prop is an empty array.`)
        return <div className="chart-placeholder">'keys' array is empty for {chartName}.</div>
      }
    }

    return children
  }
}

const DebugInfo = ({ config, filters, data }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={() => setIsOpen(!isOpen)} variant="secondary" size="sm">
        <Bug className="w-4 h-4 mr-2" />
        Debug Info
      </Button>
      {isOpen && (
        <Card variant="glass" className="absolute bottom-full right-0 w-96 max-h-96 overflow-auto p-4 mb-2">
          <h4 className="font-bold text-sm gradient-text">Config</h4>
          <pre className="text-xs bg-black/50 p-2 rounded max-h-40 overflow-auto">
            {JSON.stringify(config, null, 2)}
          </pre>
          <h4 className="font-bold text-sm mt-2 gradient-text">Filters</h4>
          <pre className="text-xs bg-black/50 p-2 rounded max-h-40 overflow-auto">
            {JSON.stringify(filters, null, 2)}
          </pre>
          <h4 className="font-bold text-sm mt-2 gradient-text">Processed Data</h4>
          <pre className="text-xs bg-black/50 p-2 rounded">{ensureArray(data).length} vendors</pre>
        </Card>
      )}
    </div>
  )
}

// --- NAVIGATION ---
const NavContext = React.createContext()
const NavProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  return (
    <NavContext.Provider value={{ currentPage, setPage: setCurrentPage, sidebarExpanded, setSidebarExpanded }}>
      {children}
    </NavContext.Provider>
  )
}
const useNav = () => React.useContext(NavContext)

const AppSidebar = () => {
  const { currentPage, setPage, sidebarExpanded, setSidebarExpanded } = useNav()
  const navItems = [
    { page: "dashboard", name: "Executive Dashboard", icon: Home, description: "High-level KPIs and insights" },
    { page: "financial", name: "Financial Deep Dive", icon: DollarSign, description: "TCO, ROI, and cost analysis" },
    { page: "compliance", name: "Compliance Matrix", icon: CheckSquare, description: "Standards and regulations" },
  ]
  return (
    <motion.aside
      animate={{ width: sidebarExpanded ? 280 : 80 }}
      className="relative h-screen bg-black/40 border-r border-white/10 flex flex-col shrink-0 glass-effect"
    >
      <div className="flex items-center justify-between p-5 h-20 border-b border-white/10">
        {sidebarExpanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[rgb(var(--primary-rgb))]" />
            <span className="text-lg font-bold gradient-text">ZTCA Platform</span>
          </motion.div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
          {sidebarExpanded ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {ensureArray(navItems).map((item) => (
          <motion.a
            href="#"
            key={item.page}
            onClick={(e) => {
              e.preventDefault()
              setPage(item.page)
            }}
            className={cn(
              "flex items-center p-3 rounded-lg transition-all duration-200 group relative",
              currentPage === item.page
                ? "bg-[rgba(var(--primary-rgb),0.15)] text-[rgb(var(--primary-rgb))] shadow-inner"
                : "text-gray-300 hover:bg-white/10 hover:text-white",
              !sidebarExpanded && "justify-center",
            )}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className="w-6 h-6 shrink-0" />
            {sidebarExpanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-4 flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </motion.div>
            )}
            {!sidebarExpanded && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-black/90 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-white/20">
                {item.name}
              </div>
            )}
          </motion.a>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Button variant="primary" size={sidebarExpanded ? "default" : "icon"} className="w-full">
          {sidebarExpanded ? (
            <>
              <Download className="w-4 h-4 mr-2" /> Export Report
            </>
          ) : (
            <Download className="w-4 h-4" />
          )}
        </Button>
      </div>
    </motion.aside>
  )
}

// --- PAGE COMPONENTS ---
const ExecutiveDashboard = ({ data = [], config = {} }) => {
  const safeData = ensureArray(data)
  if (safeData.length === 0) return <div className="chart-placeholder">Loading Executive Dashboard Analysis...</div>

  const portnox = safeData.find((v) => v.id === "portnox")
  const competitors = safeData.filter((v) => v.id !== "portnox")
  const avgCompetitorTCO =
    competitors.length > 0 ? competitors.reduce((acc, v) => acc + (v.financials?.tco || 0), 0) / competitors.length : 0
  const savings = portnox ? avgCompetitorTCO - (portnox.financials?.tco || 0) : 0
  const industry = MASTER_DATA.industries[config.industry] || MASTER_DATA.industries.technology

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
    standard: MASTER_DATA.compliance[std].name,
    portnox: portnox?.compliance?.[std] || 0,
    average:
      competitors.length > 0
        ? Math.round(competitors.reduce((acc, v) => acc + (v.compliance?.[std] || 0), 0) / competitors.length)
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
                colors={(d) => (d.data.id === "portnox" ? "#00F5D4" : d.data.color)}
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
                  format: (v) => `$${(v / 1000000).toFixed(1)}M`,
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

const FinancialDeepDive = ({ data = [], config = {} }) => {
  const safeData = ensureArray(data)
  if (safeData.length === 0) return <div className="chart-placeholder">Loading Financial Deep Dive Analysis...</div>

  const portnox = safeData.find((v) => v.id === "portnox")
  if (!portnox || !portnox.financials) return <div className="chart-placeholder">Loading Portnox Financial Data...</div>

  const validData = safeData.filter((v) => v.financials && v.financials.breakdown && v.shortName)
  const roiTimelineData = useMemo(() => {
    const timeline = []
    if (validData.length > 0) {
      for (let month = 0; month <= 36; month += 3) {
        const monthData = { month: `Month ${month}` }
        for (const vendor of validData.slice(0, 5)) {
          if (vendor && vendor.financials && vendor.financials.breakdown && vendor.shortName) {
            const monthlyOpex = (vendor.financials.breakdown.opex || 0) / ((config.analysisPeriod || 3) * 12)
            const cumCost = (vendor.financials.breakdown.capex || 0) + monthlyOpex * month
            const cumSavings =
              ((vendor.financials.breakdown.totalSavings || 0) / ((config.analysisPeriod || 3) * 12)) * month
            monthData[vendor.shortName] = Math.round(cumSavings - cumCost)
          }
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
        .filter(Boolean), // Ensure no undefined/null keys
    [validData],
  )

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
                format: (v) => `$${v / 1000}K`,
              }}
              offsetType="diverging"
              colors={(d) => validData.find((v) => v.shortName === d.id)?.color || "#666"}
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

const ComplianceMatrix = ({ data = [], config = {} }) => {
  const safeData = ensureArray(data)
  if (safeData.length === 0) return <div className="chart-placeholder">Loading Compliance Matrix Analysis...</div>

  const portnox = safeData.find((v) => v.id === "portnox")
  if (!portnox || !portnox.compliance)
    return <div className="chart-placeholder">Loading Portnox Compliance Data...</div>

  const vendorComplianceRawData = useMemo(
    () =>
      safeData
        .filter((vendor) => vendor.compliance && vendor.shortName && typeof vendor.shortName === "string") // Ensure shortName is a string
        .slice(0, 8)
        .map((vendor) => ({
          vendor: vendor.shortName, // This will be the indexBy key
          ...Object.keys(MASTER_DATA.compliance).reduce(
            (acc, key) => ({ ...acc, [key]: vendor.compliance?.[key] || 0 }),
            {},
          ),
        })),
    [safeData],
  )

  const complianceHeatmapKeys = useMemo(() => Object.keys(MASTER_DATA.compliance), [])

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
                  format: (v) => MASTER_DATA.compliance[v]?.name || String(v), // Ensure string output
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
                tooltip={({ xKey, yKey, value, color }) => (
                  <div className="p-3 rounded-lg glass-effect">
                    <strong>{String(yKey)}</strong> {/* Ensure yKey is string */}
                    <div className="text-sm mt-1">{MASTER_DATA.compliance[xKey]?.fullName || String(xKey)}</div>
                    <div className="text-2xl font-bold mt-2" style={{ color }}>
                      {value}%
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {MASTER_DATA.compliance[xKey]?.controls || "N/A"} controls
                    </div>
                  </div>
                )}
              />
            </DebugChartWrapper>
          </div>
        </div>
      </ChartContainer>
    </div>
  )
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [config, setConfig] = useState({
    deviceCount: 2500,
    analysisPeriod: 3,
    industry: "technology",
    fteCost: 120000,
    orgSize: "enterprise",
  })

  const [filters, setFilters] = useState({
    architectureTypes: ["Cloud-Native", "Cloud-Managed", "On-Premises"],
    minZeroTrustScore: 0,
    maxTCO: Number.POSITIVE_INFINITY,
    vendors: Object.keys(MASTER_DATA.vendors),
  })

  const processedData = useMemo(() => {
    try {
      return Object.keys(MASTER_DATA.vendors)
        .filter((id) => ensureArray(filters.vendors).includes(id))
        .map((id) => ({
          id,
          ...MASTER_DATA.vendors[id],
          financials: calculateFinancials(id, config),
        }))
        .filter(
          (vendor) =>
            ensureArray(filters.architectureTypes).includes(vendor.architecture) &&
            (vendor.security?.zeroTrustScore ?? 0) >= filters.minZeroTrustScore &&
            (vendor.financials?.tco ?? Number.POSITIVE_INFINITY) <= filters.maxTCO,
        )
    } catch (error) {
      console.error("Error processing vendor data:", error)
      return []
    }
  }, [config, filters])

  const AppContent = () => {
    const { currentPage } = useNav()
    if (!processedData) {
      return (
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-[rgb(var(--primary-rgb))] animate-spin mx-auto mb-4" />
            <div className="text-xl font-bold text-gray-300 mb-2">Calculating...</div>
            <div className="text-sm text-gray-500">Processing vendor analysis data.</div>
          </div>
        </div>
      )
    }
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="p-8"
        >
          {currentPage === "dashboard" && <ExecutiveDashboard data={processedData} config={config} />}
          {currentPage === "financial" && <FinancialDeepDive data={processedData} config={config} />}
          {currentPage === "compliance" && <ComplianceMatrix data={processedData} config={config} />}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <NavProvider>
      <div className="bg-background text-foreground min-h-screen flex antialiased">
        <GlobalStyles />
        <div className="quantum-grid-bg" />
        <div className="aurora-bg" />
        <AppSidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-20 flex items-center justify-between px-8 bg-black/50 border-b border-white/10 backdrop-blur-lg shrink-0">
            <div>
              <h1 className="text-2xl font-bold gradient-text">Zero Trust Total Cost Analyzer</h1>
              <p className="text-sm text-gray-400 mt-1">Comprehensive NAC vendor analysis</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <HelpCircle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="primary" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Export Full Report
              </Button>
            </div>
          </header>
          <div className="p-6 border-b border-white/10 bg-black/30 backdrop-blur-sm shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Analysis Configuration</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-400">Device Count</label>
                <input
                  type="range"
                  min="100"
                  max="50000"
                  step="100"
                  value={config.deviceCount}
                  onChange={(e) => setConfig((c) => ({ ...c, deviceCount: Number(e.target.value) }))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right mt-1 font-mono text-[rgb(var(--primary-rgb))]">
                  {config.deviceCount.toLocaleString()}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-400">Analysis Period</label>
                <select
                  value={config.analysisPeriod}
                  onChange={(e) => setConfig((c) => ({ ...c, analysisPeriod: Number(e.target.value) }))}
                  className="w-full h-10 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-rgb))]"
                >
                  <option value="1">1 Year</option>
                  <option value="3">3 Years</option>
                  <option value="5">5 Years</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-400">Industry</label>
                <select
                  value={config.industry}
                  onChange={(e) => setConfig((c) => ({ ...c, industry: e.target.value }))}
                  className="w-full h-10 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-rgb))]"
                >
                  {Object.entries(MASTER_DATA.industries).map(([id, data]) => (
                    <option key={id} value={id}>
                      {data.icon} {data.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-400">Organization Size</label>
                <select
                  value={config.orgSize}
                  onChange={(e) => setConfig((c) => ({ ...c, orgSize: e.target.value }))}
                  className="w-full h-10 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-rgb))]"
                >
                  {MASTER_DATA.organizationSizes.map((size) => (
                    <option key={size.id} value={size.id}>
                      {size.size} ({size.users})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-400">Avg Security FTE Cost</label>
                <input
                  type="range"
                  min="60000"
                  max="250000"
                  step="5000"
                  value={config.fteCost}
                  onChange={(e) => setConfig((c) => ({ ...c, fteCost: Number(e.target.value) }))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-right mt-1 font-mono text-[rgb(var(--primary-rgb))]">
                  ${config.fteCost.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <AppContent />
          </div>
        </main>
        <DebugInfo config={config} filters={filters} data={processedData} />
      </div>
    </NavProvider>
  )
}
