import { combineReducers } from 'redux';

import typesOfLikesPanel from './TypesOfLikes/typesOfLikesPanelReducer';
import typesOfLikesModal from './TypesOfLikes/typesOfLikesModalReducer';

import featuresPanel from './Features/featuresPanelReducer';
import featuresModal from './Features/featuresModalReducer';

import releasesPanel from './Releases/releasesPanelReducer';
import releasesModal from './Releases/releasesModalsReducer';

import userData from './Authorization';

const rootReducer = combineReducers({
  typesOfLikesPanel,
  typesOfLikesModal,
  featuresPanel,
  featuresModal,
  releasesPanel,
  releasesModal,
  userData,
});

export default rootReducer;
