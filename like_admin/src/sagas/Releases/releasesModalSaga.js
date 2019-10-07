import { call, put } from 'redux-saga/effects';
import { notification } from 'antd';
import api from 'utils/api';

import {
  DELETE_FEATURES_FROM_RELEASES_SUCCESS,
  DELETE_FEATURES_FROM_RELEASES_ERROR,
  DELETE_FEATURES_FROM_RELEASES_FAILURE,
} from 'reducers/Releases/releasesModalsReducer';

const { deleteFeaturesFromReleases } = api;

export default function* deleteFeaturesFromReleasesSaga({ payload }) {
  try {
    const { data } = yield call(deleteFeaturesFromReleases, payload);
    if (data.IsSuccess) {
      yield put({ type: DELETE_FEATURES_FROM_RELEASES_SUCCESS });
      // yield put({ type: FETCH_RELEASES });
      notification.success({
        message: 'Релизы',
        description: 'Релиз успешно удален!',
      });
    } else {
      yield put({ type: DELETE_FEATURES_FROM_RELEASES_ERROR });
      notification.error({
        message: `Ошибка`,
        description: 'Ошибка изменения данных!',
      });
    }
  } catch (ex) {
    yield put({ type: DELETE_FEATURES_FROM_RELEASES_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка!`,
      description: ex.message,
    });
  }
}
