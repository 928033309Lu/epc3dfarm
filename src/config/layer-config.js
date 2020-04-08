export const LayerConfig = [{
  'layerId': 'turbine',
  'layerName': '风机',
  'layerType': 'geojson',
  showGrid: true
}, {
  'layerId': 'VEC02',
  'layerName': '集电线路',
  'layerType': 'geojson',
  'children': [{
    'layerId': 'transLine',
    'layerName': '导线',
    'layerType': 'geojson',
    showGrid: true
  }, {
    'layerId': 'transTower',
    'layerName': '杆塔',
    'layerType': 'geojson',
    showGrid: true
  }]
}, {
  'layerId': 'road',
  'layerName': '道路',
  'layerType': 'geojson',
  showGrid: true
}, {
  'layerId': 'station',
  'layerName': '升压站',
  'layerType': 'geojson'
}, {
  'layerId': 'resident',
  'layerName': '附近居民区',
  'layerType': 'geojson'
}, {
  'layerId': 'IMG02',
  'layerName': '等高线',
  'layerType': 'service',
  'layerConfig': {
    'url': 'http://{s}.goldwind.com.cn:8008/gf_mapserver/contourmap3d/tianyuan3d',
    'type': 'wms',
    'layers': 'contour',
    'transparent': 'true',
    'format': 'image/png',
    'subdomains': ['gs2', 'gs3', 'gs4', 'gs5']
  },
  'styleConfig': {
    'styleType': 'default',
    'opacity': 100
  }
}, {
  'layerId': 'IMG03',
  'layerName': '地图注记',
  'layerType': 'service',
  'layerConfig': {
    type: 'Inner',
    category: 'Annotion',
    url: 'TianDiTuWMTS.Normal.Annotion',
    options: {
      token: '2d02a4bf00cfa355abc3f7f7850dfcc7'
    }
  }
}]
