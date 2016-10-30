import {
  ADD_REQUEST,
  REORDER_REQUEST,
  REORDER_COLLECTION,
} from './types';

export function addRequest(request, collectionIndex) {
  return { type: ADD_REQUEST, request, collectionIndex };
}

export function reorderRequest(source, target) {
  return { type: REORDER_REQUEST, source, target };
}

export function reorderCollection(oldIndex, newIndex) {
  return { type: REORDER_COLLECTION, oldIndex, newIndex };
}

