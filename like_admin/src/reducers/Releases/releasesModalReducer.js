import { handleActions, createAction } from 'redux-actions';

export const TOGGLE_RELEASE_MODAL = 'releases/TOGGLE_RELEASE_MODAL';
export const toggleReleaseModal = createAction(TOGGLE_RELEASE_MODAL);

const initialState = {
  isReleasesModal: false,
  releasesModalState: {},
};

export default handleActions(
  {
    // actions for typesOfLikesModal
    [TOGGLE_RELEASE_MODAL]: (state, { payload: { action } }) => {
      console.log('action features create', action);
      if (action === 'create') {
        return {
          ...state,
          isReleasesModal: !state.isReleasesModal,
          releasesModalState: { action },
        };
      }
      if (action === 'edit') {
        console.log('action features EDIT', action);
        return {
          ...state,
          isReleasesModal: !state.isReleasesModal,
          releasesModalState: { action },
        };
      }
      return { ...state };
    },
  },
  initialState
);
