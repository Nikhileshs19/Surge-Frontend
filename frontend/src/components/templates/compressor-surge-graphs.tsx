import CompressorChart from "@/components/templates/compressor-chart"
import useDebounce from "@/hooks/useDebounce"
import {
  useCompressorStatusQuery,
  useSCMValveOpeningQuery,
  useSurgeGraphDataQuery,
} from "@/services/api/compressor-api"
import { GraphDataPoint, GroupGraphData, SCMValveOpeningItem } from "@/types/chart"
import { compressorData } from "@/utils/data"

type Status = { alert: boolean; alertSection: number[]; runningStatus: number }
type Prop = {
  compressorId: number
  from: string | null
  to: string | null
  isFocusMode?: boolean
}

export default function CompressorSurgeGraphs({ compressorId, from, to, isFocusMode }: Prop) {
  const debouncedFrom = useDebounce(from, 2000)
  const debouncedTo = useDebounce(to, 2000)
  const { data: scmValveOpeningData } = useSCMValveOpeningQuery(compressorId)

  const { data: compressorStatusData } = useCompressorStatusQuery()
  const { data: surgeGraphData, isLoading } = useSurgeGraphDataQuery({
    id: compressorId,
    from: debouncedFrom,
    to: debouncedTo,
  })

  const groupGraphData = surgeGraphData?.reduce<Record<number, Record<string, GraphDataPoint>>>(
    (acc, item) => {
      acc[item.section] ??= {}
      acc[item.section][item.timestamp] ??= { x: 0, y: 0, age: 0, timestamp: item.timestamp }
      if (item.alias.toLocaleLowerCase().includes("vlm_flow"))
        acc[item.section][item.timestamp].x = item.value
      else acc[item.section][item.timestamp].y = item.value
      return acc
    },
    {}
  )

  const groupedSectionData = scmValveOpeningData?.reduce<{
    [section: number]: SCMValveOpeningItem[]
  }>((acc, item: SCMValveOpeningItem) => {
    if (!acc[item.section]) {
      acc[item.section] = []
    }
    acc[item.section].push(item)
    return acc
  }, {})

  const groupedCompressorStatusData = compressorStatusData?.reduce<Record<number, Status>>(
    (acc, item) => {
      if (!acc[item.compressor]) {
        acc[item.compressor] = {} as Status
      }
      acc[item.compressor].alert = item.alert
      acc[item.compressor].alertSection = item.alertSection
      acc[item.compressor].runningStatus = item.runningStatus
      return acc
    },
    {}
  )
  // alert for particular compressor
  const alert =
    groupedCompressorStatusData?.[compressorId]?.alert &&
    groupedCompressorStatusData[compressorId].runningStatus === 1

  const alertSection = alert ? groupedCompressorStatusData[compressorId].alertSection : []

  const getDataWithAge = (
    groupGraphData: GroupGraphData | undefined,
    section: number
  ): GraphDataPoint[] => {
    const dataWithAge = Object.entries(groupGraphData?.[section] ?? {}).map(
      ([timestamp, point], indx) => {
        point.age = indx
        point.timestamp = timestamp
        return point
      }
    )
    const filteredData = dataWithAge.filter(
      (point) => point.x > 0 && point.y > 2000 && point.y < 13000
    )
    return filteredData
  }

  return (
    <div className="chart-wrapper">
      <div className="flex gap-4  w-[100%] h-[380px]">
        <CompressorChart
          scmValveOpeningData={groupedSectionData?.[1]}
          section={1}
          alertSection={alertSection}
          dataPoints={getDataWithAge(groupGraphData, 1)}
          loadLinesPercent={compressorData.chart1.loadLinesPercent}
          loadLinesSpecial={compressorData.chart1.loadLinesSpecial}
          config={compressorData.chart1.config}
          isLoading={isLoading}
          isFocusMode={isFocusMode}
        />
        <CompressorChart
          scmValveOpeningData={groupedSectionData?.[2]}
          section={2}
          alertSection={alertSection}
          dataPoints={getDataWithAge(groupGraphData, 2)}
          loadLinesPercent={compressorData.chart2.loadLinesPercent}
          loadLinesSpecial={compressorData.chart2.loadLinesSpecial}
          config={compressorData.chart2.config}
          isLoading={isLoading}
          isFocusMode={isFocusMode}
        />
        <CompressorChart
          scmValveOpeningData={groupedSectionData?.[3]}
          section={3}
          alertSection={alertSection}
          dataPoints={getDataWithAge(groupGraphData, 3)}
          loadLinesPercent={compressorData.chart3.loadLinesPercent}
          loadLinesSpecial={compressorData.chart3.loadLinesSpecial}
          config={compressorData.chart3.config}
          isLoading={isLoading}
          isFocusMode={isFocusMode}
        />
      </div>
    </div>
  )
}
