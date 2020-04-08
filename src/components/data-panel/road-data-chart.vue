<template>
  <div class="gold-form" id="chart">
  </div>
</template>

<script>

// const echarts = require('echarts')
export default {
  components: {},
  props: {
    "roadOption": {
      default: {}
    }
  },
  data () {
    return {
      chart: null
    }
  },
  computed: {
  },
  watch: {
    roadOption (val) {
      // console.log(val)
      this.setChartOption(val);
    }

  },
  mounted () {
    window.onresize = (val) => {
      this.chart && this.chart.resize();
    }
    if (this.roadOption) this.setChartOption(this.roadOption);
  },
  methods: {
    setChartOption (val) {
      if (!this.chart) {
        this.chart = echarts.init(document.getElementById('chart'))
      }
      if (!val) {
        this.chart.setOption({})
      } else {
        this.chart && this.chart.setOption(val);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#chart {
  background: white;
}
</style>
