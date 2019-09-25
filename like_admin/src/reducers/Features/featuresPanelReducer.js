import { handleActions, createAction } from 'redux-actions';

const initialState = {
  features: [],
  selectedRow: {},
  isCreateFeatureError: false,
  isDeleteFeatureError: false,
};

export const FETCH_FEATURES = 'features/FETCH_FEATURES';
export const FETCH_FEATURES_ERROR = 'features/FETCH_TYPES_OF_LIKES_ERROR';
export const FETCH_FEATURES_SUCCESS = 'features/FETCH_TYPES_OF_LIKES_SUCCESS';
export const FETCH_FEATURES_FAILURE = 'features/FETCH_TYPES_OF_LIKES_FAILURE';
export const fetchFeatures = createAction(FETCH_FEATURES);

export const CREATE_FEATURE = 'features/CREATE_FEATURE';
export const CREATE_FEATURE_ERROR = 'features/CREATE_FEATURE_ERROR';
export const CREATE_FEATURE_SUCCESS = 'features/CREATE_FEATURE_SUCCESS';
export const CREATE_FEATURE_FAILURE = 'features/CREATE_FEATURE_FAILURE';
export const createFeature = createAction(CREATE_FEATURE);

export const DELETE_FEATURE = 'features/DELETE_FEATURE';
export const DELETE_FEATURE_ERROR = 'features/DELETE_FEATURE_ERROR';
export const DELETE_FEATURE_SUCCESS = 'features/DELETE_FEATURE_SUCCESS';
export const DELETE_FEATURE_FAILURE = 'features/DELETE_FEATURE_FAILURE';
export const deleteFeature = createAction(DELETE_FEATURE);

export const SELECT_ROW_OF_FEATURES_TABLE = 'features/SELECT_ROW_OF_FEATURES_TABLE';
export const selectRow = createAction(SELECT_ROW_OF_FEATURES_TABLE);

export default handleActions(
  {
    [FETCH_FEATURES]: state => {
      return {
        ...state,
        features: null,
      };
    },

    [FETCH_FEATURES_SUCCESS]: (state, { payload: { features } }) => {
      return {
        ...state,
        features,
      };
    },

    [FETCH_FEATURES_ERROR]: (state, { payload: { data } }) => {
      return {
        ...state,
        features: data,
      };
    },

    [FETCH_FEATURES_FAILURE]: (state, { payload: { data } }) => {
      return {
        ...state,
        features: data,
      };
    },

    [CREATE_FEATURE]: state => {
      return {
        ...state,
      };
    },

    [CREATE_FEATURE_SUCCESS]: state => {
      return {
        ...state,
      };
    },

    [CREATE_FEATURE_ERROR]: (state, { payload: { data } }) => {
      return {
        ...state,
        isCreateFeatureError: data,
      };
    },

    [CREATE_FEATURE_FAILURE]: (state, { payload: { data } }) => {
      return {
        ...state,
        isCreateFeatureError: data,
      };
    },

    [SELECT_ROW_OF_FEATURES_TABLE]: (state, { payload: { selectedRow } }) => {
      // console.log('newType', newType);
      console.log('selectedRow reducer', selectedRow);
      return {
        ...state,
        selectedRow,
      };
    },

    [DELETE_FEATURE]: state => {
      console.log('DELETE_TYPE_OF_LIKE', state);
      return {
        ...state,
      };
    },

    [DELETE_FEATURE_SUCCESS]: state => {
      console.log('DELETE_FEATURE_SUCCESS');
      return {
        ...state,
      };
    },

    [DELETE_FEATURE_ERROR]: (state, { payload: { data } }) => {
      return {
        ...state,
        isDeleteFeatureError: data,
      };
    },

    [DELETE_FEATURE_FAILURE]: (state, { payload: { data } }) => {
      return {
        ...state,
        isDeleteFeatureError: data,
      };
    },
  },
  initialState
);
