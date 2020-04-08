<template>
  <div id="root">
    <div class="root-left">
      <div class="title">
        图层表格 - 导线
        <i class="iconfont iconcha" @click="close"></i>
      </div>
      <div class="main">
        <el-table ref="lineTable" highlight-current-row :data="$store.state.project.transLineInfo" height="139" class="common-table" border style="width: 100%" @row-click="rowClick" @row-dblclick="rowDblClick">
          <el-table-column prop="lineID" label="线路编号" min-width="100">
          </el-table-column>
          <el-table-column label="线路级别" prop="properties.lineClass" sortable min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.lineClass==0?'主路':'支线'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="circuitID" label="所属回路" sortable min-width="100">
          </el-table-column>
          <el-table-column label="导线类型" prop="properties.wiremodel" sortable min-width="180">
            <template slot-scope="scope">
              <span>{{scope.row.properties.wiremodel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="长度m" min-width="80">
            <template slot-scope="scope">
              <span>{{scope.row.properties.length}}</span>
            </template>
          </el-table-column>
          <el-table-column label="双回路名称" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.doubleName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="双回路长度m" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.length}}</span>
            </template>
          </el-table-column>
          <el-table-column label="并行线路编号" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.doubleCircuitID}}</span>
            </template>
          </el-table-column>
          <el-table-column label="串联风机数量" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.turbineCount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="串联容量MW" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.capacity}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  components: {},
  data () {
    return {

      dataList: []
    }
  },
  computed: {

  },
  watch: {

    "$store.state.app.detailsType": function (val) {
      // console.log(val.id)
      this.selectTableRow(val.id)
    }
  },
  created () {
    this.getTransLineInfo({
      callback: (res) => {
        this.dataList = res.data
      }
    })
  },
  methods: {
    ...mapActions('project', ['getTransLineInfo']),
    selectTableRow (id) {
      let data = this.dataList.filter((item, index) => {
        return item.lineID == id
      })
      // console.log(data)
      this.$refs.lineTable && this.$refs.lineTable.setCurrentRow(data[0]);
    },
    rowClick (row, column, event) {
      this.$refs.lineTable.setCurrentRow(row)
      this.$store.dispatch("map/setFeatureHighLight", { type: "transLine", id: row.lineID })
    },
    rowDblClick (row, column, event) {
      this.$store.dispatch("map/locat2Feature", { type: "transLine", ids: [String(row.lineID)] })
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
