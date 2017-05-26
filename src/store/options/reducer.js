import Immutable from 'immutable';

import {
  FETCH_OPTIONS,
  RECEIVE_OPTIONS,
  UPDATE_OPTION,
} from './types';

export const initialState = Immutable.fromJS({
  options: {},
  isFetching: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_OPTIONS:
      return state.set('isFetching', true);

    case RECEIVE_OPTIONS:
      return state
        .set('isFetching', false)
        .set('options', action.collections);

    case UPDATE_OPTION:
      return state
        .setIn(['options', action.option], action.value);

    default:
      return state;
  }
}

