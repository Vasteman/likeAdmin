import { all, takeEvery } from 'redux-saga/effects';

import {
  FETCH_TYPES_OF_LIKES,
  CREATE_TYPE_OF_LIKE,
} from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';

import { fetchTypesOfLikesSaga, createTypeOfLikeSaga } from './typesOfLikesPanelSaga';

export default function*() {
  yield all([
    takeEvery(FETCH_TYPES_OF_LIKES, fetchTypesOfLikesSaga),
    takeEvery(CREATE_TYPE_OF_LIKE, createTypeOfLikeSaga),
  ]);
}
