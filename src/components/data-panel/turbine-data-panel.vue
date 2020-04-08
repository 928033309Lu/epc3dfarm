<template>
  <div id="root">
    <div class="root-left">
      <div class="title">
        图层表格 - 风机
        <i class="iconfont iconcha" @click="close"></i>
      </div>
      <div class="main">
        <el-table ref="fanTable" highlight-current-row :data="$store.state.project.turbineInfo" height="139" class="common-table" border style="width: 100%" @row-click="rowClick" @row-dblclick="rowDblClick">
          <el-table-column prop="id" label="风机编号" min-width="80">
          </el-table-column>
          <el-table-column label="X东" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.xycoordinate[0]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="Y北" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.xycoordinate[1]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="海拔m" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.elevation}}</span>
            </template>
          </el-table-column>
          <el-table-column label="线路编号" prop="properties.lineID" sortable min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.lineID}}</span>
            </template>
          </el-table-column>
          <el-table-column label="机型" prop="properties.type" sortable min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.properties.type}}</span>
            </template>
          </el-table-column>
          <el-table-column label="轮毂高度m" min-width="80">
            <template slot-scope="scope">
              <span>{{scope.row.properties.hubHeight}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接风机塔号" min-width="80">
            <template slot-scope="scope">
              <span>{{scope.row.properties.towerID}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  components: {},
  data () {
    return {
      dataList: []
    }
  },
  computed: {},
  watch: {
    "$store.state.app.detailsType": function (val) {
      // console.log(val.id)
      this.selectTableRow(val.id)
    }
  },
  created () {
    this.getTurbineInfo({
      callback: (res) => {
        this.dataList = res.data
      }
    })
  },
  methods: {
    ...mapActions('project', ['getTurbineInfo']),
    selectTableRow (id) {
      let data = this.dataList.filter((item, index) => {
        return item.id == id
      })
      // console.log(data)
      this.$refs.fanTable && this.$refs.fanTable.setCurrentRow(data[0]);
    },
    rowClick (row, column, event) {
      this.$refs.fanTable.setCurrentRow(row)
      this.$store.dispatch("map/setFeatureHighLight", { type: "turbine", id: row.id })
    },
    rowDblClick (row, column, event) {
      this.$store.dispatch("map/locat2Feature", { type: "turbine", ids: [String(row.id)] })
    },
    close () {
      this.$emit('close', this.type)
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
  // width: 50%;
  height: 196px;
  background: rgba(74, 74, 82, 1);
  border-top: 1px solid rgba(0, 0, 0, 1);
  // border-left: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.85;
  .root-left {
    float: left;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // border-right: 1px solid rgba(0, 0, 0, 1);
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
  }
}
</style>
