import { FETCH_REQUESTED, PUSH_REQUESTED, CLEAR_REQUESTED, DELETE_REQUESTED } from './types';

export function fetchHistory() {
  return { type: FETCH_REQUESTED };
}

export function pushHistory(request) {
  return { type: PUSH_REQUESTED, request };
}

export function removeFromHistory(index) {
  return { type: DELETE_REQUESTED, index };
}

export function clearHistory() {
  return { type: CLEAR_REQUESTED };
}

