import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
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
