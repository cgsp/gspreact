const router = require('express').Router()
const axios = require('axios')

// cnode网站，公用的URL片段
// 这个现在改为https了
const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', function (req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accessToken //之前登录时候成功时候，存放的accessToken
  })
    .then(resp => {
      // {success: true, loginname: req.user.loginname, id: req.user.id, avatar_url: req.user.avatar_url}
      if (resp.status === 200 && resp.data.success) {
        // 请求成功的话，就在请求的客户端的电脑的session上面存放信息
        req.session.user = {
          accessToken: req.body.accessToken,
          loginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        // 如果接口正确，就返回客户端数据
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        // 接口报错，业务逻辑错误，非服务器报错
        res.json({
          success: false,
          data: err.response.data
        })
      } else {
        // 将错误，抛给全局的错误处理器
        next(err)
      }
    })
})

module.exports = router
