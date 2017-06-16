import { randomURL } from 'utils/requestUtils';
import {
  EXECUTE_REQUEST,
  RECEIVE_RESPONSE,
  CLEAR_RESPONSE,
  USE_FORM_DATA,
  REQUEST_FAILED,
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
        error: undefined,
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
        error: undefined,
      });

    case USE_FORM_DATA:
      return Object.assign({}, state, {
        useFormData: action.useFormData,
      });

    case REQUEST_FAILED:
      return Object.assign({}, state, {
        error: action.error,
      });

    default:
      return state;
  }
}

