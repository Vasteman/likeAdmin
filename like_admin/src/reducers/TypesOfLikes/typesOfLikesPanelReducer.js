import { handleActions, createAction } from 'redux-actions';

const initialState = {
  typesOfLikes: [],
  typesOfLikesModalState: {},
  isTypesOfLikesModal: false,
};

export const FETCH_TYPES_OF_LIKES = 'tol/FETCH_TYPES_OF_LIKES';
export const FETCH_TYPES_OF_LIKES_ERROR = 'tol/FETCH_TYPES_OF_LIKES_ERROR';
export const FETCH_TYPES_OF_LIKES_SUCCESS = 'tol/FETCH_TYPES_OF_LIKES_SUCCESS';
export const FETCH_TYPES_OF_LIKES_FAILURE = 'tol/FETCH_TYPES_OF_LIKES_FAILURE';

export const fetchTypesOfLikes = createAction(FETCH_TYPES_OF_LIKES);

export const TOGGLE_TYPES_OF_LIKES_MODAL = 'tol/TOGGLE_TYPES_OF_LIKES_MODAL';
export const toggleTypesOfLikesModal = createAction(TOGGLE_TYPES_OF_LIKES_MODAL);

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

    // actions for typesOfLikesModal
    [TOGGLE_TYPES_OF_LIKES_MODAL]: (state, { payload: { action } }) => {
      console.log('action', action);
      if (action === 'create') {
        return {
          ...state,
          isTypesOfLikesModal: !state.isTypesOfLikesModal,
          typesOfLikesModalState: { action },
        };
      }
      if (action === 'edit') {
        return {
          ...state,
          isTypesOfLikesModal: !state.isTypesOfLikesModal,
          typesOfLikesModalState: { action },
        };
      }
      return { ...state };
    },
  },

  initialState
);
