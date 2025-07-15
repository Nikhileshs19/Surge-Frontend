import React, { useRef } from "react"
import { Button } from "primereact/button"
import { OverlayPanel } from "primereact/overlaypanel"
import { useErrorLogsQuery } from "@/services/api/compressor-api"

const ErrorLog = ({ compressor }: { compressor: number }) => {
  const { data: logsResponse } = useErrorLogsQuery()
  const op = useRef<OverlayPanel>(null)
  // compressor is of type string
  const logs = logsResponse?.filter((log) => log.compressor == compressor)
  const count = logs?.length ?? 0

  return (
    count > 0 && (
      <div className="p-4 relative error-log-container">
        <Button
          label="Alert Messages"
          className="bg-[#26293C] text-white px-3 py-1 rounded"
          onClick={(e) => op?.current?.toggle(e)}
        />

        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow">
          {count}
        </span>

        <OverlayPanel ref={op} className="rounded-lg " showCloseIcon>
          <div className="bg-[#1F1E30] p-1 w-80 max-h-40 overflow-y-auto rounded text-white text-xs">
            <ul className="list-disc p-4">
              {logs?.map((log, index) => (
                <li key={index}>{log.message}</li>
              ))}
            </ul>
          </div>
        </OverlayPanel>
      </div>
    )
  )
}

export default ErrorLog
