// common utility functions will go here
export const valueFormatter = (value: number | undefined, round?: number): string => {
  if (typeof value === "number" && value === 0) return "0"
  if (!value) return ""
  if (value === -8888 || value === -9999 || value === -7777) return "***"
  return value.toFixed(round ?? 0)
}
