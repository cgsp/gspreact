const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

if (!isDev) {
  // 如果不是Dev环境，就去硬盘上面读取
  const serverEntry = require('../dist/server-entry').default
  // 同步地读取文件,必须指定是utf8，这样才能是string,不然就是个buffer
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->', appString))
  })
} else {
  // 如果是Dev环境，就去内存里面读取
  const devStatic = require('./utils/dev-static')
  devStatic(app)
}

app.listen(3333, function () {
  console.log('node服务在3333端口')
})
