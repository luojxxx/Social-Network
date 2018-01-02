import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import reducers from './reducers'

import Authtoken from './components/Authtoken'
import App from './components/App'
import UserProfile from './containers/UserProfileContainer'
import Settings from './containers/SettingsContainer'
import PostPage from './components/PostPage'
import SharePage from './containers/SharePageContainer'
import Page404 from './components/Page404'


const middleware = applyMiddleware(thunk, createLogger())
const store = createStore(reducers, middleware)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/authtoken" component={Authtoken} />
      <Route path="/" component={App}></Route>
      <Route path="/userprofile/:userId" component={UserProfile} />
      <Route path="/settings" component={Settings} />
      <Route path="/post/:postId" component={PostPage} />
      <Route path="/share/:postId" component={SharePage} />
      <Route path="*" component={Page404} />
    </Router>
  </Provider>,
  document.getElementById('root')
)