"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  DollarSign,
  CheckSquare,
  ChevronLeft,
  Menu,
  Shield,
  HelpCircle,
  Settings,
  Download,
  RefreshCw,
} from "lucide-react"
import { Label } from "@/components/ui/label" // Corrected import for shadcn/ui Label

import { MASTER_DATA } from "@/lib/dashboard-data"
import { calculateFinancials } from "@/lib/calculations"
import { useNav } from "@/hooks/use-nav"

import { GlobalStyles, Button, DebugInfo, cn } from "./ui"
import { ExecutiveDashboard } from "./executive-dashboard"
import { FinancialDeepDive } from "./financial-deep-dive"
import { ComplianceMatrix } from "./compliance-matrix"

const ensureArray = (value: any) => (Array.isArray(value) ? value : [])

const AppSidebar = () => {
  const { currentPage, setPage, sidebarExpanded, setSidebarExpanded } = useNav()
  const navItems = [
    { page: "dashboard", name: "Executive Dashboard", icon: Home, description: "High-level KPIs and insights" },
    { page: "financial", name: "Financial Deep Dive", icon: DollarSign, description: "TCO, ROI, and cost analysis" },
    { page: "compliance", name: "Compliance Matrix", icon: CheckSquare, description: "Standards and regulations" },
  ]
  return (
    <motion.aside
      animate={{ width: sidebarExpanded ? 280 : 80 }}
      className="relative h-screen bg-black/40 border-r border-white/10 flex flex-col shrink-0 glass-effect"
    >
      <div className="flex items-center justify-between p-5 h-20 border-b border-white/10">
        {sidebarExpanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[rgb(var(--primary-rgb))]" />
            <span className="text-lg font-bold gradient-text">ZTCA Platform</span>
          </motion.div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
          {sidebarExpanded ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {ensureArray(navItems).map((item) => (
          <motion.a
            href="#"
            key={item.page}
            onClick={(e) => {
              e.preventDefault()
              setPage(item.page)
            }}
            className={cn(
              "flex items-center p-3 rounded-lg transition-all duration-200 group relative",
              currentPage === item.page
                ? "bg-[rgba(var(--primary-rgb),0.15)] text-[rgb(var(--primary-rgb))] shadow-inner"
                : "text-gray-300 hover:bg-white/10 hover:text-white",
              !sidebarExpanded && "justify-center",
            )}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className="w-6 h-6 shrink-0" />
            {sidebarExpanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-4 flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </motion.div>
            )}
            {!sidebarExpanded && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-black/90 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-white/20">
                {item.name}
              </div>
            )}
          </motion.a>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Button variant="primary" size={sidebarExpanded ? "default" : "icon"} className="w-full">
          {sidebarExpanded ? (
            <>
              <Download className="w-4 h-4 mr-2" /> Export Report
            </>
          ) : (
            <Download className="w-4 h-4" />
          )}
        </Button>
      </div>
    </motion.aside>
  )
}

export default function DashboardClient() {
  const [config, setConfig] = useState({
    deviceCount: 2500,
    analysisPeriod: 3,
    industry: "technology",
    fteCost: 120000,
    orgSize: "enterprise",
  })

  const [filters, setFilters] = useState({
    architectureTypes: ["Cloud-Native", "Cloud-Managed", "On-Premises"],
    minZeroTrustScore: 0,
    maxTCO: Number.POSITIVE_INFINITY,
    vendors: Object.keys(MASTER_DATA.vendors),
  })

  const processedData = useMemo(() => {
    try {
      return Object.keys(MASTER_DATA.vendors)
        .filter((id) => ensureArray(filters.vendors).includes(id))
        .map((id) => ({
          id,
          ...MASTER_DATA.vendors[id as keyof typeof MASTER_DATA.vendors],
          financials: calculateFinancials(id, config),
        }))
        .filter(
          (vendor) =>
            ensureArray(filters.architectureTypes).includes(vendor.architecture) &&
            (vendor.security?.zeroTrustScore ?? 0) >= filters.minZeroTrustScore &&
            (vendor.financials?.tco ?? Number.POSITIVE_INFINITY) <= filters.maxTCO,
        )
    } catch (error) {
      console.error("Error processing vendor data:", error)
      return []
    }
  }, [config, filters])

  const { currentPage } = useNav()

  const AppContent = () => {
    if (!processedData) {
      return (
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-[rgb(var(--primary-rgb))] animate-spin mx-auto mb-4" />
            <div className="text-xl font-bold text-gray-300 mb-2">Calculating...</div>
            <div className="text-sm text-gray-500">Processing vendor analysis data.</div>
          </div>
        </div>
      )
    }
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="p-8"
        >
          {currentPage === "dashboard" && <ExecutiveDashboard data={processedData} config={config} />}
          {currentPage === "financial" && <FinancialDeepDive data={processedData} config={config} />}
          {currentPage === "compliance" && <ComplianceMatrix data={processedData} config={config} />}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex antialiased">
      <GlobalStyles />
      <div className="quantum-grid-bg" />
      <div className="aurora-bg" />
      <AppSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 bg-black/50 border-b border-white/10 backdrop-blur-lg shrink-0">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Zero Trust Total Cost Analyzer</h1>
            <p className="text-sm text-gray-400 mt-1">Comprehensive NAC vendor analysis</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="primary" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Export Full Report
            </Button>
          </div>
        </header>
        <div className="p-6 border-b border-white/10 bg-black/30 backdrop-blur-sm shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Analysis Configuration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-400">Device Count</Label>{" "}
              {/* Use Label component */}
              <input
                type="range"
                min="100"
                max="50000"
                step="100"
                value={config.deviceCount}
                onChange={(e) => setConfig((c) => ({ ...c, deviceCount: Number(e.target.value) }))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-right mt-1 font-mono text-[rgb(var(--primary-rgb))]">
                {config.deviceCount.toLocaleString()}
              </div>
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-400">Analysis Period</Label>{" "}
              {/* Use Label component */}
              <select
                value={config.analysisPeriod}
                onChange={(e) => setConfig((c) => ({ ...c, analysisPeriod: Number(e.target.value) }))}
                className="w-full h-10 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-rgb))]"
              >
                <option value="1">1 Year</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
              </select>
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-400">Industry</Label>{" "}
              {/* Use Label component */}
              <select
                value={config.industry}
                onChange={(e) => setConfig((c) => ({ ...c, industry: e.target.value }))}
                className="w-full h-10 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-rgb))]"
              >
                {Object.entries(MASTER_DATA.industries).map(([id, data]) => (
                  <option key={id} value={id}>
                    {data.icon} {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-400">Organization Size</Label>{" "}
              {/* Use Label component */}
              <select
                value={config.orgSize}
                onChange={(e) => setConfig((c) => ({ ...c, orgSize: e.target.value }))}
                className="w-full h-10 px-3 py-2 bg-white/5 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-rgb))]"
              >
                {MASTER_DATA.organizationSizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.size} ({size.users})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="block mb-2 text-sm font-medium text-gray-400">Avg Security FTE Cost</Label>{" "}
              {/* Use Label component */}
              <input
                type="range"
                min="60000"
                max="250000"
                step="5000"
                value={config.fteCost}
                onChange={(e) => setConfig((c) => ({ ...c, fteCost: Number(e.target.value) }))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-right mt-1 font-mono text-[rgb(var(--primary-rgb))]">
                ${config.fteCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <AppContent />
        </div>
      </main>
      <DebugInfo config={config} filters={filters} data={processedData} />
    </div>
  )
}
