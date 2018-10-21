import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { PropTypes } from 'prop-types'
import Helmet from 'react-helmet'

@inject('appState') @observer
class TopicList extends Component {
  static propTypes = {
    appState: PropTypes.object
  }

  componentDidMount() {
    // do some
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
        <Helmet>
          <title>这个是列表页面</title>
          <meta name="这个是列表页面的描述" content="这个是列表页面的描述" />
        </Helmet>
        <input type="text" onChange={e => this.props.appState.changeName(e)} />
        <div>{this.props.appState.msg}</div>
      </div>
    )
  }
}

export default TopicList
