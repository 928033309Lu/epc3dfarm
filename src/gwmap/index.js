import {
  CesiumConfig
} from '@/config/map-config'
import ImageLayerGroup from '@/core/cesium/image-layer-group'
import {
  loadLayerByConfig
} from '@/core/cesium/layer-config-util'
import MapManager from './cesium/map-manager'
import mapStatusBar from './components/map-statusbar'
import dataManager from './cesium/data-manager'
import MapControlManager from './cesium/map-control-manager'
import store from '../store/index'

const gwmap = {}
gwmap.dataManager = dataManager
gwmap.mapControlManager = null

let serviceLayerGroup = null
const layerDist = {}
gwmap.init = function (elementId, options = {}) {
  if (!elementId) {
    return
  }

  gwmap.mapManager = new MapManager(elementId, CesiumConfig)
  gwmap.viewer = gwmap.mapManager.viewer

  // 加载地图状态栏
  document.getElementById(elementId).appendChild(mapStatusBar.element)
  mapStatusBar.init(gwmap.mapManager.viewer)

  gwmap.mapControlManager = new MapControlManager(gwmap.mapManager.viewer, {
    activeChange: () => {},
    // featureSelected: (entity) => {
    //   if (entity && entity.id) {
    //     const data = dataManager.getDataByEntityId(entity.id)
    //   }
    // },
    measureProfileCallback: (positions) => {
      store.commit('app/profilePoints', positions)
    }
  })
  // gwmap.mapControlManager.active('measureProfile')
}
gwmap.loadServiceLayer = function (layerData) {
  if (!layerData || layerDist.hasOwnProperty(layerData.layerId)) return
  if (!serviceLayerGroup) {
    serviceLayerGroup = new ImageLayerGroup(gwmap.mapManager.viewer)
    serviceLayerGroup.bringToBack()
  }

  const layer = loadLayerByConfig(layerData)
  if (!layer) {
    return
  }
  serviceLayerGroup.addLayer(layer)
  layerDist[layerData.layerId] = layer
}
gwmap.removeServiceLayer = function (layerData) {
  if (!layerData || !layerDist.hasOwnProperty(layerData.layerId)) return

  serviceLayerGroup.removeLayer(layerDist[layerData.layerId])
  delete layerDist[layerData.layerId]
}

gwmap.dataManager.featureClicked = (type, id) => {
  // todo:显示要素信息弹框
  // console.log(type, id)
  switch (type) {
    case 'transLine':
      store.commit('app/detailsType', {
        type: 'line',
        id
      })
      break
    case 'transTower':
      store.commit('app/detailsType', {
        type: 'tower',
        id
      })
      break
    case 'turbine':
      store.commit('app/detailsType', {
        type: 'fan',
        id
      })
      break
    default:
      store.commit('app/detailsType', {
        type,
        id
      })
  }
}

export default gwmap
