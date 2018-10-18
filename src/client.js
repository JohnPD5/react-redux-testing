import React from 'react';
import { hydrate } from 'react-dom';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '../public/css/main.css';
import App from './containers/App';
import createStore from './store';
import rootReducer from './reducers/index';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with the preloaded state
const store = createStore(preloadedState);

console.log('-client preloadedState-', store.getState());

const root = document.getElementById('root');
const jsx = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

hydrate(jsx, root);