import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleReleaseModal } from 'reducers/Releases/releasesModalsReducer';
import { createRelease } from 'reducers/Releases/releasesPanelReducer';

import ReleasesModal from './releasesModal';

const mapStateToProps = state => ({
  releasesModalState: state.releasesModal.releasesModalState,
  isReleasesModal: state.releasesModal.isReleasesModal,
  selectedRow: state.releasesPanel.selectedRow,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleReleaseModal, createRelease }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleasesModal);
