import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './';

// Middleware you want to use in production:
const enhancer = applyMiddleware(thunk);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
};

