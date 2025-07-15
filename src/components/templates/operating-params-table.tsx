import { useKpiSelector } from "@/context/kpi-selector-context"
import { useAliasMinMaxQuery } from "@/services/api/compressor-api"
import { TagValueDto } from "@/types/dto-types"
import React from "react"

export default function OperatingParamsTable({ data }: { data: TagValueDto[] | undefined }) {
  const { setSelectedKpi } = useKpiSelector()
  const { data: aliasMinMax } = useAliasMinMaxQuery()

  // Inlet Pressure - section 1 - value 1, section 2 - value 2, section 3 - value 3
  const grouped: Record<string, Record<string, any>> = {}
  data?.forEach((item) => {
    const desc = item.description
    if (!grouped[desc]) {
      grouped[desc] = {}
    }
    grouped[desc][`Section ${item.section}`] = { value: item.value, alias: item.alias }
  })

  const paramsList = Object.keys(grouped)
  const sectionList = ["Section 1", "Section 2", "Section 3"]

  return (
    <div>
      <table className="operating-params-table w-full table-auto text-sm text-left bg-[#1b1b2d]">
        <thead className="text-gray-400 border-b border-gray-600">
          <tr className="h-7">
            {/* change the style to a common */}
            <th>Parameter</th>
            <th>Section 1</th>
            <th>Section 2</th>
            <th>Section 3</th>
          </tr>
        </thead>
        <tbody>
          {paramsList.map((param, idx) => (
            <tr key={idx} className="border-b border-gray-700">
              <td className="pl-3 text-white text-xs font-normal ">{param}</td>
              {sectionList.map((section, i) => {
                const alias = grouped[param][section]?.alias
                const value = grouped[param][section]?.value
                const currentAlias = aliasMinMax?.find((a) => a.alias === alias)
                const min = currentAlias?.min
                const max = currentAlias?.max
                return (
                  <td
                    key={i}
                    className={`py-2 px-2  text-xs font-normal text-center cursor-pointer 
                        ${
                          alias && value && min && max && (value < min || value > max)
                            ? "text-red-400"
                            : "text-white"
                        }
                      `}
                    onClick={() => {
                      setSelectedKpi({
                        alias: alias ?? "",
                        description: "",
                      })
                    }}
                  >
                    {grouped[param][section] ? value?.toFixed(2) : "-"}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
