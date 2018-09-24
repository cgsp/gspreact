/*
 * @Author: John.Guan
 * @Date: 2018-07-24 15:01:37
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-09-24 22:49:10
 */
import axios from 'axios'
import qs from 'qs'
import { myLocalStorageGet, mySessionStorageClear } from '@Utils/myStorages'
import { BASEURL, noLoginCode, noAuthCode } from '@Constants'
// import { message } from 'antd'
// import { Toast } from 'antd-mobile'

const DEV = process.env.NODE_ENV !== 'production'
// console.log(process.env.NODE_ENV)
let baseURL
if (DEV) {
  baseURL = BASEURL.dev
} else {
  baseURL = BASEURL.pro
}
/*
 * 全局baseURL的设置
 */
axios.defaults.baseURL = baseURL

/*
 * 全局拦截器的设置
 */
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // Toast.loading('加载中', 0, null, true);
  // console.log('请求成功拦截器:', config);
  return config
}, (error) => {
  // 对请求错误做些什么
  // Toast.fail('请求失败', 0, null, true);
  // setTimeout(() => {
  //   Toast.hide();
  // }, 600);
  // console.log('请求失败拦截器:', error);
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  // Toast.hide();
  // console.log('响应成功拦截器:', response)

  if (response && response.data && response.data.code === noLoginCode) {
    // const str = JSON.stringify(response.data)
    // alert('后端给前端399了,具体信息是-------' + str)
    mySessionStorageClear()
    window.location = response.data.data
  }
  else if (response && response.data && response.data.code === noAuthCode) {
    // const str = JSON.stringify(response.data)
    // alert('后端给前端377了,具体信息是-------' + str)
    mySessionStorageClear()
    return response
  }
  else {
    return response
  }

}, (error) => {
  // 对响应错误做点什么
  // console.log('响应失败拦截器:', error);
  return Promise.reject(error)
})



/*
 * 1、token设置--下面这样设置，好像第一次请求，没办法带上token；
 * 解决办法是：在每个axios上面都写一遍，就可以带上，所以在这个地方写，没什么用
 * axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN_gsp';
 *
 * 2、跨域的时候，允许服务端设置cookies
 * axios.defaults.withCredentials = true;
 *
 * 3、下面这样写，没什么鸟用，还是得用qs这个库
 * axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 */

// 2、跨域的时候，允许服务端设置cookies
axios.defaults.withCredentials = true


/*
* 封装axios
*/
function myAxios(options) {
  const method = options.method || 'get'

  const url = options.url || ''

  // const time = Date.now()
  // const params = { ...{ _: time }, ...options.params }
  const params = { ...{}, ...options.params }

  if (options.emptyString) {
    for (const key in params) {
      if (params[key] === null || params[key] === undefined) {
        delete params[key]
      }
    }
  } else {
    for (const key in params) {
      if (params[key] === null || params[key] === '' || params[key] === undefined) {
        delete params[key]
      }
    }
  }


  const headers = options.headers || {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // 'Content-Type': 'application/json;charset=UTF-8',
    Authorization: myLocalStorageGet('token', ''),
  }

  let data

  const optionsData = options.data



  if (options.emptyString) {
    for (const key in optionsData) {
      if (optionsData[key] === null || optionsData[key] === undefined) {
        delete optionsData[key]
      }
    }
  } else {
    for (const key in optionsData) {
      if (optionsData[key] === null || optionsData[key] === '' || optionsData[key] === undefined) {
        delete optionsData[key]
      }
    }
  }


  if (method === 'get' || method === 'delete' || method === 'head') {
    data = null
  } else if (method === 'post' || method === 'put' || method === 'patch' && headers['Content-Type'] === 'application/json;charset=UTF-8') {
    data = optionsData || {}

  } else if (method === 'post' || method === 'put' || method === 'patch' && headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
    data = qs.stringify(optionsData) || qs.stringify({})
  }



  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data,
      params,
      headers,
    }).then((res) => {
      resolve(res.data)
      // debugger;
      // if (res.data.code === ERR_OK) {
      //   resolve(res.data.data)
      // } else {
      //   console.error(res.data.msg)
      //   message.error(res.data.msg)
      // }
    })
      .catch(err => reject(err))
  })
}

export { myAxios }


/*
 * header的几种设置
 */
// 1、如果header只想带Content-Type，不想带token或者Authorization的话，这么设置
// headers={
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// }
// 或者
// headers={
//   'Content-Type': 'application/json;charset=UTF-8'
// }



/*
 * 使用示范
 */
// myAxios({
//   url: 'ddw-exchange-show/item-data',
//   method: 'get',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//     // // 'Content-Type': 'application/json;charset=UTF-8',
//     // Authorization: myLocalStorageGet('token', ''),
//     Token: '1wvd1QFHvSySrfuOvCfTkTmMnCJCsh7QwfBCugZQvC7LnwzTwDeT3t4CosZczCBottjivPePysIVuwritd4AuD4i1tBcodBrmuBymwmTqPB9tA4Png3Zpq==',
//   },
//   data: {
//     sex: 'man',
//     chang: 'guan',
//   },
//   params: {
//     dimension: 'month',
//     name: '总计',
//     month: '2018-07',
//   },
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((res) => {

//   })

