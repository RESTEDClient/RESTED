import { change } from 'redux-form';
import {
  EXECUTE_REQUEST,
  RECEIVE_RESPONSE,
  UPDATE_REQUEST,
  CLEAR_RESPONSE,
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
          url: response.url,
          status: response.status,
          statusText: response.statusText,
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
