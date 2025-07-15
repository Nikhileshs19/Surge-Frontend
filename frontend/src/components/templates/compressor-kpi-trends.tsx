import React, { useState, useRef, useEffect } from "react"
import CanvasJSReact from "@/library/canvas/@canvasjs/react-stockcharts/canvasjs.stock.react"
import calendarIcon from "../../../public/images/Calendar.svg"
import Image from "next/image"
import { useTrendDataQuery } from "@/services/api/compressor-api"
import DateFilterMenu from "./date-filter-menu"
import dayjs from "dayjs"
import { useKpiSelector } from "@/context/kpi-selector-context"
import { Dropdown } from "primereact/dropdown"

type Prop = {
  id: number
  sharedTo?: string | null
  sharedFrom?: string | null
  isFocusMode?: boolean
}

export default function CompressorKpiTrends({ id, sharedTo, sharedFrom, isFocusMode }: Prop) {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart
  const [showDateMenu, setShowDateMenu] = useState(false)
  const [filterInterval, setFilterInterval] = useState({ from: null, to: null })
  const [selectedInterval, setSelectedInterval] = useState<number>(7)
  const [dropdownOptions, setDropdownOptions] = useState<{ alias: string; description: string }[]>(
    []
  )
  const [option, setOption] = useState(undefined)

  let from = filterInterval.from ? dayjs(filterInterval.from).format("YYYY-MM-DD") : null
  let to = filterInterval.to ? dayjs(filterInterval.to).format("YYYY-MM-DD") : null
  if (isFocusMode) {
    from = sharedFrom ?? null
    to = sharedTo ?? null
  }

  const { data: trendData, isLoading } = useTrendDataQuery({ id, from, to })
  const menuRef = useRef<HTMLDivElement>(null)
  const { selectedKpi, setSelectedKpi } = useKpiSelector()

  const groupByAlias = trendData?.reduce<Record<string, typeof trendData>>((acc, item) => {
    const alias = item.alias
    acc[alias] = acc[alias] ?? []
    acc[alias].push(item)
    return acc
  }, {})

  useEffect(() => {
    if (dropdownOptions.length === 0 && trendData) {
      const options = Object.keys(groupByAlias || {})
      let optionsArr = []
      // make options with alias and options as description
      for (const option of options) {
        const description = groupByAlias?.[option]?.[0].description
        if (description) {
          optionsArr.push({ alias: option, description })
        }
      }
      optionsArr.sort((a, b) => a.description.localeCompare(b.description))
      setDropdownOptions(optionsArr)
    }

    if (dropdownOptions.length > 0 && !selectedKpi.alias) {
      setSelectedKpi(dropdownOptions[0])
    }
  }, [trendData, dropdownOptions])

  useEffect(() => {
    // Avoid resetting selectedKpi if it's already set
    if (dropdownOptions.length > 0 && !selectedKpi?.alias) {
      setSelectedKpi(dropdownOptions[0])
    }
  }, [dropdownOptions, selectedKpi, setSelectedKpi])

  const effectiveKey = selectedKpi?.alias ?? dropdownOptions[0]?.alias ?? ""
  const ERROR_CODES = [-8888, -9999, -7777]

  const filteredGraphData =
    groupByAlias?.[effectiveKey]
      ?.filter((item) => !ERROR_CODES.includes(item.value))
      ?.map((item) => ({
        x: new Date(item.timestamp),
        y: item.value,
        toolTipContent: `<div">
                  Timestamp : <strong>${dayjs(item.timestamp).format(
                    "MMM D, YYYY HH:mm"
                  )}</strong><br/>
                  Value: ${item.value.toFixed(2)}<br/>
                </div>`,
      })) || []

  const options = {
    backgroundColor: "#26293C",
    height: 190,
    legend: {
      fontColor: "#ED7D31",
    },
    axisX: {
      valueFormatString: "MMM D",
      labelFontColor: "#ccc",
      lineColor: "#444",
      gridColor: "#333",
    },
    axisY: {
      labelFontColor: "#ccc",
      lineColor: "#444",
      gridColor: "#333",
    },
    data: [
      {
        type: "spline",
        color: "#ED7D31",
        lineThickness: 1,
        markerSize: 3,
        dataPoints: filteredGraphData,
      },
    ],
  }

  return (
    <div className="text-white space-y-4 bg-[#26293C]  p-2 rounded-lg w-full min-h-4/5 h-full">
      <div className="flex items-center justify-between">
        {/* <select
          className="bg-[#26293C] text-white border border-gray-600 rounded px-3 py-1.5 w-60 justify-between items-center justify-start text-white text-xs font-normal font-['Inter'] tracking-tight max-h-[150px] overflow-y-auto"
          value={selectedKpi?.alias ?? ""}
          onChange={(e) => setSelectedKpi({ alias: e.target.value, description: "" })}
        >
          {dropdownOptions.map((opt) => (
            <option key={opt.alias} value={opt.alias}>
              {opt.description}
            </option>
          ))}
        </select> */}
        {/*  */}
        <Dropdown
          value={selectedKpi.alias ?? null}
          onChange={(e) => {
            const selectedOption = dropdownOptions.find((opt) => opt.alias === e.value)
            if (selectedOption) {
              setSelectedKpi(selectedOption)
            }
          }}
          options={dropdownOptions}
          optionValue="alias"
          optionLabel="description"
          placeholder="Select a Parameter"
          className="bg-[#26293C] text-white border border-gray-600 rounded px-3 py-1.5 w-65 text-white text-xs font-normal"
        />

        <div className="relative">
          <Image
            src={calendarIcon}
            alt="Calendar Icon"
            className="cursor-pointer w-6 h-6"
            onClick={() => setShowDateMenu(!showDateMenu)}
          />

          {showDateMenu && (
            <DateFilterMenu
              menuRef={menuRef}
              filterInterval={filterInterval}
              setFilterInterval={setFilterInterval}
              setShowDateMenu={setShowDateMenu}
              selectedInterval={selectedInterval}
              setSelectedInterval={setSelectedInterval}
            />
          )}
        </div>
      </div>

      {/* Line Chart */}
      <div
        className={`graph-container mt-4 flex items-center justify-center ${
          isLoading || filteredGraphData.length === 0 ? "h-[190px]" : ""
        }`}
      >
        {isLoading ? (
          <div className="loader"></div>
        ) : filteredGraphData.length === 0 ? (
          <div className="text-white text-center h-full flex items-center justify-center">
            <p>
              No Data available for selected timerange and parameter, please select different
              timerange
            </p>
          </div>
        ) : (
          <CanvasJSChart options={options} />
        )}
      </div>
    </div>
  )
}
