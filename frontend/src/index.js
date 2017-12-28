import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducers from './reducers';

import App from './components/App.js';
import UserProfile from './containers/UserProfileContainer.js';
import Authtoken from './components/Authtoken';

const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
      <Route path="/authtoken" component={Authtoken} />
      <Route path="/userprofile" component={UserProfile} />
    </Router>
  </Provider>,
  document.getElementById('root')
);