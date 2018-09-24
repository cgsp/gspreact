import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from '@Pages/App'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}

render(App)

// 如果有需要热更新的代码的话
if (module.hot) {
  module.hot.accept('@Pages/App', () => {
    /* eslint-disable */
    const NextApp = require('@Pages/App').default
    render(NextApp)
    /* eslint-enable */
  })
}
