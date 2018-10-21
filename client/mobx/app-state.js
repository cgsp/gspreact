import { observable, computed, action } from 'mobx'

/*
 *最好定义为一个class这样的话，方便调用
 */
class AppState {
  constructor({ count, name } = { count: 0, name: 'gsp' }) {
    this.count = count
    this.name = name
  }

  @observable count
  @observable name
  @computed get msg() {
    return `${this.name} 说数字是${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(e) {
    this.name = e.target.value
  }

  // 服务端渲染专用
  toJson() {
    return {
      count: this.count,
      name: this.name
    }
  }
}

// const appState = new AppState()

// 注意autorun 是在class的外部使用的
// 只要这个state更新了，就会触发
// autorun(() => {
//   console.log(appState.msg)
// })

// setInterval(() => {
//   appState.add()
// }, 2000)

export default AppState
