<template>
  <div id="root" class="summary-panel">
    <div class="header"> <span>项目概览</span> <span @click="onClose" class="close"> × </span> </div>
    <div class="summary-content">
      <fan-details-line class="summary-line" :title="'风机'">
        <summary-fan :data="turbineSummary"></summary-fan>
      </fan-details-line>
      <fan-details-line class="summary-line" :title="'升压站'" :width="'55'">
        <summary-station :data="stationSummary"></summary-station>
      </fan-details-line>
      <fan-details-line class="summary-line" :title="'道路'">
        <summary-road :data="roadSummary"></summary-road>
      </fan-details-line>
      <fan-details-line class="summary-line" :title="'集电线路'" :width="'70'">
        <summary-line :data="powerSummary"></summary-line>
      </fan-details-line>
    </div>
  </div>
</template>

<script>
import fanDetailsLine from '@/components/fan-details-line.vue'
import summaryFan from '@/components/summary-panel/summary-fan.vue'
import summaryStation from '@/components/summary-panel/summary-station.vue'
import summaryRoad from '@/components/summary-panel/summary-road.vue'
import summaryLine from '@/components/summary-panel/summary-line.vue'
import { mapState, mapActions } from "vuex"

export default {
  props: {


  },
  components: {
    fanDetailsLine,
    summaryFan,
    summaryStation,
    summaryRoad,
    summaryLine
  },
  data () {
    return {

    }
  },
  computed: {
    turbineSummary () {
      return this.$store.state.project.projectSummary
        && this.$store.state.project.projectSummary.turbineSummary
    },
    stationSummary () {
      return this.$store.state.project.projectSummary
        && this.$store.state.project.projectSummary.stationInfo
        && this.$store.state.project.projectSummary.stationInfo.properties
    },
    roadSummary () {
      return this.$store.state.project.projectSummary
        && this.$store.state.project.projectSummary.roadSummary
    },
    powerSummary () {
      return this.$store.state.project.projectSummary
        && this.$store.state.project.projectSummary.powerSummary
    }
  },
  watch: {

  },
  created () {
    this.getProjectSummary({      callback: (res) => {
        // console.log(res.data)  // 数据在vuex --->project/projectSummary
      }    })
  },
  mounted () {

  },
  methods: {
    ...mapActions('project', ['getProjectSummary']),
    onClose () {
      this.$emit("close");
    }
  }
}
</script>

<style lang="scss" scoped>
.summary-panel {
  width: 630px;
  height: 640px;
  margin-left: -310px;
  margin-top: -320px;
  background: rgba(74, 74, 82, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  color: rgba(240, 240, 240, 1);
  font-size: 14px;
}
.summary-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 5px;
  .summary-line {
    width: 300px;
    padding: 5px;
  }
}
.header {
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  background: rgba(52, 52, 57, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  position: relative;
  display: flex;
  justify-content: space-between;
  & > div {
    position: absolute;
    top: 4px;
    right: 50px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    height: 23px;
    line-height: 23px;
    width: 80px;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
  }
  .close {
    width: 20px;
    text-align: right;
    display: inline-block;
    font-size: 21px;
    cursor: pointer;
  }
  .close:hover {
    color: rgba(255, 255, 255, 1);
  }
}
</style>