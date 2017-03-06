import {
  RECEIVE_URL_VARIABLES,
  FETCH_URL_VARIABLES,
  FETCH_REQUESTED,
  ADD_REQUESTED,
  UPDATE_REQUESTED,
  DELETE_REQUESTED,
} from './types';

export function startFetch() {
  return { type: FETCH_URL_VARIABLES };
}

export function receiveUrlVariables(urlVariables) {
  return { type: RECEIVE_URL_VARIABLES, urlVariables };
}

// TODO Test
export function fetchUrlVariables() {
  return { type: FETCH_REQUESTED };
}

// TODO Test
export function addTemplate() {
  return { type: ADD_REQUESTED };
}

// TODO Test
export function updateTemplate(index, value) {
  return { type: UPDATE_REQUESTED, index, value };
}

// TODO Test
export function deleteTemplate(index) {
  return { type: DELETE_REQUESTED, index };
}

