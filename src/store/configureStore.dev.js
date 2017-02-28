import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import DevTools from 'components/DevTools';
import rootReducer from './';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  // Middleware
  applyMiddleware(thunk, sagaMiddleware),
  // Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('./', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./').default),
    );
  }

  sagaMiddleware.run(sagas);

  return store;
}

