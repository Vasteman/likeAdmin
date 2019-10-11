import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

class FeaturesTable extends Component {
  // componentDidMount() {
  //   // eslint-disable-next-line no-shadow
  //   const { features } = this.props;
  //   console.log('PROPS CDM ', this.props);
  //   this.createColumnForTable(features);
  // }

  componentWillReceiveProps(nextProps) {
    const { features } = nextProps;
    if (features) this.createColumnForTable(features);
  }

  createColumnForTable = () => {
    const { onChangeCheckboxValue } = this.props;
    this.columns = [
      {
        title: 'Название',
        dataIndex: 'FeatureName',
        key: 'FeatureName',
        width: '30%',
      },
      {
        title: 'Активно',
        dataIndex: 'IsLikeActive',
        key: 'IsLikeActive',
        width: '20%',
        sorter: (first, second) => first.IsLikeActive - second.IsLikeActive,
        render: (text, record) => {
          return (
            <Checkbox
              checked={record.IsLikeActive}
              onChange={() => onChangeCheckboxValue(record)}
            />
          );
        },
      },
      {
        title: 'Дата создания',
        dataIndex: 'FeatureDate',
        key: 'FeatureDate',
        width: '15%',
        render: value => {
          return value ? moment(value).format('DD.MM.YYYY HH:mm') : '';
        },
      },
      {
        title: 'Автор',
        dataIndex: 'FeatureAuthor',
        key: 'FeatureAuthor',
        width: '35%',
      },
    ];
  };

  render() {
    const { onSelectRow, onSelectAllRows, features, isLoadingFeaturesTable } = this.props;
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
        {features && !isLoadingFeaturesTable && (
          <StyledTable
            rowSelection={rowSelection}
            bordered
            dataSource={features}
            columns={this.columns}
            pagination={false}
          />
        )}
      </Wrapper>
    );
  }
}

FeaturesTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  features: PropTypes.array.isRequired,
  onChangeCheckboxValue: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  isLoadingFeaturesTable: PropTypes.bool.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
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
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #44caff;
    border-color: #44caff;
  }
`;
export default FeaturesTable;
