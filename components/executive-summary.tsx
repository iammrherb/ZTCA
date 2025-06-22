import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ExecutiveSummary({ data }) {
  const { costs, vendor, industry, endpoints, years } = data
  const vendorData = {
    portnox: { name: "Portnox" },
    cisco: { name: "Cisco ISE" },
    aruba: { name: "Aruba ClearPass" },
    forescout: { name: "Forescout" },
    securew2: { name: "SecureW2" },
    foxpass: { name: "Foxpass" },
  }
  const industryData = {
    healthcare: { name: "Healthcare" },
    finance: { name: "Financial Services" },
    manufacturing: { name: "Manufacturing" },
    government: { name: "Government" },
    education: { name: "Education" },
    retail: { name: "Retail" },
  }

  const vendorName = vendorData[vendor]?.name || "Selected Vendor"
  const industryName = industryData[industry]?.name || "Selected Industry"

  return (
    <div className="space-y-4 text-sm max-h-[70vh] overflow-y-auto pr-4">
      <p>
        This report provides a detailed Total Cost of Ownership (TCO) and Return on Investment (ROI) analysis for
        implementing a <strong>{vendorName}</strong> Network Access Control (NAC) solution for an organization in the{" "}
        <strong>{industryName}</strong> sector with <strong>{endpoints.toLocaleString()}</strong> endpoints over a{" "}
        <strong>{years}-year</strong> period.
      </p>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Financial Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            The total estimated cost of ownership over {years} years is{" "}
            <strong>${costs.totals.cost.toLocaleString()}</strong>. This includes an initial implementation cost of{" "}
            <strong>${costs.implementation.total.toLocaleString()}</strong> and an annual recurring cost of{" "}
            <strong>${costs.annual.total.toLocaleString()}</strong>.
          </p>
          <p>
            By implementing {vendorName}, a significant ROI is projected, primarily driven by cyber insurance premium
            reductions. The total estimated savings over the period are{" "}
            <strong>${costs.insurance.totalSavings.toLocaleString()}</strong>, resulting in a net cost of{" "}
            <strong>${costs.totals.netCost.toLocaleString()}</strong>.
          </p>
          {costs.totals.roi > 0 && (
            <p>
              This represents a strong positive ROI of{" "}
              <Badge variant="secondary" className="text-green-600">
                {costs.totals.roi.toFixed(1)}%
              </Badge>
              .
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Strategic Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            The adoption of {vendorName} is strongly recommended. The financial analysis indicates a positive ROI and a
            significant reduction in cybersecurity-related financial risk. Beyond the numbers, the solution enhances the
            organization's security posture, ensures compliance with industry regulations like{" "}
            {industryData[industry]?.compliance?.map((c) => c.standard).join(", ") || "relevant standards"}, and
            mitigates critical threats such as ransomware and data breaches. This investment is crucial for protecting
            assets, maintaining operational integrity, and ensuring long-term business resilience in the current threat
            landscape.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
