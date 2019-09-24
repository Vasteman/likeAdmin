import { combineReducers } from 'redux';

import typesOfLikesPanel from './TypesOfLikes/typesOfLikesPanelReducer';
import typesOfLikesModal from './TypesOfLikes/typesOfLikesModalReducer';
import featuresPanel from './Features/featuresPanelReducer';
import featuresModal from './Features/featuresModalReducer';

import userData from './Authorization';

const rootReducer = combineReducers({
  typesOfLikesPanel,
  typesOfLikesModal,
  featuresPanel,
  featuresModal,
  userData,
});

export default rootReducer;
