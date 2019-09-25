import { all, takeEvery } from 'redux-saga/effects';

import {
  FETCH_RELEASES,
  // CREATE_FEATURE,
  // DELETE_FEATURE,
} from 'reducers/Releases/releasesPanelReducer';

import fetchReleasesSaga from './releasesPanelSaga';

export default function*() {
  yield all([takeEvery(FETCH_RELEASES, fetchReleasesSaga)]);
  // yield all([takeEvery(CREATE_FEATURE, createFeatureSaga)]);
  // yield all([takeEvery(DELETE_FEATURE, deleteFeatureSaga)]);
}
