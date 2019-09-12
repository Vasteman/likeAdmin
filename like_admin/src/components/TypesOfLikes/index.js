import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TypesOfLikesPanel from './TypesOfLikesPanel';

import { fetchTypesOfLikes } from '../../reducers/TypesOfLikes/typesOfLikesPanelReducer';

const mapStateToProps = state => {
  console.log('state', state);
  return {
    //  typesOfLikes: state.typesOfLikes,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchTypesOfLikes }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypesOfLikesPanel);
