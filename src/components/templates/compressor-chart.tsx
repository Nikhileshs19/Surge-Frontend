// src/components/charts/CompressorChart.tsx
"use client"
import React, { use, useEffect, useState } from "react"
import CanvasJSReact from "@/library/canvas/@canvasjs/react-stockcharts/canvasjs.stock.react"
import { interpolateColor, lightenColor, rgbToHex, getBlockGradient } from "@/utils/chart-utils"
import { CompressorChartProps, LoadLine } from "@/types/chart"
import AlertModal from "@/components/templates/alert-modal"
import BottomSection from "./bottom-section"
import dayjs from "dayjs"
const CanvasJSChart = CanvasJSReact.CanvasJSChart

export default function CompressorChart({
  scmValveOpeningData,
  section,
  alertSection,
  dataPoints,
  config: { color, greycolor },
  loadLinesSpecial = [],
  loadLinesPercent = [],
  isLoading = false,
  isFocusMode,
}: CompressorChartProps & { loadLinesPercent?: LoadLine[]; loadLinesSpecial?: LoadLine[] }) {
  const [showAlert, setShowAlert] = useState(false)
  const ages = dataPoints.map((p) => p.age || 0)
  const minAge = Math.min(...ages)
  const maxAge = Math.max(...ages)
  const startColor = rgbToHex(lightenColor(color, 0.8))

  useEffect(() => {
    if (section && alertSection.includes(section)) {
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }
  }, [alertSection, section])

  const maxX = Math.max(...dataPoints.map((p) => p.x)) * 1.125
  const sectionMaxX = {
    1: 5500,
    2: 4500,
    3: 2500,
  }

  const scatterSeries = {
    type: "scatter",
    name: `Section ${section}`,
    markerType: "circle",
    color,

    dataPoints: dataPoints.map((point) => ({
      x: point.x,
      y: point.y,
      markerColor: interpolateColor(point.age ?? 0, maxAge, minAge, color, startColor),
      toolTipContent: `Timestamp: ${
        dayjs(point.timestamp).format("DD-MMM-YYYY HH:mm") ?? "N/A"
      } <br/> ACFM: ${point.x}, Isentropic Head: ${point.y}}`,
    })),
  }

  const lineSeriesPercent = loadLinesPercent.map((line) => ({
    type: "spline",
    showInLegend: false,
    name: "hideToolTip",
    color: line.borderColor ? line.borderColor : "#FFFFFF",
    markerType: "none",
    lineThickness: 1,
    dataPoints: line.data.map((p, i) => ({
      x: p.x,
      y: p.y,
      ...(i === line.data.length - 1 && {
        indexLabel: `${line.label}`,
        indexLabelFontColor: "#fff",
        indexLabelFontSize: 10,
        indexLabelPlacement: "outside",
        indexLabelTextAlign: "right",
        indexLabelFontWeight: "bold",
      }),
    })),
  }))

  const lineSeriesSpecial = loadLinesSpecial.map((line) => {
    const midPoint = Math.floor(line.data.length / 2)
    return {
      type: "spline",
      showInLegend: false,
      name: "hideToolTip",
      color: line.borderColor ? line.borderColor : "#FFFFFF",
      markerType: "none",
      lineThickness: 1,
      lineDashType: line.label === "SCL" ? "dash" : "solid",
      dataPoints: line.data.map((p, i) => ({
        x: p.x,
        y: p.y,
        ...(i === midPoint && {
          indexLabel: `${line.label}`,
          indexLabelFontColor: "#fff",
          indexLabelFontSize: 10,
          indexLabelPlacement: "outside",
          indexLabelTextAlign: "left",
          indexLabelFontWeight: "bold",
        }),
      })),
    }
  })

  const options = {
    animationEnabled: true,
    theme: "dark2",
    backgroundColor: showAlert ? "rgba(0, 0, 0, 0)" : "#26293C",
    zoomEnabled: true,
    height: 270,
    axisX: {
      title: "Inlet Volume (ACFM)",
      interval: 500,
      // add maximum only if maxX is defined
      ...(maxX &&
        section &&
        maxX > sectionMaxX[section as keyof typeof sectionMaxX] && { maximum: maxX }),
      labelFontColor: "#fff",
      labelFontSize: 10,
      titleFontColor: "#fff",
      titleFontSize: 10,
      titleFontWeight: "bold",
      gridColor: "#444",
    },
    axisY: {
      interval: 1000,
      title: "Isentropic Head (FT)",
      labelFontColor: "#fff",
      labelFontSize: 10,
      titleFontColor: "#fff",
      titleFontSize: 10,
      titleFontWeight: "bold",
      gridColor: "#444",
    },
    legend: {
      fontColor: "#ccc",
    },

    data: [scatterSeries, ...lineSeriesPercent, ...lineSeriesSpecial],
    toolTip: {
      shared: true,
      contentFormatter: function (e: any) {
        let content = ""
        e.entries.forEach(function (entry: any) {
          // Check the series name (line.label) and skip if it's the one you want to hide
          if (entry.dataSeries.name === "hideToolTip") {
            return
          }
          content += `${entry.dataSeries.name}: ${entry.dataPoint.y}<br/>`
        })
        return content
      },
      borderThickness: 0,
      borderColor: null,
      backgroundColor: "#26293C",
    },
  }
  return (
    <div
      className={`relative px-4 py-2 w-full flex flex-col ${
        showAlert && !isFocusMode ? "bg-[#30313b]" : "bg-[#26293C]"
      }`}
    >
      {isLoading && (
        <div className="loader absolute z-50 top-1/3 left-1/2 translate-x-[-50%] "></div>
      )}
      {showAlert && !isFocusMode && section && alertSection.includes(section) && (
        <AlertModal
          section={section}
          currentOpening={
            scmValveOpeningData?.[section].filter(
              (kpi: any) => kpi.category === "recycle-opening"
            )[0]?.value
          }
          setShowAlert={setShowAlert}
        />
      )}

      <h3 className="text-white text-base  font-semibold">Section {section}</h3>
      <CanvasJSChart options={options} />

      <div className=" mx-4 my-2 ">
        <div className="flex justify-between items-center text-xs text-white/70 px-1 justify-center text-Grey-Grey-disable-Text text-[10px] font-normal ">
          <span>Newest</span>
          <div className="flex-grow h-[1px] bg-white/50 mx-2" />
          <span>Oldest</span>
        </div>
        <div
          className="h-2"
          style={{
            // background: showAlert ? getBlockGradient(greycolor) : getBlockGradient(color),
            background: showAlert
              ? `linear-gradient(to right,${greycolor}, #FFFFFF)`
              : `linear-gradient(to right, ${color} ,#FFFFFF)`,
          }}
        />
      </div>

      <BottomSection section={section} data={scmValveOpeningData} showAlert={showAlert} />
    </div>
  )
}
