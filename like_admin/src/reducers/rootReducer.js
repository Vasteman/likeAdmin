import { combineReducers } from 'redux';

import typesOfLikesPanel from './TypesOfLikes/typesOfLikesPanelReducer';
import typesOfLikesModal from './TypesOfLikes/typesOfLikesModalReducer';
import userData from './Authorization';

const rootReducer = combineReducers({
  typesOfLikesPanel,
  typesOfLikesModal,
  userData,
});

export default rootReducer;
