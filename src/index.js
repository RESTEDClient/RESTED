import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import localforage from 'localforage';
import localDriver from 'localforage-webextensionstorage-driver/local';
import syncDriver from 'localforage-webextensionstorage-driver/sync';

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

/* eslint-disable import/no-dynamic-require */
const configureStore = require(`./store/configureStore.${env}.js`);
const Root = require(`./components/Root/Root.${env}.js`);

// Ensure drivers are loaded and ready before rendering
Promise.all([
  localforage.defineDriver(localDriver),
  localforage.defineDriver(syncDriver),
])
.then(() => localforage.setDriver('webExtensionLocalStorage'))
.then(() => {
  ReactDOM.render(
    <Provider store={configureStore.default()}>
      <Root.default />
    </Provider>,
    document.getElementById('app'),
  );
});

