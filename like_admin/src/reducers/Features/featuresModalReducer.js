import { handleActions, createAction } from 'redux-actions';

export const TOGGLE_FEATURES_MODAL = 'features/TOGGLE_FEATURES_MODAL';
export const toggleFeaturesModal = createAction(TOGGLE_FEATURES_MODAL);

const initialState = {
  isFeaturesModal: false,
  featuresModalState: {},
};

export default handleActions(
  {
    // actions for typesOfLikesModal
    [TOGGLE_FEATURES_MODAL]: (state, { payload: { action } }) => {
      console.log('action features create', action);
      if (action === 'create') {
        return {
          ...state,
          isFeaturesModal: !state.isFeaturesModal,
          featuresModalState: { action },
        };
      }
      if (action === 'edit') {
        console.log('action features EDIT', action);
        return {
          ...state,
          isFeaturesModal: !state.isFeaturesModal,
          featuresModalState: { action },
        };
      }
      return { ...state };
    },
  },
  initialState
);
