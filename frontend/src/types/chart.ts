// remove the types which are not used in the code

export interface CompressorDataPoint {
  x: number
  y: number
  age: number // Represents the age of the data point
}

interface extraValues {
  recycleValve?: string // Optional recycle valve value
  scm?: string // Optional SCM value
}

export interface LoadLine {
  label: string
  borderColor?: string
  data: { x: number; y: number }[]
}

export interface ChartConfig {
  minX: number
  maxX: number
  minY: number
  maxY: number
  stepSizeX: number
  stepSizeY: number
  color: string
  greycolor: string // Base color for the chart
}

export interface GraphDataPoint {
  x: number
  y: number
  age: number
  timestamp: string
}

export interface GroupGraphData {
  [section: number]: Record<string, GraphDataPoint>
}

export interface CompressorChartProps {
  scmValveOpeningData?: SCMValveOpeningItem[]
  alertSection: number[]
  section?: number // Section number of the chart
  dataPoints: GraphDataPoint[] // Array of data points for the chart
  values?: extraValues // Optional extra values like recycle valve and SCM
  loadLinesPercent?: LoadLine[]
  loadLinesSpecial?: LoadLine[] // Optional array of load lines
  config: ChartConfig // Configuration for chart axes
  isLoading?: boolean
  isFocusMode?: boolean
}

export type SCMValveOpeningItem = {
  section: number
  category: string
  [key: string]: any
}
