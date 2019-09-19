import { handleActions, createAction } from 'redux-actions';

export const TOGGLE_TYPES_OF_LIKES_MODAL = 'tol/TOGGLE_TYPES_OF_LIKES_MODAL';
export const toggleTypesOfLikesModal = createAction(TOGGLE_TYPES_OF_LIKES_MODAL);

const initialState = {
  isTypesOfLikesModal: false,
  typesOfLikesModalState: {},
};

export default handleActions(
  {
    // actions for typesOfLikesModal
    [TOGGLE_TYPES_OF_LIKES_MODAL]: (
      state,
      { payload: { action, typeId, typeName, status, author } }
    ) => {
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
          typeId,
          typeName,
          status,
          author,
        };
      }
      return { ...state };
    },
  },
  initialState
);
