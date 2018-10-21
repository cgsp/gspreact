import React, { Component } from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'

export default class TestApi extends Component {
  constructor(props) {
    super(props)
    this.getTopic = this.getTopic.bind(this)
    this.login = this.login.bind(this)
    this.mark = this.mark.bind(this)
  }
  getTopic() {
    axios.get('/api/topics')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  login() {
    axios.post('/api/user/login', {
      accessToken: 'ca4cdc52-0c5e-4e60-9f41-94aee6144366'
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  mark() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  render() {
    return [
      <Helmet key="seo">
        <title>这个是测试API页面的</title>
        <meta name="这个是测试API页面的的描述" content="这个是测试API页面的的描述" />
      </Helmet>,
      <button onClick={this.getTopic} key="测试话题">测试话题</button>,
      <button onClick={this.login} key="登录">登录</button>,
      <button onClick={this.mark} key="测试标记">测试标记</button>,
    ]
  }
}
