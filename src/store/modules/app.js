export default {
  namespaced: true,
  state: {
    screenSize: [0, 0], // 当前页面区域宽度、高度
    currentMapControl: null, // 当前激活的地图操作控件
    currentSetting: null, // 当前激活的设置面板
    currentGrid: null, // 当前激活的设置面板
    globeLoading: false, // 全局loading
    detailsType: null, // 详情框
    profilePoints: null // 剖面分析数据
  },
  actions: {

  },
  mutations: {
    screenSize (state, screenSize) {
      state.screenSize = screenSize
    },
    currentMapControl (state, currentMapControl) {
      state.currentMapControl = currentMapControl
    },
    globeLoading (state, loading) {
      state.globeLoading = loading
    },
    detailsType (state, detailsType) {
      state.detailsType = {}
      state.detailsType = detailsType
    },
    profilePoints (state, profilePoints) {
      state.profilePoints = profilePoints
    },
    currentSetting (state, currentSetting) {
      state.currentSetting = currentSetting
    },
    currentGrid (state, currentGrid) {
      state.currentGrid = currentGrid
    }
  }

}
