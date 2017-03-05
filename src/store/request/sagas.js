import Immutable from 'immutable';
import { change } from 'redux-form';
import { call, apply, fork, put, select, takeLatest } from 'redux-saga/effects';

import base64Encode from 'utils/base64';
import { reMapHeaders } from 'utils/requestUtils';
import { prependHttp, mapParameters } from 'utils/request';
import { pushHistory } from 'store/history/actions';
import { getUrlVariables } from 'store/urlVariables/selectors';
import { requestForm } from 'components/Request';

import { getPlaceholderUrl } from './selectors';
import { executeRequest, receiveResponse } from './actions';
import { SEND_REQUEST, REQUEST_FAILED } from './types';

export function* getUrl(request) {
  if (!request.url) {
    const fallbackUrl = yield select(getPlaceholderUrl);
    yield put(change(requestForm, 'url', fallbackUrl));
    return fallbackUrl;
  }

  return request.url;
}

export function* createResource(request) {
  const url = yield call(getUrl, request);
  const parameters = yield select(getUrlVariables);
  const resource = mapParameters(url, parameters);

  return yield call(prependHttp, resource);
}

function buildHeaders({ headers, basicAuth }) {
  const requestHeaders = new Headers(reMapHeaders(headers, true));
  if (basicAuth && basicAuth.username) {
    requestHeaders.append(
      'Authorization',
      `Basic ${base64Encode(`${basicAuth.username}:${basicAuth.password}`)}`,
    );
  }

  return requestHeaders;
}

function buildFormData({ formData }) {
  if (formData && formData.filter(f => f.name).length > 0) {
    const body = new FormData();

    formData.forEach(f => {
      body.append(f.name, f.value);
    });

    return body;
  }

  return null;
}

function buildResponseHeaders(response) {
  const headers = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const header of response.headers) {
    headers.push({
      name: header[0],
      value: header[1],
    });
  }

  return headers;
}


export function* fetchData({ request }) {
  try {
    yield put(executeRequest());

    const resource = yield call(createResource, request);
    const headers = buildHeaders(request);
    const body = buildFormData(request);

    const historyEntry = Immutable.fromJS(request).set('url', resource);
    yield put(pushHistory(historyEntry));

    const response = yield call(fetch, resource, {
      method: request.method,
      body,
      headers,
      credentials: 'include', // Include cookies
    });

    const responseHeaders = buildResponseHeaders(response);
    const responseBody = yield apply(response, response.text);

    yield put(receiveResponse({
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      body: responseBody,
      headers: responseHeaders,
      method: request.method,
    }));
  } catch (error) {
    yield put({ type: REQUEST_FAILED, error });
  }
}

function* sendRequest() {
  yield takeLatest(SEND_REQUEST, fetchData);
}

export default function* rootSaga() {
  yield fork(sendRequest);
}

