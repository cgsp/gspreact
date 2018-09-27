import React, { Component } from 'react'
import RootRoutes from '@Router'

class App extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return [
      <div>22ddd1</div>,
      <RootRoutes />
    ]
  }
}

export default App
