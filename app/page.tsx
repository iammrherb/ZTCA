import DashboardClient from "@/components/dashboard/dashboard-client"
import { NavProvider } from "@/hooks/use-nav"

export default function DashboardPage() {
  return (
    <NavProvider>
      <DashboardClient />
    </NavProvider>
  )
}
