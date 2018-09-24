const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')
const path = require('path')
const serverConfig = require('../../build/webpack.config.server')

// 获取客户端实时的模板文件
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// hack的方式，将string转换为module
const Module = module.constructor

// 从内存中读写
const mfs = new MemoryFs
// 实时获取新的打包
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs

// 下面是获取一个实时的bundle
// 全局变量
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  // 将错误信息和警告都打印出来
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warning => console.log(warning))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  // 上面读取的是一个string的内容，不是module
  const m = new Module()
  // 一定要指定文件的名称是，server-entry.js,不然读取不到文件的信息
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

// 对外抛出一个函数
module.exports = function (app) {
  // 将所有的静态的资源都proxy到
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))

  app.get('*', function (req, res) {
    getTemplate()
      .then(template => {
        const content = ReactDomServer.renderToString(serverBundle)
        res.send(template.replace('<!-- app -->', content))
      })
  })
}
