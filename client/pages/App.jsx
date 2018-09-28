import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RootRoutes from '@Router'

class App extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return [
      <div>
        <Link to="/topic-list">列表页</Link>
        <Link to="/topic-detail">详情页</Link>
      </div>,
      <RootRoutes />
    ]
  }
}

export default App
