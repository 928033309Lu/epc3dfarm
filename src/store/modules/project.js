import request from '@/api'
export default {
  namespaced: true,
  state: {
    currentProjectId: null,
    projectInfo: null,
    projectSummary: null,
    turbineInfo: null,
    transLineInfo: null,
    transTowerInfo: null,
    roadInfo: null,
    roadGeoInfo: null,
    roadCrossSectionInfo: null,
    stationInfo: null,
    residentInfo: null
  },
  getters: {},
  actions: {
    enterProject ({
      commit,
      state
    }, {
      projectId,
      callback
    }) {
      // ID相同直接返回
      if (!projectId || projectId === state.currentProjectId) {
        callback({
          code: 0
        })
        return
      }

      // 清空项目缓存信息 todo:根据需要 进行完善
      commit('currentProjectId', projectId)
      commit('projectInfo', null)
      commit('projectSummary', null)
      commit('turbineInfo', null)
      commit('transLineInfo', null)
      commit('transTowerInfo', null)
      commit('roadInfo', null)
      commit('roadGeoInfo', null)
      commit('roadCrossSectionInfo', null)
      commit('stationInfo', null)
      commit('residentInfo', null)

      // 请求项目信息
      request.getProjectInfo(projectId, (res) => {
        if (!res || !res.success) {
          callback({
            code: -1,
            message: '获取项目信息出错。' + res.message
          })
          return
        }

        commit('projectInfo', res.data)
        callback({
          code: 1
        })
      })
    },
    getProjectSummary ({
      commit,
      state
    }, {
      callback
    }) {
      getProjectData({
        commit,
        state
      }, {
        callback
      }, 'projectSummary', 'getProjectSummary')
    },
    getTurbineInfo ({
      commit,
      state
    }, {
      callback
    }) {
      getProjectData({
        commit,
        state
      }, {
        callback
      }, 'turbineInfo', 'getTurbineInfo')
    },
    getTransLineInfo ({
      commit,
      state
    }, {
      callback
    }) {
      getProjectData({
        commit,
        state
      }, {
        callback
      }, 'transLineInfo', 'getTransLineInfo')
    },
    getTransTowerInfo ({
      commit,
      state
    }, {
      callback
    }) {
      getProjectData({
        commit,
        state
      }, {
        callback
      }, 'transTowerInfo', 'getTransTowerInfo')
    },
    getRoadInfo ({
      commit,
      state
    }, {
      callback
    }) {
      getProjectData({
        commit,
        state
      }, {
        callback
      }, 'roadInfo', 'getRoadInfo')
    },
    getRoadGeoInfo ({
      commit,
      state
    }, {
      callback
    }) {
      getProjectData({
        commit,
        state
      }, {
        callback
      }, 'roadGeoInfo', 'getRoadGeoInfo')
    },
    getRoadCrossSectionInfo ({
      commit,
      state
    }, {
      callback
    }) {
      getProjectData({
        commit,
        state
      }, {
        callback
      }, 'roadCrossSectionInfo', 'getRoadCrossSectionInfo')
    },
    getStationInfo ({
      commit,
      state
    }, {
      callback
    }) {
      getProjectData({
        commit,
        state
      }, {
        callback
      }, 'stationInfo', 'getStationInfo')
    },
    getResidentInfo ({
      commit,
      state
    }, {
      callback
    }) {
      getProjectData({
        commit,
        state
      }, {
        callback
      }, 'residentInfo', 'getResidentInfo')
    },
    getDataById ({
      commit,
      state
    }, {
      type,
      id,
      callback
    }) {
      // todo:完善获取要素数据
      let data = null
      switch (type) {
        case 'transLine':
          if (state.transLineInfo) {
            data = state.transLineInfo.find(item => {
              return item.lineID === id
            })
          }
          break
        case 'transTower':
          if (state.transTowerInfo) {
            data = state.transTowerInfo.find(item => {
              return item.uid === id
            })
          }
          break
        case 'road':
          if (state.roadInfo) {
            data = state.roadInfo.find(item => {
              return item.id === id
            })
          }
          break
        case 'turbine':
          break
        case 'station':
          break
      }
      callback && callback(data)
    }
  },
  mutations: {
    currentProjectId (state, data) {
      state.currentProjectId = data
    },
    projectInfo (state, data) {
      state.projectInfo = data
    },
    projectSummary (state, data) {
      state.projectSummary = data
    },
    turbineInfo (state, data) {
      state.turbineInfo = data
    },
    transLineInfo (state, data) {
      state.transLineInfo = data
    },
    transTowerInfo (state, data) {
      state.transTowerInfo = data
    },
    roadInfo (state, data) {
      state.roadInfo = data
    },
    roadGeoInfo (state, data) {
      state.roadGeoInfo = data
    },
    roadCrossSectionInfo (state, data) {
      state.roadCrossSectionInfo = data
    },
    stationInfo (state, data) {
      state.stationInfo = data
    },
    residentInfo (state, data) {
      state.residentInfo = data
    }

  }
}

function getProjectData ({
  commit,
  state
}, {
  callback
}, dataFiled, requestMethod) {
  if (!state.currentProjectId) {
    callback({
      success: false,
      message: '当前项目不能为空。'
    })
    return
  }
  // 已存在则直接使用缓存信息
  if (state[dataFiled]) {
    callback({
      success: true,
      data: state[dataFiled]
    })
    return
  }

  // 清空缓存并请求数据
  commit(dataFiled, null)
  request[requestMethod](state.currentProjectId, (res) => {
    if (!res || !res.success) {
      callback({
        success: false,
        message: res.message
      })
      return
    }

    commit(dataFiled, res.data)
    callback({
      success: true,
      data: state[dataFiled]
    })
  })
}
