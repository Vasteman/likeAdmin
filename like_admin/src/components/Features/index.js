import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFeatures } from 'reducers/Features/featuresPanelReducer';

import { toggleFeaturesModal } from 'reducers/Features/featuresModalReducer';
import featuresPanel from './featuresPanel';

const mapStateToProps = state => ({
  features: state.featuresPanel.features,
  isFeaturesModal: state.featuresModal.isFeaturesModal,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFeatures, toggleFeaturesModal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(featuresPanel);
