import { handleActions, createAction } from 'redux-actions';

const initialState = {
  releases: [],
  selectedRow: {},
  fetchReleaseError: null,
  createReleaseError: null,
  deleteReleaseError: null,
  isLoadingReleasesTable: false,
};

export const FETCH_RELEASES = 'releases/FETCH_RELEASES';
export const FETCH_RELEASES_ERROR = 'releases/FETCH_RELEASES_ERROR';
export const FETCH_RELEASES_SUCCESS = 'releases/FETCH_RELEASES_SUCCESS';
export const FETCH_RELEASES_FAILURE = 'releases/FETCH_RELEASES_FAILURE';
export const fetchReleases = createAction(FETCH_RELEASES);

export const CREATE_RELEASE = 'releases/CREATE_RELEASE';
export const CREATE_RELEASE_ERROR = 'releases/CREATE_RELEASE_ERROR';
export const CREATE_RELEASE_SUCCESS = 'releases/CREATE_RELEASE_SUCCESS';
export const CREATE_RELEASE_FAILURE = 'releases/CREATE_RELEASE_FAILURE';
export const createRelease = createAction(CREATE_RELEASE);

export const DELETE_RELEASE = 'releases/DELETE_RELEASE';
export const DELETE_RELEASE_ERROR = 'releases/DELETE_RELEASE_ERROR';
export const DELETE_RELEASE_SUCCESS = 'releases/DELETE_RELEASE_SUCCESS';
export const DELETE_RELEASE_FAILURE = 'releases/DELETE_RELEASE_FAILURE';
export const deleteRelease = createAction(DELETE_RELEASE);

export const SELECT_ROW_OF_RELEASES_TABLE = 'releases/SELECT_ROW_OF_RELEASES_TABLE';
export const selectRow = createAction(SELECT_ROW_OF_RELEASES_TABLE);

export default handleActions(
  {
    [FETCH_RELEASES]: state => {
      return {
        ...state,
        releases: null,
        isLoadingReleasesTable: true,
      };
    },

    [FETCH_RELEASES_SUCCESS]: (state, { payload: { releases } }) => {
      return {
        ...state,
        releases,
        isLoadingReleasesTable: false,
      };
    },

    [FETCH_RELEASES_ERROR]: (state, { message }) => {
      return {
        ...state,
        fetchReleaseError: message,
        isLoadingReleasesTable: true,
      };
    },

    [FETCH_RELEASES_FAILURE]: (state, { message }) => {
      return {
        ...state,
        fetchReleaseError: message,
        isLoadingReleasesTable: true,
      };
    },
    [CREATE_RELEASE]: state => {
      return {
        ...state,
      };
    },

    [CREATE_RELEASE_SUCCESS]: state => {
      return {
        ...state,
      };
    },

    [CREATE_RELEASE_ERROR]: (state, { message }) => {
      return {
        ...state,
        createReleaseError: message,
      };
    },

    [CREATE_RELEASE_FAILURE]: (state, { message }) => {
      return {
        ...state,
        createReleaseError: message,
      };
    },

    [SELECT_ROW_OF_RELEASES_TABLE]: (state, { payload: { selectedRow } }) => {
      // console.log('newType', newType);
      console.log('selectedRow reducer', selectedRow);
      return {
        ...state,
        selectedRow,
      };
    },

    [DELETE_RELEASE]: state => {
      console.log('DELETE_RELEASE', state);
      return {
        ...state,
      };
    },

    [DELETE_RELEASE_SUCCESS]: state => {
      console.log('DELETE_RELEASE_SUCCESS');
      return {
        ...state,
      };
    },

    [DELETE_RELEASE_ERROR]: (state, { message }) => {
      return {
        ...state,
        deleteReleaseError: message,
      };
    },

    [DELETE_RELEASE_FAILURE]: (state, { message }) => {
      return {
        ...state,
        deleteReleaseError: message,
      };
    },
  },
  initialState
);
