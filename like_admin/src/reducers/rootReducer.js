import { combineReducers } from 'redux';

import typesOfLikesPanel from './TypesOfLikes/typesOfLikesPanelReducer';
import userData from './Authorization';

const rootReducer = combineReducers({
  typesOfLikesPanel,
  userData,
});

export default rootReducer;
