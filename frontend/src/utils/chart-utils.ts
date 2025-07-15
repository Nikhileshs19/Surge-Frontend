import { CompressorChartProps, LoadLine } from "@/types/chart"
import tinycolor from "tinycolor2"

export function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

export function adjustColorBrightnessHex(hex: string, factor: number): [number, number, number] {
  const rgb = hexToRgb(hex)
  return rgb.map((channel) => Math.min(255, Math.max(0, Math.round(channel * factor)))) as [
    number,
    number,
    number
  ]
}

//create a adjust color brightness function that takes hex and returns hex not rgb
export function lightenColor(hex: string, percent: number): string {
  // Ensure it's in hex format
  if (!hex.startsWith("#")) return hex

  const num = parseInt(hex.replace("#", ""), 16)
  let r = (num >> 16) + Math.round(255 * percent)
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * percent)
  let b = (num & 0x0000ff) + Math.round(255 * percent)

  r = Math.min(255, r)
  g = Math.min(255, g)
  b = Math.min(255, b)

  return `rgb(${r}, ${g}, ${b})`
}

//rgbtohex taking rgb values as one and returning hex string taking input of format that lightenColor returns
export function rgbToHex(rgb: string): string {
  const rgbValues = rgb.match(/\d+/g)
  if (!rgbValues || rgbValues.length !== 3) return rgb // Return original if parsing fails
  const hex = rgbValues
    .map((value) => {
      const hexValue = parseInt(value).toString(16)
      return hexValue.padStart(2, "0")
    })
    .join("")
  return `#${hex}`
}

export function getBlockGradient(baseColor: string): string {
  const steps = [0.2, 0.4, 0.6, 0.8]
  const blocks: string[] = []

  // First block: base color (0%–20%)
  blocks.push(`${baseColor} 0%`, `${baseColor} 20%`)

  // Add remaining blocks in 20% chunks
  steps.forEach((lighten, i) => {
    const lightColor = tinycolor(baseColor)
      .lighten(lighten * 100)
      .toString()
    const start = 20 + i * 20
    const end = start + 20
    blocks.push(`${lightColor} ${start}%`, `${lightColor} ${end}%`)
  })

  return `repeating-linear-gradient(to right, ${blocks.join(", ")})`
}

export function interpolateColor(
  age: number,
  maxAge: number,
  minAge: number,
  color: string,
  lightenStartColor: string
): string {
  const startColor = hexToRgb(lightenStartColor)
  const endColor = hexToRgb(color)

  const t = (age - minAge) / (maxAge - minAge)
  return `rgb(${startColor
    .map((channel, i) => Math.round(channel + t * (endColor[i] - channel)))
    .join(", ")})`
}

// export function createDataset(
//   section: number,
//   dataPoints: CompressorChartProps["dataPoints"],
//   color: string
// ): any {
//   const maxAge = Math.max(...dataPoints.map((p) => p.age));
//   const minAge = Math.min(...dataPoints.map((p) => p.age));
//   const endColor = lightenColor(color, 0.8);
//   return {
//     label: `Section ${section}`,
//     data: dataPoints.map(({ x, y }) => ({ x, y })),
//     pointRadius: 6,
//     pointBackgroundColor: dataPoints.map((point) =>
//       interpolateColor(point.age, maxAge, minAge, color, endColor)
//     ),
//   };
// }

export function createLoadLineDataset(loadLines: LoadLine[]): any[] {
  return loadLines.map((line) => ({
    label: line.label,
    data: line.data,
    type: "line" as const,
    borderColor: line.borderColor,
    fill: false,
    pointRadius: 2,
  }))
}
