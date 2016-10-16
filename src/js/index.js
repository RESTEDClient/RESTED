import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Grid } from 'react-bootstrap';
import { createStore } from 'redux';

import App from './components/App';
import rootReducer from './store';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Grid fluid>
      <App />
    </Grid>
  </Provider>,
  document.getElementById('app')
);

