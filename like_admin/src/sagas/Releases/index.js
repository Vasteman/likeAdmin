import { all, takeEvery } from 'redux-saga/effects';

import {
  FETCH_RELEASES,
  CREATE_RELEASE,
  DELETE_RELEASE,
} from 'reducers/Releases/releasesPanelReducer';

import { fetchReleasesSaga, deleteReleasesSaga, createReleasesSaga } from './releasesPanelSaga';

export default function*() {
  yield all([takeEvery(FETCH_RELEASES, fetchReleasesSaga)]);
  yield all([takeEvery(DELETE_RELEASE, deleteReleasesSaga)]);
  yield all([takeEvery(CREATE_RELEASE, createReleasesSaga)]);
}
