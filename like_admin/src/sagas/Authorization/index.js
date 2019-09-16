import { all, takeEvery } from 'redux-saga/effects';

import { FETCH_USER_DATA } from 'reducers/Authorization';
import fetchUserDataSaga from './fetchUserDataSaga';

export default function*() {
  yield all([takeEvery(FETCH_USER_DATA, fetchUserDataSaga)]);
}
