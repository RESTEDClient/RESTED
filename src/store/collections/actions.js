import {
  ADD_REQUEST,
  REORDER_REQUEST,
} from './types';

export function addRequest(request, collectionId) {
  return { type: ADD_REQUEST, request, collectionId };
}

export function reorderRequest(source, target) {
  return { type: REORDER_REQUEST, source, target };
}

