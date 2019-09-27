import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchFeatures,
  selectRow,
  deleteFeature,
  createFeature,
} from 'reducers/Features/featuresPanelReducer';

import { toggleFeaturesModal } from 'reducers/Features/featuresModalReducer';
import { fetchReleases } from 'reducers/Releases/releasesPanelReducer';

import featuresPanel from './featuresPanel';

const mapStateToProps = state => ({
  features: state.featuresPanel.features,
  isFeaturesModal: state.featuresModal.isFeaturesModal,
  selectedRow: state.featuresPanel.selectedRow,
  releases: state.releasesPanel.releases,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchFeatures,
      toggleFeaturesModal,
      selectRow,
      deleteFeature,
      createFeature,
      fetchReleases,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(featuresPanel);
