import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFeatures } from 'reducers/Features/featuresPanelReducer';

import featuresPanel from './featuresPanel';

const mapStateToProps = state => ({
  features: state.featuresPanel.features,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchFeatures }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(featuresPanel);
