/* eslint-disable prettier/prettier */
import { handleActions, createAction } from 'redux-actions';

export const TOGGLE_RELEASE_MODAL = 'releases/TOGGLE_RELEASE_MODAL';
export const toggleReleaseModal = createAction(TOGGLE_RELEASE_MODAL);

export const TOGGLE_LIST_OF_AVAILABLE_FEATURES_MODAL = 'releases/TOGGLE_LIST_OF_AVAILABLE_FEATURES_MODAL';
export const toggleListOfAvailableFeaturesModal = createAction(TOGGLE_LIST_OF_AVAILABLE_FEATURES_MODAL);

export const DELETE_FEATURES_FROM_RELEASES = 'releases/DELETE_FEATURES_FROM_RELEASES';
export const DELETE_FEATURES_FROM_RELEASES_ERROR = 'releases/DELETE_FEATURES_FROM_RELEASES_ERROR';
export const DELETE_FEATURES_FROM_RELEASES_SUCCESS = 'releases/DELETE_FEATURES_FROM_RELEASES_SUCCESS';
export const DELETE_FEATURES_FROM_RELEASES_FAILURE = 'releases/DELETE_FEATURES_FROM_RELEASES_FAILURE';
export const deleteFeaturesFromReleases = createAction(DELETE_FEATURES_FROM_RELEASES);

const initialState = {
  isReleasesModal: false,
  isListOfAvailableFeaturesModal: false,
  releasesModalState: {},
  deleteFeaturesFromReleasesError: null,
};

export default handleActions(
  {
    [TOGGLE_RELEASE_MODAL]: (state, { payload: { action } }) => {
      if (action === 'create') {
        return {
          ...state,
          isReleasesModal: !state.isReleasesModal,
          releasesModalState: { action },
        };
      }
      if (action === 'edit') {
        return {
          ...state,
          isReleasesModal: !state.isReleasesModal,
          releasesModalState: { action },
        };
      }
      return { ...state };
    },

    [TOGGLE_LIST_OF_AVAILABLE_FEATURES_MODAL]: (state, {payload: { record } }) => {
      console.log('record reducer', record);
        return {
          ...state,
          isListOfAvailableFeaturesModal: !state.isListOfAvailableFeaturesModal,
          releasesModalState: {record},
        };
    },

    [DELETE_FEATURES_FROM_RELEASES]: state => {
      return {
        ...state,
      };
    },

    [DELETE_FEATURES_FROM_RELEASES_SUCCESS]: state => {
      return {
        ...state,
      };
    },

    [DELETE_FEATURES_FROM_RELEASES_ERROR]: (state, { message }) => {
      return {
        ...state,
        deleteFeaturesFromReleasesError: message,
      };
    },

    [DELETE_FEATURES_FROM_RELEASES_FAILURE]: (state, { message }) => {
      return {
        ...state,
        deleteFeaturesFromReleasesError: message,
      };
    },
  },
  initialState
);
