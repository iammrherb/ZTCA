"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload, Eye, Save, Palette, Building } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

const defaultBranding: BrandingConfig = {
  companyName: "",
  companyLogo: "",
  primaryColor: "#0066cc",
  secondaryColor: "#f8fafc",
  accentColor: "#10b981",
  showCompanyLogo: true,
  showPortnoxLogo: true,
  logoPosition: "left",
  headerStyle: "side-by-side",
  footerText: "",
  reportTitle: "Zero Trust NAC Analysis Report",
  customCss: "",
}

const colorPresets = [
  { name: "Corporate Blue", primary: "#0066cc", secondary: "#f8fafc", accent: "#10b981" },
  { name: "Professional Gray", primary: "#374151", secondary: "#f9fafb", accent: "#3b82f6" },
  { name: "Modern Purple", primary: "#7c3aed", secondary: "#faf5ff", accent: "#06b6d4" },
  { name: "Enterprise Green", primary: "#059669", secondary: "#f0fdf4", accent: "#f59e0b" },
  { name: "Financial Gold", primary: "#d97706", secondary: "#fffbeb", accent: "#dc2626" },
  { name: "Healthcare Teal", primary: "#0d9488", secondary: "#f0fdfa", accent: "#8b5cf6" },
]

export function BrandingSettings() {
  const [branding, setBranding] = useState<BrandingConfig>(defaultBranding)
  const [isOpen, setIsOpen] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    // Load saved branding from localStorage
    const saved = localStorage.getItem("portnox-branding")
    if (saved) {
      setBranding(JSON.parse(saved))
    }
  }, [])

  const saveBranding = () => {
    localStorage.setItem("portnox-branding", JSON.stringify(branding))
    // Apply CSS variables to document root
    document.documentElement.style.setProperty("--brand-primary", branding.primaryColor)
    document.documentElement.style.setProperty("--brand-secondary", branding.secondaryColor)
    document.documentElement.style.setProperty("--brand-accent", branding.accentColor)

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("brandingUpdated", { detail: branding }))

    setIsOpen(false)
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBranding({ ...branding, companyLogo: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const applyColorPreset = (preset: (typeof colorPresets)[0]) => {
    setBranding({
      ...branding,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          Customize Branding
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Branding Settings
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={branding.companyName}
                    onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyLogo">Company Logo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="companyLogo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {branding.companyLogo && (
                    <div className="mt-2">
                      <Image
                        src={branding.companyLogo || "/placeholder.svg"}
                        alt="Company Logo Preview"
                        width={100}
                        height={50}
                        className="border rounded object-contain"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportTitle">Report Title</Label>
                  <Input
                    id="reportTitle"
                    value={branding.reportTitle}
                    onChange={(e) => setBranding({ ...branding, reportTitle: e.target.value })}
                    placeholder="Custom report title"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Color Scheme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={branding.accentColor}
                        onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                        className="w-16 h-10"
                      />
                      <Input
                        value={branding.accentColor}
                        onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Color Presets</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {colorPresets.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => applyColorPreset(preset)}
                        className="justify-start gap-2"
                      >
                        <div className="flex gap-1">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primary }} />
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.accent }} />
                        </div>
                        <span className="text-xs">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Logo Display Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showCompanyLogo">Show Company Logo</Label>
                  <Switch
                    id="showCompanyLogo"
                    checked={branding.showCompanyLogo}
                    onCheckedChange={(checked) => setBranding({ ...branding, showCompanyLogo: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="showPortnoxLogo">Show Portnox Logo</Label>
                  <Switch
                    id="showPortnoxLogo"
                    checked={branding.showPortnoxLogo}
                    onCheckedChange={(checked) => setBranding({ ...branding, showPortnoxLogo: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headerStyle">Header Style</Label>
                  <Select
                    value={branding.headerStyle}
                    onValueChange={(value: any) => setBranding({ ...branding, headerStyle: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="side-by-side">Side by Side</SelectItem>
                      <SelectItem value="stacked">Stacked</SelectItem>
                      <SelectItem value="company-primary">Company Primary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Custom Footer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Textarea
                    id="footerText"
                    value={branding.footerText}
                    onChange={(e) => setBranding({ ...branding, footerText: e.target.value })}
                    placeholder="Custom footer text for reports and pages"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border rounded-lg p-4 space-y-4"
                  style={{
                    backgroundColor: branding.secondaryColor,
                    borderColor: branding.primaryColor,
                  }}
                >
                  {/* Header Preview */}
                  <div
                    className={`flex items-center gap-4 p-3 rounded ${
                      branding.headerStyle === "stacked" ? "flex-col" : "justify-between"
                    }`}
                    style={{ backgroundColor: branding.primaryColor + "10" }}
                  >
                    <div className={`flex items-center gap-3 ${branding.headerStyle === "stacked" ? "flex-col" : ""}`}>
                      {branding.showCompanyLogo && branding.companyLogo && (
                        <Image
                          src={branding.companyLogo || "/placeholder.svg"}
                          alt="Company Logo"
                          width={40}
                          height={40}
                          className="rounded object-contain"
                        />
                      )}
                      {branding.companyName && (
                        <div>
                          <h3 className="font-bold" style={{ color: branding.primaryColor }}>
                            {branding.companyName}
                          </h3>
                          <p className="text-sm text-muted-foreground">{branding.reportTitle}</p>
                        </div>
                      )}
                    </div>

                    {branding.showPortnoxLogo && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Powered by</span>
                        <Image
                          src="/images/portnox-logo.png"
                          alt="Portnox"
                          width={32}
                          height={32}
                          className="rounded"
                        />
                        <span className="font-medium text-sm">Portnox</span>
                      </div>
                    )}
                  </div>

                  {/* Content Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: branding.primaryColor }} />
                      <span className="font-medium">Sample Chart Title</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div
                        className="p-2 rounded text-center"
                        style={{
                          backgroundColor: branding.primaryColor + "20",
                          borderLeft: `3px solid ${branding.primaryColor}`,
                        }}
                      >
                        <div className="text-lg font-bold" style={{ color: branding.primaryColor }}>
                          $125K
                        </div>
                        <div className="text-xs text-muted-foreground">Total Cost</div>
                      </div>

                      <div
                        className="p-2 rounded text-center"
                        style={{
                          backgroundColor: branding.accentColor + "20",
                          borderLeft: `3px solid ${branding.accentColor}`,
                        }}
                      >
                        <div className="text-lg font-bold" style={{ color: branding.accentColor }}>
                          24%
                        </div>
                        <div className="text-xs text-muted-foreground">ROI</div>
                      </div>

                      <div className="p-2 rounded text-center bg-muted/50">
                        <div className="text-lg font-bold">95</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      style={{
                        backgroundColor: branding.primaryColor,
                        borderColor: branding.primaryColor,
                      }}
                    >
                      Sample Action Button
                    </Button>
                  </div>

                  {/* Footer Preview */}
                  {branding.footerText && (
                    <div className="border-t pt-3 mt-4">
                      <p className="text-xs text-muted-foreground">{branding.footerText}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button onClick={saveBranding} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save & Apply
              </Button>
              <Button variant="outline" onClick={() => setBranding(defaultBranding)}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
