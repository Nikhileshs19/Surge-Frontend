import React from "react"

type GaugeProps = {
  value: number // 0 to 100
  label: string
  description: string
  color: string
  unit?: string
}

const SemiCircleGauge = ({ value, label, description, color, unit }: GaugeProps) => {
  const radius = 40
  const strokeWidth = 20
  const circumference = Math.PI * radius
  const offset = circumference * (1 - value / 100)

  return (
    <div className="flex items-center space-x-3 w-full">
      <svg width="60" height="60" viewBox="0 0 100 50" className="overflow-visible">
        <path
          d="M10,50 A40,40 0 0,1 90,50"
          fill="none"
          stroke="#4b5563"
          strokeWidth={strokeWidth}
        />
        <path
          d="M10,50 A40,40 0 0,1 90,50"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
        />
      </svg>
      <div className="flex flex-col text-white leading-tight">
        <div className="font-bold text-lg">{description || `${value}${unit || "%"}`}</div>
        <div className="text-xs text-zinc-400">{label}</div>
      </div>
    </div>
  )
}

export const VerticalKPIGroup = () => {
  return (
    <div className=" rounded-md w-full space-y-3">
      <SemiCircleGauge value={71} label="Polytropic efficiency" description="71%" color="#FFB74D" />
      <hr className="border-t border-gray-600 m-0" />
      <SemiCircleGauge
        value={70} // proportional to 2238 BHP
        label="Shaft Power"
        description="2238 BHP"
        color="#295430"
      />
      <hr className="border-t border-gray-600 m-0" />

      <SemiCircleGauge value={84} label="Utilization" description="84%" color="#295430" />
    </div>
  )
}
