import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

import Authtoken from './components/Authtoken'
import App from './components/App'
import UserProfile from './containers/UserProfileContainer'
import Settings from './containers/SettingsContainer'
import PostPage from './components/PostPage'
import SharePage from './containers/SharePageContainer'
import Page404 from './components/Page404'

const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, reducers)

function configureStore () {
  let middleware = applyMiddleware(thunk, createLogger())
  let store = createStore(reducer, middleware)
  let persistor = persistStore(store)

  return { persistor, store }
}

const persistorStore = configureStore()

const history = syncHistoryWithStore(browserHistory, persistorStore.store)

render(
  <Provider store={persistorStore.store} persistor={persistorStore.persistor}>
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