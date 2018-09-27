import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { asyncComponent } from './asyncComponent'

// 让路由对应的组件都是异步加载
const TopicList = asyncComponent(() => import('@Pages/topic-list'))
const TopicDetail = asyncComponent(() => import('@Pages/topic-detail'))
const NoMatch404 = asyncComponent(() => import('@Pages/no-match-404'))

// 让路由对应的组件都是同步加载
// import TopicList from '@Pages/topic-list'
// import TopicDetail from '@Pages/topic-detail'
// import NoMatch404 from '@Pages/no-match-404'

export default () => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/topic-list" />} exact key="/" />
    <Route path="/topic-list" component={TopicList} key="/topic-list" />
    <Route path="/topic-detail" component={TopicDetail} key="/topic-detail" />
    <Route path="/no-match-404" component={NoMatch404} key="/no-match-404" />
    <Redirect to="/no-match-404" />
  </Switch>
)
