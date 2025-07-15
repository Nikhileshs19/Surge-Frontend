import { useKpiSelector } from "@/context/kpi-selector-context"
import { SCMValveOpeningItem } from "@/types/chart"
import { valueFormatter } from "@/utils/util"

type Prop = {
  section: number | undefined
  data: SCMValveOpeningItem[] | undefined
  showAlert: boolean
}

export default function BottomSection({ section, data, showAlert }: Prop) {
  const recycleValve = data?.filter((kpi) => kpi.category === "recycle-opening")[0]
  const scm = data?.filter((kpi) => kpi.category === "SCM")[0]
  const { selectedKpi, setSelectedKpi } = useKpiSelector()
  return (
    <div
      className={`flex ${
        section === 3 ? "justify-center" : "justify-between"
      } justify-between items-center text-white text-sm font-semibold px-5 py-2 ${
        showAlert ? "" : "bg-[#1F1E30]"
      }`}
    >
      {section && section != 3 && (
        <div
          className={`py-1 rounded-md text-zinc-400 text-sm font-normal font-inter tracking-wide`}
          onClick={() =>
            setSelectedKpi({
              alias: recycleValve?.alias ?? "",
              description: recycleValve?.description ?? "",
            })
          }
        >
          Recycle Valve Opening:{" "}
          <span className="text-white">{`${valueFormatter(recycleValve?.value)} %`}</span>
        </div>
      )}
      {section != 3 && <div className="h-5 w-[1px] bg-white opacity-50" />}

      <div
        className={`py-1 rounded-md text-zinc-400 text-sm font-normal font-inter tracking-wide cursor-pointer`}
        onClick={() =>
          setSelectedKpi({
            alias: scm?.alias ?? "",
            description: scm?.description ?? "",
          })
        }
      >
        SCM: <span className="text-white">{`${valueFormatter(scm?.value)} %`}</span>
      </div>
    </div>
  )
}
