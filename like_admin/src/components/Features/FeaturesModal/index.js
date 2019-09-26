import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleFeaturesModal } from 'reducers//Features/featuresModalReducer';
import { createFeature } from 'reducers/Features/featuresPanelReducer';

import { fetchReleases } from 'reducers/Releases/releasesPanelReducer';
import FeaturesModal from './featuresModal';

const mapStateToProps = state => ({
  isFeaturesModal: state.featuresModal.isFeaturesModal,
  featuresModalState: state.featuresModal.featuresModalState,
  selectedRow: state.featuresPanel.selectedRow,
  releases: state.releasesPanel.releases,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleFeaturesModal, createFeature, fetchReleases }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturesModal);
