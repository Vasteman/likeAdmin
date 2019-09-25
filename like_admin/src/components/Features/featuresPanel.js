import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import TopMenu from '../TopMenu';
import FeaturesTable from './featuresTable';
import FeaturesFilters from './featuresFilters';
import FeaturesModal from './FeaturesModal';

class FeaturesPanel extends Component {
  componentDidMount() {
    const { fetchFeatures } = this.props;
    fetchFeatures({});
  }

  onCreateFeature = () => {
    const { toggleFeaturesModal } = this.props;
    toggleFeaturesModal({ action: 'create' });
  };

  onEditFeature = () => {
    const { toggleFeaturesModal, selectedRow } = this.props;
    if (Object.keys(selectedRow).length !== 0) {
      toggleFeaturesModal({ action: 'edit' });
    }
  };

  onDeleteFeature = () => {
    const { deleteFeature, selectedRow } = this.props;
    if (Object.keys(selectedRow).length !== 0) {
      console.log('SELECTED ROW', selectedRow);
      deleteFeature({ featureId: selectedRow.featureId });
    }
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
  };

  onChangeCheckboxValue = record => {
    const { createFeature } = this.props;
    const {
      featureId,
      featureName,
      featureStatus,
      tfsReleaseId,
      tfsReleaseName,
      tfsReleaseDate,
    } = record;

    const recordDataForRequest = {
      featureId,
      featureName,
      featureStatus: !featureStatus,
      tfsReleaseId,
      tfsReleaseName,
      tfsReleaseDate,
    };
    createFeature(recordDataForRequest);
  };

  render() {
    const { features, isFeaturesModal, selectedRow } = this.props;
    console.log('PANEL', this.props);
    return (
      <>
        <TopMenu />
        <Wrapper>
          <FeaturesFilters />

          <HeaderForTable>
            <Title> Фичи </Title>
            <WrapperForIcon>
              <StyledIcon type="plus" onClick={this.onCreateFeature} />
              <StyledIcon type="edit" onClick={this.onEditFeature} />
              <StyledIcon type="delete" onClick={this.onDeleteFeature} />
            </WrapperForIcon>
          </HeaderForTable>

          <FeaturesTable
            features={features}
            selectedRow={selectedRow}
            onSelectRow={this.onSelectRow}
            onChangeCheckboxValue={this.onChangeCheckboxValue}
          />
          {isFeaturesModal && <FeaturesModal />}
        </Wrapper>
      </>
    );
  }
}

FeaturesPanel.propTypes = {
  toggleFeaturesModal: PropTypes.func.isRequired,
  fetchFeatures: PropTypes.func.isRequired,
  createFeature: PropTypes.func.isRequired,
  deleteFeature: PropTypes.func.isRequired,
  selectRow: PropTypes.func.isRequired,
  isFeaturesModal: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  features: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedRow: PropTypes.object.isRequired,
};

const Wrapper = styled.div`
  background-color: #fff;
  margin: 25px 30px 0px 30px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
`;

const Title = styled.div`
  width: 200px;
  height: 30px;
  font-size: 18px;
  color: #000;
  font-family: T2_DisplaySerif_Regular;
  text-align: center;
  margin-top: 5px;
  padding-right: 90px;
`;

const HeaderForTable = styled.div`
  // box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
  border-bottom: 1px solid #8e97a0;
  display: flex;
  height: 40px;
`;

const StyledIcon = styled(Icon)`
  width: 40px;
  font-size: 25px;
  margin: 5px 5px;
`;

const WrapperForIcon = styled.div`
  float: right;
  margin-right: 0;
  margin-left: auto;
  .anticon > * {
    line-height: 1;
    color: #000;
  }
`;

export default FeaturesPanel;
