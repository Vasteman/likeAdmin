import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Checkbox } from 'antd';
import PropTypes from 'prop-types';

class FeaturesTable extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { features } = this.props;
    console.log('PROPS CDM ', this.props);
    this.createTable(features);
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-shadow
    const { features } = nextProps;
    console.log('nextProps', nextProps);
    if (features) this.createTable(features);
  }

  createDataSource = features => {
    return features.map(feature => {
      let item = {};
      item = {
        author: feature.FeatureAuthor,
        featureDate: feature.FeatureDate,
        featureId: feature.FeatureId,
        featureName: feature.FeatureName,
        featureStatus: feature.IsLikeActive,
      };
      console.log('item', item);
      return item;
    });
  };

  createTable = features => {
    this.dataSource = this.createDataSource(features);

    const { onChangeCheckboxValue } = this.props;
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'featureId',
        key: 'featureId',
        width: '9%',
      },
      {
        title: 'Название',
        dataIndex: 'featureName',
        key: 'featureName',
        width: '18%',
      },
      {
        title: 'Статус',
        dataIndex: 'featureStatus',
        key: 'featureStatus',
        width: '20%',
        render: (text, record) => {
          return (
            <Checkbox checked={record.status} onChange={() => onChangeCheckboxValue(record)} />
          );
        },
      },
      {
        title: 'Дата создания',
        dataIndex: 'featureDate',
        key: 'featureDate',
        width: '18%',
      },
      {
        title: 'Автор',
        dataIndex: 'author',
        key: 'author',
        width: '35%',
      },
    ];
  };

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };

    console.log('state render', this.state);
    console.log('render props', this.props);
    return (
      <Wrapper>
        <StyledTable
          rowSelection={rowSelection}
          bordered
          dataSource={this.dataSource}
          columns={this.columns}
          pagination={false}
        />
      </Wrapper>
    );
  }
}

FeaturesTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  features: PropTypes.array.isRequired,
  onChangeCheckboxValue: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  font-family: T2_DisplaySerif_Regular;
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
`;
export default FeaturesTable;
