import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchFeatures,
  selectRow,
  deleteFeature,
  createFeature,
} from 'reducers/Features/featuresPanelReducer';

import { toggleFeaturesModal } from 'reducers/Features/featuresModalReducer';

import featuresPanel from './featuresPanel';

const mapStateToProps = state => ({
  features: state.featuresPanel.features,
  isFeaturesModal: state.featuresModal.isFeaturesModal,
  selectedRow: state.featuresPanel.selectedRow,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchFeatures,
      toggleFeaturesModal,
      selectRow,
      deleteFeature,
      createFeature,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(featuresPanel);
