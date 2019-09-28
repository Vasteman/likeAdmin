import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Checkbox } from 'antd';
import PropTypes from 'prop-types';

class TypesOfLikesTable extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    // selectedRowKeys: [],
  };

  componentDidMount() {
    const { typesOfLikes } = this.props;
    this.createTable(typesOfLikes);
  }

  componentWillReceiveProps(nextProps) {
    const { typesOfLikes } = nextProps;
    if (typesOfLikes) this.createTable(typesOfLikes);
  }

  // нейминг переменных отличается от тех, что в модалке (!)
  createDataSource = typesOfLikes => {
    return typesOfLikes.map(type => {
      let item = {};
      item = {
        typeId: type.TypeId,
        typeName: type.EmojiName,
        emojiName: type.EmojiId,
        status: type.EmojiActive,
        author: type.EmojiAuthor,
      };
      return item;
    });
  };

  createTable = typesOfLikes => {
    //  вернуть в скобки
    this.dataSource = this.createDataSource(typesOfLikes);

    const { onChangeCheckboxValue } = this.props;
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'typeId',
        key: 'typeId',
        width: '9%',
      },
      {
        title: 'Название типа',
        dataIndex: 'typeName',
        key: 'typeName',
        width: '18%',
      },
      {
        title: 'Название Emoji',
        dataIndex: 'emojiName',
        key: 'emojiName',
        width: '18%',
      },
      {
        title: 'Активно',
        dataIndex: 'status',
        key: 'status',
        width: '20%',
        sorter: (first, second) => first.status - second.status,
        render: (text, record) => {
          return (
            <Checkbox checked={record.status} onChange={() => onChangeCheckboxValue(record)} />
          );
        },
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
    const { onSelectRow, typesOfLikes } = this.props;
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        onSelectRow(record, selected, selectedRows);
      },
      // type: 'radio',
    };

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
  onChangeCheckboxValue: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  font-family: PT_Sans-Web-Regular;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
  .ant-checkbox-input {
    background-color: #ecf9ff;
  }
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
  .ant-checkbox-input {
    background-color: #ecf9ff;
  }
`;
export default TypesOfLikesTable;
