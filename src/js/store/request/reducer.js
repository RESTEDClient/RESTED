import {
  EXECUTE_REQUEST,
  RECEIVE_RESPONSE,
  UPDATE_REQUEST,
  CLEAR_RESPONSE,
} from './actions';

const initialState = {
  request: null,
  response: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EXECUTE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
      });

    case RECEIVE_RESPONSE:
      return Object.assign({}, state, {
        response: action.response,
        loading: false,
      });

    case UPDATE_REQUEST:
      return Object.assign({}, state, {
        request: action.request,
        loading: false,
      });

    case CLEAR_RESPONSE:
      return Object.assign({}, state, {
        response: null,
        loading: false,
      });

    default:
      return state;
  }
}

