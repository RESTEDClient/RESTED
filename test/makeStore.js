import { combineReducers, createStore } from 'redux';
import { reducer as form } from 'redux-form';

export default (state = {}) => createStore(
  combineReducers({ form, request: () => ({}) }),
  state,
);

