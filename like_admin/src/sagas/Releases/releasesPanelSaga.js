import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { notification } from 'antd';
import api from 'utils/api';

import {
  // FETCH_RELEASES,
  FETCH_RELEASES_SUCCESS,
  FETCH_RELEASES_ERROR, // error fe
  FETCH_RELEASES_FAILURE, // error be
  // SELECT_ROW_OF_TYPES_OF_LIKES_TABLE,
} from 'reducers/Releases/releasesPanelReducer';

const { fetchReleases } = api;

export default function* fetchReleasesSaga() {
  try {
    const { data } = yield call(fetchReleases, {});
    const { Data: features } = data; // typesOfLikes - renaming
    console.log('data', data);
    if (data.IsSuccess) {
      yield put({ type: FETCH_RELEASES_SUCCESS, payload: { features } });
    } else {
      yield put({ type: FETCH_RELEASES_ERROR, payload: {} });
    }
  } catch (ex) {
    yield put({ type: FETCH_RELEASES_FAILURE, message: ex.message });
    console.log('ERROOOOOOR');
    notification.error({
      message: `Ошибка ${moment().format('HH:mm DD.MM.YYYY')}`,
      description: ex,
    });
  }
}
