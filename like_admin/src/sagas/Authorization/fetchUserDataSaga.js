import { call, put } from 'redux-saga/effects';
import api from 'utils/api';

import {
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_ERROR, // error fe
  FETCH_USER_DATA_FAILURE, // error be
} from 'reducers/Authorization';

const { fetchUserDataApi } = api;

export default function* fetchUserDataSaga() {
  try {
    const { data } = yield call(fetchUserDataApi, {});
    // const { Data: {}}
    if (data.isSuccess) {
      yield put({ type: FETCH_USER_DATA_SUCCESS, payload: {} });
    } else {
      yield put({ type: FETCH_USER_DATA_ERROR, payload: data });
    }
  } catch (ex) {
    yield put({ type: FETCH_USER_DATA_FAILURE, message: ex.message });
  }
}
