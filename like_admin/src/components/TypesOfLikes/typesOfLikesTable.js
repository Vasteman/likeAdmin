import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Checkbox } from 'antd';
import PropTypes from 'prop-types';

class TypesOfLikesTable extends Component {
  componentDidMount() {
    const { typesOfLikes } = this.props;
    this.createTable(typesOfLikes);
  }

  componentWillReceiveProps(nextProps) {
    const { typesOfLikes } = nextProps;
    if (typesOfLikes) this.createTable(typesOfLikes);
  }

  createDataSource = typesOfLikes => {
    if (typesOfLikes) {
      return typesOfLikes.map(type => {
        let item = {};
        item = {
          TypeId: type.TypeId,
          EmojiName: type.EmojiName,
          EmojiId: type.EmojiId,
          EmojiActive: type.EmojiActive,
          EmojiAuthor: type.EmojiAuthor,
        };
        return item;
      });
    }
    return null;
  };

  createTable = typesOfLikes => {
    this.dataSource = this.createDataSource(typesOfLikes);

    const { onChangeCheckboxValue } = this.props;
    this.columns = [
      {
        title: 'Название типа',
        dataIndex: 'EmojiId',
        key: 'EmojiId',
        width: '25%',
      },
      {
        title: 'Название Emoji',
        dataIndex: 'EmojiName',
        key: 'EmojiName',
        width: '25%',
      },
      {
        title: 'Активно',
        dataIndex: 'EmojiActive',
        key: 'EmojiActive',
        width: '20%',
        sorter: (first, second) => first.EmojiActive - second.EmojiActive,
        render: (text, record) => {
          return (
            <Checkbox checked={record.EmojiActive} onChange={() => onChangeCheckboxValue(record)} />
          );
        },
      },
      {
        title: 'Автор',
        dataIndex: 'EmojiAuthor',
        key: 'EmojiAuthor',
        width: '30%',
      },
    ];
  };

  render() {
    const { onSelectRow, onSelectAllRows, typesOfLikes, isLoadingTypesOfLikesTable } = this.props;
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
        {typesOfLikes && !isLoadingTypesOfLikesTable && (
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
  onSelectAllRows: PropTypes.func.isRequired,
  onChangeCheckboxValue: PropTypes.func.isRequired,
  isLoadingTypesOfLikesTable: PropTypes.bool.isRequired,
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
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #44caff;
    border-color: #44caff;
  }
`;
export default TypesOfLikesTable;
