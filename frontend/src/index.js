import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers';

// import App from './components/App';
import App from './containers/AppContainer.js'
import Authtoken from './components/Authtoken';

const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
      <Route path="/authtoken" component={Authtoken} />
    </Router>
  </Provider>,
  document.getElementById('root')
);