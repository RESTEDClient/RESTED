import Immutable from 'immutable';
import localforage from 'localforage';
import { selectRequest as doSelectRequest } from 'store/request/actions';
import { getHistory } from './selectors';
import {
  FETCH_HISTORY,
  RECEIVE_HISTORY,
  PUSH_HISTORY,
  DELETE_ITEM,
  CLEAR_HISTORY,
} from './types';

export function startFetch() {
  return { type: FETCH_HISTORY };
}

export function receiveHistory(history) {
  return { type: RECEIVE_HISTORY, history };
}

// TODO Test
export function fetchHistory() {
  return dispatch => {
    dispatch(startFetch());

    return localforage
      .getItem('history')
      .then(history => dispatch(
        receiveHistory(Immutable.fromJS(history) || Immutable.List()),
      ));
  };
}

export function selectRequest(request) {
  return dispatch => {
    // dispatch history.setSelected ?
    // dispatch request.updateRequest
    dispatch(doSelectRequest(request));
  }
}

export function doPushHistory(request) {
  return { type: PUSH_HISTORY, request };
}

// TODO Test
export function pushHistory(request) {
  return (dispatch, getState) => {
    dispatch(doPushHistory(request));

    return updateLocalStorage(getState());
  };
}

export function doDeleteItem(index) {
  return { type: DELETE_ITEM, index };
}

// TODO Test
export function deleteItem(index) {
  return (dispatch, getState) => {
    dispatch(doPushHistory(index));

    return updateLocalStorage(getState());
  };
}

export function doClearHistory() {
  return { type: CLEAR_HISTORY };
}

// TODO Test
export function clearHistory() {
  return (dispatch, getState) => {
    dispatch(doClearHistory());

    return updateLocalStorage(getState());
  };
}

function updateLocalStorage(state) {
  return localforage.setItem('history', getHistory(state).toJS());
}

