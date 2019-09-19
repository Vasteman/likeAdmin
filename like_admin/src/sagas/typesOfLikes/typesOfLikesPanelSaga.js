import { call, put, select } from 'redux-saga/effects';
import moment from 'moment';
import { notification } from 'antd';
import api from 'utils/api';

import {
  FETCH_TYPES_OF_LIKES,
  FETCH_TYPES_OF_LIKES_SUCCESS,
  FETCH_TYPES_OF_LIKES_ERROR, // error fe
  FETCH_TYPES_OF_LIKES_FAILURE, // error be
  SELECT_ROW_OF_TYPES_OF_LIKES_TABLE,
  // create type of like
  CREATE_TYPE_OF_LIKE_SUCCESS,
  CREATE_TYPE_OF_LIKE_ERROR,
  CREATE_TYPE_OF_LIKE_FAILURE,
  // delete type of like
  DELETE_TYPE_OF_LIKE_SUCCESS,
  DELETE_TYPE_OF_LIKE_ERROR,
  DELETE_TYPE_OF_LIKE_FAILURE,
} from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';

const { fetchTypesOfLikes, createTypeOfLike, deleteTypeOfLike } = api;

export const getAdminCategoriesPanelSelectedRow = state => state.typesOfLikesPanel.selectedRow;

export function* fetchTypesOfLikesSaga() {
  const selectedRow = yield select(getAdminCategoriesPanelSelectedRow);

  try {
    const { data } = yield call(fetchTypesOfLikes, {});
    const { Data: typesOfLikes } = data; // typesOfLikes - renaming

    if (data.IsSuccess) {
      yield put({ type: FETCH_TYPES_OF_LIKES_SUCCESS, payload: { typesOfLikes } });

      if (Object.keys(selectedRow).length > 0) {
        console.log('selectedRow777', selectedRow);
        const isSelectedRowExistInCategories = typesOfLikes.find(
          item => item.TypeId === selectedRow.key
        );

        yield put({
          type: SELECT_ROW_OF_TYPES_OF_LIKES_TABLE,
          payload: { selectedRow: null, newType: isSelectedRowExistInCategories || {} },
        });
      }
      // console.log('payload', payload);
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

export function* createTypeOfLikeSaga({ payload }) {
  try {
    console.log('payload', payload);

    const { data } = yield call(createTypeOfLike, payload);

    if (data.IsSuccess) {
      yield put({ type: CREATE_TYPE_OF_LIKE_SUCCESS });
      notification.success({
        message: 'Типы лайков',
        description: 'Тип лайка успешно создан!',
      });
      yield put({ type: FETCH_TYPES_OF_LIKES });
    } else {
      yield put({ type: CREATE_TYPE_OF_LIKE_ERROR });
    }
  } catch (ex) {
    yield put({ type: CREATE_TYPE_OF_LIKE_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка ${moment().format('HH:mm DD.MM.YYYY')}`,
      description: ex,
    });
  }
}

export function* deleteTypeOfLikeSaga({ payload }) {
  try {
    console.log('payload delete', payload);

    const { data } = yield call(deleteTypeOfLike, payload);

    if (data.IsSuccess) {
      yield put({ type: DELETE_TYPE_OF_LIKE_SUCCESS });
      yield put({ type: FETCH_TYPES_OF_LIKES });
      notification.success({
        message: 'Типы лайков',
        description: 'Тип лайка успешно удален!',
      });
    } else {
      yield put({ type: DELETE_TYPE_OF_LIKE_ERROR });
    }
  } catch (ex) {
    yield put({ type: DELETE_TYPE_OF_LIKE_FAILURE, message: ex.message });
    notification.error({
      message: `Ошибка ${moment().format('HH:mm DD.MM.YYYY')}`,
      description: ex,
    });
  }
}
