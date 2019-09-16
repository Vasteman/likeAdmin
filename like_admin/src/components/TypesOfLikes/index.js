import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TypesOfLikesPanel from './TypesOfLikesPanel';

import {
  fetchTypesOfLikes,
  toggleTypesOfLikesModal,
} from '../../reducers/TypesOfLikes/typesOfLikesPanelReducer';

const mapStateToProps = state => ({
  typesOfLikes: state.typesOfLikesPanel.typesOfLikes,
  typesOfLikesModalState: state.typesOfLikesPanel.typesOfLikesModalState,
  isTypesOfLikesModal: state.typesOfLikesPanel.isTypesOfLikesModal,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTypesOfLikes, toggleTypesOfLikesModal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypesOfLikesPanel);
