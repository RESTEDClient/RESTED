import { createStore, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { initialState as collectionInitialState } from '../src/store/collections/reducer';

export default (state = {}) => createStore(
  combineReducers({
    // Mock all the reducers as no-op reducers
    form,
    collections: (initialState = collectionInitialState) => initialState,
    request: (initialState = {}) => initialState,
    collapsable: (initialState = {}) => initialState,
  }),
  state,
);

