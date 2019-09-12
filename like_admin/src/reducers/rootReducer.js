import { combineReducers } from 'redux';

import typesOfLikes from './TypesOfLikes/typesOfLikesPanelReducer';

const rootReducer = combineReducers({
  typesOfLikes,
});

export default rootReducer;
