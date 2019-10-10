import { call, put } from 'redux-saga/effects';
import { notification } from 'antd';
import api from 'utils/api';

import {
  FETCH_FEATURES,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURES_ERROR,
  FETCH_FEATURES_FAILURE,
  CREATE_FEATURE_SUCCESS,
  CREATE_FEATURE_ERROR,
  CREATE_FEATURE_FAILURE,
  DELETE_FEATURE_SUCCESS,
  DELETE_FEATURE_ERROR,
  DELETE_FEATURE_FAILURE,
} from 'reducers/Features/featuresPanelReducer';

import { FETCH_RELEASES } from 'reducers/Releases/releasesPanelReducer';

const { fetchFeatures, createFeature, deleteFeature } = api;

export function* fetchFeaturesSaga({ payload }) {
  try {
    const { data } = yield call(fetchFeatures, payload);

    if (data.IsSuccess) {
      const { Data: features } = data;
      yield put({ type: FETCH_FEATURES_SUCCESS, payload: { features } });
    } else {
      yield put({ type: FETCH_FEATURES_ERROR, payload: {} });
    }
  } catch (ex) {
    yield put({ type: FETCH_FEATURES_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка при получении данных!`,
      description: ex.message,
    });
  }
}

export function* createFeatureSaga({ payload }) {
  try {
    const { data } = yield call(createFeature, payload);

    if (data.IsSuccess) {
      yield put({ type: CREATE_FEATURE_SUCCESS });
      yield put({ type: FETCH_RELEASES });
      notification.success({
        message: 'Фичи',
        description: 'Фича добавлена!',
      });
      yield put({ type: FETCH_FEATURES });
    } else {
      yield put({ type: CREATE_FEATURE_ERROR });
      notification.error({
        message: `Ошибка`,
        description: 'Ошибка изменения данных!',
      });
    }
  } catch (ex) {
    yield put({ type: CREATE_FEATURE_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка!`,
      description: ex.message,
    });
  }
}

export function* deleteFeatureSaga({ payload }) {
  try {
    const { data } = yield call(deleteFeature, payload);

    if (data.IsSuccess) {
      yield put({ type: DELETE_FEATURE_SUCCESS });
      yield put({ type: FETCH_FEATURES });
      notification.success({
        message: 'Фичи',
        description: 'Фича успешно удалена!',
      });
    } else {
      yield put({ type: DELETE_FEATURE_ERROR });
      notification.error({
        message: `Ошибка`,
        description: 'Ошибка изменения данных!',
      });
    }
  } catch (ex) {
    yield put({ type: DELETE_FEATURE_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка`,
      description: ex.message,
    });
  }
}
