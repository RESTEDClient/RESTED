import { initialize } from 'redux-form';
import { requestForm } from 'components/Request';

import {
  SEND_REQUEST,
  EXECUTE_REQUEST,
  RECEIVE_RESPONSE,
  UPDATE_REQUEST,
  CLEAR_RESPONSE,
  USE_FORM_DATA,
} from './types';

export function executeRequest() {
  return { type: EXECUTE_REQUEST };
}

export function receiveResponse(response) {
  return { type: RECEIVE_RESPONSE, response };
}

export function updateRequest(request) {
  return { type: UPDATE_REQUEST, request };
}

export function clearRequest() {
  return { type: CLEAR_RESPONSE };
}

export function setUseFormData(useFormData) {
  return { type: USE_FORM_DATA, useFormData };
}

export function selectRequest(request) {
  return dispatch => {
    dispatch(initialize(requestForm, request));
  };
}

export function sendRequest(request) {
  return { type: SEND_REQUEST, request };
}

