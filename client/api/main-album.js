import { myAxios } from '@Utils/myAxios'
import { defaultHeader } from './config'


// 获取列表数据
export const apiMainAlbumList = (options) => {
  return myAxios(
    {
      url: '/openapi/albums/search',
      method: 'get',
      params: options,
      data: {},
      headers: defaultHeader
    })
}


// 获取详情的列表数据
export const apiMainAlbumDetail = (options) => {
  return myAxios(
    {
      url: '/openapi/tracks/forAlbum',
      method: 'get',
      params: options,
      data: {},
      headers: defaultHeader
    })
}

// 打标签
export const apiMainAlbumMakeTag = (options) => {
  let method
  if (options.type === '批量') {
    method = 'post'
  } else {
    method = 'put'
  }
  delete options.type
  return myAxios(
    {
      url: '/openapi/albums/tags',
      method,
      params: {},
      data: options,
      headers: defaultHeader
    })
}

// 获取主站专辑数据
export const apiAlbumGetMain = (sourceId) => {
  return myAxios(
    {
      url: '/openapi/albums/album',
      method: 'get',
      params: { albumId: sourceId },
      data: {},
      headers: defaultHeader
    })
}

// 获取主播
export const apiAlbumGetMainPeople = (sourceId) => {
  return myAxios(
    {
      url: '/openapi/albums/uname',
      method: 'get',
      params: { albumId: sourceId },
      data: {},
      headers: defaultHeader
    })
}

// 新增或者编辑自运营听单
export const apiMainAlbumAddOrEdit = (options) => {
  const url = '/custom/albums/album'
  let method
  if (options.type === '另存为自运营专辑') {
    method = 'post'
  } else {
    method = 'put'
  }
  return myAxios(
    {
      url,
      method,
      params: {},
      data: options,
      headers: defaultHeader,
      emptyString: true
    })
}

