"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calculator, Rows, ShieldCheck, Building2, Shield, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/calculator", label: "TCO/ROI Calculator", icon: Calculator },
  { href: "/comparison", label: "Vendor Comparison", icon: Rows },
  { href: "/security", label: "Security Analysis", icon: Shield },
  { href: "/compliance", label: "Compliance Mapping", icon: ShieldCheck },
  { href: "/industries", label: "Industry Analysis", icon: Building2 },
  { href: "/designer", label: "Architecture Designer", icon: LayoutGrid },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-16 flex flex-col items-center space-y-4 py-4 bg-background border-r">
      <Link href="/" className="flex items-center justify-center">
        <Image
          src="/images/portnox-logo.png"
          alt="Portnox"
          width={32}
          height={32}
          className="rounded transition-transform hover:scale-110"
        />
        <span className="sr-only">Portnox TCO Calculator</span>
      </Link>
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    size="icon"
                    className={cn("rounded-lg", pathname === item.href && "text-primary")}
                    aria-label={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </aside>
  )
}
