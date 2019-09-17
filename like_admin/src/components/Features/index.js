import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import featuresPanel from './featuresPanel';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(featuresPanel);
