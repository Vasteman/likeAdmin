/* eslint-disable prettier/prettier */
import { handleActions, createAction } from 'redux-actions';

export const TOGGLE_RELEASE_MODAL = 'releases/TOGGLE_RELEASE_MODAL';
export const toggleReleaseModal = createAction(TOGGLE_RELEASE_MODAL);

export const TOGGLE_LIST_OF_AVAILABLE_FEATURES_MODAL = 'releases/TOGGLE_LIST_OF_AVAILABLE_FEATURES_MODAL';
export const toggleListOfAvailableFeaturesModal = createAction(TOGGLE_LIST_OF_AVAILABLE_FEATURES_MODAL);

const initialState = {
  isReleasesModal: false,
  isListOfAvailableFeaturesModal: false,
  releasesModalState: {},
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

    [TOGGLE_LIST_OF_AVAILABLE_FEATURES_MODAL]: (state) => {
        return {
          ...state,
          isListOfAvailableFeaturesModal: !state.isListOfAvailableFeaturesModal,
        };
    },
  },
  initialState
);
