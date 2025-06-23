import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { analysisData, type } = await request.json()

    let prompt = ""

    switch (type) {
      case "executive-summary":
        prompt = `As a cybersecurity expert, analyze this NAC implementation data and provide a concise executive summary:
        
        Vendor: ${analysisData.vendor}
        Industry: ${analysisData.industry}
        Endpoints: ${analysisData.endpoints}
        Total Cost: $${analysisData.costs.totals.netCost.toLocaleString()}
        ROI: ${analysisData.costs.totals.roi.toFixed(1)}%
        Insurance Savings: $${analysisData.costs.insurance.totalSavings.toLocaleString()}
        
        Provide a 3-paragraph executive summary focusing on:
        1. Business justification and ROI
        2. Risk mitigation and compliance benefits
        3. Strategic recommendation
        
        Keep it professional and data-driven.`
        break

      case "architecture-analysis":
        prompt = `As a network security architect, analyze this Zero Trust architecture design:
        
        Components: ${JSON.stringify(analysisData.components, null, 2)}
        Connections: ${JSON.stringify(analysisData.connections, null, 2)}
        
        Provide detailed analysis covering:
        1. Security posture assessment
        2. Zero Trust principles compliance
        3. Potential vulnerabilities or gaps
        4. Specific recommendations for improvement
        5. How Portnox NAC could enhance this architecture
        
        Be specific and actionable in your recommendations.`
        break

      case "vendor-comparison":
        prompt = `As a procurement specialist in cybersecurity, compare these NAC vendors:
        
        ${JSON.stringify(analysisData.vendors, null, 2)}
        
        Provide a comprehensive comparison focusing on:
        1. Total cost of ownership analysis
        2. Feature differentiation
        3. Implementation complexity
        4. Industry-specific considerations
        5. Risk factors and mitigation strategies
        
        Conclude with a ranked recommendation and rationale.`
        break

      case "compliance-guidance":
        prompt = `As a compliance expert, provide guidance for NAC implementation in the ${analysisData.industry} industry:
        
        Required Compliance: ${analysisData.compliance.join(", ")}
        Current Architecture: ${JSON.stringify(analysisData.architecture, null, 2)}
        
        Provide specific guidance on:
        1. Compliance requirements mapping to NAC features
        2. Implementation best practices for each standard
        3. Audit preparation recommendations
        4. Risk assessment and documentation needs
        
        Be specific about regulatory requirements and implementation steps.`
        break

      default:
        prompt = `Analyze this cybersecurity data and provide insights: ${JSON.stringify(analysisData, null, 2)}`
    }

    const { text } = await generateText({
      model: xai("grok-beta"),
      prompt,
      maxTokens: 2000,
      temperature: 0.7,
    })

    return Response.json({ analysis: text })
  } catch (error) {
    console.error("Grok analysis error:", error)
    return Response.json({ error: "Failed to generate analysis" }, { status: 500 })
  }
}
