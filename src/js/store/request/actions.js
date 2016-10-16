export const EXECUTE_REQUEST = 'EXECUTE_REQUEST';
export function executeRequest() {
  return { type: EXECUTE_REQUEST };
}

export const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
export function receiveResponse(response) {
  return { type: RECEIVE_RESPONSE, response };
}

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export function updateRequest(request) {
  return { type: UPDATE_REQUEST, request };
}

export const CLEAR_RESPONSE = 'CLEAR_RESPONSE';
export function clearRequest() {
  return { type: CLEAR_RESPONSE };
}

