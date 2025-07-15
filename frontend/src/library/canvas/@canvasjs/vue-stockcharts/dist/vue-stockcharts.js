import * as h from "../../stockcharts";
import { openBlock as a, createElementBlock as n, normalizeStyle as o } from "vue";
const c = (t, s) => {
  const r = t.__vccOpts || t;
  for (const [i, e] of s)
    r[i] = e;
  return r;
};
var l = "Chart" in h ? h : window.CanvasJS;
const d = {
  props: {
    styles: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["chart-ref"],
  data() {
    return {
      chart: null,
      updateChart: !0,
      containerStyle: {
        width: this.styles && this.styles.width ? this.styles.width : "100%",
        height: this.styles && this.styles.height ? this.styles.height : "360px",
        ...this.styles
      }
    };
  },
  watch: {
    options: {
      handler(t, s) {
        this.updateChart = t !== s;
      }
    }
  },
  updated() {
    this.chart && this.updateChart && (this.chart.options = this.options, this.chart.render());
  },
  mounted() {
    this.chart = new l.Chart(this.$refs.chartContainer, this.options), this.chart.render(), this.$emit("chart-ref", this.chart);
  },
  unmounted() {
    this.chart && this.chart.destroy();
  }
};
function C(t, s, r, i, e, p) {
  return a(), n("div", {
    ref: "chartContainer",
    style: o(e.containerStyle)
  }, null, 4);
}
const u = /* @__PURE__ */ c(d, [["render", C]]);
var y = "Chart" in h && "StockChart" in h ? h : window.CanvasJS;
const f = {
  props: {
    styles: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["stockchart-ref"],
  data() {
    return {
      stockChart: null,
      updateStockChart: !0,
      containerStyle: {
        width: this.styles && this.styles.width ? this.styles.width : "100%",
        height: this.styles && this.styles.height ? this.styles.height : "400px",
        ...this.styles
      }
    };
  },
  watch: {
    options: {
      handler(t, s) {
        this.updateStockChart = t !== s;
      }
    }
  },
  updated() {
    this.stockChart && this.updateStockChart && (this.stockChart.options = this.options, this.stockChart.render());
  },
  mounted() {
    this.stockChart = new y.StockChart(this.$refs.stockChartContainer, this.options), this.stockChart.render(), this.$emit("stockchart-ref", this.stockChart);
  },
  unmounted() {
    this.stockChart && this.stockChart.destroy();
  }
};
function k(t, s, r, i, e, p) {
  return a(), n("div", {
    ref: "stockChartContainer",
    style: o(e.containerStyle)
  }, null, 4);
}
const S = /* @__PURE__ */ c(f, [["render", k]]), _ = {
  install: (t, s) => {
    t.component("CanvasJSChart", u).component("CanvasJSStockChart", S);
  }
};
export {
  _ as default
};
