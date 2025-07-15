"use client"
import CanvasJSReact from "@/library/canvas/@canvasjs/react-stockcharts/canvasjs.stock.react"
import { TagValueDto } from "@/types/dto-types"
import { evaluateFormulaInRange, healthEquations } from "@/utils/equations"
import { useMemo } from "react"

const { CanvasJSChart } = CanvasJSReact

export default function HealthCurve({ data }: { data: TagValueDto[] | undefined }) {
  // Group data by section
  const sectionGroupedData = useMemo(() => {
    const grouped = new Map<number, TagValueDto[]>()
    data?.forEach((item) => {
      if (!grouped.has(item.section)) {
        grouped.set(item.section, [])
      }
      grouped.get(item.section)!.push(item)
    })
    return grouped
  }, [data])

  // Extract health curve data for a given section
  const getHealthCurveData = (section: number): { x: number; y: number }[] => {
    const sectionData = sectionGroupedData.get(section)
    if (!sectionData) return []

    const groupedByTimestamp = new Map<string, TagValueDto[]>()

    sectionData
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
      .forEach((item) => {
        if (!groupedByTimestamp.has(item.timestamp)) {
          groupedByTimestamp.set(item.timestamp, [])
        }
        groupedByTimestamp.get(item.timestamp)!.push(item)
      })

    const result: { x: number; y: number }[] = []

    groupedByTimestamp.forEach((items) => {
      let x = 0
      let y = 0

      for (const item of items) {
        const value = item.value
        if (item.alias.toLowerCase().includes("adiabatic")) {
          y = value
        } else {
          x = value
        }
      }

      if (x > 0 && y > 0) {
        result.push({ x, y })
      }
    })

    return result
  }

  const staticCurveData = [
    {
      type: "spline",
      name: "Section 1",
      showInLegend: true,
      color: "#3b82f6",
      markerSize: 5,
      dataPoints: evaluateFormulaInRange(
        healthEquations.Section1.formula,
        healthEquations.Section1.min,
        healthEquations.Section1.max,
        false,
        0.025
      ),
    },
    {
      type: "spline",
      name: "Section 2",
      showInLegend: true,
      color: "#f97316",
      markerSize: 5,
      dataPoints: evaluateFormulaInRange(
        healthEquations.Section2.formula,
        healthEquations.Section2.min,
        healthEquations.Section2.max,
        false,
        0.025
      ),
    },
    {
      type: "spline",
      name: "Section 3",
      showInLegend: true,
      color: "#22c55e",
      markerSize: 5,
      dataPoints: evaluateFormulaInRange(
        healthEquations.Section3.formula,
        healthEquations.Section3.min,
        healthEquations.Section3.max,
        false,
        0.025
      ),
    },
  ]

  const healthCurveOptions = {
    toolTip: {
      content: "Q/N : {x}, H/N² : {y}",
    },
    backgroundColor: "#26293C",
    height: 210,
    legend: {
      fontSize: 12,
      fontColor: "#ffffff",
      markerMargin: 8,
      markerSize: 10,
      legendMarkerType: "circle",
      lineThickness: 0,
      margin: 4,
    },
    axisX: {
      title: "Q/N",
      // minimum: 0.15,
      // maximum: 0.5,
      labelFontColor: "#929292",
      titleFontColor: "#ffffff",
      titleFontSize: 10,
      titleFontWeight: "normal",
      gridThickness: 1,
      tickLength: 5,
    },
    axisY: {
      title: "H/N²",
      minimum: 0,
      // maximum: 10000,
      labelFontColor: "#929292",
      titleFontSize: 10,
      titleFontWeight: "normal",
      titleFontColor: "#ffffff",
    },
    data: [
      {
        type: "scatter",
        // showInLegend: true
        dataPoints: getHealthCurveData(1),
        color: "#3b82f6",
      },
      {
        type: "scatter",
        // showInLegend: true,
        dataPoints: getHealthCurveData(2),
        color: "#f97316",
      },
      {
        type: "scatter",
        // showInLegend: true,
        dataPoints: getHealthCurveData(3),
        color: "#22c55e",
      },
      ...staticCurveData,
    ],
  }

  return (
    <div className="bg-[#1b1b2d]">
      <CanvasJSChart options={healthCurveOptions} />
    </div>
  )
}
