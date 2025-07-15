export enum CompressorStatus {
  ON = "on",
  WARNING = "warning",
  OFF = "off",
}

export interface CompressorTimestamp {
  id: number
  start: Date | null
  end: Date | null
}

export const statusLabelMap: Record<CompressorStatus, string> = {
  [CompressorStatus.ON]: "ON",
  [CompressorStatus.WARNING]: "WARNING",
  [CompressorStatus.OFF]: "OFF",
}

// make type or interface
// make enums for constant values
// think about how/where Record is used

export const statusColorMap: Record<CompressorStatus, string> = {
  [CompressorStatus.ON]: "bg-green-500",
  [CompressorStatus.WARNING]: "bg-yellow-400",
  [CompressorStatus.OFF]: "bg-red-500",
}

export const getStatusIconClass = (status: CompressorStatus): string => {
  switch (status) {
    case CompressorStatus.WARNING:
      return "pi pi-exclamation-triangle text-yellow-400"
    case CompressorStatus.OFF:
      return "pi pi-power-off text-white text-center bg-red-700 rounded-full w-5 h-5  py-0.5 m-0"
    default:
      return ""
  }
}

export interface CompressorNavigationProps {
  compressorStatuses?: CompressorStatus[]
  selectedCompressorId: number
  setFocusMode: (value: boolean) => void
  fromDate: Date | null
  toDate: Date | null
  onFromDateChange: (date: Date | null) => void
  onToDateChange: (date: Date | null) => void
  isFocusMode: boolean
}

export interface DateInputProps {
  label: string
  value: Date | null
  onChange: (date: Date | null) => void
  onDateClick?: () => void
}
