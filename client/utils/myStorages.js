// https://github.com/ustbhuangyi/storage

import storage from 'good-storage'

/*   myLocalStorage的操作  */
// 设置
const myLocalStorageSet = (key, val) => {
  storage.set(key, val)
}
// 获取, 获取不到的话，默认值是defaultVal
const myLocalStorageGet = (key, defaultVal) => {
  return storage.get(key, defaultVal)
}
// 删除
const myLocalStorageRemove = (key) => {
  storage.remove(key)
}
// 判断是否有
const myLocalStorageHas = (key) => {
  return storage.has(key)
}
// 清空所有的存储
const myLocalStorageClear = () => {
  storage.clear()
}
// 获取所有的
const myLocalStorageGetAll = () => {
  return storage.getAll()
}

/*   mysessionStorage的操作  */
// 设置
const mySessionStorageSet = (key, val) => {
  storage.session.set(key, val)
}
// 获取, 获取不到的话，默认值是defaultVal
const mySessionStorageGet = (key, defaultVal) => {
  return storage.session.get(key, defaultVal)
}
// 删除
const mySessionStorageRemove = (key) => {
  storage.session.remove(key)
}

// 判断是否有
const mySessionStorageHas = (key) => {
  return storage.session.has(key)
}
// 清空所有的存储
const mySessionStorageClear = () => {
  storage.session.clear()
}
// 获取所有的
const mySessionStorageGetAll = () => {
  return storage.session.getAll()
}

export { myLocalStorageSet, myLocalStorageGet, myLocalStorageRemove, myLocalStorageHas, myLocalStorageClear, myLocalStorageGetAll, mySessionStorageSet, mySessionStorageGet, mySessionStorageRemove, mySessionStorageHas, mySessionStorageClear, mySessionStorageGetAll }
