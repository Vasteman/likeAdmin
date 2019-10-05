/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Popconfirm, Spin } from 'antd';
import TopMenu from '../TopMenu';
import FeaturesTable from './featuresTable';
import FeaturesFilters from './featuresFilters';
import FeaturesModal from './FeaturesModal';

const featureList = [];
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
    console.log('selected row delete', selectedRow);

    if (Object.keys(selectedRow).length !== 0) {
      console.log('featureIdList', featureList);
      deleteFeature(featureList);
    }
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
    if (featureList.indexOf(record.FeatureId) >= 0) {
      featureList.splice(featureList.indexOf(record.FeatureId), 1);
    } else featureList.push(record.FeatureId);
  };

  onSelectAllRows = (selected, selectedRows, changeRows) => {
    if (selected) {
      changeRows.map(row => {
        if (featureList.indexOf(row.FeatureId) >= 0) {
          featureList.splice(featureList.indexOf(row.FeatureId), 1);
        } else featureList.push(row.FeatureId);
        return featureList;
      });
    } else {
      featureList.splice(0, featureList.length);
    }
  };

  onChangeCheckboxValue = record => {
    const { createFeature } = this.props;
    const {
      FeatureId,
      FeatureName,
      IsLikeActive,
      TfsReleaseId,
      tfsReleaseName,
      tfsReleaseDate,
    } = record;

    const featureData = [
      {
        FeatureId,
        FeatureName,
        IsLikeActive: !IsLikeActive,
        TfsReleaseId,
        tfsReleaseName,
        tfsReleaseDate,
      },
    ];
    createFeature({ featureData });
  };

  render() {
    const {
      features,
      isFeaturesModal,
      selectedRow,
      fetchFeatures,
      isLoadingFeaturesTable,
    } = this.props;
    return (
      <>
        <TopMenu />
        <Wrapper>
          <FeaturesFilters fetchFeatures={fetchFeatures} />

          <HeaderForTable>
            <Title> Фичи </Title>
            <WrapperForIcon>
              <StyledIcon type="plus" onClick={this.onCreateFeature} />
              <StyledIcon type="edit" onClick={this.onEditFeature} />
              <Popconfirm
                key={1}
                title="Уверены в удалении?"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                placement="bottomRight"
                onConfirm={this.onDeleteFeature}
                onCancel={() => null}
                okText="Да"
                cancelText="Нет"
              >
                <StyledIcon type="delete" />
              </Popconfirm>
            </WrapperForIcon>
          </HeaderForTable>
          <StyledSpin spinning={isLoadingFeaturesTable} indicator={<Icon type="loading" spin />}>
            <FeaturesTable
              features={features}
              selectedRow={selectedRow}
              onSelectRow={this.onSelectRow}
              onSelectAllRows={this.onSelectAllRows}
              onChangeCheckboxValue={this.onChangeCheckboxValue}
              isLoadingFeaturesTable={isLoadingFeaturesTable}
            />
          </StyledSpin>
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
  features: PropTypes.array.isRequired,
  selectedRow: PropTypes.object.isRequired,
  isLoadingFeaturesTable: PropTypes.bool.isRequired,
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

const StyledSpin = styled(Spin)`
  .anticon-spin {
    margin-top: 100px;
    color: #3fcbff;
  }
  .ant-spin-dot {
    position: relative;
    display: inline-block;
    font-size: 80px;
    width: 1em;
    height: 1em;
  }
`;

export default FeaturesPanel;
