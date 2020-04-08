<template>
  <div>
    <div id="logoContainer">
      <div id="logo-container">
        <img class="logo-icon" src="/images/logo.png" style="width: 21px;height: 21px;" />
        <span class="logo-text">{{projectName}}</span>
      </div>
    </div>
    <div id="groupContainer1">
      <div id="groupContainer2">
        <layer-tree id="layerTree" ref="layerTree" @show-grid="showDataGrid"></layer-tree>
        <div id="settingContainer" v-if="settingComponent">
          <!-- <router-view name="setting" /> -->
          <component v-bind:is="settingComponent+'-panel'"></component>
        </div>
      </div>
      <div id="toolbarContainer">
        <toolbar id="toolbar" ref="toolbar" @btnClicked="toolbarBtnClicked"></toolbar>
      </div>
    </div>
    <div id="gridContainer" v-if="gridComponent">
      <!-- <router-view name="grid" /> -->
      <component v-bind:is="gridComponent +'-data-panel'" ref="grid" :gridComponent.sync="gridComponent" :type="gridComponent" @close="gridClose"></component>
    </div>
    <div id="statusContainer">
    </div>
    <!-- 概览 -->
    <div id="summaryContainer" v-if="summaryComponent">
      <summary-panel @close="closeSummary"></summary-panel>
    </div>

    <fan-details :title="detailsTitle" v-show="fanVisible" @close="closeFanDeatils">
      <div slot="header" v-if="detailsComponent == 'road'" @click="onRoadData">查看纵断面</div>
      <component slot="content" :detalisList="detalisList" v-if="detailsComponent" v-bind:is="'fan-details-'+ detailsComponent +'-data'"></component>
    </fan-details>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import envConfig from '@/config/env-config'
import LayerTree from './components/layer-tree.vue'
import Toolbar from './components/toolbar.vue'
import routerMixin from './router-mixin'
import fanDetails from '@/components/fan-details.vue'

import summaryPanel from '@/components/summary-panel/summary-panel.vue'

