import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import rootReducer from './';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

// Middleware you want to use in production:
const enhancer = applyMiddleware(thunk, sagaMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(sagas);

  return store;
}

