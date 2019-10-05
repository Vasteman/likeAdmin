/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Popconfirm, Spin } from 'antd';
import TopMenu from '../TopMenu';
import TypesOfLikesTable from './typesOfLikesTable';
import TypesOfLikesAdminModal from './TypesOfLikesModal';

const typesOfLikesList = [];

class TypesOfLikesPanel extends Component {
  componentDidMount() {
    const { fetchTypesOfLikes } = this.props;
    fetchTypesOfLikes();
  }

  onCreateType = () => {
    const { toggleTypesOfLikesModal } = this.props;
    toggleTypesOfLikesModal({ action: 'create' });
  };

  onEditType = () => {
    const { toggleTypesOfLikesModal, selectedRow } = this.props;
    if (Object.keys(selectedRow).length !== 0) {
      toggleTypesOfLikesModal({ action: 'edit' });
    }
  };

  onDeleteType = () => {
    const { deleteTypeOfLike, selectedRow } = this.props;
    console.log('typesOfLikesList', typesOfLikesList);
    if (Object.keys(selectedRow).length !== 0) {
      deleteTypeOfLike(typesOfLikesList);
    }
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
    if (typesOfLikesList.indexOf(record.TypeId) >= 0) {
      typesOfLikesList.splice(typesOfLikesList.indexOf(record.TypeId), 1);
    } else typesOfLikesList.push(record.TypeId);
  };

  onSelectAll = (selected, selectedRows, changeRows) => {
    if (selected) {
      changeRows.map(row => {
        if (typesOfLikesList.indexOf(row.TypeId) >= 0) {
          typesOfLikesList.splice(typesOfLikesList.indexOf(row.TypeId), 1);
        } else typesOfLikesList.push(row.TypeId);
        return typesOfLikesList;
      });
    } else {
      typesOfLikesList.splice(0, typesOfLikesList.length);
    }
  };

  onChangeCheckboxValue = record => {
    const { createTypeOfLike } = this.props;
    const { TypeId, EmojiName, EmojiId, EmojiActive } = record;

    const recordDataForRequest = {
      TypeId,
      EmojiName,
      EmojiId,
      EmojiActive: !EmojiActive,
    };
    createTypeOfLike(recordDataForRequest);
  };

  render() {
    const {
      typesOfLikes,
      isTypesOfLikesModal,
      selectedRow,
      isLoadingTypesOfLikesTable,
    } = this.props;
    return (
      <>
        <TopMenu />
        <Wrapper>
          <Header>
            <Title> Типы лайков</Title>
            <WrapperForIcon>
              <StyledIcon type="plus" onClick={this.onCreateType} />
              <StyledIcon type="edit" onClick={this.onEditType} />
              <Popconfirm
                key={1}
                title="Уверены в удалении?"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                placement="bottomRight"
                onConfirm={this.onDeleteType}
                onCancel={() => null}
                okText="Да"
                cancelText="Нет"
              >
                <StyledIcon type="delete" />
              </Popconfirm>
            </WrapperForIcon>
          </Header>
          <StyledSpin
            spinning={isLoadingTypesOfLikesTable}
            indicator={<Icon type="loading" spin />}
          >
            <TypesOfLikesTable
              typesOfLikes={typesOfLikes}
              onSelectRow={this.onSelectRow}
              onSelectAll={this.onSelectAll}
              selectedRow={selectedRow}
              onChangeCheckboxValue={this.onChangeCheckboxValue}
              isLoadingTypesOfLikesTable={isLoadingTypesOfLikesTable}
            />
          </StyledSpin>
          {isTypesOfLikesModal && <TypesOfLikesAdminModal />}
        </Wrapper>
      </>
    );
  }
}

TypesOfLikesPanel.propTypes = {
  fetchTypesOfLikes: PropTypes.func.isRequired,
  deleteTypeOfLike: PropTypes.func.isRequired,
  createTypeOfLike: PropTypes.func.isRequired,
  toggleTypesOfLikesModal: PropTypes.func.isRequired,
  typesOfLikes: PropTypes.array.isRequired,
  isTypesOfLikesModal: PropTypes.bool.isRequired,
  isLoadingTypesOfLikesTable: PropTypes.bool.isRequired,
  selectRow: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
};

const Wrapper = styled.div`
  background-color: #fff;
  margin: 25px 30px 0px 30px;
  height: 40px;
  border-bottom: 1px solid #8e97a0;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.78);
  .anticon > * {
    color: #000;
  }
  .ant-btn-primary {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
  .ant-btn-sm {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
`;

const Title = styled.div`
  width: 200px;
  height: 30px;
  font-size: 18px;
  color: #000;
  font-family: T2_DisplaySerif_Regular;
  text-align: center;
  margin-top: 5px;
`;

const Header = styled.div`
  display: flex;
  height: 40px;
`;

const StyledIcon = styled(Icon)`
  width: 40px;
  font-size: 25px;
  margin: 5px 5px;
`;

const WrapperForIcon = styled.div`
  float: right;
  margin-right: 0;
  margin-left: auto;
`;

const StyledSpin = styled(Spin)`
  .anticon-spin {
    margin-top: 100px;
    color: #3fcbff;
  }
  .ant-spin-dot {
    position: relative;
    display: inline-block;
    font-size: 80px;
    width: 1em;
    height: 1em;
  }
`;
export default TypesOfLikesPanel;
