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
  const options = yield call(localforage.getItem, 'options');
  yield put(receiveOptions(Immutable.fromJS(options) || Immutable.Map()));
}

function* updateOptionSaga({ option, value }) {
  yield put({ type: UPDATE_OPTION, option, value });
  yield call(updateLocalStorage);
}

export default function* rootSaga() {
  yield takeEvery(FETCH_REQUESTED, fetchOptionsSaga);
  yield takeEvery(UPDATE_REQUESTED, updateOptionSaga);
}

