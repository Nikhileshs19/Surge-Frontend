"use client"
import { CompressorLink } from "./compressor-link"
import {
  getStatusIconClass,
  statusLabelMap,
  statusColorMap,
  CompressorNavigationProps,
  CompressorStatus,
} from "@/types/compressor"
import "primeicons/primeicons.css"
import { useCompressorStatusQuery } from "@/services/api/compressor-api"
import { Calendar } from "primereact/calendar"
import ErrorLog from "../templates/error-log"
import { CompressorStatusDto } from "@/types/dto-types"

export default function CompressorNavigation({
  selectedCompressorId,
  setFocusMode,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  isFocusMode,
}: CompressorNavigationProps) {
  // const { setFocusMode } = useFocusMode();

  const { data: compressorStatusData } = useCompressorStatusQuery()
  const selectedCompressorData = compressorStatusData?.find(
    (compressor) => compressor.compressor == selectedCompressorId
  )

  const getStatus = (data: CompressorStatusDto) => {
    const runningStatus = data.runningStatus
    const alert = data.alert
    const status =
      runningStatus == 0
        ? CompressorStatus.OFF
        : alert
        ? CompressorStatus.WARNING
        : CompressorStatus.ON

    return status
  }
  const selectedCompressorStatus = selectedCompressorData
    ? getStatus(selectedCompressorData)
    : CompressorStatus.ON

  return (
    //get the zoom on date also
    <div
      className={` py-1 rounded-10px flex items-center justify-between text-text text-sm font-medium font-inter h-[30px]`}
    >
      {!isFocusMode ? (
        <div className="flex items-center gap-3">
          {compressorStatusData?.map((compressor) => {
            const status = getStatus(compressor)
            const iconClass = getStatusIconClass(status)
            return (
              <CompressorLink
                key={compressor.compressor}
                id={compressor.compressor}
                selectedCompressorId={selectedCompressorId}
                name={compressor.name}
                iconClass={iconClass}
              />
            )
          })}
        </div>
      ) : (
        <div>Historical Operating Points</div>
      )}
      {/* calendar */}
      <div className="flex items-center gap-4">
        {!isFocusMode && (
          <div>
            <ErrorLog compressor={selectedCompressorId} />
          </div>
        )}
        <div className="flex items-center gap-2  justify-center">
          {!isFocusMode && (
            <div className="bg-[#26293C] rounded-full px-5 py-1">
              <span className="text-secondary text-sm font-medium font-poppins ">
                Running Status: {}
              </span>
              <span className="font-semibold">{statusLabelMap[selectedCompressorStatus]}</span>
              <span
                className={`inline-block h-3 w-3 rounded-full ml-2 rounded-full  ${statusColorMap[selectedCompressorStatus]}`}
              />
            </div>
          )}
          <div className="relative">
            <span className="pr-1">From:</span>
            <Calendar
              className="text-white border border-[#A2A2A280] rounded-md px-3  py-1 text-xs w-38"
              value={fromDate}
              onChange={(e) => {
                onFromDateChange(e.value ?? null)
                setFocusMode(true)
              }}
              showTime
              hourFormat="24"
              showIcon
              dateFormat="dd-mm-yy"
            />
          </div>
          <div className="relative">
            <span className="pr-1">To:</span>
            <Calendar
              className="text-white border border-[#A2A2A280] rounded-md px-3  py-1 text-xs w-38"
              value={toDate}
              onChange={(e) => {
                onToDateChange(e.value ?? null)
                setFocusMode(true)
              }}
              showTime
              hourFormat="24"
              showIcon
              dateFormat="dd-mm-yy"
            />
          </div>
          {isFocusMode && (
            <div>
              <i
                className="pi pi-times text-white cursor-pointer pl-2"
                onClick={() => {
                  setFocusMode(false)
                }}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
