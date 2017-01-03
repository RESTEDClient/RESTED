import Immutable from 'immutable';
import localforage from 'localforage';
import {
  FETCH_URL_VARIABLES,
  RECEIVE_URL_VARIABLES,
  ADD_URL_VARIABLE,
  UPDATE_URL_VARIABLE,
  DELETE_URL_VARIABLE,
} from './types';

export function startFetch() {
  return { type: FETCH_URL_VARIABLES };
}

export function receiveUrlVariables(urlVariables) {
  return { type: RECEIVE_URL_VARIABLES, urlVariables };
}

// TODO Test
export function fetchUrlVariables() {
  return dispatch => {
    dispatch(startFetch());

    return localforage
      .getItem('urlVariables')
      .then(urlVariables => dispatch(
        receiveUrlVariables(Immutable.fromJS(urlVariables) || Immutable.List()),
      ));
  };
}

export function doAddTemplate() {
  return { type: ADD_URL_VARIABLE };
}

// TODO Test
export function addTemplate() {
  return (dispatch, getState) => {
    dispatch(doAddTemplate());

    return localforage
      .setItem(
        'urlVariables',
        getState().urlVariables.get('urlVariables').toJS(),
      );
  };
}

export function doUpdateTemplate(index, value) {
  return { type: UPDATE_URL_VARIABLE, index, value };
}

// TODO Test
export function updateTemplate(index, value) {
  return (dispatch, getState) => {
    dispatch(doUpdateTemplate(index, value));

    return localforage
      .setItem(
        'urlVariables',
        getState().urlVariables.get('urlVariables').toJS(),
      );
  };
}

export function doDeleteTemplate(index) {
  return { type: DELETE_URL_VARIABLE, index };
}

// TODO Test
export function deleteTemplate(index) {
  return (dispatch, getState) => {
    dispatch(doDeleteTemplate(index));

    return localforage
      .setItem(
        'urlVariables',
        getState().urlVariables.get('urlVariables').toJS(),
      );
  };
}

