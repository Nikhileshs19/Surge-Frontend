"use client"
import { createContext, useContext, useState } from "react"

type HelpOverlayContextType = {
  showHelp: boolean
  setShowHelp: (show: boolean) => void
}

const HelpOverlayContext = createContext<HelpOverlayContextType | undefined>(undefined)

export function HelpOverlayProvider({ children }: { children: React.ReactNode }) {
  const [showHelp, setShowHelp] = useState(false)
  return (
    <HelpOverlayContext.Provider value={{ showHelp, setShowHelp }}>
      {children}
    </HelpOverlayContext.Provider>
  )
}

export function useHelpOverlay() {
  const ctx = useContext(HelpOverlayContext)
  if (!ctx) throw new Error("useHelpOverlay must be used within HelpOverlayProvider")
  return ctx
}
