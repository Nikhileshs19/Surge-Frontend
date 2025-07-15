"use client"
import { useState } from "react"
import dynamic from "next/dynamic"
import OperatingParamsTable from "./operating-params-table"
import { useHealthDataQuery, useOperatingParamsQuery } from "@/services/api/compressor-api"
const HealthCurve = dynamic(() => import("@/components/templates/health-curve"), { ssr: false })

type Prop = {
  id: number
}

export default function CompressorHealthOps({ id }: Prop) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { data: operatingParamsData } = useOperatingParamsQuery(id)
  const { data: healthCurveData } = useHealthDataQuery(id)
  const tabs = [
    {
      header: "Operating Parameter",
      content: <OperatingParamsTable data={operatingParamsData} />,
    },
    {
      header: "Health Curve",
      content: <HealthCurve data={healthCurveData} />,
    },
  ]

  return (
    <div className="custom-tab-card text-xs text-[#B9B9B9] bg-[#26293C] min-h-4/5 h-full">
      <div className="tab-headers items-center font-medium ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={` tab-header ${activeIndex === index ? "active" : ""} hover:text-primary`}
            onClick={() => setActiveIndex(index)}
          >
            {tab.header}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex].content}</div>
    </div>
  )
}
