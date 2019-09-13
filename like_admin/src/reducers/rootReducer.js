import { combineReducers } from 'redux';

import typesOfLikesPanel from './TypesOfLikes/typesOfLikesPanelReducer';

const rootReducer = combineReducers({
  typesOfLikesPanel,
});

export default rootReducer;
