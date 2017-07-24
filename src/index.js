import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import localforage from 'localforage';
import localDriver from 'localforage-webextensionstorage-driver/local';
import syncDriver from 'localforage-webextensionstorage-driver/sync';
import { initializeInterceptors } from 'utils/requestInterceptors';

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
.then(() => localforage.getItem('options'))
.then(options => {
  if (options && options.sync) {
    return localforage.setDriver('webExtensionSyncStorage');
  }

  return null;
})
.then(() => {
  const store = configureStore.default();
  initializeInterceptors(store);

  ReactDOM.render(
    <Provider store={store}>
      <Root.default />
    </Provider>,
    document.getElementById('app'),
  );
});

