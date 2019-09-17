import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import PropTypes from 'prop-types';

class TypesOfLikesTable extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { typesOfLikes } = this.props;
    this.createTable(typesOfLikes);
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line no-shadow
    const { typesOfLikes } = nextProps;
    console.log('nextProps', nextProps);
    if (typesOfLikes) this.createTable(typesOfLikes);
  }

  createDataSource = typesOfLikes => {
    return typesOfLikes.map(type => {
      let item = {};
      item = {
        TypeId: type.TypeId,
        TypeName: type.EmojiName,
        Status: type.EmojiActive,
        Author: type.EmojiAuthor,
      };
      console.log('item', item);
      return item;
    });
  };

  createTable = typesOfLikes => {
    this.dataSource = this.createDataSource(typesOfLikes);
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'TypeId',
        key: 'TypeId',
        width: '10%',
      },
      {
        title: 'Название',
        dataIndex: 'TypeName',
        key: 'TypeName',
        width: '35%',
      },
      {
        title: 'Статус',
        dataIndex: 'Status',
        key: 'Status',
        width: '20%',
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
    const { typesOfLikes } = this.props;
    console.log('state table', this.state);
    console.log('state props', this.props);
    return (
      <Wrapper>
        {typesOfLikes && (
          <StyledTable
            rowSelection={rowSelection}
            bordered
            dataSource={this.dataSource}
            columns={this.columns}
          />
        )}
      </Wrapper>
    );
  }
}

TypesOfLikesTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  typesOfLikes: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
  // background-color: white;
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
`;
export default TypesOfLikesTable;
