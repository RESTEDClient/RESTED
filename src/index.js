import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Grid } from 'react-bootstrap';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './store';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <Grid fluid>
      <App />
    </Grid>
  </Provider>,
  document.getElementById('app')
);

