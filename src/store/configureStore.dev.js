import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './';
import DevTools from 'components/DevTools';

const enhancer = compose(
  // Middleware
  applyMiddleware(thunk),
  // Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('./', () =>
      store.replaceReducer(require('./').default) // eslint-disable-line global-require
    );
  }

  return store;
}

