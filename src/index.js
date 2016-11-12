import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

function getEnv() {
  if (process.env.NODE_ENV === 'production') {
    return 'prod';
  }

  return 'dev';
}

System
  .import(`./store/configureStore.${getEnv()}`)
  .then(configureStore => (
    System
      .import(`./components/Root/Root.${getEnv()}`)
      .then(Root => [configureStore.default, Root.default])
  ))
  .then(([configureStore, Root]) => {
    ReactDOM.render(
      <Provider store={configureStore()}>
        <Root />
      </Provider>,
      document.getElementById('app')
    );
  });

