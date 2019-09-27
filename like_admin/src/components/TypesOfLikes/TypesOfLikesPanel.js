import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Popconfirm } from 'antd';
import TopMenu from '../TopMenu';
import TypesOfLikesTable from './TypesOfLikesTable';
import TypesOfLikesAdminModal from './TypesOfLikesModal';

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
    if (Object.keys(selectedRow).length !== 0) {
      deleteTypeOfLike({ typeId: selectedRow.typeId });
    }
    console.log('onDelete');
  };

  onSelectRow = record => {
    const { selectRow } = this.props;
    selectRow({ selectedRow: record });
  };

  onChangeCheckboxValue = record => {
    const { createTypeOfLike } = this.props;
    const { typeId, typeName: emojiName, emojiName: emojiId, status: emojiActive } = record;

    const recordDataForRequest = {
      emojiActive: !emojiActive,
      emojiName,
      typeId,
      emojiId,
    };
    createTypeOfLike(recordDataForRequest);
  };

  render() {
    const { typesOfLikes, isTypesOfLikesModal, selectedRow } = this.props;
    console.log('selectedRow', selectedRow);
    return (
      <>
        <TopMenu />
        <Wrapper>
          <Header>
            <Title> Типы лайков</Title>
            <WrapperForIcon>
              <StyledIcon type="plus" onClick={this.onCreateType} />
              <StyledIcon type="edit" onClick={this.onEditType} />

              {Object.keys(selectedRow).length !== 0 && (
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
              )}
            </WrapperForIcon>
          </Header>
          <TypesOfLikesTable
            typesOfLikes={typesOfLikes}
            onSelectRow={this.onSelectRow}
            selectedRow={selectedRow}
            onChangeCheckboxValue={this.onChangeCheckboxValue}
          />
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
  // eslint-disable-next-line react/forbid-prop-types
  typesOfLikes: PropTypes.array.isRequired,
  isTypesOfLikesModal: PropTypes.bool.isRequired,
  selectRow: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
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

export default TypesOfLikesPanel;
