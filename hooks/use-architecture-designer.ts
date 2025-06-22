"use client"

import { useState } from "react"
import { nanoid } from "nanoid"

// Define types for better clarity
type ComponentType = "Router" | "Switch" | "Firewall" | "Server" | "Endpoint" | "Mobile" | "WirelessAP"
interface Component {
  id: string
  type: ComponentType
  position: { x: number; y: number }
  name?: string // Optional name for easier identification
  tags?: string[] // e.g., ['critical', 'pci-dss']
}
interface Connection {
  from: string
  to: string
}
interface Recommendation {
  id: string
  title: string
  description: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Informational"
  category: "Visibility" | "Control" | "Segmentation" | "Compliance" | "Threat Prevention" | "Resilience"
  relatedComponents?: string[]
  remediation?: string // Suggested fix
}
interface AnalysisResult {
  summary: string
  score: number // 0-100
  recommendations: Recommendation[]
}

export const useArchitectureDesigner = () => {
  const [components, setComponents] = useState<Record<string, Component>>({})
  const [connections, setConnections] = useState<Connection[]>([])

  const addComponent = (type: ComponentType, position: { x: number; y: number }, name?: string) => {
    const id = nanoid()
    setComponents((prev) => ({
      ...prev,
      [id]: { id, type, position, name: name || `${type}-${Object.keys(prev).length + 1}`, tags: [] },
    }))
  }

  const moveComponent = (id: string, delta: { x: number; y: number }) => {
    setComponents((prev) => {
      if (!prev[id]) return prev
      return {
        ...prev,
        [id]: {
          ...prev[id],
          position: {
            x: prev[id].position.x + delta.x,
            y: prev[id].position.y + delta.y,
          },
        },
      }
    })
  }

  const updateComponentData = (id: string, data: Partial<Omit<Component, "id" | "position">>) => {
    setComponents((prev) => {
      if (!prev[id]) return prev
      return {
        ...prev,
        [id]: { ...prev[id], ...data },
      }
    })
  }

  const addConnection = (from: string, to: string) => {
    if (from === to) return // Prevent self-connection
    if (!connections.some((c) => (c.from === from && c.to === to) || (c.from === to && c.to === from))) {
      setConnections((prev) => [...prev, { from, to }])
    }
  }

  const clearArchitecture = () => {
    setComponents({})
    setConnections([])
  }

  const analyzeArchitecture = (): AnalysisResult => {
    const recommendations: Recommendation[] = []
    let score = 100 // Start with a perfect score

    const allComponents = Object.values(components)
    const numComponents = allComponents.length

    if (numComponents === 0) {
      return {
        summary: "No components in the architecture. Add components to start the analysis.",
        score: 0,
        recommendations: [],
      }
    }

    // 1. Basic Connectivity & Visibility
    const endpointTypes: ComponentType[] = ["Endpoint", "Mobile", "Server"]
    const networkAccessPoints: ComponentType[] = ["Switch", "WirelessAP"]

    allComponents.forEach((comp) => {
      if (endpointTypes.includes(comp.type)) {
        const isConnected = connections.some((conn) => conn.from === comp.id || conn.to === comp.id)
        if (!isConnected) {
          recommendations.push({
            id: nanoid(),
            title: `Unconnected ${comp.type}: ${comp.name}`,
            description: `${comp.type} '${comp.name}' is not connected to any network segment. This limits visibility and control.`,
            severity: "High",
            category: "Visibility",
            relatedComponents: [comp.id],
            remediation: `Connect '${comp.name}' to a Switch or Wireless AP. Consider Portnox for agentless discovery of all connected devices.`,
          })
          score -= 5
        }
      }
    })

    // 2. Firewall Placement
    const firewalls = allComponents.filter((c) => c.type === "Firewall")
    const routers = allComponents.filter((c) => c.type === "Router") // Assuming Routers can be internet gateways

    if (routers.length > 0 && firewalls.length === 0) {
      recommendations.push({
        id: nanoid(),
        title: "Missing Perimeter Firewall",
        description:
          "No firewall detected at the network perimeter (connected to a Router). This is a critical security gap.",
        severity: "Critical",
        category: "Threat Prevention",
        remediation: "Add a Firewall between your internal network and any external-facing Routers.",
      })
      score -= 15
    } else if (routers.length > 0 && firewalls.length > 0) {
      const perimeterFirewallExists = firewalls.some((fw) =>
        connections.some(
          (conn) =>
            (conn.from === fw.id && routers.find((r) => r.id === conn.to)) ||
            (conn.to === fw.id && routers.find((r) => r.id === conn.from)),
        ),
      )
      if (!perimeterFirewallExists) {
        recommendations.push({
          id: nanoid(),
          title: "Improper Perimeter Firewall Placement",
          description:
            "A Firewall exists but does not appear to be protecting the network perimeter (connection to a Router).",
          severity: "High",
          category: "Threat Prevention",
          remediation: "Ensure your Firewall is positioned between your internal network and external Routers.",
        })
        score -= 10
      }
    }

    // 3. Wireless Security
    const wirelessAPs = allComponents.filter((c) => c.type === "WirelessAP")
    if (wirelessAPs.length > 0) {
      recommendations.push({
        id: nanoid(),
        title: "Secure Wireless Access",
        description:
          "Wireless networks introduce unique risks. Ensure strong authentication (e.g., 802.1X) and encryption.",
        severity: "Medium",
        category: "Control",
        remediation:
          "Implement Portnox NAC for 802.1X authentication on wireless networks, providing granular access control based on device posture and user identity.",
      })
      score -= 3 // Small penalty if present, as it's a general recommendation
    }

    // 4. NAC Implementation
    const switches = allComponents.filter((c) => c.type === "Switch")
    if (switches.length > 0 || wirelessAPs.length > 0) {
      const nacRecommendationExists = recommendations.some((r) => r.title.includes("NAC"))
      if (!nacRecommendationExists) {
        recommendations.push({
          id: nanoid(),
          title: "Consider Network Access Control (NAC)",
          description:
            "A NAC solution provides essential visibility, control, and automated response capabilities for all connected devices.",
          severity: "Medium",
          category: "Control",
          remediation:
            "Evaluate Portnox Cloud NAC for comprehensive security across wired and wireless networks, including device profiling, risk assessment, and policy enforcement.",
        })
        score -= 5 // Penalty if no other NAC specific recommendation
      }
    } else if (endpointTypes.some((et) => allComponents.find((c) => c.type === et))) {
      // Endpoints exist but no switches or APs to connect them to
      recommendations.push({
        id: nanoid(),
        title: "Missing Network Infrastructure",
        description:
          "Endpoints (Servers, PCs, Mobile) are present, but no Switches or Wireless APs are defined to connect them to the network.",
        severity: "High",
        category: "Visibility",
        remediation: "Add Switches or Wireless APs to your design to represent your network infrastructure.",
      })
      score -= 10
    }

    // 5. Segmentation for Critical Assets
    const criticalServers = allComponents.filter((c) => c.type === "Server" && c.tags?.includes("critical"))
    criticalServers.forEach((server) => {
      const directlyConnectedComponents = connections
        .filter((conn) => conn.from === server.id || conn.to === server.id)
        .map((conn) => (conn.from === server.id ? components[conn.to] : components[conn.from]))
        .filter(Boolean)

      const isSegmentedByFirewall = directlyConnectedComponents.some((dc) => dc?.type === "Firewall")
      const isOnDedicatedSwitch = directlyConnectedComponents.every(
        (dc) =>
          dc?.type === "Switch" && connections.filter((conn) => conn.from === dc.id || conn.to === dc.id).length <= 2, // Approximation: switch only connects to server and one other thing (e.g. firewall or core switch)
      )

      if (!isSegmentedByFirewall && !isOnDedicatedSwitch) {
        recommendations.push({
          id: nanoid(),
          title: `Poor Segmentation for Critical Server: ${server.name}`,
          description: `Critical server '${server.name}' does not appear to be adequately segmented by a firewall or a dedicated switch. This increases risk.`,
          severity: "High",
          category: "Segmentation",
          relatedComponents: [server.id],
          remediation: `Isolate critical servers using firewalls or VLANs enforced by NAC. Portnox can help implement microsegmentation policies.`,
        })
        score -= 7
      }
    })

    // Final Score Adjustment
    score = Math.max(0, score) // Ensure score doesn't go below 0

    let summary = `Architecture analysis complete. Overall score: ${score}/100. `
    if (recommendations.length === 0) {
      summary += "No major issues found. Good job!"
    } else {
      summary += `${recommendations.length} recommendation(s) to improve security and resilience.`
    }

    // Sort recommendations by severity
    const severityOrder = { Critical: 1, High: 2, Medium: 3, Low: 4, Informational: 5 }
    recommendations.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])

    return {
      summary,
      score,
      recommendations,
    }
  }

  return {
    components,
    connections,
    addComponent,
    moveComponent,
    updateComponentData, // Expose this function
    addConnection,
    clearArchitecture,
    analyzeArchitecture,
  }
}
