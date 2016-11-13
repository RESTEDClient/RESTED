import Immutable from 'immutable';
import { collections as collectionDB } from '../../utils/db';
import { getCollections } from './selectors';
import {
  FETCH_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  ADD_REQUEST,
  DELETE_REQUEST,
  REORDER_REQUEST,
  REORDER_COLLECTION,
} from './types';

export function startFetch() {
  return { type: FETCH_COLLECTIONS };
}

export function receiveCollections(collections) {
  return { type: RECEIVE_COLLECTIONS, collections };
}

// TODO Test
export function fetchCollections() {
  return dispatch => {
    dispatch(startFetch());

    return collectionDB
      .get()
      .then(collections => dispatch(
        receiveCollections(Immutable.fromJS(collections))
      ));
      // TODO .catch and show error modal
  };
}

export function doAddCollection() {
  return { type: ADD_COLLECTION };
}

// TODO Test
export function addCollection() {
  return (dispatch, getState) => {
    dispatch(doAddCollection());
    collectionDB.replace(
      dispatch,
      getCollections(getState()).toJS()
    );
  };
}

export function doDeleteCollection(collectionId) {
  return { type: DELETE_COLLECTION, collectionId };
}

// TODO Test
export function deleteCollection(collectionId) {
  return (dispatch, getState) => {
    dispatch(doDeleteCollection(collectionId));
    collectionDB.replace(
      dispatch,
      getCollections(getState()).toJS()
    );
  };
}

export function doDeleteRequest(requestId, collectionIndex) {
  return { type: DELETE_REQUEST, requestId, collectionIndex };
}

// TODO Test
export function deleteRequest(requestId, collectionIndex) {
  return (dispatch, getState) => {
    dispatch(doDeleteRequest(requestId, collectionIndex));

    collectionDB.replace(
      dispatch,
      getCollections(getState()).toJS()
    );
  };
}

export function doAddRequest(request, collectionIndex) {
  return { type: ADD_REQUEST, request, collectionIndex };
}

// TODO Test
export function addRequest(request, collectionIndex) {
  return (dispatch, getState) => {
    dispatch(doAddRequest(request, collectionIndex));

    collectionDB.replace(
      dispatch,
      getCollections(getState()).toJS()
    );
  };
}

export function doReorderRequest(source, target) {
  return { type: REORDER_REQUEST, source, target };
}

// TODO Test
export function reorderRequest(source, target) {
  return (dispatch, getState) => {
    dispatch(doReorderRequest(source, target));

    collectionDB.replace(
      dispatch,
      getCollections(getState()).toJS()
    );
  };
}

export function doReorderCollection(oldIndex, newIndex) {
  return { type: REORDER_COLLECTION, oldIndex, newIndex };
}

// TODO Test
export function reorderCollection(oldIndex, newIndex) {
  return (dispatch, getState) => {
    dispatch(doReorderCollection(oldIndex, newIndex));

    collectionDB.replace(
      dispatch,
      getCollections(getState()).toJS()
    );
  };
}

