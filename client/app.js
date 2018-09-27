import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from '@Pages/App'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      {/* <BrowserRouter basename="/ssr"> */}
      <BrowserRouter>
        <Component />
      </BrowserRouter>
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
