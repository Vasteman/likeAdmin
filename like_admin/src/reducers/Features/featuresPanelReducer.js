import { handleActions, createAction } from 'redux-actions';

const initialState = {
  features: [],
  selectedRow: {},
  fetchFeaturesErrorInfo: null,
  createFeatureErrorInfo: null, // wtf
  deleteFeatureErrorInfo: null,
};

export const FETCH_FEATURES = 'features/FETCH_FEATURES';
export const FETCH_FEATURES_ERROR = 'features/FETCH_FEATURES_ERROR';
export const FETCH_FEATURES_SUCCESS = 'features/FETCH_FEATURES_SUCCESS';
export const FETCH_FEATURES_FAILURE = 'features/FETCH_FEATURES_FAILURE';
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

    [FETCH_FEATURES_ERROR]: (state, { message }) => {
      return {
        ...state,
        fetchFeaturesErrorInfo: message,
      };
    },

    [FETCH_FEATURES_FAILURE]: (state, { message }) => {
      return {
        ...state,
        fetchFeaturesErrorInfo: message,
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

    [CREATE_FEATURE_ERROR]: (state, { message }) => {
      return {
        ...state,
        createFeatureErrorInfo: message,
      };
    },

    [CREATE_FEATURE_FAILURE]: (state, { message }) => {
      return {
        ...state,
        createFeatureErrorInfo: message,
      };
    },

    [SELECT_ROW_OF_FEATURES_TABLE]: (state, { payload: { selectedRow } }) => {
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

    [DELETE_FEATURE_ERROR]: (state, { message }) => {
      return {
        ...state,
        deleteFeatureErrorInfo: message,
      };
    },

    [DELETE_FEATURE_FAILURE]: (state, { message }) => {
      return {
        ...state,
        deleteFeatureErrorInfo: message,
      };
    },
  },
  initialState
);
