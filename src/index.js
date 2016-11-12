import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

Promise
  .all([
    System.import(`./store/configureStore.${env}.js`),
    System.import(`./components/Root/Root.${env}.js`),
  ])
  .then(([configureStore, Root]) => {
    ReactDOM.render(
      <Provider store={configureStore.default()}>
        <Root.default />
      </Provider>,
      document.getElementById('app')
    );
  })
  .catch(error => {
    ReactDOM.render(
      <main>
        <h1 style={{ color: 'red' }}>
          A critical error occured while loading RESTED!
          Please look open the developer console (F12) and try again (F5).
          If there is anything intersting there, please
          <a href="https://github.com/esphen/RESTED/issues/">
            &nbsp;create an issue on github.
          </a>
        </h1>
        <h2>{error.message}</h2>
        <code><pre>{error.stack}</pre></code>
      </main>,
      document.getElementById('app')
    );
    throw error;
  });

