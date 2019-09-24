import { all, takeEvery } from 'redux-saga/effects';

import { FETCH_FEATURES, CREATE_FEATURE } from 'reducers/Features/featuresPanelReducer';

import { fetchFeaturesSaga, createFeatureSaga } from './featuresPanelSaga';

export default function*() {
  yield all([takeEvery(FETCH_FEATURES, fetchFeaturesSaga)]);
  yield all([takeEvery(CREATE_FEATURE, createFeatureSaga)]);
}
