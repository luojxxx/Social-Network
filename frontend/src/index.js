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
import App from './components/App.js'
import UserProfile from './containers/UserProfileContainer.js'
import PostPage from './components/PostPage.js'


const middleware = applyMiddleware(thunk, createLogger())
const store = createStore(reducers, middleware)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/authtoken" component={Authtoken} />
      <Route path="/" component={App}></Route>
      <Route path="/userprofile/:userId" component={UserProfile} />
      <Route path="/post/:postId" component={PostPage} />
    </Router>
  </Provider>,
  document.getElementById('root')
)