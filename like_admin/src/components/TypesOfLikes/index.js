import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleTypesOfLikesModal } from 'reducers/TypesOfLikes/typesOfLikesModalReducer';

import { fetchTypesOfLikes, selectRow } from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';

import TypesOfLikesPanel from './TypesOfLikesPanel';

const mapStateToProps = state => ({
  typesOfLikes: state.typesOfLikesPanel.typesOfLikes,
  typesOfLikesModalState: state.typesOfLikesPanel.typesOfLikesModalState,
  isTypesOfLikesModal: state.typesOfLikesModal.isTypesOfLikesModal,
  selectedRow: state.typesOfLikesPanel.selectedRow,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTypesOfLikes, toggleTypesOfLikesModal, selectRow }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypesOfLikesPanel);
