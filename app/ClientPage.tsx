"use client"

import Link from "next/link"
import { Calculator, ChevronRight, ShieldCheck, BarChart3, Building2, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import HeroAnimation from "@/components/hero-animation"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function ClientPage() {
  const [animatedLogo, setAnimatedLogo] = useState(null)

  useEffect(() => {
    // Dynamically import the animated logo component
    const importAnimatedLogo = async () => {
      try {
        const { default: AnimatedLogo } = await import("./animated-logo")
        setAnimatedLogo(<AnimatedLogo />)
      } catch (error) {
        console.error("Failed to load animated logo:", error)
      }
    }

    importAnimatedLogo()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/portnox-logo.png"
              alt="Portnox Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/calculator" className="font-medium transition-colors hover:text-primary">
              Cost Calculator
            </Link>
            <Link href="/comparison" className="font-medium transition-colors hover:text-primary">
              Vendor Comparison
            </Link>
            <Link href="/security" className="font-medium transition-colors hover:text-primary">
              Security Analysis
            </Link>
            <Link href="/compliance" className="font-medium transition-colors hover:text-primary">
              Compliance Mapping
            </Link>
            <Link href="/industries" className="font-medium transition-colors hover:text-primary">
              Industry Analysis
            </Link>
          </nav>
          <Button>Get Started</Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 via-background to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Zero Trust NAC
                    <span className="block text-primary">Executive Decision Platform</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Comprehensive cost analysis, security assessment, and vendor comparison for Zero Trust Network
                    Access Control solutions. Make informed executive decisions with detailed TCO, ROI, and risk
                    analysis across all industries.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/calculator">
                    <Button size="lg" className="bg-primary text-primary-foreground">
                      Start Executive Analysis <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/comparison">
                    <Button size="lg" variant="outline" className="bg-background">
                      Compare All Vendors
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="text-sm text-muted-foreground">Powered by</div>
                  <Image
                    src="/images/portnox-logo.png"
                    alt="Portnox"
                    width={120}
                    height={30}
                    className="h-6 w-auto opacity-70"
                  />
                </div>
              </div>
              <div className="flex justify-center">{animatedLogo || <HeroAnimation />}</div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Executive Decision Platform Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything executives need for strategic Zero Trust NAC investment decisions
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-12">
              <Card className="transition-all hover:shadow-lg hover:scale-105">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <CardTitle>Comprehensive TCO Analysis</CardTitle>
                  <CardDescription>
                    Executive-level cost breakdown including licensing, infrastructure, implementation, and hidden costs
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Detailed financial analysis covering all cost components: licensing models, hardware requirements,
                    professional services, training, maintenance, and cyber insurance impact.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/calculator">
                    <Button variant="outline" size="sm" className="w-full">
                      Analyze Total Costs
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-lg hover:scale-105">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <CardTitle>Strategic Vendor Comparison</CardTitle>
                  <CardDescription>
                    Compare all major NAC vendors with detailed feature scoring and ROI analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Side-by-side comparison of Portnox, Cisco ISE, Aruba ClearPass, Forescout, and cloud-native
                    solutions with weighted scoring and executive summaries.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/comparison">
                    <Button variant="outline" size="sm" className="w-full">
                      Compare Solutions
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-lg hover:scale-105">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <CardTitle>Risk & Security Assessment</CardTitle>
                  <CardDescription>
                    Quantified security metrics and cyber insurance premium impact analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Comprehensive security scoring, threat impact modeling, and quantified risk reduction with direct
                    correlation to cyber insurance premium savings.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/security">
                    <Button variant="outline" size="sm" className="w-full">
                      View Risk Analysis
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-lg hover:scale-105">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <Shield className="h-6 w-6" />
                  </div>
                  <CardTitle>Regulatory Compliance</CardTitle>
                  <CardDescription>
                    Industry-specific compliance mapping and regulatory requirement analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Detailed mapping of NAC controls to compliance frameworks including HIPAA, PCI DSS, NIST, GDPR, and
                    industry-specific regulations.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/compliance">
                    <Button variant="outline" size="sm" className="w-full">
                      View Compliance
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-lg hover:scale-105">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <CardTitle>Industry-Specific Analysis</CardTitle>
                  <CardDescription>Tailored analysis for healthcare, finance, manufacturing, and more</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Sector-specific cost models, compliance requirements, and risk assessments for healthcare, financial
                    services, manufacturing, government, and education.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/industries">
                    <Button variant="outline" size="sm" className="w-full">
                      Industry Analysis
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="transition-all hover:shadow-lg hover:scale-105">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <CardTitle>Executive Dashboards</CardTitle>
                  <CardDescription>Interactive visualizations and executive-ready reports with KPIs</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Rich visual analytics with animated charts, implementation timelines, ROI projections, and executive
                    summary reports ready for board presentations.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/calculator">
                    <Button variant="outline" size="sm" className="w-full">
                      View Dashboards
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Comprehensive Vendor Coverage
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Analysis of all major Network Access Control vendors and emerging cloud-native solutions
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-12">
              {[
                { name: "Portnox", featured: true, logo: "/images/portnox-logo.png" },
                { name: "Cisco ISE" },
                { name: "Aruba ClearPass" },
                { name: "Forescout" },
                { name: "SecureW2" },
                { name: "Foxpass" },
                { name: "Arista" },
                { name: "Juniper" },
                { name: "Fortinet" },
                { name: "Microsoft NPS" },
                { name: "RADIUS-as-a-Service" },
                { name: "FreeRADIUS" },
              ].map((vendor) => (
                <div
                  key={vendor.name}
                  className={`flex flex-col items-center justify-center p-4 bg-background rounded-lg shadow-sm transition-all hover:shadow-md hover:scale-105 ${
                    vendor.featured ? "ring-2 ring-primary" : ""
                  }`}
                >
                  {vendor.logo ? (
                    <div className="w-16 h-16 flex items-center justify-center mb-3">
                      <Image
                        src={vendor.logo || "/placeholder.svg"}
                        alt={vendor.name}
                        width={64}
                        height={64}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                        vendor.featured ? "bg-primary text-white" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                  )}
                  <span className={`font-medium text-center text-sm ${vendor.featured ? "text-primary" : ""}`}>
                    {vendor.name}
                  </span>
                  {vendor.featured && <span className="text-xs text-primary mt-1">Featured Partner</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Make Informed Decisions?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start your comprehensive Zero Trust NAC analysis today and get executive-ready insights in minutes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/calculator">
                  <Button size="lg" className="bg-primary text-primary-foreground">
                    Start Analysis Now
                  </Button>
                </Link>
                <Link href="/comparison">
                  <Button size="lg" variant="outline">
                    Compare Vendors
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-background border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Image
              src="/images/portnox-logo.png"
              alt="Portnox"
              width={100}
              height={25}
              className="h-5 w-auto opacity-70"
            />
            <p className="text-sm text-muted-foreground">
              © 2025 Zero Trust NAC Executive Decision Platform. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
