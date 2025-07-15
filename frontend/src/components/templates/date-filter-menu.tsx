import dayjs from "dayjs"
import { Calendar } from "primereact/calendar"
import React, { useState } from "react"

const fixedIntervals = [
  { label: "Last Week", value: 7 },
  { label: "Last Month", value: 30 },
  { label: "Last 3M", value: 90 },
]

export default function DateFilterMenu({
  menuRef,
  setShowDateMenu,
  setFilterInterval,
  filterInterval,
  selectedInterval,
  setSelectedInterval,
}: any) {
  const handelFilterForFixedInterval = (value: number) => {
    const currentDate = dayjs()
    const fromDate = currentDate.subtract(value, "day").toDate()
    const toDate = currentDate.toDate()
    setFilterInterval({ from: fromDate, to: toDate })
  }

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-1 p-2 w-84 h-36 z-50 bg-[#1F1E30] rounded-md shadow-lg z-50 text-[12px]"
    >
      <div className="p-1 border-b border-gray-700">
        <div className="flex gap-1">
          {fixedIntervals.map((interval) => (
            <button
              key={interval.value}
              onClick={() => {
                setSelectedInterval(interval.value)
                handelFilterForFixedInterval(interval.value)
                setShowDateMenu(false)
              }}
              className={`text-white px-2.5 py-1.5 rounded hover:bg-white text-xs hover:text-black w-32 h-7 
                border border-white group flex justify-center cursor-pointer transition-colors duration-200 ${
                  selectedInterval === interval.value ? "bg-blue-600" : ""
                }`}
            >
              {interval.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-1">
        <div className="flex gap-1">
          <div className="flex-1">
            <label className="text-white/70">From</label>
            <Calendar
              className="text-white border border-[#A2A2A280] rounded-md px-3  py-1 text-xs w-38 "
              value={filterInterval.from}
              onChange={(e) => {
                setFilterInterval((prev: any) => ({
                  ...prev,
                  from: e.value,
                }))
              }}
              hourFormat="24"
              showIcon
              dateFormat="dd-mm-yy"
            />
          </div>
          <div className="flex-1">
            <label className="text-white/70">To</label>
            <Calendar
              className="text-white border border-[#A2A2A280] rounded-md px-3  py-1 text-xs w-38"
              hourFormat="24"
              value={filterInterval.to}
              onChange={(e) => {
                setFilterInterval((prev: any) => ({
                  ...prev,
                  to: e.value,
                }))
              }}
              showIcon
              dateFormat="dd-mm-yy"
            />
          </div>
        </div>
      </div>
      {/* <button
        onClick={() => setShowDateMenu(false)}
        className="w-full mt-3 px-1.5 py-0.5 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Apply
      </button> */}
    </div>
  )
}
