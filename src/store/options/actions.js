import {
  FETCH_REQUESTED,
  FETCH_OPTIONS,
  RECEIVE_OPTIONS,
  UPDATE_REQUESTED,
} from './types';

export function startFetch() {
  return { type: FETCH_OPTIONS };
}

export function receiveOptions(collections) {
  return { type: RECEIVE_OPTIONS, collections };
}

// TODO Test
export function fetchOptions() {
  return { type: FETCH_REQUESTED };
}

// TODO Test
export function updateOption(option, value) {
  return { type: UPDATE_REQUESTED, option, value };
}

