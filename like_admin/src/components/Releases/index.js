import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toggleReleaseModal,
  toggleListOfAvailableFeaturesModal,
} from 'reducers/Releases/releasesModalsReducer';

import {
  fetchReleases,
  selectRow,
  deleteRelease,
  createRelease,
} from 'reducers/Releases/releasesPanelReducer';

import ReleasesPanel from './releasesPanel';

const mapStateToProps = state => ({
  releases: state.releasesPanel.releases,
  isReleasesModal: state.releasesModal.isReleasesModal,
  isListOfAvailableFeaturesModal: state.releasesModal.isListOfAvailableFeaturesModal,
  selectedRow: state.releasesPanel.selectedRow,
  isLoadingReleasesTable: state.releasesPanel.isLoadingReleasesTable,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleReleaseModal,
      fetchReleases,
      selectRow,
      deleteRelease,
      createRelease,
      toggleListOfAvailableFeaturesModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReleasesPanel);
