import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import {

// } from 'reducers/TypesOfLikes/typesOfLikesPanelReducer';
import { toggleReleaseModal } from 'reducers/Releases/releasesModalReducer';
// import { createRelease } from 'reducers/';

import ReleasesModal from './releasesModal';

const mapStateToProps = state => ({
  releasesModalState: state.releasesModal.releasesModalState,
  isReleasesModal: state.releasesModal.isReleasesModal,
  selectedRow: state.releasesPanel.selectedRow,
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleReleaseModal }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleasesModal);
