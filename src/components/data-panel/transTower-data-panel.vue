<template>
  <div id="root">
    <div class="root-left">
      <div class="title">
        图层表格 - 杆塔
        <i class="iconfont iconcha" @click="close"></i>
      </div>
      <div class="main">
        <el-table ref="towerTable" highlight-current-row :data="$store.state.project.transTowerInfo" height="139" class="common-table" border style="width: 100%" @row-click="rowClick" @row-dblclick="rowDblClick">
          <el-table-column prop="towerID" label="塔编号" min-width="80">
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
          <el-table-column label="塔型" prop="properties.towerModel" sortable min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.towerModel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="呼高m" prop="properties.nominalHeight" min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.nominalHeight}}</span>
            </template>
          </el-table-column>
          <el-table-column label="设计标高m" min-width="120">
            <template slot-scope="scope">
              <span>{{scope.row.properties.elevation}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="properties.lineID" label="线路编号" sortable min-width="100">
            <template slot-scope="scope">
              <span>{{scope.row.properties.lineID.join(',')}}</span>
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
      console.log(val.id)
      this.selectTableRow(val.id)
    }
  },
  created () {
    this.getTransTowerInfo({
      callback: (res) => {
        this.dataList = res.data
      }
    })
  },
  methods: {
    ...mapActions('project', ['getTransTowerInfo']),
    selectTableRow (id) {
      let data = this.dataList.filter((item, index) => {
        return item.uid == id
      })
      // console.log(data)
      this.$refs.towerTable && this.$refs.towerTable.setCurrentRow(data[0]);
    },
    rowClick (row, column, event) {
      this.$refs.towerTable.setCurrentRow(row)
      this.$store.dispatch("map/setFeatureHighLight", { type: "transTower", id: row.uid })
    },
    rowDblClick (row, column, event) {
      this.$store.dispatch("map/locat2Feature", { type: "transTower", ids: [String(row.uid)] })
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
