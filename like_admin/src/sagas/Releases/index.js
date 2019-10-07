import { all, takeEvery } from 'redux-saga/effects';

import {
  FETCH_RELEASES,
  CREATE_RELEASE,
  DELETE_RELEASE,
} from 'reducers/Releases/releasesPanelReducer';

import { DELETE_FEATURES_FROM_RELEASES } from 'reducers/Releases/releasesModalsReducer';

import { fetchReleasesSaga, deleteReleasesSaga, createReleasesSaga } from './releasesPanelSaga';
import deleteFeaturesFromReleasesSaga from './releasesModalSaga';

export default function*() {
  yield all([
    takeEvery(FETCH_RELEASES, fetchReleasesSaga),
    takeEvery(DELETE_RELEASE, deleteReleasesSaga),
    takeEvery(CREATE_RELEASE, createReleasesSaga),
    takeEvery(DELETE_FEATURES_FROM_RELEASES, deleteFeaturesFromReleasesSaga),
  ]);
}
