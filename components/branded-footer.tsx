"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface BrandingConfig {
  companyName: string
  companyLogo: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  showCompanyLogo: boolean
  showPortnoxLogo: boolean
  logoPosition: "left" | "right" | "center"
  headerStyle: "side-by-side" | "stacked" | "company-primary"
  footerText: string
  reportTitle: string
  customCss: string
}

export function BrandedFooter() {
  const [branding, setBranding] = useState<BrandingConfig | null>(null)

  useEffect(() => {
    const loadBranding = () => {
      const saved = localStorage.getItem("portnox-branding")
      if (saved) {
        setBranding(JSON.parse(saved))
      }
    }

    loadBranding()

    const handleBrandingUpdate = (event: CustomEvent) => {
      setBranding(event.detail)
    }

    window.addEventListener("brandingUpdated", handleBrandingUpdate as EventListener)
    return () => window.removeEventListener("brandingUpdated", handleBrandingUpdate as EventListener)
  }, [])

  if (!branding?.footerText && !branding?.companyName) {
    return (
      <footer className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <span>Powered by</span>
          <Image src="/images/portnox-logo.png" alt="Portnox" width={20} height={20} className="rounded" />
          <span className="font-medium">Portnox Zero Trust NAC</span>
        </div>
      </footer>
    )
  }

  return (
    <footer className="mt-8 pt-4 border-t">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex-1">
          {branding?.footerText && <p>{branding.footerText}</p>}
          {branding?.companyName && !branding?.footerText && (
            <p>
              © {new Date().getFullYear()} {branding.companyName}. All rights reserved.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <Image src="/images/portnox-logo.png" alt="Portnox" width={20} height={20} className="rounded" />
          <span className="font-medium">Portnox</span>
        </div>
      </div>
    </footer>
  )
}
