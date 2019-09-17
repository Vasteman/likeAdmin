import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
// import PropTypes from 'prop-types';

class FeaturesTable extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    // const { typesOfLikes } = this.props;
    // this.createTable(typesOfLikes);
  }

  // componentWillReceiveProps(nextProps) {
  //   // eslint-disable-next-line no-shadow
  //   // const { typesOfLikes } = nextProps;
  //   // console.log('nextProps', nextProps);
  //   // if (typesOfLikes) this.createTable(typesOfLikes);
  // }

  createDataSource = features => {
    return features.map(feature => {
      let item = {};
      item = {
        FeatureId: feature.FeatureId,
        TypeName: feature.EmojiName,
        Status: feature.EmojiActive,
        Author: feature.EmojiAuthor,
      };
      console.log('item', item);
      return item;
    });
  };

  createTable = () => {
    // this.dataSource = this.createDataSource(features);
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'FeatureId',
        key: 'FeatureId',
        width: '10%',
      },
      {
        title: 'Название',
        dataIndex: 'FeatureName',
        key: 'FeatureName',
        width: '35%',
      },
      {
        title: 'Статус',
        dataIndex: 'Status',
        key: 'Status',
        width: '20%',
      },
      {
        title: 'Дата создания',
        dataIndex: 'dateOfCreation',
        key: 'dateOfCreation',
        width: '35%',
      },
      {
        title: 'Автор',
        dataIndex: 'Author',
        key: 'Author',
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
    // const { features } = this.props;
    console.log('state table', this.state);
    console.log('state props', this.props);
    return (
      <Wrapper>
        <StyledTable
          rowSelection={rowSelection}
          bordered
          dataSource={this.dataSource}
          columns={this.columns}
        />
        )
      </Wrapper>
    );
  }
}

FeaturesTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  // features: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
  // background-color: white;
  font-family: PT_Sans-Web-Regular;
  border: 1px solid red;
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
