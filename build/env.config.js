/**
 * 所有环境公用的基础配置
 */
const publicConfig = {
  APP_TITLE: '"EPC三维风电场"',
  APP_VERSION: `'${require('../package.json').version}'`,
  APP_BUILD_TIME: `'${require('dayjs')().format('YYYYMMDD')}'`,
  // BASE_API: '"http://10.12.3.135:7096"', // 后端服务地址
  // STATIC_URL: '"http://10.12.3.135:7096/static"', // 静态数据地址
  STATIC_MODELS_URL: '"/models"', // 三维模型文件地址
  VUE_APP_API_MAP: '"http://1.202.243.97:8008"', // （姜云鹏）数据功能模块服务地址
  VUE_APP_API_ELELVATION: '"http://10.35.191.98:5000"', // （姜云鹏）高程服务地址
};
const merge = function (env) {
  return Object.assign({}, publicConfig, env)
}
/**
 * 
 * 系统环境变量配置
 * 在/src/config/env-config.js中有对应的信息
 */
const envConfig = {
  "local": merge({
    NODE_ENV: '"local"',
  }),
  "development": merge({
    NODE_ENV: '"development"',
  }),
  "production": merge({
    NODE_ENV: '"production"',
  })
}

module.exports = envConfig