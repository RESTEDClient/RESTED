import Immutable from 'immutable';
import localforage from 'localforage';
import { select, put, call, takeEvery } from 'redux-saga/effects';

import {
  FETCH_REQUESTED,
  ADD_COLLECTION,
  ADD_COLLECTION_REQUESTED,
  DELETE_COLLECTION,
  DELETE_COLLECTION_REQUESTED,
  ADD_REQUEST,
  ADD_REQUEST_REQUESTED,
  DELETE_REQUEST,
  DELETE_REQUEST_REQUESTED,
  REORDER_REQUEST,
  REORDER_REQUEST_REQUESTED,
  REORDER_COLLECTION,
  REORDER_COLLECTION_REQUESTED,
  RENAME_COLLECTION,
  RENAME_COLLECTION_REQUESTED,
  RENAME_REQUEST,
  RENAME_REQUEST_REQUESTED,
} from './types';
import { getCollections } from './selectors';
import { startFetch, receiveCollections } from './actions';

function* updateLocalStorage() {
  const collections = (yield select(getCollections)).toJS();
  yield call(localforage.setItem, 'collections', collections);
}

function* fetchCollectionsSaga() {
  yield put(startFetch());

  let collections = yield call(localforage.getItem, 'collections');
  collections = Immutable.fromJS(collections) || Immutable.List();

  yield put(receiveCollections(collections));
}

function* addCollectionSaga({ requests }) {
  yield put({ type: ADD_COLLECTION, requests });
  yield call(updateLocalStorage);
}

function* deleteCollectionSaga({ collectionId }) {
  yield put({ type: DELETE_COLLECTION, collectionId });
  yield call(updateLocalStorage);
}

function* deleteRequestSaga({ collectionIndex, requestId }) {
  yield put({ type: DELETE_REQUEST, collectionIndex, requestId });
  yield call(updateLocalStorage);
}

function* addRequestSaga({ request, collectionIndex }) {
  yield put({ type: ADD_REQUEST, request, collectionIndex });
  yield call(updateLocalStorage);
}

function* reorderRequestSaga({ source, target }) {
  yield put({ type: REORDER_REQUEST, source, target });
  yield call(updateLocalStorage);
}

function* reorderCollectionSaga({ oldIndex, newIndex }) {
  yield put({ type: REORDER_COLLECTION, oldIndex, newIndex });
  yield call(updateLocalStorage);
}

function* renameCollectionSaga({ collectionIndex, name }) {
  yield put({ type: RENAME_COLLECTION, collectionIndex, name });
  yield call(updateLocalStorage);
}

function* renameRequestSaga({ collectionIndex, requestIndex, name }) {
  yield put({ type: RENAME_REQUEST, collectionIndex, requestIndex, name });
  yield call(updateLocalStorage);
}

export default function* rootSaga() {
  yield takeEvery(FETCH_REQUESTED, fetchCollectionsSaga);
  yield takeEvery(ADD_COLLECTION_REQUESTED, addCollectionSaga);
  yield takeEvery(DELETE_COLLECTION_REQUESTED, deleteCollectionSaga);
  yield takeEvery(DELETE_REQUEST_REQUESTED, deleteRequestSaga);
  yield takeEvery(ADD_REQUEST_REQUESTED, addRequestSaga);
  yield takeEvery(REORDER_REQUEST_REQUESTED, reorderRequestSaga);
  yield takeEvery(REORDER_COLLECTION_REQUESTED, reorderCollectionSaga);
  yield takeEvery(RENAME_REQUEST_REQUESTED, renameRequestSaga);
  yield takeEvery(RENAME_COLLECTION_REQUESTED, renameCollectionSaga);
}

