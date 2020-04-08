const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  return merge(baseWebpackConfig(env), {
    devtool: false,
    plugins: [
      new CopyWebpackPlugin([{
        from: '../public',
        ignore: [
          // // 过滤文件名称中包含-template.html字符的文件，目的是发布时不包含/public/templates/目录   
          // '*-template.html',
          //发布时不包含指定目录   
          'templates/**',
          'vendors-dev/**',
        ],
        to: ''
      }]),
    ],
  })
}