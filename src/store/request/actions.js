import {
  SEND_REQUEST,
  EXECUTE_REQUEST,
  RECEIVE_RESPONSE,
  RECEIVE_INTERCEPTED_RESPONSE,
  PUSH_REDIRECT_CHAIN,
  CLEAR_RESPONSE,
  CHANGE_BODY_TYPE,
  SELECT_REQUESTED,
} from './types';

export function executeRequest() {
  return { type: EXECUTE_REQUEST, lastRequestTime: Date.now() };
}

export function receiveResponse(response) {
  return { type: RECEIVE_RESPONSE, response };
}

export function receiveInterceptedResponse(response) {
  return { type: RECEIVE_INTERCEPTED_RESPONSE, response };
}

export function pushRedirectChain(response) {
  return { type: PUSH_REDIRECT_CHAIN, response };
}

export function clearRequest() {
  return { type: CLEAR_RESPONSE };
}

export function changeBodyType(bodyType) {
  return { type: CHANGE_BODY_TYPE, bodyType };
}

export function selectRequest(request) {
  return { type: SELECT_REQUESTED, request };
}

export function sendRequest(request) {
  return { type: SEND_REQUEST, request };
}

