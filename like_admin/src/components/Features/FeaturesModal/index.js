import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import {

// } from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';
import { toggleFeaturesModal } from 'reducers//Features/featuresModalReducer';
// import { createTypeOfLike } from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';

import FeaturesModal from './featuresModal';

const mapStateToProps = state => ({
  isFeaturesModal: state.featuresModal.isFeaturesModal,
  featuresModalState: state.featuresModal.featuresModalState,
  // typesOfLikes: state.typesOfLikesPanel.typesOfLikes,
  // selectedRow: state.typesOfLikesPanel.selectedRow,
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleFeaturesModal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturesModal);
