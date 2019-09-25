import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleReleaseModal } from 'reducers/Releases/releasesModalReducer';

import {
  fetchReleases,
  // selectRow,
  // deleteTypeOfLike,
  // createTypeOfLike,
} from 'reducers/Releases/releasesPanelReducer';

import ReleasesPanel from './releasesPanel';

const mapStateToProps = state => ({
  releases: state.releasesPanel.releases,
  isReleasesModal: state.releasesModal.isReleasesModal,
  selectedRow: state.releasesPanel.selectedRow,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleReleaseModal,
      fetchReleases,
      // deleteTypeOfLike,
      // createTypeOfLike,
      // selectRow,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleasesPanel);
