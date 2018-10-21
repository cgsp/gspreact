const serialize = require('serialize-javascript')
const ejs = require('ejs')
const asyncBootstrap = require('react-async-bootstrapper').default
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

// 获取store里面的state
const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default

    const routerContext = {}
    const stores = createStoreMap()

    const app = createApp(stores, routerContext, req.url)

    asyncBootstrap(app).then(() => {
      // 如果前端的代码里面，有redirect这个属性
      // <Route path="/" render={() => <Redirect to="/topic-list" />} exact key="/" />
      // 那么routerContext里面会自动带上，一个url属性
      // 那么我们就在服务端渲染的时候，直接redirect掉
      if (routerContext.url) {
        // 重定向
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      // SEO
      const helmet = Helmet.rewind()
      // 获取客户端的sotres的state值
      const state = getStoreState(stores)

      const content = ReactDomServer.renderToString(app)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
      })

      res.send(html)

      resolve()
      // res.send(template.replace('<!-- app -->', content))
    })
      .catch(reject)
  })
}
