import { useQuery } from "@tanstack/react-query"
import { api } from "../api-client"
import { Alias, CompressorStatusDto, ErroLog, SurgeProp, TagValueDto } from "@/types/dto-types"

// ----- fetcher functions -----

export const fetchLastRunTime = async (): Promise<string> => {
  const response = await api.get("/last-run-time")
  return response.data
}

const fetchCompressorStatuses = async (): Promise<CompressorStatusDto[]> => {
  const response = await api.get("/compressor-status")
  return response.data
}
const fetchKeyKpis = async (id: number): Promise<TagValueDto[]> => {
  const response = await api.get(`/key-kpis/${id}`)
  return response.data
}
const fetchOperatingParams = async (id: number): Promise<TagValueDto[]> => {
  const response = await api.get(`/operating-params/${id}`)
  return response.data
}
const fetchHealthData = async (id: number): Promise<TagValueDto[]> => {
  const response = await api.get(`/health-graph-data/${id}`)
  return response.data
}

const fetchSCMValveOpening = async (id: number): Promise<TagValueDto[]> => {
  const response = await api.get(`/surge-scm-opening/${id}`)
  return response.data
}

const fetchSurgeGraphData = async ({ id, from, to }: SurgeProp): Promise<TagValueDto[]> => {
  let url = `/surge-graph-data/${id}`
  if (from && to) url = `/surge-graph-data/${id}?from=${from}&to=${to}`
  const response = await api.get(url)
  return response.data
}

const fetchTrendData = async ({ id, from, to }: SurgeProp): Promise<TagValueDto[]> => {
  let url = `/trend/${id}`
  if (from && to) url = `/trend/${id}?from=${from}&to=${to}`
  const response = await api.get(url)
  return response.data
}
const fetchErrorLogs = async (): Promise<ErroLog[]> => {
  const response = await api.get("/error-logs")
  return response.data
}

const fetchAliasMinMax = async (): Promise<Alias[]> => {
  const response = await api.get(`/alias-min-max`)
  return response.data
}

const commonQueryOptions = {
  refetchInterval: 1000 * 60,
  refetchOnWindowFocus: true,
}

// ----- hooks -----

export const useCompressorStatusQuery = () =>
  useQuery({
    queryKey: ["compressor-status"],
    queryFn: fetchCompressorStatuses,
    ...commonQueryOptions,
  })

export const useKeyKpisQuery = (id: number) =>
  useQuery({ queryKey: ["key-kpis", id], queryFn: () => fetchKeyKpis(id), ...commonQueryOptions })
export const useOperatingParamsQuery = (id: number) =>
  useQuery({
    queryKey: ["operating-params", id],
    queryFn: () => fetchOperatingParams(id),
    ...commonQueryOptions,
  })

export const useHealthDataQuery = (id: number) =>
  useQuery({
    queryKey: ["health-graph-data", id],
    queryFn: () => fetchHealthData(id),
    ...commonQueryOptions,
  })

export const useSCMValveOpeningQuery = (id: number) =>
  useQuery({
    queryKey: ["surge-scm-opening", id],
    queryFn: () => fetchSCMValveOpening(id),
    ...commonQueryOptions,
  })

export const useSurgeGraphDataQuery = ({ id, from, to }: SurgeProp) =>
  useQuery({
    queryKey: ["surge-graph-data", id, from, to],
    queryFn: () => fetchSurgeGraphData({ id, from, to }),
    ...commonQueryOptions,
    // do not refetch if in focus mode i.e to and from are provided
    refetchInterval: !(from && to) ? false : commonQueryOptions.refetchInterval,
  })
export const useTrendDataQuery = ({ id, from, to }: SurgeProp) =>
  useQuery({
    queryKey: ["trend", id, from, to],
    queryFn: () => fetchTrendData({ id, from, to }),
    ...commonQueryOptions,
  })
export const useLastRunTimeQuery = () =>
  useQuery({ queryKey: ["last-run-time"], queryFn: fetchLastRunTime, ...commonQueryOptions })
export const useErrorLogsQuery = () =>
  useQuery({ queryKey: ["error-logs"], queryFn: fetchErrorLogs, ...commonQueryOptions })

export const useAliasMinMaxQuery = () =>
  useQuery({ queryKey: ["alias-min-max"], queryFn: fetchAliasMinMax })
