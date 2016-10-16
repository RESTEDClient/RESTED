export const EXECUTE_REQUEST = 'request/EXECUTE_REQUEST';
export function executeRequest() {
  return { type: EXECUTE_REQUEST };
}

export const RECEIVE_RESPONSE = 'request/RECEIVE_RESPONSE';
export function receiveResponse(response) {
  return { type: RECEIVE_RESPONSE, response };
}

export const UPDATE_REQUEST = 'request/UPDATE_REQUEST';
export function updateRequest(request) {
  return { type: UPDATE_REQUEST, request };
}

export const CLEAR_RESPONSE = 'request/CLEAR_RESPONSE';
export function clearRequest() {
  return { type: CLEAR_RESPONSE };
}

export function sendRequest(values) {
  return dispatch => {
    dispatch(executeRequest());

    const {
      url,
      method,
    } = values;

    fetch(url, {
      method,
    }).then(response => {
      // TODO Read headers
      response.text().then(body => {
        // TODO separate out RECEIVE_RESPONSE_BODY and RECEIVE_RESPONSE_HEADERS?
        dispatch(receiveResponse({
          body,
        }));
      });
      //dispatch(receiveResponse(response));
    }).catch(() => {
      // TODO Handle network errors, permission errors..
    });
  };
}
