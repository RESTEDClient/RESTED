import {
  SET_MODAL_DATA,
  REMOVE_MODAL,
  CLEAR_MODAL_DATA,
  THROW_ERROR,
} from './types';

export function setModalData(data) {
  return { type: SET_MODAL_DATA, data };
}

export function removeModal() {
  return { type: REMOVE_MODAL };
}

export function clearModalData() {
  return { type: CLEAR_MODAL_DATA };
}

export function throwError(data) {
  return { type: THROW_ERROR, data };
}

export function errorHandler(event) {
  return throwError('An error occured when reading/writing to ' +
    `chrome.storage: ${JSON.stringify(event, ' ', 2)}`,
  );
}
