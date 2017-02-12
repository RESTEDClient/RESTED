import Immutable from 'immutable';
import { change, initialize } from 'redux-form';

import base64Encode from 'utils/base64';
import { reMapHeaders } from 'utils/requestUtils';
import { pushHistory } from 'store/history/actions';
import { selectRequest as doSelectRequest } from 'store/collections/actions';
import { requestForm } from 'components/Request';

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

export function selectRequest(collectionIndex, requestIndex) {
  return (dispatch, getState) => {
    const request = getState().collections.getIn([
      'collections',
      collectionIndex,
      'requests',
      requestIndex,
    ]);

    dispatch(doSelectRequest(collectionIndex, requestIndex));
    dispatch(initialize(requestForm, request.toJS()));
  };
}

export function sendRequest(request) {
  const { url, method, headers, formData, basicAuth } = request;
  return (dispatch, getState) => {
    dispatch(executeRequest());

    const fallbackUrl = getState().request.placeholderUrl;
    if (!url) {
      dispatch(change(requestForm, 'url', fallbackUrl));
      request.url = fallbackUrl; // eslint-disable-line no-param-reassign
    }

    const requestHeaders = new Headers(reMapHeaders(headers, true));

    if (basicAuth && basicAuth.username) {
      requestHeaders.append(
        'Authorization',
        `Basic ${base64Encode(`${basicAuth.username}:${basicAuth.password}`)}`,
      );
    }

    let body;
    if (formData && formData.filter(f => f.name).length > 0) {
      body = new FormData();

      formData.forEach(f => { body.append(f.name, f.value); });
    }

    dispatch(pushHistory(Immutable.fromJS(request)));

    return fetch(url || fallbackUrl, {
      method,
      body,
      headers: requestHeaders,
      credentials: 'include', // Include cookies
    }).then(response => {
      // TODO Move out to a separate function to it can be tested
      const responseHeaders = [];

      // eslint-disable-next-line no-restricted-syntax
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
    }).catch(e => {
      // TODO Handle network errors, permission errors..
      throw e;
    });
  };
}
