export type CompressorStatusDto = {
  name: string
  compressor: number
  runningStatus: number
  alert: boolean
  alertSection: number[]
  alertCompressor: number
}

export type TagValueDto = {
  tag: number
  timestamp: string
  value: number
  alias: string
  description: string
  category: string
  section: number
}
export type SurgeProp = {
  id: number
  from: string | null
  to: string | null
}

export type ErroLog = {
  compressor: number
  message: string
}

export type Alias = {
  alias: string
  min: number
  max: number
}