export default {
  components: {
    LayerTree,
    Toolbar,
    fanDetails,
    'fan-details-fan-data': () => import('@/components/fan-details-data/fan-details-fan-data.vue'),
    'fan-details-road-data': () => import('@/components/fan-details-data/fan-details-road-data.vue'),
    'fan-details-station-data': () => import('@/components/fan-details-data/fan-details-station-data.vue'),
    'fan-details-tower-data': () => import('@/components/fan-details-data/fan-details-tower-data.vue'),
    'fan-details-line-data': () => import('@/components/fan-details-data/fan-details-line-data.vue'),
    summaryPanel,
    'terrain-panel': () => import('@/components/setting-panel/terrain-panel.vue'),
    'towerfall-panel': () => import('@/components/setting-panel/towerfall-panel.vue'),
    'measure-panel': () => import('@/components/setting-panel/measure-panel.vue'),
    'plot-panel': () => import('@/components/setting-panel/plot-panel.vue'),
    'road-data-panel': () => import('@/components/data-panel/road-data-panel.vue'),

    'turbine-data-panel': () => import('@/components/data-panel/turbine-data-panel.vue'),
    'transLine-data-panel': () => import('@/components/data-panel/transLine-data-panel.vue'),
    'transTower-data-panel': () => import('@/components/data-panel/transTower-data-panel.vue'),
    'elevationslicing-data-panel': () => import('@/components/data-panel/elevationslicing-data-panel.vue')
  },
  mixins: [
    routerMixin
  ],
  data () {
    return {
      settingComponent: null,
      gridComponent: null,
      summaryComponent: false,
      summaryOpen: false,
      fanVisible: false,
      detailsComponent: null,
      detailsTitle: "",
      detalisList: {},
      turbineInfo: [],
      transLineInfo: [],
      transRoadInfo: [],
      transTowerInfo: [],
      fanXy: {
        x: 400,
        y: 200
      }
    }
  },
  computed: {
    ...mapState({
      projectInfo: state => state.project.projectInfo,
      profilePoints: state => state.app.profilePoints
    }),
    projectName () {
      return this.projectInfo && this.projectInfo.projectName
    }
  },
  watch: {
    "$route" () {
      // 底部设置面板
      this.routeUpdate()
    },
    "$store.state.app.detailsType": function (val) {
      // console.log(val)
      this.detailsComponent = val.type;
      this.fanVisible = true;
      this.getDetailsTyleData(val.type, val.id);
    },
    settingComponent (val) {
      if (!val && this.summaryOpen) {
        this.summaryComponent = true;
      } else {
        this.summaryComponent = false;
      }
    },
    profilePoints () {
      if (this.profilePoints)
        this.updateRouterQueryGrid("elevationslicing")
      else
        this.removeRouterQueryGrid()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.query && vm.$route.query.grid === "elevationslicing") {
        vm.removeRouterQueryGrid()
        return
      }
      vm.routeUpdate()
      vm.$store.commit('app/currentSetting', vm.$route.query["setting"])
      vm.$store.commit('app/currentGrid', vm.$route.query["grid"])
    })
  },
  mounted () {
    // todo:项目ID
    this.enterProject({
      projectId: "pid002",
      callback: () => {
        // 默认加载风机图层
        this.$refs.layerTree.$refs.dataTree.setCheckedKeys(['turbine'])
      }
    })


  },
  methods: {
    ...mapActions('project', ['enterProject', 'getProjectSummary']),

    routeUpdate () {
      // 路由改变时进行相关设置
      // todo: 新注册的data-panel或setting-panel需要在这里添加进去
      this.settingComponent = this.$route.path === "/index" && this.$route.query && ['terrain', 'towerfall', 'measure', 'plot'].indexOf(this.$route.query.setting) >= 0 && this.$route.query.setting
      this.gridComponent = this.$route.path === "/index" && this.$route.query && ['turbine', 'transLine', "transTower", 'road', 'elevationslicing'].indexOf(this.$route.query.grid) >= 0 && this.$route.query.grid


    },
    //查看縱斷面圖
    onRoadData () {
      if (!this.gridComponent || this.gridComponent != "road") {
        this.updateRouterQueryGrid("road");

      }
    },
    toolbarBtnClicked (type) {
      switch (type) {
        case "summary": // 项目概览
          this.summaryComponent = true
          this.summaryOpen = true
          break
        default:
          this.updateRouterQuerySetting(type)
          break
      }
    },
    showDataGrid (data) {
      this.updateRouterQueryGrid(data.layerId)
    },
    //关闭风机详情框
    closeFanDeatils () {
      this.fanVisible = false;
    },
    //关闭概览
    closeSummary () {
      this.$refs['toolbar'].init()
      this.summaryOpen = false
      this.summaryComponent = false
    },
    gridClose (data) {
      this.removeRouterQueryGrid()
    },
    //详情框弹框数据
    getDetailsTyleData (type, id) {
      // console.log(type, id)
      if (type == "fan") {
        this.getFanData(id);
      }
      else if (type == "line") {
        this.getLineData(id);
      }
      else if (type == "road") {
        this.getRoadData(id);
      }
      else if (type == "tower") {
        this.getTowerData(id);
      }
    },
    getFanData (id) {
      this.turbineInfo = this.$store.state.project.turbineInfo;
      var fanArr = this.turbineInfo.filter((item, index) => {
        return item.id == id
      })
      this.detalisList = fanArr[0] && fanArr[0].properties;
      this.detailsTitle = "风机" + id;
      // console.log(this.detalisList)
    },
    getLineData (id) {
      this.transLineInfo = this.$store.state.project.transLineInfo;
      var lineArr = this.transLineInfo.filter((item, index) => {
        return item.lineID == id;
      })
      this.detalisList = lineArr[0];
      this.detailsTitle = "线路" + id;
      // console.log(this.detalisList)
    },
    getRoadData (id) {
      this.transRoadInfo = this.$store.state.project.roadInfo;
      var roadArr = this.transRoadInfo.filter((item, index) => {
        return item.indexInLayer == id;
      })
      this.detalisList = roadArr[0];
      this.detailsTitle = "道路" + this.detalisList.id;
      // console.log(this.detalisList)
    },
    getTowerData (id) {
      this.transTowerInfo = this.$store.state.project.transTowerInfo;
      var towerArr = this.transTowerInfo.filter((item, index) => {
        return item.uid == id;
      })
      this.detalisList = towerArr[0];
      this.detailsTitle = "塔" + this.detalisList.towerID;
      // console.log(this.detalisList)
    }
  }
}
</script>

<style lang="scss" scoped>
#logoContainer {
  width: 100%;
  height: 55px;

  background: linear-gradient(0deg, rgba(83, 83, 85, 1), rgba(52, 52, 57, 1));
  // border-bottom: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.9;

  #logo-container {
    padding: 14px 0 15px;
    text-align: center;
    user-select: none;
    color: #fff;
    .logo-icon {
      font-size: 21px;
      position: relative;
      top: 3px;
    }
    .logo-text {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
    }
  }
}
#groupContainer1 {
  position: absolute;
  top: 55px;
  bottom: 0px;
  width: 100%;

  background: rgba(74, 74, 82, 1);
  // border: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.85;
  #groupContainer2 {
    position: absolute;
    left: 0;
    right: 45px;
    height: 100%;
    #layerTree {
      width: 100%;
      height: 50%;
    }
    #settingContainer {
      width: 100%;
      height: 50%;
    }
  }
  #toolbarContainer {
    height: 100%;
    width: 45px;
    position: absolute;
    right: 0;

    background: rgba(52, 52, 57, 1);
    border-left: 1px solid rgba(0, 0, 0, 1);
    border-top: 1px solid rgba(0, 0, 0, 1);
    opacity: 0.85;
  }
}
#gridContainer {
  position: fixed;
  left: 315px;
  right: 0;
  bottom: 30px;
  height: 196px;
}
#statusContainer {
  position: fixed;
  left: 315px;
  right: 0;
  bottom: 0;
  height: 30px;
  background: rgba(52, 52, 57, 1);
  border-top: 1px solid rgba(0, 0, 0, 1);
  border-left: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.8;
}
#summaryContainer {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 111;
}
</style>
