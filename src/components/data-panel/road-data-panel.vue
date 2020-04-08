<template>
  <div id="root">
    <div class="root-left">
      <div class="title">
        图层表格 - 道路
        <!-- <i class="iconfont iconcha" @click="leftFlag=false"></i> -->
      </div>
      <div class="main">
        <el-table ref="roadTable" highlight-current-row :data="$store.state.project.roadInfo" height="139" @row-click="onRowClick" class="common-table" border style="width: 100%" @row-dblclick="rowDblClick">
          <el-table-column prop="id" label="道路编号" min-width="100">
          </el-table-column>
          <el-table-column label="所属主路" prop="properties.mainRoad" sortable min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.mainRoad}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="properties.roadClass" label="道路级别" sortable min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.roadClass==0?'主路':'支线'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="长度m" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.length}}</span>
            </template>
          </el-table-column>
          <el-table-column label="道路面积m²" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.properties.area}}</span>
            </template>
          </el-table-column>
          <el-table-column label="填方量m³" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.fill}}</span>
            </template>
          </el-table-column>
          <el-table-column label="挖方量m³" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.cut}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="root-right">
      <div class="title">
        纵断面图
        <i class="iconfont iconcha" @click="close"></i>
      </div>

      <road-data-chart :roadOption="roadOption" style="width:100%;height:100%;"></road-data-chart>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import roadDataChart from "./road-data-chart.vue"

export default {
  components: {
    roadDataChart
  },
  data () {
    return {
      leftFlag: true,
      rightFlag: true,
      roadCrossList: [],
      roadOption: {},
      dataInfo: []

    }
  },
  computed: {
    selectedNext () {
      return this.next1 && this.next2;
    }
  },
  watch: {
    "$store.state.app.detailsType": function (val) {
      // console.log(val.id)
      this.selectTableRow(val.id)
    }
  },
  created () {
    this.getRoadInfo({
      callback: (res) => {
        this.dataInfo = res.data;

      }
    })

  },
  mounted () {
    this.getRoadCrossSectionInfo({
      callback: (res) => {
        this.roadCrossList = res.data;
        this.selectRowInfo()
      }
    })
  },
  beforeDestroy () {

  },
  methods: {
    ...mapActions('project', ['getRoadInfo', 'getRoadCrossSectionInfo']),
    close () {
      this.$emit('close', this.type)
    },
    selectRowInfo () {
      let data = this.dataInfo.filter((item, index) => {
        return item.indexInLayer == this.roadCrossList[0].indexInLayer
      })
      this.setChart(this.roadCrossList[0]);
      this.$refs.roadTable && this.$refs.roadTable.setCurrentRow(data[0]);
    },
    selectTableRow (id) {
      let data = this.dataInfo.filter((item, index) => {
        return item.indexInLayer == id
      })
      var chartData = this.roadCrossList.filter((item, index) => {
        return item.indexInLayer == id;
      })
      this.$refs.roadTable && this.$refs.roadTable.setCurrentRow(data[0]);
      this.setChart(chartData[0]);
    },
    //点击每一行表格
    onRowClick (row) {
      this.$refs.roadTable.setCurrentRow(row);

      this.$store.dispatch("map/setFeatureHighLight", { type: "road", id: row.indexInLayer })
      var chartData = this.roadCrossList.filter((item, index) => {
        return item.indexInLayer == row.indexInLayer;
      })
      // console.log(chartData)
      if (chartData.length > 0) {
        this.setChart(chartData[0]);
      }
    },
    setChart (chartData) {
      var seriesArr = chartData.vertices;
      this.roadOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            axios: "auto",
            lineStyle: {
              color: "rgba(0,0,0,0)"
            }
          }
        },
        legend: {
          right: "0",
          data: [
            {
              name: '地形高',
              // icon: 'line',
              // textStyle: {
              // color: 'red'
              // }
            }
          ]
        },
        xAxis: {
          name: "长度(米)",
          type: "category",
          boundaryGap: false,
          axisLabel: {

          },
          axisLine: {

          },
          nameGap: 6
        },
        yAxis: {
          name: "高(米)",
          type: "value",
          axisLine: {

          },
          axisLabel: {

          },
          splitLine: {
            show: true
          },
          max: function (value) {
            return value.max + 300;
          },
          min: function (value) {
            return value.max - 300;
          },
          nameGap: 7
        },
        grid: {
          left: '45',
          right: '55',
          top: '25',
          bottom: '30'
        },
        series: [
          {
            name: "地形高",
            data: seriesArr,
            type: "line",
            smooth: true,
            itemStyle: {
              // color:"#57b649"
            }
          }
        ]
      }

    },
    rowDblClick (row, column, event) {
      this.$store.dispatch("map/locat2Feature", { type: "road", ids: [String(row.indexInLayer)] })
    }
  }
}
</script>

<style lang="scss" scoped>
#root {
  position: fixed;
  left: 315px;
  right: 0;
  bottom: 30px;
  height: 196px;
  background: rgba(74, 74, 82, 1);
  border-top: 1px solid rgba(0, 0, 0, 1);
  // border-left: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.85;
  .root-left {
    float: left;
    width: 65%;
    height: 100%;
    overflow: hidden;
    border-right: 1px solid rgba(0, 0, 0, 1);
    display: flex;
    flex-direction: column;
  }
  .root-right {
    float: left;
    width: 35%;
    height: 100%;
    overflow: hidden;
    // border-left: 1px solid rgba(0, 0, 0, 1);
    display: flex;
    flex-direction: column;
  }
  .title {
    height: 32px;
    background: rgba(52, 52, 57, 0.8);
    line-height: 32px;
    padding: 0 11px;
    font-size: 14px;
    color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 1);
    i {
      float: right;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .main {
    flex: 1;
    padding: 10px 10px 15px;
    /deep/ .el-table__row {
      cursor: pointer;
    }
  }
}
</style>
