import { fork } from 'redux-saga/effects';
import requestSagas from './request/sagas';

export default function* rootSaga() {
  yield fork(requestSagas);
}

