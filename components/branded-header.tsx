"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

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

interface BrandedHeaderProps {
  title?: string
  subtitle?: string
  className?: string
}

export function BrandedHeader({ title, subtitle, className = "" }: BrandedHeaderProps) {
  const [branding, setBranding] = useState<BrandingConfig | null>(null)

  useEffect(() => {
    // Load branding from localStorage
    const loadBranding = () => {
      const saved = localStorage.getItem("portnox-branding")
      if (saved) {
        setBranding(JSON.parse(saved))
      }
    }

    loadBranding()

    // Listen for branding updates
    const handleBrandingUpdate = (event: CustomEvent) => {
      setBranding(event.detail)
    }

    window.addEventListener("brandingUpdated", handleBrandingUpdate as EventListener)
    return () => window.removeEventListener("brandingUpdated", handleBrandingUpdate as EventListener)
  }, [])

  if (!branding) {
    // Default header without custom branding
    return (
      <div
        className={`flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border ${className}`}
      >
        <div className="flex items-center gap-4">
          <Image src="/images/portnox-logo.png" alt="Portnox" width={48} height={48} className="rounded" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title || "Zero Trust NAC Analysis"}</h2>
            <p className="text-sm text-gray-600">{subtitle || "Powered by Portnox"}</p>
          </div>
        </div>
      </div>
    )
  }

  const headerStyle = {
    backgroundColor: branding.secondaryColor,
    borderColor: branding.primaryColor + "30",
  }

  const titleStyle = {
    color: branding.primaryColor,
  }

  if (branding.headerStyle === "stacked") {
    return (
      <Card className={`p-4 ${className}`} style={headerStyle}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-4">
            {branding.showCompanyLogo && branding.companyLogo && (
              <Image
                src={branding.companyLogo || "/placeholder.svg"}
                alt={branding.companyName}
                width={48}
                height={48}
                className="rounded object-contain"
              />
            )}
            {branding.showPortnoxLogo && (
              <Image src="/images/portnox-logo.png" alt="Portnox" width={48} height={48} className="rounded" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold" style={titleStyle}>
              {branding.companyName && `${branding.companyName} - `}
              {title || branding.reportTitle}
            </h2>
            <p className="text-sm text-muted-foreground">
              {subtitle || (branding.showPortnoxLogo ? "Powered by Portnox" : "")}
            </p>
          </div>
        </div>
      </Card>
    )
  }

  if (branding.headerStyle === "company-primary") {
    return (
      <Card className={`p-4 ${className}`} style={headerStyle}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {branding.showCompanyLogo && branding.companyLogo && (
              <Image
                src={branding.companyLogo || "/placeholder.svg"}
                alt={branding.companyName}
                width={48}
                height={48}
                className="rounded object-contain"
              />
            )}
            <div>
              <h2 className="text-xl font-bold" style={titleStyle}>
                {branding.companyName || title || branding.reportTitle}
              </h2>
              <p className="text-sm text-muted-foreground">{subtitle || title}</p>
            </div>
          </div>
          {branding.showPortnoxLogo && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Powered by</span>
              <Image src="/images/portnox-logo.png" alt="Portnox" width={24} height={24} className="rounded" />
              <span className="font-medium">Portnox</span>
            </div>
          )}
        </div>
      </Card>
    )
  }

  // Default: side-by-side
  return (
    <Card className={`p-4 ${className}`} style={headerStyle}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {branding.showCompanyLogo && branding.companyLogo && (
            <Image
              src={branding.companyLogo || "/placeholder.svg"}
              alt={branding.companyName}
              width={48}
              height={48}
              className="rounded object-contain"
            />
          )}
          {branding.showPortnoxLogo && (
            <Image src="/images/portnox-logo.png" alt="Portnox" width={48} height={48} className="rounded" />
          )}
          <div>
            <h2 className="text-xl font-bold" style={titleStyle}>
              {branding.companyName && `${branding.companyName} - `}
              {title || branding.reportTitle}
            </h2>
            <p className="text-sm text-muted-foreground">{subtitle || "Zero Trust NAC Analysis"}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
