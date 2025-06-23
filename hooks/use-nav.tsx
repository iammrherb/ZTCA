"use client"

import type React from "react"
import { useState, createContext, useContext } from "react"

interface NavContextType {
  currentPage: string
  setPage: (page: string) => void
  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void
}

const NavContext = createContext<NavContextType | undefined>(undefined)

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  return (
    <NavContext.Provider value={{ currentPage, setPage: setCurrentPage, sidebarExpanded, setSidebarExpanded }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNav = () => {
  const context = useContext(NavContext)
  if (context === undefined) {
    throw new Error("useNav must be used within a NavProvider")
  }
  return context
}
