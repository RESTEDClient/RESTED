import Immutable from 'immutable';
import UUID from 'uuid-js';
import { initialize, change } from 'redux-form';
import { call, apply, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import base64Encode from 'utils/base64';
import buildRequestData from 'utils/buildRequestData';
import { reMapHeaders, focusUrlField } from 'utils/requestUtils';
import { prependHttp, mapParameters } from 'utils/request';
import { pushHistory } from 'store/history/actions';
import { getUrlVariables } from 'store/urlVariables/selectors';
import { requestForm } from 'components/Request';
import { updateOption } from 'store/options/actions';
import { getIgnoreCache } from 'store/options/selectors';

import { getPlaceholderUrl, getHeaders } from './selectors';
import { executeRequest, receiveResponse } from './actions';
import { SEND_REQUEST, REQUEST_FAILED, SELECT_REQUESTED, CHANGE_BODY_TYPE } from './types';

export function* getUrl(request) {
  if (!request.url) {
    const fallbackUrl = yield select(getPlaceholderUrl);
    yield put(change(requestForm, 'url', fallbackUrl));
    return fallbackUrl;
  }

  return request.url.trim();
}

export function* getParameters() {
  let parameters = yield select(getUrlVariables);
  parameters = parameters.reduce((prev, parameter) => ({
    ...prev,
    [parameter.get('name')]: parameter.get('value'),
  }), {});

  return parameters;
}

export function* createResource(request) {
  const url = yield call(getUrl, request);
  const parameters = yield call(getParameters);
  const resource = mapParameters(url, parameters);

  return yield call(prependHttp, resource);
}

export function* buildHeaders({ headers, basicAuth }) {
  const parameters = yield call(getParameters);
  const requestHeaders = new Headers(reMapHeaders(headers, parameters));
  if (basicAuth && basicAuth.username) {
    requestHeaders.append(
      'Authorization',
      `Basic ${base64Encode(`${basicAuth.username}:${basicAuth.password}`)}`,
    );
  }

  return requestHeaders;
}

// Needed for unit tests to be consistent
export function getBeforeTime() {
  return Date.now();
}

// Needed for unit tests to be consistent
export function getMillisPassed(before) {
  return Date.now() - before;
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

function createUUID() {
  if (process.env.NODE_ENV === 'test') {
    return 'test-UUID';
  }

  return UUID.create().toString();
}

export function* fetchData({ request }) {
  try {
    yield put(executeRequest());

    const resource = yield call(createResource, request);
    const headers = yield call(buildHeaders, request);
    const ignoreCache = yield select(getIgnoreCache);

    // Build body for requests that support it
    let body;
    if (!['GET', 'HEAD'].includes(request.method)) {
      body = request.bodyType !== 'custom'
        ? buildRequestData(request.bodyType, request.formData)
        : request.data;
    }

    const historyEntry = Immutable.fromJS(request)
      .set('url', resource)
      .set('id', createUUID());

    yield put(pushHistory(historyEntry));

    const beforeTime = yield call(getBeforeTime);

    const response = yield call(fetch, resource, {
      method: request.method,
      redirect: 'follow',
      body,
      headers,
      credentials: 'include', // Include cookies
      cache: ignoreCache ? 'no-store' : 'default',
    });

    const millisPassed = yield call(getMillisPassed, beforeTime);

    const responseHeaders = buildResponseHeaders(response);
    const responseBody = yield apply(response, response.text);

    yield put(receiveResponse({
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      body: responseBody,
      headers: responseHeaders,
      method: request.method,
      totalTime: millisPassed,
    }));
  } catch (error) {
    yield put({ type: REQUEST_FAILED, error });
  }
}

function* selectRequest({ request }) {
  yield put(initialize(requestForm, request));
  yield call(focusUrlField);
}

function setContentType(array, value) {
  const index = array.findIndex(item => item.name === 'Content-Type');

  // Replace any existing Content-Type headers
  if (index > -1) {
    return [
      ...array.slice(0, index),
      { name: 'Content-Type', value },
      ...array.slice(index + 1),
    ];
  }

  // When the last row is empty, overwrite it instead of pushing
  const lastItem = array.length >= 1
    ? array[array.length - 1]
    : null;
  if (lastItem && !lastItem.name) {
    return [
      ...array.slice(0, array.length - 1),
      { name: 'Content-Type', value },
    ];
  }

  return [
    ...array,
    { name: 'Content-Type', value },
  ];
}

export function* changeBodyTypeSaga({ bodyType }) {
  let headers = yield select(getHeaders);
  switch (bodyType) {
    case 'multipart':
      headers = setContentType(headers, 'multipart/form-data');
      break;
    case 'urlencoded':
      headers = setContentType(headers, 'application/x-www-form-urlencoded');
      break;
    case 'json':
      headers = setContentType(headers, 'application/json');
      break;
    case 'custom':
      break;
    default:
      throw new Error(`Body type ${bodyType} is not supported`);
  }
  yield put(change(requestForm, 'headers', headers));
  // For persistence on load
  yield put(updateOption('bodyType', bodyType));
}

export default function* rootSaga() {
  yield takeLatest(SEND_REQUEST, fetchData);
  yield takeEvery(SELECT_REQUESTED, selectRequest);
  yield takeEvery(CHANGE_BODY_TYPE, changeBodyTypeSaga);
}

