import { useKeyKpisQuery } from "@/services/api/compressor-api"
import { SemiCircleGauge } from "./semi-circle-gauge-chart"
import { useKpiSelector } from "@/context/kpi-selector-context"

const maxShaftPower = 3000
const maxSpeed = 10
export default function CompressorKPI({ id }: { id: number }) {
  const { data: keyKpiData } = useKeyKpisQuery(id)
  const efficiency = keyKpiData?.filter((kpi) => kpi.alias.toLowerCase().includes("efficiency"))[0]
  const shaftPower = keyKpiData?.filter((kpi) => kpi.alias.toLowerCase().includes("shaft_pwr"))[0]
  const utilization = keyKpiData?.filter((kpi) =>
    kpi.alias.toLowerCase().includes("utilization")
  )[0]
  const speed = keyKpiData?.filter((kpi) => kpi.description.toLowerCase().includes("speed"))[0]
  const { setSelectedKpi } = useKpiSelector()

  return (
    <div className="bg-[#26293C] rounded-md text-white px-2  pt-1 min-h-4/5">
      <div className="  rounded-md w-full space-y-3">
        <div
          className="cursor-pointer"
          onClick={() =>
            setSelectedKpi({
              alias: efficiency?.alias ?? "",
              description: efficiency?.description ?? "",
            })
          }
        >
          <SemiCircleGauge
            value={efficiency?.value ?? 0}
            label="Polytropic efficiency"
            unit="%"
            limit={60}
          />
        </div>
        <hr className="border-t border-gray-600 m-0" />
        <div
          className="cursor-pointer"
          onClick={() =>
            setSelectedKpi({
              alias: shaftPower?.alias ?? "",
              description: shaftPower?.description ?? "",
            })
          }
        >
          <SemiCircleGauge
            value={shaftPower?.value ?? 0}
            label="Shaft Power"
            unit="BHP"
            limit={0.6}
            percentageValue={(shaftPower?.value ?? 0) / maxShaftPower}
          />
        </div>
        <hr className="border-t border-gray-600 m-0" />
        <div
          className="cursor-pointer"
          onClick={() =>
            setSelectedKpi({
              alias: utilization?.alias ?? "",
              description: utilization?.description ?? "",
            })
          }
        >
          <SemiCircleGauge
            value={utilization?.value ?? 0}
            label="Utilization"
            unit="%"
            limit={60}
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            setSelectedKpi({
              alias: speed?.alias ?? "",
              description: speed?.description ?? "",
            })
          }
        >
          <SemiCircleGauge
            value={speed?.value ?? 0}
            label="Speed"
            unit="MRPM"
            limit={0.6}
            percentageValue={(speed?.value ?? 0) / maxSpeed}
            round={1}
          />
        </div>
      </div>
    </div>
  )
}

// color - "#FFB74D" color="#295430"
