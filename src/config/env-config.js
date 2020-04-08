const envConfig = {
  appNodeEnv: process.env.NODE_ENV,
  appVersion: process.env.APP_VERSION,
  appBuildTime: process.env.APP_BUILD_TIME,
  appTitle: process.env.APP_TITLE,
  // staticUrl: process.env.STATIC_URL,
  // apiBaseUrl: process.env.BASE_API,
  staticModelsUrl: process.env.STATIC_MODELS_URL,
  apiBaseUrlMap: process.env.VUE_APP_API_MAP,
  apiBaseUrlElevation: process.env.VUE_APP_API_ELELVATION,
  devMode: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development' // 是否处于开发模式
}

// 获取图标、模型库文件地址
envConfig.getStaticAssetsUrl = function (fileUrl) {
  fileUrl = fileUrl || ''
  return envConfig.staticUrl + '/' + fileUrl
}
export default envConfig
