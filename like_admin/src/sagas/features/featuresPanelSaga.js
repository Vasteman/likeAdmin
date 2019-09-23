import { call, put } from 'redux-saga/effects';
import moment from 'moment';
import { notification } from 'antd';
import api from 'utils/api';

import {
  // FETCH_FEATURES,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURES_ERROR, // error fe
  FETCH_FEATURES_FAILURE, // error be
  // SELECT_ROW_OF_TYPES_OF_LIKES_TABLE,
} from 'reducers/Features/featuresPanelReducer';

const { fetchFeatures } = api;

// export const getAdminCategoriesPanelSelectedRow = state => state.typesOfLikesPanel.selectedRow;

export default function* fetchFeaturesSaga() {
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
