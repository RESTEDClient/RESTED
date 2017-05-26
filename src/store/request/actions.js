import {
  SEND_REQUEST,
  EXECUTE_REQUEST,
  RECEIVE_RESPONSE,
  CLEAR_RESPONSE,
  USE_FORM_DATA,
  SELECT_REQUESTED,
} from './types';

export function executeRequest() {
  return { type: EXECUTE_REQUEST };
}

export function receiveResponse(response) {
  return { type: RECEIVE_RESPONSE, response };
}

export function clearRequest() {
  return { type: CLEAR_RESPONSE };
}

export function setUseFormData(useFormData) {
  return { type: USE_FORM_DATA, useFormData };
}

export function selectRequest(request) {
  return { type: SELECT_REQUESTED, request };
}

export function sendRequest(request) {
  return { type: SEND_REQUEST, request };
}

