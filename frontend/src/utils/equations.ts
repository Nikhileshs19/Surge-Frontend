export const surgeEqautions = {
  Section1: {
    "105%": {
      formula:
        "-0.00000000066713 * x ** 4 + 0.0000089703 * x ** 3 - 0.04566 * x ** 2 + 103.54 * x - 76517",
      min: 2840,
      max: 4600,
    },
    "100%": {
      formula:
        "-0.00000000103427 * x ** 4 + 0.0000137686 * x ** 3 - 0.0691077 * x ** 2 + 154.068 * x - 117953",
      min: 2740,
      max: 4400,
    },
    "90%": {
      formula:
        "-0.00000000147979 * x ** 4 + 0.0000173942 * x ** 3 - 0.0769909 * x ** 2 + 151.391 * x - 102946",
      min: 2430,
      max: 3900,
    },
    "80%": {
      formula:
        "-0.000000000815291 * x ** 4 + 0.00000809492 * x ** 3 - 0.0305687 * x ** 2 + 51.5468 * x - 25961.9",
      min: 2125,
      max: 3500,
    },
    SLL: {
      formula: "-0.0000087229 * x ** 2 + 0.30828 * x + 473.14",
      min: 6000,
      max: 12000,
    },
    SCL: {
      formula: "-0.000006552 * x ** 2 + 0.2483 * x + 1226",
      min: 6000,
      max: 12000,
    },
  },
  Section2: {
    "105%": {
      formula:
        "-0.00000000082698 * x ** 4 + 0.000010364 * x ** 3 - 0.049278 * x ** 2 + 104.46 * x - 73571",
      min: 2575,
      max: 4200,
    },
    "100%": {
      formula:
        "-0.0000000010244 * x ** 4 + 0.000012045 * x ** 3 - 0.053389 * x ** 2 + 105.1 * x - 68851",
      min: 2440,
      max: 4000,
    },
    "90%": {
      formula:
        "-0.0000000018115 * x ** 4 + 0.000019835 * x ** 3 - 0.081603 * x ** 2 + 148.69 * x - 94134",
      min: 2210,
      max: 3600,
    },
    "80%": {
      formula:
        "-0.0000000012709 * x ** 4 + 0.000012269 * x ** 3 - 0.044818 * x ** 2 + 72.6 * x - 38361",
      min: 1950,
      max: 3200,
    },
    SLL: {
      formula: "-0.000012849 * x ** 2 + 0.349 * x + 438.79",
      min: 5000,
      max: 9750,
    },
    SCL: {
      formula: "-0.000009672 * x ** 2 + 0.2801 * x + 1131",
      min: 5000,
      max: 9750,
    },
  },
  Section3: {
    "105%": {
      formula:
        "-0.00000000072011 * x ** 4 + 0.0000043709 * x ** 3 - 0.010643 * x ** 2 + 11.713 * x + 1071.7",
      min: 1350,
      max: 2340,
    },
    "100%": {
      formula:
        "-0.00000000089248 * x ** 4 + 0.0000052696 * x ** 3 - 0.012416 * x ** 2 + 13.226 * x + 36.971",
      min: 1300,
      max: 2220,
    },
    "90%": {
      formula:
        "0.00000000034899 * x ** 4 - 0.0000031665 * x ** 3 + 0.0084591 * x ** 2 - 9.4314 * x + 8175.6",
      min: 1190,
      max: 2000,
    },
    "80%": {
      formula:
        "-0.0000000029943 * x ** 4 + 0.000015407 * x ** 3 - 0.030558 * x ** 2 + 27.037 * x - 5508.5",
      min: 1020,
      max: 1780,
    },
    SLL: {
      formula: "-0.00001817 * x ** 2 + 0.30701 * x + 183.73",
      min: 3000,
      max: 6000,
    },
    SCL: {
      formula: "-0.000013499 * x ** 2 + 0.2428 * x + 587.78",
      min: 3000,
      max: 6000,
    },
  },
}

export const healthEquations = {
  Section1: {
    formula: "-0.00142086*x**2 + 0.000470987*x + 0.0000396861",
    min: 0.159,
    max: 0.3,
  },
  Section2: {
    formula: "-0.00121356*x**2 +0.000792642*x -0.000005049062",
    min: 0.3,
    max: 0.479,
  },
  Section3: {
    formula: "-0.00125041*x**2 +0.000902200*x -0.00000988283",
    min: 0.33,
    max: 0.525,
  },
}

type DataPoint = {
  x: number
  y: number
}

type FormulaFunction = (x: number) => number

export function evaluateFormulaInRange(
  formulaStr: string,
  minX: number,
  maxX: number,
  controlLines: boolean = false,
  step: number = 50
): DataPoint[] {
  const f: FormulaFunction = new Function("x", `return ${formulaStr};`) as FormulaFunction
  let minY: number = Infinity
  let maxY: number = -Infinity
  let data: DataPoint[] = []

  for (let x = minX; x <= maxX; x += step) {
    const y: number = f(x)
    if (controlLines) {
      data.push({
        x: y,
        y: x,
      })
    } else {
      data.push({ x, y })
    }
  }

  return data
}
