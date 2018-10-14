import { observable, computed, autorun, action } from 'mobx'

/*
 *最好定义为一个class这样的话，方便调用
 */
class AppState {
  @observable count = 0
  @observable name = 'gsp'
  @computed get msg() {
    return `${this.name} 说数字是${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(e) {
    this.name = e.target.value
  }
}

const appState = new AppState()

// 注意autorun 是在class的外部使用的
// 只要这个state更新了，就会触发
autorun(() => {
  console.log(appState.msg)
})

setInterval(() => {
  appState.add()
}, 2000)

export default appState
