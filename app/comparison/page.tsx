import { BrandedHeader } from "@/components/branded-header"
import { BrandedFooter } from "@/components/branded-footer"

export default function ComparisonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BrandedHeader title="NAC Vendor Comparison Matrix" subtitle="Comprehensive feature and cost analysis" />
      <div>
        {/* Comparison content will go here */}
        <p>This is the comparison page content.</p>
      </div>
      <BrandedFooter />
    </main>
  )
}
