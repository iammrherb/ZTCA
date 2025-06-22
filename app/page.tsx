import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Zero Trust NAC - Total Cost Analysis & Vendor Comparison",
  description:
    "Comprehensive Zero Trust Network Access Control cost analysis with detailed vendor comparison, security metrics, and compliance mapping",
}

export default function Home() {
  return <ClientPage />
}
