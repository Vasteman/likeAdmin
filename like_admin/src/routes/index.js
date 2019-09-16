import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUserData } from 'reducers/Authorization';
import Routes from './Routes';

const mapStateToProps = state => ({
  user: state.userData.user,
  authorizationError: state.userData.authorizationError,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchUserData }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
