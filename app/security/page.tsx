import { BrandedHeader } from "@/components/branded-header"
import { BrandedFooter } from "@/components/branded-footer"

export default function SecurityPage() {
  return (
    <div>
      <BrandedHeader title="Security Analysis Dashboard" subtitle="Zero Trust security posture evaluation" />

      {/* ... existing content ... */}
      <div>
        <h1>Security Page Content</h1>
        <p>This is the security page content.</p>
      </div>

      <BrandedFooter />
    </div>
  )
}
