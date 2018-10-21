import React from 'react'
// 专门做服务端渲染的提供的
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import App from '@Pages/App'

import { createStoreMap } from '@Mobx'

// mobx提供的专门供服务端渲染用的
// 意思是采用静态的渲染
// 让mobx在服务端渲染的时候，不会重复数据变换，防止内存溢出
useStaticRendering(true)

export default (stores, routerContext, url) => {
  return (
    <Provider {...stores}>
      <StaticRouter context={routerContext} location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )
}

export { createStoreMap }

