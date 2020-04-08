import envConfig from '@/config/env-config'

const defaultHighLightColor = '#00fffc'
const transLineColor = '#0096ff'

const dataManager = {}

let turbineModule = null
let towerLineModule = null
let roadLineModule = null
let stationLayer = null
let residentLayer = null
let currentHighlightModel = null // 当前高亮数据 {type,id}

dataManager.featureClicked = null // 要素点击选中回调函数

// 将选中数据设为高亮
dataManager.setFeatureHighLight = function (type, id, highlight = true) {
  dataManager.clearHighLight()
  id = String(id)
  switch (type) {
    case 'turbine':
      turbineModule && turbineModule.setModelHighLight(id, highlight)
      break
    case 'transLine':
      towerLineModule && towerLineModule.setLineHighLight(id, highlight)
      break
    case 'transTower':
      towerLineModule && towerLineModule.setTowerHighLight(id, highlight)
      break
    case 'road':
      roadLineModule && roadLineModule.setLineHighLight(id, highlight)
      break
    case 'station':
      // todo:待完善
      break
  }
  if (highlight) {
    currentHighlightModel = {
      type,
      id
    }
  }
}
// 清空高亮样式
dataManager.clearHighLight = function () {
  if (!currentHighlightModel) return
  const id = currentHighlightModel.id
  const type = currentHighlightModel.type
  currentHighlightModel = null
  dataManager.setFeatureHighLight(type, id, false)
}

// 缩放到指定图层
dataManager.locat2Layer = function (type) {
  switch (type) {
    case 'turbine':
      turbineModule && turbineModule.layerLocation()
      break
    case 'transLine':
    case 'transTower':
      towerLineModule && towerLineModule.layerLocation()
      break
    case 'road':
      roadLineModule && roadLineModule.layerLocation()
      break
    case 'station':
      stationLayer && stationLayer.modelLocation()
      break
    case 'resident':
      if (residentLayer && residentLayer.entities && residentLayer.entities.values && residentLayer.entities.values.length !== 0) {
        gwmap.viewer.flyTo(residentLayer.entities)
      }
      break
  }
}

// 缩放到指定要素
// ids 要素数据id数组 如“['1','2']”
dataManager.locat2FeatureByIds = function (type, ids) {
  switch (type) {
    case 'turbine':
      turbineModule && turbineModule.modelLocation(ids)
      break
    case 'transLine':
      towerLineModule && towerLineModule.linesLocation(ids)
      break
    case 'transTower':
      towerLineModule && towerLineModule.towerLocation(ids)
      break
    case 'road':
      roadLineModule && roadLineModule.linesLocation(ids)
      break
    case 'station':
      // todo:待完善
      break
  }
}

// 是否已经加载了 风机
dataManager.turbineLoaded = function () {
  return turbineModule !== null
}
// 添加风机
dataManager.addTurbines = function (turbines) {
  if (!turbines) return
  if (!turbineModule) {
    turbineModule = new WindEarth.ModelWithLabelModule(gwmap.viewer)
    turbineModule.highLightColor = defaultHighLightColor
    turbineModule.modelClickChanged.addEventListener(function (event) {
      if (!event.feature) return
      currentHighlightModel = {
        type: 'turbine',
        id: event.feature[0]
      }
      if (dataManager.featureClicked) {
        dataManager.featureClicked('turbine', event.feature[0])
      }
    }, this)
  }
  dataManager.removeTurbines()
  // todo:修改风机模型默配置
  turbines.forEach((item) => {
    turbineModule.loadModelwithLabel({
      id: item.id,
      name: item.id,
      positions: item.coordinate,
      url: '/static/models/turbine25.glb'
    })
  })
  turbineModule.layerLocation()
}
// 显示或隐藏 风机
dataManager.showHideTurbines = function (visible) {
  turbineModule && turbineModule.setModelVisible(visible)
}
// 移除风机图层
dataManager.removeTurbines = function () {
  turbineModule && turbineModule.removeAll(false)
}

