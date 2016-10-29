export const SET_MODAL_DATA = 'modal/SET_MODAL_DATA';
export function setModalData(data) {
  return { type: SET_MODAL_DATA, data };
}

export const REMOVE_MODAL = 'modal/REMOVE_MODAL';
export function removeModal() {
  return { type: REMOVE_MODAL };
}

export const THROW_ERROR = 'modal/THROW_ERROR';
export function throwError(data) {
  return { type: THROW_ERROR, data };
}

export function errorHandler(event) {
  return throwError('An error occured when reading/writing to ' +
    `chrome.storage: ${JSON.stringify(event, ' ', 2)}`
  );
}
