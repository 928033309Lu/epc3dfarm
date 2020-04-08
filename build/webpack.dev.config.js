'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const vendorsUtil = require('./vendors.util')

module.exports = (env) => {
  vendorsUtil.copyLibrary2Vendors()
  return merge(baseWebpackConfig(env), {
    // cheap-module-eval-source-map is faster for development
    devtool: 'cheap-module-eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([{
        from: '../public',
        to: ''
      }])
    ],
    // these devServer options should be customized in /config/index.js
    devServer: {
      contentBase: path.join(__dirname, "public"),
      clientLogLevel: 'warning',
      historyApiFallback: true,
      hot: true,
      // host: HOST,
      // port: PORT,
      open: false,
      overlay: {
        warnings: false,
        errors: true
      },
      proxy: {
        // 引用开发环境的 WindEarth 地址
        '/vendors': {
          ws: false,
          target: "http://52.83.252.242:7000/V1.1",
          changeOrigin: true,
          pathRewrite: {
            "^/vendors": ""
          }
        },
        '/models': {
          ws: false,
          target: "http://52.83.252.242:7000/static",
          changeOrigin: true,
          pathRewrite: {
            "^/models": ""
          }
        }
      },
      watchOptions: {
        poll: false
      }
    }
  })
};