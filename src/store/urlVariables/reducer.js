import Immutable from 'immutable';

import {
  FETCH_URL_VARIABLES,
  RECEIVE_URL_VARIABLES,
  ADD_URL_VARIABLE,
  UPDATE_URL_VARIABLE,
  DELETE_URL_VARIABLE,
} from './types';

export const initialState = Immutable.fromJS({
  urlVariables: [],
  isFetching: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_URL_VARIABLES:
      return state.set('isFetching', true);

    case RECEIVE_URL_VARIABLES:
      return state
        .set('isFetching', false)
        .set('urlVariables', action.urlVariables);

    case ADD_URL_VARIABLE:
      return state
        .update('urlVariables', variables => (
          variables.push(Immutable.Map())
        ));

    case UPDATE_URL_VARIABLE:
      return state
        .setIn(['urlVariables', action.index], Immutable.fromJS(action.value));

    case DELETE_URL_VARIABLE:
      return state
        .deleteIn(['urlVariables', action.index]);

    default:
      return state;
  }
}

