import { all, takeEvery } from 'redux-saga/effects';

import {
  FETCH_TYPES_OF_LIKES,
  CREATE_TYPE_OF_LIKE,
  DELETE_TYPE_OF_LIKE,
  CHANGE_CHECKBOX_VALUE,
} from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';

import {
  fetchTypesOfLikesSaga,
  createTypeOfLikeSaga,
  deleteTypeOfLikeSaga,
  changeCheckBoxValueSaga,
} from './typesOfLikesPanelSaga';

export default function*() {
  yield all([
    takeEvery(FETCH_TYPES_OF_LIKES, fetchTypesOfLikesSaga),
    takeEvery(CREATE_TYPE_OF_LIKE, createTypeOfLikeSaga),
    takeEvery(DELETE_TYPE_OF_LIKE, deleteTypeOfLikeSaga),
    takeEvery(CHANGE_CHECKBOX_VALUE, changeCheckBoxValueSaga),
  ]);
}