// 是否已经加载了 集电线路
dataManager.transLineLoaded = function () {
  return towerLineModule !== null
}
// 添加集电线路 导线 杆塔
dataManager.addTransLineTower = function (data) {
  if (!data) return
  if (!towerLineModule) {
    towerLineModule = new WindEarth.CollectLineModule(gwmap.viewer, envConfig.staticModelsUrl)
    towerLineModule.highLightColor = defaultHighLightColor
    towerLineModule.defaultLineColor = transLineColor
    towerLineModule.lineClickChanged.addEventListener(function (event) {
      if (!event.feature) return
      currentHighlightModel = {
        type: 'transLine',
        id: event.feature[0]
      }
      if (dataManager.featureClicked) {
        dataManager.featureClicked('transLine', event.feature[0])
      }
    }, this)
    towerLineModule.towerClickChanged.addEventListener(function (event) {
      if (!event.feature) return
      currentHighlightModel = {
        type: 'transTower',
        id: event.feature[0]
      }
      if (dataManager.featureClicked) {
        dataManager.featureClicked('transTower', event.feature[0])
      }
    }, this)
  }
  dataManager.removeTransLineTower()
  towerLineModule.parseJsonData(data)
  // towerLineModule.layerLocation()
}
// 显示或隐藏 集电线路 导线
dataManager.showHideTransLine = function (visible) {
  towerLineModule && towerLineModule.setLineVisible(visible)
}
// 显示或隐藏 集电线路 杆塔
dataManager.showHideTransTower = function (visible) {
  towerLineModule && towerLineModule.setTowerVisible(visible)
}
// 移除集电线路 导线 杆塔
dataManager.removeTransLineTower = function () {
  towerLineModule && towerLineModule.removeAll()
}

// 是否已经加载了 道路
dataManager.roadLoaded = function () {
  return roadLineModule !== null
}
// 添加道路
dataManager.addRoad = function (data) {
  if (!data) return
  if (!roadLineModule) {
    roadLineModule = new WindEarth.RoadLineModule(gwmap.viewer)
    roadLineModule.highLightColor = defaultHighLightColor
    roadLineModule.lineClickChanged.addEventListener(function (event) {
      if (!event.feature) return
      currentHighlightModel = {
        type: 'road',
        id: event.feature[0]
      }
      if (dataManager.featureClicked) {
        dataManager.featureClicked('road', event.feature[0])
      }
    }, this)
  }
  dataManager.removeRoad()
  roadLineModule.parseJsonData(data)
  // roadLineModule.layerLocation()
}
// 显示或隐藏 道路
dataManager.showHideRoad = function (visible) {
  roadLineModule && roadLineModule.setLineVisible(visible)
}
// 移除道路
dataManager.removeRoad = function () {
  roadLineModule && roadLineModule.removeAll(false)
}

// 是否已经加载了 升压站
dataManager.stationLoaded = function () {
  return stationLayer !== null
}
// 添加升压站
dataManager.addStation = function (data) {
  if (!data) return
  if (!stationLayer) {
    stationLayer = new WindEarth.BimModelLayer(gwmap.viewer)
    // roadLineModule.lineClickChanged.addEventListener(function (event) {
    //   if (!event.feature) return
    //   currentHighlightModel = {
    //     type: 'road',
    //     id: event.feature[0]
    //   }
    //   if (dataManager.featureClicked) {
    //     dataManager.featureClicked('road', event.feature[0])
    //   }
    // }, this)
  }
  dataManager.removeStation()

  data.forEach(station => {
    if (!station || !station.properties || !station.properties.bim) return
    station.properties.bim.forEach(item => {
      stationLayer.addBimModel(item.position, {
        url: item.url
      })
    })
  })
}
// 显示或隐藏 升压站
dataManager.showHideStation = function (visible) {
  stationLayer && stationLayer.setModelVisible(visible)
}
// 移除升压站
dataManager.removeStation = function () {
  stationLayer && stationLayer.removeAll()
}
// 添加居民地
dataManager.addResident = function (geojson) {
  if (!geojson || !geojson.features) return
  if (!residentLayer) {
    residentLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
      id: 'resident',
      name: 'resident'
    })
  }
  geojson.features.forEach(item => {
    const polygon = new WindEarth.PolygonFeatureEntity({
      positions: item.geometry.coordinates[0],
      // todo:根据需要修改样式
      styleOptions: {
        color: '#fff172',
        outline: true,
        lineStyle: {
          color: '#ff3ca4',
          width: 1.0
        }
      }
    })
    residentLayer.addFeatureEntity(polygon)
  })
  // if (residentLayer.entities && residentLayer.entities.values && residentLayer.entities.values.length !== 0) {
  //   gwmap.viewer.flyTo(residentLayer.entities)
  // }
}
// 移除居民地
dataManager.removeResident = function () {
  residentLayer.removeAll()
}

export default dataManager

// function getTurbineOptions (data) {
//   if (!data) return null
//   return {
//     id: getRealTurbineID(data.id),
//     positions: data.coordinate,
//     orientation: {
//       head: -126.7162057787475,
//       tilt: 0,
//       roll: 0
//     },
//     styleOptions: {
//       url: '/static/models/turbine25.glb',
//       scale: 1.0
//     }
//   }
// }

// function getRealTurbineID (id) {
//   return getRealID('t_', id)
// }

// /**
//  * 由于不同类型的数据中id可能重复，所以添加统一的前缀
//  * @param {*} type 每个数据类型一个单独的前缀
//  * @param {*} id 文件中数据ID
//  */
// function getRealID (type, id) {
//   return 'epc_' + type + id
// }
