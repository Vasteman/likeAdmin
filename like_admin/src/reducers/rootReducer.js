import { combineReducers } from 'redux';

import typesOfLikesPanel from './TypesOfLikes/typesOfLikesPanelReducer';
import typesOfLikesModal from './TypesOfLikes/typesOfLikesModalReducer';
import featuresPanel from './Features/featuresPanelReducer';
import userData from './Authorization';

const rootReducer = combineReducers({
  typesOfLikesPanel,
  typesOfLikesModal,
  featuresPanel,
  userData,
});

export default rootReducer;
