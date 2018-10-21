import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { PropTypes } from 'prop-types'

@inject('appState') @observer
class TopicList extends Component {
  static propTypes = {
    appState: PropTypes.object
  }

  constructor(props) {
    super(props)
    console.log(props)
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      }, 1000)
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={e => this.props.appState.changeName(e)} />
        <div>{this.props.appState.msg}</div>
      </div>
    )
  }
}

export default TopicList
