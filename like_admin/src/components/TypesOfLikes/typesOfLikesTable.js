import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const { Column } = Table;
const TypesOfLikesTable = () => {
  return (
    <>
      <Wrapper>
        <StyledTable bordered dataSource={dataSource} columns={columns}>
          <Column title="ID"> </Column>
        </StyledTable>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin: 0px 30px;
  background-color: white;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    text-align: center;
    background: #ecf9ff;
  }
`;
export default TypesOfLikesTable;
