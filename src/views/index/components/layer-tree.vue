<template>
  <panel-container id="root" title="图层" icon="icontuceng">
    <el-tree class="data-tree" ref="dataTree" :data="treeData" show-checkbox default-expand-all node-key="layerId" @check-change="checkChange">
      <span class="data-tree-node" slot-scope="{ node, data }">
        <span @dblclick="nodeDoubleClick(data,node)">
          <i class="node-icon">{{ data.layerName }}</i>
        </span>
        <i v-if="data.showGrid" class="grid-icon iconfont iconbiaoge" @click="showGrid(data)"></i>
      </span>
    </el-tree>
  </panel-container>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { LayerConfig } from '@/config/layer-config'
import PanelContainer from '@/components/panel-container.vue'

export default {
  components: {
    PanelContainer,
  },
  data () {
    return {
      treeData: [],
      loadTransData: false
    }
  },
  computed: {

  },
  watch: {

  },

  mounted () {
    this.treeData = LayerConfig
  },
  methods: {
    ...mapActions('project', ['getTurbineInfo', 'getTransLineInfo', 'getTransTowerInfo', "getRoadInfo", 'getRoadGeoInfo', "getStationInfo", 'getResidentInfo']),
    checkChange (data, selected) {
      if (data.layerType === "service") {
        // 加载或移除 在线服务图层
        selected ? gwmap.loadServiceLayer(data) : gwmap.removeServiceLayer(data)
        return
      }
      switch (data.layerId) {
        case "turbine":
          this.loadTurbineInfo(() => {
            gwmap.dataManager.showHideTurbines(selected)
          })
          break
        case "transLine":
          this.loadTransLineTowerInfo(() => {
            gwmap.dataManager.showHideTransLine(selected)
          })
          break
        case "transTower":
          this.loadTransLineTowerInfo(() => {
            gwmap.dataManager.showHideTransTower(selected)
          })
          break
        case "road":
          this.loadRoadInfo(() => {
            gwmap.dataManager.showHideRoad(selected)
          })
          break
        case "station":
          this.loadStationInfo(() => {
            gwmap.dataManager.showHideStation(selected)
          })
          break
        case "resident":
          if (!selected) {
            gwmap.dataManager.removeResident()
            return
          }
          this.getResidentInfo({
            callback: (res) => {
              if (!res.success) {
                this.$message.error("获取居民地数据失败。")
                return
              }
              gwmap.dataManager.addResident(res.data)
            }
          })
          break
      }
    },
    nodeDoubleClick (data, node) {
      gwmap.dataManager.locat2Layer(data.layerId)
    },
    showGrid (data) {
      this.$emit("show-grid", data)
    },
    loadTurbineInfo (callback) {
      if (gwmap.dataManager.turbineLoaded()) {
        callback && callback()
        return
      }
      this.getTurbineInfo({
        callback: (res) => {
          if (!res.success) {
            this.$message.error("获取风机数据失败。")
            return
          }

          gwmap.dataManager.addTurbines(res.data)
          callback && callback()
        }
      })
    },
    loadTransLineTowerInfo (callback) {
      if (this.loadTransData) return
      if (gwmap.dataManager.transLineLoaded()) {
        callback && callback()
        return
      }
      // 同时加载集电线路 杆塔和导线数据
      this.loadTransData = true
      this.getTransLineInfo({
        callback: (res) => {
          if (!res.success) {
            this.loadTransData = false
            this.$message.error("获取集电线路数据失败。")
            return
          }
          this.getTransTowerInfo({
            callback: (res2) => {
              if (!res2.success) {
                this.loadTransData = false
                this.$message.error("获取集电线路数据失败。")
                return
              }
              this.loadTransData = false
              gwmap.dataManager.addTransLineTower({ transLine: res.data, transTower: res2.data, })
              // 将杆塔和导线都设为不可见
              const checkedKeys = this.$refs.dataTree.getCheckedKeys()
              gwmap.dataManager.showHideTransLine(checkedKeys.indexOf('transLine') >= 0)
              gwmap.dataManager.showHideTransTower(checkedKeys.indexOf('transTower') >= 0)
              callback && callback()
            }
          })
        }
      })
    },
    loadRoadInfo (callback) {
      if (gwmap.dataManager.roadLoaded()) {
        callback && callback()
        return
      }
      this.getRoadInfo({ callback: () => { } })
      this.getRoadGeoInfo({
        callback: (res) => {
          if (!res.success) {
            this.$message.error("获取道路数据失败。")
            return
          }

          gwmap.dataManager.addRoad(res.data)
          callback && callback()
        }
      })
    },
    loadStationInfo (callback) {
      if (gwmap.dataManager.stationLoaded()) {
        callback && callback()
        return
      }
      this.getStationInfo({
        callback: (res) => {
          if (!res.success) {
            this.$message.error("获取升压站数据失败。")
            return
          }

          gwmap.dataManager.addStation(res.data)
          callback && callback()
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
#root {
  width: 100%;
  height: 100%;
}

.grid-icon {
  cursor: pointer;
  font-size: 14px;
  color: #f0f0f0;
}
</style>
