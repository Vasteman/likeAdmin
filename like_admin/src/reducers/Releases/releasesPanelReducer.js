import { handleActions, createAction } from 'redux-actions';

const initialState = {
  releases: [],
  selectedRow: {},
  isCreateReleaseError: false,
  isDeleteReleaseError: false,
};

export const FETCH_RELEASES = 'releases/FETCH_RELEASES';
export const FETCH_RELEASES_ERROR = 'releases/FETCH_RELEASES_ERROR';
export const FETCH_RELEASES_SUCCESS = 'releases/FETCH_RELEASES_SUCCESS';
export const FETCH_RELEASES_FAILURE = 'releases/FETCH_RELEASES_FAILURE';
export const fetchReleases = createAction(FETCH_RELEASES);

export default handleActions(
  {
    [FETCH_RELEASES]: state => {
      return {
        ...state,
        releases: null,
      };
    },

    [FETCH_RELEASES_SUCCESS]: (state, { payload: { releases } }) => {
      return {
        ...state,
        releases,
      };
    },

    [FETCH_RELEASES_ERROR]: (state, { payload: { data } }) => {
      return {
        ...state,
        releases: data,
      };
    },

    [FETCH_RELEASES_FAILURE]: (state, { payload: { data } }) => {
      return {
        ...state,
        releases: data,
      };
    },
  },
  initialState
);
