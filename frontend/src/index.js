import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import { persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import localForage from 'localforage'

import reducers from './reducers/indexReducer'

import Authtoken from './containers/AuthtokenContainer'
import App from './containers/AppContainer'
import HomePage from './containers/HomePageContainer'
import PostPage from './containers/PostPageContainer'
import SearchResults from './containers/SearchResultsContainer'
import UserProfile from './containers/UserProfileContainer'
import Settings from './containers/SettingsContainer'
import Notifications from './containers/NotificationsContainer'
import Page404 from './components/Page404'

const routerWare = routerMiddleware(browserHistory)

// localForage.clear()

const persistConfig = {
  key: 'root',
  storage: localForage
}

const reducer = persistCombineReducers(persistConfig, reducers)

function configureStore () {
  let middleware = applyMiddleware(routerWare, thunk, createLogger())
  let store = createStore(reducer, middleware)
  let persistor = persistStore(store)
  return { persistor, store }
}

const { persistor, store } = configureStore()

render(
  <Provider store={store} persistor={persistor}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={browserHistory}>
        
        <Route path="/" component={App}>
          <IndexRoute component={HomePage}></IndexRoute>
          <Route path="/authtoken" component={Authtoken} />
          <Route path="/post/:postId" component={PostPage} />
          <Route path="/search" component={SearchResults} />
          <Route path="/userprofile/:userId/:subField" component={UserProfile} />
          <Route path="/settings" component={Settings} />
          <Route path="/notifications" component={Notifications} />
          <Route path="*" component={Page404} />
        </Route>
        
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

    
     