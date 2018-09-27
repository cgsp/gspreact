// import http from 'http'
// import https from 'https'
// export default {
//     // baseURL,
//   // 自定义的请求头
//   // headers: {
//   //   'X-Requested-With': 'XMLHttpRequest'
//   // },
//   // 超时设置
//   timeout: 15000,
//   // 跨域是否带Token
//   withCredentials: true,
//   // 响应的数据格式 json / blob /document /arraybuffer / text / stream
//   responseType: 'json',
//   // 最多转发数，用于node.js
//   maxRedirects: 5,
//   // 最大响应数据大小
//   maxContentLength: 2000,
//   // 用于node.js
//   httpAgent: new http.Agent({
//     keepAlive: true
//   }),
//   httpsAgent: new https.Agent({
//     keepAlive: true
//   })
// }
import { myLocalStorageGet } from '@Utils/myStorages'

const DEV = process.env.NODE_ENV !== 'production'
let DEFAULT_HEADER
if (DEV) {
  DEFAULT_HEADER = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Index-Url': 'http://localhost:3000'
  }
} else {
  DEFAULT_HEADER = {
    'Content-Type': 'application/json;charset=UTF-8'
  }
}

const TOKEN_HEADER = {
  'Content-Type': 'application/json;charset=UTF-8',
  Authorization: myLocalStorageGet('token', '')
}

export {
  DEFAULT_HEADER,
  TOKEN_HEADER
}

