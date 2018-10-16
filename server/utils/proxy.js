const axios = require('axios')
const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  // || {} 防止报错
  const user = req.session.user || {}
  // 是否需要token
  const needAccessToken = req.query.needAccessToken

  // 如果needAccessToken等于true, 证明需要token，
  // 但是我们的客户端的，session里面的user，里面没token，就证明客户端需要登录了
  if (needAccessToken && !user.accessToken) {
    res.status(401)
      .send({
        success: false,
        msg: '需要登录'
      })
  }

  const query = Object.assign({}, req.query)

  if (query.needAccessToken) delete query.needAccessToken

  // 将请求发向cnode的服务端
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    // 即使这个接口，不需要accesstoken, 加上也没关系
    data: Object.assign({}, req.body, {
      accesstoken: user.accessToken
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencode'
    }
  })
    // nodejs做中间代理的话，怎么写
    .then(resp => {
      if (resp.status === 200) {
        res.send(resp.data)
      } else {
        res.status(resp.status).send(resp.data)
      }
    })
    .catch(err => {
      if (err.response) {
        res.status(500).send(err.response.data)
      } else {
        res.status(500).send({
          success: false,
          msg: '未知错误'
        })
      }
    })
}
