/*
 * @Author: John.Guan 
 * @Date: 2018-08-18 22:25:46 
 * @Last Modified by: John.Guan
 * @Last Modified time: 2018-09-24 22:44:28
 */
import { myAxios } from '@Utils/myAxios'
import { defaultHeader } from './config'

// 获取导航和按钮权限功能
export const apiGetNavList = () => {
  return myAxios({
    url: '/user/auth',
    method: 'get',
    headers: defaultHeader
  })
}

// 获取公用的小分类的接口
export const commonSmallTypes = (source) => {
  return myAxios(
    {
      url: '/category/queryCategories',
      method: 'get',
      params: { source },
      data: {},
      headers: defaultHeader
    })
}

// 获取公用的维度的接口
export const commonDimesions = () => {
  return myAxios(
    {
      url: '/dimension/queryAllDimensions',
      method: 'get',
      params: {},
      data: {},
      headers: defaultHeader
    })
}

// 获取公用的维度和标签的接口
export const commonDimesionsAndTags = () => {
  return myAxios(
    {
      url: '/dimension/allDimensionsWithTags',
      method: 'get',
      params: {},
      data: {},
      headers: defaultHeader
    })
}
