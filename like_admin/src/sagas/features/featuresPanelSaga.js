import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { notification } from 'antd';
import api from 'utils/api';

import {
  FETCH_FEATURES,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURES_ERROR, // error fe
  FETCH_FEATURES_FAILURE, // error be
  // SELECT_ROW_OF_TYPES_OF_LIKES_TABLE,
  CREATE_FEATURE_SUCCESS,
  CREATE_FEATURE_ERROR,
  CREATE_FEATURE_FAILURE,
} from 'reducers/Features/featuresPanelReducer';

const { fetchFeatures, createFeature } = api;

// export const getAdminCategoriesPanelSelectedRow = state => state.typesOfLikesPanel.selectedRow;

export function* fetchFeaturesSaga() {
  // const selectedRow = yield select(getAdminCategoriesPanelSelectedRow);

  try {
    const { data } = yield call(fetchFeatures, {});
    const { Data: features } = data; // typesOfLikes - renaming
    console.log('data', data);
    if (data.IsSuccess) {
      yield put({ type: FETCH_FEATURES_SUCCESS, payload: { features } });
    } else {
      yield put({ type: FETCH_FEATURES_ERROR, payload: {} });
    }
  } catch (ex) {
    yield put({ type: FETCH_FEATURES_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка ${moment().format('HH:mm DD.MM.YYYY')}`,
      description: ex,
    });
  }
}

export function* createFeatureSaga({ payload }) {
  try {
    console.log('payload', payload);

    const { data } = yield call(createFeature, payload);

    if (data.IsSuccess) {
      yield put({ type: CREATE_FEATURE_SUCCESS });
      notification.success({
        message: 'Типы лайков',
        description: 'Тип фичи успешно создан!',
      });
      yield put({ type: FETCH_FEATURES });
    } else {
      yield put({ type: CREATE_FEATURE_ERROR });
    }
  } catch (ex) {
    yield put({ type: CREATE_FEATURE_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка ${moment().format('HH:mm DD.MM.YYYY')}`,
      description: ex,
    });
  }
}
