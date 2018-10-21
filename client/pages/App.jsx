import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppRootRoutes from '@Router'

class App extends Component {
  componentDidMount() {
    // do some
  }

  render() {
    return [
      <div key="link">
        <Link to="/topic-list">列表页</Link>
        <Link to="/topic-detail">详情页</Link>
      </div>,
      <AppRootRoutes key="appRootRoutes" />
    ]
  }
}

export default App
