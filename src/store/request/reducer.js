import { randomURL } from 'utils/requestUtils';
import {
  EXECUTE_REQUEST,
  RECEIVE_RESPONSE,
  UPDATE_REQUEST,
  CLEAR_RESPONSE,
  USE_FORM_DATA,
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

    // TODO Not needed?
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

    case USE_FORM_DATA:
      return Object.assign({}, state, {
        useFormData: action.useFormData,
      });

    default:
      return state;
  }
}

