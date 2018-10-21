import AppStateClass from './app-state'

export const AppState = AppStateClass

export default {
  AppState,
}

// 专门给服务端渲染用的一个函数
export const createStoreMap = () => {
  return {
    appState: new AppState()
  }
}
