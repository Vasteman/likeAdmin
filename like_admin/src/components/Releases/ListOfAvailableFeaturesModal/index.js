import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleListOfAvailableFeaturesModal } from 'reducers/Releases/releasesModalsReducer';
import { fetchFeatures, selectRow, createFeature } from 'reducers/Features/featuresPanelReducer';

import ListOfAvailableFeaturesModal from './listOfAvailableFeaturesModal';

const mapStateToProps = state => ({
  isListOfAvailableFeaturesModal: state.releasesModal.isListOfAvailableFeaturesModal,
  features: state.featuresPanel.features,
  TfsReleaseId: state.releasesModal.TfsReleaseId,
  isLoadingFeaturesTable: state.featuresPanel.isLoadingFeaturesTable,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleListOfAvailableFeaturesModal,
      fetchFeatures,
      selectRow,
      createFeature,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfAvailableFeaturesModal);
