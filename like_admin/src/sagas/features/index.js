import { all, takeEvery } from 'redux-saga/effects';

import { FETCH_FEATURES } from 'reducers/Features/featuresPanelReducer';

import fetchFeaturesSaga from './featuresPanelSaga';

export default function*() {
  yield all([takeEvery(FETCH_FEATURES, fetchFeaturesSaga)]);
}
