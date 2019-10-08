import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toggleListOfAvailableFeaturesModal,
  deleteFeaturesFromReleases,
  selectRow,
} from 'reducers/Releases/releasesModalsReducer';

import { fetchFeatures, createFeature } from 'reducers/Features/featuresPanelReducer';
import { fetchReleases } from 'reducers/Releases/releasesPanelReducer';
import ListOfAvailableFeaturesModal from './listOfAvailableFeaturesModal';

const mapStateToProps = state => ({
  isListOfAvailableFeaturesModal: state.releasesModal.isListOfAvailableFeaturesModal,
  features: state.featuresPanel.features,
  TfsReleaseId: state.releasesModal.TfsReleaseId,
  isLoadingFeaturesTable: state.featuresPanel.isLoadingFeaturesTable,
  record: state.releasesModal.releasesModalState.record,
  selectedRow: state.releasesModal.selectedRow,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleListOfAvailableFeaturesModal,
      deleteFeaturesFromReleases,
      fetchFeatures,
      selectRow,
      createFeature,
      fetchReleases,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfAvailableFeaturesModal);
