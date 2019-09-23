import { handleActions, createAction } from 'redux-actions';

const initialState = {
  features: [],
  selectedRow: {},
};

export const FETCH_FEATURES = 'features/FETCH_FEATURES';
export const FETCH_FEATURES_ERROR = 'features/FETCH_TYPES_OF_LIKES_ERROR';
export const FETCH_FEATURES_SUCCESS = 'features/FETCH_TYPES_OF_LIKES_SUCCESS';
export const FETCH_FEATURES_FAILURE = 'features/FETCH_TYPES_OF_LIKES_FAILURE';
export const fetchFeatures = createAction(FETCH_FEATURES);

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
  },
  initialState
);
