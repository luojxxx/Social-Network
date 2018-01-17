import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { persistStore, persistCombineReducers } from 'redux-persist'
// import { PersistGate } from 'redux-persist/lib/integration/react'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

import Authtoken from './components/Authtoken'
import App from './containers/AppContainer'
import HomePage from './containers/HomePageContainer'
import PostPage from './containers/PostPageContainer'
import SearchResults from './containers/SearchResultsContainer'
import UserProfile from './containers/UserProfileContainer'
import Settings from './containers/SettingsContainer'
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
        
        <Route path="/" component={App}>
          <IndexRoute component={HomePage}></IndexRoute>
          <Route path="/authtoken" component={Authtoken} />
          <Route path="/post/:postId" component={PostPage} />
          <Route path="/search" component={SearchResults} />
          <Route path="/userprofile/:userId/:subField" component={UserProfile} />
          <Route path="/settings" component={Settings} />
          <Route path="*" component={Page404} />
        </Route>
        
      </Router>
  </Provider>,
  document.getElementById('root')
)

    // <PersistGate loading="loading..." persistor={persistorStore.persistor}>
    //  </PersistGate>