import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

/* eslint-disable import/no-dynamic-require */
const configureStore = require(`./store/configureStore.${env}.js`);
const Root = require(`./components/Root/Root.${env}.js`);

ReactDOM.render(
  <Provider store={configureStore.default()}>
    <Root.default />
  </Provider>,
  document.getElementById('app')
);

