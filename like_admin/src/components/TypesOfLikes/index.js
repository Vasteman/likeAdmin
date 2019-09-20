import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleTypesOfLikesModal } from 'reducers/TypesOfLikes/typesOfLikesModalReducer';

import {
  fetchTypesOfLikes,
  selectRow,
  deleteTypeOfLike,
  changeCheckBoxValue,
} from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';

import TypesOfLikesPanel from './TypesOfLikesPanel';

const mapStateToProps = state => ({
  typesOfLikes: state.typesOfLikesPanel.typesOfLikes, // state.название_из_rootReducer
  isTypesOfLikesModal: state.typesOfLikesModal.isTypesOfLikesModal,
  selectedRow: state.typesOfLikesPanel.selectedRow,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchTypesOfLikes,
      deleteTypeOfLike,
      changeCheckBoxValue,
      toggleTypesOfLikesModal,
      selectRow,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypesOfLikesPanel);
