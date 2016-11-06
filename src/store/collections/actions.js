import Immutable from 'immutable';
import { collections as collectionDB } from '../../utils/db';
import {
  FETCH_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  ADD_REQUEST,
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

export function addRequest(request, collectionIndex) {
  return { type: ADD_REQUEST, request, collectionIndex };
}

export function reorderRequest(source, target) {
  return { type: REORDER_REQUEST, source, target };
}

export function reorderCollection(oldIndex, newIndex) {
  return { type: REORDER_COLLECTION, oldIndex, newIndex };
}

