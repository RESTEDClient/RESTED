import Immutable from 'immutable';
import localforage from 'localforage';
import { select, put, call, takeEvery } from 'redux-saga/effects';

import {
  FETCH_REQUESTED,
  ADD_REQUESTED,
  UPDATE_REQUESTED,
  DELETE_REQUESTED,
  ADD_URL_VARIABLE,
  UPDATE_URL_VARIABLE,
  DELETE_URL_VARIABLE,
} from './types';
import { getUrlVariables } from './selectors';
import { startFetch, receiveUrlVariables } from './actions';

function* updateLocalStorage() {
  const urlVariables = (yield select(getUrlVariables)).toJS();
  yield call(localforage.setItem, 'urlVariables', urlVariables);
}

function* fetchUrlVariablesSaga() {
  yield put(startFetch());

  let urlVariables = yield call(localforage.getItem, 'urlVariables');
  urlVariables = Immutable.fromJS(urlVariables) || Immutable.List();

  yield put(receiveUrlVariables(urlVariables));
}

function* addTemplateSaga() {
  yield put({ type: ADD_URL_VARIABLE });
  yield call(updateLocalStorage);
}

function* updateTemplateSaga({ index, value }) {
  yield put({ type: UPDATE_URL_VARIABLE, index, value });
  yield call(updateLocalStorage);
}

function* deleteTemplateSaga({ index }) {
  yield put({ type: DELETE_URL_VARIABLE, index });
  yield call(updateLocalStorage);
}

export default function* rootSaga() {
  yield takeEvery(FETCH_REQUESTED, fetchUrlVariablesSaga);
  yield takeEvery(ADD_REQUESTED, addTemplateSaga);
  yield takeEvery(UPDATE_REQUESTED, updateTemplateSaga);
  yield takeEvery(DELETE_REQUESTED, deleteTemplateSaga);
}

