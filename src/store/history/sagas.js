import Immutable from 'immutable';
import localforage from 'localforage';
import { select, put, call, takeEvery } from 'redux-saga/effects';

import { getHistorySize } from 'store/options/selectors';
import {
  FETCH_REQUESTED,
  PUSH_REQUESTED,
  CLEAR_REQUESTED,
  DELETE_REQUESTED,
  FETCH_HISTORY,
  RECEIVE_HISTORY,
  PUSH_HISTORY,
  PRUNE_HISTORY,
  CLEAR_HISTORY,
  DELETE_ITEM,
} from './types';
import { getHistory } from './selectors';

function* updateLocalStorage() {
  const history = (yield select(getHistory)).toJS();
  yield call(localforage.setItem, 'history', history);
}

function* fetchHistorySaga() {
  yield put({ type: FETCH_HISTORY });
  let history = yield call(localforage.getItem, 'history');

  // v1 -> v2 migration
  if (history && history.length && history[0].requests) {
    history = history[0].requests;
  }

  history = Immutable.fromJS(history) || Immutable.List();
  yield put({ type: RECEIVE_HISTORY, history });
}

function* pushHistorySaga({ request }) {
  // Ensure history is loaded before fetching
  yield call(fetchHistorySaga);
  const lastRequest = (yield select(getHistory)).first();

  // Do not add the same request if sent several times
  if (lastRequest
  && lastRequest.get('url') === request.get('url')
  && lastRequest.get('method') === request.get('method')) {
    return;
  }

  yield put({ type: PUSH_HISTORY, request });
  const historySize = yield select(getHistorySize);
  yield put({ type: PRUNE_HISTORY, historySize });
  yield call(updateLocalStorage);
}

function* clearHistorySaga() {
  yield put({ type: CLEAR_HISTORY });
  yield call(updateLocalStorage);
}

function* removeFromHistorySaga({ index }) {
  yield put({ type: DELETE_ITEM, index });
  yield call(updateLocalStorage);
}

export default function* rootSaga() {
  yield takeEvery(FETCH_REQUESTED, fetchHistorySaga);
  yield takeEvery(PUSH_REQUESTED, pushHistorySaga);
  yield takeEvery(CLEAR_REQUESTED, clearHistorySaga);
  yield takeEvery(DELETE_REQUESTED, removeFromHistorySaga);
}

