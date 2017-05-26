import { randomURL } from 'utils/requestUtils';
import {
  EXECUTE_REQUEST,
  RECEIVE_RESPONSE,
  CLEAR_RESPONSE,
  CHANGE_BODY_TYPE,
} from './types';

const initialState = {
  placeholderUrl: process.env.NODE_ENV !== 'test'
    ? randomURL()
    : 'https://example.com',
  request: null,
  response: null,
  loading: false,
  useFormData: true,
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

    case CLEAR_RESPONSE:
      return Object.assign({}, state, {
        response: null,
        loading: false,
      });

    case CHANGE_BODY_TYPE:
      // Set Content-Type header to application/x-www-form-urlencoded
      // Unset Content-Type when set to application/x-www-form-urlencoded
      return Object.assign({}, state, {
        bodyType: action.bodyType,
      });

    default:
      return state;
  }
}

