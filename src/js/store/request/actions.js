import { change, getFormValues } from 'redux-form';

import base64Encode from '../../utils/base64';
import { reMapHeaders } from '../../utils/requestUtils';
import {
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

export function sendRequest({ url, method, headers, formData, basicAuth }) {
  return (dispatch, getState) => {
    dispatch(executeRequest());

    const fallbackUrl = getState().request.placeholderUrl;
    if (!url) {
      dispatch(change('requestForm', 'url', fallbackUrl));
    }

    const requestHeaders = new Headers(reMapHeaders(headers, true));

    if (basicAuth && basicAuth.username) {
      requestHeaders.append(
        'Authorization',
        `Basic ${base64Encode(`${basicAuth.username}:${basicAuth.password}`)}`
      );
    }

    let body = undefined;
    if (formData && formData.filter(f => f.name).length > 0) {
      body = new FormData();

      formData.forEach(f => { body.append(f.name, f.value); });
    }

    // TODO Add data, headers and basic auth
    return fetch(url || fallbackUrl, {
      method,
      //body,
      headers: requestHeaders,
      credentials: 'include', // Include cookies
    }).then(response => {
      const responseHeaders = [];
      for (const header of response.headers) {
        responseHeaders.push({
          name: header[0],
          value: header[1],
        });
      }

      return response.text().then(responseBody => {
        dispatch(receiveResponse({
          url: response.url,
          status: response.status,
          statusText: response.statusText,
          body: responseBody,
          headers: responseHeaders,
          method,
        }));
      });
    }).catch(() => {
      // TODO Handle network errors, permission errors..
    });
  };
}
