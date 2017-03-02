import { fork } from 'redux-saga/effects';
import requestSagas from './request/sagas';
import historySagas from './history/sagas';

export default function* rootSaga() {
  yield fork(requestSagas);
  yield fork(historySagas);
}

