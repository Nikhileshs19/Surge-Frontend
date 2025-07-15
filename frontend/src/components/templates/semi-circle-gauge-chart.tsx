type GaugeProps = {
  value: number
  label: string
  unit?: string
  limit: number
  percentageValue?: number
  round?: number
}
export const SemiCircleGauge = ({
  value,
  label,
  unit,
  limit,
  percentageValue,
  round = 0,
}: GaugeProps) => {
  const radius = 40
  const strokeWidth = 20
  const circumference = Math.PI * radius
  let offset = value < 0 ? circumference : value > 100 ? 0 : circumference * (1 - value / 100)
  // percentageValue prop for params with absolute value
  if (percentageValue) offset = circumference * (1 - percentageValue)
  if (percentageValue && percentageValue >= 1) offset = 0
  let color = "#4CAF50"
  if (value > 0 && value < limit) color = "#FFB74D"
  if (percentageValue && percentageValue < limit) color = "#FFB74D"
  // no colors for -ve values
  if (value < 0) color = ""

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
        <div className="font-bold text-lg">{`${
          value < 0 ? "***" : value.toFixed(round)
        } ${unit}`}</div>
        <div className="text-xs text-zinc-400">{label}</div>
      </div>
    </div>
  )
}
