import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import PropTypes from 'prop-types';

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
    return releases.map(release => {
      let item = {};
      item = {
        author: release.TfsReleaseAuthor,
        releaseDate: release.TfsReleaseDate,
        releaseId: release.TfsReleaseId,
        releaseName: release.TfsReleaseName,
      };
      return item;
    });
  };

  createTable = releases => {
    this.dataSource = this.createDataSource(releases);

    // const { onChangeCheckboxValue } = this.props;
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'releaseId',
        key: 'releaseId',
        width: '10%',
      },
      {
        title: 'Название',
        dataIndex: 'releaseName',
        key: 'releaseName',
        width: '30%',
      },
      {
        title: 'Дата создания',
        dataIndex: 'releaseDate',
        key: 'releaseDate',
        width: '30%',
      },
      {
        title: 'Автор',
        dataIndex: 'author',
        key: 'author',
        width: '30%',
      },
    ];
  };

  onListOfAvailableFeaturesModalOpen = () => {
    const { toggleListOfAvailableFeaturesModal } = this.props;
    toggleListOfAvailableFeaturesModal({});
  };

  render() {
    const { onSelectRow, releases } = this.props;
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        onSelectRow(record, selected, selectedRows);
      },
      type: 'checkbox',
    };

    return (
      <Wrapper>
        {releases && (
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
`;
export default ReleasesTable;
