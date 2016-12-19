import Immutable from 'immutable';
import localforage from 'localforage';
import {
  FETCH_OPTIONS,
  RECEIVE_OPTIONS,
  UPDATE_OPTION,
} from './types';

export function startFetch() {
  return { type: FETCH_OPTIONS };
}

export function receiveOptions(collections) {
  return { type: RECEIVE_OPTIONS, collections };
}

// TODO Test
export function fetchOptions() {
  return dispatch => {
    dispatch(startFetch());

    return localforage
      .getItem('options')
      .then(options => dispatch(
        receiveOptions(Immutable.fromJS(options) || Immutable.Map())
      ));
  };
}

export function doUpdateOption(option, value) {
  return { type: UPDATE_OPTION, option, value };
}

// TODO Test
export function updateOption(option, value) {
  return (dispatch, getState) => {
    dispatch(doUpdateOption(option, value));

    return localforage
      .setItem('options', getState().options.get('options').toJS());
  };
}

