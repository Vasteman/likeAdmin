/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import TopMenu from '../TopMenu';
import ReleasesTable from './releasesTable';
import ReleasesFilters from './releasesFilters';
import ReleaseModal from './ReleasesModal';
import ListOfAvailableFeaturesModal from './ListOfAvailableFeaturesModal';

class ReleasesPanel extends Component {
  componentDidMount() {
    const { fetchReleases } = this.props;
    fetchReleases({});
  }

  onCreateRelease = () => {
    const { toggleReleaseModal } = this.props;
    toggleReleaseModal({ action: 'create' });
  };

  onEditRelease = () => {
    const { toggleReleaseModal, selectedRow } = this.props;
    if (Object.keys(selectedRow).length !== 0) {
      toggleReleaseModal({ action: 'edit' });
    }
  };

  onDeleteRelease = () => {
    const { deleteRelease, selectedRow } = this.props;
    if (Object.keys(selectedRow).length !== 0) {
      deleteRelease({ releaseId: selectedRow.releaseId });
    }
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
  };

  render() {
    const {
      isReleasesModal,
      releases,
      selectedRow,
      isListOfAvailableFeaturesModal,
      toggleListOfAvailableFeaturesModal,
      fetchReleases,
    } = this.props;
    console.log('isReleasesModal', isReleasesModal);
    return (
      <>
        <TopMenu />
        <Wrapper>
          <ReleasesFilters fetchReleases={fetchReleases} />

          <HeaderForTable>
            <Title> Релизы </Title>
            <WrapperForIcon>
              <StyledIcon type="plus" onClick={this.onCreateRelease} />
              <StyledIcon type="edit" onClick={this.onEditRelease} />
              <StyledIcon type="delete" onClick={this.onDeleteRelease} />
            </WrapperForIcon>
          </HeaderForTable>

          <ReleasesTable
            releases={releases}
            selectedRow={selectedRow}
            onSelectRow={this.onSelectRow}
            toggleListOfAvailableFeaturesModal={toggleListOfAvailableFeaturesModal}
          />
          {isReleasesModal && <ReleaseModal />}
          {isListOfAvailableFeaturesModal && <ListOfAvailableFeaturesModal />}
        </Wrapper>
      </>
    );
  }
}

ReleasesPanel.propTypes = {
  toggleReleaseModal: PropTypes.func.isRequired,
  toggleListOfAvailableFeaturesModal: PropTypes.func.isRequired,
  fetchReleases: PropTypes.func.isRequired,
  // createFeature: PropTypes.func.isRequired,
  deleteRelease: PropTypes.func.isRequired,
  selectRow: PropTypes.func.isRequired,
  isReleasesModal: PropTypes.bool.isRequired,
  isListOfAvailableFeaturesModal: PropTypes.bool.isRequired,
  releases: PropTypes.array.isRequired,
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

export default ReleasesPanel;
