import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import typesOfLikes from 'sagas/typesOfLikes';
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

  //   createDataSource = typesOfLikes => {
  //     console.log('createDataSource');
  //     return (typesOfLikes.map(types, index => {
  //       let item = {};

  //       item = {
  //         TypeId: types.TypeId,
  //         TypeName: types.EmojiName,
  //         Author: types.EmojiAuthor,
  //       };
  //       return null;
  //     }),
  // )
  // };

  createTable = () => {
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
        title: 'Вкл/выкл',
        dataIndex: 'status',
        key: 'status',
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
    console.log('8888', this.props);
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    return (
      <>
        <Wrapper>
          <StyledTable
            rowSelection={rowSelection}
            bordered
            // dataSource={this.dataSource}
            columns={this.columns}
          />
        </Wrapper>
      </>
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
`;
export default TypesOfLikesTable;
