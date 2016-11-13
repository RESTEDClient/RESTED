import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';

import { initialState as collectionInitialState } from '../src/store/collections/reducer';

const middleware = compose(
  // Middleware
  applyMiddleware(thunk),
);

export default (state = {}) => createStore(
  combineReducers({
    // Mock all the reducers as no-op reducers
    form,
    collections: (initialState = collectionInitialState) => initialState,
    request: (initialState = {}) => initialState,
    collapsable: (initialState = {}) => initialState,
  }),
  state,
  middleware,
);

