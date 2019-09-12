import { handleActions, createAction } from 'redux-actions';

const initialState = {
  typesOfLikes: [],
};

export const FETCH_TYPES_OF_LIKES = 'tol/FETCH_TYPES_OF_LIKES';
export const FETCH_TYPES_OF_LIKES_ERROR = 'tol/FETCH_TYPES_OF_LIKES_ERROR';
export const FETCH_TYPES_OF_LIKES_SUCCESS = 'tol/FETCH_TYPES_OF_LIKES_SUCCESS';
export const FETCH_TYPES_OF_LIKES_FAILURE = 'tol/FETCH_TYPES_OF_LIKES_FAILURE';

export const fetchTypesOfLikes = createAction(FETCH_TYPES_OF_LIKES);

export default handleActions(
  {
    [FETCH_TYPES_OF_LIKES]: state => {
      return {
        ...state,
        typesOfLikes: null,
      };
    },

    [FETCH_TYPES_OF_LIKES_SUCCESS]: (state, { payload: { typesOfLikes } }) => {
      return {
        ...state,
        typesOfLikes,
      };
    },

    [FETCH_TYPES_OF_LIKES_ERROR]: (state, { payload: { data } }) => {
      return {
        ...state,
        typesOfLikesError: data,
      };
    },

    [FETCH_TYPES_OF_LIKES_FAILURE]: (state, { payload: { data } }) => {
      return {
        ...state,
        typesOfLikesError: data,
      };
    },
  },

  initialState
);
