import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { notification } from 'antd';
// import typesOfLikesPanel from 'utils/entities/TypesOfLikes/typesOfLikesPanel';
import api from 'utils/api';

import {
  FETCH_TYPES_OF_LIKES_SUCCESS,
  FETCH_TYPES_OF_LIKES_ERROR, // error fe
  FETCH_TYPES_OF_LIKES_FAILURE, // error be
} from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';

const { fetchTypesOfLikes } = api;

export default function* fetchTypesOfLikesSaga() {
  try {
    const { data } = yield call(fetchTypesOfLikes, {});
    const { Data: typesOfLikes } = data; // typesOfLikes - renaming

    if (data.IsSuccess) {
      yield put({ type: FETCH_TYPES_OF_LIKES_SUCCESS, payload: { typesOfLikes } });
      console.log('done success');
    } else {
      yield put({ type: FETCH_TYPES_OF_LIKES_ERROR, payload: {} });
    }
  } catch (ex) {
    yield put({ type: FETCH_TYPES_OF_LIKES_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка ${moment().format('HH:mm DD.MM.YYYY')}`,
      description: ex,
    });
  }
}
