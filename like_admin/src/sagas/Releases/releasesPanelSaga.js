import { call, put } from 'redux-saga/effects';
import { notification } from 'antd';
import api from 'utils/api';

import {
  FETCH_RELEASES,
  FETCH_RELEASES_SUCCESS,
  FETCH_RELEASES_ERROR,
  FETCH_RELEASES_FAILURE,
  DELETE_RELEASE_SUCCESS,
  DELETE_RELEASE_ERROR,
  DELETE_RELEASE_FAILURE,
  CREATE_RELEASE_SUCCESS,
  CREATE_RELEASE_ERROR,
  CREATE_RELEASE_FAILURE,
} from 'reducers/Releases/releasesPanelReducer';

const { fetchReleases, deleteReleases, createReleases } = api;

export function* fetchReleasesSaga({ payload }) {
  try {
    const { data } = yield call(fetchReleases, payload);
    if (data.IsSuccess) {
      const { Data: releases } = data;
      yield put({ type: FETCH_RELEASES_SUCCESS, payload: { releases } });
    } else {
      yield put({ type: FETCH_RELEASES_ERROR, payload: {} });
    }
  } catch (ex) {
    yield put({ type: FETCH_RELEASES_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка при получении данных!`,
      description: ex.message,
    });
  }
}

export function* deleteReleasesSaga({ payload }) {
  try {
    const { data } = yield call(deleteReleases, payload);
    if (data.IsSuccess) {
      yield put({ type: DELETE_RELEASE_SUCCESS });
      yield put({ type: FETCH_RELEASES });
      notification.success({
        message: 'Релизы',
        description: 'Релиз успешно удален!',
      });
    } else {
      yield put({ type: DELETE_RELEASE_ERROR });
      notification.error({
        message: `Ошибка`,
        description: 'Ошибка изменения данных!',
      });
    }
  } catch (ex) {
    yield put({ type: DELETE_RELEASE_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка!`,
      description: ex.message,
    });
  }
}

export function* createReleasesSaga({ payload }) {
  try {
    const { data } = yield call(createReleases, payload);

    if (data.IsSuccess) {
      yield put({ type: CREATE_RELEASE_SUCCESS });
      notification.success({
        message: 'Релизы',
        description: 'Релиз добавлен!',
      });
      yield put({ type: FETCH_RELEASES });
    } else {
      yield put({ type: CREATE_RELEASE_ERROR });
      notification.error({
        message: `Ошибка`,
        description: 'Ошибка изменения данных!',
      });
    }
  } catch (ex) {
    yield put({ type: CREATE_RELEASE_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка!`,
      description: ex.message,
    });
  }
}
