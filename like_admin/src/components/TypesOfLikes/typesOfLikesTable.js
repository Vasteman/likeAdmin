import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    typeOfLike: '10 тест',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    typeOfLike: '10 Downing Street',
  },
];

// const createDataSource = () => {
//   console.log('11');
// };
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '10%',
  },
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
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
    dataIndex: 'author',
    key: 'author',
    width: '35%',
  },
];
const createTable = () => {
  // dataSource = createDataSource();
  // this.columns = [
  //   {
  //     title: 'ID',
  //     dataIndex: 'id',
  //     key: 'id',
  //     width: '10%',
  //   },
  //   {
  //     title: 'Название',
  //     dataIndex: 'name',
  //     key: 'name',
  //     width: '35%',
  //   },
  //   {
  //     title: 'Вкл/выкл',
  //     dataIndex: 'status',
  //     key: 'status',
  //     width: '20%',
  //   },
  //   {
  //     title: 'Автор',
  //     dataIndex: 'author',
  //     key: 'author',
  //     width: '35%',
  //   },
  // ];
};

class TypesOfLikesTable extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    createTable();
  }

  render() {
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
            dataSource={dataSource}
            columns={columns}
          />
        </Wrapper>
      </>
    );
  }
}

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
