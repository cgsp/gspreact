const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base')

const isDev = process.env.NODE_ENV === 'development'

// 合并webpack配置
const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash:10].js',
  },
  plugins: [
    // 会以template.html为模板，生成html文件，然后插入app.js
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    // 为了让服务端获取客户端的stores里面的state使用
    new HTMLPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ]
})

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    // 以哪些静态资源，来启动服务
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    // 黑色的错误信息遮罩
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': {
        // target: STR, // 接口的域名
        target: 'http://localhost:3333', // 接口的域名
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // pathRewrite: {
        //   '^/api': ''
        //   // '^/api': '/api'
        // }
      }
    },
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
