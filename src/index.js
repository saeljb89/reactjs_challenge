import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router  } from 'react-router-dom';

import store from './store';
import App from './containers/App';
import AuthService from './services/AuthService';
import './index.css';
import * as serviceWorker from './serviceWorker';

AuthService.interceptorRequest();
AuthService.interceptResponse();

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <Switch>
            <Route path="/" component={App} />
          </Switch>
      </Router>
  </Provider>,
  document.getElementById('app-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
