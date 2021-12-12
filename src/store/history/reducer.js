import Immutable from 'immutable';

import {
  FETCH_HISTORY,
  RECEIVE_HISTORY,
  PUSH_HISTORY,
  PRUNE_HISTORY,
  DELETE_ITEM,
  CLEAR_HISTORY,
} from './types';

export const initialState = Immutable.fromJS({
  data: [],
  isFetching: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_HISTORY:
      return state.set('isFetching', true);

    case RECEIVE_HISTORY:
      return state
        .set('isFetching', false)
        .set('data', action.history);

    case PUSH_HISTORY:
      return state
        .update('data', history => (
          history.unshift(action.request)
        ));

    case PRUNE_HISTORY:
      return state
        .update('data', history => (
          // Max history size cannot go below zero
          history.slice(0, action.historySize >= 0 ? action.historySize : 0)
        ));

    case DELETE_ITEM:
      return state
        .deleteIn(['data', action.index]);

    case CLEAR_HISTORY:
      return state
        .update('data', data => (
          data.clear()
        ));

    default:
      return state;
  }
}

