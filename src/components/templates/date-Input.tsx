"use client"

import { useState, useEffect, useRef } from "react"
import { DateInputProps } from "@/types/compressor"

export function DateInput({ label, value, onChange, onDateClick }: DateInputProps) {
  const dateInputRef = useRef<HTMLInputElement>(null)
  const timeInputRef = useRef<HTMLInputElement>(null)
  const dateString = value ? value.toISOString().split("T")[0] : ""
  const timeString = value ? value.toTimeString().slice(0, 5) : ""

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return
    const newDate = new Date(e.target.value)
    if (value) {
      newDate.setHours(value.getHours(), value.getMinutes())
    }
    onChange(newDate)
  }
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!value || !e.target.value) return
    const [hours, minutes] = e.target.value.split(":")
    const newDate = new Date(value)
    newDate.setHours(parseInt(hours), parseInt(minutes))
    onChange(newDate)
  }

  const handleTimeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (timeInputRef.current) {
      timeInputRef.current.showPicker()
      onDateClick?.() // Add modal trigger
    }
  }

  return (
    <div className="flex items-center gap-1 w-50 date-input-wrapper">
      <label className="text-white/70 font-normal justify-start text-xs font-inter tracking-tight">
        {label}
      </label>
      <div className="border border-white/30 px-2 rounded-md flex items-center gap-1">
        <div
          className="cursor-pointer"
          onClick={() => {
            dateInputRef.current?.showPicker()
            onDateClick?.()
          }}
        >
          <input
            ref={dateInputRef}
            type="date"
            value={dateString}
            onChange={handleDateChange}
            className="bg-transparent text-white text-xs py-1 w-[90px] border-none outline-none cursor-pointer"
          />
        </div>
        <div className="cursor-pointer" onClick={handleTimeClick}>
          <input
            ref={timeInputRef}
            type="date"
            value={timeString}
            onChange={handleTimeChange}
            className="bg-transparent text-white text-xs py-1 w-[60px] border-none outline-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
