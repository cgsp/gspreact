import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// import { asyncComponent } from './asyncComponent'

// 让路由对应的组件都是异步加载--想用的话，需要配置webpack，（如果是creat-react-app的话，默认是配置好了）
// const TopicList = asyncComponent(() => import('@Pages/topic-list'))
// const TopicDetail = asyncComponent(() => import('@Pages/topic-detail'))
// const NoMatch404 = asyncComponent(() => import('@Pages/no-match-404'))

// 让路由对应的组件都是同步加载
import TopicList from '@Pages/topic-list'
import TopicDetail from '@Pages/topic-detail'
import NoMatch404 from '@Pages/no-match-404'
import Test from '@Pages/test'

// pure function组件
export default () => (
  <Switch>
    {/* Redirect有push这个属性，如果设置为true的话，会进入history里面，这样点击浏览器的返回的话，就2个路由之间跳来跳去 */}
    {/* <Redirect push={true} to="/topic-list" />} */}
    {/* 也可以按照下面方式使用 */}
    {/* <Redirect from="/" to="/topic-list" />} */}
    <Route path="/" render={() => <Redirect to="/topic-list" />} exact key="/" />
    <Route path="/topic-list" component={TopicList} key="/topic-list" />
    <Route path="/topic-detail" component={TopicDetail} key="/topic-detail" />
    <Route path="/test" component={Test} key="/test" />
    <Route path="/no-match-404" component={NoMatch404} key="/no-match-404" />
    <Redirect to="/no-match-404" />
  </Switch>
)

// pure function组件 return一个数组，注意逗号
// export default () => [
//   <Route path="/" render={() => <Redirect to="/topic-list" />} exact key="/" />,
//   <Route path="/topic-list" component={TopicList} key="/topic-list" />,
//   <Route path="/topic-detail" component={TopicDetail} key="/topic-detail" />,
//   <Route path="/no-match-404" component={NoMatch404} key="/no-match-404" />,
//   <Redirect to="/no-match-404" />,
// ]
