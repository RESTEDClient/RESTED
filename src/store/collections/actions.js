import {
  FETCH_COLLECTIONS,
  RECEIVE_COLLECTIONS,
  FETCH_REQUESTED,
  ADD_COLLECTION_REQUESTED,
  DELETE_COLLECTION_REQUESTED,
  DELETE_REQUEST_REQUESTED,
  TOGGLE_COLLAPSED_REQUESTED,
  ADD_REQUEST_REQUESTED,
  REORDER_REQUEST_REQUESTED,
  REORDER_COLLECTION_REQUESTED,
  RENAME_COLLECTION_REQUESTED,
  RENAME_REQUEST_REQUESTED,
  UPDATE_REQUEST_REQUESTED,
} from './types';

export function startFetch() {
  return { type: FETCH_COLLECTIONS };
}

export function receiveCollections(collections) {
  return { type: RECEIVE_COLLECTIONS, collections };
}

// TODO Test
export function fetchCollections() {
  return { type: FETCH_REQUESTED };
}

// TODO Test
export function addCollection(requests) {
  return { type: ADD_COLLECTION_REQUESTED, requests };
}

// TODO Test
export function deleteCollection(collectionId) {
  return { type: DELETE_COLLECTION_REQUESTED, collectionId };
}

// TODO Test
export function deleteRequest(requestId, collectionIndex) {
  return { type: DELETE_REQUEST_REQUESTED, requestId, collectionIndex };
}

export function toggleCollapsed(collectionIndex) {
  return { type: TOGGLE_COLLAPSED_REQUESTED, collectionIndex };
}

// TODO Test
export function addRequest(request, collectionIndex) {
  return { type: ADD_REQUEST_REQUESTED, request, collectionIndex };
}

// TODO Test
export function reorderRequest(source, target) {
  return { type: REORDER_REQUEST_REQUESTED, source, target };
}

// TODO Test
export function reorderCollection(oldIndex, newIndex) {
  return { type: REORDER_COLLECTION_REQUESTED, oldIndex, newIndex };
}

// TODO Test
export function renameCollection(collectionIndex, name) {
  return { type: RENAME_COLLECTION_REQUESTED, collectionIndex, name };
}

// TODO Test
export function renameRequest(collectionIndex, requestIndex, name) {
  return {
    type: RENAME_REQUEST_REQUESTED,
    collectionIndex,
    requestIndex,
    name,
  };
}

export function updateRequest(request) {
  return { type: UPDATE_REQUEST_REQUESTED, request };
}

