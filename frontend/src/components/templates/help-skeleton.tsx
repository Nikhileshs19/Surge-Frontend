"use client"
import { useHelpOverlay } from "@/context/help-overlay-context"
import React, { useEffect, useState } from "react"

export default function HelpSkeleton({ onClose }: { onClose: () => void }) {
  const { setShowHelp } = useHelpOverlay()
  return (
    <div
      onClick={onClose}
      className="bg-[#1f1e30]/90 text-sm text-white absolute inset-x-0 top-0 h-screen z-100 text-normal"
    >
      {/* Top Bar */}
      <div className="flex text-center h-8 mb-2 gap-2 align-middle">
        <div className="border p-2 w-130">Heading of Dashboard</div>
        <div className="border p-2 w-75">Dashboard Timestamp</div>
        <div className="border p-2 flex-grow flex ">
          <span className="pl-[36%]">Help and Full Screen Button</span>
          <i
            className="pi pi-times cursor-pointer ml-auto mr-2"
            onClick={() => {
              setShowHelp(false)
            }}
          ></i>
        </div>
      </div>

      {/* Compressor Info Row */}
      <div className="text-xs text-center font-medium flex flex-row gap-1 mb-2">
        <div className="w-158 border p-2">
          Buttons to Navigate among the Compressors also get visibility of alerts notifications and
          compressors run status{" "}
        </div>
        <div className="border p-2 w-59">Running Status of selected compressor</div>
        <div className="border p-2 flex-grow">
          Dates to be changed for viewing historical operating curves
        </div>
      </div>

      {/* Surge Graphs Explanation */}
      <div className="border p-3 space-y-2 text-xs h-[380px] flex m-auto align-center flex-col justify-around text-[15px]">
        <div>
          <p className="font-semibold">
            Following Section is for Showing Realtime Operating points based on the OEM Curves which
            will help operator to know how far current operation is from the Surge Line, one curve
            for each section in the compressor, consisting of{" "}
          </p>
          <ol className="list-decimal pl-4 space-y-1 ml-6 mb-5 mt-2">
            <li>
              SLL(Surge Limit Line) - if the operating point breaches this line compressor will be
              under surge
            </li>
            <li>
              SCL(Surge Control Line) - If the operating point breaches this line, alert message
              will be popped up alerting the operator as compressor would be close to surge.
            </li>
            <li>
              This graph shows the last 5 operating points with darkest point indicating current
              values
            </li>
          </ol>

          <p className="font-semibold">KPI: </p>
          <ol className="list-decimal pl-4 space-y-1">
            <li>
              {" "}
              Recycle Valve Opening - Opening percentage of Recycle valves to V2 (Section-1) and V3
              (Section 2) Drums
            </li>
            <li>
              SCM (Surge Control Margin) - It shows how far the current operating point is from
              Surge Control Line
            </li>
          </ol>
          <p className="font-semibold pt-4 ">
            Alert Notification: Compressor Operating Near Surge Line{" "}
          </p>
          <ol className="list-decimal pl-4 space-y-1">
            <li> When the compressor operates near the surge line, an alert will be triggered.</li>
            <li>
              A pop-up message will appear in the relevant section, displaying the Surge Control
              Margin (SCM) and the current recycle valve opening.
            </li>
          </ol>
        </div>
      </div>

      {/* Surge Graphs Row */}
      <div className="flex gap-2 h-[245px] mt-2">
        <div className="border p-2 w-[220px] flex flex-col justify-center">
          Following are the Key KPIs for monitoring Compressor Performance and Health
        </div>
        <div className="border p-2 w-[680px] flex flex-col justify-center ">
          Two clickable tabs are available here -
          <ol className="list-decimal pl-4">
            <li>Operating Parameter</li>
            <li>Health Curve</li>
          </ol>{" "}
          <ol className="list-decimal pl-4 space-y-1">
            <li>
              Operating Parameter: This section shows the sensor values indicating major operating
              parameters for the compressor
            </li>
            <li>
              Health Curve: This section shows the trend for the Normalized curve for whole
              compressor (Normalized for different speeds)
            </li>
          </ol>
        </div>
        <div className="border p-2  flex-grow flex justify-center items-center">
          This section is for long term trends for the key operating parameters which can be
          selected from the drop down. The period can be changed by clicking the graph icon,
        </div>
      </div>
    </div>
  )
}
