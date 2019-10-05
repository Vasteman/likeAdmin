/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Popconfirm, Spin } from 'antd';
import TopMenu from '../TopMenu';
import ReleasesTable from './releasesTable';
import ReleasesFilters from './releasesFilters';
import ReleaseModal from './ReleasesModal';
import ListOfAvailableFeaturesModal from './ListOfAvailableFeaturesModal';

const releasesList = [];

class ReleasesPanel extends Component {
  // eslint-disable-next-line react/state-in-constructor
  // state = {
  //   selectedRowKeys: [],
  // };

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
      deleteRelease(releasesList);
    }
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
    if (releasesList.indexOf(record.TfsReleaseId) >= 0) {
      releasesList.splice(releasesList.indexOf(record.TfsReleaseId), 1);
    } else releasesList.push(record.TfsReleaseId);
  };

  onSelectAllRows = (selected, selectedRows, changeRows) => {
    if (selected) {
      changeRows.map(row => {
        if (releasesList.indexOf(row.TfsReleaseId) >= 0) {
          releasesList.splice(releasesList.indexOf(row.TfsReleaseId), 1);
        } else releasesList.push(row.TfsReleaseId);
        return releasesList;
      });
    } else {
      releasesList.splice(0, releasesList.length);
    }
  };

  render() {
    const {
      isReleasesModal,
      releases,
      selectedRow,
      isListOfAvailableFeaturesModal,
      toggleListOfAvailableFeaturesModal,
      fetchReleases,
      isLoadingReleasesTable,
    } = this.props;
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
              <Popconfirm
                key={1}
                title="Уверены в удалении?"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                placement="bottomRight"
                onConfirm={this.onDeleteRelease}
                onCancel={() => null}
                okText="Да"
                cancelText="Нет"
              >
                <StyledIcon type="delete" />
              </Popconfirm>
            </WrapperForIcon>
          </HeaderForTable>
          <StyledSpin spinning={isLoadingReleasesTable} indicator={<Icon type="loading" spin />}>
            <ReleasesTable
              releases={releases}
              selectedRow={selectedRow}
              onSelectRow={this.onSelectRow}
              onSelectAllRows={this.onSelectAllRows}
              toggleListOfAvailableFeaturesModal={toggleListOfAvailableFeaturesModal}
              isLoadingReleasesTable={isLoadingReleasesTable}
            />
          </StyledSpin>

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
  deleteRelease: PropTypes.func.isRequired,
  selectRow: PropTypes.func.isRequired,
  isReleasesModal: PropTypes.bool.isRequired,
  isListOfAvailableFeaturesModal: PropTypes.bool.isRequired,
  releases: PropTypes.array.isRequired,
  selectedRow: PropTypes.object.isRequired,
  isLoadingReleasesTable: PropTypes.bool.isRequired,
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
export default ReleasesPanel;
