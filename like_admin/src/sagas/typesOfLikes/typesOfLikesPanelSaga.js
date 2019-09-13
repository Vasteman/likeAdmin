import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { notification } from 'antd';
import typesOfLikesPanel from '../../utils/typesOfLikes/typesOfLikesPanel';

import {
  FETCH_TYPES_OF_LIKES_SUCCESS,
  FETCH_TYPES_OF_LIKES_ERROR, // error fe
  FETCH_TYPES_OF_LIKES_FAILURE, // error be
} from '../../reducers/TypesOfLikes/typesOfLikesPanelReducer';

const { getLikeType } = typesOfLikesPanel;

export default function* fetchTypesOfLikesSaga() {
  try {
    const { data } = yield call(getLikeType, {});
    // const { Data: {}}
    if (data.isSuccess) {
      yield put({ type: FETCH_TYPES_OF_LIKES_SUCCESS, payload: {} });
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
