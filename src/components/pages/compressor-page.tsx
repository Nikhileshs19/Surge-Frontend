"use client"
import { useEffect, useState } from "react"
import CompressorNavigation from "@/components/core/compressor-nav"
import CompressorDetails from "@/components/templates/compressor-details"
import { useLastRunTimeQuery } from "@/services/api/compressor-api"
import dayjs from "dayjs"
import { KpiSelectorProvider } from "@/context/kpi-selector-context"
import HelpSkeleton from "../templates/help-skeleton"
import { useHelpOverlay } from "@/context/help-overlay-context"

export default function CompressorPage({ id }: { id: number }) {
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const { setShowHelp, showHelp } = useHelpOverlay()
  const { data: lrt } = useLastRunTimeQuery()

  useEffect(() => {
    if (lrt && !isFocusMode) {
      setToDate(dayjs(lrt).toDate())
      setFromDate(dayjs(lrt).subtract(30, "minute").toDate())
    }
  }, [lrt, isFocusMode])

  if (!id) return <div className="text-red-500">Compressor ID is required</div>

  return (
    <KpiSelectorProvider>
      {showHelp && <HelpSkeleton onClose={() => console.log("close")} />}
      <div className="flex flex-col max-h-full overflow-hidden">
        <div className="my-4">
          <CompressorNavigation
            selectedCompressorId={id}
            setFocusMode={setIsFocusMode}
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
            isFocusMode={isFocusMode}
          />
        </div>
        <CompressorDetails id={id} isFocusMode={isFocusMode} from={fromDate} to={toDate} />
      </div>
    </KpiSelectorProvider>
  )
}
