import Immutable from 'immutable';
import localforage from 'localforage';
import { select, put, call, takeEvery } from 'redux-saga/effects';

import { FETCH_REQUESTED, UPDATE_REQUESTED, UPDATE_OPTION } from './types';
import { startFetch, receiveOptions } from './actions';
import { getOptions } from './selectors';

function* updateLocalStorage() {
  const options = (yield select(getOptions)).toJS();
  yield call(localforage.setItem, 'options', options.options);
}

function* fetchOptionsSaga() {
  yield put(startFetch());
  let options = yield call(localforage.getItem, 'options');

  // v1 -> v2 migration
  if (options && options.length && options[0].options) {
    options = options[0].options;
  }

  options = Immutable.fromJS(options) || Immutable.Map();
  yield put(receiveOptions(options));
}

function* updateOptionSaga({ option, value }) {
  yield put({ type: UPDATE_OPTION, option, value });
  yield call(updateLocalStorage);
}

export default function* rootSaga() {
  yield takeEvery(FETCH_REQUESTED, fetchOptionsSaga);
  yield takeEvery(UPDATE_REQUESTED, updateOptionSaga);
}

