import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator, BarChart3 } from "lucide-react"
import Image from "next/image"

export default function ClientPage() {
  return (
    <>
      {/* Hero Section with Portnox Branding */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Image src="/images/portnox-logo.png" alt="Portnox" width={64} height={64} className="rounded-lg mr-4" />
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Zero Trust NAC
              </h1>
              <p className="text-xl text-gray-600 mt-2">Powered by Portnox</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive Total Cost Analysis & Vendor Comparison Platform for Network Access Control Solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Calculator className="mr-2 h-5 w-5" />
                Start TCO Analysis
              </Button>
            </Link>
            <Link href="/comparison">
              <Button size="lg" variant="outline">
                <BarChart3 className="mr-2 h-5 w-5" />
                Compare Vendors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
