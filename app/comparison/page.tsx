"use client"

import React from "react"

import { useState } from "react"
import { ArrowLeft, Check, Download, Filter, X, Star, TrendingUp, Shield, Zap, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import RadarChart from "@/components/radar-chart"
import FeatureScoreChart from "@/components/feature-score-chart"
import VendorRankingChart from "@/components/vendor-ranking-chart"

// Comprehensive vendor data with detailed feature scoring
const vendorData = {
  portnox: {
    name: "Portnox",
    logo: "🛡️",
    description: "Cloud-native Zero Trust NAC solution with no infrastructure requirements",
    deployment: ["Cloud", "Hybrid"],
    pricing: "Subscription-based, per endpoint",
    overallScore: 92,
    categoryScores: {
      security: 95,
      deployment: 98,
      management: 94,
      integration: 90,
      support: 92,
      cost: 88,
    },
    features: {
      // Core NAC Features
      "802.1X Authentication": { score: 5, weight: 10, category: "Authentication" },
      "MAC Authentication Bypass": { score: 5, weight: 8, category: "Authentication" },
      "Web Authentication": { score: 5, weight: 7, category: "Authentication" },
      "Multi-Factor Authentication": { score: 5, weight: 9, category: "Authentication" },
      "Certificate Management": { score: 5, weight: 8, category: "Authentication" },

      // Zero Trust & Security
      "Zero Trust Architecture": { score: 5, weight: 10, category: "Security" },
      "Continuous Risk Assessment": { score: 5, weight: 9, category: "Security" },
      "Device Profiling": { score: 5, weight: 8, category: "Security" },
      "Behavioral Analytics": { score: 4, weight: 7, category: "Security" },
      "Threat Intelligence": { score: 5, weight: 8, category: "Security" },

      // Network Control
      "Dynamic VLAN Assignment": { score: 5, weight: 8, category: "Network Control" },
      "Network Segmentation": { score: 5, weight: 9, category: "Network Control" },
      "Quarantine/Remediation": { score: 5, weight: 9, category: "Network Control" },
      "Guest Network Management": { score: 5, weight: 7, category: "Network Control" },
      "BYOD Support": { score: 5, weight: 8, category: "Network Control" },

      // Device Management
      "Device Discovery": { score: 5, weight: 9, category: "Device Management" },
      "Asset Inventory": { score: 5, weight: 8, category: "Device Management" },
      "IoT Device Support": { score: 5, weight: 9, category: "Device Management" },
      "Mobile Device Management": { score: 4, weight: 7, category: "Device Management" },
      "Endpoint Compliance": { score: 5, weight: 9, category: "Device Management" },

      // Deployment & Management
      "Cloud-Native Architecture": { score: 5, weight: 10, category: "Deployment" },
      "Agentless Operation": { score: 5, weight: 9, category: "Deployment" },
      "Easy Deployment": { score: 5, weight: 9, category: "Deployment" },
      "Centralized Management": { score: 5, weight: 8, category: "Deployment" },
      "Multi-Tenant Support": { score: 5, weight: 7, category: "Deployment" },

      // Integration & APIs
      "REST API": { score: 5, weight: 8, category: "Integration" },
      "SIEM Integration": { score: 4, weight: 8, category: "Integration" },
      "Active Directory Integration": { score: 5, weight: 9, category: "Integration" },
      "Third-Party Integrations": { score: 4, weight: 7, category: "Integration" },
      "Webhook Support": { score: 5, weight: 6, category: "Integration" },

      // Monitoring & Reporting
      "Real-Time Monitoring": { score: 5, weight: 9, category: "Monitoring" },
      "Advanced Analytics": { score: 5, weight: 8, category: "Monitoring" },
      "Custom Dashboards": { score: 4, weight: 7, category: "Monitoring" },
      "Compliance Reporting": { score: 5, weight: 8, category: "Monitoring" },
      "Audit Logging": { score: 5, weight: 9, category: "Monitoring" },

      // Support & Maintenance
      "24/7 Support": { score: 5, weight: 8, category: "Support" },
      "Professional Services": { score: 4, weight: 6, category: "Support" },
      "Training Programs": { score: 4, weight: 5, category: "Support" },
      "Documentation Quality": { score: 5, weight: 7, category: "Support" },
      "Community Support": { score: 3, weight: 4, category: "Support" },
    },
    pros: [
      "Zero infrastructure requirements",
      "Fastest deployment (2-4 weeks)",
      "Continuous automatic updates",
      "True zero trust architecture",
      "Lowest total cost of ownership",
      "Cloud-native scalability",
    ],
    cons: ["Newer market presence", "Limited on-premises options"],
    compliance: ["HIPAA", "PCI DSS", "GDPR", "NIST", "ISO 27001", "SOC 2"],
    certifications: ["ISO 27001", "SOC 2 Type II", "GDPR Compliant"],
  },
  cisco: {
    name: "Cisco ISE",
    logo: "🔷",
    description: "Enterprise-grade NAC solution with deep Cisco ecosystem integration",
    deployment: ["On-premises", "Hybrid", "Cloud"],
    pricing: "Perpetual license + maintenance",
    overallScore: 88,
    categoryScores: {
      security: 92,
      deployment: 70,
      management: 85,
      integration: 95,
      support: 90,
      cost: 65,
    },
    features: {
      // Core NAC Features
      "802.1X Authentication": { score: 5, weight: 10, category: "Authentication" },
      "MAC Authentication Bypass": { score: 5, weight: 8, category: "Authentication" },
      "Web Authentication": { score: 5, weight: 7, category: "Authentication" },
      "Multi-Factor Authentication": { score: 4, weight: 9, category: "Authentication" },
      "Certificate Management": { score: 5, weight: 8, category: "Authentication" },

      // Zero Trust & Security
      "Zero Trust Architecture": { score: 4, weight: 10, category: "Security" },
      "Continuous Risk Assessment": { score: 4, weight: 9, category: "Security" },
      "Device Profiling": { score: 5, weight: 8, category: "Security" },
      "Behavioral Analytics": { score: 3, weight: 7, category: "Security" },
      "Threat Intelligence": { score: 4, weight: 8, category: "Security" },

      // Network Control
      "Dynamic VLAN Assignment": { score: 5, weight: 8, category: "Network Control" },
      "Network Segmentation": { score: 5, weight: 9, category: "Network Control" },
      "Quarantine/Remediation": { score: 5, weight: 9, category: "Network Control" },
      "Guest Network Management": { score: 5, weight: 7, category: "Network Control" },
      "BYOD Support": { score: 5, weight: 8, category: "Network Control" },

      // Device Management
      "Device Discovery": { score: 4, weight: 9, category: "Device Management" },
      "Asset Inventory": { score: 4, weight: 8, category: "Device Management" },
      "IoT Device Support": { score: 4, weight: 9, category: "Device Management" },
      "Mobile Device Management": { score: 3, weight: 7, category: "Device Management" },
      "Endpoint Compliance": { score: 4, weight: 9, category: "Device Management" },

      // Deployment & Management
      "Cloud-Native Architecture": { score: 2, weight: 10, category: "Deployment" },
      "Agentless Operation": { score: 2, weight: 9, category: "Deployment" },
      "Easy Deployment": { score: 2, weight: 9, category: "Deployment" },
      "Centralized Management": { score: 4, weight: 8, category: "Deployment" },
      "Multi-Tenant Support": { score: 3, weight: 7, category: "Deployment" },

      // Integration & APIs
      "REST API": { score: 4, weight: 8, category: "Integration" },
      "SIEM Integration": { score: 5, weight: 8, category: "Integration" },
      "Active Directory Integration": { score: 5, weight: 9, category: "Integration" },
      "Third-Party Integrations": { score: 5, weight: 7, category: "Integration" },
      "Webhook Support": { score: 3, weight: 6, category: "Integration" },

      // Monitoring & Reporting
      "Real-Time Monitoring": { score: 4, weight: 9, category: "Monitoring" },
      "Advanced Analytics": { score: 4, weight: 8, category: "Monitoring" },
      "Custom Dashboards": { score: 4, weight: 7, category: "Monitoring" },
      "Compliance Reporting": { score: 5, weight: 8, category: "Monitoring" },
      "Audit Logging": { score: 5, weight: 9, category: "Monitoring" },

      // Support & Maintenance
      "24/7 Support": { score: 5, weight: 8, category: "Support" },
      "Professional Services": { score: 5, weight: 6, category: "Support" },
      "Training Programs": { score: 5, weight: 5, category: "Support" },
      "Documentation Quality": { score: 4, weight: 7, category: "Support" },
      "Community Support": { score: 5, weight: 4, category: "Support" },
    },
    pros: [
      "Deep Cisco ecosystem integration",
      "Mature and proven solution",
      "Extensive feature set",
      "Strong enterprise support",
      "Comprehensive policy engine",
      "TrustSec integration",
    ],
    cons: [
      "Complex deployment and management",
      "High total cost of ownership",
      "Requires specialized expertise",
      "Long implementation timeline",
      "Hardware dependencies",
    ],
    compliance: ["HIPAA", "PCI DSS", "GDPR", "NIST", "ISO 27001", "FISMA", "Common Criteria"],
    certifications: ["FIPS 140-2", "Common Criteria", "FISMA"],
  },
  aruba: {
    name: "Aruba ClearPass",
    logo: "🟠",
    description: "Comprehensive NAC solution with strong wireless and mobility focus",
    deployment: ["On-premises", "Hybrid", "Cloud"],
    pricing: "Perpetual license + maintenance",
    overallScore: 85,
    categoryScores: {
      security: 88,
      deployment: 75,
      management: 82,
      integration: 85,
      support: 85,
      cost: 70,
    },
    features: {
      // Core NAC Features
      "802.1X Authentication": { score: 5, weight: 10, category: "Authentication" },
      "MAC Authentication Bypass": { score: 5, weight: 8, category: "Authentication" },
      "Web Authentication": { score: 5, weight: 7, category: "Authentication" },
      "Multi-Factor Authentication": { score: 4, weight: 9, category: "Authentication" },
      "Certificate Management": { score: 4, weight: 8, category: "Authentication" },

      // Zero Trust & Security
      "Zero Trust Architecture": { score: 3, weight: 10, category: "Security" },
      "Continuous Risk Assessment": { score: 3, weight: 9, category: "Security" },
      "Device Profiling": { score: 5, weight: 8, category: "Security" },
      "Behavioral Analytics": { score: 3, weight: 7, category: "Security" },
      "Threat Intelligence": { score: 3, weight: 8, category: "Security" },

      // Network Control
      "Dynamic VLAN Assignment": { score: 5, weight: 8, category: "Network Control" },
      "Network Segmentation": { score: 4, weight: 9, category: "Network Control" },
      "Quarantine/Remediation": { score: 4, weight: 9, category: "Network Control" },
      "Guest Network Management": { score: 5, weight: 7, category: "Network Control" },
      "BYOD Support": { score: 5, weight: 8, category: "Network Control" },

      // Device Management
      "Device Discovery": { score: 4, weight: 9, category: "Device Management" },
      "Asset Inventory": { score: 4, weight: 8, category: "Device Management" },
      "IoT Device Support": { score: 4, weight: 9, category: "Device Management" },
      "Mobile Device Management": { score: 4, weight: 7, category: "Device Management" },
      "Endpoint Compliance": { score: 4, weight: 9, category: "Device Management" },

      // Deployment & Management
      "Cloud-Native Architecture": { score: 3, weight: 10, category: "Deployment" },
      "Agentless Operation": { score: 3, weight: 9, category: "Deployment" },
      "Easy Deployment": { score: 3, weight: 9, category: "Deployment" },
      "Centralized Management": { score: 4, weight: 8, category: "Deployment" },
      "Multi-Tenant Support": { score: 3, weight: 7, category: "Deployment" },

      // Integration & APIs
      "REST API": { score: 4, weight: 8, category: "Integration" },
      "SIEM Integration": { score: 4, weight: 8, category: "Integration" },
      "Active Directory Integration": { score: 5, weight: 9, category: "Integration" },
      "Third-Party Integrations": { score: 4, weight: 7, category: "Integration" },
      "Webhook Support": { score: 3, weight: 6, category: "Integration" },

      // Monitoring & Reporting
      "Real-Time Monitoring": { score: 4, weight: 9, category: "Monitoring" },
      "Advanced Analytics": { score: 3, weight: 8, category: "Monitoring" },
      "Custom Dashboards": { score: 3, weight: 7, category: "Monitoring" },
      "Compliance Reporting": { score: 4, weight: 8, category: "Monitoring" },
      "Audit Logging": { score: 4, weight: 9, category: "Monitoring" },

      // Support & Maintenance
      "24/7 Support": { score: 4, weight: 8, category: "Support" },
      "Professional Services": { score: 4, weight: 6, category: "Support" },
      "Training Programs": { score: 4, weight: 5, category: "Support" },
      "Documentation Quality": { score: 4, weight: 7, category: "Support" },
      "Community Support": { score: 3, weight: 4, category: "Support" },
    },
    pros: [
      "Strong wireless integration",
      "Excellent guest management",
      "Good mobile device support",
      "HPE ecosystem integration",
      "Mature wireless security",
      "Policy flexibility",
    ],
    cons: [
      "Complex deployment",
      "High licensing costs",
      "Limited cloud-native features",
      "Requires infrastructure investment",
    ],
    compliance: ["HIPAA", "PCI DSS", "GDPR", "NIST", "ISO 27001"],
    certifications: ["ISO 27001", "SOC 2"],
  },
  forescout: {
    name: "Forescout",
    logo: "👁️",
    description: "Agentless NAC solution with exceptional device visibility and discovery",
    deployment: ["On-premises", "Hybrid", "Cloud"],
    pricing: "Perpetual license + maintenance",
    overallScore: 83,
    categoryScores: {
      security: 85,
      deployment: 78,
      management: 80,
      integration: 88,
      support: 82,
      cost: 68,
    },
    features: {
      // Core NAC Features
      "802.1X Authentication": { score: 4, weight: 10, category: "Authentication" },
      "MAC Authentication Bypass": { score: 4, weight: 8, category: "Authentication" },
      "Web Authentication": { score: 3, weight: 7, category: "Authentication" },
      "Multi-Factor Authentication": { score: 2, weight: 9, category: "Authentication" },
      "Certificate Management": { score: 3, weight: 8, category: "Authentication" },

      // Zero Trust & Security
      "Zero Trust Architecture": { score: 4, weight: 10, category: "Security" },
      "Continuous Risk Assessment": { score: 4, weight: 9, category: "Security" },
      "Device Profiling": { score: 5, weight: 8, category: "Security" },
      "Behavioral Analytics": { score: 4, weight: 7, category: "Security" },
      "Threat Intelligence": { score: 4, weight: 8, category: "Security" },

      // Network Control
      "Dynamic VLAN Assignment": { score: 4, weight: 8, category: "Network Control" },
      "Network Segmentation": { score: 5, weight: 9, category: "Network Control" },
      "Quarantine/Remediation": { score: 5, weight: 9, category: "Network Control" },
      "Guest Network Management": { score: 3, weight: 7, category: "Network Control" },
      "BYOD Support": { score: 4, weight: 8, category: "Network Control" },

      // Device Management
      "Device Discovery": { score: 5, weight: 9, category: "Device Management" },
      "Asset Inventory": { score: 5, weight: 8, category: "Device Management" },
      "IoT Device Support": { score: 5, weight: 9, category: "Device Management" },
      "Mobile Device Management": { score: 3, weight: 7, category: "Device Management" },
      "Endpoint Compliance": { score: 4, weight: 9, category: "Device Management" },

      // Deployment & Management
      "Cloud-Native Architecture": { score: 2, weight: 10, category: "Deployment" },
      "Agentless Operation": { score: 5, weight: 9, category: "Deployment" },
      "Easy Deployment": { score: 3, weight: 9, category: "Deployment" },
      "Centralized Management": { score: 4, weight: 8, category: "Deployment" },
      "Multi-Tenant Support": { score: 2, weight: 7, category: "Deployment" },

      // Integration & APIs
      "REST API": { score: 4, weight: 8, category: "Integration" },
      "SIEM Integration": { score: 5, weight: 8, category: "Integration" },
      "Active Directory Integration": { score: 4, weight: 9, category: "Integration" },
      "Third-Party Integrations": { score: 5, weight: 7, category: "Integration" },
      "Webhook Support": { score: 4, weight: 6, category: "Integration" },

      // Monitoring & Reporting
      "Real-Time Monitoring": { score: 5, weight: 9, category: "Monitoring" },
      "Advanced Analytics": { score: 4, weight: 8, category: "Monitoring" },
      "Custom Dashboards": { score: 4, weight: 7, category: "Monitoring" },
      "Compliance Reporting": { score: 4, weight: 8, category: "Monitoring" },
      "Audit Logging": { score: 4, weight: 9, category: "Monitoring" },

      // Support & Maintenance
      "24/7 Support": { score: 4, weight: 8, category: "Support" },
      "Professional Services": { score: 4, weight: 6, category: "Support" },
      "Training Programs": { score: 3, weight: 5, category: "Support" },
      "Documentation Quality": { score: 4, weight: 7, category: "Support" },
      "Community Support": { score: 3, weight: 4, category: "Support" },
    },
    pros: [
      "Exceptional device discovery",
      "Agentless architecture",
      "Strong IoT support",
      "Comprehensive visibility",
      "Good integration capabilities",
      "Automated response actions",
    ],
    cons: ["Limited authentication options", "Complex policy management", "High cost", "Steep learning curve"],
    compliance: ["HIPAA", "PCI DSS", "GDPR", "NIST"],
    certifications: ["ISO 27001"],
  },
  securew2: {
    name: "SecureW2",
    logo: "🔐",
    description: "Cloud-based certificate management and RADIUS solution",
    deployment: ["Cloud", "Hybrid"],
    pricing: "Subscription per user/month",
    overallScore: 78,
    categoryScores: {
      security: 82,
      deployment: 90,
      management: 85,
      integration: 75,
      support: 78,
      cost: 85,
    },
    features: {
      // Core NAC Features
      "802.1X Authentication": { score: 5, weight: 10, category: "Authentication" },
      "MAC Authentication Bypass": { score: 3, weight: 8, category: "Authentication" },
      "Web Authentication": { score: 4, weight: 7, category: "Authentication" },
      "Multi-Factor Authentication": { score: 3, weight: 9, category: "Authentication" },
      "Certificate Management": { score: 5, weight: 8, category: "Authentication" },

      // Zero Trust & Security
      "Zero Trust Architecture": { score: 3, weight: 10, category: "Security" },
      "Continuous Risk Assessment": { score: 2, weight: 9, category: "Security" },
      "Device Profiling": { score: 3, weight: 8, category: "Security" },
      "Behavioral Analytics": { score: 2, weight: 7, category: "Security" },
      "Threat Intelligence": { score: 2, weight: 8, category: "Security" },

      // Network Control
      "Dynamic VLAN Assignment": { score: 4, weight: 8, category: "Network Control" },
      "Network Segmentation": { score: 3, weight: 9, category: "Network Control" },
      "Quarantine/Remediation": { score: 3, weight: 9, category: "Network Control" },
      "Guest Network Management": { score: 4, weight: 7, category: "Network Control" },
      "BYOD Support": { score: 5, weight: 8, category: "Network Control" },

      // Device Management
      "Device Discovery": { score: 3, weight: 9, category: "Device Management" },
      "Asset Inventory": { score: 3, weight: 8, category: "Device Management" },
      "IoT Device Support": { score: 3, weight: 9, category: "Device Management" },
      "Mobile Device Management": { score: 4, weight: 7, category: "Device Management" },
      "Endpoint Compliance": { score: 3, weight: 9, category: "Device Management" },

      // Deployment & Management
      "Cloud-Native Architecture": { score: 5, weight: 10, category: "Deployment" },
      "Agentless Operation": { score: 4, weight: 9, category: "Deployment" },
      "Easy Deployment": { score: 5, weight: 9, category: "Deployment" },
      "Centralized Management": { score: 4, weight: 8, category: "Deployment" },
      "Multi-Tenant Support": { score: 4, weight: 7, category: "Deployment" },

      // Integration & APIs
      "REST API": { score: 3, weight: 8, category: "Integration" },
      "SIEM Integration": { score: 2, weight: 8, category: "Integration" },
      "Active Directory Integration": { score: 4, weight: 9, category: "Integration" },
      "Third-Party Integrations": { score: 3, weight: 7, category: "Integration" },
      "Webhook Support": { score: 3, weight: 6, category: "Integration" },

      // Monitoring & Reporting
      "Real-Time Monitoring": { score: 3, weight: 9, category: "Monitoring" },
      "Advanced Analytics": { score: 2, weight: 8, category: "Monitoring" },
      "Custom Dashboards": { score: 3, weight: 7, category: "Monitoring" },
      "Compliance Reporting": { score: 3, weight: 8, category: "Monitoring" },
      "Audit Logging": { score: 4, weight: 9, category: "Monitoring" },

      // Support & Maintenance
      "24/7 Support": { score: 3, weight: 8, category: "Support" },
      "Professional Services": { score: 3, weight: 6, category: "Support" },
      "Training Programs": { score: 3, weight: 5, category: "Support" },
      "Documentation Quality": { score: 4, weight: 7, category: "Support" },
      "Community Support": { score: 2, weight: 4, category: "Support" },
    },
    pros: [
      "Excellent certificate management",
      "Easy cloud deployment",
      "Good BYOD onboarding",
      "Cost-effective for education",
      "Simple management interface",
    ],
    cons: [
      "Limited enterprise features",
      "Basic analytics",
      "Limited integration options",
      "Focused mainly on Wi-Fi security",
    ],
    compliance: ["GDPR", "FERPA"],
    certifications: ["SOC 2"],
  },
  foxpass: {
    name: "Foxpass",
    logo: "🦊",
    description: "Cloud-based LDAP and RADIUS service with modern authentication",
    deployment: ["Cloud"],
    pricing: "Subscription per user/month",
    overallScore: 75,
    categoryScores: {
      security: 78,
      deployment: 92,
      management: 80,
      integration: 72,
      support: 75,
      cost: 88,
    },
    features: {
      // Core NAC Features
      "802.1X Authentication": { score: 4, weight: 10, category: "Authentication" },
      "MAC Authentication Bypass": { score: 3, weight: 8, category: "Authentication" },
      "Web Authentication": { score: 3, weight: 7, category: "Authentication" },
      "Multi-Factor Authentication": { score: 4, weight: 9, category: "Authentication" },
      "Certificate Management": { score: 3, weight: 8, category: "Authentication" },

      // Zero Trust & Security
      "Zero Trust Architecture": { score: 2, weight: 10, category: "Security" },
      "Continuous Risk Assessment": { score: 2, weight: 9, category: "Security" },
      "Device Profiling": { score: 2, weight: 8, category: "Security" },
      "Behavioral Analytics": { score: 1, weight: 7, category: "Security" },
      "Threat Intelligence": { score: 1, weight: 8, category: "Security" },

      // Network Control
      "Dynamic VLAN Assignment": { score: 3, weight: 8, category: "Network Control" },
      "Network Segmentation": { score: 2, weight: 9, category: "Network Control" },
      "Quarantine/Remediation": { score: 2, weight: 9, category: "Network Control" },
      "Guest Network Management": { score: 3, weight: 7, category: "Network Control" },
      "BYOD Support": { score: 4, weight: 8, category: "Network Control" },

      // Device Management
      "Device Discovery": { score: 2, weight: 9, category: "Device Management" },
      "Asset Inventory": { score: 2, weight: 8, category: "Device Management" },
      "IoT Device Support": { score: 2, weight: 9, category: "Device Management" },
      "Mobile Device Management": { score: 3, weight: 7, category: "Device Management" },
      "Endpoint Compliance": { score: 2, weight: 9, category: "Device Management" },

      // Deployment & Management
      "Cloud-Native Architecture": { score: 5, weight: 10, category: "Deployment" },
      "Agentless Operation": { score: 5, weight: 9, category: "Deployment" },
      "Easy Deployment": { score: 5, weight: 9, category: "Deployment" },
      "Centralized Management": { score: 4, weight: 8, category: "Deployment" },
      "Multi-Tenant Support": { score: 3, weight: 7, category: "Deployment" },

      // Integration & APIs
      "REST API": { score: 4, weight: 8, category: "Integration" },
      "SIEM Integration": { score: 2, weight: 8, category: "Integration" },
      "Active Directory Integration": { score: 4, weight: 9, category: "Integration" },
      "Third-Party Integrations": { score: 3, weight: 7, category: "Integration" },
      "Webhook Support": { score: 3, weight: 6, category: "Integration" },

      // Monitoring & Reporting
      "Real-Time Monitoring": { score: 3, weight: 9, category: "Monitoring" },
      "Advanced Analytics": { score: 2, weight: 8, category: "Monitoring" },
      "Custom Dashboards": { score: 2, weight: 7, category: "Monitoring" },
      "Compliance Reporting": { score: 2, weight: 8, category: "Monitoring" },
      "Audit Logging": { score: 3, weight: 9, category: "Monitoring" },

      // Support & Maintenance
      "24/7 Support": { score: 2, weight: 8, category: "Support" },
      "Professional Services": { score: 2, weight: 6, category: "Support" },
      "Training Programs": { score: 2, weight: 5, category: "Support" },
      "Documentation Quality": { score: 3, weight: 7, category: "Support" },
      "Community Support": { score: 2, weight: 4, category: "Support" },
    },
    pros: [
      "Simple cloud deployment",
      "Good for small to medium businesses",
      "Cost-effective",
      "Easy LDAP/RADIUS setup",
      "Modern authentication",
    ],
    cons: [
      "Limited NAC features",
      "Basic security capabilities",
      "Limited enterprise support",
      "Minimal analytics and reporting",
    ],
    compliance: ["GDPR"],
    certifications: [],
  },
}

// Feature categories for filtering
const featureCategories = [
  "Authentication",
  "Security",
  "Network Control",
  "Device Management",
  "Deployment",
  "Integration",
  "Monitoring",
  "Support",
]

export default function ComparisonPage() {
  const [selectedVendors, setSelectedVendors] = useState(["portnox", "cisco", "aruba"])
  const [selectedCategories, setSelectedCategories] = useState(featureCategories)
  const [weightings, setWeightings] = useState({
    security: 10,
    deployment: 8,
    management: 7,
    integration: 6,
    support: 5,
    cost: 9,
  })
  const [showScoring, setShowScoring] = useState(true)
  const [showWeighted, setShowWeighted] = useState(true)

  const allVendors = Object.keys(vendorData)

  const toggleVendor = (vendor: string) => {
    if (selectedVendors.includes(vendor)) {
      if (selectedVendors.length > 1) {
        setSelectedVendors(selectedVendors.filter((v) => v !== vendor))
      }
    } else {
      setSelectedVendors([...selectedVendors, vendor])
    }
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  // Calculate weighted scores
  const calculateWeightedScore = (vendor: any) => {
    let totalScore = 0
    let totalWeight = 0

    Object.entries(vendor.features).forEach(([feature, data]: [string, any]) => {
      if (selectedCategories.includes(data.category)) {
        const categoryWeight = weightings[data.category.toLowerCase()] || 5
        totalScore += data.score * data.weight * categoryWeight
        totalWeight += data.weight * categoryWeight
      }
    })

    return totalWeight > 0 ? (totalScore / totalWeight) * 20 : 0 // Scale to 100
  }

  // Get filtered features
  const getFilteredFeatures = () => {
    const allFeatures = new Set<string>()
    selectedVendors.forEach((vendorKey) => {
      Object.keys(vendorData[vendorKey].features).forEach((feature) => {
        const featureData = vendorData[vendorKey].features[feature]
        if (selectedCategories.includes(featureData.category)) {
          allFeatures.add(feature)
        }
      })
    })
    return Array.from(allFeatures).sort()
  }

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600 bg-green-50"
    if (score >= 3.5) return "text-blue-600 bg-blue-50"
    if (score >= 2.5) return "text-yellow-600 bg-yellow-50"
    if (score >= 1.5) return "text-orange-600 bg-orange-50"
    return "text-red-600 bg-red-50"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 4.5) return <Star className="h-3 w-3 fill-current" />
    if (score >= 3.5) return <TrendingUp className="h-3 w-3" />
    if (score >= 2.5) return <Shield className="h-3 w-3" />
    if (score >= 1.5) return <Zap className="h-3 w-3" />
    return <X className="h-3 w-3" />
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
          <h1 className="text-3xl font-bold">NAC Vendor Feature Comparison Matrix</h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Display Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuCheckboxItem checked={showScoring} onCheckedChange={setShowScoring}>
                Show Feature Scoring
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showWeighted} onCheckedChange={setShowWeighted}>
                Show Weighted Scores
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Matrix
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Vendor Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Vendors to Compare</CardTitle>
            <CardDescription>Choose up to 4 vendors for detailed feature comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {allVendors.map((vendor) => (
                <div key={vendor} className="flex flex-col items-center space-y-2">
                  <Checkbox
                    id={`vendor-${vendor}`}
                    checked={selectedVendors.includes(vendor)}
                    onCheckedChange={() => toggleVendor(vendor)}
                    disabled={!selectedVendors.includes(vendor) && selectedVendors.length >= 4}
                  />
                  <Label htmlFor={`vendor-${vendor}`} className="text-center cursor-pointer">
                    <div className="text-2xl mb-1">{vendorData[vendor].logo}</div>
                    <div className="text-sm font-medium">{vendorData[vendor].name}</div>
                    <div className="text-xs text-muted-foreground">Score: {vendorData[vendor].overallScore}</div>
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Filtering */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Categories</CardTitle>
            <CardDescription>Select feature categories to include in comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {featureCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weighting Controls */}
        {showWeighted && (
          <Card>
            <CardHeader>
              <CardTitle>Category Weightings</CardTitle>
              <CardDescription>Adjust the importance of each category for weighted scoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(weightings).map(([category, weight]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="capitalize">{category}</Label>
                      <span className="text-sm font-medium">{weight}</span>
                    </div>
                    <Slider
                      value={[weight]}
                      onValueChange={(value) => setWeightings((prev) => ({ ...prev, [category]: value[0] }))}
                      max={10}
                      min={1}
                      step={1}
                      className="py-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comparison Results */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison Matrix</CardTitle>
            <CardDescription>Detailed feature-by-feature comparison with scoring</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="matrix">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="matrix">Feature Matrix</TabsTrigger>
                <TabsTrigger value="scores">Score Analysis</TabsTrigger>
                <TabsTrigger value="charts">Visual Charts</TabsTrigger>
              </TabsList>

              <TabsContent value="matrix" className="mt-6">
                <ScrollArea className="h-[800px]">
                  <div className="w-full border rounded-lg">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-background">
                        <tr className="bg-muted/50">
                          <th className="p-4 text-left font-medium text-muted-foreground w-1/4 border-r">Feature</th>
                          {selectedVendors.map((vendor) => (
                            <th key={vendor} className="p-4 text-center font-medium border-r">
                              <div className="flex flex-col items-center gap-1">
                                <div className="text-2xl">{vendorData[vendor].logo}</div>
                                <div>{vendorData[vendor].name}</div>
                                {showWeighted && (
                                  <div className="text-xs text-muted-foreground">
                                    Weighted: {calculateWeightedScore(vendorData[vendor]).toFixed(1)}
                                  </div>
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCategories.map((category) => (
                          <React.Fragment key={category}>
                            <tr className="border-t bg-muted/30">
                              <td colSpan={selectedVendors.length + 1} className="p-4 font-semibold">
                                {category}
                              </td>
                            </tr>
                            {getFilteredFeatures()
                              .filter((feature) =>
                                selectedVendors.some(
                                  (vendor) => vendorData[vendor].features[feature]?.category === category,
                                ),
                              )
                              .map((feature) => (
                                <tr key={feature} className="border-t hover:bg-muted/20">
                                  <td className="p-4 font-medium border-r">
                                    <div className="flex items-center gap-2">
                                      <span>{feature}</span>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Info className="h-3 w-3 text-muted-foreground" />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p className="w-[200px] text-xs">
                                              Weight:{" "}
                                              {(selectedVendors.length > 0 &&
                                                vendorData[selectedVendors[0]].features[feature]?.weight) ||
                                                "N/A"}
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                  </td>
                                  {selectedVendors.map((vendor) => {
                                    const featureData = vendorData[vendor].features[feature]
                                    if (!featureData) {
                                      return (
                                        <td key={vendor} className="p-4 text-center border-r">
                                          <span className="text-muted-foreground">N/A</span>
                                        </td>
                                      )
                                    }

                                    return (
                                      <td key={vendor} className="p-4 text-center border-r">
                                        {showScoring ? (
                                          <div className="flex flex-col items-center gap-1">
                                            <div
                                              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(featureData.score)}`}
                                            >
                                              {getScoreIcon(featureData.score)}
                                              <span>{featureData.score}/5</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                              Weight: {featureData.weight}
                                            </div>
                                          </div>
                                        ) : featureData.score >= 4 ? (
                                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                                        ) : featureData.score >= 2 ? (
                                          <div className="w-5 h-5 bg-yellow-500 rounded-full mx-auto" />
                                        ) : (
                                          <X className="h-5 w-5 text-red-500 mx-auto" />
                                        )}
                                      </td>
                                    )
                                  })}
                                </tr>
                              ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="scores" className="mt-6">
                <div className="space-y-6">
                  {/* Overall Scores */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {selectedVendors.map((vendor) => {
                      const vendorInfo = vendorData[vendor]
                      const weightedScore = calculateWeightedScore(vendorInfo)

                      return (
                        <Card key={vendor}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-center">
                              <div className="text-3xl mb-2">{vendorInfo.logo}</div>
                              <div>{vendorInfo.name}</div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{vendorInfo.overallScore}</div>
                              <div className="text-xs text-muted-foreground">Overall Score</div>
                            </div>
                            {showWeighted && (
                              <div className="text-center">
                                <div className="text-xl font-bold text-secondary-foreground">
                                  {weightedScore.toFixed(1)}
                                </div>
                                <div className="text-xs text-muted-foreground">Weighted Score</div>
                              </div>
                            )}
                            <div className="space-y-2">
                              {Object.entries(vendorInfo.categoryScores).map(([category, score]) => (
                                <div key={category} className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="capitalize">{category}</span>
                                    <span>{score}/100</span>
                                  </div>
                                  <Progress value={score} className="h-1" />
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Feature Score Chart */}
                  <div className="h-[400px]">
                    <FeatureScoreChart
                      vendors={selectedVendors.map((v) => vendorData[v])}
                      categories={selectedCategories}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="charts" className="mt-6">
                <div className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <h3 className="font-medium mb-4">Vendor Ranking</h3>
                      <div className="h-[300px]">
                        <VendorRankingChart
                          vendors={selectedVendors.map((v) => ({
                            ...vendorData[v],
                            weightedScore: showWeighted
                              ? calculateWeightedScore(vendorData[v])
                              : vendorData[v].overallScore,
                          }))}
                          showWeighted={showWeighted}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">Category Comparison</h3>
                      <div className="h-[300px]">
                        <RadarChart vendors={selectedVendors.map((v) => vendorData[v])} />
                      </div>
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
