import { handleActions, createAction } from 'redux-actions';

export const TOGGLE_FEATURES_MODAL = 'features/TOGGLE_FEATURES_MODAL';
export const toggleFeaturesModal = createAction(TOGGLE_FEATURES_MODAL);

const initialState = {
  isFeaturesModal: false,
  featuresModalState: {},
};

export default handleActions(
  {
    [TOGGLE_FEATURES_MODAL]: (state, { payload: { action } }) => {
      if (action === 'create') {
        return {
          ...state,
          isFeaturesModal: !state.isFeaturesModal,
          featuresModalState: { action },
        };
      }
      if (action === 'edit') {
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
