// make a context provider
import React, { createContext, useContext, useState } from "react"

type Kpi = {
  alias: string
  description: string
}
type KpiSelectorContextType = {
  selectedKpi: Kpi
  setSelectedKpi: React.Dispatch<React.SetStateAction<Kpi>>
}

const KpiSelectorContext = createContext<KpiSelectorContextType | undefined>(undefined)

export function useKpiSelector() {
  const context = useContext(KpiSelectorContext)
  if (!context) {
    throw new Error("useKpiSelector must be used within a KpiSelectorProvider")
  }
  return context
}

export function KpiSelectorProvider({ children }: { children: React.ReactNode }) {
  const [selectedKpi, setSelectedKpi] = useState<Kpi>({
    alias: "",
    description: "",
  })

  return (
    <KpiSelectorContext.Provider value={{ selectedKpi, setSelectedKpi }}>
      {children}
    </KpiSelectorContext.Provider>
  )
}
