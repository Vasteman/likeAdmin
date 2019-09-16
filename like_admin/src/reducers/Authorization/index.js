import { handleActions, createAction } from 'redux-actions';

const initialState = {
  user: null,
  authorizationError: false,
};

export const FETCH_USER_DATA = 'user/FETCH_USER_DATA';
export const FETCH_USER_DATA_SUCCESS = 'user/FETCH_USER_SUCCESS';
export const FETCH_USER_DATA_ERROR = 'user/FETCH_USER_ERROR';
export const FETCH_USER_DATA_FAILURE = 'user/FETCH_USER_FAILURE';

export const fetchUserData = createAction(FETCH_USER_DATA);

export default handleActions(
  {
    [FETCH_USER_DATA]: state => {
      return {
        ...state,
        authorizationError: false,
      };
    },

    [FETCH_USER_DATA_SUCCESS]: state => {
      return {
        ...state,
        authorizationError: false,
      };
    },

    [FETCH_USER_DATA_ERROR]: state => {
      return {
        ...state,
        authorizationError: true,
        user: {},
      };
    },

    [FETCH_USER_DATA_FAILURE]: state => {
      // need?
      return {
        ...state,
        aauthorizationError: true,
        user: {},
      };
    },
  },

  initialState
);
