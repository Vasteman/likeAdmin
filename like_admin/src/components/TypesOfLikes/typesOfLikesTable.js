import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import PropTypes from 'prop-types';

class TypesOfLikesTable extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // selectedRowKeys: [],
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
        typeId: type.TypeId,
        typeName: type.EmojiName,
        status: type.EmojiActive,
        author: type.EmojiAuthor,
      };
      // console.log('item', item);
      return item;
    });
  };

  createTable = typesOfLikes => {
    this.dataSource = this.createDataSource(typesOfLikes);
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'typeId',
        key: 'typeId',
        width: '10%',
      },
      {
        title: 'Название',
        dataIndex: 'typeName',
        key: 'typeName',
        width: '35%',
      },
      {
        title: 'Статус',
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
  };

  render() {
    const { onSelectRow, selectedRow } = this.props;
    console.log('selectedRow444', selectedRow);
    const rowSelection = {
      // selectedRowKeys: [selectedRow && selectedRow.key],
      onSelect: (record, selected, selectedRows) => {
        onSelectRow(record, selected, selectedRows);
        console.log('selectedRows', selectedRows);
        console.log(' render record', record);
      },
      type: 'radio',
    };

    const { typesOfLikes } = this.props;
    // console.log('state table', this.state);
    // console.log('props table', this.props);
    return (
      <Wrapper>
        {typesOfLikes && (
          <StyledTable
            rowSelection={rowSelection}
            hideDefaultSelections
            bordered
            dataSource={this.dataSource}
            columns={this.columns}
            pagination={false}
          />
        )}
      </Wrapper>
    );
  }
}

TypesOfLikesTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  typesOfLikes: PropTypes.array.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedRow: PropTypes.object.isRequired,
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
