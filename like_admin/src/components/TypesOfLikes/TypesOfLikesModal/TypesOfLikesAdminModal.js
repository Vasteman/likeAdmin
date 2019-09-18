import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Input, Select, Button, Popconfirm, Icon } from 'antd';
import PropTypes from 'prop-types';

class TypesOfLikesAdminModal extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {};

  componentDidMount() {
    console.log('111', this.state);
    const { typesOfLikes } = this.props;
    const { ...typesOfLikesData } = typesOfLikes;

    this.setState({
      ...typesOfLikesData,
    });
    console.log('22222', this.state);
  }

  onOK = () => {
    const { createTypeOfLike, typesOfLikesModalState } = this.props;
    const { action } = typesOfLikesModalState;
    console.log('state Ok', this.state);
    if (action === 'create') createTypeOfLike(this.state);
    this.onCancel();
  };

  onCancel = () => {
    const { toggleTypesOfLikesModal, typesOfLikesModalState } = this.props;
    const { action } = typesOfLikesModalState;
    toggleTypesOfLikesModal({ action });
  };

  renderFooterButtons = () => {
    return [
      <Popconfirm
        key={1}
        title="Изменения не будут сохранены! Закрыть форму без сохранения изменений?"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        onConfirm={this.onCancel}
        onCancel={() => null}
        okText="Да"
        cancelText="Нет"
      >
        <Button type="danger" icon="close">
          Закрыть
        </Button>
      </Popconfirm>,
      <StyledButtonPrimary type="primary" icon="poweroff" onClick={this.onOK}>
        Сохранить
      </StyledButtonPrimary>,
    ];
  };

  ChangeField = (field, value) => {
    this.setState({
      [field]: value,
    });
    console.log('ChangeField', this.state);
  };

  render() {
    const { isTypesOfLikesModal } = this.props;
    // console.log('this.prop', this.props);
    // const { typeId, EmojiName: typeName, Status: status, EmojiAuthor: author } = this.state;
    console.log('STATE', this.state);
    return (
      <Wrapper
        title="Тип лайков"
        visible={isTypesOfLikesModal}
        onOk={this.onOK}
        onCancel={this.onCancel}
        width={750}
        footer={this.renderFooterButtons()}
      >
        <WrapperForLineInput>
          <Label> ID </Label>
          <Input
            id="TypeId"
            // value={typeId}
            onChange={elem => this.ChangeField('TypeId', elem.target.value)}
          />
        </WrapperForLineInput>

        <WrapperForLineInput>
          <Label> Название </Label>
          <Input
            id="EmojiName"
            // value={typeName}
            onChange={elem => this.ChangeField('EmojiName', elem.target.value)}
          />
        </WrapperForLineInput>

        <WrapperForLineInput>
          <Label> Статус </Label>
          <StyledSelect
            id="EmojiActive"
            value
            onChange={() => this.ChangeField('EmojiActive', true)}
          />
        </WrapperForLineInput>

        <WrapperForLineInput>
          <Label> Автор </Label>
          <Input
            id="author"
            // value={author}
            onChange={elem => this.ChangeField('author', elem.target.value)}
          />
        </WrapperForLineInput>
      </Wrapper>
    );
  }
}

TypesOfLikesAdminModal.propTypes = {
  isTypesOfLikesModal: PropTypes.bool.isRequired,
  toggleTypesOfLikesModal: PropTypes.func.isRequired,
  createTypeOfLike: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  typesOfLikesModalState: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  typesOfLikes: PropTypes.array.isRequired,
};

const Wrapper = styled(Modal)`
  .ant-btn-primary {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
  .ant-btn-sm {
    background-color: #3fcbff;
    border-color: #3fcbff;
  }
`;

const WrapperForLineInput = styled.div`
  display: flex;
  .ant-input {
    // border: 1px solid green;
    width: 500px;
    margin-left: 50px;
  }

  .ant-select {
    margin-left: 50px;
  }
`;

const Label = styled.div`
  // border: 1px solid red;
  width: 150px;
  height: 50px;
`;

const StyledSelect = styled(Select)`
  // border: 1px solid green;
`;

const StyledButtonPrimary = styled(Button)`
  .ant-btn-primary {
    backgorund-color: #3fcbff;
    border-color: #3fcbff;
    border: 1px solid black;
  }
`;

export default TypesOfLikesAdminModal;
