import Immutable from 'immutable';
import localforage from 'localforage';
import { select, put, call, takeEvery } from 'redux-saga/effects';

import getRequestIndexes from 'utils/getRequestIndexes';
import { TOGGLE_EDIT } from 'store/config/types';
import { toggleEditSaga } from 'store/config/sagas';
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
  TOGGLE_COLLAPSED,
  TOGGLE_COLLAPSED_REQUESTED,
  REORDER_REQUEST,
  REORDER_REQUEST_REQUESTED,
  REORDER_COLLECTION,
  REORDER_COLLECTION_REQUESTED,
  RENAME_COLLECTION,
  RENAME_COLLECTION_REQUESTED,
  RENAME_REQUEST,
  RENAME_REQUEST_REQUESTED,
  UPDATE_REQUEST,
  UPDATE_REQUEST_REQUESTED,
} from './types';
import { getCollections } from './selectors';
import { startFetch, receiveCollections } from './actions';

export function* updateLocalStorage() {
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
  yield put({ type: TOGGLE_EDIT });
}

function* toggleCollapsedSaga({ collectionIndex }) {
  yield put({ type: TOGGLE_COLLAPSED, collectionIndex });
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
  yield put({ type: TOGGLE_EDIT });
  yield call(updateLocalStorage);
}

export function* updateRequestSaga({ request }) {
  const collections = yield select(getCollections);
  const {
    collectionIndex,
    requestIndex,
  } = yield call(getRequestIndexes, request.id, collections);
  yield put({ type: UPDATE_REQUEST, request, collectionIndex, requestIndex });
  yield call(toggleEditSaga);
  yield call(updateLocalStorage);
}

export default function* rootSaga() {
  yield takeEvery(FETCH_REQUESTED, fetchCollectionsSaga);
  yield takeEvery(ADD_COLLECTION_REQUESTED, addCollectionSaga);
  yield takeEvery(DELETE_COLLECTION_REQUESTED, deleteCollectionSaga);
  yield takeEvery(DELETE_REQUEST_REQUESTED, deleteRequestSaga);
  yield takeEvery(TOGGLE_COLLAPSED_REQUESTED, toggleCollapsedSaga);
  yield takeEvery(ADD_REQUEST_REQUESTED, addRequestSaga);
  yield takeEvery(REORDER_REQUEST_REQUESTED, reorderRequestSaga);
  yield takeEvery(REORDER_COLLECTION_REQUESTED, reorderCollectionSaga);
  yield takeEvery(RENAME_REQUEST_REQUESTED, renameRequestSaga);
  yield takeEvery(RENAME_COLLECTION_REQUESTED, renameCollectionSaga);
  yield takeEvery(UPDATE_REQUEST_REQUESTED, updateRequestSaga);
}

