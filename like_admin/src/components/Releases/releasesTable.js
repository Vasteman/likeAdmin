/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

class ReleasesTable extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {};

  componentDidMount() {
    this.createColumnForTable();
  }

  componentWillReceiveProps(nextProps) {
    const { releases } = nextProps;
    if (releases) this.createColumnForTable();
  }

  createColumnForTable = () => {
    this.columns = [
      {
        title: 'Название',
        dataIndex: 'TfsReleaseName',
        key: 'TfsReleaseName',
        width: '30%',
      },
      {
        title: 'Дата создания',
        dataIndex: 'TfsReleaseDate',
        key: 'TfsReleaseDate',
        width: '30%',
        render: value => {
          return value ? moment(value).format('DD.MM.YYYY') : '';
        },
      },
      {
        title: 'Автор',
        dataIndex: 'TfsReleaseAuthor',
        key: 'TfsReleaseAuthor',
        width: '30%',
      },
    ];
  };

  onListOfAvailableFeaturesModalOpen = rowIndex => {
    const { toggleListOfAvailableFeaturesModal } = this.props;
    toggleListOfAvailableFeaturesModal({ rowIndex });
  };

  render() {
    const { onSelectRow, onSelectAllRows, releases, isLoadingReleasesTable } = this.props;
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        onSelectRow(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        onSelectAllRows(selected, selectedRows, changeRows);
      },
      type: 'checkbox',
    };

    return (
      <Wrapper>
        {releases && !isLoadingReleasesTable && (
          <StyledTable
            rowSelection={rowSelection}
            bordered
            onRow={(record, rowIndex) => ({
              onClick: () => this.onListOfAvailableFeaturesModalOpen(rowIndex),
            })}
            dataSource={releases}
            columns={this.columns}
            pagination={false}
          />
        )}
      </Wrapper>
    );
  }
}

ReleasesTable.propTypes = {
  releases: PropTypes.array.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
  toggleListOfAvailableFeaturesModal: PropTypes.func.isRequired,
  isLoadingReleasesTable: PropTypes.bool.isRequired,
};

const Wrapper = styled.div`
  font-family: PT_Sans-Web-Regular;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    text-align: center;
    background-color: #ecf9ff;
    color: #8e97a0;
  }
  .ant-table-tbody > tr > td {
    text-align: center;
    color: #000;
  }

  .ant-table-row.ant-table-row-level-0 {
    td {
      cursor: pointer;
      word-break: break-word;
    }
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #44caff;
    border-color: #44caff;
  }
  .ant-checkbox-input {
    :hover {
      border-color: #44caff;
    }
  }
`;

export default ReleasesTable;
