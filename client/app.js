import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from '@Pages/App'
import AppState from '@Mobx/app-state'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState()}>
        {/* <BrowserRouter basename="/ssr"> */}
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
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
