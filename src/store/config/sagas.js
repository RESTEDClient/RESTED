import { put, select, takeEvery } from 'redux-saga/effects';
import { initialize } from 'redux-form';

import { requestForm } from 'components/Request';
import { isEditMode } from 'store/config/selectors';
import { TOGGLE_EDIT, TOGGLE_EDIT_REQUESTED } from './types';

export function* toggleEditSaga({ request } = {}) {
  yield put({ type: TOGGLE_EDIT, request });
  const editMode = yield select(isEditMode);

  if (editMode) {
    yield put(initialize(requestForm, request));
  }
}

export default function* rootSaga() {
  yield takeEvery(TOGGLE_EDIT_REQUESTED, toggleEditSaga);
}

