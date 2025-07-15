import { evaluateFormulaInRange, surgeEqautions } from "./equations"

export const compressorData = {
  chart1: {
    loadLinesPercent: [
      {
        label: "105%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section1["105%"].formula,
          surgeEqautions.Section1["105%"].min,
          surgeEqautions.Section1["105%"].max
        ),
      },
      {
        label: "100%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section1["100%"].formula,
          surgeEqautions.Section1["100%"].min,
          surgeEqautions.Section1["100%"].max
        ),
      },
      {
        label: "90%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section1["90%"].formula,
          surgeEqautions.Section1["90%"].min,
          surgeEqautions.Section1["90%"].max
        ),
      },
      {
        label: "80%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section1["80%"].formula,
          surgeEqautions.Section1["80%"].min,
          surgeEqautions.Section1["80%"].max
        ),
      },
    ],
    loadLinesSpecial: [
      {
        label: "SML",

        data: evaluateFormulaInRange(
          surgeEqautions.Section1["SLL"].formula,
          surgeEqautions.Section1["SLL"].min,
          surgeEqautions.Section1["SLL"].max,
          true,
          300
        ),
      },
      {
        label: "SCL",
        data: evaluateFormulaInRange(
          surgeEqautions.Section1["SCL"].formula,
          surgeEqautions.Section1["SCL"].min,
          surgeEqautions.Section1["SCL"].max,
          true
        ),
      },
    ],
    config: {
      minX: 2000,
      maxX: 4500,
      minY: 4000,
      maxY: 12000,
      stepSizeX: 500,
      stepSizeY: 2000,
      color: "#133d7d",
      greycolor: "#27354a",
    },
  },
  chart2: {
    loadLinesPercent: [
      {
        label: "105%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section2["105%"].formula,
          surgeEqautions.Section2["105%"].min,
          surgeEqautions.Section2["105%"].max
        ),
      },
      {
        label: "100%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section2["100%"].formula,
          surgeEqautions.Section2["100%"].min,
          surgeEqautions.Section2["100%"].max
        ),
      },
      {
        label: "90%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section2["90%"].formula,
          surgeEqautions.Section2["90%"].min,
          surgeEqautions.Section2["90%"].max
        ),
      },
      {
        label: "80%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section2["80%"].formula,
          surgeEqautions.Section2["80%"].min,
          surgeEqautions.Section2["80%"].max
        ),
      },
    ],
    loadLinesSpecial: [
      {
        label: "SML",
        data: evaluateFormulaInRange(
          surgeEqautions.Section2["SLL"].formula,
          surgeEqautions.Section2["SLL"].min,
          surgeEqautions.Section2["SLL"].max,
          true
        ),
      },
      {
        label: "SCL",
        data: evaluateFormulaInRange(
          surgeEqautions.Section2["SCL"].formula,
          surgeEqautions.Section2["SCL"].min,
          surgeEqautions.Section2["SCL"].max,
          true
        ),
      },
    ],
    config: {
      minX: 1500,
      maxX: 4500,
      minY: 0,
      maxY: 10000,
      stepSizeX: 500,
      stepSizeY: 1000,
      color: "#0d5737",
      greycolor: "#2a332f",
    },
  },
  chart3: {
    loadLinesPercent: [
      {
        label: "105%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section3["105%"].formula,
          surgeEqautions.Section3["105%"].min,
          surgeEqautions.Section3["105%"].max
        ),
      },
      {
        label: "100%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section3["100%"].formula,
          surgeEqautions.Section3["100%"].min,
          surgeEqautions.Section3["100%"].max
        ),
      },
      {
        label: "90%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section3["90%"].formula,
          surgeEqautions.Section3["90%"].min,
          surgeEqautions.Section3["90%"].max
        ),
      },
      {
        label: "80%",
        data: evaluateFormulaInRange(
          surgeEqautions.Section3["80%"].formula,
          surgeEqautions.Section3["80%"].min,
          surgeEqautions.Section3["80%"].max
        ),
      },
    ],
    loadLinesSpecial: [
      {
        label: "SML",
        data: evaluateFormulaInRange(
          surgeEqautions.Section3["SLL"].formula,
          surgeEqautions.Section3["SLL"].min,
          surgeEqautions.Section3["SLL"].max,
          true
        ),
      },
      {
        label: "SCL",
        data: evaluateFormulaInRange(
          surgeEqautions.Section3["SCL"].formula,
          surgeEqautions.Section3["SCL"].min,
          surgeEqautions.Section3["SCL"].max,
          true
        ),
      },
    ],
    config: {
      minX: 600,
      maxX: 2400,
      minY: 2000,
      maxY: 6000,
      stepSizeX: 200,
      stepSizeY: 500,
      color: "#8a320b",
      greycolor: "#42322a",
    },
  },
}
