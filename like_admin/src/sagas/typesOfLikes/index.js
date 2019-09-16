import { all, takeEvery } from 'redux-saga/effects';

import { FETCH_TYPES_OF_LIKES } from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';
import fetchTypesOfLikesSaga from './typesOfLikesPanelSaga';

export default function*() {
  yield all([takeEvery(FETCH_TYPES_OF_LIKES, fetchTypesOfLikesSaga)]);
}
