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

function updateLocalStorage(state) {
  return localforage.setItem('history', getHistory(state).toJS());
}

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
  // TODO Don't use this dispatch "redirect", instead dspatch selectRequest
  // directly
  return dispatch => {
    dispatch(doSelectRequest(request));
  };
}

export function doPushHistory(request) {
  return { type: PUSH_HISTORY, request };
}

// TODO Test
export function pushHistory(request) {
  return (dispatch, getState) => (
    fetchHistory()(dispatch).then(() => {
      const lastRequest = getHistory(getState()).first();

      // Do not add the same request if sent several times
      if (lastRequest
      && lastRequest.url === request.get('url')
      && lastRequest.method === request.get('method')) {
        return null;
      }

      dispatch(doPushHistory(request));

      return updateLocalStorage(getState());
    })
  );
}

export function doRemoveFromHistory(index) {
  return { type: DELETE_ITEM, index };
}

// TODO Test
export function removeFromHistory(index) {
  return (dispatch, getState) => {
    dispatch(doRemoveFromHistory(index));

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

