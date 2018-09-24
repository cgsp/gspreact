// import axios from 'axios'
// import { goLogin } from '../utils/goLogin'
// import config from './config'
// import store from '../store'
// import * as api from './api'

// const service = axios.create(config)
// service.interceptors.request.use(
//   config => {
//     store.index.changeLoading(true)
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// service.interceptors.response.use(
//   async response => {
//     store.index.changeLoading(false)
//       const {data} = response
//       if (data.code === 302) {
//       const {headers} = response
//       const {location} =   headers
//           // 登陆失效,尚未登陆或者token格式错误，重新进行登陆操作
//           goLogin(location)
//       } else if (
//           (data.code >= 500 || data.status >= 500) &&
//           (data.code < 1000 || data.status < 1000)
//       ) {
//           data.msg = '网络异常'
//       }
//       return { ...response }
//   },
//   error => {
//     store.index.changeLoading(false)
//     return Promise.reject(error)
//   }
// )

// const httpInstance = {
//   get(url, params, config) {
//     return service.get(url, { params, ...config })
//   },
//   post(url, params, config) {
//     return service.post(url, params, config)
//   },
//   put(url, params, config) {
//     return service.put(url, params, config)
//   },
//   delete(url, params, config) {
//     return service.delete(url, { params, ...config })
//   }
// }

// export default api
// export { httpInstance as http }
