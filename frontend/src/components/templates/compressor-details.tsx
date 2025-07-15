"use client"
import React from "react"
import CompressorHealthOps from "./compressor-health-ops"
import CompressorKPI from "./compressor-kpi"
import dynamic from "next/dynamic"
import dayjs from "dayjs"

const CompressorSurgeGraphs = dynamic(
  () => import("@/components/templates/compressor-surge-graphs"),
  { ssr: false }
)
const CompressorKpiTrends = dynamic(() => import("@/components/templates/compressor-kpi-trends"), {
  ssr: false,
})
type Prop = {
  id: number
  isFocusMode: boolean
  from: Date | null
  to: Date | null
}
export default function CompressorDetails({ id, isFocusMode, from, to }: Prop) {
  return (
    <>
      <div className={`flex flex-grow flex-col gap-3`}>
        <div className={`flex-1 transition-opacity duration-300`}>
          <div className="">
            <CompressorSurgeGraphs
              compressorId={id}
              to={to ? dayjs(to).format("YYYY-MM-DD HH:mm:ss") : null}
              from={from ? dayjs(from).format("YYYY-MM-DD HH:mm:ss") : null}
              isFocusMode={isFocusMode}
            />
          </div>
        </div>
        {!isFocusMode ? (
          <div className={`flex-grow flex gap-2`}>
            <div>
              <CompressorKPI id={id} />
            </div>
            <div className="w-[510px] ">
              <CompressorHealthOps id={id} />
            </div>
            <div className=" flex-grow ">
              <CompressorKpiTrends id={id} />
            </div>
          </div>
        ) : (
          <div className=" flex-grow ">
            <CompressorKpiTrends
              id={id}
              sharedTo={to ? dayjs(to).format("YYYY-MM-DD HH:mm:ss") : null}
              sharedFrom={from ? dayjs(from).format("YYYY-MM-DD HH:mm:ss") : null}
              isFocusMode={isFocusMode}
            />
          </div>
        )}
      </div>
    </>
  )
}
