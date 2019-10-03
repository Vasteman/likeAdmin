import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

class ReleasesTable extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {};

  componentDidMount() {
    const { releases } = this.props;
    this.createTable(releases);
  }

  componentWillReceiveProps(nextProps) {
    const { releases } = nextProps;
    if (releases) this.createTable(releases);
  }

  createDataSource = releases => {
    if (releases) {
      return releases.map(release => {
        let item = {};
        item = {
          TfsReleaseAuthor: release.TfsReleaseAuthor,
          TfsReleaseDate: release.TfsReleaseDate,
          TfsReleaseId: release.TfsReleaseId,
          TfsReleaseName: release.TfsReleaseName,
        };
        return item;
      });
    }
    return null;
  };

  createTable = releases => {
    this.dataSource = this.createDataSource(releases);

    this.columns = [
      {
        title: 'ID',
        dataIndex: 'TfsReleaseId',
        key: 'TfsReleaseId',
        width: '10%',
      },
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

  onListOfAvailableFeaturesModalOpen = () => {
    const { toggleListOfAvailableFeaturesModal } = this.props;
    toggleListOfAvailableFeaturesModal({});
  };

  render() {
    const { onSelectRow, releases, isLoadingReleasesTable } = this.props;
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        onSelectRow(record, selected, selectedRows);
      },
      type: 'checkbox',
    };
    return (
      <Wrapper>
        {releases && !isLoadingReleasesTable && (
          <StyledTable
            rowSelection={rowSelection}
            bordered
            onRow={record => ({
              onClick: () => this.onListOfAvailableFeaturesModalOpen(record),
            })}
            dataSource={this.dataSource}
            columns={this.columns}
            pagination={false}
          />
        )}
      </Wrapper>
    );
  }
}

ReleasesTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  releases: PropTypes.array.isRequired,
  onSelectRow: PropTypes.func.isRequired,
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
