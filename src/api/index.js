import axios from 'axios'
import envConfig from '@/config/env-config'
// import request from './request/api-request'
import requestGIS from './request/gis-request'
import {
  apisConfig
} from '@/config/api-config'

const service = {}
// /**
//  * 请求后端提供的API
//  */
// service.api = function (apiName, data, callback) {
//   return $J.requestUtil.requestService({
//     request,
//     apisConfig,
//     apiName,
//     data,
//     callback
//   })
// }
// /**
//  * 请求后端提供的API，url中包含动态参数
//  */
// service.dynamic = function (apiName, apiUrlParams, data, callback) {
//   return $J.requestUtil.requestService({
//     request,
//     apisConfig,
//     apiName,
//     apiUrlParams,
//     data,
//     callback
//   })
// }
/**
 * 请求地图处理相关API
 */
service.map = function (apiName, apiUrlParams, callback) {
  return $J.requestUtil.requestService({
    request: requestGIS,
    apisConfig,
    apiRootUrl: envConfig.apiBaseUrlMap,
    apiName,
    apiUrlParams,
    callback
  })
}

/**
 * 非后端api服务接口get请求
 * @param {*} url
 * @param {*} callback
 */
service.static = function (url, callback) {
  const promise = axios.get(url)
  promise.then(function (response) {
    if (response.data) {
      callback && callback($J.createRequestResult(true, '', response.data))
    } else {
      callback && callback($J.createRequestResult(false, 'status = ' + response.status))
    }
  })
    .catch(function (error) {
      callback && callback($J.createRequestResult(false, error.message))
    })
  return promise
}

/**
 * 获取点位高程信息
 * @param {Number} lon 经度
 * @param {Number} lat 纬度
 * @param {Function} callback
 */
service.getElevation = function (lon, lat, callback) {
  return $J.requestUtil.requestService({
    request: requestGIS,
    apisConfig,
    apiRootUrl: envConfig.apiBaseUrlElevation,
    apiName: 'getElevation',
    apiUrlParams: [lon, lat],
    callback
  })
}

// todo: 数据文件名称和位置 根据实际进行修改
// 获取项目信息
service.getProjectInfo = function (projectId, callback) {
  return service.static(`./projectdata/${projectId}/project_info.json`, callback)
}
// 获取项目概述信息
service.getProjectSummary = function (projectId, callback) {
  return service.static(`./projectdata/${projectId}/project_summary.json`, callback)
}
// 获取项目数据
service.getProjectData = function (projectId, dataType, callback) {
  return service.static(`./projectdata/${projectId}/${dataType}_info.json`, callback)
}
// 获取风机信息
service.getTurbineInfo = function (projectId, callback) {
  return service.getProjectData(projectId, 'turbine', callback)
}
// 获取集电线路 线路信息
service.getTransLineInfo = function (projectId, callback) {
  return service.getProjectData(projectId, 'transLine', callback)
}
// 获取集电线路 杆塔信息
service.getTransTowerInfo = function (projectId, callback) {
  return service.getProjectData(projectId, 'transTower', callback)
}
// 获取道路信息
service.getRoadInfo = function (projectId, callback) {
  return service.getProjectData(projectId, 'road', callback)
}
// 获取道路geojson
service.getRoadGeoInfo = function (projectId, callback) {
  return service.getProjectData(projectId, 'roadGeo', callback)
}
// 获取道路roadCross
service.getRoadCrossSectionInfo = function (projectId, callback) {
  return service.getProjectData(projectId, 'roadCrossSection', callback)
}
// 获取升压站信息
service.getStationInfo = function (projectId, callback) {
  return service.getProjectData(projectId, 'station', callback)
}
// 获取居民地geojson
service.getResidentInfo = function (projectId, callback) {
  return service.getProjectData(projectId, 'resident', callback)
}
export default service
