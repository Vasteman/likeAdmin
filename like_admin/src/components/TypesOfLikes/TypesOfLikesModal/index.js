import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import {

// } from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';
import { toggleTypesOfLikesModal } from 'reducers/TypesOfLikes/typesOfLikesModalReducer';
import { createTypeOfLike } from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';

import TypesOfLikesAdminModal from './TypesOfLikesAdminModal';

const mapStateToProps = state => ({
  isTypesOfLikesModal: state.typesOfLikesModal.isTypesOfLikesModal, //
  typesOfLikesModalState: state.typesOfLikesModal.typesOfLikesModalState,
  selectedRow: state.typesOfLikesPanel.selectedRow,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleTypesOfLikesModal, createTypeOfLike }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypesOfLikesAdminModal);
