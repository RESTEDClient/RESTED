import { change } from 'redux-form';

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

export function sendRequest({ url, method }) {
  return (dispatch, getState) => {
    dispatch(executeRequest());

    const fallbackUrl = getState().request.placeholderUrl;
    if (!url) {
      dispatch(change('requestForm', 'url', fallbackUrl));
    }

    return fetch(url || fallbackUrl, {
      method,
    }).then(response => {
      const headers = [];
      for (const header of response.headers) {
        headers.push({
          name: header[0],
          value: header[1],
        });
      }

      return response.text().then(body => {
        dispatch(receiveResponse({
          url,
          method,
          body,
          headers,
        }));
      });
    }).catch(() => {
      // TODO Handle network errors, permission errors..
    });
  };
}
