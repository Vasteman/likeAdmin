import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createRelease } from 'reducers/Releases/releasesPanelReducer'; // вместо этого нужен другой метод, для связи релиза с фичами
import { toggleListOfAvailableFeaturesModal } from 'reducers/Releases/releasesModalsReducer';
import { fetchFeatures, selectRow } from 'reducers/Features/featuresPanelReducer';

import ListOfAvailableFeaturesModal from './listOfAvailableFeaturesModal';

const mapStateToProps = state => ({
  isListOfAvailableFeaturesModal: state.releasesModal.isListOfAvailableFeaturesModal,
  features: state.featuresPanel.features,
  selectedRow: state.featuresPanel.selectedRow,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleListOfAvailableFeaturesModal,
      fetchFeatures,
      selectRow,
      createRelease,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfAvailableFeaturesModal);
