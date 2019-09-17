import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import {

// } from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';
import { toggleTypesOfLikesModal } from 'reducers/TypesOfLikes/typesOfLikesModalReducer';

import TypesOfLikesAdminModal from './TypesOfLikesAdminModal';

const mapStateToProps = state => ({
  isTypesOfLikesModal: state.typesOfLikesModal.isTypesOfLikesModal, //
  typesOfLikesModalState: state.typesOfLikesModal.typesOfLikesModalState,
  typesOfLikes: state.typesOfLikesPanel.typesOfLikes,
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleTypesOfLikesModal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypesOfLikesAdminModal);
