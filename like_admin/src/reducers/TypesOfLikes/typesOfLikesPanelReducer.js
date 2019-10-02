import { handleActions, createAction } from 'redux-actions';

const initialState = {
  typesOfLikes: [],
  selectedRow: {},
  isCreateTypeError: false,
  isDeleteTypeError: false,
  isLoadingTypesOfLikesTable: false,
};

export const FETCH_TYPES_OF_LIKES = 'tol/FETCH_TYPES_OF_LIKES';
export const FETCH_TYPES_OF_LIKES_ERROR = 'tol/FETCH_TYPES_OF_LIKES_ERROR';
export const FETCH_TYPES_OF_LIKES_SUCCESS = 'tol/FETCH_TYPES_OF_LIKES_SUCCESS';
export const FETCH_TYPES_OF_LIKES_FAILURE = 'tol/FETCH_TYPES_OF_LIKES_FAILURE';
export const fetchTypesOfLikes = createAction(FETCH_TYPES_OF_LIKES);

export const SELECT_ROW_OF_TYPES_OF_LIKES_TABLE = 'tol/SELECT_ROW_OF_TYPES_OF_LIKES_TABLE';
export const selectRow = createAction(SELECT_ROW_OF_TYPES_OF_LIKES_TABLE);

// можно вынести в модалку позже
export const CREATE_TYPE_OF_LIKE = 'tol/CREATE_TYPE_OF_LIKE';
export const CREATE_TYPE_OF_LIKE_SUCCESS = 'tol/CREATE_TYPE_OF_LIKE_SUCCESS';
export const CREATE_TYPE_OF_LIKE_ERROR = 'tol/CREATE_TYPE_OF_LIKE_ERROR';
export const CREATE_TYPE_OF_LIKE_FAILURE = 'tol/CREATE_TYPE_OF_LIKE_FAILURE';
export const createTypeOfLike = createAction(CREATE_TYPE_OF_LIKE);
// действия с таблицей
export const DELETE_TYPE_OF_LIKE = 'tol/DELETE_TYPE_OF_LIKE';
export const DELETE_TYPE_OF_LIKE_SUCCESS = 'tol/DELETE_TYPE_OF_LIKE_SUCCESS';
export const DELETE_TYPE_OF_LIKE_ERROR = 'tol/DELETE_TYPE_OF_LIKE_ERROR';
export const DELETE_TYPE_OF_LIKE_FAILURE = 'tol/DELETE_TYPE_OF_LIKE_FAILURE';
export const deleteTypeOfLike = createAction(DELETE_TYPE_OF_LIKE);

export default handleActions(
  {
    [FETCH_TYPES_OF_LIKES]: state => {
      return {
        ...state,
        isLoadingTypesOfLikesTable: true,
        typesOfLikes: null,
      };
    },

    [FETCH_TYPES_OF_LIKES_SUCCESS]: (state, { payload: { typesOfLikes } }) => {
      return {
        ...state,
        typesOfLikes,
        isLoadingTypesOfLikesTable: false,
      };
    },

    [FETCH_TYPES_OF_LIKES_ERROR]: (state, { message }) => {
      return {
        ...state,
        typesOfLikesError: message,
        isLoadingTypesOfLikesTable: false,
      };
    },

    [FETCH_TYPES_OF_LIKES_FAILURE]: (state, { message }) => {
      return {
        ...state,
        typesOfLikesError: message,
        isLoadingTypesOfLikesTable: false,
      };
    },

    [SELECT_ROW_OF_TYPES_OF_LIKES_TABLE]: (state, { payload: { selectedRow } }) => {
      // console.log('newType', newType);
      console.log('selectedRow reducer', selectedRow);
      // if (!selectedRow && newType) {
      //   const newSelectedRow = {
      //     typeId: newType.TypeId,
      //     typeName: newType.EmojiName,
      //     author: newType.EmojiAuthor,
      //     status: newType.EmojiActive,
      //   };
      //   console.log('newSelectedRow', newSelectedRow);
      //   return {
      //     ...state,
      //     selectedRow: newSelectedRow,
      //   };
      // }
      // console.log('99999999', selectedRow);
      return {
        ...state,
        selectedRow,
      };
    },

    [CREATE_TYPE_OF_LIKE]: state => {
      // console.log('CREATE_TYPE_OF_LIKE', state);
      return {
        ...state,
      };
    },

    [CREATE_TYPE_OF_LIKE_SUCCESS]: state => {
      return {
        ...state,
      };
    },

    [CREATE_TYPE_OF_LIKE_ERROR]: (state, { message }) => {
      return {
        ...state,
        createTypeError: message,
      };
    },

    [CREATE_TYPE_OF_LIKE_FAILURE]: (state, { message }) => {
      return {
        ...state,
        createTypeError: message,
      };
    },

    [DELETE_TYPE_OF_LIKE]: state => {
      console.log('DELETE_TYPE_OF_LIKE', state);
      return {
        ...state,
      };
    },

    [DELETE_TYPE_OF_LIKE_SUCCESS]: state => {
      console.log('DELETE_TYPE_OF_LIKE_SUCCESS');
      return {
        ...state,
      };
    },

    [DELETE_TYPE_OF_LIKE_ERROR]: (state, { message }) => {
      return {
        ...state,
        deleteTypeError: message,
      };
    },

    [DELETE_TYPE_OF_LIKE_FAILURE]: (state, { message }) => {
      return {
        ...state,
        deleteTypeError: message,
      };
    },
  },
  initialState
);
